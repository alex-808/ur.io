type PlayerID = 0 | 1 | null
type GamePhase = 'rolling' | 'movement' | 'gameOver'
type TileType = 'normal' | 'rosette' | 'goal'

type handleTokenEvent = (playerID: PlayerID, token: number | null) => void

interface PlayerI {
  tokens: number[]
  score: number
  id: PlayerID
}

interface GameI {
  players: PlayerI[]
  phase: GamePhase
  activePlayer: PlayerI | null
  board: TileI[]
  rollVal: number
  gameWinners: number[]
}

interface TileI {
  oc: PlayerID
  token: number | null
  type: TileType
}
