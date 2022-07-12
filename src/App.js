import logo from './logo.svg';
import './App.css';
import allContacts from './contacts.json';
import {useState} from 'react';

function App() {
  const [contacts, setContacts] = useState(allContacts.slice(0,7))
  
  const addContact = () => {
    const copy = allContacts.slice()
    const newContact = copy[Math.floor(Math.random() * copy.length)]
    if(!contacts.includes(newContact)){
      setContacts([newContact, ...contacts])
    } else {
      addContact()
    }
  }

  const sortAlphabetically = () => {
    const copy = contacts.slice()
    copy.sort((a, b) => a.name.localeCompare(b.name))
    setContacts([...copy])
  }

  const sortByPopularity = () => {
    const copy = contacts.slice()
    copy.sort((a,b) => b.popularity - a.popularity)
    setContacts([...copy])
  }

  const deleteContact = (id) => {
    console.log(id)
    const index = contacts.findIndex(object => object.id === id)
    console.log(index)
    const copy = contacts.slice()
    copy.splice(index, 1)
    setContacts(copy)
  }

 
  return (
    <div className="App">

     <button onClick={addContact}> Add random contact</button> 
     <button onClick={sortAlphabetically}>Sort by name</button>
     <button onClick={sortByPopularity}>Sort by popularity</button>

    <table>
    <thead>
    <tr>
      <th>Picture</th>
      <th>Name</th>
      <th>Popularity</th>
      <th>Won an Oscar</th>
      <th>Won an Emmy</th>
      <th>Actions</th>
    </tr>
    </thead>
    <tbody>
      {contacts.map(contact => (
        <tr key= {contact.id}>
        <td><img height='90' src={contact.pictureUrl} /></td>
        <td>{contact.name}</td>
        <td>{contact.popularity}</td>
        <td>{contact.wonOscar ? '🏆' : ''}</td>
        <td>{contact.wonEmmy && '🐲'}</td>
        <td><button onClick={() => deleteContact(contact.id)}>Delete</button></td>
        </tr>   
      ))}
    </tbody>  
    </table>   
    </div>
  );
}

export default App;
