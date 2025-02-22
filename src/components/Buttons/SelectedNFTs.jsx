import { useSelector, React } from "react-redux";
import PropTypes from "prop-types";

export default function SelectedNFTs({ show, on }) {
	let selected = useSelector((state) => state.general.selectedNFTList);
	let nfts = useSelector((state) => state.general.NFTList);

	return (
		<div onClick={show} className="selected-nfts__button">
			<span className="selected-nfts__title">{!on ? "Selected" : "Back"}</span>
			{/* <span className="selected-nfts__selected">{`/ ${
                selected ? selected.length : ""
            } `}</span> */}
			{nfts?.length ? (
				<>
					<span className="selected-nfts__selected">
						{selected?.length} / {nfts?.length}
					</span>
				</>
			) : (
				<span className="selected-nfts__selected">0 / 0</span>
			)}
		</div>
	);
}

SelectedNFTs.propTypes = {
	show: PropTypes.bool,
	on: PropTypes.bool,
};
