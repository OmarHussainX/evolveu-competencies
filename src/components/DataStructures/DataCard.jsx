import React, {Component} from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class DataCard extends Component {

    render() {
        const { nodeFlag, movieNode, clickHandler } = this.props
        return (
            <div className='dataCard' onClick={clickHandler(movieNode)}>
                <div className={'default' + (nodeFlag.includes('CURRENT') ? '  currentnode' : '')}>
                    <h5>{movieNode.data.title}</h5>
                    <p>{movieNode.data.gross.toFixed(2)}M</p>
                    {!nodeFlag.includes('TAIL') && <div
                    className={'rightarrow'}>
                        <FontAwesomeIcon icon='long-arrow-alt-right' size="lg"></FontAwesomeIcon>
                    </div>}
                </div>
            </div>
        )
    }
}

export default DataCard