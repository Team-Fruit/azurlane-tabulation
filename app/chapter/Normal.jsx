import React from 'react';
import Hard from './Hard.jsx'

export default class Normal extends React.Component {
    _onChoose(area) {
        this.props.onChoose(area);
    }

    render() {
        return (
            <div>
                <Hard onChoose={this.props.onChoose}/>
                <label className="chapterLabel" htmlFor="menu_bar7">第7章  混沌の夜</label>
                <input type="checkbox" id="menu_bar7" className="accordion" />
                <ul id="links7">
                    <li><a onClick={() => this._onChoose('7-1')}>7-1 増援阻止</a></li>
                    <li><a onClick={() => this._onChoose('7-2')}>7-2 乱戦</a></li>
                    <li><a onClick={() => this._onChoose('7-3')}>7-3 奇襲</a></li>
                    <li><a onClick={() => this._onChoose('7-4')}>7-4 予想外の混乱</a></li>
                </ul>
                <label className="chapterLabel" htmlFor="menu_bar8">第8章  極北の海戦</label>
                <input type="checkbox" id="menu_bar8" className="accordion" />
                <ul id="links8">
                    <li><a onClick={() => this._onChoose('8-1')}>8-1 極北の風</a></li>
                    <li><a onClick={() => this._onChoose('8-2')}>8-2 北極圏の朝霧</a></li>
                    <li><a onClick={() => this._onChoose('8-3')}>8-3 氷の荒波</a></li>
                    <li><a onClick={() => this._onChoose('8-4')}>8-4 忘れられし戦場</a></li>
                </ul>
                <label className="chapterLabel" htmlFor="menu_bar9">第9章  クラ湾海戦</label>
                <input type="checkbox" id="menu_bar9" className="accordion" />
                <ul id="links9">
                    <li><a onClick={() => this._onChoose('9-1')}>9-1 凶兆の夜</a></li>
                    <li><a onClick={() => this._onChoose('9-2')}>9-2 迎撃作戦</a></li>
                    <li><a onClick={() => this._onChoose('9-3')}>9-3 暗闇の光</a></li>
                    <li><a onClick={() => this._onChoose('9-4')}>9-4 ヘレナ</a></li>
                </ul>
                <label className="chapterLabel" htmlFor="menu_bar10">第10章  コロンバンガラ島沖海戦</label>
                <input type="checkbox" id="menu_bar10" className="accordion" />
                <ul id="links10">
                    <li><a onClick={() => this._onChoose('10-1')}>10-1 二度目の出撃</a></li>
                    <li><a onClick={() => this._onChoose('10-2')}>10-2 先制攻撃！</a></li>
                    <li><a onClick={() => this._onChoose('10-3')}>10-3 勝利に乗じて</a></li>
                    <li><a onClick={() => this._onChoose('10-4')}>10-4 釣り野伏</a></li>
                </ul>
            </div>
        );
    }
}