<script setup>
import TaskList from "./components/TaskList.vue";
</script>

<template>
  <main>
    <TaskList />
  </main>
</template>

<style scoped>
header {
  text-align: center;
  margin-bottom: 2rem;
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 1rem;
}

h1 {
  font-size: 2rem;
  color: var(--color-heading);
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}

main {
  padding: 2rem;
  font-family: Arial, sans-serif;
}
</style>
