<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>Tic Tac Toe</title>
	<style type="text/css">
		.app {
			font-family: arial, sans-serif;
		}

		.app, .board, .endGame .player {
			display: flex;
			align-items: center;
			justify-content: center;
		}

		p {
			margin-top: 1em;
			margin-bottom: 1em;
		}

		.stepCounter {
			margin-top: 5px;
			display: none;
		}

		.header {
			margin-top: 15px;
			font-size: 24px;
		}

		.statusLabel {
			display: block;
			text-align: center;
			font-size: 18px;
		}

		.turnLabel, .board td, .endGame .player, .endGame .status {
			text-transform: uppercase;
		}

		.header, .turnLabel, .reset-btn {
			font-weight: 600;
		}

		.board table {
			border-spacing: 0;
			border-collapse: collapse;
			background-color: #ffeb94;
			border: 0;
		}

		.board td {
			width: 100px;
			height: 100px;
			text-align: center;
			vertical-align: middle;
			font-size: 84px;
			border: 8px solid #fdd475;
		}

		.board tr:first-child td {
			border-top: 0;
		}

		.board tr:last-child td {
			border-bottom: 0;
		}

		.board td:first-child {
			border-left: 0;
		}

		.board td:last-child {
			border-right: 0;
		}

		.empty-box:hover {
			background-color: #f9ca5e;
		}

		.player-box-0 {
			color: #f7b288;
		}

		.player-box-1 {
			color: #92cec5;
		}

		.endGame {
			background-color: #ffeb94;
			color: #666e7a;
			padding: 10px 0 10px 0;
			margin-top: 1em;
		}

		.endGame .player {
			font-size: 72px;
			font-weight: 600;
		}

		.endGame .status {
			text-align: center;
			font-size: 24px;
		}

		.reset-btn {
			text-align: center;
			margin-top: 15px;
			color: #ffb100;
		}

		.reset-btn span:hover {
			cursor: pointer;
		}
	</style>
</head>
<body>
	<!-- 
		@dev Krisno Sotanto (sotanto.k@gmail.com)
		Program Tic Tac Toe
		using React.js & Babel
		for development purpose only, don't use this in production

		Note: this page is a great way to try React but it's not suitable for production.
		It slowly compiles JSX with Babel in the browser and uses a large development build of React.

		Read this section for a production-ready setup with JSX:
		https://reactjs.org/docs/add-react-to-a-website.html#add-jsx-to-a-project

		In a larger project, you can use an integrated toolchain that includes JSX instead:
		https://reactjs.org/docs/create-a-new-react-app.html

		You can also use React without JSX, in which case you can remove Babel:
		https://reactjs.org/docs/react-without-jsx.html
	-->

    <div id="root" class="app"></div>

    <!-- Load React & Babel for JSX -->
    <script src="./library/react.development.js"></script>
    <script src="./library/react-dom.development.js"></script>
    
    <!-- In Browser Babel Transformer -->
    <!-- <script src="./library/babel.min.js"></script>
	<script type="text/babel" src="http://localhost/tictactoe/index.development.js"></script> -->
	
	<!-- Precompiled Babel Script -->
    <script src="http://localhost/tictactoe/index.prod.js"></script>
</body>
</html>