<script setup>
import { ref, onMounted } from "vue";
import { RouterLink } from "vue-router";

const tasks = ref([]);

const loadTasksFromSession = () => {
  const savedTasks = sessionStorage.getItem("tasks");
  if (savedTasks) {
    tasks.value = JSON.parse(savedTasks);
  }
};

const formatDate = (date) => {
  return new Date(date).toLocaleString();
};

const debugTask = (index) => {
  console.log(tasks[index]);
  alert("Regarder dans la console");
};

const deleteTask = (index) => {
  tasks.value.splice(index, 1);
  sessionStorage.setItem("tasks", JSON.stringify(tasks.value));
};

onMounted(() => {
  loadTasksFromSession();
});
</script>

<template>
  <div class="flex flex-col items-left gap-10 min-w-96 max-w-3xl">
    <div class="flex justify-between items-center w-full">
      <h2 class="font-bold text-xl">Task list</h2>
      <RouterLink to="/add-task">
        <button class="btn bg-green-500 text-white font-bold text-xl">
          Add task
        </button>
      </RouterLink>
    </div>
    <div v-if="tasks.length" class="overflow-x-auto">
      <table class="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Task</th>
            <th>Due Date</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(task, index) in tasks" :key="index">
            <td>{{ index + 1 }}</td>
            <td>{{ task.description }}</td>
            <td>{{ formatDate(task.dueDate) }}</td>
            <td>{{ task.status }}</td>
            <td class="flex">
              <button class="btn btn-sm w-9">...</button>
              <button
                @click="debugTask(index)"
                class="btn btn-sm w-9 bg-yellow-500 text-white"
              >
                ?
              </button>
              <button
                @click="deleteTask(index)"
                class="btn btn-sm w-9 bg-red-500 text-white"
              >
                X
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <p v-else>No tasks yet</p>
  </div>
</template>
