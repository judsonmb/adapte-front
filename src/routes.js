import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'

import Login from './views/auth/login'
import Logoff from './logic/auth/logoff'
import Home from './views/home'
import Index from './views/users/'
import CreateUser from './views/users/create'


export default () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    {localStorage.getItem('USER_TOKEN') ? <Redirect to="/home" /> : <Login />}
                </Route>

                <Route exact path="/logoff" component={Logoff} />

                <Route exact path="/home">
                    {localStorage.getItem('USER_TOKEN') ? <Home /> : <Login />}
                </Route>

                <Route exact path="/usuarios">
                    {localStorage.getItem('USER_TOKEN') ? <Index /> : <Login />}
                </Route>

                <Route exact path="/usuarios/cadastrar">
                    {localStorage.getItem('USER_TOKEN') ? <CreateUser /> : <Login />}
                </Route>
            </Switch>
        </Router>
    )
}