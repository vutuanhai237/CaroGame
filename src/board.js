import React, { Component } from "react";
import SquareRow, {Square} from './squareRow';
const defaultWidth = 30;
const defaultHeight = 30;
const minSize = 5;
const maxSize = 300;
const nSquareToWin = 5;

class Board extends Component {
    renderSquare(i) {
        return (
            <Square value={this.props.squares[i]} onClick={() => this.props.onClick(i)}
            />
        );
    }
    render() {
        let board;
        board = this.props.squares.map((row, idx) => {
            let k = "r" + idx;
            return (
                
           
                <SquareRow winner={this.props.winner} rowIdx={idx} row={row} onClick={this.props.onClick} key={k} />
            )
        })
        return (
            <div>
                {board}
            </div>
        );
    }
}

export default Board;