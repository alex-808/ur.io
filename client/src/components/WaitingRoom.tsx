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
    <>
      <NotificationPanel notification={notification} />
      <LeaveButton leaveGame={leaveGame} />
      <span className="waiting-room">
        <div>Waiting Room</div>
        <span className="roomID">{roomID}</span>
      </span>
    </>
  )
}

export { WaitingRoom }
