import React from 'react'
import { StreamChat } from 'stream-chat';
import { Chat } from 'stream-chat-react';
import Cookies from 'universal-cookie';
import {ChannellistContainer, ChannelContainer} from "../components"

const apiKey = "nxq92sbfhmue";
const client = StreamChat.getInstance(apiKey);


const Dashboard = () => {
  return (
      <div className ="app_wrapper">
          <Chat client={client} theme=" team light">
              <ChannellistContainer />
              <ChannelContainer />
          </Chat>
    </div>
  )
}

export default Dashboard;