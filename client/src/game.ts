class Game {
  players: Player[] = []
  phase: GamePhase = 'rolling'
  activePlayer: number | null = null
  board: Tile[] = [
    null,
    1,
    null,
    null,
    null,
    null,
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
}

class Player implements PlayerI {
  constructor(public id: number) {}
  tokens: number[] = [0, 0, 0, 0, 0, 0, 0]
  score: number = 0
  incrementScore() {
    this.score++
  }
  moveToken() {
    //TODO
  }
}

export { Game }
