/**
 * User Service (Mock Implementation)
 * 
 * TODO: Integrate with real backend API when endpoints are available.
 * 
 * Replace these mock implementations with actual fetch/axios requests, e.g.:
 * return axios.put(`/api/users/${userId}/role`, { role: newRole });
 */

export const mockCurrentUser = {
  id: 'EMP-012',
  name: 'Emily Chen',
  role: 'Compliance Officer',
  email: 'emily@ecosphere.app',
  orgs: ['Operations'],
  emailNotifications: true
};

export const updateRole = async (userId, newRole) => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Example of how backend might reject an unauthorized action
  // if (userId === 'EMP-001' && newRole !== 'Super Admin') {
  //   throw new Error("Cannot demote primary Super Admin");
  // }
  
  return { success: true, userId, newRole };
};

export const updateUserStatus = async (userId, newStatus) => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  return { success: true, userId, newStatus };
};

export const updateProfile = async (userId, profileData) => {
  await new Promise(resolve => setTimeout(resolve, 800));
  return { success: true, userId, ...profileData };
};

export const updatePassword = async (userId, passwordData) => {
  await new Promise(resolve => setTimeout(resolve, 800));
  // Simulate simple rejection for wrong old password
  if (passwordData.currentPassword === 'wrong') {
    throw new Error('Incorrect current password.');
  }
  return { success: true, userId };
};

export const updatePreferences = async (userId, preferences) => {
  await new Promise(resolve => setTimeout(resolve, 600));
  return { success: true, userId, ...preferences };
};
