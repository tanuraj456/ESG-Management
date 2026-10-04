import React, { useState } from 'react';
import { Save } from 'lucide-react';

const PlatformSettingsPage = () => {
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex justify-between items-center">

        
        <button 
          onClick={handleSave}
          className="flex items-center gap-2 bg-[var(--sa-success)] hover:bg-[var(--sa-accent)] text-white px-4 py-2 rounded-lg font-medium transition-colors"
        >
          <Save size={16} />
          {isSaved ? 'Saved!' : 'Save Changes'}
        </button>
      </div>

      <div className="bg-[var(--sa-surface-2)] border border-[var(--sa-border)] rounded-xl overflow-hidden">
        <div className="p-6 border-b border-[var(--sa-border)]">
          <h2 className="text-lg font-semibold text-[var(--sa-text)] mb-1">Security & Access</h2>
          <p className="text-sm text-[var(--sa-text-muted)]">Manage platform-wide authentication rules.</p>
        </div>
        
        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <label className="text-[var(--sa-text)] font-medium block">Require Two-Factor Authentication</label>
              <p className="text-sm text-[var(--sa-text-muted)]">Enforce 2FA for all Super Admin accounts.</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-[var(--sa-surface)] border border-[var(--sa-border)] rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-[var(--sa-text-sec)] peer-checked:after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--sa-success)] peer-checked:border-[var(--sa-success)]"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <label className="text-[var(--sa-text)] font-medium block">Session Timeout</label>
              <p className="text-sm text-[var(--sa-text-muted)]">Automatically log out inactive users.</p>
            </div>
            <select className="bg-[var(--sa-surface)] border border-[var(--sa-border)] rounded-lg px-3 py-2 text-[var(--sa-text)] focus:outline-none focus:border-[var(--sa-accent)]">
              <option>15 minutes</option>
              <option>30 minutes</option>
              <option>1 hour</option>
              <option>4 hours</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-[var(--sa-surface-2)] border border-[var(--sa-border)] rounded-xl overflow-hidden">
        <div className="p-6 border-b border-[var(--sa-border)]">
          <h2 className="text-lg font-semibold text-[var(--sa-text)] mb-1">Global Notifications</h2>
          <p className="text-sm text-[var(--sa-text-muted)]">Configure system-wide alerts.</p>
        </div>
        
        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <label className="text-[var(--sa-text)] font-medium block">New Organization Registration</label>
              <p className="text-sm text-[var(--sa-text-muted)]">Alert Super Admins when a new company signs up.</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-[var(--sa-surface)] border border-[var(--sa-border)] rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-[var(--sa-text-sec)] peer-checked:after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--sa-success)] peer-checked:border-[var(--sa-success)]"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <label className="text-[var(--sa-text)] font-medium block">System Error Alerts</label>
              <p className="text-sm text-[var(--sa-text-muted)]">Receive email alerts for critical platform errors.</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-[var(--sa-surface)] border border-[var(--sa-border)] rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-[var(--sa-text-sec)] peer-checked:after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--sa-success)] peer-checked:border-[var(--sa-success)]"></div>
            </label>
          </div>
        </div>
      </div>
      
      <p className="text-xs text-[var(--sa-text-muted)] italic text-center">* This dashboard is a frontend demonstration. Settings are not permanently saved to a backend.</p>
    </div>
  );
};

export default PlatformSettingsPage;
