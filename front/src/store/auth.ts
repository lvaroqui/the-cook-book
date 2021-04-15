import { defineStore } from 'pinia';
import { User } from '../generated/graphql-sdk';
import sdk from '../sdk';

export const useAuthStore = defineStore({
  id: 'auth',
  state: () => {
    return {
      user: null as User | null,
      fetching: false,
    };
  },
  getters: {
    authenticated(): boolean {
      return this.user !== null;
    },
  },
  actions: {
    async checkAuthenticated() {
      return new Promise<boolean>((resolve) => {
        // If authenticated, don't fetch API
        if (this.authenticated) {
          resolve(true);
          return;
        }

        // If already fetching, wait for fetchedUser event
        if (this.fetching) {
          window.addEventListener(
            'fetchedUser',
            () => {
              resolve(this.authenticated);
            },
            { once: true }
          );
          return;
        }

        // Fetch user
        this.fetching = true;
        sdk.me().then((data) => {
          this.user = data.me || null;
          resolve(this.authenticated);
          this.fetching = false;
          window.dispatchEvent(new Event('fetchedUser'));
        });
      });
    },
  },
});
