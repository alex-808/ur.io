class Game {
  players: Player[] = []
  phase: GamePhase = 'rolling'
  activePlayer: number | null = null
  board: Tile[] = [
    0,
    null,
    1,
    0,
    null,
    1,
    null,
    null,
    null,
    0,
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
  rollVal: number | null = null
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
    return [val1, val2]
  }
  updateBoard() {
    for (let player of this.players) {
      for (let token of player.tokens) {
        console.log(token)
      }
    }
  }
}
const player0Path = {
  '0': 9,
  '1': 6,
  '2': 3,
  '4': 0,
  '5': 1,
  '6': 4,
  '7': 7,
  '8': 10,
  '9': 13,
  '10': 16,
  '11': 19,
}
console.log(player0Path['0'])
class Player implements PlayerI {
  constructor(public id: number) {}
  tokens: number[] = [0, 10, 0, 7, 0, 0, 0]
  score: number = 0
  incrementScore() {
    this.score++
  }
  moveToken() {
    //TODO
  }
}

export { Game }
