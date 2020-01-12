import React, { createContext, useState } from 'react'

export const UserContext = createContext([{}, () => {}])
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    loading: false,
    logged: false,
    user: null
  })

  return (
    <UserContext.Provider value={[user, setUser]}>
      {children}
    </UserContext.Provider>
  )
}
