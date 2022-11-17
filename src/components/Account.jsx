
import React, { Component } from 'react';
import axios from 'axios'
import { Navigate } from "react-router-dom";

export default class Account extends Component {
  constructor(){
    super();

    this.state = {
      userID: '',
      vaultAppName: '',
      vaultUsername: '',
      vaultPassword: '',
      vaultEntries: []
  }

    this.vaultGet = this.vaultGet.bind(this);
    this.vaultPost = this.vaultPost.bind(this);
    this.handleChange = this.handleChange.bind(this);

  }

  componentDidMount(){

    this.vaultGet()
  }
  

  vaultGet(){
    const saved = localStorage.getItem("user");
      axios
      .get(`http://localhost:5000/vault/${saved}`)
      .then(res => this.setState({
        vaultEntries: res.data.vault_entry,
        
      }))
      .catch(err => console.error(err))
    }
    
  
  vaultPost(e){
    const saved = localStorage.getItem("user");
    
    let data = {
    vaultAppName: this.state.vaultAppName,
    vaultUsername: this.state.vaultUsername,
    vaultPassword: this.state.vaultPassword,
    }
    console.log(data)
      axios

      .post(`http://localhost:5000/vault/${saved}`, data)
      .then(res => console.log(res))
      .then(res => this.setState({
        user: res.data.user,
        successfulLogin: true
        
      }))
      .catch(err => console.error(err))
      }
    


    handleChange(e){
      this.setState({
        [e.target.name] : e.target.value
      })

      console.log(this.state.vaultPassword)
    }


  render() {
    return (
        <div>
        <div className="logo">
            <h1><span className="auto-type"></span></h1>
        </div>
   
        <div>
    <header>
    
        <h1>Password List</h1>
     </header>
     
        </div>
   <div>
   <form>
      <div>
      </div>
      <div>
        <input 
        type="text" 
        className="app-input" 
        placeholder="App Name" 
        name="vaultAppName"
        onChange={this.handleChange}
        />
      </div>
      <div>
        <input 
        type="text" 
        className="account-input" 
        placeholder="Username" 
        name="vaultUsername"
        onChange={this.handleChange}
        />
      </div>
      <div>
        <input 
        type="text" 
        className="password-input" 
        placeholder="Password"
        name="vaultPassword"
        onChange={this.handleChange}
        />
      </div>
      <button onClick={this.vaultPost} className="password-button" type= "submit">
        Submit Entry <i className="fa-solid fa-plus"></i>
     </button>
   </form>
   </div>
    <div className="password-container">
      <ul className="password-list">
      <div>
        {this.state.vaultEntries.map(item => (
            <div key="item.userID">
                <p>App Name: {item.vaultAppName} | Username: {item.vaultUsername} | Password: {item.vaultPassword}</p>
            </div>
        ))}
     </div>
      </ul>
    </div>
    {this.state.successfulLogin && <Navigate to="/account" />}
        </div>
    )
  }
}

