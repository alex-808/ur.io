class Game {
  players: Player[] = []
  phase: GamePhase = 'rolling'
  activePlayer: number = 0
  board: TileI[] = [
    {
      oc: null,
      token: null,
      type: 'normal',
    },
    {
      oc: null,
      token: null,
      type: 'normal',
    },
    {
      oc: null,
      token: null,
      type: 'normal',
    },
    {
      oc: null,
      token: null,
      type: 'normal',
    },
    {
      oc: null,
      token: null,
      type: 'normal',
    },
    {
      oc: null,
      token: null,
      type: 'normal',
    },
    {
      oc: null,
      token: null,
      type: 'normal',
    },
    {
      oc: null,
      token: null,
      type: 'normal',
    },
    {
      oc: null,
      token: null,
      type: 'normal',
    },
    {
      oc: null,
      token: null,
      type: 'normal',
    },
    {
      oc: null,
      token: null,
      type: 'normal',
    },
    {
      oc: null,
      token: null,
      type: 'normal',
    },
    {
      oc: null,
      token: null,
      type: 'normal',
    },
    {
      oc: null,
      token: null,
      type: 'normal',
    },
    {
      oc: null,
      token: null,
      type: 'normal',
    },
    {
      oc: null,
      token: null,
      type: 'normal',
    },
    {
      oc: null,
      token: null,
      type: 'normal',
    },
    {
      oc: null,
      token: null,
      type: 'normal',
    },
    {
      oc: null,
      token: null,
      type: 'normal',
    },
    {
      oc: null,
      token: null,
      type: 'normal',
    },
    {
      oc: null,
      token: null,
      type: 'normal',
    },
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
    if (this.phase !== 'rolling') return
    const val1 = Math.floor(Math.random() * 3)
    const val2 = Math.floor(Math.random() * 3)

    this.rollVal = val1 + val2
    if (this.rollVal !== 0) {
      this.phase = 'movement'
    }
    return [val1, val2]
  }
  updateBoard() {
    for (let tile of this.board) {
      tile.oc = null
      tile.token = null
    }
    for (let player of this.players) {
      const path = player.id === 0 ? player0Path : player1Path
      for (let tokenPos of player.tokens) {
        if (tokenPos === -1) continue
        const boardVal = path.get(tokenPos)
        if (boardVal !== undefined) {
          this.board[boardVal].oc = player.id
          this.board[boardVal].token = player.tokens.indexOf(tokenPos)
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
  tokens = [-1, -1, -1, -1, -1, -1, -1]
  score: number = 0
  incrementScore() {
    this.score++
  }
  moveToken(tokenIndex: number, rollVal: number) {
    this.tokens[tokenIndex] += rollVal
    console.log(this.tokens)
  }
  getTokenIndex(tile: number) {
    const path = this.id === 0 ? player0Path : player1Path
    let tiles = path.entries()
    console.log(tiles)
  }
}

export { Game }
