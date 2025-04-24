<script setup>
import { ref } from "vue";
import { useQuery, useMutation, useQueryCache } from "@pinia/colada";
import {
  getAllTasks,
  addTask,
  deleteTask,
  toggleTaskCompletion,
} from "@/api/tasks";

const queryCache = useQueryCache();

const { state: taskList, asyncStatus } = useQuery({
  key: ["tasks-list"],
  query: getAllTasks,
});

const newTask = ref("");

// Mutation for adding a task
const addTaskMutation = useMutation({
  mutation: async (taskText) => {
    const newTask = { id: Date.now(), text: taskText, isCompleted: false };
    return addTask(newTask); // Call the API to add the task
  },
  onSettled() {
    queryCache.invalidateQueries({ key: ["tasks-list"] }); // Refetch the task list
  },
});

// Mutation for deleting a task
const deleteTaskMutation = useMutation({
  mutation: deleteTask,
  onSettled() {
    queryCache.invalidateQueries({ key: ["tasks-list"] }); // Refetch the task list
  },
});

// Mutation for toggling task completion
const toggleTaskMutation = useMutation({
  mutation: toggleTaskCompletion,
  onSettled() {
    queryCache.invalidateQueries({ key: ["tasks-list"] }); // Refetch the task list
  },
});

function handleAddTask() {
  if (newTask.value.trim()) {
    addTaskMutation.mutate(newTask.value);
    newTask.value = ""; // Clear the input field
  }
}

function handleDelete(taskId) {
  deleteTaskMutation.mutate(taskId);
}

function handleToggle(taskId) {
  toggleTaskMutation.mutate(taskId);
}
</script>

<template>
  <div class="task-list">
    <h2>Task List</h2>
    <div class="task-input">
      <input
        v-model="newTask"
        placeholder="Enter a new task"
        @keyup.enter="handleAddTask"
      />
      <button @click="handleAddTask" :disabled="!addTaskMutation.isLoading">
        Add Task
      </button>
    </div>
    <div v-if="asyncStatus.isLoading">Loading tasks...</div>
    <div v-else-if="asyncStatus.isError">Failed to load tasks.</div>
    <div v-else-if="Array.isArray(taskList.data) && taskList.data.length > 0">
      <ul>
        <li v-for="task in taskList.data" :key="task.id">
          <label>
            <input
              type="checkbox"
              :checked="task.isCompleted"
              @change="handleToggle(task.id)"
            />
            <span :class="{ completed: task.isCompleted }">{{
              task.text
            }}</span>
          </label>
          <button
            @click="handleDelete(task.id)"
            :disabled="deleteTaskMutation.state.isLoading"
          >
            Delete
          </button>
        </li>
      </ul>
    </div>
    <div v-else>No tasks available.</div>
  </div>
</template>

<style scoped>
.task-list {
  max-width: 600px;
  margin: 0 auto;
  padding: 1rem;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.task-input {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.task-input input {
  flex: 1;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
}

.task-input input:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 4px rgba(0, 123, 255, 0.5);
}

.task-input button {
  padding: 0.5rem 1rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.task-input button:hover {
  background-color: #0056b3;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

li {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1rem;
  margin-bottom: 0.5rem;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 4px;
  transition: box-shadow 0.3s ease;
}

li:hover {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1rem;
}

.completed {
  text-decoration: line-through;
  color: gray;
}

button {
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 0.4rem 0.8rem;
  border-radius: 4px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #a71d2a;
}
</style>
