import React from 'react';
import ReactDOM from 'react-dom';
import Choose from './oceanarea/Choose.jsx';

class Main extends React.Component {
    constructor(props) {
        super();
        this.state = {
            choosing: true,
            area: null
        }
    }

    componentDidCatch(error, info) {
        console.log(error);
    }

    render() {
        return(
            <div>
                <Choose />
            </div>
        );
    }
}

ReactDOM.render(
    <Main />,
    document.getElementById('root')
);