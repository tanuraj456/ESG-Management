import React, { useState, useRef, useEffect } from 'react';
import { Search, Filter, MoreHorizontal, AlertTriangle, CheckCircle2, Clock, Mail, Info, X, MessageSquare, AlertCircle } from 'lucide-react';

const SupportPage = () => {
  const [tickets, setTickets] = useState([
    { id: 'TKT-1001', subject: 'Unable to invite users', submittedBy: 'Jane Doe', org: 'Acme Corporation', status: 'Open', priority: 'High', date: '2025-10-04' },
    { id: 'TKT-1002', subject: 'Report generation failing', submittedBy: 'Tony Stark', org: 'Stark Industries', status: 'In-progress', priority: 'High', date: '2025-10-03' },
    { id: 'TKT-1003', subject: 'Password reset link expired', submittedBy: 'Bruce Wayne', org: 'Wayne Enterprises', status: 'Resolved', priority: 'Medium', date: '2025-10-02' },
    { id: 'TKT-1004', subject: 'Dashboard not loading', submittedBy: 'Hank Scorpio', org: 'Globex Corp', status: 'Open', priority: 'Low', date: '2025-10-01' },
    { id: 'TKT-1005', subject: 'Billing inquiry', submittedBy: 'Bill Lumbergh', org: 'Initech', status: 'Resolved', priority: 'Low', date: '2025-09-28' },
  ]);

  const [activeDropdown, setActiveDropdown] = useState(null);
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
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleActionClick = (ticket, action, e) => {
    e.stopPropagation();
    setActiveDropdown(null);
    // Handle specific actions if needed
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Open': return 'bg-[var(--sa-warning)]/10 text-[var(--sa-warning)] border-[var(--sa-warning)]/20';
      case 'In-progress': return 'bg-[var(--sa-accent)]/10 text-[var(--sa-accent)] border-[var(--sa-accent)]/20';
      case 'Resolved': return 'bg-[var(--sa-success)]/10 text-[var(--sa-success)] border-[var(--sa-success)]/20';
      default: return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
    }
  };

  const getPriorityStyle = (priority) => {
    switch (priority) {
      case 'High': return 'text-[var(--sa-danger)]';
      case 'Medium': return 'text-[var(--sa-warning)]';
      case 'Low': return 'text-[var(--sa-success)]';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-[var(--sa-surface-2)] border border-[var(--sa-border)] rounded-xl p-4 flex flex-col relative overflow-hidden">
          <div className="flex justify-between items-start mb-2">
            <span className="text-[var(--sa-text-sec)] font-medium text-xs">Total Tickets</span>
            <div className="bg-[var(--sa-accent)]/20 p-1.5 rounded-lg text-[var(--sa-accent)]">
              <MessageSquare size={16} />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-[var(--sa-text)]">{tickets.length}</span>
          </div>
        </div>

        <div className="bg-[var(--sa-surface-2)] border border-[var(--sa-border)] rounded-xl p-4 flex flex-col relative overflow-hidden">
          <div className="flex justify-between items-start mb-2">
            <span className="text-[var(--sa-text-sec)] font-medium text-xs">Open Tickets</span>
            <div className="bg-[var(--sa-warning)]/20 p-1.5 rounded-lg text-[var(--sa-warning)]">
              <AlertCircle size={16} />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-[var(--sa-text)]">{tickets.filter(t => t.status === 'Open').length}</span>
          </div>
        </div>

        <div className="bg-[var(--sa-surface-2)] border border-[var(--sa-border)] rounded-xl p-4 flex flex-col relative overflow-hidden">
          <div className="flex justify-between items-start mb-2">
            <span className="text-[var(--sa-text-sec)] font-medium text-xs">In-Progress</span>
            <div className="bg-[var(--sa-accent)]/20 p-1.5 rounded-lg text-[var(--sa-accent)]">
              <Clock size={16} />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-[var(--sa-text)]">{tickets.filter(t => t.status === 'In-progress').length}</span>
          </div>
        </div>

        <div className="bg-[var(--sa-surface-2)] border border-[var(--sa-border)] rounded-xl p-4 flex flex-col relative overflow-hidden">
          <div className="flex justify-between items-start mb-2">
            <span className="text-[var(--sa-text-sec)] font-medium text-xs">Resolved</span>
            <div className="bg-[var(--sa-success)]/20 p-1.5 rounded-lg text-[var(--sa-success)]">
              <CheckCircle2 size={16} />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-[var(--sa-text)]">{tickets.filter(t => t.status === 'Resolved').length}</span>
          </div>
        </div>

        <div className="bg-[var(--sa-surface-2)] border border-[var(--sa-border)] rounded-xl p-4 flex flex-col relative overflow-hidden">
          <div className="flex justify-between items-start mb-2">
            <span className="text-[var(--sa-text-sec)] font-medium text-xs">High Priority</span>
            <div className="bg-[var(--sa-danger)]/20 p-1.5 rounded-lg text-[var(--sa-danger)]">
              <AlertTriangle size={16} />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-[var(--sa-text)]">{tickets.filter(t => t.priority === 'High').length}</span>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="bg-[var(--sa-surface-2)] border border-[var(--sa-border)] rounded-xl overflow-hidden flex flex-col">
        {/* Toolbar */}
        <div className="p-4 border-b border-[var(--sa-border)] flex flex-col sm:flex-row gap-4 justify-between items-center bg-[var(--sa-surface-1)]/50">
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--sa-text-muted)]" size={18} />
            <input 
              type="text" 
              placeholder="Search tickets..." 
              className="w-full bg-[var(--sa-surface-1)] border border-[var(--sa-border)] text-[var(--sa-text)] rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:border-[var(--sa-accent)] focus:ring-1 focus:ring-[var(--sa-accent)] transition-all text-sm"
            />
          </div>
          <div className="flex gap-3 w-full sm:w-auto">
            <button className="flex items-center justify-center gap-2 px-4 py-2 bg-[var(--sa-surface-1)] border border-[var(--sa-border)] text-[var(--sa-text)] rounded-lg hover:bg-[var(--sa-surface-hover)] transition-colors text-sm font-medium w-full sm:w-auto">
              <Filter size={16} /> Filter
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[var(--sa-border)] bg-[var(--sa-surface-1)]/30">
                <th className="p-4 text-xs font-semibold text-[var(--sa-text-muted)] uppercase tracking-wider">Ticket ID</th>
                <th className="p-4 text-xs font-semibold text-[var(--sa-text-muted)] uppercase tracking-wider">Subject</th>
                <th className="p-4 text-xs font-semibold text-[var(--sa-text-muted)] uppercase tracking-wider">Submitted By</th>
                <th className="p-4 text-xs font-semibold text-[var(--sa-text-muted)] uppercase tracking-wider">Status</th>
                <th className="p-4 text-xs font-semibold text-[var(--sa-text-muted)] uppercase tracking-wider">Priority</th>
                <th className="p-4 text-xs font-semibold text-[var(--sa-text-muted)] uppercase tracking-wider">Date</th>
                <th className="p-4 text-xs font-semibold text-[var(--sa-text-muted)] uppercase tracking-wider text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--sa-border)]">
              {tickets.map((ticket) => (
                <tr key={ticket.id} className="hover:bg-[var(--sa-surface-hover)]/50 transition-colors group">
                  <td className="p-4 text-sm font-medium text-[var(--sa-text)]">{ticket.id}</td>
                  <td className="p-4 text-sm text-[var(--sa-text)]">{ticket.subject}</td>
                  <td className="p-4 text-sm">
                    <div className="text-[var(--sa-text)]">{ticket.submittedBy}</div>
                    <div className="text-xs text-[var(--sa-text-muted)]">{ticket.org}</div>
                  </td>
                  <td className="p-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusStyle(ticket.status)}`}>
                      {ticket.status}
                    </span>
                  </td>
                  <td className={`p-4 text-sm font-medium ${getPriorityStyle(ticket.priority)}`}>
                    {ticket.priority}
                  </td>
                  <td className="p-4 text-sm text-[var(--sa-text-muted)]">{ticket.date}</td>
                  <td className="p-4 text-right relative">
                    <button 
                      onClick={() => setActiveDropdown(activeDropdown === ticket.id ? null : ticket.id)}
                      className="p-1.5 text-[var(--sa-text-muted)] hover:text-[var(--sa-text)] rounded-md hover:bg-[var(--sa-surface-1)] transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
                    >
                      <MoreHorizontal size={18} />
                    </button>

                    {activeDropdown === ticket.id && (
                      <div 
                        ref={dropdownRef}
                        className="absolute right-8 top-10 w-48 bg-[var(--sa-surface-2)] border border-[var(--sa-border)] rounded-lg shadow-xl z-10 py-1"
                      >
                        <button 
                          onClick={(e) => handleActionClick(ticket, 'view', e)}
                          className="w-full text-left px-4 py-2 text-sm text-[var(--sa-text)] hover:bg-[var(--sa-surface-hover)] flex items-center"
                        >
                          <Info size={14} className="mr-2" /> View Details
                        </button>
                        <button 
                          onClick={(e) => handleActionClick(ticket, 'reply', e)}
                          className="w-full text-left px-4 py-2 text-sm text-[var(--sa-text)] hover:bg-[var(--sa-surface-hover)] flex items-center"
                        >
                          <MessageSquare size={14} className="mr-2" /> Reply
                        </button>
                        <button 
                          onClick={(e) => handleActionClick(ticket, 'resolve', e)}
                          className="w-full text-left px-4 py-2 text-sm text-[var(--sa-success)] hover:bg-[var(--sa-surface-hover)] flex items-center"
                        >
                          <CheckCircle2 size={14} className="mr-2" /> Mark Resolved
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {tickets.length === 0 && (
            <div className="p-8 text-center text-[var(--sa-text-muted)] flex flex-col items-center">
              <div className="bg-[var(--sa-surface-1)] p-4 rounded-full mb-3">
                <MessageSquare size={32} className="opacity-50" />
              </div>
              <p className="text-lg font-medium text-[var(--sa-text)]">No support tickets found</p>
              <p className="text-sm mt-1">There are currently no tickets matching your criteria.</p>
            </div>
          )}
        </div>
        
        {/* Pagination placeholder */}
        <div className="p-4 border-t border-[var(--sa-border)] flex justify-between items-center text-sm text-[var(--sa-text-muted)] bg-[var(--sa-surface-1)]/30">
          <div>Showing {tickets.length} tickets</div>
          <div className="flex gap-1">
            <button className="px-3 py-1 rounded bg-[var(--sa-surface-1)] border border-[var(--sa-border)] hover:bg-[var(--sa-surface-hover)] disabled:opacity-50" disabled>Previous</button>
            <button className="px-3 py-1 rounded bg-[var(--sa-surface-1)] border border-[var(--sa-border)] hover:bg-[var(--sa-surface-hover)] disabled:opacity-50" disabled>Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportPage;
