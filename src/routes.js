import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'

import Login from './views/auth/login'
import Logoff from './logic/auth/logoff'
import Home from './views/home'
import CreateUser from './views/users/create'

export default () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={Login} >
                    {localStorage.getItem('USER_TOKEN') ? <Redirect to="/home" /> : <Login />}
                </Route>

                <Route exact path="/logoff" component={Logoff} />

                <Route exact path="/home" component={Home} >
                    {localStorage.getItem('USER_TOKEN') ? <Home /> : <Login />}
                </Route>

                <Route exact path="/usuarios/cadastro" component={CreateUser} >
                    {localStorage.getItem('USER_TOKEN') ? <CreateUser /> : <Login />}
                </Route>
            </Switch>
        </Router>
    )
}