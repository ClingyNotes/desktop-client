import React, { Component } from 'react';

export default class App extends Component {
    render() {
        return (
            <div style={{width: 'auto', height: 'auto' }}>
                <textarea draggable={false} style={{backgroundColor: 'yellow', width: '100%', height: '100%' }}></textarea>
            </div>
        );
    }
}