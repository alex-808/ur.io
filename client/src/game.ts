class Game {
  players: Player[] = []
  phase: GamePhase = 'rolling'
  activePlayer: number | null = null
  board: Tile[] = [
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
      const player = new Player(this.players.length)
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
      for (let token of player.tokens) {
        //console.log({ token }, player.id)
        if (!token) continue

        const boardVal = player0Path.get(token)
        console.log(boardVal)
        if (boardVal) {
          this.board[boardVal] = 1
        }
      }
    }
  }
}
const player0Path = new Map([
  [0, 9],
  [1, 6],
  [2, 3],
  [4, 0],
  [5, 1],
  [6, 4],
  [7, 7],
  [8, 10],
  [9, 13],
  [10, 16],
  [11, 19],
])

class Player implements PlayerI {
  constructor(public id: number) {}
  tokens = [null, 10, null, 7, null, null, null]
  score: number = 0
  incrementScore() {
    this.score++
  }
  moveToken() {
    //TODO
  }
}

export { Game }
