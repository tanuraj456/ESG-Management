import React, { useState, useEffect, useRef } from 'react';
import { Search, Filter, MoreHorizontal, ShieldAlert, PlayCircle, Eye, Edit, X, Loader2 } from 'lucide-react';
import { updateRole, updateUserStatus } from '../../services/userService';

const UserDirectoryPage = () => {
  const [users, setUsers] = useState([
    { empId: 'EMP-001', name: 'Nandani Sankhla', org: 'Acme Corporation', role: 'Super Admin', status: 'Active' },
    { empId: 'EMP-042', name: 'John Doe', org: 'Acme Corporation', role: 'Organization Admin', status: 'Active' },
    { empId: 'EMP-113', name: 'Sarah Smith', org: 'Wayne Enterprises', role: 'Compliance Officer', status: 'Inactive' },
    { empId: 'EMP-204', name: 'Michael Chang', org: 'Stark Industries', role: 'Manager', status: 'Active' },
    { empId: 'EMP-399', name: 'Emily Davis', org: 'Globex Corp', role: 'Employee', status: 'Suspended' },
  ]);

  const [activeDropdown, setActiveDropdown] = useState(null);
  
  // Modals visibility
  const [showConfirm, setShowConfirm] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [showRoleEdit, setShowRoleEdit] = useState(false);
  
  // Active states
  const [selectedUser, setSelectedUser] = useState(null);
  const [newRole, setNewRole] = useState('');
  
  // Loading and Error states
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  const [statusError, setStatusError] = useState('');
  
  const [isEditingRole, setIsEditingRole] = useState(false);
  const [roleError, setRoleError] = useState('');
  
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    };
    
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setActiveDropdown(null);
        if (!isUpdatingStatus) setShowConfirm(false);
        setShowDetails(false);
        if (!isEditingRole) setShowRoleEdit(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isUpdatingStatus, isEditingRole]);

  const handleActionClick = (user, action, e) => {
    e.stopPropagation();
    setSelectedUser(user);
    setActiveDropdown(null);
    if (action === 'suspend_activate') {
      setStatusError('');
      setShowConfirm(true);
    }
    if (action === 'details') setShowDetails(true);
    if (action === 'edit_role') {
      setNewRole(user.role);
      setRoleError('');
      setShowRoleEdit(true);
    }
  };

  const handleUpdateUserStatus = async () => {
    if (!selectedUser) return;
    const newStatus = selectedUser.status === 'Suspended' ? 'Active' : 'Suspended';
    
    setIsUpdatingStatus(true);
    setStatusError('');
    
    try {
      await updateUserStatus(selectedUser.empId, newStatus);
      
      setUsers(prev => prev.map(u => {
        if (u.empId === selectedUser.empId) {
          return { ...u, status: newStatus };
        }
        return u;
      }));
      setShowConfirm(false);
    } catch (err) {
      setStatusError(err.message || 'Failed to update user status.');
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  const handleUpdateRole = async () => {
    if (!selectedUser || !newRole) return;
    
    setIsEditingRole(true);
    setRoleError('');
    
    try {
      await updateRole(selectedUser.empId, newRole);
      
      setUsers(prev => prev.map(u => {
        if (u.empId === selectedUser.empId) {
          return { ...u, role: newRole };
        }
        return u;
      }));
      setShowRoleEdit(false);
    } catch (err) {
      setRoleError(err.message || 'Failed to update user role.');
    } finally {
      setIsEditingRole(false);
    }
  };

  const getRoleBadge = (role) => {
    if (role === 'Super Admin') return <span className="text-[var(--sa-success)] font-medium text-xs">Super Admin</span>;
    if (role === 'Organization Admin') return <span className="text-[var(--sa-chart)] font-medium text-xs">Org Admin</span>;
    return <span className="text-[var(--sa-text-sec)] font-medium text-xs">{role}</span>;
  };

  return (
    <div className="space-y-6 relative">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">

        
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--sa-text-muted)]" />
            <input 
              type="text" 
              placeholder="Search users..." 
              className="w-full bg-[var(--sa-surface-2)] border border-[var(--sa-border)] rounded-lg pl-9 pr-4 py-2 text-sm text-[var(--sa-text)] placeholder-[var(--sa-text-muted)] focus:outline-none focus:border-[var(--sa-accent)] transition-colors"
            />
          </div>
          <button className="bg-[var(--sa-surface-2)] border border-[var(--sa-border)] rounded-lg p-2 text-[var(--sa-text-sec)] hover:text-[var(--sa-text)] transition-colors">
            <Filter size={18} />
          </button>
        </div>
      </div>

      <div className="bg-[var(--sa-surface-2)] border border-[var(--sa-border)] rounded-xl overflow-visible relative">
        <div className="overflow-x-auto overflow-y-visible">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-[var(--sa-surface)] text-[var(--sa-text-muted)] text-xs uppercase">
              <tr>
                <th className="px-6 py-4 font-medium">User</th>
                <th className="px-6 py-4 font-medium">Emp ID</th>
                <th className="px-6 py-4 font-medium">Organization</th>
                <th className="px-6 py-4 font-medium">Role</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--sa-border)]">
              {users.map((user) => (
                <tr key={user.empId} className="hover:bg-[var(--sa-surface)] transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[var(--sa-border)] flex items-center justify-center text-[var(--sa-text)] text-xs font-bold">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="font-medium text-[var(--sa-text)]">{user.name}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-[var(--sa-text-sec)] font-mono text-xs">{user.empId}</td>
                  <td className="px-6 py-4 text-[var(--sa-text-sec)]">{user.org}</td>
                  <td className="px-6 py-4">{getRoleBadge(user.role)}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-md text-[10px] font-medium border ${user.status === 'Active' ? 'bg-[var(--sa-success)]/10 text-[var(--sa-success)] border-[var(--sa-success)]/20' : user.status === 'Inactive' ? 'bg-[var(--sa-chart)]/10 text-[var(--sa-chart)] border-[var(--sa-chart)]/20' : 'bg-[var(--sa-warning)]/10 text-[var(--sa-warning)] border-[var(--sa-warning)]/20'}`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right relative">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveDropdown(activeDropdown === user.empId ? null : user.empId);
                      }}
                      className="text-[var(--sa-text-muted)] hover:text-[var(--sa-text)] p-1 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--sa-accent)]"
                      aria-label="Actions menu"
                    >
                      <MoreHorizontal size={16} />
                    </button>

                    {/* Actions Dropdown */}
                    {activeDropdown === user.empId && (
                      <div 
                        ref={dropdownRef}
                        className="absolute right-8 top-10 w-48 bg-[var(--sa-surface-2)] border border-[var(--sa-border)] rounded-lg shadow-xl z-50 py-1 flex flex-col text-left"
                      >
                        <button 
                          onClick={(e) => handleActionClick(user, 'details', e)}
                          className="px-4 py-2 text-sm text-[var(--sa-text-sec)] hover:bg-[var(--sa-surface)] hover:text-[var(--sa-text)] flex items-center gap-2 transition-colors w-full"
                        >
                          <Eye size={14} /> View Details
                        </button>
                        <button 
                          onClick={(e) => handleActionClick(user, 'edit_role', e)}
                          className="px-4 py-2 text-sm text-[var(--sa-text-sec)] hover:bg-[var(--sa-surface)] hover:text-[var(--sa-text)] flex items-center gap-2 transition-colors w-full"
                        >
                          <Edit size={14} /> Edit Role
                        </button>
                        <div className="h-px bg-[var(--sa-border)] my-1 w-full"></div>
                        
                        {user.status === 'Suspended' ? (
                           <button 
                            onClick={(e) => handleActionClick(user, 'suspend_activate', e)}
                            className="px-4 py-2 text-sm text-[var(--sa-success)] hover:bg-[var(--sa-surface)] flex items-center gap-2 transition-colors w-full"
                           >
                             <PlayCircle size={14} /> Activate User
                           </button>
                        ) : (
                           <button 
                            onClick={(e) => handleActionClick(user, 'suspend_activate', e)}
                            className="px-4 py-2 text-sm text-[var(--sa-warning)] hover:bg-[var(--sa-surface)] flex items-center gap-2 transition-colors w-full"
                           >
                             <ShieldAlert size={14} /> Suspend User
                           </button>
                        )}
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Confirmation Dialog */}
      {showConfirm && selectedUser && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-[var(--sa-surface-2)] border border-[var(--sa-border)] rounded-2xl p-6 max-w-md w-full shadow-2xl animate-fade-up">
            <div className="flex items-center gap-3 mb-4">
              {selectedUser.status === 'Suspended' ? (
                <div className="p-3 bg-[var(--sa-success)]/20 rounded-full text-[var(--sa-success)]"><PlayCircle size={24} /></div>
              ) : (
                <div className="p-3 bg-[var(--sa-warning)]/20 rounded-full text-[var(--sa-warning)]"><ShieldAlert size={24} /></div>
              )}
              <h3 className="text-xl font-bold text-[var(--sa-text)]">
                {selectedUser.status === 'Suspended' ? 'Activate User' : 'Suspend User'}
              </h3>
            </div>
            
            <p className="text-[var(--sa-text-sec)] mb-6">
              Are you sure you want to {selectedUser.status === 'Suspended' ? 'activate' : 'suspend'} <strong>{selectedUser.name}</strong>? 
            </p>

            {statusError && (
              <div className="mb-6 p-3 bg-red-900/20 border border-red-500/30 rounded-lg text-sm text-red-400">
                {statusError}
              </div>
            )}
            
            <div className="flex justify-end gap-3">
              <button 
                onClick={() => setShowConfirm(false)}
                disabled={isUpdatingStatus}
                className="px-4 py-2 rounded-lg font-medium text-[var(--sa-text)] bg-[var(--sa-border)] hover:bg-[var(--sa-surface)] transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button 
                onClick={handleUpdateUserStatus}
                disabled={isUpdatingStatus}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-white transition-colors disabled:opacity-70 ${selectedUser.status === 'Suspended' ? 'bg-[var(--sa-success)] hover:bg-[var(--sa-accent)]' : 'bg-[var(--sa-warning)] hover:bg-red-600'}`}
              >
                {isUpdatingStatus && <Loader2 size={16} className="animate-spin" />}
                Confirm {selectedUser.status === 'Suspended' ? 'Activation' : 'Suspension'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Details Modal */}
      {showDetails && selectedUser && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-[var(--sa-surface-2)] border border-[var(--sa-border)] rounded-2xl p-6 max-w-lg w-full shadow-2xl animate-fade-up">
            <div className="flex justify-between items-center mb-6 border-b border-[var(--sa-border)] pb-4">
              <h3 className="text-xl font-bold text-[var(--sa-text)]">User Details</h3>
              <button onClick={() => setShowDetails(false)} className="text-[var(--sa-text-muted)] hover:text-[var(--sa-text)] transition-colors p-1">
                <X size={20} />
              </button>
            </div>
            
            <div className="space-y-4 mb-6">
              <div className="grid grid-cols-3 gap-2 border-b border-[var(--sa-border)] pb-3">
                <span className="text-[var(--sa-text-muted)] text-sm font-medium">Full Name</span>
                <span className="col-span-2 text-[var(--sa-text)] font-semibold">{selectedUser.name}</span>
              </div>
              <div className="grid grid-cols-3 gap-2 border-b border-[var(--sa-border)] pb-3">
                <span className="text-[var(--sa-text-muted)] text-sm font-medium">Employee ID</span>
                <span className="col-span-2 text-[var(--sa-text-sec)] font-mono">{selectedUser.empId}</span>
              </div>
              <div className="grid grid-cols-3 gap-2 border-b border-[var(--sa-border)] pb-3">
                <span className="text-[var(--sa-text-muted)] text-sm font-medium">Organization</span>
                <span className="col-span-2 text-[var(--sa-text-sec)]">{selectedUser.org}</span>
              </div>
              <div className="grid grid-cols-3 gap-2 border-b border-[var(--sa-border)] pb-3">
                <span className="text-[var(--sa-text-muted)] text-sm font-medium">Role</span>
                <span className="col-span-2 text-[var(--sa-text-sec)]">{getRoleBadge(selectedUser.role)}</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <span className="text-[var(--sa-text-muted)] text-sm font-medium">Account Status</span>
                <span className="col-span-2">
                    <span className={`px-2.5 py-1 rounded-md text-[10px] font-medium border ${selectedUser.status === 'Active' ? 'bg-[var(--sa-success)]/10 text-[var(--sa-success)] border-[var(--sa-success)]/20' : selectedUser.status === 'Inactive' ? 'bg-[var(--sa-chart)]/10 text-[var(--sa-chart)] border-[var(--sa-chart)]/20' : 'bg-[var(--sa-warning)]/10 text-[var(--sa-warning)] border-[var(--sa-warning)]/20'}`}>
                      {selectedUser.status}
                    </span>
                </span>
              </div>
            </div>

            <div className="flex justify-end">
              <button onClick={() => setShowDetails(false)} className="px-4 py-2 rounded-lg font-medium text-[var(--sa-text)] bg-[var(--sa-border)] hover:bg-[var(--sa-surface)] transition-colors">
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Role Modal */}
      {showRoleEdit && selectedUser && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-[var(--sa-surface-2)] border border-[var(--sa-border)] rounded-2xl p-6 max-w-sm w-full shadow-2xl animate-fade-up">
            <div className="flex justify-between items-center mb-6 border-b border-[var(--sa-border)] pb-4">
              <div className="flex items-center gap-2">
                <Edit size={20} className="text-[var(--sa-accent)]" />
                <h3 className="text-xl font-bold text-[var(--sa-text)]">Edit Role</h3>
              </div>
              <button 
                onClick={() => setShowRoleEdit(false)} 
                disabled={isEditingRole}
                className="text-[var(--sa-text-muted)] hover:text-[var(--sa-text)] transition-colors p-1 disabled:opacity-50"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="mb-6">
                <p className="text-sm text-[var(--sa-text-muted)] mb-4">
                    Change role for <strong>{selectedUser.name}</strong>.
                </p>

                <div className="flex flex-col gap-2">
                    <label htmlFor="roleSelect" className="text-sm font-medium text-[var(--sa-text)]">New Role</label>
                    <select 
                        id="roleSelect"
                        value={newRole}
                        onChange={(e) => setNewRole(e.target.value)}
                        disabled={isEditingRole}
                        className="w-full bg-[var(--sa-surface)] border border-[var(--sa-border)] rounded-lg px-3 py-2 text-sm text-[var(--sa-text)] focus:outline-none focus:border-[var(--sa-accent)] transition-colors cursor-pointer disabled:opacity-50"
                    >
                        <option value="" disabled>Select a role</option>
                        <option value="Super Admin">Super Admin</option>
                        <option value="Organization Admin">Organization Admin</option>
                        <option value="Manager">Manager</option>
                        <option value="Compliance Officer">Compliance Officer</option>
                        <option value="Employee">Employee</option>
                    </select>
                </div>
                
                {roleError && (
                  <div className="mt-4 p-3 bg-red-900/20 border border-red-500/30 rounded-lg text-sm text-red-400">
                    {roleError}
                  </div>
                )}
            </div>

            <div className="flex justify-end gap-3">
              <button 
                onClick={() => setShowRoleEdit(false)} 
                disabled={isEditingRole}
                className="px-4 py-2 rounded-lg font-medium text-[var(--sa-text)] bg-[var(--sa-border)] hover:bg-[var(--sa-surface)] transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button 
                  onClick={handleUpdateRole}
                  disabled={!newRole || isEditingRole || newRole === selectedUser.role}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-white bg-[var(--sa-success)] hover:bg-[var(--sa-accent)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                  {isEditingRole && <Loader2 size={16} className="animate-spin" />}
                  Save Role
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default UserDirectoryPage;
