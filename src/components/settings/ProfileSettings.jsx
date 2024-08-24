import React from 'react'
import { CiCircleInfo } from "react-icons/ci";
import Input from '../partials/widgets/Input';
import { selectUser } from '../../App/userSlice'
import { useSelector } from 'react-redux'

const ProfileSettings = () => {
    var user = useSelector(selectUser);

  return (
    <div className='PROFILE_main-container'>
        <div className="PROFILE_head">
            <div className="PROFILE_heading">General info</div>
            <div className="PROFILE_description">Please update your profile settings here!</div>
            <div className="PROFILE_head-info">
                <div className="PROFILE_head-info-description">This information would be used for your public identification on the website.</div>
                <div className="PROFILE_head-info-icon">
                    <CiCircleInfo style={{color: "white", fontSize: "2rem"}} />
                </div>
            </div>
        </div>
        <div className="PROFILE_body">
            <Input placeholder="Update username" typg="text" label="Username" banner="pentivia.com/user/" fullSize={true} />
            <Input placeholder="Update profile picture" type="file" label="Profile Picture" profilePic={user.profilePic}/>

        </div>
    </div>
  )
}

export default ProfileSettings