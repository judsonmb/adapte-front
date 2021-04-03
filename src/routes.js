import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'

import Login from './pages/auth/login'
import Logoff from './logic/auth/logoff'
import Home from './pages/home'
import Index from './pages/users/'
import CreateUser from './pages/users/create'
import UpdateUser from './pages/users/update'

const routes = () =>  {
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

                <Route exact path="/usuarios/editar">
                    {localStorage.getItem('USER_TOKEN') ? <UpdateUser /> : <Login />}
                </Route>
            </Switch>
        </Router>
    )
}

export default routes;