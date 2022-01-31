import React from 'react'
import ReactTooltip from 'react-tooltip'

const Help: React.FC = () => {
  return (
    <div className="help centering">
      <a className="tooltipBtn" data-tip data-for="rules">
        ?
      </a>
      <ReactTooltip className="tooltipText" id="rules" place="bottom">
        <span>How to Start:</span>
        <ol>
          <li>
            Start a new game and share the game code you receive with your
            opponent. The game starts when they join.
          </li>
          <li>
            If your opponent has already started a game, take their game code
            and enter it below then press 'Join Game' to get started.
          </li>
        </ol>
        <span>Game Rules:</span>
        <ol>
          <li>You win by getting all your pieces to the end of the board</li>
          <li>The die can only roll from 0 to 4</li>
          <li>A 0 rolled means that turn is skipped</li>
          <li>
            If you land on a rosette (yellow) tile, that token is protected and
            you get to roll again
          </li>
          <li>
            You can capture an opponent's pieces by placing your token where
            their token is if they are in the middle lane and aren't on a yellow
            tile
          </li>
        </ol>
      </ReactTooltip>
    </div>
  )
}

export default Help
