import { defineStore } from 'pinia';
import { LoginMutation, User } from '../generated/graphql-sdk';
import sdk from '../sdk';

export const useAuthStore = defineStore({
  id: 'auth',
  state: () => {
    return {
      user: null as User | null,
      fetching: false,
    };
  },
  actions: {
    async logout() {
      return new Promise<void>((resolve) => {
        sdk.logout().then(() => {
          this.user = null;
          resolve();
        });
      });
    },
    async login(email: string, password: string) {
      return new Promise<LoginMutation>((resolve) => {
        sdk.login({ email, password }).then((data) => {
          if (data.login.__typename === 'User') {
            this.user = data.login;
          }
          resolve(data);
        });
      });
    },
    async register(email: string, username: string, password: string) {
      return sdk.register({ email, username, password });
    },
    async checkAuthenticated() {
      return new Promise<boolean>((resolve) => {
        // If authenticated, don't fetch API
        if (this.user !== null) {
          resolve(true);
          return;
        }

        // If already fetching, wait for fetchedUser event
        if (this.fetching) {
          window.addEventListener(
            'fetchedUser',
            () => {
              resolve(this.user !== null);
            },
            { once: true }
          );
          return;
        }

        // Fetch user
        this.fetching = true;
        sdk.me().then((data) => {
          this.user = data.me || null;
          resolve(this.user !== null);
          this.fetching = false;
          window.dispatchEvent(new Event('fetchedUser'));
        });
      });
    },
  },
});
