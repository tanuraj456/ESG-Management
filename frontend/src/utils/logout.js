
export const logoutUser = () => {
    const authKeys = [
      "token",
      "authToken",
      "accessToken",
      "refreshToken",
      "user",
      "userInfo",
      "auth",
      "currentUser",
      "userRole",
      "loggedInUser",
      "isAuthenticated",
    ];
  
    // Remove authentication-related data
    authKeys.forEach((key) => {
      localStorage.removeItem(key);
    });
  
    // Clear session data
    sessionStorage.clear();
  
    // Redirect to login page
    window.location.replace("/login");
  };
  
  export default logoutUser;
  