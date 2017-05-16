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
                    <li v-for="(todo, index) in visableTodos"  v-bind:class="{completed: todo.completed, editing: editingTodo == todo}">
						<div class="view">
							<input class="toggle" type="checkbox" v-model="todo.completed">
							<label v-on:dblclick="startEditing(todo)">{{ todo.title }}</label>
							<button class="destroy" v-on:click="removeTodo(todo)"></button>
						</div>
						<input class="edit" v-model.trim="todo.title"
                            v-on:blur="submitEditing(todo)"
                            v-on:keyup.enter="submitEditing(todo)"
                            v-on:keyup.esc="cancelEditing(todo)"
                            v-autofocus="todo === editingTodo"
                        >
					</li>
				</ul>
			</section>
			<!-- This footer should hidden by default and shown when there are todos -->
			<todo-footer :currentFilter="currentFilter"
                         :todosLength="todos.length"
                         :completedTodos="completedTodos"
                         @clear-completed-todos="clearCompletedTodos">
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
import TodoHeader from './todo-header.vue';
import TodoFooter from './todo-footer.vue';

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
      this.todos.forEach(todo => todo.completed = newState);
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
  directives: {
    autofocus: function(el, binding) {
      binding.value && el.focus();
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
    TodoFooter
  }
};
</script>

<style lang="scss">
</style>
