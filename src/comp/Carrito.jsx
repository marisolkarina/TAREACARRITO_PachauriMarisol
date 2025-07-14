import axios from 'axios';
import { useEffect, useState } from 'react';
import { NavLink, Route, Routes } from "react-router-dom";
import Boleta from './Boleta';

const api = "http://localhost:5000";

const Carrito = (props) => {

    const { carrito, eliminarProductoDelCarrito, carritoId } = props;
    const [carritoHook, setCarritoHook] = useState(carrito);
    const [pedido, setPedido] = useState(null);

    useEffect(() => {
        if (carritoId) setCarritoHook(carrito)
    }, [carrito]);

    const vaciarCarrito = async () => {
        try {
            const res = await axios.patch(`${api}/carritos/${carritoId}`, {
                productos: [],
                total: 0
            });
            setCarritoHook(res.data);
        } catch (err) {
            console.error(`Error al vaciar carrito: ${err}`);
        }
    }

    const generarBoleta = async () => {
        setPedido({
            productos: carritoHook.productos,
            totalMonto: carritoHook.total
        });

        await vaciarCarrito();
    };

    return (
        <>
            <div className="table-responsive">
                <table className="table table-striped table-bordered table-hover text-center mx-auto" style={{ width: '90%' }}>
                    <thead>
                        <tr>
                            <th>Producto</th>
                            <th>Precio</th>
                            <th>Cantidad</th>
                            <th>Subtotal</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            carritoHook.productos.map((p, index) => (
                                <tr key={index}>
                                    <td>{p.nombre}</td>
                                    <td>S/. {p.precio}</td>
                                    <td>{p.cantidad}</td>
                                    <td>S/. {(p.precio * p.cantidad).toFixed(2)}</td>
                                    <td>
                                        <button
                                            className="btn btn-danger mx-2"
                                            onClick={() => eliminarProductoDelCarrito(p)}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                                                <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                                            </svg>
                                        </button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan="3"></td>
                            <td className="fw-medium">Total:</td>
                            <td className="fw-medium">S/. {carritoHook.total.toFixed(2)}</td>
                        </tr>
                    </tfoot>
                </table>
            </div >
            <div className='d-flex justify-content-center my-3'>
                <button
                    className="btn btn-danger mx-2"
                    onClick={() => vaciarCarrito()}
                >
                    Vaciar Carrito
                </button>
                {
                    carritoHook.productos.length > 0 && (
                        <button
                            className="btn btn-primary mx-2"
                            onClick={() => generarBoleta()}
                        >
                            Finalizar Pedido
                        </button>
                    )
                }
            </div>
            {pedido && pedido.productos.length > 0 && (
                <Boleta pedido={pedido} />
            )}
        </>

    );
}
export default Carrito;