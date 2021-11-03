/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */
 import VueRouter from 'vue-router';
 import Vue from 'vue';
require('./bootstrap');

window.Vue = require('vue');

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/ja'

Vue.use(ElementUI, { locale })
/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

// const files = require.context('./', true, /\.vue$/i)
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))

Vue.component('app-component', require('./components/AppComponent.vue').default);
/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

  Vue.use(VueRouter);
  const router = new VueRouter({
      routes: [
          {
            path: '/song',
            name: 'song',
            component: () => import('./components/song/Song.vue'),
          },
          {
            path: '/search',
            name: 'search',
            component: () => import('./components/search/Search.vue'),
          },
          {
            path: '/artist',
            name: 'artist',
            component: () => import('./components/artist/Artist.vue'),
          },
      ]
  });
const app = new Vue({
    el: '#app',
    router
});
