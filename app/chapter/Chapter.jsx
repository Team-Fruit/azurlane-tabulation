import React from 'react';
import { remote } from 'electron';
import * as fs from 'fs';
import path from 'path';

const baseDir = path.join(remote.app.getPath('userData'), 'data/chapterdata');

export default class Chapter extends React.Component {
    constructor(props) {
        super(props);

        const chapter = JSON.parse(fs.readFileSync(path.join(baseDir, 'chapter.json')));
        const sectionNames = {};
        fs.readdirSync(baseDir).forEach((line) => {
            if (line !== 'chapter.json')
                sectionNames[line.slice(0, -5)] = JSON.parse(fs.readFileSync(path.join(baseDir, line))).name;
        });
        this.state = {
            isHard: false,
            chapter,
            sectionNames
        }

        this.onChoose = this.onChoose.bind(this);
    }

    toggleHard() {
        this.setState({ isHard: !this.state.isHard });
    }

    onChoose(area) {
        this.props.onChooseArea(area, this.state.isHard);
    }

    render() {
        const components = [];
        Object.keys(this.state.chapter).forEach((line, i) => {
            const chapter = this.state.chapter[line];
            if (!this.state.isHard || this.state.isHard === chapter.hard) {
                const li = [];
                chapter.sections.forEach((line, j) => {
                    li.push(<li key={j}><a onClick={() => this.onChoose(line)}>{line + ' ' + this.state.sectionNames[line]}</a></li>);
                });

                components.push(
                    <div key={i}>
                        <label className="chapterLabel" htmlFor={"menu_bar" + i}>{chapter.label}</label>
                        <input type="checkbox" id={"menu_bar" + i} className="accordion" />
                        <ul className="accordionShow">
                            {li}
                        </ul>
                    </div>
                );
            }
        });

        return (
            <div>
                <div className={this.state.isHard ? "chapter chapterHard" : "chapter chapterNormal"}>
                    {components}
                </div>
                <img className="bottomButton" src={this.stateisHard ? "../resources/img/normal.png" : "../resources/img/hard.png"} width="150px" onClick={() => this.toggleHard()} draggable="false" />
            </div>
        );
    }
}