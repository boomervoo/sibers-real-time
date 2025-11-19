————————
# RU
————————

# Real-time Chat

Real-time чат-приложение, позволяющее пользователям общаться в режиме реального времени.
Система состоит из публичного общего канала и пользовательских каналов, которые создаются участниками самостоятельно.

## Функционал

### Общий канал

- Все пользователи подключаются к одному общему чату.
- Можно отправлять и получать сообщения в реальном времени.

### Пользовательские каналы

Любой пользователь может:

- создать свой собственный канал;
- удалять пользователей из канала, если он является его создателем.

### Поиск и информация о пользователях

- В каждом канале отображается количество участников.
- Реализован поиск пользователей внутри канала.

## Технологии

- Frontend: Vue 3 + Vite + TypeScript
- State Manager: Pinia
- Backend: Node.js + WebSocket
- Real-Time events: Socket.IO

## Запуск проекта

### backend

```sh
cd backend

node server.js
```

### Frontend

```sh
cd frontend/chat

pnpm install

pnpm run dev
```
————————
# EN
————————
# Real-time Chat

A real-time chat application that allows users to communicate in real time.
The system consists of a public general channel and user channels that are created by the participants themselves.

## Functionality

### Public Channel

- All users connect to one public chat.
- Messages can be sent and received in real time.

### User Channels

Any user can:

- create their own channel;
- remove users from the channel if they are its creator.

### Search and user information

- The number of participants is displayed in each channel.
- User search within the channel is implemented.

## Technologies

- Frontend: Vue 3 + Vite + TypeScript
- State Manager: Pinia
- Backend: Node.js + WebSocket
- Real-Time events: Socket.IO

## Launching the project

### Backend

```sh
cd backend

node server.js
```

### Frontend

```sh
cd frontend/chat

pnpm install

pnpm run dev
```
