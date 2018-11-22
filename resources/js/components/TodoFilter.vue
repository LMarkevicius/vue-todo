<template>
  <div>
    <button class="btn" :class="{ 'btn-primary' : filter == 'all' }" @click="changeFilter('all')">All</button>
    <button class="btn" :class="{ 'btn-primary' : filter == 'active' }" @click="changeFilter('active')">Active</button>
    <button class="btn" :class="{ 'btn-primary' : filter == 'completed' }" @click="changeFilter('completed')">Completed</button>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        'filter': 'all'
      }
    },
    methods: {
      changeFilter(filter) {
        this.filter = filter
        eventBus.$emit('filterChanged', filter)
      }
    }
  }
</script>
