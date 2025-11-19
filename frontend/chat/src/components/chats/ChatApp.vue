<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRoute } from 'vue-router'
import ButtonCustom from '../button/ButtonCustom.vue'
import { useSocketStore } from '@/stores/socket'

const store = useSocketStore()
const route = useRoute()

const messageText = ref('')

const username = localStorage.getItem('username')

onMounted(() => {
  store.connectSocket()
  store.joinRoom(route.params.id as string)
})

const sendMessage = () => {
  if (!messageText.value.trim()) return
  store.sendMessage(messageText.value)
  messageText.value = ''
}

onBeforeUnmount(() => {
  store.leaveRoom(route.params.id as string)
})
</script>

<template>
  <section class="chat">
    <div class="chat__messages">
      <div
        v-for="m in store.messages"
        :key="m.id"
        class="message"
        :class="{ message__my: m.username === username }"
      >
        <span class="text">{{ m.text }}</span>
        <div class="text__user-block">
          <span>{{ m.username }}</span>
          <span class="time">{{ new Date(m.time).toLocaleTimeString() }}</span>
        </div>
      </div>
      <div class="handle-text">
        <input
          v-model="messageText"
          name="handletext"
          type="text"
          placeholder="Введите сообщение..."
          @keypress.enter="sendMessage"
        />
        <ButtonCustom :disabled="!messageText" class="btn" @click="sendMessage">
          <svg
            class="svg-btn"
            width="20px"
            height="20px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 14L12.2728 19.3032C12.5856 20.0331 13.5586 20.1103 13.9486 19.4185C14.7183 18.0535 15.8591 15.8522 17 13C19 8 20 4 20 4M10 14L4.69678 11.7272C3.96687 11.4144 3.88975 10.4414 4.58149 10.0514C5.94647 9.28173 8.14784 8.14086 11 7C16 5 20 4 20 4M10 14L20 4"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </ButtonCustom>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.chat {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 98%;

  &__messages {
    border-radius: 10px;
    flex: 1;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    padding: 10px;
    gap: 8px;

    .message {
      padding: 10px;
      background: $grayMsg;
      border-radius: 10px;
      color: white;
      align-self: flex-start;

      &__my {
        background: $blueMsg;
        align-self: flex-end;
      }
    }
  }
}

.text {
  display: inline-block;
  margin-bottom: 5px;

  &__user-block {
    display: flex;
    gap: 5px;
    font-size: 13px;
  }
}

.handle-text {
  width: 95%;
  position: absolute;
  bottom: 10px;
  display: flex;
  gap: 10px;
  bottom: 10px;
}

input {
  flex: 1;
  padding: 8px;
  border: 1px solid $gray;
  border-radius: 5px;
  color: #fff;
}

.btn {
  width: 50px;
  padding: 0;

  .svg-btn {
    fill: #fff;
    stroke: #333;
  }
}
</style>
