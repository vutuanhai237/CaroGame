import React, { Component } from "react";
import SquareRow, { Square } from './squareRow';
import { FormControl, InputGroup, Button } from 'react-bootstrap';
import Game from './game';
import './index.css'

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            playerX: "",
            playerO: "",
            isBegin: false,

        }
        this.changePlayerX = this.changePlayerX.bind(this);
        this.changePlayerO = this.changePlayerO.bind(this);
        this.begin = this.begin.bind(this);
        this.playerX = React.createRef("");
        this.playerO = React.createRef("");

    }






    changePlayerX(evt) {
        this.setState({ playerX: evt.target.value })

    }

    changePlayerO(evt) {
        this.setState({ playerO: evt.target.value })

    }
    begin() {
        if (this.state.playerX !== "" && this.state.playerO !== "") {
            this.setState({ isBegin: true });

        }
        console.log(this.state)
    }
    render() {
        var game = null;
        var input = null;
        if (this.state.isBegin) {
            game = <div>
                <Game playerX={this.state.playerX} playerO={this.state.playerO} />
            </div>
        } else {
            input = <div>
                <p>Nhập tên hai người chơi để bắt đầu</p>
                <FormControl className="input" type="text" placeholder="player X" onChange={evt => { this.changePlayerX(evt) }} />
                <FormControl className="input" type="text" placeholder="player O" onChange={evt => { this.changePlayerO(evt) }} />
                <Button onClick={this.begin}>Bắt đầu</Button>
            </div>
        }

        return (
            <div id="main">
                <h3>Test TESSE: Vũ Tuấn Hải - vutuanhai237@gmail.com</h3>
                {input}
                {game}

            </div>
        );
    }
}

export default Main;