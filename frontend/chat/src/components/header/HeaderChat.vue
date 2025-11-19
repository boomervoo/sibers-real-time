<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import { navigate } from '@/utils/navigate'
import { RouteName } from '@/utils/type/enum.type'
import { useSocketStore } from '@/stores/socket'
import { storeToRefs } from 'pinia'
import { computed, ref } from 'vue'
import ModalUsersHeader from './ModalUsersHeader.vue'
import { onClickOutside } from '@vueuse/core'

const store = useSocketStore()
const { groups } = storeToRefs(store)

const username = localStorage.getItem('username')
const router = useRouter()
const route = useRoute()
const modalRef = ref<null>(null)

const isCLickModalUser = ref<boolean>(false)
const currentRoomId = computed(() => {
  return String(route.params.id || '')
})
const toggleMenu = (event: MouseEvent) => {
  event.stopPropagation()
  isCLickModalUser.value = !isCLickModalUser.value
}

onClickOutside(modalRef, toggleMenu)

const exitChat = () => {
  localStorage.clear()
  navigate(router, RouteName.AUTH)
}

const allChats = () => {
  store.leaveRoom(route.params.id as string)
  navigate(router, RouteName.CHATS)
}

const allUsers = () => {
  isCLickModalUser.value = !isCLickModalUser.value
}
</script>

<template>
  <header class="header">
    <span class="header__username"> {{ username }} </span>
    <span class="header__chats" @click="allChats">Все чаты</span>
    <div v-if="route.name === RouteName.CHAT">
      <span class="header__users" @click="allUsers">Пользователи</span>
      <ModalUsersHeader
        v-if="isCLickModalUser"
        ref="modalRef"
        :groups="groups"
        :isOpen="isCLickModalUser"
        :roomId="currentRoomId"
        :admin="username"
      />
    </div>
    <svg
      class="header__exit"
      @click="exitChat"
      fill="#000000"
      width="12px"
      height="12px"
      viewBox="0 0 16 16"
      id="home-16px"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        id="Path_77"
        data-name="Path 77"
        d="M-13,11.5v2A2.5,2.5,0,0,1-15.5,16h-4A2.5,2.5,0,0,1-22,13.5V2.5A2.5,2.5,0,0,1-19.5,0h4A2.5,2.5,0,0,1-13,2.5v2a.5.5,0,0,1-.5.5.5.5,0,0,1-.5-.5v-2A1.5,1.5,0,0,0-15.5,1h-4A1.5,1.5,0,0,0-21,2.5v11A1.5,1.5,0,0,0-19.5,15h4A1.5,1.5,0,0,0-14,13.5v-2a.5.5,0,0,1,.5-.5A.5.5,0,0,1-13,11.5Zm6.962-3.809a.505.505,0,0,0,0-.382.518.518,0,0,0-.109-.163l-4-4a.5.5,0,0,0-.708,0,.5.5,0,0,0,0,.708L-7.707,7H-17.5a.5.5,0,0,0-.5.5.5.5,0,0,0,.5.5h9.793l-3.147,3.146a.5.5,0,0,0,0,.708A.5.5,0,0,0-10.5,12a.5.5,0,0,0,.354-.146l4-4A.518.518,0,0,0-6.038,7.691Z"
        transform="translate(22)"
      />
    </svg>
  </header>
</template>

<style scoped lang="scss">
.header {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  background: rgba(43, 122, 217, 0.635);
  padding: 4px 20px 4px;

  &__username {
    display: inline-block;
    font-size: 13px;
  }

  &__chats {
    @include headerText;

    &:hover {
      @include Opacity7;
    }
  }

  &__exit {
    fill: #fff;
    cursor: pointer;
    justify-content: end;
    transition: opacity 0.3s ease-in-out;

    &:hover {
      @include Opacity7;
    }
  }

  &__users {
    @include headerText;
  }
}
</style>
