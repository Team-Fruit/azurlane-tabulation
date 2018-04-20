import React from 'react';

export default class Confirm extends React.Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        if (e.target.className === "popup")
            this.props.onClose();
    }

    render() {
        return (
            <div className="popup" onClick={this.handleClick}>
                <div className="popupInner">
                    <div className="confirmList">
                    </div>
                    <img className="confirmButton" src="img/forward.png" width="120px" onClick={this.onForward} draggable="false" />
                </div>
            </div>
        );
    }
}