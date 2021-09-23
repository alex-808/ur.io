import React from 'react'

interface Props {
  leaveGame: () => void
}

const LeaveButton: React.FC<Props> = ({ leaveGame }) => {
  return (
    <div className="centering">
      <button className="button" onClick={leaveGame}>
        LeaveButton
      </button>
    </div>
  )
}

export { LeaveButton }
