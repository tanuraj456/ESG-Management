import React, { useContext, useState, useEffect, useRef } from 'react';
import { Search, Bell, ChevronDown, Sun, Moon, User, Settings, Building, LogOut, X, Eye, EyeOff, Loader2, Check, ShieldAlert, CheckCircle, Info, Building2, Menu, Leaf } from 'lucide-react';
import { ThemeContext } from './ComplianceLayout';
import { useNavigate } from 'react-router-dom';
import { updateProfile, updatePassword, updatePreferences, mockCurrentUser } from '../../services/userService';
import { fetchNotifications, markAsRead, markAllAsRead } from '../../services/notificationService';

const ComplianceHeader = ({ isCollapsed, toggleSidebar }) => {
  const { isDark, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  
  const dropdownRef = useRef(null);
  const notifRef = useRef(null);

  // Mock User Data State
  const [currentUser, setCurrentUser] = useState(mockCurrentUser);

  // Settings Modal Forms State
  const [profileForm, setProfileForm] = useState({ name: '', email: '' });
  const [passwordForm, setPasswordForm] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
  const [emailNotifications, setEmailNotifications] = useState(true);

  // Validation & Error States
  const [profileErrors, setProfileErrors] = useState({});
  const [passwordErrors, setPasswordErrors] = useState({});
  const [globalError, setGlobalError] = useState('');
  
  // Loading & Success States
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [isSavingPassword, setIsSavingPassword] = useState(false);
  const [profileSuccess, setProfileSuccess] = useState(false);
  const [passwordSuccess, setPasswordSuccess] = useState(false);

  // UI States for Passwords
  const [isPasswordFormOpen, setIsPasswordFormOpen] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Notifications State
  const [notifications, setNotifications] = useState([]);
  const [notifFilter, setNotifFilter] = useState('All');

  useEffect(() => {
    fetchNotifications('Compliance Officer').then(data => setNotifications(data));
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setIsNotifOpen(false);
      }
    };
    
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setIsDropdownOpen(false);
        setIsNotifOpen(false);
        setShowProfileModal(false);
        handleCancelSettings();
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  useEffect(() => {
    if (showSettingsModal) {
      setProfileForm({ name: currentUser.name, email: currentUser.email || '' });
      setEmailNotifications(currentUser.emailNotifications);
      setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setIsPasswordFormOpen(false);
      setProfileErrors({});
      setPasswordErrors({});
      setGlobalError('');
      setProfileSuccess(false);
      setPasswordSuccess(false);
    }
  }, [showSettingsModal, currentUser]);

  const handleLogout = () => {
    setIsDropdownOpen(false);
    navigate('/login');
  };

  const handleCancelSettings = () => {
    if (isSavingProfile || isSavingPassword) return;
    setShowSettingsModal(false);
  };

  const handleCancelPassword = () => {
    if (isSavingPassword) return;
    setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
    setPasswordErrors({});
    setIsPasswordFormOpen(false);
  };

  const validateProfileForm = () => {
    const errors = {};
    if (!profileForm.name.trim()) errors.name = 'Full Name is required';
    if (!profileForm.email.trim()) {
      errors.email = 'Email Address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profileForm.email)) {
      errors.email = 'Invalid email format';
    }
    setProfileErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validatePasswordForm = () => {
    const errors = {};
    if (!passwordForm.currentPassword) errors.currentPassword = 'Required to change password';
    if (!passwordForm.newPassword) {
      errors.newPassword = 'Required';
    } else if (passwordForm.newPassword.length < 8) {
      errors.newPassword = 'Must be at least 8 characters';
    }
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
    setPasswordErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleUpdateProfile = async () => {
    if (!validateProfileForm()) return;
    setIsSavingProfile(true);
    setProfileSuccess(false);
    setGlobalError('');

    try {
      await updateProfile(currentUser.id, profileForm);
      await updatePreferences(currentUser.id, { emailNotifications });
      
      setCurrentUser(prev => ({
        ...prev,
        name: profileForm.name,
        email: profileForm.email,
        emailNotifications: emailNotifications
      }));
      setProfileSuccess(true);
      setTimeout(() => setProfileSuccess(false), 3000);
    } catch (error) {
      setGlobalError('Failed to update profile details. Please try again.');
    } finally {
      setIsSavingProfile(false);
    }
  };

  const handleUpdatePassword = async () => {
    if (!validatePasswordForm()) return;
    setIsSavingPassword(true);
    setPasswordSuccess(false);
    setGlobalError('');

    try {
      await updatePassword(currentUser.id, passwordForm);
      
      setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setIsPasswordFormOpen(false);
      setPasswordSuccess(true);
      setTimeout(() => setPasswordSuccess(false), 3000);
    } catch (error) {
      setPasswordErrors(prev => ({ ...prev, currentPassword: error.message || 'Failed to update password' }));
    } finally {
      setIsSavingPassword(false);
    }
  };

  const handleMarkAsRead = async (notif, e) => {
    e.stopPropagation();
    if (notif.read) return;
    
    setNotifications(prev => prev.map(n => n.id === notif.id ? { ...n, read: true } : n));
    try {
      await markAsRead(notif.id);
    } catch (err) {
      setNotifications(prev => prev.map(n => n.id === notif.id ? { ...n, read: false } : n));
    }
  };

  const handleNotificationClick = async (notif) => {
    if (!notif.read) {
      setNotifications(prev => prev.map(n => n.id === notif.id ? { ...n, read: true } : n));
      markAsRead(notif.id).catch(() => {
        setNotifications(prev => prev.map(n => n.id === notif.id ? { ...n, read: false } : n));
      });
    }
    
    setIsNotifOpen(false);
    if (notif.link) {
      navigate(notif.link.replace('/super-admin', '/compliance')); // Remap generic mock links
    }
  };

  const handleMarkAllAsRead = async () => {
    const unreadIds = notifications.filter(n => !n.read).map(n => n.id);
    if (unreadIds.length === 0) return;

    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    try {
      await markAllAsRead('Compliance Officer');
    } catch (err) {
      setNotifications(prev => prev.map(n => unreadIds.includes(n.id) ? { ...n, read: false } : n));
    }
  };

  const getNotifIcon = (type) => {
    switch (type) {
      case 'alert': return <ShieldAlert size={16} className="text-[var(--sa-warning)]" />;
      case 'review': return <CheckCircle size={16} className="text-[var(--sa-accent)]" />;
      case 'info': return <Building2 size={16} className="text-[var(--sa-success)]" />;
      case 'reminder': return <Info size={16} className="text-[var(--sa-text-sec)]" />;
      default: return <Bell size={16} className="text-[var(--sa-text-sec)]" />;
    }
  };

  const displayedNotifications = notifFilter === 'Unread' 
    ? notifications.filter(n => !n.read) 
    : notifications;
    
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <>
      <header className="h-16 bg-[var(--sa-surface)] border-b border-[var(--sa-border)] fixed top-0 left-0 right-0 flex items-center justify-between px-6 z-30 transition-colors duration-300">
        <div className="flex items-center gap-4">
          <button
            onClick={toggleSidebar}
            className="text-[var(--sa-text-sec)] hover:text-[var(--sa-text)] transition-colors p-1.5 rounded-lg hover:bg-[var(--sa-surface-2)] focus:outline-none focus:ring-2 focus:ring-[var(--sa-accent)]"
            title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          >
            <Menu size={24} />
          </button>
          
          <div className="flex items-center gap-2">
            <Leaf size={24} className="text-[var(--sa-success)] shrink-0" strokeWidth={2.5} />
            <span className="text-xl font-semibold text-[var(--sa-text)] tracking-tight">EcoSphere</span>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-sm ml-4 border-l border-[var(--sa-border)] pl-4">
            <span className="text-[var(--sa-text-muted)]">Workspace</span>
            <span className="text-[var(--sa-text-muted)]">/</span>
            <span className="text-[var(--sa-text)] font-medium">Compliance Officer</span>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--sa-text-muted)]" />
            <input 
              type="text" 
              placeholder="Search anything..." 
              className="bg-[var(--sa-surface-2)] border border-[var(--sa-border)] rounded-lg pl-9 pr-4 py-1.5 text-sm text-[var(--sa-text)] placeholder-[var(--sa-text-muted)] focus:outline-none focus:border-[var(--sa-accent)] w-64 transition-colors duration-300"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-[var(--sa-text-muted)] border border-[var(--sa-border)] rounded px-1">⌘K</span>
          </div>

          <button 
            onClick={toggleTheme}
            className="text-[var(--sa-text-sec)] hover:text-[var(--sa-text)] transition-colors p-2 rounded-lg hover:bg-[var(--sa-surface-2)] focus:outline-none focus:ring-2 focus:ring-[var(--sa-accent)]"
            title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <div className="relative" ref={notifRef}>
            <button 
              onClick={() => setIsNotifOpen(!isNotifOpen)}
              className="text-[var(--sa-text-sec)] hover:text-[var(--sa-text)] transition-colors relative focus:outline-none focus:ring-2 focus:ring-[var(--sa-accent)] p-2 rounded-lg hover:bg-[var(--sa-surface-2)]"
              aria-expanded={isNotifOpen}
              aria-haspopup="true"
            >
              <Bell size={20} />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-[var(--sa-warning)] rounded-full border border-[var(--sa-surface)]"></span>
              )}
            </button>

            {/* Notifications Dropdown */}
            {isNotifOpen && (
              <div className="absolute right-0 top-12 w-80 sm:w-96 bg-[var(--sa-surface-2)] border border-[var(--sa-border)] rounded-xl shadow-xl z-50 py-2 animate-fade-up overflow-hidden flex flex-col max-h-[80vh]">
                <div className="px-4 py-3 border-b border-[var(--sa-border)] flex items-center justify-between shrink-0">
                  <h3 className="font-bold text-[var(--sa-text)]">Notifications</h3>
                  {unreadCount > 0 && (
                    <button 
                      onClick={handleMarkAllAsRead}
                      className="text-xs font-medium text-[var(--sa-accent)] hover:text-[var(--sa-success)] transition-colors focus:outline-none focus:underline"
                    >
                      Mark all as read
                    </button>
                  )}
                </div>

                <div className="flex border-b border-[var(--sa-border)] shrink-0">
                  <button 
                    onClick={() => setNotifFilter('All')}
                    className={`flex-1 py-2 text-xs font-medium text-center transition-colors focus:outline-none ${notifFilter === 'All' ? 'text-[var(--sa-success)] border-b-2 border-[var(--sa-success)]' : 'text-[var(--sa-text-muted)] hover:text-[var(--sa-text)] border-b-2 border-transparent'}`}
                  >
                    All
                  </button>
                  <button 
                    onClick={() => setNotifFilter('Unread')}
                    className={`flex-1 py-2 text-xs font-medium text-center transition-colors focus:outline-none flex items-center justify-center gap-1.5 ${notifFilter === 'Unread' ? 'text-[var(--sa-success)] border-b-2 border-[var(--sa-success)]' : 'text-[var(--sa-text-muted)] hover:text-[var(--sa-text)] border-b-2 border-transparent'}`}
                  >
                    Unread
                    {unreadCount > 0 && (
                      <span className="bg-[var(--sa-surface)] text-[var(--sa-text)] px-1.5 py-0.5 rounded-full text-[10px] leading-none border border-[var(--sa-border)]">
                        {unreadCount}
                      </span>
                    )}
                  </button>
                </div>

                <div className="overflow-y-auto form-scrollbar flex-1">
                  {displayedNotifications.length === 0 ? (
                    <div className="py-12 px-6 flex flex-col items-center justify-center text-center">
                      <Bell size={32} className="text-[var(--sa-border)] mb-3" />
                      <p className="text-sm font-medium text-[var(--sa-text)]">No notifications</p>
                      <p className="text-xs text-[var(--sa-text-muted)] mt-1">
                        {notifFilter === 'Unread' ? "You're all caught up!" : "You don't have any notifications yet."}
                      </p>
                    </div>
                  ) : (
                    <div className="flex flex-col">
                      {displayedNotifications.map(notif => (
                        <div 
                          key={notif.id}
                          onClick={() => handleNotificationClick(notif)}
                          className={`p-4 border-b border-[var(--sa-border)] last:border-0 hover:bg-[var(--sa-surface)] transition-colors cursor-pointer relative group ${!notif.read ? 'bg-[var(--sa-success)]/5' : ''}`}
                        >
                          {!notif.read && (
                            <div className="absolute left-0 top-0 bottom-0 w-1 bg-[var(--sa-success)]"></div>
                          )}
                          <div className="flex gap-3 items-start">
                            <div className={`mt-0.5 p-1.5 rounded-full ${!notif.read ? 'bg-[var(--sa-surface-2)] shadow-sm border border-[var(--sa-border)]' : 'bg-transparent'}`}>
                              {getNotifIcon(notif.type)}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex justify-between items-start gap-2 mb-1">
                                <h4 className={`text-sm font-medium truncate ${!notif.read ? 'text-[var(--sa-text)]' : 'text-[var(--sa-text-sec)]'}`}>
                                  {notif.title}
                                </h4>
                                <span className="text-[10px] text-[var(--sa-text-muted)] whitespace-nowrap mt-0.5">
                                  {notif.timestamp}
                                </span>
                              </div>
                              <p className="text-xs text-[var(--sa-text-muted)] line-clamp-2 leading-relaxed">
                                {notif.description}
                              </p>
                            </div>
                          </div>
                          
                          {!notif.read && (
                            <button
                              onClick={(e) => handleMarkAsRead(notif, e)}
                              className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 p-1.5 bg-[var(--sa-surface-2)] border border-[var(--sa-border)] rounded-full text-[var(--sa-text-sec)] hover:text-[var(--sa-success)] hover:border-[var(--sa-success)]/30 transition-all focus:outline-none focus:opacity-100"
                              title="Mark as read"
                            >
                              <Check size={14} />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="relative border-l border-[var(--sa-border)] pl-6" ref={dropdownRef}>
            <button 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-3 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[var(--sa-accent)] rounded-lg p-1 hover:bg-[var(--sa-surface-2)] transition-colors"
              aria-expanded={isDropdownOpen}
              aria-haspopup="true"
            >
              <div className="w-8 h-8 rounded-full bg-[var(--sa-success)] flex items-center justify-center text-white font-bold text-sm shrink-0">
                {currentUser.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="flex flex-col text-left hidden sm:flex">
                <span className="text-sm font-medium text-[var(--sa-text)] leading-tight">{currentUser.name}</span>
                <span className="text-[10px] text-[var(--sa-text-muted)]">{currentUser.orgs[0]}</span>
              </div>
              <ChevronDown size={16} className={`text-[var(--sa-text-sec)] ml-1 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Profile Dropdown */}
            {isDropdownOpen && (
              <div className="absolute right-0 top-12 w-64 bg-[var(--sa-surface-2)] border border-[var(--sa-border)] rounded-xl shadow-xl z-50 py-2 animate-fade-up">
                
                {/* Header Profile Info */}
                <div className="px-4 py-3 border-b border-[var(--sa-border)] flex gap-3 items-center">
                  <div className="w-10 h-10 rounded-full bg-[var(--sa-success)] flex items-center justify-center text-white font-bold text-sm shrink-0">
                    {currentUser.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="flex flex-col overflow-hidden">
                    <span className="text-sm font-semibold text-[var(--sa-text)] truncate">{currentUser.name}</span>
                    <span className="text-xs text-[var(--sa-accent)] font-medium">{currentUser.role}</span>
                    {currentUser.email && <span className="text-[10px] text-[var(--sa-text-muted)] truncate">{currentUser.email}</span>}
                  </div>
                </div>

                <div className="py-2">
                  <button 
                    onClick={() => { setIsDropdownOpen(false); setShowProfileModal(true); }}
                    className="w-full text-left px-4 py-2 text-sm text-[var(--sa-text-sec)] hover:bg-[var(--sa-surface)] hover:text-[var(--sa-text)] flex items-center gap-3 transition-colors focus:outline-none focus:bg-[var(--sa-surface)]"
                  >
                    <User size={16} /> My Profile
                  </button>
                  <button 
                    onClick={() => { setIsDropdownOpen(false); setShowSettingsModal(true); }}
                    className="w-full text-left px-4 py-2 text-sm text-[var(--sa-text-sec)] hover:bg-[var(--sa-surface)] hover:text-[var(--sa-text)] flex items-center gap-3 transition-colors focus:outline-none focus:bg-[var(--sa-surface)]"
                  >
                    <Settings size={16} /> Account Settings
                  </button>
                  
                  {currentUser.orgs.length > 1 && (
                    <button 
                      onClick={() => { setIsDropdownOpen(false); /* placeholder */ }}
                      className="w-full text-left px-4 py-2 text-sm text-[var(--sa-text-sec)] hover:bg-[var(--sa-surface)] hover:text-[var(--sa-text)] flex items-center gap-3 transition-colors focus:outline-none focus:bg-[var(--sa-surface)]"
                    >
                      <Building size={16} /> Switch Organization
                    </button>
                  )}
                </div>

                <div className="border-t border-[var(--sa-border)] pt-2 pb-1">
                  <button 
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-[var(--sa-warning)] hover:bg-[var(--sa-surface)] hover:text-red-500 flex items-center gap-3 transition-colors focus:outline-none focus:bg-[var(--sa-surface)]"
                  >
                    <LogOut size={16} /> Log Out
                  </button>
                </div>

              </div>
            )}
          </div>
        </div>
      </header>

      {/* Basic Profile Modal */}
      {showProfileModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-[var(--sa-surface-2)] border border-[var(--sa-border)] rounded-2xl p-6 max-w-sm w-full shadow-2xl animate-fade-up">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-[var(--sa-text)]">My Profile</h3>
              <button onClick={() => setShowProfileModal(false)} className="text-[var(--sa-text-muted)] hover:text-[var(--sa-text)] transition-colors p-1 rounded focus:outline-none focus:ring-2 focus:ring-[var(--sa-accent)]">
                <X size={20} />
              </button>
            </div>
            <div className="flex flex-col items-center mb-6">
              <div className="w-20 h-20 rounded-full bg-[var(--sa-success)] flex items-center justify-center text-white font-bold text-2xl mb-4">
                {currentUser.name.split(' ').map(n => n[0]).join('')}
              </div>
              <h4 className="text-lg font-semibold text-[var(--sa-text)]">{currentUser.name}</h4>
              <p className="text-sm text-[var(--sa-accent)]">{currentUser.role}</p>
              <p className="text-xs text-[var(--sa-text-muted)] mt-1">{currentUser.email}</p>
            </div>
            <div className="flex justify-end">
              <button onClick={() => setShowProfileModal(false)} className="px-4 py-2 rounded-lg font-medium text-[var(--sa-text)] bg-[var(--sa-border)] hover:bg-[var(--sa-surface)] transition-colors w-full focus:outline-none focus:ring-2 focus:ring-[var(--sa-accent)]">
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Account Settings Modal */}
      {showSettingsModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-[var(--sa-surface-2)] border border-[var(--sa-border)] rounded-2xl p-6 md:p-8 max-w-2xl w-full shadow-2xl animate-fade-up max-h-[90vh] overflow-y-auto form-scrollbar">
            
            <div className="flex justify-between items-center mb-8 border-b border-[var(--sa-border)] pb-4">
              <div className="flex items-center gap-3">
                <Settings size={24} className="text-[var(--sa-accent)]" />
                <h3 className="text-2xl font-bold text-[var(--sa-text)]">Account Settings</h3>
              </div>
              <button 
                onClick={handleCancelSettings} 
                disabled={isSavingProfile || isSavingPassword}
                className="text-[var(--sa-text-muted)] hover:text-[var(--sa-text)] transition-colors p-1 rounded focus:outline-none focus:ring-2 focus:ring-[var(--sa-accent)] disabled:opacity-50"
              >
                <X size={24} />
              </button>
            </div>

            {globalError && (
              <div className="mb-6 p-3 bg-red-900/20 border border-red-500/30 rounded-lg text-sm text-red-400">
                {globalError}
              </div>
            )}
            
            <div className="space-y-8">
              {/* Profile Information Section */}
              <section>
                <h4 className="text-lg font-semibold text-[var(--sa-text)] mb-4 flex items-center justify-between">
                  Profile Information
                  {profileSuccess && <span className="text-xs text-[var(--sa-success)] font-medium flex items-center gap-1"><Check size={12}/> Saved</span>}
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-[var(--sa-text-sec)]">Full Name</label>
                    <input 
                      type="text" 
                      value={profileForm.name}
                      onChange={(e) => setProfileForm(prev => ({ ...prev, name: e.target.value }))}
                      disabled={isSavingProfile}
                      className={`w-full bg-[var(--sa-surface)] border ${profileErrors.name ? 'border-red-500' : 'border-[var(--sa-border)]'} rounded-lg px-3 py-2 text-sm text-[var(--sa-text)] focus:outline-none focus:border-[var(--sa-accent)] transition-colors disabled:opacity-50`}
                    />
                    {profileErrors.name && <span className="text-[10px] text-red-400">{profileErrors.name}</span>}
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-[var(--sa-text-sec)]">Email Address</label>
                    <input 
                      type="email" 
                      value={profileForm.email}
                      onChange={(e) => setProfileForm(prev => ({ ...prev, email: e.target.value }))}
                      disabled={isSavingProfile}
                      className={`w-full bg-[var(--sa-surface)] border ${profileErrors.email ? 'border-red-500' : 'border-[var(--sa-border)]'} rounded-lg px-3 py-2 text-sm text-[var(--sa-text)] focus:outline-none focus:border-[var(--sa-accent)] transition-colors disabled:opacity-50`}
                    />
                    {profileErrors.email && <span className="text-[10px] text-red-400">{profileErrors.email}</span>}
                  </div>
                </div>
                
                {/* Preferences Section nested closely */}
                <div className="flex items-center justify-between bg-[var(--sa-surface)] border border-[var(--sa-border)] rounded-lg p-4 mb-4">
                  <div>
                    <h5 className="text-sm font-medium text-[var(--sa-text)]">Email Notifications</h5>
                    <p className="text-xs text-[var(--sa-text-muted)] mt-0.5">Receive alerts for platform issues and compliance breaches.</p>
                  </div>
                  <button 
                    role="switch"
                    aria-checked={emailNotifications}
                    onClick={() => setEmailNotifications(!emailNotifications)}
                    disabled={isSavingProfile}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--sa-accent)] focus:ring-offset-2 focus:ring-offset-[var(--sa-surface-2)] disabled:opacity-50 ${emailNotifications ? 'bg-[var(--sa-success)]' : 'bg-[var(--sa-border)]'}`}
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${emailNotifications ? 'translate-x-6' : 'translate-x-1'}`} />
                  </button>
                </div>
                
                <div className="flex justify-end">
                  <button 
                    onClick={handleUpdateProfile}
                    disabled={isSavingProfile}
                    className="flex items-center gap-2 px-5 py-2 rounded-lg font-medium text-white bg-[var(--sa-success)] hover:bg-[var(--sa-accent)] transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSavingProfile ? <Loader2 size={16} className="animate-spin" /> : null}
                    Save Changes
                  </button>
                </div>
              </section>

              <div className="h-px bg-[var(--sa-border)] w-full"></div>

              {/* Security Section */}
              <section>
                <h4 className="text-lg font-semibold text-[var(--sa-text)] mb-4 flex items-center justify-between">
                  Security
                  {passwordSuccess && <span className="text-xs text-[var(--sa-success)] font-medium flex items-center gap-1"><Check size={12}/> Updated</span>}
                </h4>
                
                {!isPasswordFormOpen ? (
                  <div className="flex items-center justify-between bg-[var(--sa-surface)] border border-[var(--sa-border)] rounded-lg p-4">
                    <div>
                      <h5 className="text-sm font-medium text-[var(--sa-text)]">Password</h5>
                      <p className="text-xs text-[var(--sa-text-muted)] mt-0.5">Update your account password securely.</p>
                    </div>
                    <button 
                      onClick={() => setIsPasswordFormOpen(true)}
                      className="px-4 py-2 rounded-lg text-sm font-medium text-[var(--sa-text)] bg-[var(--sa-surface-2)] border border-[var(--sa-border)] hover:bg-[var(--sa-border)] transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--sa-accent)]"
                    >
                      Change Password
                    </button>
                  </div>
                ) : (
                  <div className="bg-[var(--sa-surface)] border border-[var(--sa-border)] rounded-lg p-5 animate-fade-up">
                    <div className="space-y-4 mb-6">
                      <div className="flex flex-col gap-1.5 max-w-sm">
                        <label className="text-sm font-medium text-[var(--sa-text-sec)]">Current Password</label>
                        <div className="relative">
                          <input 
                            type={showCurrentPassword ? "text" : "password"} 
                            value={passwordForm.currentPassword}
                            onChange={(e) => setPasswordForm(prev => ({ ...prev, currentPassword: e.target.value }))}
                            disabled={isSavingPassword}
                            className={`w-full bg-[var(--sa-surface-2)] border ${passwordErrors.currentPassword ? 'border-red-500' : 'border-[var(--sa-border)]'} rounded-lg px-3 py-2 pr-10 text-sm text-[var(--sa-text)] focus:outline-none focus:border-[var(--sa-accent)] transition-colors disabled:opacity-50`}
                          />
                          <button type="button" onClick={() => setShowCurrentPassword(!showCurrentPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--sa-text-muted)] hover:text-[var(--sa-text)]">
                            {showCurrentPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                          </button>
                        </div>
                        {passwordErrors.currentPassword && <span className="text-[10px] text-red-400">{passwordErrors.currentPassword}</span>}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1.5">
                          <label className="text-sm font-medium text-[var(--sa-text-sec)]">New Password</label>
                          <div className="relative">
                            <input 
                              type={showNewPassword ? "text" : "password"} 
                              value={passwordForm.newPassword}
                              onChange={(e) => setPasswordForm(prev => ({ ...prev, newPassword: e.target.value }))}
                              disabled={isSavingPassword}
                              className={`w-full bg-[var(--sa-surface-2)] border ${passwordErrors.newPassword ? 'border-red-500' : 'border-[var(--sa-border)]'} rounded-lg px-3 py-2 pr-10 text-sm text-[var(--sa-text)] focus:outline-none focus:border-[var(--sa-accent)] transition-colors disabled:opacity-50`}
                            />
                            <button type="button" onClick={() => setShowNewPassword(!showNewPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--sa-text-muted)] hover:text-[var(--sa-text)]">
                              {showNewPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                          </div>
                          {passwordErrors.newPassword && <span className="text-[10px] text-red-400">{passwordErrors.newPassword}</span>}
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label className="text-sm font-medium text-[var(--sa-text-sec)]">Confirm New Password</label>
                          <div className="relative">
                            <input 
                              type={showConfirmPassword ? "text" : "password"} 
                              value={passwordForm.confirmPassword}
                              onChange={(e) => setPasswordForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                              disabled={isSavingPassword}
                              className={`w-full bg-[var(--sa-surface-2)] border ${passwordErrors.confirmPassword ? 'border-red-500' : 'border-[var(--sa-border)]'} rounded-lg px-3 py-2 pr-10 text-sm text-[var(--sa-text)] focus:outline-none focus:border-[var(--sa-accent)] transition-colors disabled:opacity-50`}
                            />
                            <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--sa-text-muted)] hover:text-[var(--sa-text)]">
                              {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                          </div>
                          {passwordErrors.confirmPassword && <span className="text-[10px] text-red-400">{passwordErrors.confirmPassword}</span>}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-end gap-3 pt-4 border-t border-[var(--sa-border)]">
                      <button 
                        onClick={handleCancelPassword}
                        disabled={isSavingPassword}
                        className="px-4 py-2 rounded-lg text-sm font-medium text-[var(--sa-text)] bg-transparent hover:bg-[var(--sa-surface-2)] transition-colors disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-[var(--sa-accent)]"
                      >
                        Cancel
                      </button>
                      <button 
                        onClick={handleUpdatePassword}
                        disabled={isSavingPassword}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white bg-[var(--sa-success)] hover:bg-[var(--sa-accent)] transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                      >
                        {isSavingPassword ? <Loader2 size={16} className="animate-spin" /> : null}
                        Update Password
                      </button>
                    </div>
                  </div>
                )}
              </section>

            </div>

            <div className="mt-8 border-t border-[var(--sa-border)] pt-6 flex justify-start">
              <button 
                onClick={handleCancelSettings}
                disabled={isSavingProfile || isSavingPassword}
                className="px-6 py-2.5 rounded-lg font-medium text-[var(--sa-text)] bg-[var(--sa-border)] hover:bg-[var(--sa-surface)] transition-colors disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-[var(--sa-accent)]"
              >
                Close Settings
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
};

export default ComplianceHeader;
