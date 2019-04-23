import React from 'react'

class Modal extends React.Component {
    render() {

        return (
            <div id="modalbackdrop" onClick={this.props.toggleModal}>
                <div id="modalcontent" onClick={this.props.onModalContentclick}>
                <button id='closeModal' onClick={this.props.toggleModal}>x</button>
                    {this.props.children}
                    <div id="modalfooter">
                    </div>
                </div>
            </div>
        )
    }
}

export default Modal