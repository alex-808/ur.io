import React from 'react'

interface Props {
  roomID: string
}

const WaitingRoom: React.FC<Props> = ({ roomID, children }) => {
  return (
    <>
      {children}
      <div data-testid="waiting-room" className="waiting-header">
        Waiting for partner
      </div>
      <span className="waiting-room">
        <div>Game code:</div>
        <span data-testid="roomID" className="roomID">
          {roomID}
        </span>
      </span>
    </>
  )
}

export { WaitingRoom }
export type { Props }
