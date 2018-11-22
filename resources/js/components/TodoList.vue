<template>
  <div>
    <div class="title m-b-md">
      Vue Todo
    </div>

    <div class="form-group">
      <input type="text" name="" class="form-control" placeholder="What needs to be done" v-model="newTodo" @keyup.enter="addTodo">
    </div>

    <ul class="list-group">
      <transition-group enter-active-class="animated fadeInUp" leave-active-class="animated fadeOutDown">
        <todo-item class="list-group-item text-left"
          v-for="(todo, index) in todosFiltered"
          :key="todo.id"
          :todo="todo" :index="index"
          :checkAll="!anyRemaining">
        </todo-item>
      </transition-group>


    </ul>

    <div class="form-group form-check text-left">
      <!-- <div class="form-group form-check"> -->
        <todo-check-all :anyRemaining="anyRemaining"></todo-check-all>
        <todo-item-remaining :remaining="remaining"></todo-item-remaining>
      <!-- </div> -->
    </div>

    <todo-filter></todo-filter>

    <todo-clear :showClearCompletedButton="showClearCompletedButton"></todo-clear>
  </div>
</template>

<script>
  import TodoItem from './TodoItem'
    export default {
      data() {
        return {
          newTodo: '',
          idForTodo: 3,
          beforeEditCache: '',
          filter: 'all',
          todos: [
            {
              'id': 1,
              'title': 'Finish Vue',
              'completed': false,
              'editing': false
            },
            {
              'id': 2,
              'title': 'Finish Vue Second',
              'completed': false,
              'editing': false
            }
          ]
        }
      },
      created() {
        eventBus.$on('removedTodo', (index) => this.removeTodo(index))
        eventBus.$on('finishedEdit', (data) => this.finishedEdit(data))
        eventBus.$on('checkAllChanged', (checked) => this.checkAllTodos(checked))
        eventBus.$on('filterChanged', (filter) => this.filter = filter)
        eventBus.$on('clearCompletedTodos', () => this.clearCompleted())
      },
      beforeDestroy() {
        eventBus.$off('removedTodo', (index) => this.removeTodo(index))
        eventBus.$off('finishedEdit', (data) => this.finishedEdit(data))
        eventBus.$off('checkAllChanged', (checked) => this.checkAllTodos(checked))
        eventBus.$off('filterChanged', (filter) => this.filter = filter)
        eventBus.$off('clearCompletedTodos', () => this.clearCompleted())
      },
      computed: {
        remaining() {
          return this.todos.filter(todo => !todo.completed).length
        },
        anyRemaining() {
          return this.remaining != 0
        },
        todosFiltered() {
          if (this.filter == 'all') {
            return this.todos
          } else if (this.filter == 'active') {
            return this.todos.filter(todo => !todo.completed)
          } else if (this.filter == 'completed') {
            return this.todos.filter(todo => todo.completed)
          }

          return this.todos
        },
        showClearCompletedButton() {
          return this.todos.filter(todo => todo.completed).length > 0
        }
      },
      methods: {
        addTodo() {
          if (this.newTodo.trim().length == 0) {
            return
          }

          this.todos.push({
            id: this.idForTodo,
            title: this.newTodo,
            completed: false
          })

          this.newTodo = ''
          this.idForTodo++
        },
        removeTodo(index) {
          this.todos.splice(index, 1)
        },
        checkAllTodos() {
          this.todos.forEach((todo) => todo.completed = event.target.checked)
        },
        clearCompleted() {
          this.todos = this.todos.filter(todo => !todo.completed)
        },
        finishedEdit(data) {
          this.todos.splice(data.index, 1, data.todo)
        }
      },
      mounted() {
          console.log('Component mounted.')
      }
    }
</script>

<style lang="scss">
  @import url("https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.0/animate.min.css");

  .completed {
    text-decoration: line-through;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .2s;
  }

  .fade-enter, .fade-leave-to {
    opacity: 0;
  }

  .list-group-item {
    animation-duration: 0.3s;
  }
</style>
