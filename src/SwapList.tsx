import React, { Component } from 'react';

interface IProps {
    data: any[];
}

class SwapList extends Component<IProps> {
    public render() {
        const { data } = this.props;
        return (
            <ul>
                {data.map(item => {
                    return <li key={item.name}>{item.name}</li>
                })}
            </ul>
        );
    }
}

export default SwapList;
