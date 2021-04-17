<template>
  <div class="min-h-screen flex flex-col">
    <TheNavBar />
    <RouterView v-slot="{ Component }">
      <suspense>
        <div class="flex flex-1">
          <component :is="Component" />
        </div>
      </suspense>
    </RouterView>
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
