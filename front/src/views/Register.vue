<template>
  <div>
    <p>Register {{ $route.query.email }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Register',
});
</script>

<style></style>
