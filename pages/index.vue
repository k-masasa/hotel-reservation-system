<script setup>
// Redirect from root "/" to "/top"
await navigateTo('/top')
</script>

<template>
  <!-- This template will not be rendered due to immediate redirect -->
  <div></div>
</template>