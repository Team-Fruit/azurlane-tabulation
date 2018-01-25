import React from 'react';
import Hard from './Hard.jsx';
import Normal from './Normal.jsx';

export default class OceanArea extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isHard: false
        }

        this.onChoose = this.onChoose.bind(this);
    }

    toggleHard() {
        this.setState({ isHard: !this.state.isHard });
    }

    onChoose(area) {
        this.props.onChooseArea(area, this.state.isHard);
    }

    render() {
        const component = this.state.isHard ? <Hard onChoose={this.onChoose} /> : <Normal onChoose={this.onChoose} />;
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