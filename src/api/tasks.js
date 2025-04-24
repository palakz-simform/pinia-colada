let tasks = [
  { id: 1, text: "Task A", isCompleted: false },
  { id: 2, text: "Task B", isCompleted: true },
  { id: 3, text: "Task C", isCompleted: false },
];

// Fetch all tasks
export async function getAllTasks() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(tasks);
    }, 2000); // Simulate network delay
  });
}

// Add a task
export async function addTask(newTask) {
  return new Promise((resolve) => {
    setTimeout(() => {
      tasks.push(newTask); // Add the new task to the tasks array
      resolve(tasks); // Resolve with the updated tasks array
    }, 500); // Simulate network delay
  });
}

// Delete a task
export async function deleteTask(taskId) {
  return new Promise((resolve) => {
    setTimeout(() => {
      tasks = tasks.filter((task) => task.id !== taskId);
      resolve(tasks);
    }, 500); // Simulate network delay
  });
}

// Toggle task completion
export async function toggleTaskCompletion(taskId) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const task = tasks.find((t) => t.id === taskId);
      if (task) {
        task.isCompleted = !task.isCompleted;
      }
      resolve(tasks);
    }, 500); // Simulate network delay
  });
}
