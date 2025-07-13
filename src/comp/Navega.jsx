import GestorVisorProductos from "./GestorVisorProductos";
import PaginaNoEncontrada from "./PaginaNoEncontrada";
import Inicio from "../Inicio";
import { NavLink, Route, Routes } from "react-router-dom";
import GestorVisorCarrito from "./GestorVisorCarrito";
import { useEffect, useState } from "react";
import axios from 'axios';

const api = "http://localhost:5000";

const Navega = () => {

    const [carritoId, setCarritoId] = useState();

    useEffect(() => {
        iniciarCarrito();
    }, []);

    const iniciarCarrito = async () => {

        let carritoId = localStorage.getItem("carritoId");

        if (!carritoId) {
            // valor temporal xq el useEffect se ejecuta 2 veces
            // y puede ejecutarse la segunda vez antes que termine la primera
            localStorage.setItem("carritoId", "temp");
            // Se crea carrito
            const res = await axios.post(`${api}/carritos`, {
                productos: [],
                total: 0
            });
            carritoId = res.data.id;
            localStorage.setItem("carritoId", carritoId);
        }

        setCarritoId(carritoId);
    };

    return (
        <main className="mb-3">
            <nav className="navbar navbar-expand-lg bg-dark" data-bs-theme="dark">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">Maquillaje</a>
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
                            <li className="nav-item">
                                <NavLink className="nav-link" to="gestor-carrito">Carrito</NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <Routes>

                <Route path="gestor-productos" element={<GestorVisorProductos carritoId={carritoId}/>}></Route>
                <Route path="gestor-carrito" element={<GestorVisorCarrito carritoId={carritoId}/>}></Route>

                <Route path="/" element={<Inicio />}></Route>
                <Route path="*" element={<PaginaNoEncontrada />}></Route>

            </Routes>
        </main>
    )
}

export default Navega;