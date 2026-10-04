import React from 'react';
import { Search, Filter, Download } from 'lucide-react';

const AuditLogsPage = () => {
  const logs = [
    { time: '2025-10-04 14:23:10', actor: 'Admin User', org: 'Acme Corp', action: 'Login', cat: 'Authentication', result: 'Success', type: 'success' },
    { time: '2025-10-04 13:15:00', actor: 'Super Admin', org: 'System', action: 'Update Settings', cat: 'Platform', result: 'Success', type: 'success' },
    { time: '2025-10-04 11:05:22', actor: 'Unknown IP', org: '-', action: 'Login', cat: 'Authentication', result: 'Failed', type: 'warning' },
    { time: '2025-10-03 16:45:10', actor: 'Super Admin', org: 'Globex Corp', action: 'Suspend Organization', cat: 'Administration', result: 'Success', type: 'warning' },
    { time: '2025-10-03 09:30:00', actor: 'System', org: 'Wayne Ent.', action: 'Data Export', cat: 'Data', result: 'Success', type: 'info' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">

        
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--sa-text-muted)]" />
            <input 
              type="text" 
              placeholder="Search logs..." 
              className="w-48 sm:w-64 bg-[var(--sa-surface-2)] border border-[var(--sa-border)] rounded-lg pl-9 pr-4 py-2 text-sm text-[var(--sa-text)] placeholder-[var(--sa-text-muted)] focus:outline-none focus:border-[var(--sa-accent)]"
            />
          </div>
          <button className="bg-[var(--sa-surface-2)] border border-[var(--sa-border)] rounded-lg p-2 text-[var(--sa-text-sec)] hover:text-[var(--sa-text)] transition-colors" title="Export CSV">
            <Download size={18} />
          </button>
        </div>
      </div>

      <div className="bg-[var(--sa-surface-2)] border border-[var(--sa-border)] rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-[var(--sa-surface)] text-[var(--sa-text-muted)] text-xs uppercase">
              <tr>
                <th className="px-6 py-4 font-medium">Timestamp</th>
                <th className="px-6 py-4 font-medium">Actor</th>
                <th className="px-6 py-4 font-medium">Organization</th>
                <th className="px-6 py-4 font-medium">Action</th>
                <th className="px-6 py-4 font-medium">Category</th>
                <th className="px-6 py-4 font-medium">Result</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--sa-border)]">
              {logs.map((log, index) => (
                <tr key={index} className="hover:bg-[var(--sa-surface)] transition-colors">
                  <td className="px-6 py-4 text-[var(--sa-text-sec)] font-mono text-xs">{log.time}</td>
                  <td className="px-6 py-4 text-[var(--sa-text)] font-medium">{log.actor}</td>
                  <td className="px-6 py-4 text-[var(--sa-text-sec)]">{log.org}</td>
                  <td className="px-6 py-4 text-[var(--sa-text)]">{log.action}</td>
                  <td className="px-6 py-4 text-[var(--sa-text-sec)]">{log.cat}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-md text-[10px] font-medium border ${log.type === 'success' ? 'bg-[var(--sa-success)]/10 text-[var(--sa-success)] border-[var(--sa-success)]/20' : log.type === 'warning' ? 'bg-[var(--sa-warning)]/10 text-[var(--sa-warning)] border-[var(--sa-warning)]/20' : 'bg-[var(--sa-chart)]/10 text-[var(--sa-chart)] border-[var(--sa-chart)]/20'}`}>
                      {log.result}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AuditLogsPage;
