import React from 'react';
import HorizontalInfiniteScroll from './HorizontalInfiniteScroll.jsx';
import ReactLoading from 'react-loading';

export default class Confirm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false
        }

        this.handleClick = this.handleClick.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    handleClick(e) {
        if (!this.state.loading && (e.target.className === "popup" || e.target.className === "popupInner"))
            this.props.onClose();
    }

    onSubmit() {
        if (!this.state.loading) {
            this.setState({ loading: true });
            this.props.onSubmit();
        }
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
                            {character}
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
                            {blueprint}設計図
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
                            {"装備箱T" + boxtech}
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
                    {
                        this.state.loading ?
                            <div className="confirmLoading">
                                <ReactLoading type={"bubbles"} color={"#2196F3"} height={100} width={300} />
                            </div>
                            : null

                    }
                    <img className="confirmButton" src="img/forward.png" width="120px" onClick={this.onSubmit} draggable="false" />
                </div>
            </div>
        );
    }
}