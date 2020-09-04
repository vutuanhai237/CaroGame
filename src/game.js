import React, { Component } from "react";
import Board from './board';
import './index.css'
const defaultWidth = 30;
const defaultHeight = 30;
const minSize = 5;
const maxSize = 300;
const nSquareToWin = 5;
function calculateWinner(squares) {
    let win;
    for (let i = 0; i < squares.length; i++) {
        for (let j = 0; j < squares[i].length; j++) {
            if (!squares[i][j]) continue;
            if (j <= squares[i].length - nSquareToWin) {
                win = true;
                for (let k = 0; k < nSquareToWin - 1; k++) {
                    if (squares[i][j + k] !== squares[i][j + k + 1]) {
                        win = false
                    }
                }
                if (win) return { val: squares[i][j], x: j, y: i, direction: 'ToRight' };
            }
            if (i <= squares.length - nSquareToWin) {
                win = true;
                for (let k = 0; k < nSquareToWin - 1; k++) {
                    if (squares[i + k][j] !== squares[i + k + 1][j]) {
                        win = false
                    }
                }
                if (win) return { val: squares[i][j], x: j, y: i, direction: 'ToDown' };
            }
            if (j <= squares[i].length - nSquareToWin && i <= squares.length - nSquareToWin) {
                win = true;
                for (let k = 0; k < nSquareToWin - 1; k++) {
                    if (squares[i + k][j + k] !== squares[i + k + 1][j + k + 1]) {
                        win = false
                    }
                }
                if (win) return { val: squares[i][j], x: j, y: i, direction: 'ToRightDown' };
            }
            if (i <= squares.length - nSquareToWin && j >= nSquareToWin - 1) {
                win = true;
                for (let k = 0; k < nSquareToWin - 1; k++) {
                    if (squares[i + k][j - k] !== squares[i + k + 1][j - k - 1]) {
                        win = false
                    }
                }
                if (win) return { val: squares[i][j], x: j, y: i, direction: 'ToLeftDown' };
            }
        }
    }
    return null;
}

class Game extends Component {
    constructor(props) {
        super(props);
        let tmpArr = Array(defaultHeight);
        for (let i = 0; i < defaultHeight; i++) {
            tmpArr[i] = Array(defaultWidth).fill(null);
        }
        this.state = {
            inputWidth: defaultWidth,
            inputHeight: defaultHeight,
            width: defaultWidth,
            height: defaultHeight,
            history: [{
                squares: tmpArr,
                location: null,
            }],
            stepNumber: 0,
            xIsNext: true,
            isDescending: true,
            time: "00:00",
            isDraw: false,
        };
        this.handleChangeHeight = this.handleChangeHeight.bind(this);
        this.handleChangeWidth = this.handleChangeWidth.bind(this);
    
    }

    componentDidMount() {
        this.setTime();
    }
    setTime() {
        var second = 0;
        var minute = 0;
        var clock = setInterval(() => {
            second = second + 1;
            
            if (second == 60) {
                second = 0;
                minute = minute + 1;
                if (minute === 20) {
                    this.setState({
                        isDraw: true,
                    })
                }
            }

            if (minute == 60) {
                minute = 0;
                
            }

            this.setState({
                time: (minute < 10 ? "0" + minute : minute) + ":" + (second < 10 ? "0" + second : second)
            });
            const history = this.state.history;
            const current = history[this.state.stepNumber];
            const winner = calculateWinner(current.squares);
            if (winner || this.state.isDraw) {
                clearInterval(clock);
            }
        }, 1000)
    }


    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
        })
    }

    handleClick(i, j) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[this.state.stepNumber];
        const squares = current.squares.slice();
        current.squares.map((row, idx) => {
            squares[idx] = current.squares[idx].slice();
            return true;
        })
        if (calculateWinner(squares) || squares[i][j]) {
            return;
        }
        squares[i][j] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history: history.concat([{
                squares: squares,
                location: { x: i, y: j }
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
        });
    }

    handleChangeWidth(e) {
        const val = Number(e.target.value);
        this.setState({ inputWidth: val });
        if (val >= minSize && val <= maxSize) {
            let tmpArr = Array(this.state.height);
            for (let i = 0; i < this.state.height; i++) {
                tmpArr[i] = Array(val).fill(null);
            }
            this.setState({
                width: val,
                history: [{
                    squares: tmpArr,
                    location: null,
                }],
                stepNumber: 0,
                xIsNext: true,
            });
        }
    }

    handleChangeHeight(e) {
        const val = Number(e.target.value);
        this.setState({ inputHeight: val });
        if (val >= minSize && val <= maxSize) {
            let tmpArr = Array(val);
            for (let i = 0; i < val; i++) {
                tmpArr[i] = Array(this.state.width).fill(null);
            }
            this.setState({
                height: Number(val),
                history: [{
                    squares: tmpArr,
                    location: null,
                }],
                stepNumber: 0,
                xIsNext: true,
            });
        }
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);
        let status;
        if (winner || this.state.isDraw) {
            console.log(this.props.playerO)
            if (this.state.isDraw) {
                status = `Trận đấu này hòa`;
     
            } else if (winner.val === 'X') {
                console.log(this.state.time)
                status = `Người chiến thắng là: ${this.props.playerX}, thời gian chơi: ${this.state.time}`;
            } else {
                status = `Người chiến thắng là: ${this.props.playerO}, thời gian chơi: ${this.state.time}`;
            }
        } else {
            status = `Đi lượt kết tiếp: ${this.state.xIsNext ? 'X' : 'O'}`;
        }
        return (

            <div className="content">
                <p>{`Thời gian ${this.state.time}`}</p>
                <div className="game-config">
                    <span className="fixed-size">Chiều rộng:</span>
                    <input type="number" placeholder="Chiều rộng" value={this.state.inputWidth} onChange={this.handleChangeWidth} />
                    <br />
                    <span className="fixed-size">Chiều cao:</span>
                    <input type="number" placeholder="Chiều cao" value={this.state.inputHeight} onChange={this.handleChangeHeight} />
                    <br />
                    <p className="turn">{status}</p>
                </div>
                <div className="game">
                    <div className="game-board">
                        <Board squares={current.squares} onClick={(i, j) => this.handleClick(i, j)} winner={winner} />
                    </div>
                </div>
            </div>
        );
    }
}


export default Game;