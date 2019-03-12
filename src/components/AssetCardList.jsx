import React from 'react';
import PropTypes from 'prop-types';
import Driver from '../lib/Driver';
import directory from '../directory';
import AssetCard2 from './AssetCard2';


export default class AssetCardList extends React.Component {
    constructor(props) {
        super(props);
        this.dTicker = props.d.ticker;
        this.listenId = this.dTicker.event.listen(() => {
            this.forceUpdate();
        });
    }

    componentDidUpdate(prevProps) {
        this.scrollToMyRef();
        if (this.props.isEnterClick === true && prevProps.isEnterClick === false) {
            this.handleChooseActiveAsset();
        }
    }

    componentWillUnmount() {
        this.dTicker.event.unlisten(this.listenId);
    }

    getFilterAssets() {
        const { assets } = this.dTicker.data;
        const { code, issuer } = this.props.exception || '';
        const isExceptionNative = this.props.exception && this.props.exception.isNative();

        return assets
            .filter((asset) => {
                const { unlisted } = directory.getAssetByAccountId(asset.code, asset.issuer) || {};
                const isAssetNative = new StellarSdk.Asset(asset.code, asset.issuer).isNative();
                return (
                    !unlisted && ((asset.code !== code) || (asset.issuer !== issuer)) &&
                    !(isExceptionNative && isAssetNative) &&
                    ((asset.code.indexOf(this.props.code.toUpperCase()) > -1) ||
                      (asset.domain.indexOf(this.props.code.toLowerCase()) > -1))
                );
            });
    }

    getActiveIndex() {
        const length = this.getFilterAssets().length;
        const { activeCardIndex } = this.props;
        if (length === 0) {
            return null;
        }
        let index = activeCardIndex;
        while (index < 0) {
            index += length;
        }
        while (index > (length - 1)) {
            index -= length;
        }
        return index;
    }

    scrollToMyRef() {
        if (this.activeRef) {
            this.activeRef.scrollIntoView({ block: 'center', behavior: 'smooth' });
        }
    }

    handleChoose(asset) {
        this.props.onUpdate(new StellarSdk.Asset(asset.code, asset.issuer));
    }

    handleChooseActiveAsset() {
        const filterAssets = this.getFilterAssets();
        const activeIndex = this.getActiveIndex();
        if (filterAssets.length && (activeIndex !== null)) {
            this.handleChoose(filterAssets[activeIndex]);
        }
    }

    render() {
        const filterAssets = this.getFilterAssets();
        const activeIndex = this.getActiveIndex();

        const rows = filterAssets.map((asset, index) => (
            <div
                className="AssetCardList_card"
                key={asset.id}
                ref={index === activeIndex ? (node) => { this.activeRef = node; } : null}
                onClick={() => this.handleChoose(asset)}>
                <AssetCard2 code={asset.code} issuer={asset.issuer} boxy noborder={index !== activeIndex} />
            </div>
        ));

        return (
            <div className="AssetCardList">
                {rows.length ?
                    rows :
                    <span className="AssetCardList_empty">Asset not found. Use custom pairs selector.</span>
                }
            </div>
        );
    }
}
AssetCardList.propTypes = {
    d: PropTypes.instanceOf(Driver).isRequired,
    onUpdate: PropTypes.func,
    code: PropTypes.string,
    exception: PropTypes.objectOf(PropTypes.string),
    activeCardIndex: PropTypes.number,
    isEnterClick: PropTypes.bool,
};
