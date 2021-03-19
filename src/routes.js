import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Login from './views/login'
import Home from './views/home'
import CadastroUsuario from './views/usuarios/cadastro'

export default () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={Login} />
                <Route exact path="/home" component={Home} />
                <Route exact path="/usuarios/cadastro" component={CadastroUsuario} />
            </Switch>
        </Router>
    )
}