type Tile = 0 | 1 | null
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
    null,
  ]
  checkForNoMoves() {
    //TODO
  }
  reset() {
    //TODO
  }
}

class Player {
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
