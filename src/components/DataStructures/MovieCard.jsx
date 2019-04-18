import React, {Component} from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


// Displays a Node's Movie data (title, gross) on a 'card'
// - the card for the current Node receives a CSs class to distinguish it
// - the cards for all Nodes BUT the tail receive right-linking arrows
class MovieCard extends Component {

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

export default MovieCard