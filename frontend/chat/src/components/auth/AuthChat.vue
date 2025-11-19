<script setup lang="ts">
import { ref } from 'vue'
import ButtonCustom from '../button/ButtonCustom.vue'
import { useRouter } from 'vue-router'
import { navigate } from '@/utils/navigate'
import { RouteName } from '@/utils/type/enum.type'

const userName = ref<string>('')
const router = useRouter()

const handleLoginUser = () => {
  localStorage.setItem('username', userName.value)
  navigate(router, RouteName.CHATS)
}
</script>

<template>
  <div class="auth">
    <div class="auth__content">
      <h2 class="auth__title">Введите никнейм</h2>
      <input
        class="auth__user-name"
        type="text"
        v-model="userName"
        @keydown.enter="handleLoginUser"
      />
      <ButtonCustom :disabled="!userName" @click="handleLoginUser">Вход</ButtonCustom>
    </div>
  </div>
</template>

<style scoped lang="scss">
.auth {
  position: fixed;
  min-width: 40vw;
  min-height: 80vh;
  padding: 30px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border: 1px solid $gray;
  border-radius: 20px;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    box-shadow: 10px 10px 14px black;
    background-color: gray;
    opacity: 0.1;
    z-index: 1;
  }

  &__content {
    position: fixed;
    width: 100%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 10;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
  }

  &__title {
    @include MarginBot;
    font-size: 25px;
    color: #fff;
    letter-spacing: 2px;
  }

  &__text {
    @include MarginBot;
  }

  &__user-name {
    margin-bottom: 20px;
    width: 50%;
    @include Button;

    &:hover {
      opacity: 1;
    }

    &:focus {
      opacity: 1;
    }

    &:active {
      opacity: 0.8;
    }
  }

  input {
    color: #fff;
  }
}
</style>
