import { useContext } from "react";
import { UserLoggedContext } from "../contexts";
import { Link } from "react-router-dom";


export const Header = () => {

    const userLogged = useContext(UserLoggedContext);

    return (
        <header className="cabecalho">
            <div className="logo">
                <Link to={"/"}>
                    <img src="./imgs/logo.png" alt="Logo" />
                    <span>Web Store</span>
                </Link>
            </div>
            <button className="menu-toggle">
                <i className="fa fa-lg fa-bars"></i>
            </button>
            <nav className="menu">
            </nav>
            <aside className="autenticacao">
                {
                    userLogged.isAuthenticated ?
                        <Link to={"/logout"}>Sair</Link> :
                        <>
                            <Link to={"/login"}>Login</Link>
                            <Link to={"/register"} className="botao-destaque">Registre-se</Link>
                        </>
                }
            </aside>
        </header>

    )
}