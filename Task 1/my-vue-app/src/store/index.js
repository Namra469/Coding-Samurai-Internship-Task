import { createStore } from 'vuex'

export default createStore({
  state: {
    items: [],
    nextId: 1,
    isLoading: false,
    editingItem: null
  },
  mutations: {
    SET_LOADING(state, status) {
      state.isLoading = status
    },
    ADD_ITEM(state, item) {
      state.items.push({
        id: state.nextId++,
        ...item,
        createdAt: new Date().toLocaleString(),
        updatedAt: new Date().toLocaleString()
      })
    },
    UPDATE_ITEM(state, updatedItem) {
      const index = state.items.findIndex(item => item.id === updatedItem.id)
      if (index !== -1) {
        state.items[index] = {
          ...updatedItem,
          updatedAt: new Date().toLocaleString()
        }
      }
    },
    DELETE_ITEM(state, itemId) {
      state.items = state.items.filter(item => item.id !== itemId)
    },
    SET_EDITING_ITEM(state, item) {
      state.editingItem = item
    },
    CLEAR_EDITING_ITEM(state) {
      state.editingItem = null
    }
  },
  actions: {
    async addItem({ commit }, item) {
      commit('SET_LOADING', true)
      await new Promise(resolve => setTimeout(resolve, 300))
      commit('ADD_ITEM', item)
      commit('SET_LOADING', false)
    },
    async updateItem({ commit }, item) {
      commit('SET_LOADING', true)
      await new Promise(resolve => setTimeout(resolve, 300))
      commit('UPDATE_ITEM', item)
      commit('CLEAR_EDITING_ITEM')
      commit('SET_LOADING', false)
    },
    async deleteItem({ commit }, itemId) {
      commit('SET_LOADING', true)
      await new Promise(resolve => setTimeout(resolve, 200))
      commit('DELETE_ITEM', itemId)
      commit('SET_LOADING', false)
    },
    setEditingItem({ commit }, item) {
      commit('SET_EDITING_ITEM', item)
    },
    cancelEditing({ commit }) {
      commit('CLEAR_EDITING_ITEM')
    }
  },
  getters: {
    allItems: state => state.items,
    itemCount: state => state.items.length,
    isLoading: state => state.isLoading,
    editingItem: state => state.editingItem
  }
})