<template>
  <div class="flex flex-col" :class="wrapperClass">
    <label :class="labelClass" class="ml-2"><slot /></label>
    <input
      class="w-full shadow-md transition-colors duration-300 border-gray-300 focus:border-gray-400"
      :class="inputClass"
      v-bind="$attrs"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
export default defineComponent({
  name: 'VTextBox',
  props: {
    modelValue: {
      type: String,
      default: '',
    },
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
  emits: ['update:modelValue'],
  setup(props) {
    const inputClass = computed(() => {
      let rounded = props.rounded ? 'rounded-full' : 'rounded-lg';
      let sizing = 'py-1 px-3 border-2';
      if (props.big) {
        sizing = 'py-2 px-4 text-2xl border-4';
        if (!props.rounded) {
          rounded = 'rounded-xl';
        }
      }
      return [sizing, rounded];
    });

    const labelClass = computed(() => {
      let sizing = !props.big ? 'text-sm mb-0.5' : 'mb-1';
      return [sizing];
    });

    const wrapperClass = computed(() => {
      let sizing = !props.big ? 'my-1' : 'my-2';
      return [sizing];
    });

    return { inputClass, labelClass, wrapperClass };
  },
});
</script>
