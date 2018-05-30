import React from 'react';
import { remote } from 'electron';
import * as fs from 'fs';
import path from 'path';
import Header from './Header.jsx';
import Character from './Character.jsx';
import Blueprint from './Blueprint.jsx';
import Box from './Box.jsx';
import Retrofit from './Retrofit.jsx';
import Confirm from './Confirm.jsx';
const Spreadsheets = remote.require('./app/Spreadsheets');

export default class Submit extends React.Component {
    constructor(props) {
        super(props);

        const data = JSON.parse(fs.readFileSync(path.join(remote.app.getPath('userData'), 'data/chapterdata', this.props.area + '.json'), 'utf8'));
        this.state = {
            popup: false,
            data: {
                num: data.num,
                name: data.name,
                description: data.description,
                box: data.box,
                blueprint: data.blueprint,
                character: data.character,
                retrofit: data.retrofit
            },
            character: null,
            characterRarity: null,
            blueprint: null,
            blueprintRarity: null,
            blueprintcount: 0,
            boxtech: null,
            retrofit1: null,
            retrofit2: null
        }

        this.onSelectBlueprint = this.onSelectBlueprint.bind(this);
        this.onSelectCharacter = this.onSelectCharacter.bind(this);
        this.onChangeBlueprintCount = this.onChangeBlueprintCount.bind(this);
        this.onSelectBoxTech = this.onSelectBoxTech.bind(this);
        this.onSelectRetrofit1 = this.onSelectRetrofit1.bind(this);
        this.onSelectRetrofit2 = this.onSelectRetrofit2.bind(this);
        this.next = this.next.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        window.scrollTo(0, 0);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return !(this.state.popup === nextState.popup);
    }

    onSelectCharacter(name, rarity) {
        this.setState({ character: name, characterRarity: rarity });
    }

    onSelectBlueprint(name, rarity) {
        this.setState({ blueprint: name, blueprintRarity: rarity });
    }

    onChangeBlueprintCount(count) {
        this.setState({ blueprintcount: count });
    }

    onSelectBoxTech(tech) {
        this.setState({ boxtech: tech });
    }

    onSelectRetrofit1(tech) {
        this.setState({ retrofit1: tech });
    }

    onSelectRetrofit2(tech) {
        this.setState({ retrofit2: tech });
    }

    next() {
        this.setState({ popup: !this.state.popup });
    }

    onSubmit() {
        Spreadsheets.submit(
            {
                area: this.props.area,
                hard: this.props.isHard,
                character: {
                    name: this.state.character,
                    rarity: this.state.characterRarity
                },
                blueprint: {
                    name: this.state.blueprint,
                    rarity: this.state.blueprintRarity,
                    count: this.state.blueprintcount
                },
                boxtech: this.state.boxtech,
                retrofit1: this.state.retrofit1,
                retrofit2: this.state.retrofit2
            },
            (res) => {
                this.setState({ popup: false });
                this.props.back();
            }
        );
    }

    render() {
        const { area, isHard } = this.props;
        const { num, name, description, box, blueprint, character, retrofit } = this.state.data;

        return (
            <div className="submit">
                <Header area={area} isHard={isHard} name={name} description={description} />
                <div className="submitContent">
                    <h3>ドロップ艦</h3>
                    <Character character={character} onSelectCharacter={this.onSelectCharacter} />
                    {
                        blueprint ?
                            <div>
                                <h3>設計図</h3>
                                <Blueprint blueprint={blueprint} onSelectBlueprint={this.onSelectBlueprint} onChangeBlueprintCount={this.onChangeBlueprintCount} />
                            </div>
                            : null
                    }
                    <h3>装備箱</h3>
                    <Box box={box} onSelectBoxTech={this.onSelectBoxTech} />
                    {
                        isHard ? 
                        <div>
                            <h3>改造図</h3>
                            <Retrofit num={num} retrofit={retrofit} onSelectRetrofit={this.onSelectRetrofit1} />
                            <Retrofit num={num} retrofit={retrofit} onSelectRetrofit={this.onSelectRetrofit2} />
                        </div>
                        : null
                    }
                </div>
                <img className="bottomButton buttonLeft" src="../resources/img/back.png" width="120px" onClick={() => this.props.back()} draggable="false" />
                <img className="bottomButton buttonRight" src="../resources/img/next.png" width="120px" onClick={this.next} draggable="false" />
                {
                    this.state.popup ?
                        <Confirm character={this.state.character} blueprint={this.state.blueprint} count={this.state.blueprintcount} boxtech={this.state.boxtech} chapternum={num} retrofit1={this.state.retrofit1} retrofit2={this.state.retrofit2} onClose={this.next} onSubmit={this.onSubmit} />
                        : null
                }
            </div>
        );
    }
}