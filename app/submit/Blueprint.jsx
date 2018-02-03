import React from 'react';

export default class Blueprint extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rarity: Object.getOwnPropertyNames(this.props.blueprint)[0],
            blueprint: null,
            count: 0
        }
    }

    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    onChangeRatity(k) {
        this.setState({ rarity: k });
    }

    onIncrement() {
        if (this.state.count < 2) {
            this.setState({ count: this.state.count + 1 });
        }
    }

    onDecrement() {
        if (this.state.count > 0) {
            this.setState({ count: this.state.count - 1 });
        }
    }

    render() {
        const blueprint = this.props.blueprint;

        const rarityList = [];
        for (let k in blueprint) {
            rarityList.push(
                <li className={this.state.rarity === k ? "rarityItem rarityItemSelected " + k : "rarityItem " + k} key={k}>
                    <a onClick={() => this.onChangeRatity(k)}>{this.capitalizeFirstLetter(k)}</a>
                </li>
            );
        }

        return (
            <div>
                <ul className="rarity">
                    {rarityList}
                    <li className="rarityItem counter" key="counter">
                        <div className="count">
                            <img src="./img/arrowleft.png" className="arrow" height="20px" onClick={() => this.onDecrement()} />
                            {this.state.count}
                            <img src="./img/arrowright.png" className="arrow" height="20px" onClick={() => this.onIncrement()} />
                        </div>
                    </li>
                </ul>
            </div>
        );
    }
}