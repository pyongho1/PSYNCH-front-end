import { Link } from "react-router-dom";
import "./MainFeedBars.css";

import { useState, useEffect } from "react";

//COMPONENETS
import FriendList from "../../components/FriendList/FriendList";
import Stats from "../../components/Stats/Stats"

//SERVICES


const linkStyle = {
  textDecoration: "none",
  color: "black",
};

const MainFeedBars = ({ user, allPosts, userProfile}) => {
  //STATES
  let [selectedFriendsList, setSelectedFriendsList] = useState(false);
  let [selectedHome, setSelectedHome] = useState(true);
  let [selectedProfile, setSelectedProfile] = useState(false)


  let [selectedStats, setSelectedStats] = useState(false)





  return (
    <>
      <div
        className={
          `left-sidebar ${selectedFriendsList ? "friendsActive" : "friendsInactive"}`}
        >
        <div className='component-container-left' >
          <div className={`loaded-component ${
              selectedFriendsList ? "active" : "inactive"
            }`}>
            <FriendList user={user} />
          </div>
        </div>
        <div className="ls-icon-wrapper">
        <Link style={linkStyle} to={`/main-feed`}>
          <div
          
            id="ls-icon-container"
            className={`home-icon ${selectedHome ? "active" : "inactive"}`}
            onClick={() => setSelectedHome(!selectedHome)}
          >
            <i id="ls-icon" class="fa-solid fa-house"></i>
          </div>

          </Link>
          
          <Link to={`/profile/${user.profile}`}
          >
            <div id="ls-icon-container" 
            className={`profile-icon ${
              selectedProfile ? "active" : "inactive"
            }`}
            onClick={() => setSelectedProfile(!selectedProfile)}>
              <i id="ls-icon" class="fa-solid fa-user"></i>
            </div>
          </Link>

          <div
            id="ls-icon-container"
            className={`friends-list-icon ${
              selectedFriendsList ? "active" : "inactive"
            }`}
            onClick={() => setSelectedFriendsList(!selectedFriendsList)}
          >
            <i id="ls-icon" class="fa-solid fa-user-group"></i>
          </div>
          <Link style={linkStyle} to="/posts/new">
            <div id="ls-icon-container">
              <i id="ls-icon" class="fa-solid fa-pen-to-square"></i>
            </div>
          </Link>
        </div>
      </div>

      <div className={`right-sidebar ${
          selectedStats ? "statsActive" : "statsInactive"
        }`}>
          
        <div className="rs-icon-wrapper">
          <div id="rs-icon-container" className={`stats-icon ${ 
            selectedStats ? "active" : "inactive"
          }`}
            onClick={() => setSelectedStats(!selectedStats)}
          >
            <i id="rs-icon" class="fa-solid fa-chart-simple"></i>
          </div>
        </div>

        <div className='component-container-right' >
          <div className={`loaded-component ${
              selectedStats ? "active" : "inactive"
            }`}>
            <Stats user={user} allPosts={allPosts} userProfile={userProfile}/>
          </div>
        </div>
        
      </div>

      <div className="bottom-sidebar">
        <Link style={linkStyle} to='/main-feed'>
            <div id="bt-icon-container">
              <i id="bt-icon" class="fa-solid fa-house "></i>
            </div>
        </Link>
        <Link style={linkStyle} to={`/profile/${user.profile}`}>
            <div id="bt-icon-container">
              <i id="bt-icon" class="fa-solid fa-user "></i>
            </div>
          </Link>
        <Link style={linkStyle} to={`/friends`}>
            <div id="bt-icon-container">
              <i id="bt-icon" class="fa-solid fa-user-group"></i>
            </div>
          </Link>
        <Link style={linkStyle} to="/posts/new">
            <div id="bt-icon-container">
              <i id="bt-icon" class="fa-solid fa-pen-to-square"></i>
            </div>
          </Link>
        <Link style={linkStyle} to="/stats">
            <div id="bt-icon-container">
              <i id="bt-icon" class="fa-solid fa-chart-simple"></i>
            </div>
          </Link>
        {/* <div>
          <i class="fa-solid fa-chart-simple fa-2x"></i>
        </div> */}
      </div>

    </>
  );
};

export default MainFeedBars
