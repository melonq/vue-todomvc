<template>
<div id="app">
    <section class="todoapp">
        <todo-header v-on:add-new-todo="newTodo => todos.push(newTodo)"></todo-header>
        <!-- This section should be hidden by default and shown when there are todos -->
        <section class="main" v-if="hasTodos">
            <input class="toggle-all" type="checkbox" v-bind:checked="allCompleted">
            <label for="toggle-all" v-on:click="toggleAllCompletedState">Mark all as complete</label>
            <ul class="todo-list">
                <!-- These are here just to show the structure of the list items -->
                <!-- List items should get the class `editing` when editing and `completed` when marked as completed -->
                <li v-for="(todo, index) in visableTodos" v-bind:class="{completed: todo.completed, editing: editingTodo == todo}">
                    <todo-item :todo="todo" :shouldAutoFocus="todo === editingTodo" @start-editing="startEditing" @remove-todo="removeTodo" @submit-editing="submitEditing" @cancel-editing="cancelEditing">
                    </todo-item>
                </li>
            </ul>
        </section>
        <!-- This footer should hidden by default and shown when there are todos -->
        <todo-footer :currentFilter="currentFilter" :todosLength="todos.length" :completedTodos="completedTodos" @clear-completed-todos="clearCompletedTodos">
        </todo-footer>
    </section>
    <footer class="info">
        <p>Double-click to edit a todo</p>
        <!-- Remove the below line ↓ -->
        <p>Template by <a href="http://sindresorhus.com">Sindre Sorhus</a></p>
        <!-- Change this out with your name and url ↓ -->
        <p>Created by <a href="http://todomvc.com">you</a></p>
        <p>Part of <a href="http://todomvc.com">TodoMVC</a></p>
    </footer>
</div>
</template>

<script>
import TodoHeader from './components/todo-header.vue';
import TodoFooter from './components/todo-footer.vue';
import TodoItem from './components/todo-item.vue';

const LocalStorageKeyName = 'todos-vuejs';
export default {
  name: 'app',
  data() {
    return {
      todos: [],
      editingTodo: null,
      currentFilter: this.$route.params.status
    };
  },
  beforeMount: function() {
    const storedTodos = JSON.parse(localStorage.getItem(LocalStorageKeyName));
    if (storedTodos) {
      this.todos = storedTodos;
    }
  },
  computed: {
    hasTodos: function() {
      return this.todos.length > 0;
    },
    allCompleted: function() {
      return this.todos.every(todo => todo.completed);
    },
    completedTodos: function() {
      return this.todos.filter(todo => todo.completed);
    },
    visableTodos: function() {
      switch (this.currentFilter) {
        case 'active':
          return this.todos.filter(todo => !todo.completed);
        case 'completed':
          return this.todos.filter(todo => todo.completed);
        default:
          return this.todos;
      }
    }
  },
  methods: {
    removeTodo: function(todo) {
      this.todos = this.todos.filter(t => t != todo);
    },
    toggleAllCompletedState: function() {
      const newState = !this.allCompleted;
      this.todos.forEach(todo => (todo.completed = newState));
    },
    clearCompletedTodos: function() {
      this.todos = this.todos.filter(todo => !todo.completed);
    },
    startEditing: function(todo) {
      this.editingTodo = todo;
      this.remainingTitle = todo.title;
    },
    exitEditing: function(e) {
      this.editingTodo = null;
    },
    cancelEditing: function(todo) {
      todo.title = this.remainingTitle;

      this.exitEditing();
    },
    submitEditing: function(todo) {
      if (todo.title === '') {
        this.removeTodo(todo);
      }

      this.exitEditing();
    }
  },
  watch: {
    todos: {
      deep: true,
      handler: function() {
        localStorage.setItem(LocalStorageKeyName, JSON.stringify(this.todos));
      }
    },
    $route: function() {
      this.currentFilter = this.$route.params.status;
    }
  },
  // https://vuejs.org/v2/guide/components.html#Component-Naming-Conventions
  components: {
    TodoHeader,
    TodoFooter,
    TodoItem
  }
};
</script>

<style lang="less" scoped>
html {
    body {
        background-color: white;
    }
}
</style>
