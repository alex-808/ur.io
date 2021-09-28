import React, { useEffect, useRef } from 'react'
import { useState } from 'react'

interface Props {
  notification: string
  gridPlacement?: string
}

const NotificationPanel: React.FC<Props> = ({
  notification,
  gridPlacement = 'top-center',
}) => {
  const [className, setClassName] = useState('notification-panel')
  const notificationRef = useRef('')
  useEffect(() => {
    if (notification !== notificationRef.current) {
      setClassName('notification-panel-active')
      notificationRef.current = notification
      setTimeout(() => {
        setClassName('notification-panel')
      }, 1000)
    } else {
      setClassName('notification-panel')
    }
  }, [notification])
  return (
    <div
      className={`${className} centering`}
      style={{ gridArea: `${gridPlacement}` }}
    >
      {notification}
    </div>
  )
}

export { NotificationPanel }
