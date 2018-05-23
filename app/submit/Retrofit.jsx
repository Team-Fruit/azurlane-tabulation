import React from 'react';

export default class Retrofit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tech: 0
        }
    }

    _onSelectTech(tech) {
        const c = tech === this.state.tech ? null : tech;
        this.setState({ tech: c });
        this.props.onSelectRetrofit(c);
    }

    render() {
        const iconList = [];
        for (let k of this.props.retrofit) {
            const icon = <img src={'../resources/img/retrofit/' + this.props.num + '/' + k + '.png'} width="75px" alt={k} onClick={() => this._onSelectTech(k)} draggable="false" />;
            if (this.state.tech === k)
                iconList.push(
                    <div className="iconListItemSelected" key={k}>
                        {icon}
                        <div className="itemSelected" onClick={() => this._onSelectTech(k)} />
                        <p onClick={() => this._onSelectTech(k)}>-選択中-</p>
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
            <div className="iconList" style={{"borderTop": "3px solid #ccc"}}>
                {iconList}
            </div>
        );
    }
}