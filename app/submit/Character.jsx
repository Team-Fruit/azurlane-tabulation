import React from 'react';

export default class Character extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rarity: Object.getOwnPropertyNames(this.props.character)[0]
        }
    }

    onChangeRatity(k) {
        this.setState({ rarity: k });
    }

    render() {
        console.log(__dirname)
        const character = this.props.character;

        const rarityList = [];
        for (let k in character) {
            rarityList.push(<li className={"rarityItem " + k} key={k}><a onClick={() => this.onChangeRatity(k)}>{k.toUpperCase()}</a></li>);
        }

        const iconList = [];
        for (let k of character[this.state.rarity]) {
            iconList.push(<li className="characterItem" key={k}><img src={'./img/character/' + k + '.png'} width="80" height="80" alt={k} /></li>);
        }

        return (
            <div className="character">
                <ul className="rarity">
                    {rarityList}
                </ul>
                <ul className="characterIcons">
                    {iconList}
                </ul>
            </div>
        );
    }
}