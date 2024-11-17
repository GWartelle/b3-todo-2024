<script setup>
import {onMounted, reactive} from "vue";
import { useToast } from "vue-toastification";
import { useRouter } from "vue-router";
import axios from "axios";

const router = useRouter();
const toast = useToast();

const form = reactive({
  newTaskTitle: "",
  newTaskDescription: "",
  newTaskDueDate: "",
  newTaskTypeId: "",
});

const types = reactive({
  types: [],
  isLoading: true,
})

const handleSubmit = async () => {
  const newTask = {
    title: form.newTaskTitle,
    description: form.newTaskDescription,
    dueDate: form.newTaskDueDate,
    TypeId: form.newTaskTypeId,
  };

  try {
    await axios.post("http://127.0.0.1:3000/tasks", newTask);
    toast.success("Task successfully created");
    await router.push("/");
  } catch (error) {
    console.error("Error adding task", error);
    toast.error("Task was not created");
  }
};

const loadTypes = async () => {
  try {
    const res = await axios.get("http://127.0.0.1:3000/types")
    types.types = res.data.types;
  } catch (error) {
  console.error("Error fetching types", error);
  } finally {
    types.isLoading = false;
  }
}

onMounted(() => {
  loadTypes();
})
</script>

<template>
  <form
    @submit.prevent="handleSubmit"
    class="flex flex-col gap-10 items-center"
  >
    <h2 class="font-bold text-xl">Create a New Task</h2>

    <div class="flex flex-col items-center w-96 gap-2">
      <input
        v-model="form.newTaskTitle"
        type="text"
        class="input w-full"
        placeholder="Task Title"
        required
      />

      <input
        v-model="form.newTaskDescription"
        type="text"
        class="input w-full"
        placeholder="Task Description"
        required
      />

      <input
        v-model="form.newTaskDueDate"
        type="datetime-local"
        class="input w-full"
        placeholder="Due Date"
        required
      />

      <select v-model="form.newTaskTypeId" class="select w-full">
        <option selected disabled>Select Type</option>
        <option
            v-for="(type, index) in types.types"
            :key="index"
            :value="type.id"
        >
          {{ type.title }}
        </option>
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
        Add Task
      </button>
    </div>
  </form>
</template>
