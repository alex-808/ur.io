import React from 'react'

interface Props {
  notification: string
}

const NotificationPanel: React.FC<Props> = ({ notification }) => {
  return <div className="notification-panel centering">{notification}</div>
}

export { NotificationPanel }
