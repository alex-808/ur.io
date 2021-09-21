import React from 'react'

interface Props {
  msg: string
}

const NotificationPanel: React.FC<Props> = ({ msg }) => {
  return <div>{msg}</div>
}

export { NotificationPanel }
