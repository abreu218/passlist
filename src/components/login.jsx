// import React, { useState }from "react";
// import Axios from 'axios'
// // import { useNavigate } from "react-router-dom";
// function Account(){
    
//     const [account, setAccount] = useState("")
//     const [password, setPassword] = useState("")
//     // const navigate = useNavigate('')
    
//     function login(e){
//       e.preventDefault()

//       let data = {
//         user: account,
//         userPass: password
//       }
//       Axios
//       .post('http://localhost:5000/login', data)
//       .then(res => console.log(res))
//       //TODO:.then(res => navigate('/mypasswords'))
//       .catch(err => console.error(err))
//     };
    
//     return (
//         <div>
//         <div className="logo">
//             <h1><span className="auto-type"></span></h1>
//         </div>
   
//         <div>
//     <header>
//         <h1>My Password List</h1>
//      </header>
//         </div>
//    <div>
//    <form>
//       <div>
//       </div>
//       <div>
//         <input 
//         type="text" 
//         className="account-input" 
//         placeholder="Account Name" 
//         name="user"
//         onChange={(event)=>{setAccount(event.target.value)}}
//         />
//       </div>
//       <div>
//         <input 
//         type="text" 
//         className="password-input" 
//         placeholder="Password"
//         name="userPass"
//         onChange={(event)=>{setPassword(event.target.value)}} 
//         />
//       </div>
//       <button onClick={login} className="password-button" type= "submit">
//         Submit <i className="fa-solid fa-plus"></i>
//      </button>
//    </form>
//    </div>
//     <div className="password-container">
//       <ul className="password-list">
        

//       </ul>
//     </div>

//     <div id="root"></div>
//     <footer className="footer">
//       <div id="footer-container">© Alex Abreu <span id="currentYear"></span></div>
//     </footer>
//         </div>
//     )
// }

// export default Account;

import React, { Component } from 'react';
import axios from 'axios'
import { Navigate } from "react-router-dom";

export default class Login extends Component {
  constructor(){
    super();

    this.state = {
      user: {},
      username: '',
      password: '',
      successfulLogin: false
    }

    this.handleLogin = this.handleLogin.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleUserSet = this.handleUserSet.bind(this);
  }
 
  handleLogin(e){
    e.preventDefault()

     let data = {
        user: this.state.username,
        userPass: this.state.password
      }
      axios
      .post('https://abreu-backend.herokuapp.com/login', data)
      .then(res => this.setState({
        user: res.data.user,
        successfulLogin: true
      }))
      
      .catch(err => console.error(err))
      }
      handleUserSet(){
       localStorage.setItem('user', this.state.user.id)
      }
    handleChange(event){
      event.preventDefault()
      this.setState({
        [event.target.name] : event.target.value
      })

      console.log(this.state.password)
    }
    

  render() {
    return (
        <div>
        <div className="logo">
            <h1><span className="auto-type"></span></h1>
        </div>
   
        <div>
    <header>
        <h1>Login</h1>
     </header>
        </div>
   <div>
   <form>
      <div>
      </div>
      <div>
        <input 
        type="text" 
        className="account-input" 
        placeholder="Account Name" 
        name="username"
        onChange={this.handleChange}
        />
      </div>
      <div>
        <input 
        type="text" 
        className="password-input" 
        placeholder="Password"
        name="password"
        onChange={this.handleChange}
        />
      </div>
      <button onClick={this.handleLogin} className="password-button" type= "submit">
        Login <i className="fa-solid fa-plus"></i>
     </button>
   </form>
   </div>
    {this.state.successfulLogin && (this.handleUserSet(), <Navigate to="/account" />)}
        </div>
    )
  }
}
