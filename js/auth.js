/**
 * DemoTemplate Auth Module
 * Handles user registration, login, and session management
 */

const Auth = {
  /**
   * Register new user
   */
  async signup(displayName, username, email, password) {
    if (!displayName || displayName.length < 2) {
      throw new Error('Display name must be at least 2 characters');
    }
    if (!username || username.length < 3) {
      throw new Error('Username must be at least 3 characters');
    }
    if (!/^[a-zA-Z0-9_]+$/.test(username)) {
      throw new Error('Username can only contain letters, numbers, and underscores');
    }
    if (!password || password.length < 6) {
      throw new Error('Password must be at least 6 characters');
    }
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      throw new Error('Please enter a valid email address');
    }

    if (Storage.getUserByUsername(username)) {
      throw new Error('Username already taken');
    }

    const passwordHash = await PasswordUtils.hash(password);
    const user = Storage.createUser({ displayName, username, email, passwordHash });
    Storage.setCurrentUser(user.username);
    return user;
  },

  /**
   * Login user
   */
  async login(username, password) {
    if (!username || !password) {
      throw new Error('Please enter username and password');
    }

    const user = Storage.getUserByUsername(username);
    
    if (!user) {
      throw new Error('User not found');
    }

    let valid = false;
    if (user.passwordHash) {
      valid = await PasswordUtils.verify(password, user.passwordHash);
    } else if (user.password) {
      valid = (user.password === password);
      if (valid) {
        const hash = await PasswordUtils.hash(password);
        Storage.updateUser(user.username, { passwordHash: hash, password: null });
      }
    }
    if (!valid) throw new Error('Incorrect password');
    Storage.setCurrentUser(user.username);
    return Storage.getUserByUsername(user.username);
  },

  async loginDemo() {
    const demo = APP_CONFIG.defaultDemo;
    try {
      return await this.login(demo.username, demo.password);
    } catch (e) {
      if (e.message === 'User not found') {
        const passwordHash = await PasswordUtils.hash(demo.password);
        const user = Storage.createUser({ displayName: demo.displayName, username: demo.username, email: demo.email, passwordHash, isAdmin: demo.isAdmin });
        Storage.setCurrentUser(user.username);
        return user;
      }
      throw e;
    }
  },

  /**
   * Logout current user
   */
  logout() {
    Storage.clearCurrentUser();
  },

  /**
   * Check if user is logged in
   */
  isLoggedIn() {
    return Storage.getCurrentUser() !== null;
  },

  /**
   * Get current user
   */
  getCurrentUser() {
    return Storage.getCurrentUser();
  },

  /**
   * Check if current user is admin
   */
  isAdmin() {
    const user = this.getCurrentUser();
    return user?.isAdmin === true;
  },

  /**
   * Update user profile
   */
  updateProfile(updates) {
    const user = this.getCurrentUser();
    if (!user) {
      throw new Error('Not logged in');
    }
    return Storage.updateUser(user.username, updates);
  },

  /**
   * Update user settings
   */
  updateSettings(settings) {
    const user = this.getCurrentUser();
    if (!user) {
      throw new Error('Not logged in');
    }
    
    const updatedSettings = { ...user.settings, ...settings };
    return Storage.updateUser(user.username, { settings: updatedSettings });
  }
};
