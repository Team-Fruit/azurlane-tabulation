import React from 'react';
import ReactDOM from 'react-dom';
import OceanArea from './oceanarea/OceanArea.jsx';

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
        if (this.state.area == null)
        return(
            <div>
                <OceanArea onChooseArea={this.onChooseArea} />
            </div>
        );
        else
        return (<div></div>)
    }
}

ReactDOM.render(
    <Main />,
    document.getElementById('root')
);