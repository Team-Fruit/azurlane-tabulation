import React from 'react';

export default class Header extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { area, name, description } = this.props;
        return (
            <div>
                <div className={this.props.isHard ? "submitTitle hard" : "submitTitle normal"}>
                    <span className="submitArea">{area}</span>
                    <span className="submitAreaName">{name}</span>
                </div>
                <div className="submitDescription">{description}</div>
            </div>
        );
    }
}