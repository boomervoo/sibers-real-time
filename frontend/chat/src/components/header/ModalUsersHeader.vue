<script setup lang="ts">
import type { Chat } from '@/interfaces/chat.interface'
import { computed } from 'vue'
import { ref } from 'vue'
import { useSocketStore } from '@/stores/socket'

const { deleteUser } = useSocketStore()

const props = defineProps<{
  groups: Chat[]
  roomId: string
  admin: string | null
  isOpen: boolean
}>()

const searchUser = ref<string>('')

const usersRoot = computed<string[]>(() => {
  if (!props.groups) return []
  return props.groups?.find((g) => g.id === props.roomId)?.users || []
})

const filteredUser = computed(() => {
  if (!searchUser.value.trim()) return usersRoot.value

  return usersRoot.value.filter((u) => u.toLowerCase().includes(searchUser.value.toLowerCase()))
})

const isAdmin = computed(() => {
  const currentGroup = props.groups.find((g) => g.id === props.roomId)
  return currentGroup?.creator === props.admin
})

const deleteUserRoom = (name: string, roomId: string) => {
  deleteUser(name, roomId)
  searchUser.value = ''
}
</script>

<template>
  <div class="block overlay" v-if="isOpen">
    <input class="search" type="text" v-model="searchUser" />
    <ul class="block__items">
      <li class="block__item" v-for="user in filteredUser" :key="user">
        {{ user }}
        <span
          v-if="isAdmin && user !== admin"
          class="delete"
          @click="deleteUserRoom(user, props.roomId)"
          >удалить</span
        >
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.close {
  display: none;
}
.block {
  position: fixed;
  top: 30px;
  padding: 10px;
  width: fit-content;
  height: fit-content;
  max-height: 200px;
  overflow-y: auto;
  border: 1px solid $gray;
  border-radius: 5px;
  background-color: $bgModal;

  &__items {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  &__item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;

    .delete {
      font-size: 12px;
      cursor: pointer;
    }
  }

  .search {
    border: 1px solid $gray;
    border-radius: 5px;
    margin-bottom: 10px;
    color: #fff;
    padding: 5px;
    font-size: 13px;
  }
}
</style>
