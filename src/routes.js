import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Home from './views/home'
import CadastroUsuario from './views/usuarios/cadastro'

export default () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/usuarios/cadastro" component={CadastroUsuario} />
                <Route exact path="/" component={Home} />
            </Switch>
        </Router>
    )
}