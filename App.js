import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Login from "./Components/User/Login.js";
import CreateNewQRCode from './Components/CreateQR/CreateNewQRCode';
import Main from "./Components/ManageClient/Main.js";
import SubmitClaim from "./Components/ClaimSubmit/SubmitClaim.js";
import ClaimResultCheck from './Components/ClaimSubmit/ClaimResultCheck.js';
import ClaimDetail from './Components/ManageClient/ClaimList/ClaimDetail';
import RegisterEngineer from './Components/RegisterEngineer';
import EngineerList from './Components/EngineerList';

function App() {

  return (
    <>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Main} />
        <Route exact path="/makeNewQR" component={CreateNewQRCode} />
        <Route exact path="/login" component={Login} />
        
        <Route exact path="/registerEngineer" component={RegisterEngineer} />
        <Route exact path="/EngineerList" component={EngineerList} />
        
        <Route exact path="/SubmitClaim/:url" component={SubmitClaim} />
        <Route exact path="/ClaimResultCheck/:url" component={ClaimResultCheck} />
        <Route exact path="/ClaimDetail/:url" component={ClaimDetail} />
      </Switch>
      </BrowserRouter>
    </>
  )
}

export default App;
