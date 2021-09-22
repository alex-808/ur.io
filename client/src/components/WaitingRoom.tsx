import React from 'react'
import { NotificationPanel } from './NotificationPanel'

interface Props {
  roomID: string
  notification: string
}

const WaitingRoom: React.FC<Props> = ({ roomID, notification }) => {
  return (
    <div>
      <NotificationPanel notification={notification} />
      <div>Waiting Room {roomID}</div>
    </div>
  )
}

export { WaitingRoom }
