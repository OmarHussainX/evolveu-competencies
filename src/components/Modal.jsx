import React from 'react'

class Modal extends React.Component {
    render() {

        return (
            <div id="modalbackdrop" onClick={this.props.onClose}>
                <div id="modalcontent" onClick={this.props.onModalContentclick}>
                    {this.props.children}
                    <div id="modalfooter">
                    </div>
                </div>
            </div>
        )
    }
}

export default Modal