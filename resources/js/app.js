
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');

window.eventBus = new Vue();

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

 Vue.component('example-component', require('./components/ExampleComponent.vue'));
 Vue.component('todo-list', require('./components/TodoList.vue'));
 Vue.component('todo-item', require('./components/TodoItem.vue'));
 Vue.component('todo-item-remaining', require('./components/TodoItemsRemaining.vue'));
 Vue.component('todo-check-all', require('./components/TodoCheckAll.vue'));
 Vue.component('todo-filter', require('./components/TodoFilter.vue'));
 Vue.component('todo-clear', require('./components/TodoClear.vue'));

const app = new Vue({
    el: '#app'
});
