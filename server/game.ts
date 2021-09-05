// init
// updateGameState
class Player {
  score: number = 0;
  tokens: number[] = [0, 0, 0, 0, 0, 0, 0];
  id: null;
  selectedToken: number | null = null;
  incrementScore() {
    this.score++;
  }
  moveToken(rollVal: number) {
    this.tokens[this.selectedToken] += rollVal;
  }
  selectToken(i: number) {
    this.selectedToken = i;
  }
}

type gamePhase = 'rolling' | 'moving' | 'gameOver';

class Game {
  players: Player[] = [];
  // what will actually be passed to the clients to render
  state: {};
  phase: gamePhase = 'rolling';
  reset() {
    this.state = {};
  }
  checkForNoMoves() {
    //TODO
  }
  currentPlayer: Player = null;
}
