import React from 'react';
import { BarChart3, PieChart, Activity, TrendingUp } from 'lucide-react';

const PlatformAnalyticsPage = () => {
  return (
    <div className="space-y-6">


      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Adoption Trend */}
        <div className="bg-[var(--sa-surface-2)] border border-[var(--sa-border)] rounded-xl p-6">
          <div className="flex items-center gap-2 mb-6">
            <Activity size={18} className="text-[var(--sa-accent)]" />
            <h3 className="text-[var(--sa-text)] font-semibold">User Adoption Trend</h3>
          </div>
          <div className="h-64 flex items-end justify-between relative border-l border-b border-[var(--sa-border)] pb-2 pl-2">
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none pb-2 pl-2">
               {[1, 2, 3, 4].map(i => <div key={i} className="w-full border-t border-[var(--sa-border)]/50" />)}
            </div>
            
            {[20, 35, 50, 45, 60, 80, 110, 140].map((h, i) => (
              <div key={i} className="w-1/8 flex flex-col items-center gap-2 z-10 mx-2">
                <div 
                  className="w-full max-w-[24px] bg-[var(--sa-chart)] rounded-t-sm"
                  style={{ height: `${h}%` }}
                ></div>
              </div>
            ))}
          </div>
        </div>

        {/* Industry Distribution */}
        <div className="bg-[var(--sa-surface-2)] border border-[var(--sa-border)] rounded-xl p-6">
          <div className="flex items-center gap-2 mb-6">
            <PieChart size={18} className="text-[var(--sa-accent)]" />
            <h3 className="text-[var(--sa-text)] font-semibold">Organizations by Industry</h3>
          </div>
          <div className="h-64 flex flex-col justify-center gap-4">
             {[
               { name: 'Manufacturing', val: 45, color: 'bg-[var(--sa-success)]' },
               { name: 'Technology', val: 25, color: 'bg-[var(--sa-chart)]' },
               { name: 'Logistics', val: 15, color: 'bg-[var(--sa-accent)]' },
               { name: 'Energy', val: 10, color: 'bg-[var(--sa-warning)]' },
               { name: 'Other', val: 5, color: 'bg-[var(--sa-border)]' },
             ].map((ind, i) => (
               <div key={i} className="flex items-center gap-4">
                 <span className="w-24 text-sm text-[var(--sa-text-sec)] text-right">{ind.name}</span>
                 <div className="flex-1 h-3 bg-[var(--sa-surface)] rounded-full overflow-hidden">
                   <div className={`h-full ${ind.color} rounded-full`} style={{ width: `${ind.val}%` }}></div>
                 </div>
                 <span className="w-10 text-sm font-medium text-[var(--sa-text)]">{ind.val}%</span>
               </div>
             ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default PlatformAnalyticsPage;
