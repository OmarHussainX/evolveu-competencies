
import React, { Component } from 'react'

class Scrollable extends Component {
    render() {
        return (
            <div style={{overflowY: 'scroll', height: '350px'}}>
                {this.props.children}
            </div>
        )
    }
}

export default Scrollable