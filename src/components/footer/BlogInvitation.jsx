import React from 'react'
import "./style/blogInvitation.css"

const BlogInvitation = () => {
  return (
    <div className="BLOGINVITATION_main-container">
        <div className="BLOGINVITATION_left-container">
          <div className="BLOGINVITATION_left-heading">
              Try our Games!
          </div>
          <div className="BLOGINVITATION_left-tagline">
              Play our typing games for you to practice typing with fun
          </div>
        </div>
        <div className="BLOGINVITATION_right_container">
          <div className="BLOGINVITATION_games BLOGINVITATION_BUTTON">Play games</div>
          <div className="BLOGINVITATION_blog BLOGINVITATION_BUTTON">Visit Blog</div>
        </div>
    </div>
  )
}

export default BlogInvitation