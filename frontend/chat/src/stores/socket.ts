import { defineStore } from 'pinia'
import { ref } from 'vue'
import { io } from 'socket.io-client'
import type { Chat } from '@/interfaces/chat.interface'

export const useSocketStore = defineStore('socket', () => {
  const API_URL = import.meta.env.VITE_API_URL
  const username = localStorage.getItem('username')
  const groups = ref<Chat[]>([])
  const messages = ref<any[]>([])
  const currentRoom = ref<string | null>(null)

  const socket = io(API_URL, {
    query: { username },
    autoConnect: false,
  })

  socket.on('roomlist', (data) => {
    return (groups.value = data)
  })

  const connectSocket = () => {
    if (!socket.connected) {
      socket.connect()
    }
  }

  const addRoom = (name: string) => {
    socket.emit('addRoom', name)
  }

  const joinRoom = (roomId: string) => {
    currentRoom.value = roomId
    socket.emit('joinRoom', roomId)
  }

  const leaveRoom = (roomId: string) => {
    socket.emit('leaveRoom', roomId)
    if (currentRoom.value === roomId) currentRoom.value = null
  }

  const sendMessage = (text: string) => {
    socket.emit('sendMessage', {
      roomId: currentRoom.value,
      username,
      text,
    })
  }

  const deleteUser = (removeUser: string, roomId: string) => {
    socket.emit('deleteUser', { removeUser, roomId })
  }

  socket.on('history messages', (data) => {
    messages.value = data
  })

  socket.on('newMessage', (msg) => {
    messages.value.push(msg)
  })

  socket.on('connect', () => {
    console.log('Подключился к серверу')
  })

  return {
    socket,
    groups,
    connectSocket,
    addRoom,
    leaveRoom,
    messages,
    currentRoom,
    joinRoom,
    sendMessage,
    deleteUser,
  }
})
