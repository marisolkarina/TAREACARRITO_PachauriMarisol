const api = "http://localhost:5000";
import axios from 'axios';
import { useEffect, useState } from 'react';

const Producto = (props) => {

    const { productos, carritoId } = props;
    const [nroItems, setNroItems] = useState(0);

    useEffect(() => {
        if (carritoId) iniciarNroItems();
    }, [carritoId]);

    const obtenerCarritoActual = async () => {
        const res = await axios.get(`${api}/carritos/${carritoId}`); //carrito actual
        return res.data;
    };

    const iniciarNroItems = async () => {
        try {
            const carrito = await obtenerCarritoActual();
            const totalItems = carrito.productos.reduce((tot, p) => tot + p.cantidad, 0);
            setNroItems(totalItems);
        } catch (err) {
            console.error(`Error al traer el nroItems: ${err}`);
        }
    }

    const addProductoCarrito = async (prod) => {
        try {
            setNroItems(nroItems + 1);
            const carrito = await obtenerCarritoActual();
            const productosActuales = carrito.productos;

            let productoExistente = productosActuales.find(p => p.id === prod.id);
            let productosDelCarrito;
            productoExistente ? (
                productosDelCarrito = productosActuales.map(p => {
                    if (p.id === prod.id) {
                        return { ...p, cantidad: p.cantidad + 1 } //si existe producto en carrito solo se modifica la cantidad
                    }
                    return p;
                })
            ) : (
                productosDelCarrito = [
                    ...productosActuales, // conj productos que ya tiene el carrito actual
                    { id: prod.id, nombre: prod.nombre, precio: prod.precio, cantidad: 1 } // producto nuevo que se añade al carrito
                ]
            )

            const totalMonto = productosDelCarrito.reduce((tot, p) => tot + p.precio * p.cantidad, 0);
            await axios.patch(`${api}/carritos/${carritoId}`, {
                productos: productosDelCarrito,
                total: totalMonto
            });
        } catch (err) {
            console.error(`Error al agregar el producto al carrito: ${err}`);
        }
    };

    return (
        <>
            <p className='text-end fs-5'>
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-cart-check mx-2" viewBox="0 0 16 16">
                    <path d="M11.354 6.354a.5.5 0 0 0-.708-.708L8 8.293 6.854 7.146a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0z" />
                    <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1zm3.915 10L3.102 4h10.796l-1.313 7zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0m7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0" />
                </svg>
                <span className="badge bg-success">{nroItems}</span>
            </p>

            <div className="row">
                {
                    productos.map((prod, index) => (
                        <article className="col col-md-6 col-lg-4" key={index}>
                            <div className="card shadow mt-5">
                                <div className="card-header text-center bg-success-subtle">
                                    <p className="fs-5 lead">{prod.nombre}</p>
                                </div>
                                <div className="card-body d-flex flex-column align-items-center">
                                    <img src={prod.imagen} alt="producto imagen" className="img-fluid" />
                                    <p className="fs-5 mt-3 lead">S/. {prod.precio}</p>
                                </div>
                                <div className="card-footer">
                                    <button
                                        className="btn btn-success w-100"
                                        onClick={() => addProductoCarrito(prod)}
                                    >
                                        Agregar al carrito
                                    </button>
                                </div>
                            </div>
                        </article>
                    ))
                }
            </div>
        </>
    );

}
export default Producto;