import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Admin from './pages/Admin';
import GroupCreation from './pages/GroupCreation';
import GroupList from './pages/GroupsList';
import GroupUpdate from './pages/GroupUpdate';
import Requests from './pages/Requests';
import Login from './pages/Login';

export default function Routes(){
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/groups" exact component={GroupList} />
        <Route path="/admin" component={Admin} />
        <Route path="/groups/create" component={GroupCreation} />
        <Route path="/groups/update" component={GroupUpdate} />
        <Route path="/requests" component={Requests} />
      </Switch>
    </BrowserRouter>
  );
}