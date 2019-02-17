class App extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			isPlay: true,
			currTurn: 0,
			emptyBox: '',
			players: [
				'x', 'o'
			],
			size: 3,
			field: [],
			stepsCount: 0,
			endPlayer: '',
			endStatus: ''
		};
		this.playerMove = this.playerMove.bind(this);
		this.isEmptyBox = this.isEmptyBox.bind(this);
		this.resetGame = this.resetGame.bind(this);
	}

	componentDidMount () {
		this.initField();
	}

	initField () {
		this.setState(() => {
			let tempField = [];
			for (let row = 0; row < this.state.size; row++) {
				let temp = [];
				for (let col = 0; col < this.state.size; col++) {
					temp.push(this.state.emptyBox);
				}
				tempField.push(temp);
			}
			return { field : tempField }
		});
	}

	resetGame () {
		this.initField();
		this.setState({ currTurn: 0, isPlay: true, stepsCount: 0, endPlayer: '', endStatus: '' });
	}

	getWinNum () {
		return this.state.size > 5 ? 5 : this.state.size;
	}

	isEmptyBox (val) {
		return val === this.state.emptyBox;
	}

	nextPlayerTurn () {
		if (typeof this.state.players[parseInt(this.state.currTurn) + 1] !== 'undefined') {
			return parseInt(this.state.currTurn) + 1;
		} else {
			return 0;
		}
	}

	prevPlayerTurn () {
		if (typeof this.state.players[parseInt(this.state.currTurn) - 1] !== 'undefined') {
			return parseInt(this.state.currTurn) - 1;
		} else {
			return this.state.players.length - 1;
		}
	}

	endGame (endPlayer, endStatus) {
		this.setState({ isPlay: false, endPlayer, endStatus });
	}

	evaluateField (row, col, evalTurn) {
		// typecast col and row to integer
		row = parseInt(row);
		col = parseInt(col);

		let strikeCount = 1, strikePrev = true, strikeNext = true;

		// evaluate horizontal
		for (let n = 1; n < this.getWinNum(); n++) {
			// evaluate previous box
			if (strikePrev) {
				if (typeof this.state.field[row][col - n] !== 'undefined' && this.state.field[row][col - n] === evalTurn) {
					strikeCount++;
				} else {
					strikePrev = false;
				}
			}
			
			// evaluate next box
			if (strikeNext) {
				if (typeof this.state.field[row][col + n] !== 'undefined' && this.state.field[row][col + n] === evalTurn) {
					strikeCount++;
				} else {
					strikeNext = false;
				}
			}

			// evaluate strike
			if (strikeCount >= this.getWinNum()) {
				this.endGame(this.state.players[evalTurn], 'win');
				return true;
			}else if (!strikePrev && !strikeNext) {
				break;
			}
		}

		strikeCount = 1, strikePrev = true, strikeNext = true;
		// evaluate vertical
		for (let n = 1; n < this.getWinNum(); n++) {
			// evaluate previous box
			if (strikePrev) {
				if (typeof this.state.field[row - n] !== 'undefined' && this.state.field[row - n][col] === evalTurn) {
					strikeCount++;
				} else {
					strikePrev = false;
				}
			}
			
			// evaluate next box
			if (strikeNext) {
				if (typeof this.state.field[row + n] !== 'undefined' && this.state.field[row + n][col] === evalTurn) {
					strikeCount++;
				} else {
					strikeNext = false;
				}
			}

			// evaluate strike
			if (strikeCount >= this.getWinNum()) {
				this.endGame(this.state.players[evalTurn], 'win');
				return true;
			}else if (!strikePrev && !strikeNext) {
				break;
			}
		}

		strikeCount = 1, strikePrev = true, strikeNext = true;
		// evaluate diagonal left -> right
		for (let n = 1; n < this.getWinNum(); n++) {
			// evaluate previous box
			if (strikePrev) {
				if (typeof this.state.field[row - n] !== 'undefined' && typeof this.state.field[row - n][col - n] !== 'undefined' && this.state.field[row - n][col - n] === evalTurn) {
					strikeCount++;
				} else {
					strikePrev = false;
				}
			}
			
			// evaluate next box
			if (strikeNext) {
				if (typeof this.state.field[row + n] !== 'undefined' && typeof this.state.field[row + n][col + n] !== 'undefined' && this.state.field[row + n][col + n] === evalTurn) {
					strikeCount++;
				} else {
					strikeNext = false;
				}
			}

			// evaluate strike
			if (strikeCount >= this.getWinNum()) {
				this.endGame(this.state.players[evalTurn], 'win');
				return true;
			}else if (!strikePrev && !strikeNext) {
				break;
			}
		}

		strikeCount = 1, strikePrev = true, strikeNext = true;
		// evaluate diagonal right -> left
		for (let n = 1; n < this.getWinNum(); n++) {
			// evaluate previous box
			if (strikePrev) {
				if (typeof this.state.field[row - n] !== 'undefined' && typeof this.state.field[row - n][col + n] !== 'undefined' && this.state.field[row - n][col + n] === evalTurn) {
					strikeCount++;
				} else {
					strikePrev = false;
				}
			}
			
			// evaluate next box
			if (strikeNext) {
				if (typeof this.state.field[row + n] !== 'undefined' && typeof this.state.field[row + n][col - n] !== 'undefined' && this.state.field[row + n][col - n] === evalTurn) {
					strikeCount++;
				} else {
					strikeNext = false;
				}
			}

			// evaluate strike
			if (strikeCount >= this.getWinNum()) {
				this.endGame(this.state.players[evalTurn], 'win');
				return true;
			}else if (!strikePrev && !strikeNext) {
				break;
			}
		}

		if (this.state.stepsCount >= Math.pow(this.state.size, 2)) {
			this.endGame('draw', 'draw');
			return true;
		}

		return false;
	}

	playerMove (row, col) {
		if (this.isEmptyBox(this.state.field[row][col]) && this.state.isPlay) {
			let newField = this.state.field;
			let evalTurn = this.state.currTurn
			let stepsCount = this.state.stepsCount
			newField[row][col] = evalTurn;
			this.setState ({ field: newField, currTurn: this.nextPlayerTurn(), stepsCount: stepsCount + 1 }, () => this.evaluateField(row, col, evalTurn));
		}
	}

	render () {
		var game = <div><p className="statusLabel">Turn <span className="turnLabel">{this.state.players[this.state.currTurn]}</span></p>
				<Board field={this.state.field} players={this.state.players} playerMove={this.playerMove} isEmptyBox={this.isEmptyBox} getCurrTurn={this.getCurrTurn} /></div>;
		
		if (!this.state.isPlay) {
			var game = <div className="endGame"><p className="statusLabel"><span className="turnLabel">Finish</span></p>
				<div>
					<div className="player">
						<div className={this.state.endStatus === 'draw' ? '': 'player-box-' + this.prevPlayerTurn()}>{this.state.endPlayer}</div>
					</div>
					<div className="status">{this.state.endStatus} !</div>
				</div></div>;
		}

		return (
			<div>
				<div className="header">Welcome to Tictactoe, let's play !</div>
				<div className="stepCounter">Step Counter : {this.state.stepsCount}</div>
				{ game }
				<div className="reset-btn"><span onClick={this.resetGame}>RESET GAME</span></div>
			</div>
		);
	}
}

class Board extends React.Component {
	render () {
		let rows = [];
		for (let rowIdx in this.props.field) {
			let cols = [];
			for (let colIdx in this.props.field[rowIdx]) {
				cols.push(
					<td
						key={rowIdx + colIdx}
						className={this.props.isEmptyBox(this.props.field[rowIdx][colIdx]) ? 'empty-box' : 'player-box-'+this.props.field[rowIdx][colIdx]}
						onClick={() => this.props.playerMove(rowIdx, colIdx)} >
							{this.props.players[this.props.field[rowIdx][colIdx]]}
					</td>);
			}
			rows.push(<tr key={rowIdx}>{cols}</tr>);
		}

		return (
			<div className="board">
				<table><tbody>{rows}</tbody></table>
			</div>
		);
	}
}

ReactDOM.render(<App />, document.getElementById('root'));
