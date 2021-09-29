import React from 'react'
import * as api from '../api'
import { LandingPage } from './LandingPage'
import { WaitingRoom } from './WaitingRoom'
import { GameComponent } from './Game'
import { NotificationPanel } from './NotificationPanel'
import { LeaveButton } from './LeaveButton'

interface Props {
  gameState: GameI | null
  roomID: string | null
  notification: string
  highlightedTile: number | null
}

const View: React.FC<Props> = ({
  gameState,
  roomID,
  notification,
  highlightedTile,
}) => {
  let view
  if (!gameState && !roomID) {
    view = (
      <LandingPage
        createNewGame={api.handleCreateNewGame}
        joinGame={api.handleJoinGame}
      >
        <NotificationPanel
          notification={notification}
          gridPlacement={'bottom-center'}
        />
      </LandingPage>
    )
  } else if (!gameState && roomID) {
    view = (
      <WaitingRoom roomID={roomID}>
        <LeaveButton leaveGame={api.handleLeaveGame} />
        <NotificationPanel notification={notification} />
      </WaitingRoom>
    )
  } else if (gameState && roomID) {
    view = (
      <GameComponent
        notification={notification}
        gameState={gameState}
        handleTokenClick={api.handleTokenClick}
        handleTokenHover={api.handleTokenHover}
        highlightedTile={highlightedTile}
        rollDice={api.handleRollDice}
        resetGame={api.handleResetGame}
        leaveGame={api.handleLeaveGame}
      />
    )
  }
  return <>{view}</>
}

export { View }
