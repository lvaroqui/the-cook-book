<template>
  <nav class="flex bg-main-400 shadow">
    <div class="container mx-auto flex">
      <router-link class="mx-2 py-2" to="/">The Cook Book</router-link>
      <div class="flex-grow"></div>
      <template v-if="!user">
        <router-link
          tag="div"
          class="px-6 py-2 h-full transition duration-300 hover:bg-main-300"
          to="login"
        >
          Login
        </router-link>
      </template>
      <template v-else>
        <router-link
          tag="div"
          class="px-6 py-2 h-full transition duration-300 hover:bg-main-300"
          to="dashboard"
        >
          Welcome {{ user.username }}
        </router-link>
        <div
          class="
            px-6
            py-2
            h-full
            transition
            duration-300
            hover:bg-main-300
            cursor-pointer
          "
          @click="logout"
        >
          Logout
        </div>
      </template>
    </div>
  </nav>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useAuthStore } from '../store/auth';
import router from '../router';

export default defineComponent({
  setup() {
    const authStore = useAuthStore();

    const logout = () => {
      authStore.logout().then(() => {
        router.push('/');
      });
    };

    return {
      logout,
      user: computed(() => {
        return authStore.user;
      }),
    };
  },
});
</script>
