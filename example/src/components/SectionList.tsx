import React from "react";

interface Props {
	list: {
		[key: string]: {
			title: string;
			link: string;
			subs: {
				title: string;
				link: string;
				subs: { title: string; link: string }[]
			}[];
		};
	}
}

const SectionList: React.FC<Props> = (props: Props) => {

	//Used inline styles here because I was too lazy to think of class names for the elements
	//Also should probably be recursive or something so I dont need to keep adding layers
	return (
		<div className="docs-page-sections">
			{
				Object.keys(props.list).map((k, i) => (
					<div key={i} style={{
						display: "flex",
						flexDirection: "column",
					}}>
						<div style={{
							display: "flex",
							flexDirection: "row",
							lineHeight: 2,
							paddingTop: "1.5rem"
						}}>
							<div style={{ fontWeight: "bold", color: "rgba(232, 230, 227, 0.57)" }}>{k}</div>
							<div style={{ paddingLeft: "15px" }}>
								<a style={{
									color: "rgba(232, 230, 227, 0.87)",
									textDecoration: "none",
									fontWeight: "bold"
								}} href={props.list[k].link}>{props.list[k].title}
								</a>
							</div>
						</div>
						<div>
							{
								props.list[k].subs.map((s, i) => (
									<div key={i}>
										<div style={{ paddingLeft: "32px", lineHeight: 2 }}>
											<a style={{ color: "rgba(232, 230, 227, 0.57)", textDecoration: "none" }} href={s.link}>{s.title}</a>
										</div>
										{
											s.subs.map((s2, i) => (
												<div style={{ paddingLeft: "46px", lineHeight: 2 }} key={i}>
													<a style={{ color: "rgba(232, 230, 227, 0.57)", textDecoration: "none" }} href={s2.link}>{s2.title}</a>
												</div>
											))
										}
									</div>
								))
							}
						</div>
					</div>
				))
			}
		</div>
	)
}

export default SectionList;