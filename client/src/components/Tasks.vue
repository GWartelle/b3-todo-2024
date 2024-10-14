<script setup>
import Task from "./Task.vue";

const list = [1, 2, 3];
</script>

<template>
  <Task v-for="i in list" :index="i" class="text-center" />
</template>
