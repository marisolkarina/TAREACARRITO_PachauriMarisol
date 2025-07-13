import { useEffect, useState } from "react";
import axios from 'axios';
import Carrito from "./Carrito";


const api = "http://localhost:5000";

const GestorVisorCarrito = (props) => {

    const { carritoId } = props;
    const [productosDelCarrito, setProductosDelCarrito] = useState([]);

    useEffect(() => {
        if (carritoId) obtenerProductosDelCarrito();
    }, [carritoId]);

    const obtenerProductosDelCarrito = async () => {
        try {
            const res = await axios.get(`${api}/carritos/${carritoId}`);
            setProductosDelCarrito(res.data.productos);
        } catch (err) {
            console.error(`Error al obtener los productos del carrito: ${err}`);
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
                obtenerProductosDelCarrito();
            }
        } catch (err) {
            console.error(`Error al eliminar el producto del carrito ${err}`);
        }
    }

    return (
        <div>
            {
                productosDelCarrito.length > 0 ? (
                    <>
                        <p className='mt-4 text-center fs-2 text-success fw-medium'>Mi carrito</p>

                        <div className="table-responsive">
                            <table className="table table-striped table-bordered table-hover text-center mx-auto" style={{ width: '90%' }}>
                                <Carrito
                                    productosDelCarrito={productosDelCarrito}
                                    eliminarProductoDelCarrito={eliminarProductoDelCarrito}
                                    carritoId={carritoId}
                                />
                            </table>
                        </div>
                    </>
                ) : (
                    <p className="lead text-danger text-center mt-3">No se han añadido productos al carrito</p>
                )
            }

        </div>
    );
}
export default GestorVisorCarrito;