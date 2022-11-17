
// // Selectors
// const appInput = document.querySelector('.app-input');
// const accountInput = document.querySelector('.account-input');
// const passwordInput = document.querySelector('.password-input');
// const passwordButton = document.querySelector('.password-button');
// const passwordList= document.querySelector('.password-list');

// // listeners
// document.addEventListener('DOMContentLoaded', getPasswords)
// passwordButton.addEventListener("click", addPassword);
// passwordList.addEventListener("click", deletePassword);

// function addPassword(event){
//     event.preventDefault();
    
//     const passwordDiv = document.createElement('div');
//     passwordDiv.classList.add('password');

//     const newApp = document.createElement('li');
//     const newPassword = document.createElement('li');
//     const newAccount = document.createElement('li')
    
//     newApp.innerText = `App/Website: ${appInput.value}`
//     newAccount.innerText = `Account Name: ${accountInput.value}`
//     newPassword.innerText = `Password: ${passwordInput.value}`
    
//     newApp.classList.add('app-item')
//     newAccount.classList.add('account-item')
//     newPassword.classList.add('password-item');
   
//     // add to local 
//     saveLocalPass(appInput.value, accountInput.value, passwordInput.value)

//     passwordDiv.appendChild(newApp);
//     passwordDiv.appendChild(newAccount);
//     passwordDiv.appendChild(newPassword);
     

 
//     // delete button
    
//     const deleteButton = document.createElement('button');
//     deleteButton.innerHTML = '<i class="fa-solid fa-delete-left"></i>'
//     deleteButton.classList.add("delete-btn")
//     passwordDiv.appendChild(deleteButton)
    
//     //append to div
//     passwordList.appendChild(passwordDiv)

//     //Clear box
//     appInput.value = ""
//     accountInput.value = ""
//     passwordInput.value = ""

// }

// function deletePassword(event){
//     const item = event.target;
//     if (item.classList[0] === 'delete-btn') {
//         const password = item.parentElement;
//         password.remove();
//     }
// }

// function saveLocalPass(app, account, password){
//     let apps;
//     let accounts;    
//     let passwords;
//     if (localStorage.getItem("passwords") === null) {
//         apps = [];
//         accounts = [];
//         passwords = [];
//      }else{
//         apps = JSON.parse(localStorage.getItem("apps"));
//         accounts = JSON.parse(localStorage.getItem("accounts"));
//         passwords = JSON.parse(localStorage.getItem("passwords"));
//      }
//      apps.push(app);
//      accounts.push(account);
//      passwords.push(password);

//      localStorage.setItem("apps", JSON.stringify(apps))
//      localStorage.setItem("accounts", JSON.stringify(accounts))
//      localStorage.setItem("passwords", JSON.stringify(passwords))
// }


// // load local file
// function getPasswords(){
//     let apps;
//     let accounts;    
//     let passwords;
//     if (localStorage.getItem("passwords") === null) {
//         apps = [];
//         accounts = [];
//         passwords = [];
//      }else{
//         apps = JSON.parse(localStorage.getItem("apps"));
//         accounts = JSON.parse(localStorage.getItem("accounts"));
//         passwords = JSON.parse(localStorage.getItem("passwords"));
//      }
//     passwords.forEach(function(app, account, password){
//         const passwordDiv = document.createElement('div');
//         passwordDiv.classList.add('password');

//         const newApp = document.createElement('li');
//         const newPassword = document.createElement('li');
//         const newAccount = document.createElement('li')
        
//         newApp.innerText = `App/Website: ${app}`
//         newAccount.innerText = `Account Name: ${account}`
//         newPassword.innerText = `Password: ${password}`
        
//         newApp.classList.add('app-item')
//         newAccount.classList.add('account-item')
//         newPassword.classList.add('password-item');
    
//         // add to local 
//         passwordDiv.appendChild(newApp);
//         passwordDiv.appendChild(newAccount);
//         passwordDiv.appendChild(newPassword);
           
//         // delete button
//         const deleteButton = document.createElement('button');
//         deleteButton.innerHTML = '<i class="fa-solid fa-delete-left"></i>'
//         deleteButton.classList.add("delete-btn")
//         passwordDiv.appendChild(deleteButton)
        
//         //append to div
//         passwordList.appendChild(passwordDiv)
//     })
// }
