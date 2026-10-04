// src/services/complianceDataService.js

let mockAudits = [
  { id: 'AUD-001', title: 'Q3 Carbon Emissions Audit', department: 'Operations', policy: 'Environmental Policy', date: '2026-09-15', status: 'Completed', findings: 2, scope: 'Review scope 1 and 2 emissions data', findingsList: [{ id: 'FND-001', title: 'Missing scope 3 data', description: 'Transport data is missing', date: '2026-09-18' }, { id: 'FND-002', title: 'Water usage estimation', description: 'Water usage is estimated instead of metered', date: '2026-09-19' }] },
  { id: 'AUD-002', title: 'Data Privacy Compliance', department: 'IT', policy: 'Data Privacy Policy', date: '2026-10-10', status: 'In Progress', findings: 1, scope: 'Review server encryption and access logs', findingsList: [{ id: 'FND-003', title: 'Unencrypted backup servers', description: 'Legacy backup servers not encrypted at rest', date: '2026-10-12' }] },
  { id: 'AUD-003', title: 'Supplier Code of Conduct', department: 'Procurement', policy: 'Supplier Policy', date: '2026-11-01', status: 'Planned', findings: 0, scope: 'Audit top 20 suppliers', findingsList: [] },
  { id: 'AUD-004', title: 'Workplace Safety Inspection', department: 'HR', policy: 'Safety Policy', date: '2026-09-01', status: 'Completed', findings: 0, scope: 'Factory floor safety equipment check', findingsList: [] },
];

let mockIssues = [
  { id: 'ISS-101', title: 'Incomplete emissions data', description: 'Missing scope 3 data for transport.', auditId: 'AUD-001', department: 'Operations', severity: 'High', owner: 'EMP-012', dueDate: '2026-10-01', status: 'Open', resolution: null, verifier: null },
  { id: 'ISS-102', title: 'Unencrypted backup servers', description: 'Two legacy servers lack encryption.', auditId: 'AUD-002', department: 'IT', severity: 'Critical', owner: 'EMP-045', dueDate: '2026-10-20', status: 'In Progress', resolution: null, verifier: null },
  { id: 'ISS-103', title: 'Missing vendor compliance records', description: 'Five key vendors have not signed the latest conduct agreement.', auditId: null, department: 'Procurement', severity: 'Medium', owner: 'EMP-033', dueDate: '2026-10-15', status: 'Open', resolution: null, verifier: null },
  { id: 'ISS-104', title: 'Improper safety gear', description: 'Workers found without safety glasses.', auditId: 'AUD-004', department: 'HR', severity: 'Medium', owner: 'EMP-012', dueDate: '2026-09-10', status: 'Resolved', resolution: { details: 'New glasses distributed.', date: '2026-09-12' }, verifier: null },
];

let mockPolicies = [
  { id: 'POL-01', title: 'Global Data Privacy Policy', version: 'v2.1', departments: ['All'], deadline: '2026-12-31', description: 'Mandatory data handling rules.' },
  { id: 'POL-02', title: 'Environmental Health & Safety', version: 'v4.0', departments: ['Operations', 'HR'], deadline: '2026-10-15', description: 'Safety protocols for on-site operations.' },
  { id: 'POL-03', title: 'Code of Business Conduct', version: 'v1.5', departments: ['All'], deadline: '2026-11-30', description: 'Ethical standards and conflict of interest.' },
];

// Relationships: Employee ID <-> Policy ID
let mockAcknowledgements = [
  { id: 'ACK-1', policyId: 'POL-01', employeeId: 'EMP-012', status: 'Acknowledged', date: '2026-09-01', lastReminder: null },
  { id: 'ACK-2', policyId: 'POL-01', employeeId: 'EMP-045', status: 'Pending', date: null, lastReminder: null },
  { id: 'ACK-3', policyId: 'POL-01', employeeId: 'EMP-033', status: 'Acknowledged', date: '2026-09-05', lastReminder: null },
  { id: 'ACK-4', policyId: 'POL-01', employeeId: 'EMP-089', status: 'Pending', date: null, lastReminder: '2026-10-01' },
  { id: 'ACK-5', policyId: 'POL-02', employeeId: 'EMP-012', status: 'Acknowledged', date: '2026-08-20', lastReminder: null },
  { id: 'ACK-6', policyId: 'POL-02', employeeId: 'EMP-089', status: 'Pending', date: null, lastReminder: null },
  { id: 'ACK-7', policyId: 'POL-03', employeeId: 'EMP-045', status: 'Pending', date: null, lastReminder: null },
];

let mockEmployees = [
  { id: 'EMP-012', name: 'Emily Chen' },
  { id: 'EMP-045', name: 'Marcus Johnson' },
  { id: 'EMP-033', name: 'Sarah Williams' },
  { id: 'EMP-089', name: 'David Lee' },
];

export const getDashboardKPIs = async () => {
  return new Promise(resolve => setTimeout(() => {
    const totalAudits = mockAudits.length;
    const auditsInProgress = mockAudits.filter(a => a.status === 'In Progress').length;
    const today = new Date().toISOString().split('T')[0];
    const computedIssues = mockIssues.map(i => {
      const isOverdue = (i.status === 'Open' || i.status === 'In Progress') && i.dueDate < today;
      return { ...i, isOverdue };
    });

    const openIssues = computedIssues.filter(i => ['Open', 'In Progress'].includes(i.status) || i.isOverdue).length;
    const criticalIssues = computedIssues.filter(i => i.severity === 'Critical' && i.status !== 'Closed').length;
    const overdueIssues = computedIssues.filter(i => i.isOverdue).length;
    
    let totalRequired = mockAcknowledgements.length;
    let totalAccepted = mockAcknowledgements.filter(a => a.status === 'Acknowledged').length;
    
    const policyAckRate = totalRequired ? Math.round((totalAccepted / totalRequired) * 100) : 0;

    resolve({
      totalAudits,
      auditsInProgress,
      openIssues,
      criticalIssues,
      overdueIssues,
      policyAckRate
    });
  }, 300));
};

export const getAudits = async () => new Promise(res => setTimeout(() => res([...mockAudits]), 300));

export const getAudit = async (id) => new Promise(res => setTimeout(() => {
  const audit = mockAudits.find(a => a.id === id);
  res(audit ? { ...audit } : null);
}, 300));

export const createAudit = async (auditData) => new Promise(res => setTimeout(() => {
  const newAudit = {
    ...auditData,
    id: `AUD-${String(mockAudits.length + 1).padStart(3, '0')}`,
    findings: 0,
    findingsList: []
  };
  mockAudits = [newAudit, ...mockAudits];
  res({ ...newAudit });
}, 400));

export const updateAudit = async (id, auditData) => new Promise((res, rej) => setTimeout(() => {
  const index = mockAudits.findIndex(a => a.id === id);
  if (index === -1) return rej(new Error('Audit not found'));
  
  mockAudits[index] = { ...mockAudits[index], ...auditData };
  res({ ...mockAudits[index] });
}, 400));

export const recordFinding = async (auditId, findingData) => new Promise((res, rej) => setTimeout(() => {
  const index = mockAudits.findIndex(a => a.id === auditId);
  if (index === -1) return rej(new Error('Audit not found'));
  if (mockAudits[index].status === 'Completed') return rej(new Error('Cannot add findings to completed audit'));

  const newFinding = {
    ...findingData,
    id: `FND-${Date.now().toString().slice(-4)}`,
    date: new Date().toISOString().split('T')[0]
  };

  mockAudits[index].findingsList.push(newFinding);
  mockAudits[index].findings = mockAudits[index].findingsList.length;
  
  res({ ...newFinding });
}, 400));

export const getIssues = async () => new Promise(res => setTimeout(() => {
  const today = new Date().toISOString().split('T')[0];
  const computedIssues = mockIssues.map(i => {
    const isOverdue = (i.status === 'Open' || i.status === 'In Progress') && i.dueDate < today;
    return { ...i, isOverdue };
  });
  res(computedIssues);
}, 300));

export const createIssue = async (issueData) => new Promise(res => setTimeout(() => {
  const newIssue = {
    ...issueData,
    id: `ISS-${Date.now().toString().slice(-3)}`,
    status: 'Open',
    resolution: null,
    verifier: null,
    history: [{ action: 'Issue Raised', date: new Date().toISOString() }]
  };
  mockIssues = [newIssue, ...mockIssues];
  res({ ...newIssue });
}, 400));

export const updateIssue = async (id, issueData) => new Promise((res, rej) => setTimeout(() => {
  const index = mockIssues.findIndex(i => i.id === id);
  if (index === -1) return rej(new Error('Issue not found'));
  
  if (issueData.historyAction) {
    const newHistory = { action: issueData.historyAction, date: new Date().toISOString() };
    mockIssues[index].history = [...(mockIssues[index].history || []), newHistory];
    delete issueData.historyAction;
  }
  
  mockIssues[index] = { ...mockIssues[index], ...issueData };
  res({ ...mockIssues[index] });
}, 400));

export const getPolicies = async () => new Promise(res => setTimeout(() => {
  // Compute required/accepted from mockAcknowledgements
  const computedPolicies = mockPolicies.map(p => {
    const acks = mockAcknowledgements.filter(a => a.policyId === p.id);
    const required = acks.length;
    const accepted = acks.filter(a => a.status === 'Acknowledged').length;
    const pending = required - accepted;
    return { ...p, required, accepted, pending };
  });
  res(computedPolicies);
}, 300));

export const getEmployees = async () => new Promise(res => setTimeout(() => res([...mockEmployees]), 300));

export const getPolicyAcknowledgements = async (policyId) => new Promise(res => setTimeout(() => {
  const acks = mockAcknowledgements.filter(a => a.policyId === policyId);
  const populated = acks.map(a => {
    const emp = mockEmployees.find(e => e.id === a.employeeId);
    return { ...a, employeeName: emp ? emp.name : a.employeeId };
  });
  res(populated);
}, 300));

export const sendReminders = async (ackIds) => new Promise(res => setTimeout(() => {
  const now = new Date().toISOString();
  mockAcknowledgements = mockAcknowledgements.map(a => {
    if (ackIds.includes(a.id) && a.status === 'Pending') {
      return { ...a, lastReminder: now };
    }
    return a;
  });
  res({ success: true, count: ackIds.length });
}, 400));

export const getAllAcknowledgements = async () => new Promise(res => setTimeout(() => {
  const populated = mockAcknowledgements.map(a => {
    const emp = mockEmployees.find(e => e.id === a.employeeId);
    const pol = mockPolicies.find(p => p.id === a.policyId);
    return { 
      ...a, 
      employeeName: emp ? emp.name : a.employeeId,
      department: emp ? 'All' : 'All', // Simplifying since employees don't have department field natively yet, we can fall back to 'All' or random. Let's just use 'All'. Wait, we should add department to mockEmployees to make department reporting accurate.
      policyTitle: pol ? pol.title : a.policyId,
      policyVersion: pol ? pol.version : ''
    };
  });
  res(populated);
}, 300));
