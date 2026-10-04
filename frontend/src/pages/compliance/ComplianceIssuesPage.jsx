import React, { useState, useEffect } from 'react';
import { Plus, Search, Filter, X, AlertCircle, CheckCircle, Clock, AlertTriangle, Eye, ArrowRight, User } from 'lucide-react';
import { getIssues, getAudits, getEmployees, createIssue, updateIssue } from '../../services/complianceDataService';
import { createNotification } from '../../services/notificationService';

const ComplianceIssuesPage = () => {
  const [issues, setIssues] = useState([]);
  const [audits, setAudits] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Simulated Current User for Separation of Duties Testing
  const [currentUserId, setCurrentUserId] = useState('EMP-012');

  // Search & Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [severityFilter, setSeverityFilter] = useState('');

  // Modals
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedIssue, setSelectedIssue] = useState(null);

  // Forms
  const [issueForm, setIssueForm] = useState({ title: '', description: '', auditId: '', department: '', severity: '', owner: '', dueDate: '', evidence: '' });
  const [resolutionForm, setResolutionForm] = useState({ details: '' });
  const [verificationForm, setVerificationForm] = useState({ notes: '', approved: true });
  
  const [formError, setFormError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Constants
  const departments = ['Operations', 'IT', 'Procurement', 'HR', 'Finance'];
  const severities = ['Low', 'Medium', 'High', 'Critical'];
  const statuses = ['Open', 'In Progress', 'Resolved', 'Closed'];

  const fetchData = async () => {
    setIsLoading(true);
    const [fetchedIssues, fetchedAudits, fetchedEmployees] = await Promise.all([
      getIssues(), getAudits(), getEmployees()
    ]);
    setIssues(fetchedIssues);
    setAudits(fetchedAudits);
    setEmployees(fetchedEmployees);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // KPIs
  const openIssues = issues.filter(i => i.status === 'Open').length;
  const inProgressIssues = issues.filter(i => i.status === 'In Progress').length;
  const resolvedIssues = issues.filter(i => i.status === 'Resolved').length;
  const closedIssues = issues.filter(i => i.status === 'Closed').length;
  const overdueIssues = issues.filter(i => i.isOverdue).length;

  // Filtered List
  const filteredIssues = issues.filter(i => {
    const q = searchQuery.toLowerCase();
    const matchesSearch = i.title.toLowerCase().includes(q) || i.id.toLowerCase().includes(q) || i.description.toLowerCase().includes(q);
    const matchesDept = departmentFilter ? i.department === departmentFilter : true;
    const matchesStatus = statusFilter ? i.status === statusFilter : true;
    const matchesSeverity = severityFilter ? i.severity === severityFilter : true;
    return matchesSearch && matchesDept && matchesStatus && matchesSeverity;
  });

  const clearFilters = () => {
    setSearchQuery('');
    setDepartmentFilter('');
    setStatusFilter('');
    setSeverityFilter('');
  };

  // Create Issue
  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    if (!issueForm.title.trim() || !issueForm.description.trim()) return setFormError('Title and description are required.');
    if (!issueForm.department) return setFormError('Department is required.');
    if (!issueForm.severity) return setFormError('Severity is required.');
    if (!issueForm.owner) return setFormError('Owner is required.');
    if (!issueForm.dueDate) return setFormError('Due date is required.');
    
    // Prevent past dates
    const today = new Date().toISOString().split('T')[0];
    if (issueForm.dueDate < today) return setFormError('Due date cannot be in the past.');

    setIsSubmitting(true);
    try {
      const newIssue = await createIssue(issueForm);
      
      // Notification for the assigned owner
      await createNotification({
        title: 'New Compliance Issue Assigned',
        description: `You have been assigned issue ${newIssue.id}: ${newIssue.title}`,
        type: 'alert',
        link: '/compliance/issues'
      });

      setShowCreateModal(false);
      setIssueForm({ title: '', description: '', auditId: '', department: '', severity: '', owner: '', dueDate: '', evidence: '' });
      await fetchData();
      alert(`Success: Issue ${newIssue.id} added to the current demo session.`);
    } catch (err) {
      setFormError('Failed to raise issue');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Details Modal and Workflow
  const openDetailsModal = (issue) => {
    setSelectedIssue(issue);
    setResolutionForm({ details: '' });
    setVerificationForm({ notes: '', approved: true });
    setShowDetailsModal(true);
  };

  const handleStatusChange = async (newStatus, historyAction, extraUpdates = {}) => {
    setIsSubmitting(true);
    try {
      await updateIssue(selectedIssue.id, { status: newStatus, historyAction, ...extraUpdates });
      const refreshed = await getIssues();
      setIssues(refreshed);
      setSelectedIssue(refreshed.find(i => i.id === selectedIssue.id));
    } catch (err) {
      alert('Failed to update issue');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleMarkResolved = async (e) => {
    e.preventDefault();
    if (!resolutionForm.details.trim()) {
       alert("Resolution details are required.");
       return;
    }
    await handleStatusChange('Resolved', 'Marked as Resolved', {
       resolution: { details: resolutionForm.details, date: new Date().toISOString().split('T')[0] }
    });
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    if (!verificationForm.notes.trim()) {
       alert("Verification notes are required.");
       return;
    }
    
    if (verificationForm.approved) {
      await handleStatusChange('Closed', 'Verified and Closed', {
         verifier: { id: currentUserId, name: employees.find(e => e.id === currentUserId)?.name, notes: verificationForm.notes, date: new Date().toISOString().split('T')[0] }
      });
    } else {
      await handleStatusChange('In Progress', 'Verification Rejected', {
         historyAction: `Verification Rejected: ${verificationForm.notes}`
      });
    }
  };

  const getSeverityBadge = (severity) => {
    switch (severity) {
      case 'Critical': return 'bg-red-500/20 text-red-500';
      case 'High': return 'bg-orange-500/20 text-orange-400';
      case 'Medium': return 'bg-yellow-500/20 text-yellow-400';
      case 'Low': return 'bg-[var(--sa-accent)]/20 text-[var(--sa-accent)]';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const getStatusBadge = (status, isOverdue) => {
    if (isOverdue) return 'bg-red-500/10 text-red-500 border-red-500/20';
    switch (status) {
      case 'Closed': return 'bg-[var(--sa-text-muted)]/10 text-[var(--sa-text-muted)] border-[var(--sa-text-muted)]/20';
      case 'Resolved': return 'bg-[var(--sa-success)]/10 text-[var(--sa-success)] border-[var(--sa-success)]/20';
      case 'In Progress': return 'bg-[var(--sa-warning)]/10 text-[var(--sa-warning)] border-[var(--sa-warning)]/20';
      case 'Open': return 'bg-[var(--sa-accent)]/10 text-[var(--sa-accent)] border-[var(--sa-accent)]/20';
      default: return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
    }
  };

  const currentEmployeeName = employees.find(e => e.id === currentUserId)?.name || currentUserId;
  const isCurrentUserOwner = selectedIssue?.owner === currentUserId;

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
        </div>
        <div className="flex gap-4 items-center">
           {/* Demo Auth Switcher */}
           <div className="flex items-center gap-2 bg-[var(--sa-surface-2)] border border-[var(--sa-border)] rounded-lg px-3 py-1.5 text-sm">
             <User size={14} className="text-[var(--sa-text-muted)]" />
             <span className="text-[var(--sa-text-sec)]">Testing as:</span>
             <select 
               value={currentUserId} 
               onChange={(e) => setCurrentUserId(e.target.value)}
               className="bg-transparent text-[var(--sa-text)] focus:outline-none font-medium cursor-pointer"
             >
               {employees.map(e => <option key={e.id} value={e.id}>{e.name}</option>)}
             </select>
           </div>
           
          <button 
            onClick={() => {
              setIssueForm({ title: '', description: '', auditId: '', department: '', severity: '', owner: '', dueDate: '', evidence: '' });
              setShowCreateModal(true);
            }}
            className="bg-[var(--sa-success)] hover:bg-[var(--sa-accent)] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
          >
            <Plus size={16} /> Raise Issue
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-[var(--sa-surface-2)] border border-[var(--sa-border)] rounded-xl p-4">
          <div className="text-[var(--sa-text-sec)] text-sm font-medium mb-1">Open</div>
          <div className="text-2xl font-bold text-[var(--sa-text)]">{openIssues}</div>
        </div>
        <div className="bg-[var(--sa-surface-2)] border border-[var(--sa-border)] rounded-xl p-4">
          <div className="text-[var(--sa-text-sec)] text-sm font-medium mb-1">In Progress</div>
          <div className="text-2xl font-bold text-[var(--sa-text)]">{inProgressIssues}</div>
        </div>
        <div className="bg-[var(--sa-surface-2)] border border-[var(--sa-border)] rounded-xl p-4">
          <div className="text-[var(--sa-text-sec)] text-sm font-medium mb-1 flex items-center gap-2"><CheckCircle size={14} className="text-[var(--sa-success)]"/> Resolved</div>
          <div className="text-2xl font-bold text-[var(--sa-text)]">{resolvedIssues}</div>
        </div>
        <div className="bg-[var(--sa-surface-2)] border border-[var(--sa-border)] rounded-xl p-4">
          <div className="text-[var(--sa-text-sec)] text-sm font-medium mb-1">Closed</div>
          <div className="text-2xl font-bold text-[var(--sa-text)]">{closedIssues}</div>
        </div>
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4">
          <div className="text-red-400 text-sm font-medium mb-1 flex items-center gap-2"><Clock size={14} /> Overdue</div>
          <div className="text-2xl font-bold text-red-500">{overdueIssues}</div>
        </div>
      </div>

      {/* Filters & Table */}
      <div className="bg-[var(--sa-surface-2)] border border-[var(--sa-border)] rounded-xl flex flex-col">
        <div className="p-4 border-b border-[var(--sa-border)] flex flex-wrap gap-4 items-center justify-between">
          <div className="relative flex-1 min-w-[200px] max-w-sm">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--sa-text-muted)]" />
            <input 
              type="text" 
              placeholder="Search issues..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[var(--sa-surface)] border border-[var(--sa-border)] rounded-lg pl-9 pr-4 py-2 text-sm text-[var(--sa-text)] placeholder-[var(--sa-text-muted)] focus:outline-none focus:border-[var(--sa-accent)] transition-colors"
            />
          </div>
          <div className="flex items-center gap-3">
            <select 
              value={severityFilter}
              onChange={(e) => setSeverityFilter(e.target.value)}
              className="bg-[var(--sa-surface)] border border-[var(--sa-border)] rounded-lg px-3 py-2 text-sm text-[var(--sa-text)] focus:outline-none focus:border-[var(--sa-accent)] transition-colors"
            >
              <option value="">All Severities</option>
              {severities.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
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
            {(searchQuery || departmentFilter || statusFilter || severityFilter) && (
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
                <th className="px-5 py-3 font-medium">Issue</th>
                <th className="px-5 py-3 font-medium">Linked Audit</th>
                <th className="px-5 py-3 font-medium">Department</th>
                <th className="px-5 py-3 font-medium">Severity</th>
                <th className="px-5 py-3 font-medium">Due Date</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--sa-border)]">
              {isLoading ? (
                <tr>
                  <td colSpan="7" className="px-5 py-8 text-center text-[var(--sa-text-muted)]">Loading issues...</td>
                </tr>
              ) : filteredIssues.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-5 py-12 text-center text-[var(--sa-text-muted)] flex flex-col items-center justify-center">
                    <AlertCircle size={32} className="mb-2 opacity-50" />
                    <p>No compliance issues found.</p>
                  </td>
                </tr>
              ) : (
                filteredIssues.map(issue => {
                  const ownerName = employees.find(e => e.id === issue.owner)?.name || issue.owner;
                  return (
                    <tr key={issue.id} className="hover:bg-[var(--sa-surface)] transition-colors">
                      <td className="px-5 py-4">
                        <div className="font-medium text-[var(--sa-text)] cursor-pointer hover:text-[var(--sa-success)] truncate max-w-[200px]" onClick={() => openDetailsModal(issue)}>{issue.title}</div>
                        <div className="text-[10px] text-[var(--sa-text-muted)] mt-0.5">{issue.id} • {ownerName}</div>
                      </td>
                      <td className="px-5 py-4 text-[var(--sa-text-sec)]">{issue.auditId || '-'}</td>
                      <td className="px-5 py-4 text-[var(--sa-text-sec)]">{issue.department}</td>
                      <td className="px-5 py-4">
                        <span className={`px-2 py-1 rounded text-[10px] font-bold ${getSeverityBadge(issue.severity)}`}>
                          {issue.severity}
                        </span>
                      </td>
                      <td className={`px-5 py-4 ${issue.isOverdue ? 'text-red-400 font-bold flex items-center gap-1' : 'text-[var(--sa-text-sec)]'}`}>
                        {issue.isOverdue && <AlertTriangle size={12} />}
                        {issue.dueDate}
                      </td>
                      <td className="px-5 py-4">
                        <span className={`px-2.5 py-1 rounded-md text-[10px] font-medium border ${getStatusBadge(issue.status, issue.isOverdue)}`}>
                          {issue.isOverdue ? 'OVERDUE' : issue.status}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-right">
                        <button 
                          onClick={() => openDetailsModal(issue)}
                          className="p-1.5 text-[var(--sa-text-sec)] hover:text-[var(--sa-success)] bg-[var(--sa-surface)] hover:bg-[var(--sa-surface-2)] rounded border border-[var(--sa-border)] transition-colors"
                          title="View Details"
                        >
                          <ArrowRight size={14} />
                        </button>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* CREATE MODAL */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-[var(--sa-surface-2)] border border-[var(--sa-border)] rounded-2xl p-6 max-w-xl w-full shadow-2xl animate-fade-up max-h-[90vh] overflow-y-auto form-scrollbar">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-[var(--sa-text)]">Raise Compliance Issue</h3>
              <button onClick={() => setShowCreateModal(false)} className="text-[var(--sa-text-muted)] hover:text-[var(--sa-text)]">
                <X size={20} />
              </button>
            </div>
            
            {formError && (
              <div className="mb-4 p-3 bg-red-900/20 border border-red-500/30 rounded-lg text-sm text-red-400">
                {formError}
              </div>
            )}

            <form onSubmit={handleCreateSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[var(--sa-text-sec)] mb-1">Issue Title *</label>
                <input 
                  type="text" 
                  value={issueForm.title}
                  onChange={e => setIssueForm({...issueForm, title: e.target.value})}
                  className="w-full bg-[var(--sa-surface)] border border-[var(--sa-border)] rounded-lg px-3 py-2 text-[var(--sa-text)] focus:outline-none focus:border-[var(--sa-accent)]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--sa-text-sec)] mb-1">Description *</label>
                <textarea 
                  value={issueForm.description}
                  onChange={e => setIssueForm({...issueForm, description: e.target.value})}
                  rows="3"
                  className="w-full bg-[var(--sa-surface)] border border-[var(--sa-border)] rounded-lg px-3 py-2 text-[var(--sa-text)] focus:outline-none focus:border-[var(--sa-accent)]"
                ></textarea>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[var(--sa-text-sec)] mb-1">Linked Audit</label>
                  <select 
                    value={issueForm.auditId}
                    onChange={e => {
                      const aud = audits.find(a => a.id === e.target.value);
                      setIssueForm({...issueForm, auditId: e.target.value, department: aud ? aud.department : issueForm.department});
                    }}
                    className="w-full bg-[var(--sa-surface)] border border-[var(--sa-border)] rounded-lg px-3 py-2 text-[var(--sa-text)] focus:outline-none focus:border-[var(--sa-accent)]"
                  >
                    <option value="">None</option>
                    {audits.map(a => <option key={a.id} value={a.id}>{a.id} - {a.title}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--sa-text-sec)] mb-1">Department *</label>
                  <select 
                    value={issueForm.department}
                    onChange={e => setIssueForm({...issueForm, department: e.target.value})}
                    className="w-full bg-[var(--sa-surface)] border border-[var(--sa-border)] rounded-lg px-3 py-2 text-[var(--sa-text)] focus:outline-none focus:border-[var(--sa-accent)]"
                  >
                    <option value="">Select...</option>
                    {departments.map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[var(--sa-text-sec)] mb-1">Severity *</label>
                  <select 
                    value={issueForm.severity}
                    onChange={e => setIssueForm({...issueForm, severity: e.target.value})}
                    className="w-full bg-[var(--sa-surface)] border border-[var(--sa-border)] rounded-lg px-3 py-2 text-[var(--sa-text)] focus:outline-none focus:border-[var(--sa-accent)]"
                  >
                    <option value="">Select...</option>
                    {severities.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--sa-text-sec)] mb-1">Due Date *</label>
                  <input 
                    type="date" 
                    value={issueForm.dueDate}
                    onChange={e => setIssueForm({...issueForm, dueDate: e.target.value})}
                    className="w-full bg-[var(--sa-surface)] border border-[var(--sa-border)] rounded-lg px-3 py-2 text-[var(--sa-text)] focus:outline-none focus:border-[var(--sa-accent)]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--sa-text-sec)] mb-1">Owner *</label>
                <select 
                  value={issueForm.owner}
                  onChange={e => setIssueForm({...issueForm, owner: e.target.value})}
                  className="w-full bg-[var(--sa-surface)] border border-[var(--sa-border)] rounded-lg px-3 py-2 text-[var(--sa-text)] focus:outline-none focus:border-[var(--sa-accent)]"
                >
                  <option value="">Select Owner...</option>
                  {employees.map(emp => <option key={emp.id} value={emp.id}>{emp.name}</option>)}
                </select>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-[var(--sa-border)]">
                <button 
                  type="button"
                  onClick={() => setShowCreateModal(false)}
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
                  {isSubmitting ? 'Raising...' : 'Raise Issue'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DETAILS MODAL */}
      {showDetailsModal && selectedIssue && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex justify-end">
          <div className="bg-[var(--sa-surface-2)] border-l border-[var(--sa-border)] w-full max-w-3xl h-full shadow-2xl animate-fade-left flex flex-col">
            
            {/* Header */}
            <div className="p-6 border-b border-[var(--sa-border)] flex justify-between items-start shrink-0">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className={`px-2 py-0.5 rounded text-xs font-medium border ${getStatusBadge(selectedIssue.status, selectedIssue.isOverdue)}`}>
                    {selectedIssue.isOverdue ? 'OVERDUE' : selectedIssue.status}
                  </span>
                  <span className={`px-2 py-0.5 rounded text-xs font-bold ${getSeverityBadge(selectedIssue.severity)}`}>
                    {selectedIssue.severity}
                  </span>
                  <span className="text-[var(--sa-text-muted)] text-sm">{selectedIssue.id}</span>
                </div>
                <h2 className="text-2xl font-bold text-[var(--sa-text)]">{selectedIssue.title}</h2>
              </div>
              <button onClick={() => setShowDetailsModal(false)} className="text-[var(--sa-text-muted)] hover:text-[var(--sa-text)] p-1 bg-[var(--sa-surface)] rounded border border-[var(--sa-border)]">
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto flex-1 form-scrollbar space-y-8">
              
              {/* Properties */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-y-6 gap-x-4">
                <div className="col-span-2 md:col-span-4">
                  <div className="text-[10px] uppercase tracking-wider text-[var(--sa-text-muted)] mb-1">Description</div>
                  <div className="text-[var(--sa-text)] text-sm leading-relaxed">{selectedIssue.description}</div>
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-[var(--sa-text-muted)] mb-1">Department</div>
                  <div className="text-[var(--sa-text)] font-medium text-sm">{selectedIssue.department}</div>
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-[var(--sa-text-muted)] mb-1">Owner</div>
                  <div className="text-[var(--sa-text)] font-medium text-sm">{employees.find(e => e.id === selectedIssue.owner)?.name}</div>
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-[var(--sa-text-muted)] mb-1">Due Date</div>
                  <div className={`font-medium text-sm ${selectedIssue.isOverdue ? 'text-red-400' : 'text-[var(--sa-text)]'}`}>{selectedIssue.dueDate}</div>
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-[var(--sa-text-muted)] mb-1">Linked Audit</div>
                  <div className="text-[var(--sa-text-sec)] font-medium text-sm">{selectedIssue.auditId || 'None'}</div>
                </div>
              </div>

              <hr className="border-[var(--sa-border)]" />

              {/* RESOLUTION SECTION */}
              <div>
                 <h3 className="text-lg font-bold text-[var(--sa-text)] mb-4">Resolution</h3>
                 
                 {selectedIssue.status === 'Open' ? (
                   <div className="bg-[var(--sa-surface)] border border-[var(--sa-border)] rounded-xl p-6 text-center">
                     <p className="text-[var(--sa-text-sec)] text-sm mb-4">This issue is currently Open. Mark it as "In Progress" to begin working on the resolution.</p>
                     <button 
                       onClick={() => handleStatusChange('In Progress', 'Moved to In Progress')}
                       disabled={isSubmitting}
                       className="bg-[var(--sa-accent)] hover:bg-[var(--sa-success)] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
                     >
                       Begin Work (Move to In Progress)
                     </button>
                   </div>
                 ) : selectedIssue.status === 'In Progress' ? (
                   <div className="bg-[var(--sa-surface)] border border-[var(--sa-border)] rounded-xl p-5">
                     <form onSubmit={handleMarkResolved}>
                       <label className="block text-sm font-medium text-[var(--sa-text-sec)] mb-2">Resolution Details & Evidence *</label>
                       <textarea 
                         value={resolutionForm.details}
                         onChange={e => setResolutionForm({details: e.target.value})}
                         rows="3"
                         required
                         className="w-full bg-[var(--sa-surface-2)] border border-[var(--sa-border)] rounded-lg px-3 py-2 text-sm text-[var(--sa-text)] focus:outline-none focus:border-[var(--sa-accent)] mb-3"
                         placeholder="Describe how the issue was fixed and provide links to evidence..."
                       ></textarea>
                       <div className="flex justify-end">
                         <button 
                           type="submit"
                           disabled={isSubmitting}
                           className="bg-[var(--sa-success)] hover:bg-[var(--sa-accent)] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
                         >
                           Submit Resolution
                         </button>
                       </div>
                     </form>
                   </div>
                 ) : (
                   <div className="bg-[var(--sa-surface)] border-l-4 border-l-[var(--sa-success)] border border-[var(--sa-border)] rounded-r-lg p-5">
                     <div className="text-[10px] uppercase tracking-wider text-[var(--sa-text-muted)] mb-1">Resolution Provided ({selectedIssue.resolution?.date})</div>
                     <p className="text-[var(--sa-text)] text-sm">{selectedIssue.resolution?.details}</p>
                   </div>
                 )}
              </div>

              {/* VERIFICATION SECTION (Only if Resolved or Closed) */}
              {(selectedIssue.status === 'Resolved' || selectedIssue.status === 'Closed') && (
                <div>
                   <h3 className="text-lg font-bold text-[var(--sa-text)] mb-4">Verification & Closure</h3>
                   
                   {selectedIssue.status === 'Closed' ? (
                     <div className="bg-[var(--sa-surface)] border border-[var(--sa-border)] rounded-xl p-5">
                       <div className="flex items-center gap-2 mb-2">
                         <CheckCircle size={16} className="text-[var(--sa-success)]" />
                         <span className="font-semibold text-[var(--sa-text)]">Verified and Closed</span>
                       </div>
                       <p className="text-sm text-[var(--sa-text-sec)] mb-2">"{selectedIssue.verifier?.notes}"</p>
                       <p className="text-xs text-[var(--sa-text-muted)]">Verified by {selectedIssue.verifier?.name} on {selectedIssue.verifier?.date}</p>
                     </div>
                   ) : isCurrentUserOwner ? (
                     <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-5 text-center">
                       <AlertTriangle size={24} className="text-red-400 mx-auto mb-2" />
                       <p className="text-red-400 font-medium text-sm">Separation of Duties</p>
                       <p className="text-red-300 text-xs mt-1">The issue owner ({currentEmployeeName}) cannot verify and close their own issue. Another authorized Compliance Officer must review the fix.</p>
                     </div>
                   ) : (
                     <div className="bg-[var(--sa-surface)] border border-[var(--sa-border)] rounded-xl p-5">
                       <p className="text-sm text-[var(--sa-text-sec)] mb-4">Review the resolution details provided above. If satisfactory, you may close this issue.</p>
                       <form onSubmit={handleVerify}>
                         <label className="block text-sm font-medium text-[var(--sa-text-sec)] mb-2">Verification Notes *</label>
                         <textarea 
                           value={verificationForm.notes}
                           onChange={e => setVerificationForm({...verificationForm, notes: e.target.value})}
                           rows="2"
                           required
                           className="w-full bg-[var(--sa-surface-2)] border border-[var(--sa-border)] rounded-lg px-3 py-2 text-sm text-[var(--sa-text)] focus:outline-none focus:border-[var(--sa-accent)] mb-4"
                           placeholder="Enter verification notes..."
                         ></textarea>
                         <div className="flex justify-end gap-3">
                           <button 
                             type="button"
                             onClick={() => { setVerificationForm({...verificationForm, approved: false}); handleVerify({preventDefault: () => {}}); }}
                             disabled={isSubmitting || !verificationForm.notes.trim()}
                             className="bg-[var(--sa-surface-2)] hover:bg-[var(--sa-border)] border border-[var(--sa-border)] text-[var(--sa-text)] px-4 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
                           >
                             Reject & Reopen
                           </button>
                           <button 
                             type="submit"
                             onClick={() => setVerificationForm({...verificationForm, approved: true})}
                             disabled={isSubmitting}
                             className="bg-[var(--sa-success)] hover:bg-[var(--sa-accent)] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
                           >
                             Verify & Close Issue
                           </button>
                         </div>
                       </form>
                     </div>
                   )}
                </div>
              )}

              {/* History Timeline */}
              {selectedIssue.history && selectedIssue.history.length > 0 && (
                <div>
                   <h3 className="text-sm font-bold text-[var(--sa-text-muted)] uppercase tracking-wider mb-4">Status History</h3>
                   <div className="space-y-3">
                     {selectedIssue.history.map((h, i) => (
                       <div key={i} className="flex gap-3 items-start">
                         <div className="mt-1 w-2 h-2 rounded-full bg-[var(--sa-accent)]"></div>
                         <div>
                           <p className="text-sm text-[var(--sa-text)]">{h.action}</p>
                           <p className="text-xs text-[var(--sa-text-muted)]">{new Date(h.date).toLocaleString()}</p>
                         </div>
                       </div>
                     ))}
                   </div>
                </div>
              )}

            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default ComplianceIssuesPage;
