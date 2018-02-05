import React from 'react';
import ReactDOM from 'react-dom';
import Chapter from './chapter/Chapter.jsx';
import Submit from './submit/Submit.jsx';

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            area: null,
            isHard: false
        }

        this.onChooseArea = this.onChooseArea.bind(this);
        this.back = this.back.bind(this);
    }

    componentDidCatch(error, info) {
        console.log(error);
    }

    onChooseArea(area, hard) {
        this.setState({area: area, isHard: hard});
    }

    back() {
        this.setState({area: null});
    }

    render() {
        const component = this.state.area == null ? <Chapter onChooseArea={this.onChooseArea} /> : <Submit area={this.state.area} isHard={this.state.isHard} back={this.back} />
        return(
            <div>
                {component}
            </div>
        );
    }
}

ReactDOM.render(
    <Main />,
    document.getElementById('root')
);