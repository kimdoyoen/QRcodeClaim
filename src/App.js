import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Login from "./Components/User/Login.js";
import CreateNewQRCode from './Components/CreateQR/CreateNewQRCode';
import Main from "./Components/ManageClient/Main.js";
import SubmitClaim from "./Components/ClaimSubmit/SubmitClaim.js";
import ClaimResultCheck from './Components/ClaimSubmit/ClaimResultCheck.js';
import ClaimDetail from './Components/ManageClient/ClaimList/ClaimDetail';

function App() {

  return (
    <>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Main} />
        <Route exact path="/makeNewQR" component={CreateNewQRCode} />
        <Route exact path="/ClaimDetail/:url" component={ClaimDetail} />
        <Route exact path="/login" component={Login} />
        
        <Route exact path="/SubmitClaim/:url" component={SubmitClaim} />
        <Route exact path="/ClaimResultCheck/:url" component={ClaimResultCheck} />
      </Switch>
      </BrowserRouter>
    </>
  )
}

export default App;
