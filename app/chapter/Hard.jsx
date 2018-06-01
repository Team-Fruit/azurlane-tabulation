import React from 'react';

export default class Hard extends React.Component {
    _onChoose(area) {
        this.props.onChoose(area);
    }

    render() {
        return (
            <div>
                <label className="chapterLabel" htmlFor="menu_bar1">第1章  トラ！トラ！トラ！</label>
                <input type="checkbox" id="menu_bar1" className="accordion" />
                <ul className="accordionShow">
                    <li><a onClick={() => this._onChoose('1-1')}>1-1 近海演習</a></li>
                    <li><a onClick={() => this._onChoose('1-2')}>1-2 トラトラトラ</a></li>
                    <li><a onClick={() => this._onChoose('1-3')}>1-3 軍港燃ゆ</a></li>
                    <li><a onClick={() => this._onChoose('1-4')}>1-4 東より来たる敵</a></li>
                </ul>
                <label className="chapterLabel" htmlFor="menu_bar2">第2章  初陣！珊瑚海</label>
                <input type="checkbox" id="menu_bar2" className="accordion" />
                <ul className="accordionShow">
                    <li><a onClick={() => this._onChoose('2-1')}>2-1 ツラギ支援</a></li>
                    <li><a onClick={() => this._onChoose('2-2')}>2-2 太陽を隠す暗雲</a></li>
                    <li><a onClick={() => this._onChoose('2-3')}>2-3 初陣！珊瑚海</a></li>
                    <li><a onClick={() => this._onChoose('2-4')}>2-4 空母対空母</a></li>
                </ul>
                <label className="chapterLabel" htmlFor="menu_bar3">第3章  AF決戦</label>
                <input type="checkbox" id="menu_bar3" className="accordion" />
                <ul className="accordionShow">
                    <li><a onClick={() => this._onChoose('3-1')}>3-1 AF決戦へ</a></li>
                    <li><a onClick={() => this._onChoose('3-2')}>3-2 運命の5分間</a></li>
                    <li><a onClick={() => this._onChoose('3-3')}>3-3 背水の戦い</a></li>
                    <li><a onClick={() => this._onChoose('3-4')}>3-4 最後の反撃</a></li>
                </ul>
                <label className="chapterLabel" htmlFor="menu_bar4">第4章  ソロモン海にて・上</label>
                <input type="checkbox" id="menu_bar4" className="accordion" />
                <ul className="accordionShow">
                    <li><a onClick={() => this._onChoose('4-1')}>4-1 宵闇の死神</a></li>
                    <li><a onClick={() => this._onChoose('4-2')}>4-2 血染めの暁</a></li>
                    <li><a onClick={() => this._onChoose('4-3')}>4-3 東ソロモンにて</a></li>
                    <li><a onClick={() => this._onChoose('4-4')}>4-4 仇討ちの戦い</a></li>
                </ul>
                <label className="chapterLabel" htmlFor="menu_bar5">第5章  ソロモン海にて・中</label>
                <input type="checkbox" id="menu_bar5" className="accordion" />
                <ul className="accordionShow">
                    <li><a onClick={() => this._onChoose('5-1')}>5-1 輸送阻止作戦</a></li>
                    <li><a onClick={() => this._onChoose('5-2')}>5-2 聖十字の空</a></li>
                    <li><a onClick={() => this._onChoose('5-3')}>5-3 ホーネット墜つ</a></li>
                    <li><a onClick={() => this._onChoose('5-4')}>5-4 戦域から脱出</a></li>
                </ul>
                <label className="chapterLabel" htmlFor="menu_bar6">第6章  ソロモン海にて・下</label>
                <input type="checkbox" id="menu_bar6" className="accordion" />
                <ul className="accordionShow">
                    <li><a onClick={() => this._onChoose('6-1')}>6-1 夜戦対決</a></li>
                    <li><a onClick={() => this._onChoose('6-2')}>6-2 全面反撃</a></li>
                    <li><a onClick={() => this._onChoose('6-3')}>6-3 巨砲最後の戦い </a></li>
                    <li><a onClick={() => this._onChoose('6-4')}>6-4 ソロモンの悪夢</a></li>
                </ul>
                <label className="chapterLabel" htmlFor="menu_bar7">第7章  混沌の夜</label>
                <input type="checkbox" id="menu_bar7" className="accordion" />
                <ul className="accordionShow">
                    <li><a onClick={() => this._onChoose('7-1')}>7-1 増援阻止</a></li>
                    <li><a onClick={() => this._onChoose('7-2')}>7-2 乱戦</a></li>
                    <li><a onClick={() => this._onChoose('7-3')}>7-3 奇襲</a></li>
                    <li><a onClick={() => this._onChoose('7-4')}>7-4 予想外の混乱</a></li>
                </ul>
            </div>
        );
    }
}