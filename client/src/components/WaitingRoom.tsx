import React from 'react'
import { NotificationPanel } from './NotificationPanel'
import { LeaveButton } from './LeaveButton'

interface Props {
  roomID: string
  notification: string
  leaveGame: () => void
}

const WaitingRoom: React.FC<Props> = ({ roomID, notification, leaveGame }) => {
  return (
    <div>
      <LeaveButton leaveGame={leaveGame} />
      <NotificationPanel notification={notification} />
      <div>Waiting Room {roomID}</div>
    </div>
  )
}

export { WaitingRoom }
