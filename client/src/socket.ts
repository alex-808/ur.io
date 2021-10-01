import io from 'socket.io-client'
const url = process.env.REACT_APP_SERVER_URL || 'http://localhost:3001'
const socket = io(url)

export { socket }
