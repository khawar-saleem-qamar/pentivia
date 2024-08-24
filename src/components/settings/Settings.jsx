import React, { useState } from 'react'
import './settings.css'
import ProfileSettings from './ProfileSettings'
import TypingSettings from './typingSettings'
import ThemeSettings from './themeSettings'

import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from 'react-router-dom'

const Settings = () => {
    var navigate = useNavigate();
    var [currentTabBody, setCurrentTabBody] = useState(<ProfileSettings />)
    var [tabs, setTabs] = useState([{
        id: 0,
        name: "profile",
        body: <ProfileSettings />,
        active: true
        }, {
        id: 1,
        name: "typing",
        body: <TypingSettings />,
        active: false
        }, {
        id: 2,
        name: "theme",
        body: <ThemeSettings />,
        active: false
    }])

    function handleTabClick(tabid){
        var tabsCopy = tabs;
        tabsCopy = tabsCopy.map(tab => {
            if(tab.id == tabid){
                tab.active = true
                setCurrentTabBody(tab.body)
            }else{
                tab.active = false
            }
            return tab
        })

        setTabs(tabsCopy)
    }

    function navigateBack(){
        if (window.history.length > 1) {
            navigate(-1); 
          } else {
            navigate('/typing'); 
          }
    }
  return (
    <div className='SETTINGS_main-container'>
        <div className="SETTINGS_HEAD">
            <div className="SETTINGS_heading">
                <div className="SETTINGS_back" onClick={navigateBack}>
                    <IoIosArrowBack style={{fontSize: "2rem", color: "white"}} />
                </div>
                Settings</div>
            <div className="SETTINGS_tabs">
                {
                    tabs.map(tab => (
                        <div className={`SETTINGS_tab ${tab.active ? "active" : ""}`} onClick={()=>handleTabClick(tab.id)}>{tab.name}</div>
                    ))
                }
            </div>
        </div>
        <div className="SETTINGS_body">
            {currentTabBody}
        </div>
    </div>
  )
}

export default Settings