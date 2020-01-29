import React, { createContext, useReducer } from 'react'

const initialState = {
  loading: false,
  logged: null,
  user: null
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'LOADING':
      return { ...state, loading: true }
    case 'LOGIN':
      return { ...state, logged: true, loading: false, user: action.payload }
    case 'LOGOUT':
      return { ...initialState, logged: false }
    default:
      return state
  }
}

export const UserContext = createContext()
export const UserProvider = ({ children }) => {
  const value = useReducer(reducer, initialState)
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}
