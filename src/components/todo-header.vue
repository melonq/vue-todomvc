<template>
    <header class="header">
        <h1>todos</h1>
        <input class="new-todo" placeholder="What needs to be done?" autofocus v-on:keyup.enter="addNewTodo">
    </header>
</template>

<script>
export default {
  name: 'todo-header',
  methods: {
    addNewTodo: function(e) {
      const newTodo = {
        title: e.target.value.trim(),
        completed: false
      };
      if (newTodo.title) {
        this.$emit('add-new-todo', newTodo);
        e.target.value = '';
      }
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
