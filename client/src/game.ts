class Game {
  players: Player[] = []
  phase: GamePhase = 'rolling'
  activePlayer: number | null = null
  board: PlayerID[] = [
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
  ]
  rollVal: number | null = 0
  checkForNoMoves() {
    //TODO
  }
  reset() {
    //TODO
  }
  addPlayer() {
    if (this.players.length < 2) {
      const player = new Player(this.players.length as PlayerID)
      this.players.push(player)
    } else {
      // TODO emit 'too many players'
    }
  }
  rollDice() {
    const val1 = Math.floor(Math.random() * 3)
    const val2 = Math.floor(Math.random() * 3)

    this.rollVal = val1 + val2
    console.log('Dice rolled')
    return [val1, val2]
  }
  updateBoard() {
    for (let player of this.players) {
      const path = player.id === 0 ? player0Path : player1Path
      for (let tokenPos of player.tokens) {
        if (tokenPos === -1) continue
        const boardVal = path.get(tokenPos)
        if (boardVal !== undefined) {
          this.board[boardVal] = player.id
        }
      }
    }
  }
}

const player0Path = new Map([
  [0, 9],
  [1, 6],
  [2, 3],
  [3, 0],
  [4, 1],
  [5, 4],
  [6, 7],
  [7, 10],
  [8, 13],
  [9, 16],
  [10, 19],
  [11, 18],
  [12, 15],
  [13, 12],
])

const player1Path = new Map([
  [0, 11],
  [1, 8],
  [2, 5],
  [3, 2],
  [4, 1],
  [5, 4],
  [6, 7],
  [7, 10],
  [8, 13],
  [9, 16],
  [10, 19],
  [11, 20],
  [12, 17],
  [13, 14],
])
class Player implements PlayerI {
  constructor(public id: PlayerID) {}
  tokens = [-1, 10, -1, 7, -1, -1, -1]
  score: number = 0
  incrementScore() {
    this.score++
  }
  moveToken(tokenIndex: number, rollVal: number) {
    this.tokens[tokenIndex] += rollVal
    console.log(this.tokens)
  }
}

export { Game }
