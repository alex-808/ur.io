type PlayerID = 0 | 1 | null
type GamePhase = 'rolling' | 'movement' | 'gameOver'
type TileType = 'normal' | 'rosette' | 'goal'

type handleTokenClick = (playerID: PlayerID, token: number | null) => void

interface PlayerI {
  tokens: number[]
  score: number
  id: PlayerID
}

interface GameI {
  players: Player[]
  phase: GamePhase
  activePlayer: number | null
  //TODO
}

interface TileI {
  oc: PlayerID
  token: number | null
  type: TileType
}