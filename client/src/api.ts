import { socket } from './socket'

const handleCreateNewGame = () => {
  socket.emit('newGame')
}

const handleJoinGame = (roomID: string) => {
  socket.emit('joinGame', roomID)
}

const handleTokenClick: handleTokenEvent = (playerID, token) => {
  socket.emit('tokenClick', playerID, token)
}

const handleTokenHover: handleTokenEvent = (playerID, token) => {
  socket.emit('tokenHover', playerID, token)
}

const handleRollDice = () => {
  socket.emit('rollDice')
}

const handleResetGame = () => {
  socket.emit('reset')
}

const handleLeaveGame = () => {
  socket.emit('leaveGame')
}

export {
  socket,
  handleCreateNewGame,
  handleJoinGame,
  handleTokenClick,
  handleTokenHover,
  handleRollDice,
  handleResetGame,
  handleLeaveGame,
}
