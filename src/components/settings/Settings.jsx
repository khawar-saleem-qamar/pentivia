import React, { useEffect, useRef, useState } from 'react'
import './settings.css'
import ProfileSettings from './ProfileSettings'
import TypingSettings from './typingSettings'
import ThemeSettings from './themeSettings'

import { IoIosArrowBack } from "react-icons/io";
import { useNavigate, useSearchParams  } from 'react-router-dom'
import { LuSaveAll } from "react-icons/lu";

const Settings = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [tabValue, setTabValue] = useState(searchParams.get('tab') || "profile");
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
    var [currentTabBody, setCurrentTabBody] = useState(<ProfileSettings />)

    useEffect(()=>{
        var found = false;
        tabs.map(tab => {
            if(tab.name === tabValue){
                // setCurrentTabBody(tab.body);
                handleTabClick(tab.id)
                found = true;
            }
        })
        if(!found){
            setTabValue("profile")
        }
    }, [])
    var navigate = useNavigate();
    var settingsForm = useRef(null)

    function handleTabClick(tabid){
        var tabsCopy = tabs;
        tabsCopy = tabsCopy.map(tab => {
            if(tab.id == tabid){
                tab.active = true
                setCurrentTabBody(tab.body)
                setTabValue(tab.name)
                navigate(`/settings?tab=${tab.name}`)
                // setSearchParams({tab: tab.name})
            }else{
                tab.active = false
            }
            return tab
        })

        setTabs(tabsCopy)
    }

    function navigateBack(){
        // if (window.history.length > 1) {
        //     console.log(window.history);
        //     navigate(-1); 
        //   } else {
            navigate('/typing'); 
        //   }
    }

    function handleSubmit(e){
        e.preventDefault();
        const formData = new FormData(e.target);

        const formDataObj = Object.fromEntries(formData.entries());
        console.log('Form data as an object:', formDataObj);
        
    }
  return (
    <form method="POST" onSubmit={handleSubmit} ref={settingsForm} className='SETTINGS_main-container wrap-container'>
        <div className="SETTINGS_HEAD">
            <div className="SETTINGS_heading">
                <div className="SETTINGS_back" onClick={navigateBack}>
                    <IoIosArrowBack style={{fontSize: "2rem", color: "white"}} />
                </div>
                Settings
                <button className='SETTINGS_submit-settings' type="submit"><LuSaveAll style={{color: "#ffffff", fontSize: "1.5rem"}} /> 
                <span> Save</span></button>
            </div>
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
    </form>
  )
}

export default Settings