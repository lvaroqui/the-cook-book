<template>
  <div class="min-h-screen flex flex-col">
    <TheNavBar />
    <RouterView class="flex flex-1"> </RouterView>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useAuthStore } from './store/auth';
import TheNavBar from './components/TheNavBar.vue';

export default defineComponent({
  name: 'App',
  components: {
    TheNavBar,
  },
  setup() {
    useAuthStore().checkAuthenticated().then();
    return {};
  },
});
</script>
