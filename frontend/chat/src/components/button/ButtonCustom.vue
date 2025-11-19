<script setup lang="ts">
import { ref } from 'vue'
import LoaderSpinner from '../loader/LoaderSpinner.vue'

const props = defineProps<{
  disabled?: boolean
}>()

const isLoading = ref<boolean>(false)

const handleClick = async () => {
  if (props.disabled || isLoading.value) return

  isLoading.value = true

  await new Promise((resolve) => setTimeout(resolve, 500))

  isLoading.value = false
}
</script>

<template>
  <button class="btn" :class="{ disabled: props.disabled || isLoading }" @click="handleClick">
    <div class="btn__content">
      <template v-if="isLoading">
        <LoaderSpinner />
      </template>
      <template v-else>
        <slot>Нажми меня</slot>
      </template>
    </div>
  </button>
</template>

<style scoped lang="scss">
.btn {
  width: 50%;
  @include Button;
  color: #fff;
  font-weight: bold;
  cursor: pointer;
  position: relative;
  opacity: 1;

  &:hover {
    opacity: 0.6;
  }
  &:active {
    opacity: 0.8;
  }

  &__content {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
  }
}

.disabled {
  cursor: auto;
  opacity: 0.4;
  &:hover {
    opacity: 0.4;
  }
  &:active {
    opacity: 0.4;
  }
}
</style>
