import './App.css';
import Home from './Components/Home/home';
import Login from './Components/Login/login';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <div>
      <BrowserRouter>
      <Switch>
        <Route path="/login">
          <Login/>
        </Route>
        <Route path="/dashboard">
          <Home />
        </Route>
        <Redirect to="/login" />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
