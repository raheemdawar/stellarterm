import React from 'react';
import PropTypes from 'prop-types';
import Driver from '../lib/Driver';
import AssetCard2 from './AssetCard2';
import AssetCardList from './AssetCardList';

const images = require('./../images');

export default class AssetDropDown extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpenList: false,
            isFocused: false,
            code: '',
            termAsset: null,
            activeCardIndex: null,
            enterClick: false,
        };
        this.handleClickOutside = (e) => {
            if (this.node.contains(e.target)) {
                return;
            }
            if (this.state.termAsset) {
                this.onUpdate(this.state.termAsset);
                this.setState({ code: '' });
            }
            this.setState({
                isOpenList: false,
                isFocused: false,
                activeCardIndex: null,
            });
        };
    }

    componentWillMount() {
        document.addEventListener('mousedown', this.handleClickOutside, false);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside, false);
    }

    onUpdate(asset) {
        this.props.onUpdate(asset);
        this.setState({
            isOpenList: false,
            termAsset: null,
            isFocused: false,
        });
    }

    setActiveCardIndex(e) {
        const { activeCardIndex } = this.state;
        if (e.keyCode === 40) {
            if (activeCardIndex === null) {
                this.setState({ activeCardIndex: 0 });
            } else {
                this.setState({ activeCardIndex: activeCardIndex + 1 });
            }
        }
        if (e.keyCode === 38) {
            if (activeCardIndex === null) {
                this.setState({ activeCardIndex: -1 });
            } else {
                this.setState({ activeCardIndex: activeCardIndex - 1 });
            }
        }
        if (e.keyCode === 13) {
            if (this.state.activeCardIndex !== null) {
                this.setState({ enterClick: true });
            }
        }
    }

    handleInput(e) {
        e.preventDefault();
        this.setState({
            activeCardIndex: null,
            code: e.target.value,
        });
    }

    openListByFocus() {
        this.setState({
            isOpenList: true,
            activeCardIndex: null,
        });
    }

    openList() {
        if (this.props.clear) {
            this.props.clear();
            this.setState({ termAsset: this.props.asset });
        }
        if (this.state.termAsset && this.state.isOpenList) {
            this.onUpdate(this.state.termAsset);
            this.setState({ code: '' });
        }
        this.setState({
            isOpenList: !this.state.isOpenList,
            isFocused: !this.state.isOpenList,
            activeCardIndex: null,
            enterClick: false,
        });
    }


    render() {
        const name = this.props.isBase ? 'base' : 'counter';
        const arrowClassName = this.state.isOpenList ? 'AssetDropDown__arrowUp' : 'AssetDropDown__arrowDown';
        const assetDropDownClassName = this.state.isOpenList ? 'AssetDropDown_isOpen' : null;

        return (
            <div
                className="island__sub__division AssetDropDown__card"
                ref={(node) => { this.node = node; }}>
                <div>
                    {this.props.asset ?
                        <div className="AssetDropDown__full" onClick={() => this.openList()}>
                        <AssetCard2
                            code={this.props.asset.code}
                            issuer={this.props.asset.issuer} />
                        </div> :
                        <div className={`AssetDropDown__empty ${assetDropDownClassName}`}>
                            <input
                                autoFocus={this.state.isFocused}
                                key={this.state.isFocused}
                                onFocus={() => this.openListByFocus()}
                                className="AssetDropDown__search"
                                type="text"
                                onChange={e => this.handleInput(e)}
                                onKeyUp={e => this.setActiveCardIndex(e)}
                                value={this.state.code}
                                placeholder={`Set ${name} asset`} />
                        </div>
                    }
                    <img src={images.dropdown} alt="▼" className={arrowClassName} onClick={() => this.openList()} />
                </div>
                {this.state.isOpenList ?
                    <AssetCardList
                        d={this.props.d}
                        onUpdate={(asset) => { this.onUpdate(asset); }}
                        activeCardIndex={this.state.activeCardIndex}
                        isEnterClick={this.state.enterClick}
                        code={this.state.code}
                        exception={this.props.exception} /> :
                    null
                }
            </div>
        );
    }
}

AssetDropDown.propTypes = {
    d: PropTypes.instanceOf(Driver).isRequired,
    asset: PropTypes.objectOf(PropTypes.string),
    exception: PropTypes.objectOf(PropTypes.string),
    onUpdate: PropTypes.func,
    isBase: PropTypes.bool,
    clear: PropTypes.func,
};
