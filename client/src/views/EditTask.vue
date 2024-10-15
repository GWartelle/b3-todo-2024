<script setup>
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";

const route = useRoute();
const router = useRouter();

const taskDescription = ref("");
const dueDate = ref("");
const taskStatus = ref("");

const loadTasksFromSession = () => {
  const savedTasks = sessionStorage.getItem("tasks");
  let tasks = [];
  if (savedTasks) {
    tasks = JSON.parse(savedTasks);
  }
  return tasks;
};

const loadTaskFromSession = () => {
  const tasks = loadTasksFromSession();
  const task = tasks[route.params.index];

  if (task) {
    taskDescription.value = task.description;
    dueDate.value = task.dueDate;
    taskStatus.value = task.status;
  }
};

const handleSubmit = () => {
  const tasks = loadTasksFromSession();
  tasks[route.params.index] = {
    description: taskDescription.value,
    dueDate: dueDate.value,
    status: taskStatus.value,
  };

  sessionStorage.setItem("tasks", JSON.stringify(tasks));

  router.push("/");
};

onMounted(() => {
  loadTaskFromSession();
});
</script>

<template>
  <form
    @submit.prevent="handleSubmit"
    class="flex flex-col gap-10 items-center"
  >
    <h2 class="font-bold text-xl">Edit Task</h2>

    <div class="flex flex-col items-center w-96 gap-2">
      <input
        v-model="taskDescription"
        type="text"
        class="input w-full"
        placeholder="Task Description"
      />

      <input
        v-model="dueDate"
        type="datetime-local"
        class="input w-full"
        placeholder="Due Date"
      />

      <select v-model="taskStatus" class="select w-full">
        <option disabled value="">Select status</option>
        <option>To Do</option>
        <option>In Progress</option>
        <option>Completed</option>
      </select>
    </div>

    <div class="flex justify-between w-full">
      <RouterLink to="/">
        <button type="button" class="btn font-bold text-xl">← Home</button>
      </RouterLink>
      <button
        type="submit"
        class="btn bg-green-500 text-white font-bold text-xl"
      >
        Save Changes
      </button>
    </div>
  </form>
</template>
