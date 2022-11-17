import React from "react";
import {Routes, Route} from 'react-router-dom';
import Account from "./Account";
// import Accounts from "./Accounts";
// import Time from "./Time";

import Login from "./login";

function App() {

  return (
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/account" element={<Account /> } />
      </Routes>
   
  );
}

export default App;