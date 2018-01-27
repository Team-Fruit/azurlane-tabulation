import React from 'react';

export default class Character extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const character = this.props.character;

        const rarityList = [];
        for (let k in character) {
            rarityList.push(<li className={"rarityItem "+k} key={k}><a>{k.toUpperCase()}</a></li>);
        }

        return(
            <div className="character">
                <ul className="rarity">
                    {rarityList}
                </ul>
            </div>
        );
    }
}