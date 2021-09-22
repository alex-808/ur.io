import React from 'react'

interface Props {
  leaveGame: () => void
}

const LeaveButton: React.FC<Props> = ({ leaveGame }) => {
  return <button onClick={leaveGame}>LeaveButton</button>
}

export { LeaveButton }
