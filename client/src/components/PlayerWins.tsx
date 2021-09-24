import React from 'react'

interface Props {
  player: PlayerI
  gameWinners: number[]
}

const PlayerWins: React.FC<Props> = ({ player, gameWinners }) => {
  const calcWinCount = (playerID: number, gameWinnersArr: number[]) => {
    let winCount = 0
    gameWinnersArr.forEach(winner => {
      if (winner === playerID) {
        winCount++
      }
    })
    return winCount
  }

  const winCount = calcWinCount(player.id!, gameWinners)

  return <p className={`Player${player.id}Wins`}>Wins: {winCount}</p>
}

export { PlayerWins }
