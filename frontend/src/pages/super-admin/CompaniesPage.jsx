import React, { useState, useEffect, useRef } from 'react';
import { Search, Filter, MoreHorizontal, ShieldAlert, PlayCircle, Eye, Activity, X } from 'lucide-react';

const CompaniesPage = () => {
  const [companies, setCompanies] = useState([
    { id: 'ORG-1029', name: 'Acme Corporation', ind: 'Manufacturing', admin: 'Jane Doe', users: 145, status: 'Active', date: '2025-01-10' },
    { id: 'ORG-1030', name: 'Stark Industries', ind: 'Technology', admin: 'Tony Stark', users: 890, status: 'Active', date: '2025-02-15' },
    { id: 'ORG-1031', name: 'Wayne Enterprises', ind: 'Logistics', admin: 'Bruce Wayne', users: 432, status: 'Inactive', date: '2025-03-01' },
    { id: 'ORG-1032', name: 'Globex Corp', ind: 'Energy', admin: 'Hank Scorpio', users: 56, status: 'Suspended', date: '2025-04-12' },
    { id: 'ORG-1033', name: 'Initech', ind: 'Software', admin: 'Bill Lumbergh', users: 12, status: 'Active', date: '2025-05-20' },
    { id: 'ORG-1034', name: 'Umbrella Corp', ind: 'Pharmaceuticals', admin: 'Albert Wesker', users: 5000, status: 'Active', date: '2025-06-11' },
    { id: 'ORG-1035', name: 'Massive Dynamic', ind: 'Research', admin: 'William Bell', users: 340, status: 'Suspended', date: '2025-07-04' },
  ]);

  const [activeDropdown, setActiveDropdown] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [showActivity, setShowActivity] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);
  
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
        setShowConfirm(false);
        setShowDetails(false);
        setShowActivity(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleActionClick = (company, action, e) => {
    e.stopPropagation();
    setSelectedCompany(company);
    setActiveDropdown(null);
    if (action === 'suspend_reactivate') setShowConfirm(true);
    if (action === 'details') setShowDetails(true);
    if (action === 'activity') setShowActivity(true);
  };

  const confirmStatusChange = () => {
    setCompanies(prev => prev.map(c => {
      if (c.id === selectedCompany.id) {
        return { ...c, status: c.status === 'Suspended' ? 'Active' : 'Suspended' };
      }
      return c;
    }));
    setShowConfirm(false);
  };

  const getStatusBadge = (status) => {
    if (status === 'Active') return <span className="px-2.5 py-1 rounded-md text-[10px] font-medium border bg-[var(--sa-success)]/10 text-[var(--sa-success)] border-[var(--sa-success)]/20">Active</span>;
    if (status === 'Inactive') return <span className="px-2.5 py-1 rounded-md text-[10px] font-medium border bg-[var(--sa-chart)]/10 text-[var(--sa-chart)] border-[var(--sa-chart)]/20">Inactive</span>;
    return <span className="px-2.5 py-1 rounded-md text-[10px] font-medium border bg-[var(--sa-warning)]/10 text-[var(--sa-warning)] border-[var(--sa-warning)]/20">Suspended</span>;
  };

  return (
    <div className="space-y-6 relative">
      
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">

        
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--sa-text-muted)]" />
            <input 
              type="text" 
              placeholder="Search companies..." 
              className="w-full bg-[var(--sa-surface-2)] border border-[var(--sa-border)] rounded-lg pl-9 pr-4 py-2 text-sm text-[var(--sa-text)] placeholder-[var(--sa-text-muted)] focus:outline-none focus:border-[var(--sa-accent)] transition-colors"
            />
          </div>
          <button className="bg-[var(--sa-surface-2)] border border-[var(--sa-border)] rounded-lg p-2 text-[var(--sa-text-sec)] hover:text-[var(--sa-text)] transition-colors">
            <Filter size={18} />
          </button>
        </div>
      </div>

      {/* Table Card */}
      <div className="bg-[var(--sa-surface-2)] border border-[var(--sa-border)] rounded-xl overflow-visible relative">
        <div className="overflow-x-auto overflow-y-visible">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-[var(--sa-surface)] text-[var(--sa-text-muted)] text-xs uppercase">
              <tr>
                <th className="px-6 py-4 font-medium">Organization</th>
                <th className="px-6 py-4 font-medium">Admin</th>
                <th className="px-6 py-4 font-medium">Industry</th>
                <th className="px-6 py-4 font-medium">Users</th>
                <th className="px-6 py-4 font-medium">Registered</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--sa-border)]">
              {companies.map((company) => (
                <tr key={company.id} className="hover:bg-[var(--sa-surface)] transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-medium text-[var(--sa-text)]">{company.name}</div>
                    <div className="text-[10px] text-[var(--sa-text-muted)]">{company.id}</div>
                  </td>
                  <td className="px-6 py-4 text-[var(--sa-text-sec)]">{company.admin}</td>
                  <td className="px-6 py-4 text-[var(--sa-text-sec)]">{company.ind}</td>
                  <td className="px-6 py-4 text-[var(--sa-text-sec)]">{company.users}</td>
                  <td className="px-6 py-4 text-[var(--sa-text-sec)]">{company.date}</td>
                  <td className="px-6 py-4">{getStatusBadge(company.status)}</td>
                  <td className="px-6 py-4 text-right relative">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveDropdown(activeDropdown === company.id ? null : company.id);
                      }}
                      className="text-[var(--sa-text-muted)] hover:text-[var(--sa-text)] p-1 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--sa-accent)]"
                      aria-label="Actions menu"
                    >
                      <MoreHorizontal size={16} />
                    </button>

                    {/* Actions Dropdown */}
                    {activeDropdown === company.id && (
                      <div 
                        ref={dropdownRef}
                        className="absolute right-8 top-10 w-48 bg-[var(--sa-surface-2)] border border-[var(--sa-border)] rounded-lg shadow-xl z-50 py-1 flex flex-col text-left"
                      >
                        <button 
                          onClick={(e) => handleActionClick(company, 'details', e)}
                          className="px-4 py-2 text-sm text-[var(--sa-text-sec)] hover:bg-[var(--sa-surface)] hover:text-[var(--sa-text)] flex items-center gap-2 transition-colors w-full"
                        >
                          <Eye size={14} /> View Details
                        </button>
                        <button 
                          onClick={(e) => handleActionClick(company, 'activity', e)}
                          className="px-4 py-2 text-sm text-[var(--sa-text-sec)] hover:bg-[var(--sa-surface)] hover:text-[var(--sa-text)] flex items-center gap-2 transition-colors w-full"
                        >
                          <Activity size={14} /> View Activity
                        </button>
                        <div className="h-px bg-[var(--sa-border)] my-1 w-full"></div>
                        
                        {company.status === 'Suspended' ? (
                           <button 
                            onClick={(e) => handleActionClick(company, 'suspend_reactivate', e)}
                            className="px-4 py-2 text-sm text-[var(--sa-success)] hover:bg-[var(--sa-surface)] flex items-center gap-2 transition-colors w-full"
                           >
                             <PlayCircle size={14} /> Reactivate Company
                           </button>
                        ) : (
                           <button 
                            onClick={(e) => handleActionClick(company, 'suspend_reactivate', e)}
                            className="px-4 py-2 text-sm text-[var(--sa-warning)] hover:bg-[var(--sa-surface)] flex items-center gap-2 transition-colors w-full"
                           >
                             <ShieldAlert size={14} /> Suspend Company
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
        
        {/* Pagination */}
        <div className="border-t border-[var(--sa-border)] p-4 flex items-center justify-between text-sm text-[var(--sa-text-muted)]">
          <span>Showing 1 to 7 of 124 companies</span>
          <div className="flex gap-2">
            <button className="px-3 py-1 bg-[var(--sa-surface)] border border-[var(--sa-border)] rounded hover:text-[var(--sa-text)] disabled:opacity-50">Prev</button>
            <button className="px-3 py-1 bg-[var(--sa-border)] text-[var(--sa-text)] rounded">1</button>
            <button className="px-3 py-1 bg-[var(--sa-surface)] border border-[var(--sa-border)] rounded hover:text-[var(--sa-text)]">2</button>
            <button className="px-3 py-1 bg-[var(--sa-surface)] border border-[var(--sa-border)] rounded hover:text-[var(--sa-text)]">Next</button>
          </div>
        </div>
      </div>

      {/* Confirmation Dialog */}
      {showConfirm && selectedCompany && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-[var(--sa-surface-2)] border border-[var(--sa-border)] rounded-2xl p-6 max-w-md w-full shadow-2xl animate-fade-up">
            <div className="flex items-center gap-3 mb-4">
              {selectedCompany.status === 'Suspended' ? (
                <div className="p-3 bg-[var(--sa-success)]/20 rounded-full text-[var(--sa-success)]"><PlayCircle size={24} /></div>
              ) : (
                <div className="p-3 bg-[var(--sa-warning)]/20 rounded-full text-[var(--sa-warning)]"><ShieldAlert size={24} /></div>
              )}
              <h3 className="text-xl font-bold text-[var(--sa-text)]">
                {selectedCompany.status === 'Suspended' ? 'Reactivate Company' : 'Suspend Company'}
              </h3>
            </div>
            
            <p className="text-[var(--sa-text-sec)] mb-6">
              Are you sure you want to {selectedCompany.status === 'Suspended' ? 'reactivate' : 'suspend'} <strong>{selectedCompany.name}</strong>? 
              <br/><br/>
              <span className="text-sm text-[var(--sa-text-muted)] italic">* This is a frontend demo. The status will update locally.</span>
            </p>
            
            <div className="flex justify-end gap-3">
              <button 
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 rounded-lg font-medium text-[var(--sa-text)] bg-[var(--sa-border)] hover:bg-[var(--sa-surface)] transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={confirmStatusChange}
                className={`px-4 py-2 rounded-lg font-medium text-white transition-colors ${selectedCompany.status === 'Suspended' ? 'bg-[var(--sa-success)] hover:bg-[var(--sa-accent)]' : 'bg-[var(--sa-warning)] hover:bg-red-600'}`}
              >
                Confirm {selectedCompany.status === 'Suspended' ? 'Reactivation' : 'Suspension'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Details Modal */}
      {showDetails && selectedCompany && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-[var(--sa-surface-2)] border border-[var(--sa-border)] rounded-2xl p-6 max-w-lg w-full shadow-2xl animate-fade-up">
            <div className="flex justify-between items-center mb-6 border-b border-[var(--sa-border)] pb-4">
              <h3 className="text-xl font-bold text-[var(--sa-text)]">Company Details</h3>
              <button onClick={() => setShowDetails(false)} className="text-[var(--sa-text-muted)] hover:text-[var(--sa-text)] transition-colors p-1">
                <X size={20} />
              </button>
            </div>
            
            <div className="space-y-4 mb-6">
              <div className="grid grid-cols-3 gap-2 border-b border-[var(--sa-border)] pb-3">
                <span className="text-[var(--sa-text-muted)] text-sm font-medium">Organization</span>
                <span className="col-span-2 text-[var(--sa-text)] font-semibold">{selectedCompany.name} <span className="font-normal text-[var(--sa-text-sec)] text-xs ml-2">({selectedCompany.id})</span></span>
              </div>
              <div className="grid grid-cols-3 gap-2 border-b border-[var(--sa-border)] pb-3">
                <span className="text-[var(--sa-text-muted)] text-sm font-medium">Industry</span>
                <span className="col-span-2 text-[var(--sa-text-sec)]">{selectedCompany.ind}</span>
              </div>
              <div className="grid grid-cols-3 gap-2 border-b border-[var(--sa-border)] pb-3">
                <span className="text-[var(--sa-text-muted)] text-sm font-medium">Registration Date</span>
                <span className="col-span-2 text-[var(--sa-text-sec)]">{selectedCompany.date}</span>
              </div>
              <div className="grid grid-cols-3 gap-2 border-b border-[var(--sa-border)] pb-3">
                <span className="text-[var(--sa-text-muted)] text-sm font-medium">Administrator</span>
                <span className="col-span-2 text-[var(--sa-text-sec)]">{selectedCompany.admin}</span>
              </div>
              <div className="grid grid-cols-3 gap-2 border-b border-[var(--sa-border)] pb-3">
                <span className="text-[var(--sa-text-muted)] text-sm font-medium">Active Users</span>
                <span className="col-span-2 text-[var(--sa-text-sec)]">{selectedCompany.users}</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <span className="text-[var(--sa-text-muted)] text-sm font-medium">Current Status</span>
                <span className="col-span-2">{getStatusBadge(selectedCompany.status)}</span>
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

      {/* View Activity Modal */}
      {showActivity && selectedCompany && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-[var(--sa-surface-2)] border border-[var(--sa-border)] rounded-2xl p-6 max-w-lg w-full shadow-2xl animate-fade-up">
            <div className="flex justify-between items-center mb-6 border-b border-[var(--sa-border)] pb-4">
              <div className="flex items-center gap-2">
                <Activity size={20} className="text-[var(--sa-accent)]" />
                <h3 className="text-xl font-bold text-[var(--sa-text)]">Recent Activity</h3>
              </div>
              <button onClick={() => setShowActivity(false)} className="text-[var(--sa-text-muted)] hover:text-[var(--sa-text)] transition-colors p-1">
                <X size={20} />
              </button>
            </div>
            
            <div className="py-8 text-center border border-dashed border-[var(--sa-border)] rounded-lg bg-[var(--sa-surface)] mb-6">
              <p className="text-[var(--sa-text-sec)] font-medium">No activity records available</p>
              <p className="text-sm text-[var(--sa-text-muted)] mt-1">Audit logs have not been collected for {selectedCompany.name} yet.</p>
            </div>

            <div className="flex justify-end">
              <button onClick={() => setShowActivity(false)} className="px-4 py-2 rounded-lg font-medium text-[var(--sa-text)] bg-[var(--sa-border)] hover:bg-[var(--sa-surface)] transition-colors">
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default CompaniesPage;
