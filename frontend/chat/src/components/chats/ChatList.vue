<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useSocketStore } from '@/stores/socket'
import { storeToRefs } from 'pinia'
import NewChatModal from './NewChatModal.vue'
import { useRouter } from 'vue-router'
import { RouteName } from '@/utils/type/enum.type'
import { navigate } from '@/utils/navigate'

defineProps<{
  nameNewChat?: string
}>()

const router = useRouter()
const store = useSocketStore()
const isOpenModal = ref<boolean>(false)
const { groups } = storeToRefs(store)
const { addRoom } = store

const createChat = (name: string) => {
  const newChatName = name.trim()
  if (!newChatName) return

  addRoom(newChatName)
  isOpenModal.value = false
}

const handleUser = (id: string) => {
  navigate(router, RouteName.CHAT, { id })
  store.joinRoom(id)
}

onMounted(() => {
  store.connectSocket()
})
</script>

<template>
  <section class="chats">
    <ul class="chats__items">
      <li class="chats__item" v-for="group in groups" :key="group.id" @click="handleUser(group.id)">
        <article class="chats__item-block">
          <span class="chat-name">{{ group.name }}</span>
          <span class="chat-users">Участники: {{ group.users?.length || 0 }} </span>
        </article>
      </li>
    </ul>
    <div class="chats__new">
      <span class="chat-new" @click="isOpenModal = true">Создать чат</span>
    </div>
    <NewChatModal :isOpenModal="isOpenModal" @newChat="createChat" @close="isOpenModal = false" />
  </section>
</template>

<style scoped lang="scss">
.chats {
  display: flex;
  justify-content: space-between;

  &__items {
    position: fixed;
    width: 30%;
    height: 90%;
    display: flex;
    flex-direction: column;
    gap: 10px;
    overflow-y: auto;
  }

  &__item {
    padding: 10px;
    border-radius: 10px;
    border: 1px solid $gray;
    cursor: pointer;
    background-color: $blue;

    &:hover {
      background-color: $bluehover;
    }
  }

  &__new {
    position: fixed;
    right: 10px;
    top: 30px;
  }

  &__item-block {
    display: flex;
    flex-direction: column;
    gap: 10px;

    .chat-name {
      display: inline-block;
      font-size: 14px;
    }

    .chat-users {
      display: inline-block;
      font-size: 12px;
    }
  }

  .chat-new {
    display: inline-block;
    cursor: pointer;
    color: $gray;
    transition: color 0.3s ease-in-out;

    &:hover {
      color: $grayhover;
    }
  }
}
::-webkit-scrollbar {
  display: none;
}
</style>
