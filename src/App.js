// src/App.js
import { useState } from "react";
import "./App.css";
import contactsList from "./contacts.json";



function App() {
  const [contacts, setContacts] = useState(contactsList.slice(0,5))

  const addContact = () => {
    const newArray = [...contacts]
    const selectRandom = contactsList[Math.floor(Math.random()*contactsList.length)]

    //We don't want to repeat
    if( newArray.includes(selectRandom)===false){
      newArray.push(selectRandom)
      setContacts(newArray)
    }
  }

  const sortName = () =>{
    const newArray = [...contacts]
    function compare(a, b) {
      if (a.name < b.name){
        return -1;
      }
      if (a.name> b.name){
        return 1;
      }
      return 0;
    }
    newArray.sort(compare);
    setContacts(newArray)
  }

  const sortPopularity = () =>{
    const newArray = [...contacts]
    function orderPop(a,b){
      return b.popularity-a.popularity
    }
    newArray.sort(orderPop);
    setContacts(newArray)
  }

  const deleteContact = (contactId) => {
    const filteredContacts = contacts.filter(contact =>{
      return contact.id !== contactId
    })
    setContacts(filteredContacts)
  }


  

  return <div className="App">
    <h1>IronContacts</h1>
    <button onClick={()=> addContact()}>Add Random Contact</button>
    <button onClick={()=> sortPopularity()}>Sort By Popularity</button>
    <button onClick={()=> sortName()}>Sort By Name</button>
    
    <table className="Table">
        <thead>
          <tr>
            <th>Picture</th>
            <th>Name</th>
            <th>Popularity</th>
            <th>Won Oscar</th>
            <th>Won Emmy</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
      {contacts.map(contact=>{
        return(
          <tr key={contact.id}>
            <td><img src={contact.pictureUrl} alt={contact.name}/></td>
            <td>{contact.name}</td>
            <td> {contact.popularity}</td>
           <td> {contact.wonOscar && <p>🏆</p>}</td>
            <td>{contact.wonEmmy && <p>🏆</p>}</td>
            <td> <button onClick={()=> deleteContact(contact.id)}>Delete</button></td>

          </tr>
          )}
        )}
        </tbody>

    </table>

  </div>;
}

  
  

export default App;

