<template>
  <button
    class="mt-4 my-2 shadow-md bg-secondary-400 active:bg-secondary-300"
    :class="buttonClass"
    @click="$emit('click')"
  >
    <slot />
  </button>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
export default defineComponent({
  name: 'VButton',
  props: {
    big: {
      type: Boolean,
      default: false,
      required: false,
    },
    rounded: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
  emits: ['click'],
  setup(props) {
    const buttonClass = computed(() => {
      let rounded = 'rounded-lg';
      let sizing = 'py-1 font-xl px-3';

      if (props.big) {
        sizing = 'py-2 px-4 font-bold text-3xl';
        rounded = 'rounded-xl';
      }

      if (props.rounded) {
        rounded = 'rounded-full';
      }
      return [sizing, rounded];
    });

    return { buttonClass };
  },
});
</script>
