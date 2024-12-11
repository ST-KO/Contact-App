import { useEffect, useState } from 'react'
import axios from 'axios'
import Contact from './Components/Contact'
import './App.css'

function App() {
  const [contacts, setContacts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then(response => {
        setContacts(response.data)
        setLoading(false)
      })
      .catch(error => {
        setError("Failed to fetch contacts")
        setLoading(false)
      })
  }, [])

  if (loading) return <div className="loading">Loading Data....</div>
  if (error) return <div className="error">{error}</div>

  return (
    <>
      <div className="container">
        <h1>Contacts</h1>
          <div className="contacts">
              {contacts.map(contact => (
                <Contact key={contact.id} contact={contact} />
              ))}
          </div>
      </div>
    </>
  )
}

export default App
