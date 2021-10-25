import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import CreateNewQRCode from './Components/CreateNewQRCode';
import Main from "./Components/ManageClient/Main.js";
import SubmitClaim from "./Components/ClaimSubmit/SubmitClaim.js";
import RegisterEngineer from './Components/RegisterEngineer';
import EngineerList from './Components/EngineerList';

function App() {

  return (
    <>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Main} />
        <Route exact path="/makeNewQR" component={CreateNewQRCode} />
        {
        //<Route exact path="/registerEngineer" component={RegisterEngineer} />
        //<Route exact path="/EngineerList" component={EngineerList} />
        }
        <Route exact path="/SubmitClaim/:url" component={SubmitClaim} />
      </Switch>
      </BrowserRouter>
    </>
  )
}

export default App;
