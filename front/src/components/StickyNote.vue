<template>
  <div
    class="note font-hand-writing bg-main-100 text-center shadow-lg max-w-sm h-80 px-4"
    :style="`transform: rotate(${tilt}deg)`"
  >
    <h2 class="text-4xl font-bold m-2">
      <slot name="title"></slot>
    </h2>
    <p class="text-2xl m-2">
      <slot></slot>
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'StickyNote',
  props: {
    tilt: {
      type: Number,
      required: true,
    },
  },
});
</script>
