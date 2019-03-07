import React from 'react';
import images from '../../../../../images';
import FederationInpit from './FederationInput/FederationInput';
import CopyButton from '../../../../CopyButton';

export default class Federation extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isEnabled: false,
            isEditing: false,
            addressInUse: false,
            address: 'syllik',
        };
    }

    getContent() {
        const { isEditing, isEnabled, address } = this.state;

        const userWantToEditAddress = address !== '' ? address : '';

        let left;
        if (!isEditing && !isEnabled) {
            left = (
                <React.Fragment>
                    <p className="no_federation_text">StellarTerm federation address</p>
                </React.Fragment>
            );
        } else if (isEditing) {
            left = (
                <React.Fragment>
                    <p>New federation address</p>
                    <FederationInpit address={userWantToEditAddress} />
                </React.Fragment>
            );
        } else if (isEnabled && !isEditing) {
            left = (
                <React.Fragment>
                    <p>Your StellarTerm federation address</p>
                    <strong onClick={() => this.handleEdit()}>syllik*stellarterm.com</strong>
                </React.Fragment>
            );
        }

        let right;
        if (isEditing) {
            right = (
                <React.Fragment>
                    <button className="b_transparent" onClick={() => this.handleEdit()}>
                        Cancel
                    </button>
                    <button className="s-button" onClick={() => this.handleSave()}>
                        Save
                    </button>
                </React.Fragment>
            );
        } else if (!isEditing && !isEnabled) {
            right = (
                <button className="s-button" onClick={() => this.handleEdit()}>
                    Enable
                </button>
            );
        } else if (!isEditing && isEnabled) {
            right = (
                <React.Fragment>
                    <div className="CopyButton" onClick={() => this.handleEdit()}>
                        <img src={images['icon-edit']} alt="edit" width="24" height="24" />
                        <span>EDIT</span>
                    </div>
                    <CopyButton text={address} />
                </React.Fragment>
            );
        }

        return (
            <React.Fragment>
                <div className="Account_alert_left">{left}</div>
                <div className="Account_alert_right">{right}</div>
            </React.Fragment>
        );
    }

    handleEdit() {
        this.setState({ isEditing: !this.state.isEditing });
    }

    handleSave() {
        this.setState({ isEnabled: true, isEditing: false });
    }

    checkForAddress() {
        const { addressInUse } = this.state;
        if (addressInUse) {
            return (
                <p className="Federation_warning">
                    <span>
                        <img src={images['icon-error-triangle']} alt="Error" />
                    </span>
                    <span>This federation address is already in use.Please choose a different alias.</span>
                </p>
            );
        }
        return null;
    }

    render() {
        const addressIsBusy = this.checkForAddress();
        const content = this.getContent();

        return (
            <div className="Federations_block">
                <div className="Account_alert">{content}</div>

                {addressIsBusy}

                <p className="AccountView_text">
                    You can set an alias for your StellarTerm account. We’ll use this in our trollbox, and it will
                    become your payment alias, so people can send you money more easily. You can use this alias,
                    including the*stellarx.com, instead of your public key to receive payments on Stellar.
                </p>
            </div>
        );
    }
}
