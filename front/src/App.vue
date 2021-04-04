<template>
  <div class="min-h-screen flex flex-col">
    <nav class="flex bg-main-400 shadow">
      <div class="container mx-auto flex">
        <router-link class="mx-2 py-2" to="/">The Cook Book</router-link>
        <div class="flex-grow"></div>
        <router-link
          tag="div"
          class="px-6 py-2 h-full transition duration-300 hover:bg-main-300"
          to="login"
        >
          Login
        </router-link>
      </div>
    </nav>
    <div class="flex flex-1">
      <router-view />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import sdk from './sdk';
import { useAuthStore } from './store/auth';

export default defineComponent({
  name: 'App',
  setup() {
    // Check if user is connected
    sdk.me().then((data) => {
      if (data.me) {
        useAuthStore().user = data.me;
      }
    });
  },
});
</script>
