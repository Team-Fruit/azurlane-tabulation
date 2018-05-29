import React from 'react';
import ReactDOM from 'react-dom';
import { ipcRenderer } from 'electron';

export default class SplashScreen extends React.Component {

    componentDidMount() {
        ipcRenderer.on('progress', (e, arg) => {
        });
    }

    render() {
        <div>
        </div>
    }
}

ReactDOM.render(
    <SplashScreen />,
    document.getElementById('root')
)