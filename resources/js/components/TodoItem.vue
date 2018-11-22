<template>
  <div>
    <input type="checkbox" v-model="completed"
      @change="doneEdit">
    <span v-if="!editing" @dblclick="editTodo(todo)" :class="{ completed : completed }">{{ title }}</span>
    <input v-else type="text" v-model="title" class="form-control" @blur="doneEdit(todo)" @keyup.enter="doneEdit(todo)" @keyup.esc="cancelEdit(todo)" v-focus>
    <button @click="pluralize" class="btn btn-sm btn-primary">Plural</button>
    <button class="close" @click="removeTodo(index)"><span>&times;</span></button>
  </div>
</template>

<script>
    export default {
      props: {
        todo: {
          type: Object,
          required: true
        },
        index: {
          type: Number,
          required: true
        },
        checkAll: {
          type: Boolean,
          required: true
        }
      },
      data() {
        return {
          'id': this.todo.id,
          'title': this.todo.title,
          'completed': this.todo.completed,
          'editing': this.todo.editing,
          'beforeEditCache': ''
        }
      },
      created() {
        eventBus.$on('pluralize', this.handlePluralize)
      },
      beforeDestroy() {
        eventBus.$off('pluralize', this.handlePluralize)
      },
      watch: {
        checkAll() {
          if (this.checkAll) {
            this.completed = true
          } else {
            this.completed = this.todo.completed
          }
        }
      },
      directives: {
        focus: {
          inserted: function (el) {
            el.focus()
          }
        }
      },
      methods: {
        removeTodo(index) {
          eventBus.$emit('removedTodo', index)
        },
        editTodo() {
          this.beforeEditCache = this.title
          this.editing = true
        },
        doneEdit() {
          if (this.title.trim().length == 0) {
            this.title = this.beforeEditCache
          }

          this.editing = false
          eventBus.$emit('finishedEdit', {
            'index': this.index,
            'todo': {
              'id': this.id,
              'title': this.title,
              'completed': this.completed,
              'editing': this.editing
            }
          })
        },
        cancelEdit() {
          this.title = this.beforeEditCache
          this.editing = false
        },
        pluralize() {
          eventBus.$emit('pluralize')
        },
        handlePluralize() {
          this.title = this.title + 's'
          eventBus.$emit('finishedEdit', {
            'index': this.index,
            'todo': {
              'id': this.id,
              'title': this.title,
              'completed': this.completed,
              'editing': this.editing
            }
          })
        }
      }
    }
</script>
