import React from 'react';
import Hard from './Hard.jsx';
import Normal from './Normal.jsx';

export default class Chapter extends React.Component {
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
        const isHard = this.state.isHard;
        const component = isHard ? <Hard onChoose={this.onChoose} /> : <Normal onChoose={this.onChoose} />;
        return (
            <div>
                <div className={isHard ? "chapter chapterHard" : "chapter chapterNormal"}>
                    {component}
                </div>
                <img className="bottomButton" src={isHard ? "../resources/img/normal.png" : "../resources/img/hard.png"} width="150px" onClick={() => this.toggleHard()} draggable="false" />
            </div>
        );
    }
}