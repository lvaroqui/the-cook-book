<template>
  <div class="flex w-screen justify-center items-center md:items-start">
    <div class="flex flex-col md:mt-28 w-full max-w-sm" @keyup.enter="register">
      <h1 class="text-5xl font-bold mb-5 text-center">Sign up</h1>
      <VTextBox
        v-model="email"
        focus
        placeholder="Email"
        type="email"
        big
        rounded
      />
      <VTextBox
        v-model="username"
        placeholder="Username"
        type="text"
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
      <VButton big rounded @click="register">Sign up</VButton>
      <router-link tag="p" class="text-link" to="login">
        Already have an account?
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue';
import { useRoute } from 'vue-router';
import router from '../router';
import { useAuthStore } from '../store/auth';

export default defineComponent({
  name: 'Register',
  setup() {
    const authStore = useAuthStore();

    authStore.checkAuthenticated().then((authenticated) => {
      if (authenticated) {
        router.push('dashboard');
      }
    });

    const email = ref('');
    const username = ref('');
    const password = ref('');

    if (typeof useRoute().query.email === 'string') {
      email.value = useRoute().query.email as string;
    }

    const register = () => {
      authStore
        .register(email.value, username.value, password.value)
        .then((data) => {
          switch (data.register.__typename) {
            case 'User':
              router.push('login');
              break;
            case 'UserRegisterBadUserInputError':
              console.log(data.register);
              break;
          }
        });
    };

    return {
      email,
      username,
      password,
      register,
    };
  },
});
</script>

<style></style>
