import { useEffect, useState } from 'react';
import axios from 'axios';
import VisorProductos from './VisorProductos';

const api = "http://localhost:5000";

const GestorVisorProductos = () => {

    const [productos, setProductos] = useState([]);
    const [carritoId, setCarritoId] = useState();

    useEffect(() => {
        obtenerProductos();
        iniciarCarrito();
    }, []);

    const obtenerProductos = async () => {
        try {
            const res = await axios.get(`${api}/productos`);
            setProductos(res.data);
        } catch (err) {
            console.error(`Error al obtener los productos: ${err}`);
        }
    };

    const iniciarCarrito = async () => {

        let carritoId = localStorage.getItem("carritoId");

        if (!carritoId) {
            // valor temporal xq el useEffect se ejecuta 2 veces
            // y puede ejecutarse la segunda vez antes que termine la primera
            localStorage.setItem("carritoId", "temp");
            // Se crea carrito
            const res = await axios.post(`${api}/carritos`, {
                productos: []
            });
            carritoId = res.data.id;
            localStorage.setItem("carritoId", carritoId);
        }

        setCarritoId(carritoId);
    };

    return (
        <main>
            <p className='mt-4 text-center fs-2 text-pink fw-medium'>Lista de Productos</p>
            <section className='mt-4 mx-4'>
                <VisorProductos productos={productos} carritoId={carritoId} />
            </section>
        </main>
    );
}
export default GestorVisorProductos;