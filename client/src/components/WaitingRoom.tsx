import React from 'react'

interface Props {
  roomID: string
}

const WaitingRoom: React.FC<Props> = ({ roomID }) => {
  return (
    <div>
      <div>Waiting Room {roomID}</div>
    </div>
  )
}

export { WaitingRoom }
