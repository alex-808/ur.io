import React from 'react'
import './NotificationPanel.scss'

interface Props {
  notification: string
}

const NotificationPanel: React.FC<Props> = ({ notification }) => {
  return <div className="game-phase">{notification}</div>
}

export { NotificationPanel }
