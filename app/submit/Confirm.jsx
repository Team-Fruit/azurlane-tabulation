import React from 'react';
import HorizontalInfiniteScroll from './HorizontalInfiniteScroll.jsx';
import ReactLoading from 'react-loading';

const retrofitNames = {
    1: "駆逐改造図T",
    2: "巡洋改造図T",
    3: "戦艦改造図T",
    4: "空母改造図T"
}

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
        const { character, blueprint, count, boxtech, chapternum, retrofit1, retrofit2 } = this.props;
        const itemList = [];
        if (character)
            itemList.push(
                <figure className="confirmListItem" key="character">
                    <img src={"../resources/img/character/" + character + ".png"} />
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
                    <img src={"../resources/img/blueprint/" + blueprint + ".png"} />
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
                    <img src={"../resources/img/box/" + boxtech + ".png"} />
                    <figcaption>
                        1
                        <hr />
                        <HorizontalInfiniteScroll>
                            {"装備箱T" + boxtech}
                        </HorizontalInfiniteScroll>
                    </figcaption>
                </figure>
            );
        if (retrofit1)
            itemList.push(
                <figure className="confirmListItem" key="retrofit1">
                    <img src={"../resources/img/retrofit/" + chapternum + '/' + retrofit1 + ".png"} />
                    <figcaption>
                        {
                            retrofit1 === retrofit2 ? 2 : 1
                        }
                        <hr />
                        <HorizontalInfiniteScroll>
                            {retrofitNames[chapternum] + retrofit1}
                        </HorizontalInfiniteScroll>
                    </figcaption>
                </figure>
            );
        if (retrofit2 && (retrofit1 !== retrofit2))
            itemList.push(
                <figure className="confirmListItem" key="retrofit2">
                    <img src={"../resources/img/retrofit/" + chapternum + '/' + retrofit2 + ".png"} />
                    <figcaption>
                        1
                <hr />
                        <HorizontalInfiniteScroll>
                            {retrofitNames[chapternum] + retrofit2}
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
                    <img className="confirmButton" src="../resources/img/forward.png" width="120px" onClick={this.onSubmit} draggable="false" />
                </div>
            </div>
        );
    }
}