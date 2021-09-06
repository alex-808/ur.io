type Tile = 0 | 1 | null
type GamePhase = 'rolling' | 'movement' | 'gameOver'

interface PlayerI {
  tokens: number[]
  score: number
  id: number
}

interface GameI {
  players: Player[]
  phase: GamePhase
  activePlayer: number | null
  //TODO
}
