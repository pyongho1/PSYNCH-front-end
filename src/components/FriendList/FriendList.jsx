
import { useState, useEffect } from 'react';

import * as emotionPostService from '../../services/emotionPostService'
import * as profileService from '../../services/profileService'

import Friend from './Friend';
import PendingRequests from '../FriendRequests/PendingRequests/PendingRequests';

import './FriendList.css'




const FriendList = ({user}) => {
  const [userProfile, setUserProfile] = useState([])
  const [friends, setFriends] = useState([])
  const [feed, setFeed] = useState([])


  useEffect(() => {
    const fetchProfile = async () => {
      const profileData = await profileService.show(user.profile)
      setUserProfile(profileData)
    }
    fetchProfile()
  }, [user.profile])


  useEffect(() => {
    const fetchFriends = async () => {
      const friendsData = await profileService.friendsIdx();
      setFriends(friendsData);
    };
    fetchFriends();
  }, [user]);

  // console.log(friends)


  useEffect(() => {
    const fetchFeed = async () => {
      const feedData = await emotionPostService.feed()
      setFeed(feedData)
    }
    fetchFeed()
  }, [friends])

  // console.log('Feed:', feed)
  // console.log('Friends:', friends)
  // console.log(feed.find((post) => post.author._id = '63dff7e2ae6630b0ec58ba71').emotion)
  // const recentEmotion = async (friend) => {
  //   try {
  //     return (
  //       feed.find((post) => post.author._id === friend._id)

  //     )
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  // console.log('recentEmotion0:', recentEmotion(friends[0]))
  // async function findPost(friend) {
  //   feed.find((post) => post.author._id === friend._id)
  //   .then(post => {
  //     return post.emotion
  //   })
  // }

  return ( 
    <>
      <div className='title-container'>
        <p className='page-title'>Friends</p>
      </div>
      <div className='requests-section'>
        <p className='requests-subtitle'>Requests</p>
        <PendingRequests friends={friends} setFriends={setFriends}/>
      </div>
      <div className='friends-section'>
      <div className='friend-section-header'>
          <p>Friend</p>
          <p>Current Status</p>
      </div>
        {friends.length !== 0 ?
        friends.map((friend) => {
          return (
            <>
                <Friend friend={friend} key={friend._id}/>
            </>
          )
        })
        :
        <p className='placeholder-text'>No friends</p>
        }
      </div>
    </>
  );
}

export default FriendList;