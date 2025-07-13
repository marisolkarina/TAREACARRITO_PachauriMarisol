import GestorVisorProductos from "./GestorVisorProductos";
import PaginaNoEncontrada from "./PaginaNoEncontrada";
import Inicio from "../Inicio";
import { NavLink, Route, Routes } from "react-router-dom";

const Navega = () => {
    return(
        <main className="mb-3">
            <nav className="navbar navbar-expand-lg bg-dark" data-bs-theme="dark">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">Navbar</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <NavLink className="nav-link active" aria-current="page" to="/">Inicio</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="gestor-productos">Productos</NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <Routes>

                <Route path="gestor-productos" element={<GestorVisorProductos/>}></Route>

                <Route path="/" element={<Inicio/>}></Route>
                <Route path="*" element={<PaginaNoEncontrada/>}></Route>

            </Routes>
        </main>
    )
}

export default Navega;