<template>
  <div>
    <transition name="fade">
      <button class="btn"v-if="showClearCompletedButton" @click="clearCompleted">Clear Completed</button>
    </transition>
  </div>
</template>

<script>
  export default {
    props: {
      showClearCompletedButton: {
        type: Boolean,
        required: true
      }
    },
    methods: {
      clearCompleted() {
        eventBus.$emit('clearCompletedTodos')
      }
    }
  }
</script>
