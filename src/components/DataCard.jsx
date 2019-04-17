import React, {Component} from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class DataCard extends Component {

    render() {
        const { movieData } = this.props
        return (
                <div id='dataCard' className='showarrow'>
                    <h5>{movieData.title}</h5>
                    <p>{movieData.gross}</p>
                    <div className='rightarrow'>
                        <FontAwesomeIcon icon='long-arrow-alt-right' size="lg"></FontAwesomeIcon>
                    </div>
                </div>
        )
    }
}

export default DataCard