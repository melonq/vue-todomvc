<template>
  <div id="app">
      <section class="todoapp">
			<header class="header">
				<h1>todos</h1>
				<input class="new-todo" placeholder="What needs to be done?" autofocus v-on:keyup.enter="addNewTodo">
			</header>
			<!-- This section should be hidden by default and shown when there are todos -->
			<section class="main" v-if="hasTodos">
				<input class="toggle-all" type="checkbox" v-bind:checked="allCompleted">
				<label for="toggle-all" v-on:click="toggleAllCompletedState">Mark all as complete</label>
				<ul class="todo-list">
					<!-- These are here just to show the structure of the list items -->
					<!-- List items should get the class `editing` when editing and `completed` when marked as completed -->
                    <li v-for="(todo, index) in todos"  v-bind:class="{completed: todo.completed, editing: editingTodo == todo}">
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
			<footer class="footer" v-if="hasTodos">
				<!-- This should be `0 items left` by default -->
				<span class="todo-count"><strong>{{ todos.length }}</strong> {{ 'item' | pluralise(todos.length) }} left</span>
				<!-- Remove this if you don't implement routing -->
				<ul class="filters">
					<li>
						<a class="selected" href="#/">All</a>
					</li>
					<li>
						<a href="#/active">Active</a>
					</li>
					<li>
						<a href="#/completed">Completed</a>
					</li>
				</ul>
				<!-- Hidden if no completed items are left ↓ -->
				<button class="clear-completed" v-show="hasCompletedTodos" v-on:click="clearCompletedTodos">Clear completed</button>
			</footer>
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
export default {
  name: 'app',
  data() {
    return {
      todos: [],
      editingTodo: null
    };
  },
  computed: {
    hasTodos: function() {
      return this.todos.length > 0;
    },
    allCompleted: function() {
      //   _.every(this.todos, 'completed');
      return this.todos.find(todo => !todo.completed) == undefined;
    },
    hasCompletedTodos: function() {
      return this.todos.find(todo => todo.completed);
    }
  },
  methods: {
    addNewTodo: function(e) {
      const newTodo = {
        title: e.target.value.trim(),
        completed: false
      };
      if (newTodo.title) {
        this.todos.push(newTodo);
        e.target.value = '';
      }
    },
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
  filters: {
    pluralise: function(value, count) {
      return count === 1 ? value : `${value}s`;
    }
  },
  directives: {
    autofocus: function(el, binding) {
      binding.value && el.focus();
    }
  }
};
</script>

<style lang="scss">
</style>
