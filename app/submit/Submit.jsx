import React from 'react';
import * as fs from 'fs';
import Header from './Header.jsx';

export default class Submit extends React.Component {
    constructor(props) {
        super(props);

        const data = JSON.parse(fs.readFileSync('./app/chapterdata/' + this.props.area + '.json', 'utf8'));
        this.state = {
            num: data.num,
            name: data.name,
            description: data.description,
            box: data.box,
            blueprint: data.blueprint,
            character: data.character
        }
    }

    render() {
        const {area, isHard} = this.props;
        const {num, name, description, box, blueprint, character} = this.state;
        return (
            <div>
                <Header area={area} name={name} description={description} />
            </div>
        );
    }
}