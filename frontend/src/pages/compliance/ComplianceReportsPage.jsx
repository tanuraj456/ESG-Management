import React, { useState, useEffect } from 'react';
import { Download, Filter, Search, X, CheckCircle, Clock, AlertTriangle, FileText, Shield, AlertCircle } from 'lucide-react';
import { getAudits, getIssues, getPolicies, getAllAcknowledgements } from '../../services/complianceDataService';

const ComplianceReportsPage = () => {
  const [audits, setAudits] = useState([]);
  const [issues, setIssues] = useState([]);
  const [policies, setPolicies] = useState([]);
  const [acks, setAcks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Filters
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [departmentFilter, setDepartmentFilter] = useState('');
  const [auditStatusFilter, setAuditStatusFilter] = useState('');
  const [issueStatusFilter, setIssueStatusFilter] = useState('');
  const [severityFilter, setSeverityFilter] = useState('');
  const [policyFilter, setPolicyFilter] = useState('');

  const departments = ['Operations', 'IT', 'Procurement', 'HR', 'Finance'];
  const auditStatuses = ['Planned', 'In Progress', 'Completed'];
  const issueStatuses = ['Open', 'In Progress', 'Resolved', 'Closed'];
  const severities = ['Low', 'Medium', 'High', 'Critical'];

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const [fetchedAudits, fetchedIssues, fetchedPolicies, fetchedAcks] = await Promise.all([
        getAudits(),
        getIssues(),
        getPolicies(),
        getAllAcknowledgements()
      ]);
      setAudits(fetchedAudits);
      setIssues(fetchedIssues);
      setPolicies(fetchedPolicies);
      setAcks(fetchedAcks);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  // Filter Logic
  const filteredAudits = audits.filter(a => {
    if (departmentFilter && a.department !== departmentFilter) return false;
    if (auditStatusFilter && a.status !== auditStatusFilter) return false;
    if (dateRange.start && a.date < dateRange.start) return false;
    if (dateRange.end && a.date > dateRange.end) return false;
    return true;
  });

  const filteredIssues = issues.filter(i => {
    if (departmentFilter && i.department !== departmentFilter) return false;
    if (issueStatusFilter && i.status !== issueStatusFilter) return false;
    if (severityFilter && i.severity !== severityFilter) return false;
    if (dateRange.start && i.dueDate < dateRange.start) return false;
    if (dateRange.end && i.dueDate > dateRange.end) return false;
    return true;
  });

  const filteredAcks = acks.filter(a => {
    if (policyFilter && a.policyId !== policyFilter) return false;
    // For date filter, filter by ack date if available, or just ignore date filter for pending
    if (dateRange.start && a.date && a.date < dateRange.start) return false;
    if (dateRange.end && a.date && a.date > dateRange.end) return false;
    // Department filtering for acks is tricky without employee dept data, so we filter by policy departments
    if (departmentFilter) {
      const pol = policies.find(p => p.id === a.policyId);
      if (pol && !pol.departments.includes(departmentFilter) && !pol.departments.includes('All')) {
        return false;
      }
    }
    return true;
  });

  // --- KPIs ---
  // Audits
  const totalAudits = filteredAudits.length;
  const completedAudits = filteredAudits.filter(a => a.status === 'Completed').length;
  const inProgressAudits = filteredAudits.filter(a => a.status === 'In Progress').length;
  const plannedAudits = filteredAudits.filter(a => a.status === 'Planned').length;
  const auditCompletionRate = totalAudits > 0 ? Math.round((completedAudits / totalAudits) * 100) : 'N/A';

  // Issues
  const totalIssues = filteredIssues.length;
  const openIssues = filteredIssues.filter(i => i.status === 'Open').length;
  const inProgressIssuesCount = filteredIssues.filter(i => i.status === 'In Progress').length;
  const resolvedIssues = filteredIssues.filter(i => i.status === 'Resolved').length;
  const closedIssues = filteredIssues.filter(i => i.status === 'Closed').length;
  const overdueIssues = filteredIssues.filter(i => i.isOverdue).length;
  const criticalIssues = filteredIssues.filter(i => i.severity === 'Critical').length;

  // Acknowledgements
  const totalAcks = filteredAcks.length;
  const acknowledgedCount = filteredAcks.filter(a => a.status === 'Acknowledged').length;
  const pendingCount = filteredAcks.filter(a => a.status === 'Pending').length;
  const ackRate = totalAcks > 0 ? Math.round((acknowledgedCount / totalAcks) * 100) : 'N/A';

  const clearFilters = () => {
    setDateRange({ start: '', end: '' });
    setDepartmentFilter('');
    setAuditStatusFilter('');
    setIssueStatusFilter('');
    setSeverityFilter('');
    setPolicyFilter('');
  };

  const hasActiveFilters = departmentFilter || auditStatusFilter || issueStatusFilter || severityFilter || policyFilter || dateRange.start || dateRange.end;

  // CSV Export
  const exportCSV = () => {
    if (totalAudits === 0 && totalIssues === 0 && totalAcks === 0) {
      alert("No data to export for the selected filters.");
      return;
    }

    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "EcoSphere Governance Report\n";
    csvContent += `Generated:,${new Date().toISOString().split('T')[0]}\n\n`;

    // Audits
    csvContent += "--- AUDITS ---\n";
    csvContent += "ID,Title,Department,Date,Status,Findings\n";
    filteredAudits.forEach(a => {
      csvContent += `${a.id},"${a.title}",${a.department},${a.date},${a.status},${a.findings}\n`;
    });
    csvContent += "\n";

    // Issues
    csvContent += "--- COMPLIANCE ISSUES ---\n";
    csvContent += "ID,Title,Department,Severity,Status,Due Date,Is Overdue\n";
    filteredIssues.forEach(i => {
      csvContent += `${i.id},"${i.title}",${i.department},${i.severity},${i.status},${i.dueDate},${i.isOverdue ? 'Yes' : 'No'}\n`;
    });
    csvContent += "\n";

    // Acknowledgements
    csvContent += "--- POLICY ACKNOWLEDGEMENTS ---\n";
    csvContent += "Record ID,Employee,Policy,Status,Acknowledged Date\n";
    filteredAcks.forEach(a => {
      csvContent += `${a.id},"${a.employeeName}","${a.policyTitle}",${a.status},${a.date || 'N/A'}\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `ecosphere-governance-report-${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Department Comparison Data
  const deptComparison = departments.map(dept => {
    const dAudits = filteredAudits.filter(a => a.department === dept);
    const dIssues = filteredIssues.filter(i => i.department === dept);
    
    // Approximation for policy acks since employees don't strictly map to departments in the current data shape,
    // we calculate based on policies that apply to this department.
    const dAcks = filteredAcks.filter(a => {
       const pol = policies.find(p => p.id === a.policyId);
       return pol && (pol.departments.includes(dept) || pol.departments.includes('All'));
    });
    
    return {
      department: dept,
      totalAudits: dAudits.length,
      completedAudits: dAudits.filter(a => a.status === 'Completed').length,
      openIssues: dIssues.filter(i => i.status === 'Open').length,
      overdueIssues: dIssues.filter(i => i.isOverdue).length,
      criticalIssues: dIssues.filter(i => i.severity === 'Critical').length,
      ackRate: dAcks.length > 0 ? Math.round((dAcks.filter(a => a.status === 'Acknowledged').length / dAcks.length) * 100) : 'N/A'
    };
  }).filter(d => d.totalAudits > 0 || d.openIssues > 0 || d.ackRate !== 'N/A');

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
        </div>
        <button 
          onClick={exportCSV}
          disabled={isLoading || (totalAudits === 0 && totalIssues === 0 && totalAcks === 0)}
          className="bg-[var(--sa-surface-2)] border border-[var(--sa-border)] hover:bg-[var(--sa-border)] text-[var(--sa-text)] px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 disabled:opacity-50"
        >
          <Download size={16} /> Export CSV
        </button>
      </div>

      {/* Global Filters */}
      <div className="bg-[var(--sa-surface-2)] border border-[var(--sa-border)] rounded-xl p-4">
        <div className="flex items-center gap-2 mb-4">
          <Filter size={16} className="text-[var(--sa-text-muted)]" />
          <h3 className="text-sm font-bold text-[var(--sa-text)]">Global Report Filters</h3>
          {hasActiveFilters && (
            <button onClick={clearFilters} className="ml-auto text-xs text-[var(--sa-accent)] hover:text-[var(--sa-success)]">
              Clear All Filters
            </button>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3">
          <div>
            <label className="block text-[10px] uppercase tracking-wider text-[var(--sa-text-muted)] mb-1">Date Range (Start)</label>
            <input 
              type="date" 
              value={dateRange.start}
              onChange={e => setDateRange({...dateRange, start: e.target.value})}
              className="w-full bg-[var(--sa-surface)] border border-[var(--sa-border)] rounded-lg px-2 py-1.5 text-xs text-[var(--sa-text)] focus:border-[var(--sa-accent)]"
            />
          </div>
          <div>
            <label className="block text-[10px] uppercase tracking-wider text-[var(--sa-text-muted)] mb-1">Date Range (End)</label>
            <input 
              type="date" 
              value={dateRange.end}
              onChange={e => setDateRange({...dateRange, end: e.target.value})}
              className="w-full bg-[var(--sa-surface)] border border-[var(--sa-border)] rounded-lg px-2 py-1.5 text-xs text-[var(--sa-text)] focus:border-[var(--sa-accent)]"
            />
          </div>
          <div>
            <label className="block text-[10px] uppercase tracking-wider text-[var(--sa-text-muted)] mb-1">Department</label>
            <select 
              value={departmentFilter}
              onChange={e => setDepartmentFilter(e.target.value)}
              className="w-full bg-[var(--sa-surface)] border border-[var(--sa-border)] rounded-lg px-2 py-1.5 text-xs text-[var(--sa-text)] focus:border-[var(--sa-accent)]"
            >
              <option value="">All</option>
              {departments.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-[10px] uppercase tracking-wider text-[var(--sa-text-muted)] mb-1">Audit Status</label>
            <select 
              value={auditStatusFilter}
              onChange={e => setAuditStatusFilter(e.target.value)}
              className="w-full bg-[var(--sa-surface)] border border-[var(--sa-border)] rounded-lg px-2 py-1.5 text-xs text-[var(--sa-text)] focus:border-[var(--sa-accent)]"
            >
              <option value="">All</option>
              {auditStatuses.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-[10px] uppercase tracking-wider text-[var(--sa-text-muted)] mb-1">Issue Status</label>
            <select 
              value={issueStatusFilter}
              onChange={e => setIssueStatusFilter(e.target.value)}
              className="w-full bg-[var(--sa-surface)] border border-[var(--sa-border)] rounded-lg px-2 py-1.5 text-xs text-[var(--sa-text)] focus:border-[var(--sa-accent)]"
            >
              <option value="">All</option>
              {issueStatuses.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-[10px] uppercase tracking-wider text-[var(--sa-text-muted)] mb-1">Issue Severity</label>
            <select 
              value={severityFilter}
              onChange={e => setSeverityFilter(e.target.value)}
              className="w-full bg-[var(--sa-surface)] border border-[var(--sa-border)] rounded-lg px-2 py-1.5 text-xs text-[var(--sa-text)] focus:border-[var(--sa-accent)]"
            >
              <option value="">All</option>
              {severities.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="text-center py-12 text-[var(--sa-text-muted)]">Loading report data...</div>
      ) : (
        <>
          {/* Audits Section */}
          <div>
            <h2 className="text-lg font-bold text-[var(--sa-text)] mb-3 flex items-center gap-2"><FileText size={18} className="text-[var(--sa-accent)]"/> Audit Performance</h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div className="bg-[var(--sa-surface-2)] border border-[var(--sa-border)] rounded-xl p-4">
                <div className="text-[var(--sa-text-sec)] text-xs font-medium mb-1">Total Audits</div>
                <div className="text-xl font-bold text-[var(--sa-text)]">{totalAudits}</div>
              </div>
              <div className="bg-[var(--sa-surface-2)] border border-[var(--sa-border)] rounded-xl p-4">
                <div className="text-[var(--sa-text-sec)] text-xs font-medium mb-1">Completed</div>
                <div className="text-xl font-bold text-[var(--sa-text)]">{completedAudits}</div>
              </div>
              <div className="bg-[var(--sa-surface-2)] border border-[var(--sa-border)] rounded-xl p-4">
                <div className="text-[var(--sa-text-sec)] text-xs font-medium mb-1">In Progress</div>
                <div className="text-xl font-bold text-[var(--sa-text)]">{inProgressAudits}</div>
              </div>
              <div className="bg-[var(--sa-surface-2)] border border-[var(--sa-border)] rounded-xl p-4">
                <div className="text-[var(--sa-text-sec)] text-xs font-medium mb-1">Planned</div>
                <div className="text-xl font-bold text-[var(--sa-text)]">{plannedAudits}</div>
              </div>
              <div className="bg-[var(--sa-surface-2)] border border-[var(--sa-border)] rounded-xl p-4">
                <div className="text-[var(--sa-text-sec)] text-xs font-medium mb-1">Completion Rate</div>
                <div className="text-xl font-bold text-[var(--sa-text)]">{auditCompletionRate}{auditCompletionRate !== 'N/A' && '%'}</div>
              </div>
            </div>
          </div>

          {/* Compliance Issues Section */}
          <div>
            <h2 className="text-lg font-bold text-[var(--sa-text)] mb-3 mt-8 flex items-center gap-2"><AlertCircle size={18} className="text-red-400"/> Compliance Issues & Risks</h2>
            <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
              <div className="bg-[var(--sa-surface-2)] border border-[var(--sa-border)] rounded-xl p-4">
                <div className="text-[var(--sa-text-sec)] text-xs font-medium mb-1">Open</div>
                <div className="text-xl font-bold text-[var(--sa-text)]">{openIssues}</div>
              </div>
              <div className="bg-[var(--sa-surface-2)] border border-[var(--sa-border)] rounded-xl p-4">
                <div className="text-[var(--sa-text-sec)] text-xs font-medium mb-1">In Progress</div>
                <div className="text-xl font-bold text-[var(--sa-text)]">{inProgressIssuesCount}</div>
              </div>
              <div className="bg-[var(--sa-surface-2)] border border-[var(--sa-border)] rounded-xl p-4">
                <div className="text-[var(--sa-text-sec)] text-xs font-medium mb-1">Resolved</div>
                <div className="text-xl font-bold text-[var(--sa-text)]">{resolvedIssues}</div>
              </div>
              <div className="bg-[var(--sa-surface-2)] border border-[var(--sa-border)] rounded-xl p-4">
                <div className="text-[var(--sa-text-sec)] text-xs font-medium mb-1">Closed</div>
                <div className="text-xl font-bold text-[var(--sa-text)]">{closedIssues}</div>
              </div>
              <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4">
                <div className="text-red-400 text-xs font-medium mb-1">Overdue</div>
                <div className="text-xl font-bold text-red-500">{overdueIssues}</div>
              </div>
              <div className="bg-orange-500/10 border border-orange-500/20 rounded-xl p-4">
                <div className="text-orange-400 text-xs font-medium mb-1">Critical</div>
                <div className="text-xl font-bold text-orange-400">{criticalIssues}</div>
              </div>
            </div>
            
            {/* Simple Issue Severity Bar Chart (CSS) */}
            {totalIssues > 0 && (
              <div className="mt-4 bg-[var(--sa-surface-2)] border border-[var(--sa-border)] rounded-xl p-5">
                <h3 className="text-sm font-bold text-[var(--sa-text)] mb-4">Issue Distribution by Severity</h3>
                <div className="flex flex-col gap-3">
                  {severities.map(sev => {
                    const count = filteredIssues.filter(i => i.severity === sev).length;
                    const perc = totalIssues > 0 ? (count / totalIssues) * 100 : 0;
                    const color = sev === 'Critical' ? 'bg-red-500' : sev === 'High' ? 'bg-orange-500' : sev === 'Medium' ? 'bg-yellow-500' : 'bg-[var(--sa-accent)]';
                    return (
                      <div key={sev} className="flex items-center gap-3">
                        <div className="w-16 text-xs text-[var(--sa-text-sec)]">{sev}</div>
                        <div className="flex-1 h-3 bg-[var(--sa-surface)] rounded-full overflow-hidden">
                          <div className={`h-full ${color} rounded-full`} style={{ width: `${perc}%` }}></div>
                        </div>
                        <div className="w-8 text-xs font-medium text-[var(--sa-text)] text-right">{count}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Policies Section */}
          <div>
            <h2 className="text-lg font-bold text-[var(--sa-text)] mb-3 mt-8 flex items-center gap-2"><Shield size={18} className="text-[var(--sa-success)]"/> Policy Acknowledgements</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-[var(--sa-surface-2)] border border-[var(--sa-border)] rounded-xl p-4">
                <div className="text-[var(--sa-text-sec)] text-xs font-medium mb-1">Eligible Records</div>
                <div className="text-xl font-bold text-[var(--sa-text)]">{totalAcks}</div>
              </div>
              <div className="bg-[var(--sa-surface-2)] border border-[var(--sa-border)] rounded-xl p-4">
                <div className="text-[var(--sa-text-sec)] text-xs font-medium mb-1">Acknowledged</div>
                <div className="text-xl font-bold text-[var(--sa-text)]">{acknowledgedCount}</div>
              </div>
              <div className="bg-[var(--sa-surface-2)] border border-[var(--sa-border)] rounded-xl p-4">
                <div className="text-[var(--sa-text-sec)] text-xs font-medium mb-1">Pending</div>
                <div className="text-xl font-bold text-[var(--sa-text)]">{pendingCount}</div>
              </div>
              <div className="bg-[var(--sa-surface-2)] border border-[var(--sa-border)] rounded-xl p-4">
                <div className="text-[var(--sa-text-sec)] text-xs font-medium mb-1">Acknowledgement Rate</div>
                <div className="text-xl font-bold text-[var(--sa-text)]">{ackRate}{ackRate !== 'N/A' && '%'}</div>
              </div>
            </div>
          </div>

          {/* Department Comparison Table */}
          <div>
            <h2 className="text-lg font-bold text-[var(--sa-text)] mb-3 mt-8">Department Comparison</h2>
            <div className="bg-[var(--sa-surface-2)] border border-[var(--sa-border)] rounded-xl overflow-hidden">
              {deptComparison.length === 0 ? (
                <div className="p-8 text-center text-[var(--sa-text-muted)]">No departmental data matches the current filters.</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-[var(--sa-surface)] text-[var(--sa-text-muted)] text-xs uppercase">
                      <tr>
                        <th className="px-5 py-3 font-medium">Department</th>
                        <th className="px-5 py-3 font-medium">Total Audits</th>
                        <th className="px-5 py-3 font-medium">Completed Audits</th>
                        <th className="px-5 py-3 font-medium">Open Issues</th>
                        <th className="px-5 py-3 font-medium">Overdue Issues</th>
                        <th className="px-5 py-3 font-medium">Critical Issues</th>
                        <th className="px-5 py-3 font-medium">Ack Rate</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[var(--sa-border)]">
                      {deptComparison.map((d, i) => (
                        <tr key={i} className="hover:bg-[var(--sa-surface)] transition-colors">
                          <td className="px-5 py-4 font-medium text-[var(--sa-text)]">{d.department}</td>
                          <td className="px-5 py-4 text-[var(--sa-text-sec)]">{d.totalAudits}</td>
                          <td className="px-5 py-4 text-[var(--sa-text-sec)]">{d.completedAudits}</td>
                          <td className="px-5 py-4 text-[var(--sa-text-sec)]">{d.openIssues}</td>
                          <td className={`px-5 py-4 font-medium ${d.overdueIssues > 0 ? 'text-red-400' : 'text-[var(--sa-text-sec)]'}`}>{d.overdueIssues}</td>
                          <td className={`px-5 py-4 font-medium ${d.criticalIssues > 0 ? 'text-orange-400' : 'text-[var(--sa-text-sec)]'}`}>{d.criticalIssues}</td>
                          <td className="px-5 py-4 text-[var(--sa-text-sec)]">{d.ackRate}{d.ackRate !== 'N/A' && '%'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </>
      )}

    </div>
  );
};

export default ComplianceReportsPage;
