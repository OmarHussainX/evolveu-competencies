import React, {Component} from "react"
import logo from '../logo.svg';

class ReactGreeter extends Component {
    
    render() {
        return (
            <div>
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                    Source: <code>src/components/ReactGreeter.js</code>
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
            </div>
        )
    }
}

export default ReactGreeter