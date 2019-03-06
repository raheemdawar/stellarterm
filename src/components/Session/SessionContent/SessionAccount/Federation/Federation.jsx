import React from 'react';
import images from '../../../../../images';
import FederationInpit from './FederationInput/FederationInput';

export default class Federation extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isEnabled: false,
            isEditing: false,
            addressInUse: true,
        };
    }

    checkForAddress() {
        const { addressInUse } = this.state;
        if (addressInUse) {
            return (
                <p className="Federation_warning">
                    <span>
                        <img src={images['icon-error-triangle']} className="Federation_icon" alt="Error" />
                    </span>
                    <span className="Federations_warning_text">
                        This federation address is already in use. Please choose a different alias.
                    </span>
                </p>
            );
        }
        return null;
    }

    handleEdit() {
        this.setState({ isEditing: !this.state.isEditing });
    }

    handleSave() {
        this.setState({ isEnabled: true });
    }

    render() {
        const { isEditing, isEnabled } = this.state;
        const addressIsBusy = this.checkForAddress();

        return (
            <div className="Federations_block">
                <div className="s-alert s-alert--primary Federations_alert">
                    {isEditing ? (
                        <React.Fragment>
                            <p className="Sesssion__yourId__title">New federation address</p>
                            <FederationInpit />
                        </React.Fragment>
                    ) : (
                        <div className="Federations_left">StellarTerm federation address</div>
                    )}

                    {isEnabled ? (
                        <React.Fragment>
                            <p className="Sesssion__yourId__title">Your StellarTerm federation address</p>
                            <strong className="Sesssion__yourId__accountId">
                                alexey.s@razortheory.com*stellarterm.com
                            </strong>
                        </React.Fragment>
                    ) : null}

                    <div className="Federations_right">
                        {isEditing ? (
                            <React.Fragment>
                                <button
                                    className="s-button Federation_button_transparent"
                                    onClick={() => this.handleEdit()}>
                                    Cancel
                                </button>
                                <button className="s-button Federations_button" onClick={() => this.handleSave()}>
                                    Save
                                </button>
                            </React.Fragment>
                        ) : (
                            <button className="s-button Federations_button" onClick={() => this.handleEdit()}>
                                Enable
                            </button>
                        )}

                        {isEnabled ? (
                            <React.Fragment>
                                <button className="s-button Federation_button_transparent">
                                    {' '}
                                    <img src={images['icon-edit']} className="Federation_icon" alt="Error" />
                                    Edit
                                </button>
                                <button className="s-button Federations_button">
                                    {' '}
                                    <img src={images['icon-copy']} className="Federation_icon" alt="Error" />
                                    Copy
                                </button>
                            </React.Fragment>
                        ) : null}
                    </div>
                </div>
                <div className="Session__account__text">
                    {addressIsBusy}
                    <p>
                        You can set an alias for your StellarTerm account. We’ll use this in our trollbox, and it will
                        become your payment alias, so people can send you money more easily. You can use this alias,
                        including the*stellarx.com, instead of your public key to receive payments on Stellar.
                    </p>
                </div>
            </div>
        );
    }
}
