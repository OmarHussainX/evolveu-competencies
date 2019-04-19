import React, {Component} from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


// Displays a Node's Movie data (title, gross) on a 'card'
//
// When the data source is a linked list:
// - the card for the current Node receives a CSS class to distinguish it
// - the cards for all Nodes BUT the tail receive right-linking arrows
//
// When the data source is a queue or stack:
// - the card for the front of the queue/top of the stack receives
//   a CSS class to distinguish it

class MovieCard extends Component {

    render() {
        const { nodeFlag, dataSource, movieNode, clickHandler } = this.props

        // Set the base CSS class depending on the source data structure
        let cardClass = (dataSource === 'linked list') ? 'linkedlist' : 'stackorqueue'

        // Apply additional CSS class for the current Node in a linked list, and
        // the first item out from a stack or queue
        if (nodeFlag.includes('CURRENT') || nodeFlag.includes('FIRSTOUT')) {
            cardClass += ' currentnode'
        }

        return (
            <div className='dataCard' onClick={clickHandler(movieNode)}>
                <div className={cardClass}>
                    <h5>{movieNode.data.title}</h5>
                    <p>{movieNode.data.gross.toFixed(2)}M</p>
                    {dataSource === 'linked list' && !nodeFlag.includes('TAIL') && <div
                    className={'rightarrow'}>
                        <FontAwesomeIcon icon='long-arrow-alt-right' size="lg"></FontAwesomeIcon>
                    </div>}
                    {(dataSource === 'queue' || dataSource === 'stack') && nodeFlag.includes('FIRSTOUT') && <div
                    className={'firstoutarrow'}>
                        <FontAwesomeIcon icon='long-arrow-alt-right' size="lg"></FontAwesomeIcon>
                    </div>}
                </div>
            </div>
        )
    }
}

export default MovieCard