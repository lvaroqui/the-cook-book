import { createApp, DirectiveBinding } from 'vue';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';
import './css/index.css';
import VTextBox from './components/VTextBox.vue';
import VButton from './components/VButton.vue';

const app = createApp(App);

app.use(router);
app.use(createPinia());

app.component('VTextBox', VTextBox);
app.component('VButton', VButton);

app.directive('focus', {
  mounted(el, { value }: DirectiveBinding<boolean>) {
    if (value === undefined || value === true) {
      el.focus();
    }
  },
});

app.mount('#app');
