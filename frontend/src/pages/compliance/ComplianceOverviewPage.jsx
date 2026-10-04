import React, { useEffect, useState } from 'react';
import { FileSearch, AlertCircle, AlertTriangle, Clock, CheckSquare, TrendingDown, MoreVertical } from 'lucide-react';
import { getDashboardKPIs, getAudits, getIssues } from '../../services/complianceDataService';

const ComplianceOverviewPage = () => {
  const [kpis, setKpis] = useState(null);
  const [recentAudits, setRecentAudits] = useState([]);
  const [overdueIssues, setOverdueIssues] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const kpiData = await getDashboardKPIs();
      setKpis(kpiData);

      const audits = await getAudits();
      setRecentAudits(audits.slice(0, 4));

      const issues = await getIssues();
      setOverdueIssues(issues.filter(i => i.status === 'Overdue').slice(0, 4));
    };
    fetchData();
  }, []);

  if (!kpis) {
    return <div className="text-[var(--sa-text-muted)] p-8">Loading overview data...</div>;
  }

  return (
    <div className="space-y-6">
      
      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-[var(--sa-surface-2)] border border-[var(--sa-border)] rounded-xl p-5 flex flex-col relative overflow-hidden">
          <div className="flex justify-between items-start mb-4">
            <span className="text-[var(--sa-text-sec)] font-medium text-sm">Audits In Progress</span>
            <div className="bg-[var(--sa-accent)]/20 p-2 rounded-lg text-[var(--sa-accent)]">
              <FileSearch size={20} />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-[var(--sa-text)]">{kpis.auditsInProgress}</span>
            <span className="text-xs font-medium text-[var(--sa-text-muted)]">/ {kpis.totalAudits} Total</span>
          </div>
        </div>

        <div className="bg-[var(--sa-surface-2)] border border-[var(--sa-border)] rounded-xl p-5 flex flex-col relative overflow-hidden">
          <div className="flex justify-between items-start mb-4">
            <span className="text-[var(--sa-text-sec)] font-medium text-sm">Critical Issues</span>
            <div className="bg-[var(--sa-warning)]/20 p-2 rounded-lg text-[var(--sa-warning)]">
              <AlertTriangle size={20} />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-[var(--sa-text)]">{kpis.criticalIssues}</span>
            <span className="text-xs font-medium text-[var(--sa-text-muted)]">Requires immediate action</span>
          </div>
        </div>

        <div className="bg-[var(--sa-surface-2)] border border-[var(--sa-border)] rounded-xl p-5 flex flex-col relative overflow-hidden">
          <div className="flex justify-between items-start mb-4">
            <span className="text-[var(--sa-text-sec)] font-medium text-sm">Policy Acknowledgement</span>
            <div className="bg-[var(--sa-success)]/20 p-2 rounded-lg text-[var(--sa-success)]">
              <CheckSquare size={20} />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-[var(--sa-text)]">{kpis.policyAckRate}%</span>
            <span className="text-xs font-medium text-[var(--sa-success)] flex items-center"><TrendingDown size={12} className="mr-1" /> -2%</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
         <div className="bg-[var(--sa-surface-2)] border border-[var(--sa-border)] rounded-xl p-5 flex flex-col relative overflow-hidden">
          <div className="flex justify-between items-start mb-4">
            <span className="text-[var(--sa-text-sec)] font-medium text-sm">Open Issues</span>
            <div className="bg-[var(--sa-chart)]/20 p-2 rounded-lg text-[var(--sa-chart)]">
              <AlertCircle size={20} />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-[var(--sa-text)]">{kpis.openIssues}</span>
          </div>
        </div>

        <div className="bg-[var(--sa-surface-2)] border border-[var(--sa-border)] rounded-xl p-5 flex flex-col relative overflow-hidden">
          <div className="flex justify-between items-start mb-4">
            <span className="text-[var(--sa-text-sec)] font-medium text-sm">Overdue Issues</span>
            <div className="bg-red-500/20 p-2 rounded-lg text-red-500">
              <Clock size={20} />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-[var(--sa-text)]">{kpis.overdueIssues}</span>
            <span className="text-xs font-medium text-[var(--sa-text-muted)]">Escalated</span>
          </div>
        </div>
      </div>

      {/* Tables Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Recent Audits */}
        <div className="bg-[var(--sa-surface-2)] border border-[var(--sa-border)] rounded-xl overflow-hidden">
          <div className="flex justify-between items-center p-5 border-b border-[var(--sa-border)]">
            <h3 className="text-[var(--sa-text)] font-semibold">Recent Audits</h3>
            <button className="text-xs font-medium text-[var(--sa-success)] hover:text-[var(--sa-accent)] transition-colors">View all</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-[var(--sa-surface)] text-[var(--sa-text-muted)] text-xs uppercase">
                <tr>
                  <th className="px-5 py-3 font-medium">Audit Title</th>
                  <th className="px-5 py-3 font-medium">Date</th>
                  <th className="px-5 py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--sa-border)]">
                {recentAudits.map((a, i) => (
                  <tr key={i} className="hover:bg-[var(--sa-surface)] transition-colors">
                    <td className="px-5 py-4 font-medium text-[var(--sa-text)]">{a.title}</td>
                    <td className="px-5 py-4 text-[var(--sa-text-sec)]">{a.date}</td>
                    <td className="px-5 py-4">
                      <span className={`px-2.5 py-1 rounded-md text-[10px] font-medium border ${
                        a.status === 'Completed' ? 'bg-[var(--sa-success)]/10 text-[var(--sa-success)] border-[var(--sa-success)]/20' : 
                        a.status === 'In Progress' ? 'bg-[var(--sa-chart)]/10 text-[var(--sa-chart)] border-[var(--sa-chart)]/20' :
                        'bg-[var(--sa-text-muted)]/10 text-[var(--sa-text-muted)] border-[var(--sa-text-muted)]/20'
                      }`}>
                        {a.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Overdue Issues */}
        <div className="bg-[var(--sa-surface-2)] border border-[var(--sa-border)] rounded-xl overflow-hidden">
          <div className="flex justify-between items-center p-5 border-b border-[var(--sa-border)]">
            <h3 className="text-[var(--sa-text)] font-semibold flex items-center gap-2">
              <AlertTriangle size={16} className="text-red-500" /> Overdue Issues
            </h3>
            <button className="text-xs font-medium text-[var(--sa-success)] hover:text-[var(--sa-accent)] transition-colors">View all</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-[var(--sa-surface)] text-[var(--sa-text-muted)] text-xs uppercase">
                <tr>
                  <th className="px-5 py-3 font-medium">Issue</th>
                  <th className="px-5 py-3 font-medium">Severity</th>
                  <th className="px-5 py-3 font-medium">Due Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--sa-border)]">
                {overdueIssues.length === 0 ? (
                   <tr>
                     <td colSpan="3" className="px-5 py-8 text-center text-[var(--sa-text-muted)]">No overdue issues!</td>
                   </tr>
                ) : overdueIssues.map((issue, i) => (
                  <tr key={i} className="hover:bg-[var(--sa-surface)] transition-colors">
                    <td className="px-5 py-4 font-medium text-[var(--sa-text)] truncate max-w-[200px]">{issue.title}</td>
                    <td className="px-5 py-4">
                       <span className={`px-2 py-1 rounded text-[10px] font-bold ${
                         issue.severity === 'Critical' ? 'bg-red-500/20 text-red-500' :
                         issue.severity === 'High' ? 'bg-[var(--sa-warning)]/20 text-[var(--sa-warning)]' :
                         'bg-[var(--sa-accent)]/20 text-[var(--sa-accent)]'
                       }`}>
                         {issue.severity}
                       </span>
                    </td>
                    <td className="px-5 py-4 text-red-400 font-medium">{issue.dueDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ComplianceOverviewPage;
