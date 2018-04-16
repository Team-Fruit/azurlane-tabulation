import React from 'react';
import * as fs from 'fs';
import Header from './Header.jsx';
import Character from './Character.jsx';
import Blueprint from './Blueprint.jsx';
import Box from './Box.jsx';

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
            tech: 0
        }

        this.onSelectCharacter = this.onSelectCharacter.bind(this);
        this.onSelectBlueprint = this.onSelectBlueprint.bind(this);
        this.onChangeBlueprintCount = this.onChangeBlueprintCount.bind(this);
        this.onSelectBoxTech = this.onSelectBoxTech.bind(this);
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

    onSelectBoxTech(tech) {
        this.setState({ tech: tech });
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
                    <h3>装備箱</h3>
                    <Box box={box} onSelectBoxTech={this.onSelectBoxTech} />
                </div>
                <img className="bottombutton" src="img/back.png" width="120px" onClick={() => this.props.back()} draggable="false" />
            </div>
        );
    }
}