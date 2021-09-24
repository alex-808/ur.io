import * as constants from './constants';
class Game {
  players: Player[] = [];
  phase: GamePhase = 'rolling';
  activePlayer: Player | null = null;
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
  ];
  rollVal: number | null = null;
  gameWinners: number[] = [];
  AreNoMoves() {
    if (!this.activePlayer || !this.rollVal) return;
    let immovableTokens = 0;
    this.activePlayer.tokens.forEach((tokenPos) => {
      if (
        tokenPos + this.rollVal! > constants.GOAL_TILE ||
        this.activePlayer!.tokens.includes(tokenPos + this.rollVal!)
      ) {
        immovableTokens++;
      }
    });
    if (immovableTokens === this.activePlayer.tokens.length) return true;
    return false;
  }
  reset() {
    const winnerID = this.activePlayer!.id;
    this.gameWinners.push(winnerID!);
    console.table(this.gameWinners);
    this.players[0] = new Player(0);
    this.players[1] = new Player(1);
    this.rollVal = null;
    this.phase = 'rolling';
    if (this.gameWinners.length % 2) this.activePlayer = this.players[1];
    else this.activePlayer = this.players[0];
  }
  setActivePlayer() {
    //TODO
  }
  addPlayer() {
    if (this.players.length < 2) {
      const player = new Player(this.players.length as PlayerID);
      this.players.push(player);
      if (player.id === 0) this.activePlayer = player;
    }
  }
  rollDice() {
    console.log(this.phase);
    if (this.phase !== 'rolling') return;
    const val1 = Math.floor(Math.random() * 3);
    const val2 = Math.floor(Math.random() * 3);

    this.rollVal = val1 + val2;
    //this.rollVal = 0;
    return [val1, val2];
  }
  //TODO try to get this to be used in handleTokenClick
  isMovePossible(playerID: PlayerID, token: number | null) {
    if (
      playerID !== this.activePlayer?.id ||
      !this.rollVal ||
      token === null ||
      this.phase !== 'movement' ||
      !this.activePlayer
    ) {
      return false;
    }
    return true;
  }
  updateBoard() {
    for (let tile of this.board) {
      tile.oc = null;
      tile.token = null;
    }

    for (let player of this.players) {
      const path =
        player.id === 0 ? constants.PLAYER_0_PATH : constants.PLAYER_1_PATH;

      for (let tokenPos of player.tokens) {
        if (tokenPos === constants.PLAYER_START) continue;
        const boardVal = path.get(tokenPos);

        if (boardVal !== undefined) {
          this.board[boardVal].oc = player.id;
          this.board[boardVal].token = player.tokens.indexOf(tokenPos);
        }
      }
    }
  }
  checkForCaptures() {
    if (!this.activePlayer || !this.activePlayer.tokens) return;
    const opponent =
      this.activePlayer.id === 0 ? this.players[1] : this.players[0];

    for (let i = 0; i < this.activePlayer.tokens.length; i++) {
      const match = opponent.tokens.findIndex(
        (tokenPos) =>
          tokenPos >= constants.MIDLANE_START &&
          tokenPos <= constants.MIDLANE_END &&
          tokenPos === this.activePlayer!.tokens[i]
      );

      if (match !== -1) {
        opponent.tokens[match] = constants.PLAYER_START;
      }
    }
  }

  changeTurn() {
    console.log('turn changed');
    if (this.activePlayer === this.players[0])
      this.activePlayer = this.players[1];
    else this.activePlayer = this.players[0];
    this.phase = 'rolling';
  }
}
interface GameI extends Game {}

class Player implements PlayerI {
  constructor(public id: PlayerID) {}
  tokens = [
    constants.PLAYER_START,
    //constants.PLAYER_START,
    //constants.PLAYER_START,
    //constants.PLAYER_START,
    //constants.PLAYER_START,
    //constants.PLAYER_START,
    //constants.PLAYER_START,
  ];
  score: number = 0;
  scoreGoal() {
    this.tokens = this.tokens.filter(
      (tokenPos) => tokenPos !== constants.GOAL_TILE
    );
    this.score++;
  }
  moveToken(tokenIndex: number, rollVal: number) {
    const newPos = this.tokens[tokenIndex] + rollVal;
    if (this.tokens.includes(newPos) || newPos > constants.GOAL_TILE)
      return null;
    this.tokens[tokenIndex] = newPos;
    return newPos;
  }
}

export { Game, GameI };
