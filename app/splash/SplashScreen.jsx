import React from 'react';
import ReactDOM from 'react-dom';
import { ipcRenderer } from 'electron';
import Progress from 'react-progressbar';

class SplashScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            status: null,
            all: 0,
            complete: 0,
            allDone: false,
            error: false
        }
    }

    componentDidMount() {
        ipcRenderer.on('status', (e, arg) => {
            this.setState({ status: arg });
        });
        ipcRenderer.on('all', (e, arg) => {
            this.setState({ all: arg, complete: 0 });
        });
        ipcRenderer.on('complete', (e, arg) => {
            this.setState({ complete: this.state.complete + 1 });
        });
        ipcRenderer.on('allDone', (e, arg) => {
            this.setState({ allDone: true });
        });
        ipcRenderer.on('error', (e, arg) => {
            this.setState({ error: true });
        });
    }

    render() {
        const progress = this.state.allDone || this.state.error ? null : "("+this.state.complete+"/"+this.state.all+")"
        return(
            <div>
                <span>{this.state.status} {progress}</span>
                <Progress completed={this.state.complete / this.state.all * 100} color={this.state.error ? '#FF0048': '#0BD318'} />
            </div>
        );
    }
}

ReactDOM.render(
    <SplashScreen />,
    document.getElementById('content')
);