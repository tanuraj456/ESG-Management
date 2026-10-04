import React from 'react';
import { Building2, Users, AlertTriangle, CheckCircle2, TrendingUp, MoreVertical, Plus } from 'lucide-react';

const SuperAdminOverview = () => {
  return (
    <div className="space-y-6">
      
      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-[var(--sa-surface-2)] border border-[var(--sa-border)] rounded-xl p-5 flex flex-col relative overflow-hidden">
          <div className="flex justify-between items-start mb-4">
            <span className="text-[var(--sa-text-sec)] font-medium text-sm">Total Companies</span>
            <div className="bg-[var(--sa-accent)]/20 p-2 rounded-lg text-[var(--sa-success)]">
              <Building2 size={20} />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-[var(--sa-text)]">124</span>
            <span className="text-xs font-medium text-[var(--sa-success)] flex items-center"><TrendingUp size={12} className="mr-1" /> +12%</span>
          </div>
          <div className="absolute -bottom-4 -right-4 text-[var(--sa-accent)]/5">
            <Building2 size={100} />
          </div>
        </div>

        <div className="bg-[var(--sa-surface-2)] border border-[var(--sa-border)] rounded-xl p-5 flex flex-col relative overflow-hidden">
          <div className="flex justify-between items-start mb-4">
            <span className="text-[var(--sa-text-sec)] font-medium text-sm">Active Companies</span>
            <div className="bg-[var(--sa-accent)]/20 p-2 rounded-lg text-[var(--sa-success)]">
              <CheckCircle2 size={20} />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-[var(--sa-text)]">118</span>
            <span className="text-xs font-medium text-[var(--sa-success)] flex items-center"><TrendingUp size={12} className="mr-1" /> +5%</span>
          </div>
        </div>

        <div className="bg-[var(--sa-surface-2)] border border-[var(--sa-border)] rounded-xl p-5 flex flex-col relative overflow-hidden">
          <div className="flex justify-between items-start mb-4">
            <span className="text-[var(--sa-text-sec)] font-medium text-sm">Total Users</span>
            <div className="bg-[var(--sa-accent)]/20 p-2 rounded-lg text-[var(--sa-success)]">
              <Users size={20} />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-[var(--sa-text)]">4,892</span>
            <span className="text-xs font-medium text-[var(--sa-success)] flex items-center"><TrendingUp size={12} className="mr-1" /> +24%</span>
          </div>
        </div>

        <div className="bg-[var(--sa-surface-2)] border border-[var(--sa-border)] rounded-xl p-5 flex flex-col relative overflow-hidden">
          <div className="flex justify-between items-start mb-4">
            <span className="text-[var(--sa-text-sec)] font-medium text-sm">Platform Issues</span>
            <div className="bg-[var(--sa-warning)]/20 p-2 rounded-lg text-[var(--sa-warning)]">
              <AlertTriangle size={20} />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-[var(--sa-text)]">3</span>
            <span className="text-xs font-medium text-[var(--sa-text-muted)]">Pending resolution</span>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Registrations Trend (Simulated Chart) */}
        <div className="bg-[var(--sa-surface-2)] border border-[var(--sa-border)] rounded-xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-[var(--sa-text)] font-semibold">Registration Trend (12 mo)</h3>
            <MoreVertical size={16} className="text-[var(--sa-text-muted)] cursor-pointer" />
          </div>
          <div className="h-64 flex items-end justify-between relative border-l border-b border-[var(--sa-border)] pb-2 pl-2">
            {/* Grid lines */}
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none pb-2 pl-2">
               {[1, 2, 3, 4].map(i => <div key={i} className="w-full border-t border-[var(--sa-border)]/50" />)}
            </div>
            
            {/* Bars */}
            {[40, 55, 45, 70, 90, 85, 100, 110, 95, 120, 130, 140].map((h, i) => (
              <div key={i} className="w-1/12 flex flex-col items-center gap-2 group z-10">
                <div 
                  className="w-full max-w-[12px] bg-[var(--sa-success)] rounded-t-sm group-hover:bg-[var(--sa-accent)] transition-colors"
                  style={{ height: `${h}%` }}
                ></div>
              </div>
            ))}
            
            {/* X Axis Labels */}
            <div className="absolute -bottom-6 left-0 right-0 flex justify-between text-[10px] text-[var(--sa-text-muted)] pl-2">
              <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span>
              <span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span><span>Nov</span><span>Dec</span>
            </div>
          </div>
        </div>

        {/* Company Status */}
        <div className="bg-[var(--sa-surface-2)] border border-[var(--sa-border)] rounded-xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-[var(--sa-text)] font-semibold">Company Status</h3>
            <MoreVertical size={16} className="text-[var(--sa-text-muted)] cursor-pointer" />
          </div>
          <div className="h-64 flex items-center justify-center relative">
             <div className="w-48 h-48 rounded-full border-[16px] border-[var(--sa-border)] relative flex items-center justify-center">
                <div className="absolute inset-[-16px] border-[16px] border-[var(--sa-success)] rounded-full" style={{ clipPath: 'polygon(50% 50%, 50% 0, 100% 0, 100% 100%, 0 100%, 0 0, 40% 0)' }}></div>
                <div className="absolute inset-[-16px] border-[16px] border-[var(--sa-chart)] rounded-full" style={{ clipPath: 'polygon(50% 50%, 0 0, 0 30%)' }}></div>
                <div className="absolute inset-[-16px] border-[16px] border-[var(--sa-warning)] rounded-full" style={{ clipPath: 'polygon(50% 50%, 40% 0, 50% 0)' }}></div>
                
                <div className="text-center">
                  <span className="block text-2xl font-bold text-[var(--sa-text)]">124</span>
                  <span className="text-[10px] text-[var(--sa-text-muted)] uppercase tracking-wider">Total</span>
                </div>
             </div>
          </div>
          <div className="flex justify-center gap-6 mt-2">
             <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-[var(--sa-success)]"></span><span className="text-xs text-[var(--sa-text-sec)]">Active (95%)</span></div>
             <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-[var(--sa-chart)]"></span><span className="text-xs text-[var(--sa-text-sec)]">Inactive (4%)</span></div>
             <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-[var(--sa-warning)]"></span><span className="text-xs text-[var(--sa-text-sec)]">Suspended (1%)</span></div>
          </div>
        </div>

      </div>

      {/* Tables Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Recent Companies */}
        <div className="lg:col-span-2 bg-[var(--sa-surface-2)] border border-[var(--sa-border)] rounded-xl overflow-hidden">
          <div className="flex justify-between items-center p-5 border-b border-[var(--sa-border)]">
            <h3 className="text-[var(--sa-text)] font-semibold">Recent Registrations</h3>
            <button className="text-xs font-medium text-[var(--sa-success)] hover:text-[var(--sa-accent)] transition-colors">View all</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-[var(--sa-surface)] text-[var(--sa-text-muted)] text-xs uppercase">
                <tr>
                  <th className="px-5 py-3 font-medium">Company</th>
                  <th className="px-5 py-3 font-medium">Org ID</th>
                  <th className="px-5 py-3 font-medium">Industry</th>
                  <th className="px-5 py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--sa-border)]">
                {[
                  { name: 'Acme Corp', id: 'ORG-1029', ind: 'Manufacturing', status: 'Active' },
                  { name: 'Stark Industries', id: 'ORG-1030', ind: 'Technology', status: 'Active' },
                  { name: 'Wayne Enterprises', id: 'ORG-1031', ind: 'Logistics', status: 'Inactive' },
                  { name: 'Globex Corp', id: 'ORG-1032', ind: 'Energy', status: 'Active' },
                ].map((c, i) => (
                  <tr key={i} className="hover:bg-[var(--sa-surface)] transition-colors">
                    <td className="px-5 py-4 font-medium text-[var(--sa-text)]">{c.name}</td>
                    <td className="px-5 py-4 text-[var(--sa-text-sec)]">{c.id}</td>
                    <td className="px-5 py-4 text-[var(--sa-text-sec)]">{c.ind}</td>
                    <td className="px-5 py-4">
                      <span className={`px-2.5 py-1 rounded-md text-[10px] font-medium border ${c.status === 'Active' ? 'bg-[var(--sa-success)]/10 text-[var(--sa-success)] border-[var(--sa-success)]/20' : 'bg-[var(--sa-chart)]/10 text-[var(--sa-chart)] border-[var(--sa-chart)]/20'}`}>
                        {c.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-[var(--sa-surface-2)] border border-[var(--sa-border)] rounded-xl overflow-hidden flex flex-col">
          <div className="flex justify-between items-center p-5 border-b border-[var(--sa-border)]">
            <h3 className="text-[var(--sa-text)] font-semibold">Platform Activity</h3>
          </div>
          <div className="p-5 flex-1 overflow-y-auto flex flex-col gap-5">
            {[
              { desc: 'New company registered', actor: 'Acme Corp', time: '10 mins ago', type: 'success' },
              { desc: 'Audit log exported', actor: 'Super Admin', time: '1 hour ago', type: 'info' },
              { desc: 'Failed login attempt', actor: 'Unknown IP', time: '3 hours ago', type: 'warning' },
              { desc: 'Platform settings updated', actor: 'Super Admin', time: '1 day ago', type: 'info' },
              { desc: 'Company suspended', actor: 'Globex Corp', time: '2 days ago', type: 'warning' },
            ].map((a, i) => (
              <div key={i} className="flex gap-3 items-start">
                <div className={`mt-0.5 w-2 h-2 rounded-full ${a.type === 'success' ? 'bg-[var(--sa-success)]' : a.type === 'warning' ? 'bg-[var(--sa-warning)]' : 'bg-[var(--sa-chart)]'}`}></div>
                <div>
                  <p className="text-sm font-medium text-[var(--sa-text)]">{a.desc}</p>
                  <div className="flex items-center gap-2 text-xs text-[var(--sa-text-muted)] mt-1">
                    <span>{a.actor}</span>
                    <span>•</span>
                    <span>{a.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default SuperAdminOverview;
