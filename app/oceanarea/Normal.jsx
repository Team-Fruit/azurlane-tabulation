import React from 'react';
import Hard from './Hard.jsx'

export default class Normal extends React.Component {
    render() {
        return (
            <div>
                <Hard />
                <label htmlFor="menu_bar7">第7章  混沌の夜</label>
                <input type="checkbox" id="menu_bar7" className="accordion" />
                <ul id="links7">
                    <li><a href="">7-1 増援阻止</a></li>
                    <li><a href="">7-2 乱戦</a></li>
                    <li><a href="">7-3 奇襲</a></li>
                    <li><a href="">7-4 予想外の混乱</a></li>
                </ul>
                <label htmlFor="menu_bar8">第8章  極北の海戦</label>
                <input type="checkbox" id="menu_bar8" className="accordion" />
                <ul id="links8">
                    <li><a href="">8-1 極北の風</a></li>
                    <li><a href="">8-2 北極圏の朝霧</a></li>
                    <li><a href="">8-3 氷の荒波</a></li>
                    <li><a href="">8-4 忘れられし戦場</a></li>
                </ul>
                <label htmlFor="menu_bar9">第9章  クラ湾海戦</label>
                <input type="checkbox" id="menu_bar9" className="accordion" />
                <ul id="links9">
                    <li><a href="">9-1 凶兆の夜</a></li>
                    <li><a href="">9-2 迎撃作戦</a></li>
                    <li><a href="">9-3 暗闇の光</a></li>
                    <li><a href="">9-4 ヘレナ</a></li>
                </ul>
                <label htmlFor="menu_bar10">第10章  コロンバンガラ島沖海戦</label>
                <input type="checkbox" id="menu_bar10" className="accordion" />
                <ul id="links10">
                    <li><a href="">10-1 二度目の出撃</a></li>
                    <li><a href="">10-2 先制攻撃！</a></li>
                    <li><a href="">10-3 勝利に乗じて</a></li>
                    <li><a href="">10-4 釣り野伏</a></li>
                </ul>
            </div>
        );
    }
}