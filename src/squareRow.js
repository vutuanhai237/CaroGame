import React, { Component } from "react";
const nSquareToWin = 5;

export const Square = (props) => {
    return (props.win) ? (
        <button className="square square-highlight" onClick={props.onClick}>
            {props.value}
        </button>
    ) : (
            <button className="square" onClick={props.onClick}>
                {props.value}
            </button>
        );
}

class SquareRow extends Component {
    render() {
        let squareRow = this.props.row.map((square, idx) => {
            let k = "s" + idx;
            let win = false;
            let winner = this.props.winner;
            let rowIdx = this.props.rowIdx;
            if (winner) {
                if (winner.direction === "ToRight" &&
                    idx >= winner.x && idx <= winner.x + nSquareToWin - 1 && rowIdx === winner.y) {
                    win = true;
                }
                if (winner.direction === "ToDown" &&
                    rowIdx >= winner.y && rowIdx <= winner.y + nSquareToWin - 1 && idx === winner.x) {
                    win = true;
                }
                if (winner.direction === "ToRightDown" &&
                    idx >= winner.x && idx <= winner.x + nSquareToWin - 1 && idx - winner.x === rowIdx - winner.y) {
                    win = true;
                }
                if (winner.direction === "ToLeftDown" &&
                    idx <= winner.x && idx >= winner.x - nSquareToWin + 1 && winner.x - idx === rowIdx - winner.y) {
                    console.log(winner.x + ' ' + winner.y + ' ' + idx + ' ' + rowIdx + ' ' + nSquareToWin);
                    win = true;
                }
            }
            return (
                <Square win={win} value={square} onClick={() => this.props.onClick(this.props.rowIdx, idx)} key={k} />
            )
        })
        return (
            <div className="board-row">
                {squareRow}
            </div>
        )
    }
}

export default SquareRow;