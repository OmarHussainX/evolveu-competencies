import React, {Component} from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class DataCard extends Component {

    render() {
        const { nodeFlag, movieData, setCurrentNode } = this.props
        return (
            <div className='dataCard' onClick={setCurrentNode(movieData)}>
                <div className={'default' + (nodeFlag.includes('CURRENT') ? '  currentnode' : '')}>
                    <h5>{movieData.title}</h5>
                    <p>{movieData.gross.toFixed(2)}</p>
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