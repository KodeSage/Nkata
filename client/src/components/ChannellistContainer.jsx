/** @format */

import React, { useState } from "react";
import { ChannelList, useChatContext } from "stream-chat-react";
import Cookies from "universal-cookie";
import { ChannelSearch, TeamChannelList, TeamChannelPreview } from ".";
import { FaRocketchat } from "react-icons/fa";
import { RiLogoutCircleLine } from "react-icons/ri";
import { BsPersonVideo3 } from "react-icons/bs";

const cookies = new Cookies();

const SideBar = ({ logout }) => (
	<div className="channel-list__sidebar">
		<div className="channel-list__sidebar__icon1">
			<div className="icon1__inner">
				<FaRocketchat size={30} />
			</div>
		</div>
		<div className="channel-list__sidebar__icon2">
			<div className="icon1__inner" onClick={logout}>
				<RiLogoutCircleLine size={30} />
			</div>
		</div>
	</div>
);

const CompanyHeader = () => (
	<div className="channel-list__header">
		<p className="channel-list__header__text">Nkata</p>
	</div>
);

const customChannelTeamFilter = (channels) => {
	return channels.filter((channel) => channel.type === "team");
};

const customChannelMessagingFilter = (channels) => {
	return channels.filter((channel) => channel.type === "messaging");
};

const ChannelListContent = ({
	isCreating,
	setIsCreating,
	setCreateType,
	setIsEditing,
	setToggleContainer,
}) => {
	const { client } = useChatContext();

	const logout = () => {
		cookies.remove("token");
		cookies.remove("userId");
		cookies.remove("username");
		cookies.remove("fullName");
		cookies.remove("avatarURL");
		cookies.remove("hashedPassword");
		cookies.remove("phoneNumber");

		window.location.reload();
	};

	const filters = { members: { $in: [client.userID] } };

	return (
		<>
			<SideBar logout={logout} />
			<div className="channel-list__list__wrapper">
				<CompanyHeader />
				<ChannelSearch setToggleContainer={setToggleContainer} />
				<ChannelList
					filters={filters}
					channelRenderFilterFn={customChannelTeamFilter}
					List={(listProps) => (
						<TeamChannelList
							{...listProps}
							type="team"
							isCreating={isCreating}
							setIsCreating={setIsCreating}
							setCreateType={setCreateType}
							setIsEditing={setIsEditing}
							setToggleContainer={setToggleContainer}
						/>
					)}
					Preview={(previewProps) => (
						<TeamChannelPreview
							{...previewProps}
							setIsCreating={setIsCreating}
							setIsEditing={setIsEditing}
							setToggleContainer={setToggleContainer}
							type="team"
						/>
					)}
				/>
				<ChannelList
					filters={filters}
					channelRenderFilterFn={customChannelMessagingFilter}
					List={(listProps) => (
						<TeamChannelList
							{...listProps}
							type="messaging"
							isCreating={isCreating}
							setIsCreating={setIsCreating}
							setCreateType={setCreateType}
							setIsEditing={setIsEditing}
							setToggleContainer={setToggleContainer}
						/>
					)}
					Preview={(previewProps) => (
						<TeamChannelPreview
							{...previewProps}
							setIsCreating={setIsCreating}
							setIsEditing={setIsEditing}
							setToggleContainer={setToggleContainer}
							type="messaging"
						/>
					)}
				/>
				<div className="team-channel-list">
					<div className="team-channel-list__header">
						<a
							href="https://nkata-s.vercel.app/"
							target="_blank"
							rel="noreferrer">
							<p className="team-channel-list__header__title">
								Video-Voice Chat{" "}
								<span>
									<BsPersonVideo3 size={15} />
								</span>
							</p>
						</a>
					</div>
				</div>
			</div>
		</>
	);
};

const ChannelListContainer = ({
	setCreateType,
	setIsCreating,
	setIsEditing,
}) => {
	const [toggleContainer, setToggleContainer] = useState(false);

	return (
		<>
			<div className="channel-list__container">
				<ChannelListContent
					setIsCreating={setIsCreating}
					setCreateType={setCreateType}
					setIsEditing={setIsEditing}
				/>
			</div>

			<div
				className="channel-list__container-responsive"
				style={{
					left: toggleContainer ? "0%" : "-89%",
					backgroundColor: "#005fff",
				}}>
				<div
					className="channel-list__container-toggle"
					onClick={() =>
						setToggleContainer((prevToggleContainer) => !prevToggleContainer)
					}></div>
				<ChannelListContent
					setIsCreating={setIsCreating}
					setCreateType={setCreateType}
					setIsEditing={setIsEditing}
					setToggleContainer={setToggleContainer}
				/>
			</div>
		</>
	);
};

export default ChannelListContainer;
