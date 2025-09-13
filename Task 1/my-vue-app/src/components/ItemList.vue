<template>
  <div class="p-6">
    <!-- Empty State -->
    <div v-if="allItems.length === 0" class="text-center py-12">
      <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
      </svg>
      <h3 class="mt-2 text-sm font-medium text-gray-900">No tasks yet</h3>
      <p class="mt-1 text-sm text-gray-500">Get started by creating your first task.</p>
    </div>

    <!-- Items Grid -->
    <div v-else class="space-y-4">
      <ItemCard
        v-for="item in allItems"
        :key="item.id"
        :item="item"
        @edit="editItem"
        @delete="deleteItem"
        @toggle-complete="toggleComplete"
      />
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import ItemCard from './ItemCard.vue'

export default {
  name: 'ItemList',
  components: {
    ItemCard
  },
  setup() {
    const store = useStore()

    const allItems = computed(() => store.getters.allItems)

    const editItem = (item) => {
      store.dispatch('setEditingItem', item)
    }

    const deleteItem = async (itemId) => {
      if (confirm('Are you sure you want to delete this task?')) {
        await store.dispatch('deleteItem', itemId)
      }
    }

    const toggleComplete = async (item) => {
      const updatedItem = {
        ...item,
        completed: !item.completed
      }
      await store.dispatch('updateItem', updatedItem)
    }

    return {
      allItems,
      editItem,
      deleteItem,
      toggleComplete
    }
  }
}
</script>