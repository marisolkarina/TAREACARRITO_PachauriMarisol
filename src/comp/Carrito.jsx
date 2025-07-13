import axios from 'axios';
import { useEffect, useState } from 'react';

const api = "http://localhost:5000";

const Carrito = (props) => {

    const { productosDelCarrito, eliminarProductoDelCarrito, carritoId } = props;

    const [total, setTotal] = useState(0);

    useEffect(() => {
        if (carritoId) obtenerTotal();
    }, [productosDelCarrito]);

    const obtenerTotal = async () => {
        try {
            const res = await axios.get(`${api}/carritos/${carritoId}`);
            setTotal(res.data.total || 0);
        } catch (err) {
            console.error(`Error al obtener el total del carrito: ${err}`);
        }
    };

    return (
        <>
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
                    productosDelCarrito.map((p, index) => (
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
                                    Eliminar
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
                    <td className="fw-medium">S/. {total.toFixed(2)}</td>
                </tr>
            </tfoot>

        </>
    );
}
export default Carrito;