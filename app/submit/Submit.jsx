import React from 'react';
import * as fs from 'fs';
import Header from './Header.jsx';
import Character from './Character.jsx';
import Blueprint from './Blueprint.jsx';

export default class Submit extends React.Component {
    constructor(props) {
        super(props);

        const data = JSON.parse(fs.readFileSync('./app/chapterdata/' + this.props.area + '.json', 'utf8'));
        this.state = {
            data: {
                num: data.num,
                name: data.name,
                description: data.description,
                box: data.box,
                blueprint: data.blueprint,
                character: data.character
            },
            character: null,
            blueprint: null,
            count: 0,
            tier: 0
        }

        this.onSelectCharacter = this.onSelectCharacter.bind(this);
        this.onSelectBlueprint = this.onSelectBlueprint.bind(this);
        this.onChangeBlueprintCount = this.onChangeBlueprintCount.bind(this);
        this.onSelectBoxTier = this.onSelectBoxTier.bind(this);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return !(this.state.character === nextState.character &&
            this.state.blueprint === nextState.blueprint);
    }

    onSelectCharacter(name) {
        this.setState({ character: name });
    }

    onSelectBlueprint(name) {
        this.setState({ blueprint: name });
    }

    onChangeBlueprintCount(count) {
        this.setState({ count: count });
    }

    onSelectBoxTier(tier) {
        this.setState({ tier: tier });
    }

    render() {
        const { area, isHard } = this.props;
        const { num, name, description, box, blueprint, character } = this.state.data;

        return (
            <div className="submit">
                <Header area={area} isHard={isHard} name={name} description={description} />
                <div className="submitContent">
                    <h3>ドロップ艦</h3>
                    <Character character={character} onSelectCharacter={this.onSelectCharacter} />
                    {(() => {
                        if (blueprint) {
                            return (
                                <div>
                                    <h3>設計図</h3>
                                    <Blueprint blueprint={blueprint} onSelectBlueprint={this.onSelectBlueprint} onChangeBlueprintCount={this.onChangeBlueprintCount} />
                                </div>
                            );
                        }
                    })()}
                </div>
                <img className="bottombutton" src="img/back.png" width="120px" onClick={() => this.props.back()} draggable="false" />
            </div>
        );
    }
}