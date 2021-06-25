import './App.scss';
import Dashboard from './components/Dashboard/Dashboard';
import './App.scss';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import PrivateRoute from './components/AuthRoute/PrivateRoute';
import { FirestoreProvider } from './firebase/DBcontext';
import Auth from './components/Auth/Auth';
import { useAuth } from './firebase/AuthContext';

import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';

function App() {
  const { currentUser } = useAuth();
  return (
    <FirestoreProvider>
      <ReactNotification />
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path="/"
            render={() => (currentUser ? <Redirect to="/dashboard" /> : <Redirect to="/auth" />)}
          />
          <PrivateRoute exact path="/dashboard" component={Dashboard} />
          <Route path="/auth" component={Auth} />
        </Switch>
      </BrowserRouter>
    </FirestoreProvider>
  );
}

export default App;
