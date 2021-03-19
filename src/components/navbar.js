function Navbar(){
    if(localStorage.getItem('USER_TOKEN')){
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <a className="navbar-brand" href="/home">Adapt-e</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
    
                <div className="collapse navbar-collapse" id="navbarColor01">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <a className="nav-link" href="/home">Home
                                <span className="sr-only">(current)</span>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/usuarios/cadastro">Usuários</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Cursos</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Turmas</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Módulos</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Assuntos</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Tópicos</a>
                        </li>
                    </ul>
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link" href="/logoff">Logoff</a>
                        </li>
                    </ul>
                </div>
            </nav>
        )
    }else{
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <a className="navbar-brand" href="/">Adapt-e</a>
            </nav>
        )
    }
    
}

export default Navbar;