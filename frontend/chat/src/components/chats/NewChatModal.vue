<script setup lang="ts">
import { ref } from 'vue'

defineProps<{
  isOpenModal: boolean
}>()

const emit = defineEmits<{
  newChat: [string]
  close: []
}>()

const nameChat = ref<string>('')

const createRoom = () => {
  emit('newChat', nameChat.value)
  nameChat.value = ''
}

const closeModal = () => {
  emit('close')
  nameChat.value = ''
}
</script>

<template>
  <div v-if="isOpenModal" class="modal">
    <span class="close" @click="closeModal" />
    <div class="modal__content">
      <span class="modal__name-chat">Введите название чата</span>
      <input
        name="new-chat"
        v-model="nameChat"
        @keypress.enter="createRoom"
        class="modal__input"
        type="text"
      />

      <ButtonCustom class="btn" @click="createRoom">Создать</ButtonCustom>
    </div>
  </div>
</template>

<style scoped lang="scss">
.modal {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 20px;
  background-color: $bgModal;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border: 1px solid $gray;
  border-radius: 10px;
  width: 30vw;
  overflow: hidden;

  &__content {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 15px;
  }

  &__name-chat {
    display: inline-block;
    cursor: pointer;
  }

  &__input {
    width: 80%;
    border: 1px solid $gray;
    border-radius: 5px;
    padding: 5px 10px;
    color: #fff;
  }
}

.close {
  position: absolute;
  right: 10px;
  top: 10px;
  width: 20px;
  height: 20px;
  cursor: pointer;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%) rotate(45deg);
    width: 100%;
    height: 1px;
    background-color: $gray;
  }

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%) rotate(135deg);
    width: 100%;
    height: 1px;
    background-color: $gray;
  }
}

.btn {
  background-color: $primary;
  padding: 10px 30px;
  border-radius: 5px;
  font-size: 13px;
  transition: opacity 0.3s ease-in-out;
  cursor: pointer;

  &:hover {
    opacity: 0.6;
  }

  &:hover {
    opacity: 0.8;
  }
}
</style>
