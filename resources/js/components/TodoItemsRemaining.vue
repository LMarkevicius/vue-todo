<template>
  <div>
    <span class="text-right">{{ remaining }} items left</span>
  </div>
</template>

<script>
  export default {
    props: {
      remaining: {
        type: Number,
        required: true
      }
    }
  }
</script>
