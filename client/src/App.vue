<script setup>
import { RouterView } from "vue-router";
</script>

<template>
  <div class="flex flex-col items-center">
    <h1 class="text-center font-bold text-4xl p-10">B3 TODO APP</h1>
    <RouterView />
    <p class="fixed bottom-0 right-0 pb-5 pr-10">MyDigitalSchool 2024</p>
  </div>
</template>
