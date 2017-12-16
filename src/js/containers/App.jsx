import React, { Component } from 'react';

export default class App extends Component {
    render() {
        return (
            <div style={{width: '100%', height: '100%' }} id='app-root'>
                <textarea id='note-text-area' draggable={false}></textarea>
            </div>
        );
    }
}