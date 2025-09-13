<template>
  <div>
    <h2 class="text-xl font-semibold text-gray-900 mb-6">
      {{ editingItem ? 'Edit Task' : 'Add New Task' }}
    </h2>
    
    <form @submit.prevent="handleSubmit" class="space-y-4">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Task Title</label>
        <input
          v-model="form.title"
          type="text"
          required
          class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="Enter task title..."
        >
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Description</label>
        <textarea
          v-model="form.description"
          rows="3"
          class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 resize-none"
          placeholder="Enter task description..."
        ></textarea>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Priority</label>
        <select
          v-model="form.priority"
          class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Due Date</label>
        <input
          v-model="form.dueDate"
          type="date"
          class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
        >
      </div>

      <div class="flex items-center">
        <input
          v-model="form.completed"
          type="checkbox"
          class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
        >
        <label class="ml-2 block text-sm text-gray-700">Mark as completed</label>
      </div>

      <div class="flex space-x-3 pt-4">
        <button
          type="submit"
          :disabled="isLoading"
          class="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-4 rounded-lg transition-colors disabled:opacity-50"
        >
          {{ editingItem ? 'Update Task' : 'Add Task' }}
        </button>
        
        <button
          v-if="editingItem"
          type="button"
          @click="cancelEdit"
          class="px-4 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50"
        >
          Cancel
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { reactive, computed, watch } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'ItemForm',
  setup() {
    const store = useStore()
    
    const form = reactive({
      title: '',
      description: '',
      priority: 'medium',
      dueDate: '',
      completed: false
    })

    const isLoading = computed(() => store.getters.isLoading)
    const editingItem = computed(() => store.getters.editingItem)

    watch(editingItem, (newItem) => {
      if (newItem) {
        form.title = newItem.title
        form.description = newItem.description
        form.priority = newItem.priority
        form.dueDate = newItem.dueDate || ''
        form.completed = newItem.completed
      }
    })

    const resetForm = () => {
      form.title = ''
      form.description = ''
      form.priority = 'medium'
      form.dueDate = ''
      form.completed = false
    }

    const handleSubmit = async () => {
      const taskData = {
        title: form.title.trim(),
        description: form.description.trim(),
        priority: form.priority,
        dueDate: form.dueDate,
        completed: form.completed
      }

      if (editingItem.value) {
        await store.dispatch('updateItem', {
          ...taskData,
          id: editingItem.value.id,
          createdAt: editingItem.value.createdAt
        })
      } else {
        await store.dispatch('addItem', taskData)
      }
      resetForm()
    }

    const cancelEdit = () => {
      store.dispatch('cancelEditing')
      resetForm()
    }

    return {
      form,
      isLoading,
      editingItem,
      handleSubmit,
      cancelEdit
    }
  }
}
</script>