import React from 'react';

export default class HorizontalInfiniteScroll extends React.Component {
    constructor(props) {
        super(props);

    }

    componentDidMount() {
        this.start();
    }

    componentWillUnmount() {
        clearInterval(this.interval);
        clearTimeout(this.timeout);
    }

    start() {
        this.timeout = setTimeout(() => {
            this.interval = setInterval(() => {
                if (this.el.scrollLeft < this.el.scrollWidth - this.el.clientWidth) {
                    this.el.scrollLeft += 1;
                } else {
                    clearInterval(this.interval);
                    this.timeout = setTimeout(() => {
                        this.el.scrollLeft = 0;
                        this.start();
                    }, this.props.timeout ? this.props.timeout : 500);
                }
            }, this.props.speed ? this.props.speed : 50);
        }, this.props.timeout ? this.props.timeout : 500);
    }

    render() {
        return (
            <div className="horizontalInfiniteScroll" ref={el => { this.el = el }}>
                {this.props.children}
            </div>
        );
    }
}