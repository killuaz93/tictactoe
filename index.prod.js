var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var App = function (_React$Component) {
	_inherits(App, _React$Component);

	function App(props) {
		_classCallCheck(this, App);

		var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

		_this.state = {
			isPlay: true,
			currTurn: 0,
			emptyBox: '',
			players: ['x', 'o'],
			size: 3,
			field: [],
			stepsCount: 0,
			endPlayer: '',
			endStatus: ''
		};
		_this.playerMove = _this.playerMove.bind(_this);
		_this.isEmptyBox = _this.isEmptyBox.bind(_this);
		_this.resetGame = _this.resetGame.bind(_this);
		return _this;
	}

	_createClass(App, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			this.initField();
		}
	}, {
		key: 'initField',
		value: function initField() {
			var _this2 = this;

			this.setState(function () {
				var tempField = [];
				for (var row = 0; row < _this2.state.size; row++) {
					var temp = [];
					for (var col = 0; col < _this2.state.size; col++) {
						temp.push(_this2.state.emptyBox);
					}
					tempField.push(temp);
				}
				return { field: tempField };
			});
		}
	}, {
		key: 'resetGame',
		value: function resetGame() {
			this.initField();
			this.setState({ currTurn: 0, isPlay: true, stepsCount: 0, endPlayer: '', endStatus: '' });
		}
	}, {
		key: 'getWinNum',
		value: function getWinNum() {
			return this.state.size > 5 ? 5 : this.state.size;
		}
	}, {
		key: 'isEmptyBox',
		value: function isEmptyBox(val) {
			return val === this.state.emptyBox;
		}
	}, {
		key: 'nextPlayerTurn',
		value: function nextPlayerTurn() {
			if (typeof this.state.players[parseInt(this.state.currTurn) + 1] !== 'undefined') {
				return parseInt(this.state.currTurn) + 1;
			} else {
				return 0;
			}
		}
	}, {
		key: 'prevPlayerTurn',
		value: function prevPlayerTurn() {
			if (typeof this.state.players[parseInt(this.state.currTurn) - 1] !== 'undefined') {
				return parseInt(this.state.currTurn) - 1;
			} else {
				return this.state.players.length - 1;
			}
		}
	}, {
		key: 'endGame',
		value: function endGame(endPlayer, endStatus) {
			this.setState({ isPlay: false, endPlayer: endPlayer, endStatus: endStatus });
		}
	}, {
		key: 'evaluateField',
		value: function evaluateField(row, col, evalTurn) {
			// typecast col and row to integer
			row = parseInt(row);
			col = parseInt(col);

			var strikeCount = 1,
			    strikePrev = true,
			    strikeNext = true;

			// evaluate horizontal
			for (var n = 1; n < this.getWinNum(); n++) {
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
				} else if (!strikePrev && !strikeNext) {
					break;
				}
			}

			strikeCount = 1, strikePrev = true, strikeNext = true;
			// evaluate vertical
			for (var _n = 1; _n < this.getWinNum(); _n++) {
				// evaluate previous box
				if (strikePrev) {
					if (typeof this.state.field[row - _n] !== 'undefined' && this.state.field[row - _n][col] === evalTurn) {
						strikeCount++;
					} else {
						strikePrev = false;
					}
				}

				// evaluate next box
				if (strikeNext) {
					if (typeof this.state.field[row + _n] !== 'undefined' && this.state.field[row + _n][col] === evalTurn) {
						strikeCount++;
					} else {
						strikeNext = false;
					}
				}

				// evaluate strike
				if (strikeCount >= this.getWinNum()) {
					this.endGame(this.state.players[evalTurn], 'win');
					return true;
				} else if (!strikePrev && !strikeNext) {
					break;
				}
			}

			strikeCount = 1, strikePrev = true, strikeNext = true;
			// evaluate diagonal left -> right
			for (var _n2 = 1; _n2 < this.getWinNum(); _n2++) {
				// evaluate previous box
				if (strikePrev) {
					if (typeof this.state.field[row - _n2] !== 'undefined' && typeof this.state.field[row - _n2][col - _n2] !== 'undefined' && this.state.field[row - _n2][col - _n2] === evalTurn) {
						strikeCount++;
					} else {
						strikePrev = false;
					}
				}

				// evaluate next box
				if (strikeNext) {
					if (typeof this.state.field[row + _n2] !== 'undefined' && typeof this.state.field[row + _n2][col + _n2] !== 'undefined' && this.state.field[row + _n2][col + _n2] === evalTurn) {
						strikeCount++;
					} else {
						strikeNext = false;
					}
				}

				// evaluate strike
				if (strikeCount >= this.getWinNum()) {
					this.endGame(this.state.players[evalTurn], 'win');
					return true;
				} else if (!strikePrev && !strikeNext) {
					break;
				}
			}

			strikeCount = 1, strikePrev = true, strikeNext = true;
			// evaluate diagonal right -> left
			for (var _n3 = 1; _n3 < this.getWinNum(); _n3++) {
				// evaluate previous box
				if (strikePrev) {
					if (typeof this.state.field[row - _n3] !== 'undefined' && typeof this.state.field[row - _n3][col + _n3] !== 'undefined' && this.state.field[row - _n3][col + _n3] === evalTurn) {
						strikeCount++;
					} else {
						strikePrev = false;
					}
				}

				// evaluate next box
				if (strikeNext) {
					if (typeof this.state.field[row + _n3] !== 'undefined' && typeof this.state.field[row + _n3][col - _n3] !== 'undefined' && this.state.field[row + _n3][col - _n3] === evalTurn) {
						strikeCount++;
					} else {
						strikeNext = false;
					}
				}

				// evaluate strike
				if (strikeCount >= this.getWinNum()) {
					this.endGame(this.state.players[evalTurn], 'win');
					return true;
				} else if (!strikePrev && !strikeNext) {
					break;
				}
			}

			if (this.state.stepsCount >= Math.pow(this.state.size, 2)) {
				this.endGame('draw', 'draw');
				return true;
			}

			return false;
		}
	}, {
		key: 'playerMove',
		value: function playerMove(row, col) {
			var _this3 = this;

			if (this.isEmptyBox(this.state.field[row][col]) && this.state.isPlay) {
				var newField = this.state.field;
				var evalTurn = this.state.currTurn;
				var stepsCount = this.state.stepsCount;
				newField[row][col] = evalTurn;
				this.setState({ field: newField, currTurn: this.nextPlayerTurn(), stepsCount: stepsCount + 1 }, function () {
					return _this3.evaluateField(row, col, evalTurn);
				});
			}
		}
	}, {
		key: 'render',
		value: function render() {
			var game = React.createElement(
				'div',
				null,
				React.createElement(
					'p',
					{ className: 'statusLabel' },
					'Turn ',
					React.createElement(
						'span',
						{ className: 'turnLabel' },
						this.state.players[this.state.currTurn]
					)
				),
				React.createElement(Board, { field: this.state.field, players: this.state.players, playerMove: this.playerMove, isEmptyBox: this.isEmptyBox, getCurrTurn: this.getCurrTurn })
			);

			if (!this.state.isPlay) {
				var game = React.createElement(
					'div',
					{ className: 'endGame' },
					React.createElement(
						'p',
						{ className: 'statusLabel' },
						React.createElement(
							'span',
							{ className: 'turnLabel' },
							'Finish'
						)
					),
					React.createElement(
						'div',
						null,
						React.createElement(
							'div',
							{ className: 'player' },
							React.createElement(
								'div',
								{ className: this.state.endStatus === 'draw' ? '' : 'player-box-' + this.prevPlayerTurn() },
								this.state.endPlayer
							)
						),
						React.createElement(
							'div',
							{ className: 'status' },
							this.state.endStatus,
							' !'
						)
					)
				);
			}

			return React.createElement(
				'div',
				null,
				React.createElement(
					'div',
					{ className: 'header' },
					'Welcome to Tictactoe, let\'s play !'
				),
				React.createElement(
					'div',
					{ className: 'stepCounter' },
					'Step Counter : ',
					this.state.stepsCount
				),
				game,
				React.createElement(
					'div',
					{ className: 'reset-btn' },
					React.createElement(
						'span',
						{ onClick: this.resetGame },
						'RESET GAME'
					)
				)
			);
		}
	}]);

	return App;
}(React.Component);

var Board = function (_React$Component2) {
	_inherits(Board, _React$Component2);

	function Board() {
		_classCallCheck(this, Board);

		return _possibleConstructorReturn(this, (Board.__proto__ || Object.getPrototypeOf(Board)).apply(this, arguments));
	}

	_createClass(Board, [{
		key: 'render',
		value: function render() {
			var _this5 = this;

			var rows = [];

			var _loop = function _loop(rowIdx) {
				var cols = [];

				var _loop2 = function _loop2(colIdx) {
					cols.push(React.createElement(
						'td',
						{
							key: rowIdx + colIdx,
							className: _this5.props.isEmptyBox(_this5.props.field[rowIdx][colIdx]) ? 'empty-box' : 'player-box-' + _this5.props.field[rowIdx][colIdx],
							onClick: function onClick() {
								return _this5.props.playerMove(rowIdx, colIdx);
							} },
						_this5.props.players[_this5.props.field[rowIdx][colIdx]]
					));
				};

				for (var colIdx in _this5.props.field[rowIdx]) {
					_loop2(colIdx);
				}
				rows.push(React.createElement(
					'tr',
					{ key: rowIdx },
					cols
				));
			};

			for (var rowIdx in this.props.field) {
				_loop(rowIdx);
			}

			return React.createElement(
				'div',
				{ className: 'board' },
				React.createElement(
					'table',
					null,
					React.createElement(
						'tbody',
						null,
						rows
					)
				)
			);
		}
	}]);

	return Board;
}(React.Component);

ReactDOM.render(React.createElement(App, null), document.getElementById('root'));
