/**
 * Notification Service (Mock Implementation)
 * 
 * TODO: Integrate with real backend API when endpoints are available.
 */

// Initial mock data
let mockNotifications = [
  {
    id: 'notif-1',
    title: 'Company Registration Review',
    description: 'Acme Corporation has submitted registration details and is awaiting approval.',
    timestamp: '10 mins ago',
    read: false,
    type: 'review',
    link: '/super-admin/companies',
    role: 'Super Admin'
  },
  {
    id: 'notif-2',
    title: 'Overdue Compliance Issue',
    description: 'Stark Industries has missed the Q3 Carbon Reporting deadline.',
    timestamp: '2 hours ago',
    read: false,
    type: 'alert',
    link: '/super-admin/companies',
    role: 'Super Admin'
  },
  {
    id: 'notif-3',
    title: 'Policy Acknowledgement',
    description: 'Reminder to acknowledge the new global data privacy policy.',
    timestamp: '1 day ago',
    read: true,
    type: 'reminder',
    link: '/compliance/policies',
    role: 'Compliance Officer'
  },
  {
    id: 'notif-4',
    title: 'New Organization Registered',
    description: 'Globex Corp has successfully registered on the platform.',
    timestamp: '2 days ago',
    read: true,
    type: 'info',
    link: '/super-admin/companies',
    role: 'Super Admin'
  },
  {
    id: 'notif-5',
    title: 'Audit Upcoming',
    description: 'Q4 Operations Audit scheduled for next week.',
    timestamp: '3 days ago',
    read: false,
    type: 'alert',
    link: '/compliance/audits',
    role: 'Compliance Officer'
  }
];

export const fetchNotifications = async (role) => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 400));
  return mockNotifications.filter(n => !role || n.role === role);
};

export const markAsRead = async (notificationId) => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 300));
  mockNotifications = mockNotifications.map(n => 
    n.id === notificationId ? { ...n, read: true } : n
  );
  return { success: true };
};

export const markAllAsRead = async (role) => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  mockNotifications = mockNotifications.map(n => {
    if (!role || n.role === role) {
      return { ...n, read: true };
    }
    return n;
  });
  return { success: true };
};

export const createNotification = async (notifData) => {
  await new Promise(resolve => setTimeout(resolve, 300));
  const newNotif = {
    ...notifData,
    role: notifData.role || 'Compliance Officer', // Defaulting to Compliance Officer for dynamically created ones by CO
    id: `notif-${Date.now()}`,
    timestamp: 'Just now',
    read: false
  };
  mockNotifications = [newNotif, ...mockNotifications];
  return { ...newNotif };
};
