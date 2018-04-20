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
                    <p>HI!SUSHI!</p>
                </div>
            </div>
        );
    }
}