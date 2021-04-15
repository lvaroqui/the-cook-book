<template>
  <div class="flex w-screen justify-center items-center md:items-start">
    <div class="flex flex-col md:mt-28 w-full max-w-sm" @keyup.enter="login">
      <h1 class="text-5xl font-bold mb-5 text-center">Login</h1>
      <VTextBox
        v-model="email"
        focus
        placeholder="Email"
        type="email"
        big
        rounded
      />
      <VTextBox
        v-model="password"
        placeholder="Password"
        type="password"
        big
        rounded
      />
      <VButton big rounded @click="login">Login</VButton>
      <router-link tag="p" class="text-link" to="register">
        No account yet?
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue';
import sdk from '../sdk';
import { useAuthStore } from '../store/auth';
import router from '../router';

export default defineComponent({
  name: 'Login',
  setup() {
    const authStore = useAuthStore();

    authStore.checkAuthenticated().then((authenticated) => {
      if (authenticated) {
        router.push('dashboard');
      }
    });

    const email = ref('');
    const password = ref('');

    const login = () => {
      sdk
        .login({
          email: email.value,
          password: password.value,
        })
        .then((data) => {
          if (data.login) {
            authStore.user = data.login;
            router.push('dashboard');
          }
        });
    };

    return {
      email,
      password,
      login,
    };
  },
});
</script>

<style></style>
