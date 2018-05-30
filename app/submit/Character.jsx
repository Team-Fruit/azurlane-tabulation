import React from 'react';
import path from 'path';
import { remote } from 'electron';

const imgDir = path.join(remote.app.getPath('userData'), 'data/img/character');

export default class Character extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rarity: Object.getOwnPropertyNames(this.props.character)[0],
            character: null
        }
    }

    onChangeRatity(k) {
        this.setState({ rarity: k });
    }

    _onSelectCharacter(name) {
        const c = name === this.state.character ? null : name;
        this.setState({ character: c });
        this.props.onSelectCharacter(c, this.state.rarity);
    }

    render() {
        const character = this.props.character;

        const rarityList = [];
        for (let k in character) {
            rarityList.push(
                <li className={this.state.rarity === k ? "rarityItem rarityItemSelected " + k : "rarityItem " + k} key={k}>
                    <a onClick={() => this.onChangeRatity(k)}>{k.toUpperCase()}</a>
                </li>
            );
        }

        const iconList = [];
        for (let k of character[this.state.rarity]) {
            const icon = <img src={path.join(imgDir, k + '.png')} width="75px" alt={k} onClick={() => this._onSelectCharacter(k)} draggable="false" />;
            if (this.state.character === k)
                iconList.push(
                    <div className="iconListItemSelected" key={k}>
                        {icon}
                        <div className="itemSelected" onClick={() => this._onSelectCharacter(k)} />
                        <p onClick={() => this._onSelectCharacter(k)}>-選択中-</p>
                    </div>
                );
            else
                iconList.push(
                    <div className="iconListItem" key={k}>
                        {icon}
                    </div>
                );
        }

        return (
            <div>
                <ul className="rarity">
                    {rarityList}
                </ul>
                <div className="iconList">
                    {iconList}
                </div>
            </div>
        );
    }
}