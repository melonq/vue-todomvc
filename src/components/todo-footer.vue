<template>
<!-- This footer should hidden by default and shown when there are todos -->
<footer class="footer" v-if="todosLength > 0">
    <!-- This should be `0 items left` by default -->
    <span class="todo-count"><strong>{{ todosLength }}</strong> {{ 'item' | pluralise(todosLength) }} left</span>
    <!-- Remove this if you don't implement routing -->
    <ul class="filters">
        <li>
            <router-link v-bind:class="{selected: currentFilter == undefined}" to="/">All</router-link>
        </li>
        <li>
            <router-link v-bind:class="{selected: currentFilter == 'active'}" to="/active">Active</router-link>
        </li>
        <li>
            <router-link v-bind:class="{selected: currentFilter == 'completed'}" to="/completed">Completed</router-link>
        </li>
    </ul>
    <!-- Hidden if no completed items are left ↓ -->
    <button class="clear-completed" v-show="completedTodos.length > 0" v-on:click="$emit('clear-completed-todos')">Clear completed</button>
</footer>
</template>

<script>
export default {
  name: 'todo-footer',
  props: {
    currentFilter: String,
    todosLength: Number,
    completedTodos: Array
  },
  filters: {
    pluralise: function(value, count) {
      return count === 1 ? value : `${value}s`;
    }
  }
};
</script>
