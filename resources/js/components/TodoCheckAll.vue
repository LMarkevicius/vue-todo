<template>
  <div>
    <input type="checkbox" class="" :checked="!anyRemaining" @change="allChecked">

    <span>Check All</span>
  </div>
</template>

<script>
  export default {
    props: {
      anyRemaining: {
        type: Boolean,
        required: true
      }
    },
    methods: {
      allChecked() {
        eventBus.$emit('checkAllChanged', this.anyRemaining)
      }
    }
  }
</script>
