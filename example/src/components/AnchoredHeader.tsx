import React from "react";

interface Props {
	header: string;
	hType: "h1" | "h2" | "h3" | "h4";
}

const AnchoredHeader: React.FC<Props> = (props: Props) => {

	const validID = props.header.toLowerCase().replace(" ", "");

	return (
		<table className="docs-header-table">
			<thead>
				<tr className="docs-header-table-row">
					<td className="docs-header-table-header" id={validID}>
						<props.hType className={`docs-header-table-${props.hType}`}>{props.header}</props.hType>
					</td>
					<td className="docs-header-table-anchor"><a href={`#${validID}`} title="Link to this section"><div className="gg-link"></div></a></td>
				</tr>
			</thead>
		</table >
	)
}

export default AnchoredHeader;