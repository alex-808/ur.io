import React, { useEffect, useRef } from 'react'
import { useState } from 'react'

interface Props {
  notification: string
}

const NotificationPanel: React.FC<Props> = ({ notification }) => {
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
  return <div className={`${className} centering`}>{notification}</div>
}

export { NotificationPanel }
