import React from 'react'

const Error = ({ text }) => {
  const errorMessages = Object.keys(text).map(name => {
    const messages = text[name].join(' ')

    return `${name} ${messages}`
  })

  return (
    <ul className="text-danger">
      {errorMessages.map(error => (
        <li key={error}>{error}</li>
      ))}
    </ul>
  )
}

export default Error
