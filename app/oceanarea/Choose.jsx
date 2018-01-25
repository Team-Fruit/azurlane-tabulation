import React from 'react';
import Hard from './Hard.jsx';
import Normal from './Normal.jsx';

export default class Choose extends React.Component {
    constructor(props) {
        super();
        this.state = {
            isHard: false
        }
    }

    componentDidCatch(error, info) {
        console.log(error);
    }

    toggleHard() {
        this.setState({ isHard: !this.state.isHard });
    }

    render() {
        const component = this.state.isHard ? <Hard /> : <Normal />;
        return (
            <div>
                <div className={this.state.isHard ? "menu hard" : "menu normal"}>
                    {component}
                </div>
                <img className="bottombutton" src={this.state.isHard ? "img/normal.png" : "img/hard.png"} onClick={() => this.toggleHard()}></img>
            </div>
        );
    }
}