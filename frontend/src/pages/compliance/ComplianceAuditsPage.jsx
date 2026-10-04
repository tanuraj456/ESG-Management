import React, { useState, useEffect } from 'react';
import { Plus, Search, Filter, X, FileSearch, CheckCircle, Clock, AlertTriangle, Eye, Edit2, CheckCircle2 } from 'lucide-react';
import { getAudits, createAudit, updateAudit, recordFinding } from '../../services/complianceDataService';

const ComplianceAuditsPage = () => {
  const [audits, setAudits] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Search & Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  // Modals
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedAudit, setSelectedAudit] = useState(null);

  // Forms
  const [auditForm, setAuditForm] = useState({ title: '', department: '', policy: '', date: '', status: 'Planned', scope: '' });
  const [findingForm, setFindingForm] = useState({ title: '', description: '', evidence: '' });
  const [formError, setFormError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Constants
  const departments = ['Operations', 'IT', 'Procurement', 'HR', 'Finance', 'All'];
  const statuses = ['Planned', 'In Progress', 'Completed'];
  const policies = ['Environmental Policy', 'Data Privacy Policy', 'Supplier Policy', 'Safety Policy'];

  const fetchAudits = async () => {
    setIsLoading(true);
    const data = await getAudits();
    setAudits(data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchAudits();
  }, []);

  // KPIs
  const totalAudits = audits.length;
  const plannedAudits = audits.filter(a => a.status === 'Planned').length;
  const inProgressAudits = audits.filter(a => a.status === 'In Progress').length;
  const completedAudits = audits.filter(a => a.status === 'Completed').length;

  // Filtered List
  const filteredAudits = audits.filter(a => {
    const matchesSearch = a.title.toLowerCase().includes(searchQuery.toLowerCase()) || a.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDept = departmentFilter ? a.department === departmentFilter : true;
    const matchesStatus = statusFilter ? a.status === statusFilter : true;
    return matchesSearch && matchesDept && matchesStatus;
  });

  const clearFilters = () => {
    setSearchQuery('');
    setDepartmentFilter('');
    setStatusFilter('');
  };

  // Create Audit
  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    if (!auditForm.title.trim()) return setFormError('Title is required');
    if (!auditForm.department) return setFormError('Department is required');
    if (!auditForm.date) return setFormError('Audit Date is required');

    setIsSubmitting(true);
    try {
      await createAudit(auditForm);
      setShowCreateModal(false);
      setAuditForm({ title: '', department: '', policy: '', date: '', status: 'Planned', scope: '' });
      await fetchAudits();
    } catch (err) {
      setFormError('Failed to create audit');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Edit Audit
  const openEditModal = (audit) => {
    setSelectedAudit(audit);
    setAuditForm({
      title: audit.title,
      department: audit.department,
      policy: audit.policy || '',
      date: audit.date,
      status: audit.status,
      scope: audit.scope || ''
    });
    setShowEditModal(true);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    if (!auditForm.title.trim()) return setFormError('Title is required');
    if (!auditForm.department) return setFormError('Department is required');
    if (!auditForm.date) return setFormError('Audit Date is required');

    setIsSubmitting(true);
    try {
      await updateAudit(selectedAudit.id, auditForm);
      setShowEditModal(false);
      await fetchAudits();
      if (showDetailsModal) { // Refresh details if open
         const refreshed = await getAudits();
         setSelectedAudit(refreshed.find(a => a.id === selectedAudit.id));
      }
    } catch (err) {
      setFormError('Failed to update audit');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Details & Workflow
  const openDetailsModal = (audit) => {
    setSelectedAudit(audit);
    setFindingForm({ title: '', description: '', evidence: '' });
    setShowDetailsModal(true);
  };

  const handleCompleteAudit = async () => {
    if (selectedAudit.status === 'Completed') return;
    if (selectedAudit.findings > 0) {
       if(!window.confirm(`This audit has ${selectedAudit.findings} findings. Are you sure you want to mark it as Completed?`)) {
           return;
       }
    }
    
    setIsSubmitting(true);
    try {
      await updateAudit(selectedAudit.id, { status: 'Completed' });
      const refreshed = await getAudits();
      setAudits(refreshed);
      setSelectedAudit(refreshed.find(a => a.id === selectedAudit.id));
    } catch (err) {
      alert('Failed to complete audit');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddFinding = async (e) => {
    e.preventDefault();
    if (!findingForm.title.trim() || !findingForm.description.trim()) {
      alert('Title and description are required for findings');
      return;
    }
    
    setIsSubmitting(true);
    try {
      await recordFinding(selectedAudit.id, findingForm);
      setFindingForm({ title: '', description: '', evidence: '' });
      const refreshed = await getAudits();
      setAudits(refreshed);
      setSelectedAudit(refreshed.find(a => a.id === selectedAudit.id));
    } catch (err) {
      alert('Failed to record finding: ' + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Completed': return 'bg-[var(--sa-success)]/10 text-[var(--sa-success)] border-[var(--sa-success)]/20';
      case 'In Progress': return 'bg-[var(--sa-warning)]/10 text-[var(--sa-warning)] border-[var(--sa-warning)]/20';
      case 'Planned': return 'bg-[var(--sa-accent)]/10 text-[var(--sa-accent)] border-[var(--sa-accent)]/20';
      default: return 'bg-[var(--sa-text-muted)]/10 text-[var(--sa-text-muted)] border-[var(--sa-text-muted)]/20';
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
        </div>
        <button 
          onClick={() => {
            setAuditForm({ title: '', department: '', policy: '', date: '', status: 'Planned', scope: '' });
            setShowCreateModal(true);
          }}
          className="bg-[var(--sa-success)] hover:bg-[var(--sa-accent)] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
        >
          <Plus size={16} /> Create Audit
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-[var(--sa-surface-2)] border border-[var(--sa-border)] rounded-xl p-4">
          <div className="text-[var(--sa-text-sec)] text-sm font-medium mb-1">Total Audits</div>
          <div className="text-2xl font-bold text-[var(--sa-text)]">{totalAudits}</div>
        </div>
        <div className="bg-[var(--sa-surface-2)] border border-[var(--sa-border)] rounded-xl p-4">
          <div className="text-[var(--sa-text-sec)] text-sm font-medium mb-1 flex items-center gap-2"><Clock size={14} className="text-[var(--sa-accent)]"/> Planned</div>
          <div className="text-2xl font-bold text-[var(--sa-text)]">{plannedAudits}</div>
        </div>
        <div className="bg-[var(--sa-surface-2)] border border-[var(--sa-border)] rounded-xl p-4">
          <div className="text-[var(--sa-text-sec)] text-sm font-medium mb-1 flex items-center gap-2"><AlertTriangle size={14} className="text-[var(--sa-warning)]"/> In Progress</div>
          <div className="text-2xl font-bold text-[var(--sa-text)]">{inProgressAudits}</div>
        </div>
        <div className="bg-[var(--sa-surface-2)] border border-[var(--sa-border)] rounded-xl p-4">
          <div className="text-[var(--sa-text-sec)] text-sm font-medium mb-1 flex items-center gap-2"><CheckCircle2 size={14} className="text-[var(--sa-success)]"/> Completed</div>
          <div className="text-2xl font-bold text-[var(--sa-text)]">{completedAudits}</div>
        </div>
      </div>

      {/* Filters & Table */}
      <div className="bg-[var(--sa-surface-2)] border border-[var(--sa-border)] rounded-xl flex flex-col">
        <div className="p-4 border-b border-[var(--sa-border)] flex flex-wrap gap-4 items-center justify-between">
          <div className="relative flex-1 min-w-[200px] max-w-sm">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--sa-text-muted)]" />
            <input 
              type="text" 
              placeholder="Search audits by title or ID..." 
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
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-[var(--sa-surface)] border border-[var(--sa-border)] rounded-lg px-3 py-2 text-sm text-[var(--sa-text)] focus:outline-none focus:border-[var(--sa-accent)] transition-colors"
            >
              <option value="">All Statuses</option>
              {statuses.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            {(searchQuery || departmentFilter || statusFilter) && (
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
                <th className="px-5 py-3 font-medium">Audit ID / Title</th>
                <th className="px-5 py-3 font-medium">Department</th>
                <th className="px-5 py-3 font-medium">Date</th>
                <th className="px-5 py-3 font-medium text-center">Findings</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--sa-border)]">
              {isLoading ? (
                <tr>
                  <td colSpan="6" className="px-5 py-8 text-center text-[var(--sa-text-muted)]">Loading audits...</td>
                </tr>
              ) : filteredAudits.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-5 py-12 text-center text-[var(--sa-text-muted)] flex flex-col items-center justify-center">
                    <FileSearch size={32} className="mb-2 opacity-50" />
                    <p>No audits found matching your filters.</p>
                  </td>
                </tr>
              ) : (
                filteredAudits.map(audit => (
                  <tr key={audit.id} className="hover:bg-[var(--sa-surface)] transition-colors">
                    <td className="px-5 py-4">
                      <div className="font-medium text-[var(--sa-text)] cursor-pointer hover:text-[var(--sa-success)]" onClick={() => openDetailsModal(audit)}>{audit.title}</div>
                      <div className="text-[10px] text-[var(--sa-text-muted)] mt-0.5">{audit.id} • {audit.policy || 'No linked policy'}</div>
                    </td>
                    <td className="px-5 py-4 text-[var(--sa-text-sec)]">{audit.department}</td>
                    <td className="px-5 py-4 text-[var(--sa-text-sec)]">{audit.date}</td>
                    <td className="px-5 py-4 text-center">
                      {audit.findings > 0 ? (
                        <span className="inline-flex items-center justify-center bg-red-500/20 text-red-500 text-xs font-bold w-6 h-6 rounded-full">
                          {audit.findings}
                        </span>
                      ) : (
                        <span className="text-[var(--sa-text-muted)]">-</span>
                      )}
                    </td>
                    <td className="px-5 py-4">
                      <span className={`px-2.5 py-1 rounded-md text-[10px] font-medium border ${getStatusBadge(audit.status)}`}>
                        {audit.status}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button 
                          onClick={() => openDetailsModal(audit)}
                          className="p-1.5 text-[var(--sa-text-sec)] hover:text-[var(--sa-success)] bg-[var(--sa-surface)] hover:bg-[var(--sa-surface-2)] rounded border border-[var(--sa-border)] transition-colors"
                          title="View Details"
                        >
                          <Eye size={14} />
                        </button>
                        {audit.status !== 'Completed' && (
                          <button 
                            onClick={() => openEditModal(audit)}
                            className="p-1.5 text-[var(--sa-text-sec)] hover:text-[var(--sa-accent)] bg-[var(--sa-surface)] hover:bg-[var(--sa-surface-2)] rounded border border-[var(--sa-border)] transition-colors"
                            title="Edit Audit"
                          >
                            <Edit2 size={14} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* CREATE / EDIT MODAL */}
      {(showCreateModal || showEditModal) && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-[var(--sa-surface-2)] border border-[var(--sa-border)] rounded-2xl p-6 max-w-lg w-full shadow-2xl animate-fade-up max-h-[90vh] overflow-y-auto form-scrollbar">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-[var(--sa-text)]">{showEditModal ? 'Edit Audit' : 'Create New Audit'}</h3>
              <button onClick={() => { setShowCreateModal(false); setShowEditModal(false); }} className="text-[var(--sa-text-muted)] hover:text-[var(--sa-text)]">
                <X size={20} />
              </button>
            </div>
            
            {formError && (
              <div className="mb-4 p-3 bg-red-900/20 border border-red-500/30 rounded-lg text-sm text-red-400">
                {formError}
              </div>
            )}

            <form onSubmit={showEditModal ? handleEditSubmit : handleCreateSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[var(--sa-text-sec)] mb-1">Audit Title *</label>
                <input 
                  type="text" 
                  value={auditForm.title}
                  onChange={e => setAuditForm({...auditForm, title: e.target.value})}
                  className="w-full bg-[var(--sa-surface)] border border-[var(--sa-border)] rounded-lg px-3 py-2 text-[var(--sa-text)] focus:outline-none focus:border-[var(--sa-accent)]"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[var(--sa-text-sec)] mb-1">Department *</label>
                  <select 
                    value={auditForm.department}
                    onChange={e => setAuditForm({...auditForm, department: e.target.value})}
                    className="w-full bg-[var(--sa-surface)] border border-[var(--sa-border)] rounded-lg px-3 py-2 text-[var(--sa-text)] focus:outline-none focus:border-[var(--sa-accent)]"
                  >
                    <option value="">Select...</option>
                    {departments.filter(d => d !== 'All').map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--sa-text-sec)] mb-1">Audit Date *</label>
                  <input 
                    type="date" 
                    value={auditForm.date}
                    onChange={e => setAuditForm({...auditForm, date: e.target.value})}
                    className="w-full bg-[var(--sa-surface)] border border-[var(--sa-border)] rounded-lg px-3 py-2 text-[var(--sa-text)] focus:outline-none focus:border-[var(--sa-accent)]"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[var(--sa-text-sec)] mb-1">Linked Policy</label>
                  <select 
                    value={auditForm.policy}
                    onChange={e => setAuditForm({...auditForm, policy: e.target.value})}
                    className="w-full bg-[var(--sa-surface)] border border-[var(--sa-border)] rounded-lg px-3 py-2 text-[var(--sa-text)] focus:outline-none focus:border-[var(--sa-accent)]"
                  >
                    <option value="">None</option>
                    {policies.map(p => <option key={p} value={p}>{p}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--sa-text-sec)] mb-1">Status</label>
                  <select 
                    value={auditForm.status}
                    onChange={e => setAuditForm({...auditForm, status: e.target.value})}
                    className="w-full bg-[var(--sa-surface)] border border-[var(--sa-border)] rounded-lg px-3 py-2 text-[var(--sa-text)] focus:outline-none focus:border-[var(--sa-accent)]"
                    disabled={showEditModal && selectedAudit?.status === 'Completed'}
                  >
                    <option value="Planned">Planned</option>
                    <option value="In Progress">In Progress</option>
                    {/* Only show completed if already completed, else use explicit workflow */}
                    {(showEditModal && selectedAudit?.status === 'Completed') && <option value="Completed">Completed</option>}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--sa-text-sec)] mb-1">Audit Scope / Description</label>
                <textarea 
                  value={auditForm.scope}
                  onChange={e => setAuditForm({...auditForm, scope: e.target.value})}
                  rows="3"
                  className="w-full bg-[var(--sa-surface)] border border-[var(--sa-border)] rounded-lg px-3 py-2 text-[var(--sa-text)] focus:outline-none focus:border-[var(--sa-accent)]"
                ></textarea>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-[var(--sa-border)]">
                <button 
                  type="button"
                  onClick={() => { setShowCreateModal(false); setShowEditModal(false); }}
                  className="px-4 py-2 rounded-lg text-sm font-medium text-[var(--sa-text)] hover:bg-[var(--sa-surface)]"
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-[var(--sa-success)] hover:bg-[var(--sa-accent)] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
                >
                  {isSubmitting ? 'Saving...' : (showEditModal ? 'Save Changes' : 'Create Audit')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DETAILS MODAL */}
      {showDetailsModal && selectedAudit && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex justify-end">
          <div className="bg-[var(--sa-surface-2)] border-l border-[var(--sa-border)] w-full max-w-2xl h-full shadow-2xl animate-fade-left flex flex-col">
            <div className="p-6 border-b border-[var(--sa-border)] flex justify-between items-start shrink-0">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <span className={`px-2 py-0.5 rounded text-xs font-medium border ${getStatusBadge(selectedAudit.status)}`}>
                    {selectedAudit.status}
                  </span>
                  <span className="text-[var(--sa-text-muted)] text-sm">{selectedAudit.id}</span>
                </div>
                <h2 className="text-2xl font-bold text-[var(--sa-text)]">{selectedAudit.title}</h2>
              </div>
              <button onClick={() => setShowDetailsModal(false)} className="text-[var(--sa-text-muted)] hover:text-[var(--sa-text)] p-1 bg-[var(--sa-surface)] rounded border border-[var(--sa-border)]">
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto flex-1 form-scrollbar">
              
              {/* Audit Details */}
              <div className="grid grid-cols-2 gap-y-4 gap-x-8 mb-8">
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-[var(--sa-text-muted)] mb-1">Department</div>
                  <div className="text-[var(--sa-text)] font-medium">{selectedAudit.department}</div>
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-[var(--sa-text-muted)] mb-1">Audit Date</div>
                  <div className="text-[var(--sa-text)] font-medium">{selectedAudit.date}</div>
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-[var(--sa-text-muted)] mb-1">Linked Policy</div>
                  <div className="text-[var(--sa-text)] font-medium">{selectedAudit.policy || 'None'}</div>
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-[var(--sa-text-muted)] mb-1">Findings</div>
                  <div className="text-[var(--sa-text)] font-medium">{selectedAudit.findings} identified</div>
                </div>
                <div className="col-span-2">
                  <div className="text-[10px] uppercase tracking-wider text-[var(--sa-text-muted)] mb-1">Audit Scope / Description</div>
                  <div className="text-[var(--sa-text-sec)] text-sm">{selectedAudit.scope || 'No scope defined.'}</div>
                </div>
              </div>

              <hr className="border-[var(--sa-border)] mb-8" />

              {/* Findings Section */}
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-bold text-[var(--sa-text)]">Audit Findings</h3>
              </div>
              
              <div className="space-y-4 mb-8">
                {(!selectedAudit.findingsList || selectedAudit.findingsList.length === 0) ? (
                  <div className="bg-[var(--sa-surface)] border border-dashed border-[var(--sa-border)] rounded-xl p-8 text-center text-[var(--sa-text-muted)] text-sm">
                    No findings recorded for this audit.
                  </div>
                ) : (
                  selectedAudit.findingsList.map(f => (
                    <div key={f.id} className="bg-[var(--sa-surface)] border border-[var(--sa-border)] border-l-4 border-l-red-500 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold text-[var(--sa-text)]">{f.title}</h4>
                        <span className="text-[10px] text-[var(--sa-text-muted)]">{f.date}</span>
                      </div>
                      <p className="text-sm text-[var(--sa-text-sec)]">{f.description}</p>
                      {f.evidence && (
                        <div className="mt-3 text-xs bg-[var(--sa-surface-2)] p-2 rounded text-[var(--sa-text-muted)]">
                          <span className="font-medium text-[var(--sa-text-sec)]">Evidence:</span> {f.evidence}
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>

              {/* Record Finding Form */}
              {selectedAudit.status !== 'Completed' && (
                <div className="bg-[var(--sa-surface)] border border-[var(--sa-border)] rounded-xl p-5 mb-8">
                  <h4 className="font-bold text-[var(--sa-text)] mb-4">Record New Finding</h4>
                  <form onSubmit={handleAddFinding} className="space-y-4">
                    <div>
                      <input 
                        type="text" 
                        placeholder="Finding Title *"
                        value={findingForm.title}
                        onChange={e => setFindingForm({...findingForm, title: e.target.value})}
                        className="w-full bg-[var(--sa-surface-2)] border border-[var(--sa-border)] rounded-lg px-3 py-2 text-sm text-[var(--sa-text)] focus:outline-none focus:border-[var(--sa-accent)]"
                      />
                    </div>
                    <div>
                      <textarea 
                        placeholder="Detailed Description *"
                        value={findingForm.description}
                        onChange={e => setFindingForm({...findingForm, description: e.target.value})}
                        rows="2"
                        className="w-full bg-[var(--sa-surface-2)] border border-[var(--sa-border)] rounded-lg px-3 py-2 text-sm text-[var(--sa-text)] focus:outline-none focus:border-[var(--sa-accent)]"
                      ></textarea>
                    </div>
                    <div>
                      <textarea 
                        placeholder="Evidence / References (Optional)"
                        value={findingForm.evidence}
                        onChange={e => setFindingForm({...findingForm, evidence: e.target.value})}
                        rows="2"
                        className="w-full bg-[var(--sa-surface-2)] border border-[var(--sa-border)] rounded-lg px-3 py-2 text-sm text-[var(--sa-text)] focus:outline-none focus:border-[var(--sa-accent)]"
                      ></textarea>
                    </div>
                    <div className="flex justify-end">
                      <button 
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-[var(--sa-surface-2)] hover:bg-[var(--sa-border)] border border-[var(--sa-border)] text-[var(--sa-text)] px-4 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
                      >
                        {isSubmitting ? 'Recording...' : 'Record Finding'}
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>

            {/* Footer Actions */}
            <div className="p-4 border-t border-[var(--sa-border)] bg-[var(--sa-surface)] shrink-0 flex justify-between items-center">
               <div>
                  {selectedAudit.status === 'Completed' ? (
                     <span className="text-sm text-[var(--sa-text-muted)] flex items-center gap-2"><CheckCircle size={16} className="text-[var(--sa-success)]"/> Audit Completed</span>
                  ) : (
                     <span className="text-xs text-[var(--sa-text-muted)]">Unresolved findings must be recorded as Compliance Issues manually.</span>
                  )}
               </div>
               <div className="flex gap-3">
                 {selectedAudit.status !== 'Completed' && (
                   <>
                     <button 
                       onClick={() => openEditModal(selectedAudit)}
                       className="px-4 py-2 rounded-lg text-sm font-medium text-[var(--sa-text)] bg-[var(--sa-surface-2)] border border-[var(--sa-border)] hover:bg-[var(--sa-border)] transition-colors"
                     >
                       Edit Audit
                     </button>
                     <button 
                       onClick={handleCompleteAudit}
                       disabled={isSubmitting}
                       className="px-4 py-2 rounded-lg text-sm font-medium text-white bg-[var(--sa-success)] hover:bg-[var(--sa-accent)] transition-colors disabled:opacity-50"
                     >
                       Mark as Completed
                     </button>
                   </>
                 )}
               </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default ComplianceAuditsPage;
