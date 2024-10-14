<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const newTask = ref("");
const dueDate = ref("");
const taskStatus = ref("");
const router = useRouter();

const handleSubmit = () => {
  if (newTask.value.trim() === "") {
    alert("Task description is required!");
    return;
  }

  if (!dueDate.value) {
    alert("Due date is required!");
    return;
  }

  if (!taskStatus.value) {
    alert("Task status is required!");
    return;
  }

  const savedTasks = sessionStorage.getItem("tasks");
  let tasks = savedTasks ? JSON.parse(savedTasks) : [];

  tasks.push({
    description: newTask.value,
    dueDate: dueDate.value,
    status: taskStatus.value,
  });

  sessionStorage.setItem("tasks", JSON.stringify(tasks));

  newTask.value = "";
  dueDate.value = "";
  taskStatus.value = "";

  router.push("/");
};
</script>

<template>
  <form
    @submit.prevent="handleSubmit"
    class="flex flex-col gap-10 items-center"
  >
    <h2 class="font-bold text-xl">Create a New Task</h2>

    <div class="flex flex-col items-center w-96 gap-2">
      <input
        v-model="newTask"
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

      <select v-model="taskStatus" class="select w-full max-w-sm">
        <option disabled value="">Select status</option>
        <option>To Do</option>
        <option>In Progress</option>
        <option>Completed</option>
      </select>

      <div class="flex justify-between w-full">
        <RouterLink to="/">
          <button type="button" class="btn font-bold text-xl">← Home</button>
        </RouterLink>
        <button
          type="submit"
          class="btn bg-green-500 text-white font-bold text-xl"
        >
          Add Task
        </button>
      </div>
    </div>
  </form>
</template>
