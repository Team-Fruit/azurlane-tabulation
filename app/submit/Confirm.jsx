import React from 'react';
import HorizontalInfiniteScroll from './HorizontalInfiniteScroll.jsx';

export default class Confirm extends React.Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        if (e.target.className === "popup" || e.target.className === "popupInner")
            this.props.onClose();
    }

    render() {
        const { character, blueprint, count, boxtech } = this.props;
        const itemList = [];
        if (character)
            itemList.push(
                <figure className="confirmListItem" key="character">
                    <img src={"./img/character/" + character + ".png"} />
                    <figcaption>
                        1
                        <hr />
                        <HorizontalInfiniteScroll>
                        <div ref={el => { this.characterEl = el }}>{character}</div>
                        </HorizontalInfiniteScroll>
                    </figcaption>
                </figure>
            );
        if (blueprint && count > 0)
            itemList.push(
                <figure className="confirmListItem" key="blueprint">
                    <img src={"./img/blueprint/" + blueprint + ".png"} />
                    <figcaption>
                        {count}
                        <hr />
                        <HorizontalInfiniteScroll>
                        <div ref={el => { this.blueprintEl = el }}>{blueprint}</div>
                        </HorizontalInfiniteScroll>
                    </figcaption>
                </figure>
            );
        if (boxtech)
            itemList.push(
                <figure className="confirmListItem" key="box">
                    <img src={"./img/box/" + boxtech + ".png"} />
                    <figcaption>
                        1
                        <hr />
                        <HorizontalInfiniteScroll>
                        <div ref={el => { this.boxEl = el }}>{"装備箱T" + boxtech}</div>
                        </HorizontalInfiniteScroll>
                    </figcaption>
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