import React from 'react';
import ReactDOM from 'react-dom';
import OceanArea from './oceanarea/OceanArea.jsx';
import Submit from './submit/Submit.jsx';

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            area: null,
            isHard: false
        }

        this.onChooseArea = this.onChooseArea.bind(this);
    }

    componentDidCatch(error, info) {
        console.log(error);
    }

    onChooseArea(area, hard) {
        this.setState({area: area, isHard: hard});
    }

    render() {
        const component = this.state.area == null ? <OceanArea onChooseArea={this.onChooseArea} /> : <Submit area={this.state.area} isHard={this.state.isHard} />
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