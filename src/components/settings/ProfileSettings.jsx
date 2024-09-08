import React from 'react'
import { CiCircleInfo } from "react-icons/ci";
import Input from '../partials/widgets/Input';
import { selectUser } from '../../App/userSlice'
import { useSelector } from 'react-redux'

const ProfileSettings = ({reference}) => {
    var user = useSelector(selectUser);

  return (
    <div className='SETTINGSECTION_main-container profile_settings'>
        <div className="SETTINGSECTION_head">
            <div className="SETTINGSECTION_heading">General info</div>
            <div className="SETTINGSECTION_description">Please update your profile settings here!</div>
            <div className="SETTINGSECTION_head-info">
                <div className="SETTINGSECTION_head-info-description">This information would be used for your public identification on the website.</div>
                <div className="SETTINGSECTION_head-info-icon">
                    <CiCircleInfo style={{color: "white", fontSize: "2rem"}} />
                </div>
            </div>
        </div>
        <div className="SETTINGSECTION_body">
            <Input reference={reference} placeholder="Update profile picture" type="file" label="Profile Picture" fullSize={true} profilePic={user.profilePic} bottomBorder={true} name="profilePic"/>
            <Input placeholder="Update username" typg="text" label="Username" banner="pentivia.com/user/" fullSize={true} value={user.username} bottomBorder={true} name="username"/>
            <Input placeholder="Hi there!👋 I'm a web developer and I am here to get a stunning typing speed with fun!" type="textarea" label="Biography" fullSize={true} bottomBorder={true} value={user.bio} name="bio"/>
            <Input shadow={false} type="checkboxgroup" label="Notifications" fullSize={true} bottomBorder={true} checkboxgroups={[
                {
                    name: "requestNotifications",
                    title: "show notifications related to friend requests",
                    selected: user.requestNotifications
                },
                {
                    name: "chatNotifications",
                    title: "show notifications for messages and chats",
                    selected: user.chatNotifications
                },
                {
                    name: "requestAnnouncements",
                    title: "show announcement notifications",
                    selected: user.requestAnnouncements
                },
                {
                    name: "updateNotifications",
                    title: "show notifications related to new features",
                    selected: user.updateNotifications
                }
            ]}/>
    
        </div>
    </div>
  )
}

export default ProfileSettings