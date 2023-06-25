import io from 'socket.io-client'

const url =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:5001'
    : (process.env.REACT_APP_SERVER_URL as string)

const socket = io(url)

export { socket }
