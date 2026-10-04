import React, { useState, useEffect } from 'react';
import { Search, Filter, X, CheckCircle, Clock, AlertTriangle, Eye, Bell, Shield, ArrowRight } from 'lucide-react';
import { getPolicies, getPolicyAcknowledgements, sendReminders } from '../../services/complianceDataService';
import { createNotification } from '../../services/notificationService';

const CompliancePoliciesPage = () => {
  const [policies, setPolicies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Modals / Detail View
  const [selectedPolicy, setSelectedPolicy] = useState(null);
  const [acknowledgements, setAcknowledgements] = useState([]);
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);
  const [isSending, setIsSending] = useState(false);

  // Selection
  const [selectedAcks, setSelectedAcks] = useState([]);

  // Search & Filters (Main Table)
  const [searchQuery, setSearchQuery] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('');

  // Search & Filters (Details Table)
  const [empSearchQuery, setEmpSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const departments = ['All', 'Operations', 'IT', 'Procurement', 'HR', 'Finance'];

  const fetchPolicies = async () => {
    setIsLoading(true);
    const data = await getPolicies();
    setPolicies(data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchPolicies();
  }, []);

  const handleOpenDetails = async (policy) => {
    setSelectedPolicy(policy);
    setSelectedAcks([]);
    setEmpSearchQuery('');
    setStatusFilter('');
    
    setIsLoadingDetails(true);
    const acks = await getPolicyAcknowledgements(policy.id);
    setAcknowledgements(acks);
    setIsLoadingDetails(false);
  };

  const handleCloseDetails = () => {
    setSelectedPolicy(null);
    setAcknowledgements([]);
    setSelectedAcks([]);
    fetchPolicies(); // refresh data to update counts if reminders were sent
  };

  const handleSendReminders = async (ackIds) => {
    if (ackIds.length === 0) return;
    
    setIsSending(true);
    try {
      const res = await sendReminders(ackIds);
      
      // Simulate creating a notification for the Compliance Officer about the action
      await createNotification({
        title: 'Reminders Sent',
        description: `Demo reminder recorded for ${res.count} pending employees regarding ${selectedPolicy.title}.`,
        type: 'info',
        link: '/compliance/policies'
      });

      alert(`Demo reminder recorded for ${res.count} pending employees.`);
      
      // Refresh details
      const acks = await getPolicyAcknowledgements(selectedPolicy.id);
      setAcknowledgements(acks);
      setSelectedAcks([]);
    } catch (err) {
      alert('Failed to send reminders');
    } finally {
      setIsSending(false);
    }
  };

  // KPIs
  const trackedPolicies = policies.length;
  const totalRequired = policies.reduce((sum, p) => sum + p.required, 0);
  const totalAcknowledged = policies.reduce((sum, p) => sum + p.accepted, 0);
  const totalPending = policies.reduce((sum, p) => sum + p.pending, 0);
  const overallRate = totalRequired ? Math.round((totalAcknowledged / totalRequired) * 100) : 0;

  // Filters for Main Table
  const filteredPolicies = policies.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || p.version.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDept = departmentFilter ? p.departments.includes(departmentFilter) || p.departments.includes('All') : true;
    return matchesSearch && matchesDept;
  });

  const clearFilters = () => {
    setSearchQuery('');
    setDepartmentFilter('');
  };

  // Filters for Employee Table in Details
  const filteredAcks = acknowledgements.filter(a => {
    const matchesSearch = a.employeeName.toLowerCase().includes(empSearchQuery.toLowerCase()) || a.employeeId.toLowerCase().includes(empSearchQuery.toLowerCase());
    const matchesStatus = statusFilter ? a.status === statusFilter : true;
    return matchesSearch && matchesStatus;
  });

  const toggleSelection = (ackId) => {
    if (selectedAcks.includes(ackId)) {
      setSelectedAcks(selectedAcks.filter(id => id !== ackId));
    } else {
      setSelectedAcks([...selectedAcks, ackId]);
    }
  };

  const toggleSelectAllPending = () => {
    const pendingIds = filteredAcks.filter(a => a.status === 'Pending').map(a => a.id);
    if (selectedAcks.length === pendingIds.length && pendingIds.length > 0) {
      setSelectedAcks([]);
    } else {
      setSelectedAcks(pendingIds);
    }
  };

  const pendingCountInView = filteredAcks.filter(a => a.status === 'Pending').length;

  return (
    <div className="space-y-6 relative">
      


      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-[var(--sa-surface-2)] border border-[var(--sa-border)] rounded-xl p-4 flex flex-col justify-between">
          <div className="text-[var(--sa-text-sec)] text-sm font-medium mb-1">Policies Tracked</div>
          <div className="text-2xl font-bold text-[var(--sa-text)]">{trackedPolicies}</div>
        </div>
        <div className="bg-[var(--sa-surface-2)] border border-[var(--sa-border)] rounded-xl p-4 flex flex-col justify-between">
          <div className="text-[var(--sa-text-sec)] text-sm font-medium mb-1">Required to Acknowledge</div>
          <div className="text-2xl font-bold text-[var(--sa-text)]">{totalRequired}</div>
        </div>
        <div className="bg-[var(--sa-surface-2)] border border-[var(--sa-border)] rounded-xl p-4 flex flex-col justify-between">
          <div className="text-[var(--sa-text-sec)] text-sm font-medium mb-1 flex items-center gap-2"><CheckCircle size={14} className="text-[var(--sa-success)]"/> Acknowledged</div>
          <div className="text-2xl font-bold text-[var(--sa-text)]">{totalAcknowledged}</div>
        </div>
        <div className="bg-[var(--sa-surface-2)] border border-[var(--sa-border)] rounded-xl p-4 flex flex-col justify-between">
          <div className="text-[var(--sa-text-sec)] text-sm font-medium mb-1 flex items-center gap-2"><Clock size={14} className="text-[var(--sa-warning)]"/> Pending</div>
          <div className="text-2xl font-bold text-[var(--sa-text)]">{totalPending}</div>
        </div>
        <div className="bg-[var(--sa-accent)]/10 border border-[var(--sa-accent)]/20 rounded-xl p-4 flex flex-col justify-between">
          <div className="text-[var(--sa-accent)] text-sm font-medium mb-1">Overall Rate</div>
          <div className="text-3xl font-bold text-[var(--sa-accent)]">{totalRequired > 0 ? `${overallRate}%` : 'N/A'}</div>
        </div>
      </div>

      {/* Main Table View */}
      {!selectedPolicy ? (
        <div className="bg-[var(--sa-surface-2)] border border-[var(--sa-border)] rounded-xl flex flex-col animate-fade-in">
          <div className="p-4 border-b border-[var(--sa-border)] flex flex-wrap gap-4 items-center justify-between">
            <div className="relative flex-1 min-w-[200px] max-w-sm">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--sa-text-muted)]" />
              <input 
                type="text" 
                placeholder="Search policies..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[var(--sa-surface)] border border-[var(--sa-border)] rounded-lg pl-9 pr-4 py-2 text-sm text-[var(--sa-text)] placeholder-[var(--sa-text-muted)] focus:outline-none focus:border-[var(--sa-accent)] transition-colors"
              />
            </div>
            <div className="flex items-center gap-3">
              <select 
                value={departmentFilter}
                onChange={(e) => setDepartmentFilter(e.target.value)}
                className="bg-[var(--sa-surface)] border border-[var(--sa-border)] rounded-lg px-3 py-2 text-sm text-[var(--sa-text)] focus:outline-none focus:border-[var(--sa-accent)] transition-colors"
              >
                <option value="">All Departments</option>
                {departments.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
              {(searchQuery || departmentFilter) && (
                <button 
                  onClick={clearFilters}
                  className="text-xs font-medium text-[var(--sa-text-sec)] hover:text-[var(--sa-text)] flex items-center gap-1"
                >
                  <X size={14} /> Clear
                </button>
              )}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-[var(--sa-surface)] text-[var(--sa-text-muted)] text-xs uppercase">
                <tr>
                  <th className="px-5 py-3 font-medium">Policy</th>
                  <th className="px-5 py-3 font-medium">Applicable Depts</th>
                  <th className="px-5 py-3 font-medium">Deadline</th>
                  <th className="px-5 py-3 font-medium">Progress</th>
                  <th className="px-5 py-3 font-medium text-center">Status</th>
                  <th className="px-5 py-3 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--sa-border)]">
                {isLoading ? (
                  <tr>
                    <td colSpan="6" className="px-5 py-8 text-center text-[var(--sa-text-muted)]">Loading policies...</td>
                  </tr>
                ) : filteredPolicies.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="px-5 py-12 text-center text-[var(--sa-text-muted)] flex flex-col items-center justify-center">
                      <Shield size={32} className="mb-2 opacity-50" />
                      <p>No policies found matching your filters.</p>
                    </td>
                  </tr>
                ) : (
                  filteredPolicies.map(policy => {
                    const rate = policy.required ? Math.round((policy.accepted / policy.required) * 100) : 0;
                    return (
                      <tr key={policy.id} className="hover:bg-[var(--sa-surface)] transition-colors group">
                        <td className="px-5 py-4">
                          <div className="font-medium text-[var(--sa-text)] cursor-pointer hover:text-[var(--sa-success)] truncate max-w-[250px]" onClick={() => handleOpenDetails(policy)}>{policy.title}</div>
                          <div className="text-[10px] text-[var(--sa-text-muted)] mt-0.5">{policy.id} • {policy.version}</div>
                        </td>
                        <td className="px-5 py-4 text-[var(--sa-text-sec)]">
                          {policy.departments.join(', ')}
                        </td>
                        <td className="px-5 py-4 text-[var(--sa-text-sec)]">
                          {policy.deadline || '-'}
                        </td>
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <div className="flex-1 h-2 bg-[var(--sa-border)] rounded-full overflow-hidden w-24">
                              <div className="h-full bg-[var(--sa-accent)] rounded-full" style={{ width: `${rate}%` }}></div>
                            </div>
                            <span className="text-xs font-medium text-[var(--sa-text)] w-8">{rate}%</span>
                          </div>
                          <div className="text-[10px] text-[var(--sa-text-muted)] mt-1">{policy.accepted} / {policy.required} acknowledged</div>
                        </td>
                        <td className="px-5 py-4 text-center">
                          {policy.pending > 0 ? (
                            <span className="inline-flex items-center gap-1 bg-[var(--sa-warning)]/10 text-[var(--sa-warning)] px-2 py-0.5 rounded text-[10px] font-medium border border-[var(--sa-warning)]/20">
                              {policy.pending} Pending
                            </span>
                          ) : policy.required > 0 ? (
                            <span className="inline-flex items-center gap-1 bg-[var(--sa-success)]/10 text-[var(--sa-success)] px-2 py-0.5 rounded text-[10px] font-medium border border-[var(--sa-success)]/20">
                              <CheckCircle size={10} /> Complete
                            </span>
                          ) : (
                            <span className="text-[var(--sa-text-muted)] text-xs">N/A</span>
                          )}
                        </td>
                        <td className="px-5 py-4 text-right">
                          <button 
                            onClick={() => handleOpenDetails(policy)}
                            className="p-1.5 text-[var(--sa-text-sec)] hover:text-[var(--sa-success)] bg-[var(--sa-surface)] hover:bg-[var(--sa-surface-2)] rounded border border-[var(--sa-border)] transition-colors"
                            title="View Acknowledgements"
                          >
                            <ArrowRight size={14} />
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* DETAILS VIEW (EMPLOYEE LIST) */
        <div className="bg-[var(--sa-surface-2)] border border-[var(--sa-border)] rounded-xl flex flex-col animate-fade-in">
          
          <div className="p-5 border-b border-[var(--sa-border)] flex flex-wrap gap-4 items-start justify-between">
            <div>
              <button onClick={handleCloseDetails} className="text-xs font-medium text-[var(--sa-accent)] hover:text-[var(--sa-success)] flex items-center gap-1 mb-2">
                ← Back to Policies
              </button>
              <h2 className="text-xl font-bold text-[var(--sa-text)]">{selectedPolicy.title} <span className="text-sm font-normal text-[var(--sa-text-muted)] ml-2">{selectedPolicy.version}</span></h2>
              <p className="text-[var(--sa-text-sec)] text-sm mt-1">{selectedPolicy.description}</p>
            </div>
            <div className="flex gap-4 text-right">
               <div className="text-sm">
                 <div className="text-[var(--sa-text-muted)] text-[10px] uppercase">Deadline</div>
                 <div className="text-[var(--sa-text)] font-medium">{selectedPolicy.deadline || 'None'}</div>
               </div>
               <div className="text-sm">
                 <div className="text-[var(--sa-text-muted)] text-[10px] uppercase">Progress</div>
                 <div className="text-[var(--sa-text)] font-medium">{selectedPolicy.accepted} / {selectedPolicy.required}</div>
               </div>
            </div>
          </div>

          <div className="p-4 border-b border-[var(--sa-border)] bg-[var(--sa-surface)] flex flex-wrap gap-4 items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative w-64">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--sa-text-muted)]" />
                <input 
                  type="text" 
                  placeholder="Search employees..." 
                  value={empSearchQuery}
                  onChange={(e) => setEmpSearchQuery(e.target.value)}
                  className="w-full bg-[var(--sa-surface-2)] border border-[var(--sa-border)] rounded-lg pl-9 pr-4 py-2 text-sm text-[var(--sa-text)] placeholder-[var(--sa-text-muted)] focus:outline-none focus:border-[var(--sa-accent)] transition-colors"
                />
              </div>
              <select 
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-[var(--sa-surface-2)] border border-[var(--sa-border)] rounded-lg px-3 py-2 text-sm text-[var(--sa-text)] focus:outline-none focus:border-[var(--sa-accent)] transition-colors"
              >
                <option value="">All Statuses</option>
                <option value="Acknowledged">Acknowledged</option>
                <option value="Pending">Pending</option>
              </select>
            </div>
            
            <div className="flex items-center gap-3">
               {selectedAcks.length > 0 && (
                 <span className="text-xs font-medium text-[var(--sa-text-sec)]">
                   {selectedAcks.length} selected
                 </span>
               )}
               <button 
                  onClick={() => handleSendReminders(selectedAcks)}
                  disabled={selectedAcks.length === 0 || isSending}
                  className="bg-[var(--sa-accent)] hover:bg-[var(--sa-success)] text-white px-3 py-1.5 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 flex items-center gap-2"
                >
                  <Bell size={14} /> Send Reminders
                </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-[var(--sa-surface)] text-[var(--sa-text-muted)] text-xs uppercase">
                <tr>
                  <th className="px-5 py-3 w-10">
                    <input 
                      type="checkbox" 
                      className="rounded border-[var(--sa-border)] bg-[var(--sa-surface-2)] cursor-pointer"
                      checked={selectedAcks.length === pendingCountInView && pendingCountInView > 0}
                      onChange={toggleSelectAllPending}
                      disabled={pendingCountInView === 0}
                    />
                  </th>
                  <th className="px-5 py-3 font-medium">Employee</th>
                  <th className="px-5 py-3 font-medium">Status</th>
                  <th className="px-5 py-3 font-medium">Date / Last Reminder</th>
                  <th className="px-5 py-3 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--sa-border)]">
                {isLoadingDetails ? (
                  <tr>
                    <td colSpan="5" className="px-5 py-8 text-center text-[var(--sa-text-muted)]">Loading records...</td>
                  </tr>
                ) : filteredAcks.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="px-5 py-12 text-center text-[var(--sa-text-muted)]">
                      <p>No acknowledgement records found.</p>
                    </td>
                  </tr>
                ) : (
                  filteredAcks.map(ack => (
                    <tr key={ack.id} className="hover:bg-[var(--sa-surface)] transition-colors">
                      <td className="px-5 py-4">
                        <input 
                          type="checkbox"
                          className="rounded border-[var(--sa-border)] bg-[var(--sa-surface-2)] cursor-pointer disabled:opacity-30"
                          checked={selectedAcks.includes(ack.id)}
                          onChange={() => toggleSelection(ack.id)}
                          disabled={ack.status === 'Acknowledged'}
                        />
                      </td>
                      <td className="px-5 py-4">
                        <div className="font-medium text-[var(--sa-text)]">{ack.employeeName}</div>
                        <div className="text-[10px] text-[var(--sa-text-muted)] mt-0.5">{ack.employeeId}</div>
                      </td>
                      <td className="px-5 py-4">
                         {ack.status === 'Acknowledged' ? (
                            <span className="inline-flex items-center gap-1 bg-[var(--sa-success)]/10 text-[var(--sa-success)] px-2 py-0.5 rounded text-[10px] font-medium border border-[var(--sa-success)]/20">
                              <CheckCircle size={10} /> Acknowledged
                            </span>
                         ) : (
                            <span className="inline-flex items-center gap-1 bg-[var(--sa-warning)]/10 text-[var(--sa-warning)] px-2 py-0.5 rounded text-[10px] font-medium border border-[var(--sa-warning)]/20">
                              <Clock size={10} /> Pending
                            </span>
                         )}
                      </td>
                      <td className="px-5 py-4 text-[var(--sa-text-sec)]">
                        {ack.status === 'Acknowledged' ? (
                          ack.date
                        ) : ack.lastReminder ? (
                          <span className="text-xs">Reminded: {new Date(ack.lastReminder).toLocaleDateString()}</span>
                        ) : (
                          <span className="text-[var(--sa-text-muted)] text-xs">No reminder sent</span>
                        )}
                      </td>
                      <td className="px-5 py-4 text-right">
                        <button 
                          onClick={() => handleSendReminders([ack.id])}
                          disabled={ack.status === 'Acknowledged' || isSending}
                          className="p-1.5 text-[var(--sa-text-sec)] hover:text-[var(--sa-accent)] bg-[var(--sa-surface)] hover:bg-[var(--sa-surface-2)] rounded border border-[var(--sa-border)] transition-colors disabled:opacity-30 disabled:hover:text-[var(--sa-text-sec)] disabled:cursor-not-allowed"
                          title="Send Reminder"
                        >
                          <Bell size={14} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
};

export default CompliancePoliciesPage;
