<template>
  <div class="flex flex-col flex-1 content-center">
    <div class="image shadow-inner">
      <div class="container flex flex-col justify-end mx-auto">
        <h1
          class="text-3xl md:text-4xl text-shadow text-secondary-50 font-bold ml-3 mt-5"
        >
          The Cook Book
        </h1>
        <h2
          class="text-3xl md:text-4xl text-shadow text-secondary-50 font-hand-writing ml-3 my-2"
        >
          Plan your meals, hassle-free!
        </h2>
        <div class="flex justify-center content-center mt-2 mb-8">
          <div class="h-10 flex shadow">
            <input
              v-model="email"
              type="email"
              class="px-2 ml-2 hidden md:block border-2 border-secondary-300 rounded rounded-r-none"
              placeholder="email@example.com"
              @keyup.enter="goToRegister"
            />
            <button
              class="bg-secondary-300 font-bold border-2 border-secondary-300 px-6 rounded md:rounded-l-none"
              tag="div"
              @click="goToRegister"
            >
              Get started
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="flex flex-wrap justify-evenly container mx-auto my-10">
      <StickyNote class="m-10" :tilt="3">
        <template #title>Plan your meals</template>
        The integrated calendar let you plan your meals for the week and removes
        the daily challenge of knowing what to cook.
      </StickyNote>
      <StickyNote class="m-10" :tilt="-2">
        <template #title>Add your own recipes</template>
        Give us your recipes, we handle the rest. With tagging and "last time
        cooked" metrics, we can suggest you the best recipe for the day.
      </StickyNote>
      <StickyNote class="m-10" :tilt="2">
        <template #title>Share with your household</template>
        Share your meal calendar with your household, generate a shopping list
        for what's missing and distribute the work with your roomies.
      </StickyNote>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { RouteLocationRaw } from 'vue-router';
import StickyNote from '../components/StickyNote.vue';
import router from '../router';

export default defineComponent({
  name: 'Home',
  components: {
    StickyNote,
  },
  setup() {
    const email = ref('');

    const goToRegister = () => {
      const route: RouteLocationRaw = {
        name: 'register',
        query: {},
      };
      if (email.value != '' && route.query) {
        route.query.email = email.value;
      }
      router.push(route);
    };
    return {
      email,
      goToRegister,
    };
  },
});
</script>

<style scoped>
.image {
  background: url('https://images.unsplash.com/photo-1482049016688-2d3e1b311543?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&dl=joseph-gonzalez-fdlZBWIP0aM-unsplash.jpg&w=2400')
    no-repeat center;
  background-size: cover;
}
</style>
