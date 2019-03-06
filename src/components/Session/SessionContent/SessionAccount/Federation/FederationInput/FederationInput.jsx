import React from 'react';
import AutosizeInput from 'react-input-autosize';

export default class FederationInpit extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            inputValue: '',
        };
    }

    handleInput(event) {
        this.setState({ inputValue: event.target.value });
    }

    render() {
        const { inputValue } = this.state;

        return (
            <div className="Federation_input">
                <AutosizeInput
                    type="text"
                    name="inputPriceAsset"
                    className="Federation_input"
                    placeholder="Type here..."
                    value={inputValue}
                    onChange={e => this.handleInput(e)}
                    autoFocus />
                <span>*stellarterm.com</span>
            </div>
        );
    }
}
