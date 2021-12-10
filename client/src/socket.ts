import io from 'socket.io-client'

const url =
  process.env.NODE_ENV === 'development'
    ? (process.env.REACT_APP_SERVER_URL as string)
    : 'http://localhost:3001'

const socket = io(url)

export { socket }
