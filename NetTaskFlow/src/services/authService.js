export class AuthService {
    constructor() {
        this.user = null;
        this.onAuthChangeCallbacks = [];
    }

    init(onAuthChange) {
        if (onAuthChange) {
            this.onAuthChangeCallbacks.push(onAuthChange);
        }

        // Initialize Netlify Identity
        if (typeof netlifyIdentity !== 'undefined') {
            netlifyIdentity.init();

            // Listen for auth events
            netlifyIdentity.on('init', user => {
                this.user = user;
                this.notifyAuthChange(user);
            });

            netlifyIdentity.on('login', user => {
                this.user = user;
                this.notifyAuthChange(user);
            });

            netlifyIdentity.on('logout', () => {
                this.user = null;
                this.notifyAuthChange(null);
            });

            // Check if user is already logged in
            this.user = netlifyIdentity.currentUser();
            this.notifyAuthChange(this.user);
        } else {
            // Fallback to simple session-based auth for development
            console.warn('Netlify Identity not available, using fallback auth');
            this.initFallbackAuth();
        }
    }

    initFallbackAuth() {
        // Simple fallback auth using sessionStorage for development
        const storedUser = sessionStorage.getItem('taskmaster_user');
        if (storedUser) {
            try {
                this.user = JSON.parse(storedUser);
                this.notifyAuthChange(this.user);
            } catch (error) {
                console.error('Error parsing stored user:', error);
                sessionStorage.removeItem('taskmaster_user');
            }
        } else {
            // Auto-login with demo user for development
            this.user = {
                id: 'demo-user',
                email: 'demo@taskmaster.com',
                user_metadata: {
                    full_name: 'Demo User'
                }
            };
            sessionStorage.setItem('taskmaster_user', JSON.stringify(this.user));
            this.notifyAuthChange(this.user);
        }
    }

    login() {
        if (typeof netlifyIdentity !== 'undefined') {
            netlifyIdentity.open();
        } else {
            // Fallback login
            const email = prompt('Enter your email:');
            if (email) {
                this.user = {
                    id: 'user-' + Date.now(),
                    email: email,
                    user_metadata: {
                        full_name: email.split('@')[0]
                    }
                };
                sessionStorage.setItem('taskmaster_user', JSON.stringify(this.user));
                this.notifyAuthChange(this.user);
            }
        }
    }

    signup() {
        if (typeof netlifyIdentity !== 'undefined') {
            netlifyIdentity.open('signup');
        } else {
            // Fallback signup (same as login for demo)
            this.login();
        }
    }

    logout() {
        if (typeof netlifyIdentity !== 'undefined') {
            netlifyIdentity.logout();
        } else {
            // Fallback logout
            sessionStorage.removeItem('taskmaster_user');
            this.user = null;
            this.notifyAuthChange(null);
        }
    }

    getCurrentUser() {
        return this.user;
    }

    isAuthenticated() {
        return this.user !== null;
    }

    getAuthToken() {
        if (this.user && typeof netlifyIdentity !== 'undefined') {
            return netlifyIdentity.currentUser()?.token?.access_token;
        }
        return null;
    }

    getUserId() {
        return this.user?.id || null;
    }

    getUserEmail() {
        return this.user?.email || null;
    }

    getUserName() {
        return this.user?.user_metadata?.full_name || 
               this.user?.email?.split('@')[0] || 
               'User';
    }

    onAuthChange(callback) {
        this.onAuthChangeCallbacks.push(callback);
    }

    notifyAuthChange(user) {
        this.onAuthChangeCallbacks.forEach(callback => {
            try {
                callback(user);
            } catch (error) {
                console.error('Error in auth change callback:', error);
            }
        });
    }

    // Update user profile
    async updateProfile(profileData) {
        try {
            if (typeof netlifyIdentity !== 'undefined' && this.user) {
                // Update using Netlify Identity
                const updatedUser = await netlifyIdentity.gotrue.currentUser().update({
                    data: { ...this.user.user_metadata, ...profileData }
                });
                this.user = updatedUser;
                this.notifyAuthChange(this.user);
                return this.user;
            } else {
                // Fallback update
                if (this.user) {
                    this.user.user_metadata = { ...this.user.user_metadata, ...profileData };
                    sessionStorage.setItem('taskmaster_user', JSON.stringify(this.user));
                    this.notifyAuthChange(this.user);
                }
                return this.user;
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            throw new Error('Failed to update profile');
        }
    }

    // Change password
    async changePassword(newPassword) {
        try {
            if (typeof netlifyIdentity !== 'undefined' && this.user) {
                await netlifyIdentity.gotrue.currentUser().update({
                    password: newPassword
                });
                return true;
            } else {
                // Fallback - just return success for demo
                console.log('Password change requested (demo mode)');
                return true;
            }
        } catch (error) {
            console.error('Error changing password:', error);
            throw new Error('Failed to change password');
        }
    }

    // Request password reset
    async requestPasswordReset(email) {
        try {
            if (typeof netlifyIdentity !== 'undefined') {
                await netlifyIdentity.gotrue.requestPasswordRecovery(email);
                return true;
            } else {
                // Fallback - just return success for demo
                console.log('Password reset requested for:', email);
                return true;
            }
        } catch (error) {
            console.error('Error requesting password reset:', error);
            throw new Error('Failed to request password reset');
        }
    }
}
