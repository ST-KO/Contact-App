import React from 'react'

const Contact = ({ contact }) => {
  return (
    <div className="contact-card">
        <h2>{contact.name}</h2>
        <p>Email: {contact.email}</p>
        <p>Phone: {contact.phone}</p>
        <p>City: {contact.address.city}</p>
    </div>
  )
}

export default Contact