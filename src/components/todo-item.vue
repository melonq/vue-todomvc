<template>
<div>
    <div class="view">
        <input class="toggle" type="checkbox" v-model="todo.completed">
        <label v-on:dblclick="$emit('start-editing', todo)">{{ todo.title }}</label>
        <button class="destroy" v-on:click="$emit('remove-todo', todo)"></button>
    </div>
    <input class="edit" v-model.trim="todo.title" v-on:blur="$emit('submit-editing', todo)" v-on:keyup.enter="$emit('submit-editing', todo)" v-on:keyup.esc="$emit('cancel-editing', todo)" v-autofocus="shouldAutoFocus">
</div>
</template>

<script>
export default {
  name: 'todo-item',
  props: {
    todo: Object,
    shouldAutoFocus: Boolean
  },
  directives: {
    autofocus: function(el, binding) {
      binding.value && el.focus();
    }
  }
};
</script>
