import React, { useState } from 'react'
import { UserDetailsToggleButton } from './UserDetailsContext'

export function UserDetailsToggleContextProvider({children}) {

  const [userDetailsToggle,setUserDetailsToggle] = useState('profile')
  return (
    <UserDetailsToggleButton.Provider value={{userDetailsToggle,setUserDetailsToggle}}>
      {children}
    </UserDetailsToggleButton.Provider>
  )
}

