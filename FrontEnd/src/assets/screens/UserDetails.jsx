import React, { useContext } from 'react'
import {UserDetailsToggleButton} from './../../Context/UserDetailsContext'
function UserDetails() {
  const {userDetailsToggle,setUserDetailsToggle} = useContext(UserDetailsToggleButton)
  return (
    <div className="" style={{backgroundColor:'red',margin:'1000px'}}>
      jashfasannskfkhf
      {userDetailsToggle=='profile'?"profile":""}
      {userDetailsToggle=='orders'?"orders":""}
      {userDetailsToggle=='fav'?"fav":""}
      {userDetailsToggle=='cart'?"cart":""}
    </div>
  )
}

export default UserDetails
