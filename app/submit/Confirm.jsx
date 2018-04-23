import React from 'react';

export default class Confirm extends React.Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        if (e.target.className === "popup")
            this.props.onClose();
    }

    render() {
        const { character, blueprint, count, boxtech } = this.props;
        const itemList = [];
        if (character)
            itemList.push(
                <figure className="confirmListItem" key="character">
                    <img src={"./img/character/" + character + ".png"} />
                    <figcaption>{character}</figcaption>
                </figure>
            );
        if (blueprint)
            itemList.push(
                <figure className="confirmListItem" key="blueprint">
                    <img src={"./img/blueprint/" + blueprint + ".png"} />
                    <figcaption>{blueprint}</figcaption>
                </figure>
            );
        if (boxtech)
            itemList.push(
                <figure className="confirmListItem" key="box">
                    <img src={"./img/box/" + boxtech + ".png"} />
                    <figcaption>{"装備箱T" + boxtech}</figcaption>
                </figure>
            );

        return (
            <div className="popup" onClick={this.handleClick}>
                <div className="popupInner">
                    <div className="confirmList">
                        <div className="confirmFigures">
                            {itemList}
                        </div>
                    </div>
                    <img className="confirmButton" src="img/forward.png" width="120px" onClick={this.props.onClose} draggable="false" />
                </div>
            </div>
        );
    }
}