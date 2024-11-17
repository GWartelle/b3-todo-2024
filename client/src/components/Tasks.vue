<script setup>
import { onMounted, reactive } from "vue";
import { RouterLink } from "vue-router";
import axios from "axios";

const state = reactive({
  tasks: [],
  totalTasks: 0,
  tasksPerPage: 20,
  isLoading: true,
});

const loadTasks = async () => {
  try {
    const response = await axios.get(`http://127.0.0.1:3000/tasks?tasksPerPage=${state.tasksPerPage}`);
    state.tasks = response.data.tasks;
    state.totalTasks = response.data.totalTasks;
    state.tasksPerPage = response.data.tasksPerPage;
  } catch (error) {
    console.error("Error fetching tasks", error);
  } finally {
    state.isLoading = false;
  }
};

const formatDate = (date) => {
  return new Date(date).toLocaleString();
};

const deleteTask = () => {
  alert("This will delete this task !");
};

onMounted(() => {
  loadTasks();
});
</script>

<template>
  <div class="flex flex-col items-center gap-10 min-w-96">
    <div class="flex justify-between items-center w-full">
      <h2 class="font-bold text-xl">Task list</h2>
      <RouterLink to="/add-task">
        <button class="btn bg-green-500 text-white font-bold text-xl">
          Add task
        </button>
      </RouterLink>
    </div>

    <div v-if="!state.isLoading">
      <div v-if="state.tasks.length" class="overflow-x-auto">
        <table class="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Done</th>
              <th>Description</th>
              <th>Due Date</th>
              <th>Creation Date</th>
              <th>Update Date</th>
              <th>Type</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <!-- Display sorted tasks using state.tasks computed property -->
            <tr v-for="(task, index) in state.tasks" :key="index">
              <td>{{ task.id }}</td>
              <td>{{ task.title }}</td>
              <td>{{ task.done }}</td>
              <td>{{ task.description }}</td>
              <td>{{ formatDate(task.dueDate) }}</td>
              <td>{{ formatDate(task.createdAt) }}</td>
              <td>{{ formatDate(task.updatedAt) }}</td>
              <td>{{ task.type }}</td>
              <td class="flex">
                <RouterLink :to="{ name: 'edit-task', params: { index } }">
                  <button class="btn btn-sm w-9 bg-yellow-500 text-white">
                    ...
                  </button>
                </RouterLink>
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
    </div>

    <p v-else>No tasks yet</p>

    <div v-else class="loading loading-lg"></div>
  </div>
</template>
