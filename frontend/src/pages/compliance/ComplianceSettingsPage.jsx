import React, { useState, useContext, useEffect } from 'react';
import { Save, User, Bell, Sliders, Moon, Shield } from 'lucide-react';
import { ThemeContext } from '../../components/compliance/ComplianceLayout';
import { updatePassword, mockCurrentUser } from '../../services/userService';

const ComplianceSettingsPage = () => {
  const { isDark, toggleTheme } = useContext(ThemeContext);

  const initialPreferences = {
    // Notification Preferences
    notifyNewIssue: true,
    notifyApproachingDue: true,
    notifyOverdue: true,
    notifyVerification: true,
    notifyAuditScheduled: false,
    notifyPolicyReminders: true,

    // Workflow Preferences
    defaultAuditView: 'All',
    defaultIssueView: 'Open',
    highlightOverdue: true,
    defaultDateRange: 'This Quarter',
  };

  const [preferences, setPreferences] = useState(initialPreferences);
  const [isSaved, setIsSaved] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  
  // Password Form State
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [passwordError, setPasswordError] = useState(null);
  const [isSubmittingPassword, setIsSubmittingPassword] = useState(false);

  useEffect(() => {
    const isChanged = JSON.stringify(preferences) !== JSON.stringify(initialPreferences);
    setHasChanges(isChanged);
  }, [preferences]);

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setPasswordError(null);

    if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
      setPasswordError('All fields are required.');
      return;
    }

    if (passwordData.newPassword.length < 8) {
      setPasswordError('New password must be at least 8 characters.');
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordError('New passwords do not match.');
      return;
    }

    setIsSubmittingPassword(true);
    
    try {
      await updatePassword(mockCurrentUser.id, { 
        currentPassword: passwordData.currentPassword, 
        newPassword: passwordData.newPassword 
      });
      
      setShowPasswordForm(false);
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (err) {
      setPasswordError(err.message || 'Failed to update password.');
    } finally {
      setIsSubmittingPassword(false);
    }
  };

  const handleToggle = (key) => {
    setPreferences(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSelect = (key, value) => {
    setPreferences(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    setIsSaved(true);
    setHasChanges(false);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const handleCancel = () => {
    setPreferences(initialPreferences);
  };

  return (
    <div className="space-y-6 max-w-4xl pb-10">
      
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-[var(--sa-text)] tracking-tight">Compliance Settings</h1>
          <p className="text-[var(--sa-text-sec)] text-sm mt-1">Manage your profile, notifications, and workflow preferences.</p>
        </div>
        
        <div className="flex items-center gap-3">
          {hasChanges && (
            <button 
              onClick={handleCancel}
              className="px-4 py-2 text-sm font-medium text-[var(--sa-text-muted)] hover:text-[var(--sa-text)] transition-colors"
            >
              Cancel
            </button>
          )}
          <button 
            onClick={handleSave}
            disabled={!hasChanges && !isSaved}
            className="flex items-center gap-2 bg-[var(--sa-success)] hover:bg-[var(--sa-accent)] disabled:opacity-50 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            <Save size={16} />
            {isSaved ? 'Saved!' : 'Save Changes'}
          </button>
        </div>
      </div>

      {/* A. Profile and Account */}
      <div className="bg-[var(--sa-surface-2)] border border-[var(--sa-border)] rounded-xl overflow-hidden">
        <div className="p-5 border-b border-[var(--sa-border)] flex items-center gap-2">
          <User size={18} className="text-[var(--sa-accent)]" />
          <h2 className="text-lg font-bold text-[var(--sa-text)] m-0">Profile & Account</h2>
        </div>
        
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-[var(--sa-text-sec)] text-sm font-medium block mb-1">Full Name</label>
              <input 
                type="text" 
                value={mockCurrentUser.name} 
                disabled 
                className="w-full bg-[var(--sa-surface)] border border-[var(--sa-border)] rounded-lg px-3 py-2 text-[var(--sa-text)] opacity-70 cursor-not-allowed"
              />
            </div>
            <div>
              <label className="text-[var(--sa-text-sec)] text-sm font-medium block mb-1">Email Address</label>
              <input 
                type="email" 
                value={mockCurrentUser.email} 
                disabled 
                className="w-full bg-[var(--sa-surface)] border border-[var(--sa-border)] rounded-lg px-3 py-2 text-[var(--sa-text)] opacity-70 cursor-not-allowed"
              />
            </div>
            <div>
              <label className="text-[var(--sa-text-sec)] text-sm font-medium block mb-1">Role</label>
              <input 
                type="text" 
                value={mockCurrentUser.role} 
                disabled 
                className="w-full bg-[var(--sa-surface)] border border-[var(--sa-border)] rounded-lg px-3 py-2 text-[var(--sa-text)] opacity-70 cursor-not-allowed"
              />
            </div>
            <div>
              <label className="text-[var(--sa-text-sec)] text-sm font-medium block mb-1">Organization</label>
              <input 
                type="text" 
                value={mockCurrentUser.orgs[0]} 
                disabled 
                className="w-full bg-[var(--sa-surface)] border border-[var(--sa-border)] rounded-lg px-3 py-2 text-[var(--sa-text)] opacity-70 cursor-not-allowed"
              />
            </div>
          </div>
          <p className="text-xs text-[var(--sa-text-muted)] italic mt-2">
            * Your profile information is managed by your Organization Admin. Contact your Organization Admin for changes.
          </p>
        </div>
      </div>

      {/* B. Notification Preferences */}
      <div className="bg-[var(--sa-surface-2)] border border-[var(--sa-border)] rounded-xl overflow-hidden">
        <div className="p-5 border-b border-[var(--sa-border)] flex items-center gap-2">
          <Bell size={18} className="text-[var(--sa-accent)]" />
          <h2 className="text-lg font-bold text-[var(--sa-text)] m-0">Notification Preferences</h2>
        </div>
        
        <div className="p-6 space-y-6">
          <div className="grid gap-6">
            {[
              { id: 'notifyNewIssue', label: 'New Issue Assigned', desc: 'Notify me when a new compliance issue is assigned to me.' },
              { id: 'notifyApproachingDue', label: 'Approaching Due Date', desc: 'Remind me 48 hours before an issue is due.' },
              { id: 'notifyOverdue', label: 'Overdue Issue', desc: 'Alert me immediately when an issue becomes overdue.' },
              { id: 'notifyVerification', label: 'Awaiting Verification', desc: 'Notify me when a resolved issue is ready for verification.' },
              { id: 'notifyAuditScheduled', label: 'Audit Scheduled', desc: 'Notify me when a new internal or external audit is scheduled.' },
              { id: 'notifyPolicyReminders', label: 'Policy Reminders', desc: 'Receive weekly summaries of pending policy acknowledgements.' },
            ].map(setting => (
              <div key={setting.id} className="flex items-center justify-between">
                <div>
                  <label className="text-[var(--sa-text)] font-medium block">{setting.label}</label>
                  <p className="text-sm text-[var(--sa-text-muted)]">{setting.desc}</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer" 
                    checked={preferences[setting.id]}
                    onChange={() => handleToggle(setting.id)}
                  />
                  <div className="w-11 h-6 bg-[var(--sa-surface)] border border-[var(--sa-border)] rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-[var(--sa-text-sec)] peer-checked:after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--sa-success)] peer-checked:border-[var(--sa-success)]"></div>
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* C. Workflow Preferences */}
      <div className="bg-[var(--sa-surface-2)] border border-[var(--sa-border)] rounded-xl overflow-hidden">
        <div className="p-5 border-b border-[var(--sa-border)] flex items-center gap-2">
          <Sliders size={18} className="text-[var(--sa-accent)]" />
          <h2 className="text-lg font-bold text-[var(--sa-text)] m-0">Workflow Preferences</h2>
        </div>
        
        <div className="p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <label className="text-[var(--sa-text)] font-medium block">Default Audit View</label>
              <p className="text-sm text-[var(--sa-text-muted)]">Select which audits to see first.</p>
            </div>
            <select 
              value={preferences.defaultAuditView}
              onChange={(e) => handleSelect('defaultAuditView', e.target.value)}
              className="bg-[var(--sa-surface)] border border-[var(--sa-border)] rounded-lg px-3 py-2 text-[var(--sa-text)] focus:outline-none focus:border-[var(--sa-accent)]"
            >
              <option>All</option>
              <option>Planned</option>
              <option>In Progress</option>
            </select>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <label className="text-[var(--sa-text)] font-medium block">Default Issue View</label>
              <p className="text-sm text-[var(--sa-text-muted)]">Select default status filter for issues.</p>
            </div>
            <select 
              value={preferences.defaultIssueView}
              onChange={(e) => handleSelect('defaultIssueView', e.target.value)}
              className="bg-[var(--sa-surface)] border border-[var(--sa-border)] rounded-lg px-3 py-2 text-[var(--sa-text)] focus:outline-none focus:border-[var(--sa-accent)]"
            >
              <option>All</option>
              <option>Open</option>
              <option>In Progress</option>
              <option>Resolved</option>
            </select>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <label className="text-[var(--sa-text)] font-medium block">Default Date Range</label>
              <p className="text-sm text-[var(--sa-text-muted)]">Default range for Governance Reports.</p>
            </div>
            <select 
              value={preferences.defaultDateRange}
              onChange={(e) => handleSelect('defaultDateRange', e.target.value)}
              className="bg-[var(--sa-surface)] border border-[var(--sa-border)] rounded-lg px-3 py-2 text-[var(--sa-text)] focus:outline-none focus:border-[var(--sa-accent)]"
            >
              <option>This Month</option>
              <option>This Quarter</option>
              <option>This Year</option>
              <option>All Time</option>
            </select>
          </div>

          <div className="flex items-center justify-between pt-2">
            <div>
              <label className="text-[var(--sa-text)] font-medium block">Highlight Overdue Issues</label>
              <p className="text-sm text-[var(--sa-text-muted)]">Visually emphasize overdue issues in lists.</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="sr-only peer" 
                checked={preferences.highlightOverdue}
                onChange={() => handleToggle('highlightOverdue')}
              />
              <div className="w-11 h-6 bg-[var(--sa-surface)] border border-[var(--sa-border)] rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-[var(--sa-text-sec)] peer-checked:after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--sa-success)] peer-checked:border-[var(--sa-success)]"></div>
            </label>
          </div>
        </div>
      </div>

      {/* D. Appearance */}
      <div className="bg-[var(--sa-surface-2)] border border-[var(--sa-border)] rounded-xl overflow-hidden">
        <div className="p-5 border-b border-[var(--sa-border)] flex items-center gap-2">
          <Moon size={18} className="text-[var(--sa-accent)]" />
          <h2 className="text-lg font-bold text-[var(--sa-text)] m-0">Appearance</h2>
        </div>
        
        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <label className="text-[var(--sa-text)] font-medium block">Dark Mode</label>
              <p className="text-sm text-[var(--sa-text-muted)]">Toggle the application theme.</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="sr-only peer" 
                checked={isDark}
                onChange={toggleTheme}
              />
              <div className="w-11 h-6 bg-[var(--sa-surface)] border border-[var(--sa-border)] rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-[var(--sa-text-sec)] peer-checked:after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--sa-success)] peer-checked:border-[var(--sa-success)]"></div>
            </label>
          </div>
        </div>
      </div>

      {/* E. Security */}
      <div className="bg-[var(--sa-surface-2)] border border-[var(--sa-border)] rounded-xl overflow-hidden">
        <div className="p-5 border-b border-[var(--sa-border)] flex items-center gap-2">
          <Shield size={18} className="text-[var(--sa-accent)]" />
          <h2 className="text-lg font-bold text-[var(--sa-text)] m-0">Security & Session</h2>
        </div>
        
        <div className="p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <label className="text-[var(--sa-text)] font-medium block">Password</label>
              <p className="text-sm text-[var(--sa-text-muted)]">Last changed 45 days ago.</p>
            </div>
            <button 
              onClick={() => setShowPasswordForm(!showPasswordForm)}
              className="px-4 py-2 bg-[var(--sa-surface)] border border-[var(--sa-border)] text-[var(--sa-text)] rounded-lg text-sm font-medium hover:bg-[var(--sa-border)] transition-colors"
            >
              {showPasswordForm ? 'Cancel' : 'Change Password'}
            </button>
          </div>
          
          {showPasswordForm && (
            <form onSubmit={handlePasswordSubmit} className="mt-6 p-5 bg-[var(--sa-surface)] border border-[var(--sa-border)] rounded-lg space-y-4">
              <div>
                <label className="block text-sm font-medium text-[var(--sa-text)] mb-1">Current Password</label>
                <input 
                  type="password"
                  value={passwordData.currentPassword}
                  onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))}
                  className="w-full bg-[var(--sa-surface-2)] border border-[var(--sa-border)] rounded-lg px-3 py-2 text-[var(--sa-text)] focus:outline-none focus:border-[var(--sa-accent)]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--sa-text)] mb-1">New Password</label>
                <input 
                  type="password"
                  value={passwordData.newPassword}
                  onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
                  className="w-full bg-[var(--sa-surface-2)] border border-[var(--sa-border)] rounded-lg px-3 py-2 text-[var(--sa-text)] focus:outline-none focus:border-[var(--sa-accent)]"
                />
                <p className="text-xs text-[var(--sa-text-muted)] mt-1">Must be at least 8 characters.</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--sa-text)] mb-1">Confirm New Password</label>
                <input 
                  type="password"
                  value={passwordData.confirmPassword}
                  onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                  className="w-full bg-[var(--sa-surface-2)] border border-[var(--sa-border)] rounded-lg px-3 py-2 text-[var(--sa-text)] focus:outline-none focus:border-[var(--sa-accent)]"
                />
              </div>
              
              {passwordError && (
                <div className="text-red-400 text-sm">{passwordError}</div>
              )}
              
              <div className="pt-2 flex justify-end gap-3">
                <button 
                  type="button"
                  onClick={() => {
                    setShowPasswordForm(false);
                    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
                    setPasswordError(null);
                  }}
                  className="px-4 py-2 text-sm font-medium text-[var(--sa-text-muted)] hover:text-[var(--sa-text)] transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  disabled={isSubmittingPassword}
                  className="px-4 py-2 bg-[var(--sa-success)] hover:bg-[var(--sa-accent)] disabled:opacity-50 text-white rounded-lg text-sm font-medium transition-colors"
                >
                  {isSubmittingPassword ? 'Updating...' : 'Update Password'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

    </div>
  );
};

export default ComplianceSettingsPage;
