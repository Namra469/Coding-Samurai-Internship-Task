<template>
  <div class="bg-gray-50 rounded-lg p-6 border border-gray-200 hover:shadow-md transition-all duration-200 group">
    <div class="flex items-start justify-between">
      <div class="flex-1 min-w-0">
        <!-- Title and Status -->
        <div class="flex items-center space-x-3 mb-2">
          <button
            @click="$emit('toggle-complete', item)"
            class="flex-shrink-0 w-5 h-5 rounded-full border-2 transition-colors"
            :class="item.completed 
              ? 'bg-green-500 border-green-500 text-white' 
              : 'border-gray-300 hover:border-green-400'"
          >
            <svg v-if="item.completed" class="w-3 h-3 mx-auto mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
            </svg>
          </button>
          
          <h3 
            class="text-lg font-medium text-gray-900 truncate"
            :class="{ 'line-through text-gray-500': item.completed }"
          >
            {{ item.title }}
          </h3>
          
          <!-- Priority Badge -->
          <span
            class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
            :class="priorityClasses(item.priority)"
          >
            {{ item.priority }}
          </span>
        </div>

        <!-- Description -->
        <p 
          v-if="item.description"
          class="text-gray-600 text-sm mb-3"
          :class="{ 'line-through': item.completed }"
        >
          {{ item.description }}
        </p>

        <!-- Meta Information -->
        <div class="flex flex-wrap items-center gap-4 text-xs text-gray-500">
          <span class="flex items-center">
            <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Created: {{ item.createdAt }}
          </span>
          
          <span v-if="item.updatedAt !== item.createdAt" class="flex items-center">
            <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Updated: {{ item.updatedAt }}
          </span>
          
          <span v-if="item.dueDate" class="flex items-center">
            <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Due: {{ formatDate(item.dueDate) }}
          </span>
        </div>
      </div>

      <!-- Actions -->
      <div class="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          @click="$emit('edit', item)"
          class="p-2 text-gray-400 hover:text-indigo-600 transition-colors rounded-lg hover:bg-indigo-50"
          title="Edit task"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        </button>
        
        <button
          @click="$emit('delete', item.id)"
          class="p-2 text-gray-400 hover:text-red-600 transition-colors rounded-lg hover:bg-red-50"
          title="Delete task"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ItemCard',
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  emits: ['edit', 'delete', 'toggle-complete'],
  setup() {
    const priorityClasses = (priority) => {
      const classes = {
        low: 'bg-green-100 text-green-800',
        medium: 'bg-yellow-100 text-yellow-800',
        high: 'bg-red-100 text-red-800'
      }
      return classes[priority] || classes.medium
    }

    const formatDate = (dateString) => {
      if (!dateString) return ''
      const date = new Date(dateString)
      return date.toLocaleDateString()
    }

    return {
      priorityClasses,
      formatDate
    }
  }
}
</script>