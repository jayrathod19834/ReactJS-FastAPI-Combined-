import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const Second = React.lazy(() =>
  import(/* webpackChunkName: "second" */ './add')
);
const Second1 = React.lazy(() =>
  import(/* webpackChunkName: "second1" */ './list')
);
const SecondMenu = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/add`} />
      <Route
        path={`${match.url}/add`}
        render={(props) => <Second {...props} />}
      />
      <Route
        path={`${match.url}/list`}
        render={(props) => <Second1 {...props} />}
      />
      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default SecondMenu;
