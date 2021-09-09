class Game {
  players: Player[] = []
  phase: GamePhase = 'rolling'
  activePlayer: Player | null = null
  board: TileI[] = [
    {
      oc: null,
      token: null,
      type: 'rosette',
    },
    {
      oc: null,
      token: null,
      type: 'normal',
    },
    {
      oc: null,
      token: null,
      type: 'rosette',
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
      type: 'rosette',
    },
    {
      oc: null,
      token: null,
      type: 'normal',
    },
    {
      oc: null,
      token: null,
      type: 'goal',
    },
    {
      oc: null,
      token: null,
      type: 'normal',
    },
    {
      oc: null,
      token: null,
      type: 'goal',
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
      type: 'rosette',
    },
    {
      oc: null,
      token: null,
      type: 'normal',
    },
    {
      oc: null,
      token: null,
      type: 'rosette',
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
      this.activePlayer = player
    } else {
      // TODO emit 'too many players'
    }
  }
  rollDice() {
    console.log(this.phase)
    if (this.phase !== 'rolling') return
    const val1 = Math.floor(Math.random() * 3)
    const val2 = Math.floor(Math.random() * 3)

    this.rollVal = val1 + val2
    if (this.rollVal !== 0) {
      this.phase = 'movement'
    } else {
      this.changeTurn()
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
  changeTurn() {
    console.log('turn changed')
    if (this.activePlayer === this.players[0])
      this.activePlayer = this.players[1]
    else this.activePlayer = this.players[0]
    this.phase = 'rolling'
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
  tokens = [12, -1, -1, -1, -1, -1, -1]
  score: number = 0
  scoreGoal() {
    this.tokens = this.tokens.filter(tokenPos => tokenPos !== 13)
    console.log(this.tokens)
    this.score++
  }
  moveToken(tokenIndex: number, rollVal: number) {
    const newPos = this.tokens[tokenIndex] + rollVal
    if (this.tokens.includes(newPos) || newPos > 13) return null
    this.tokens[tokenIndex] = newPos
    console.log(this.tokens[tokenIndex])
    return newPos
  }
}

export { Game }
