import React from 'react'

interface Props {
  leaveGame: () => void
}

const LeaveButton: React.FC<Props> = ({ leaveGame }) => {
  return (
    <div className="centering">
      <button className="button centering" onClick={leaveGame}>
        <span className="material-icons leave-icon">logout</span>
        Leave Room
      </button>
    </div>
  )
}

export { LeaveButton }
