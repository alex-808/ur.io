import React from 'react'
import { NotificationPanel } from './NotificationPanel'
import { LeaveButton } from './LeaveButton'

interface Props {
  roomID: string
}

const WaitingRoom: React.FC<Props> = ({ roomID, children }) => {
  return (
    <>
      {children}
      <span className="waiting-room">
        <div>Waiting Room</div>
        <span className="roomID">{roomID}</span>
      </span>
    </>
  )
}

export { WaitingRoom }
