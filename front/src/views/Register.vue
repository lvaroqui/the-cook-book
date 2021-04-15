<template>
  <div class="flex w-screen justify-center items-center md:items-start">
    <div
      class="flex flex-col md:mt-28 w-full max-w-sm"
      @keyup.enter="email = '12'"
    >
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
      <button
        class="py-2 mt-4 my-2 text-3xl font-bold bg-secondary-400 active:bg-secondary-300 shadow-md rounded-full"
      >
        Sign up
      </button>
      <p>{{ email }} {{ username }} {{ password }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue';
import { useRoute } from 'vue-router';
import VTextBox from '../components/VTextBox.vue';

export default defineComponent({
  name: 'Register',
  components: {
    VTextBox,
  },
  setup() {
    const email = ref(useRoute().query.email);
    const username = ref('');
    const password = ref('');

    return {
      email,
      username,
      password,
    };
  },
});
</script>

<style></style>
