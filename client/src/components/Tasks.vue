<script setup>
import { ref, onMounted, computed } from "vue";
import { RouterLink } from "vue-router";

const tasks = ref([]);
const sortOption = ref("dueDate"); // Default sort option: 'dueDate'
const sortOrder = ref("asc"); // Default sort order: 'asc' (ascending)

// Load tasks from sessionStorage
const loadTasksFromSession = () => {
  const savedTasks = sessionStorage.getItem("tasks");
  if (savedTasks) {
    tasks.value = JSON.parse(savedTasks);
  }
};

// Format the due date to a readable string
const formatDate = (date) => {
  return new Date(date).toLocaleString();
};

// Debugging function to log task info
const debugTask = (index) => {
  console.log(tasks.value[index]);
  alert("Check the console for details");
};

// Delete a task from the list
const deleteTask = (index) => {
  tasks.value.splice(index, 1);
  sessionStorage.setItem("tasks", JSON.stringify(tasks.value));
};

// Computed property for sorted tasks
const sortedTasks = computed(() => {
  const sorted = tasks.value.slice().sort((a, b) => {
    if (sortOption.value === "dueDate") {
      return new Date(a.dueDate) - new Date(b.dueDate);
    } else if (sortOption.value === "status") {
      return a.status.localeCompare(b.status);
    }
    return 0; // Default to unsorted
  });

  // Apply descending order if selected
  if (sortOrder.value === "desc") {
    return sorted.reverse();
  }

  return sorted;
});

// Load tasks when component is mounted
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

    <!-- Sort Options using DaisyUI Dropdown -->
    <div class="flex justify-start gap-4">
      <details class="dropdown">
        <summary class="btn m-1">Sort Options</summary>
        <ul
          class="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
        >
          <li
            @click="
              sortOption = 'dueDate';
              sortOrder = 'asc';
            "
          >
            <a>Sort by Due Date (Asc)</a>
          </li>
          <li
            @click="
              sortOption = 'dueDate';
              sortOrder = 'desc';
            "
          >
            <a>Sort by Due Date (Desc)</a>
          </li>
          <li
            @click="
              sortOption = 'status';
              sortOrder = 'asc';
            "
          >
            <a>Sort by Status (Asc)</a>
          </li>
          <li
            @click="
              sortOption = 'status';
              sortOrder = 'desc';
            "
          >
            <a>Sort by Status (Desc)</a>
          </li>
        </ul>
      </details>
    </div>

    <div v-if="sortedTasks.length" class="overflow-x-auto">
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
          <!-- Display sorted tasks using sortedTasks computed property -->
          <tr v-for="(task, index) in sortedTasks" :key="index">
            <td>{{ index + 1 }}</td>
            <td>{{ task.description }}</td>
            <td>{{ formatDate(task.dueDate) }}</td>
            <td>{{ task.status }}</td>
            <td class="flex">
              <RouterLink :to="{ name: 'edit-task', params: { index } }">
                <button class="btn btn-sm w-9">...</button>
              </RouterLink>
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
