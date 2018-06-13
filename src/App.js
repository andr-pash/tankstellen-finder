import 'tachyons'
import 'styling/semantic.less'
import 'styles.css'

import React from 'react'
import { HashRouter as Router, Route, Redirect } from 'react-router-dom'
import { Container } from 'semantic-ui-react'
import { Home } from './components/Home'
import { Login } from './components/Login';
import { Favorites } from './components/Favorites';
import { userStore } from './stores/userStore';

const App = () => 
<Router>
    <div>
        <Container>
            <PrivateRoute exact path="/" component={Home} />
            <PrivateRoute path="/favorites" component={Favorites} />
            <Route path="/login" component={Login}/>
        </Container>
    </div>
</Router>

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={props =>
        !!userStore.user ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );

export default App
