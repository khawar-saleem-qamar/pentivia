import React from 'react'
import '../styles/notFound.css'
import notFoundBanner from "../../assets/images/404.png"
import Button from './widgets/Button'
import { useNavigate } from 'react-router-dom'

const NotFound = () => {
    var navigate = useNavigate();
    function handleClick(){
        navigate("/typing")
    }

    return (
        <div className='NOTFOUND_main-container light'>
            <div className="NOTFOUND_head">Page not found!</div>
            <div className="NOTFOUND_tagline">We could not find any page to serve for this route!</div>
            <img className='NOTFOUND_banner' src={notFoundBanner} alt="404 not found" />
            <Button fit={true} text="Go to typing" handleClick={handleClick} />
        </div>
    )
}

export default NotFound