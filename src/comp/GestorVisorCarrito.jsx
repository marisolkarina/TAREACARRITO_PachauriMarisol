import { useEffect, useState } from "react";
import axios from 'axios';
import Carrito from "./Carrito";


const api = "http://localhost:5000";

const GestorVisorCarrito = (props) => {

    const { carritoId } = props;
    const [carrito, setCarrito] = useState(null);

    useEffect(() => {
        if (carritoId) obtenerCarrito();
    }, [carritoId]);

    const obtenerCarrito = async () => {
        try {
            const res = await axios.get(`${api}/carritos/${carritoId}`);
            setCarrito(res.data)
        } catch (err) {
            console.error(`Error al obtener carrito: ${err}`);
        }
    };

    const eliminarProductoDelCarrito = async (p) => {
        try {
            let confirma = window.confirm(`Desea eliminar al usuario ${p.nombre}?`);
            if (confirma) {
                const res = await axios.get(`${api}/carritos/${carritoId}`);
                const nuevosProds = res.data.productos.filter(prod => prod.id !== p.id);

                const totalMonto = nuevosProds.reduce((tot, p) => tot + p.cantidad * p.precio, 0);

                await axios.patch(`${api}/carritos/${carritoId}`, {
                    productos: nuevosProds,
                    total: totalMonto
                });
                obtenerCarrito();
            }
        } catch (err) {
            console.error(`Error al eliminar el producto del carrito ${err}`);
        }
    }

    return (
        <div>
            {
                carrito && carrito.productos && carrito.productos.length > 0 ? (
                    <>
                        <p className='mt-4 text-center fs-2 text-success fw-medium'>Mi carrito</p>

                        <Carrito
                            carrito = {carrito}
                            eliminarProductoDelCarrito={eliminarProductoDelCarrito}
                            carritoId={carritoId}
                        />

                    </>
                ) : (
                    <p className="lead text-danger text-center mt-3">No se han añadido productos al carrito</p>
                )
            }

        </div>
    );
}
export default GestorVisorCarrito;