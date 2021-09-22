import React from 'react'

interface Props {
  reset: () => void
}

const LeaveButton: React.FC<Props> = ({ reset }) => {
  return <button onClick={reset}>LeaveButton</button>
}

export { LeaveButton }
