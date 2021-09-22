import React from 'react'

interface Props {
  notification: string
}

const NotificationPanel: React.FC<Props> = ({ notification }) => {
  return <div className="notification-panel">{notification}</div>
}

export { NotificationPanel }
