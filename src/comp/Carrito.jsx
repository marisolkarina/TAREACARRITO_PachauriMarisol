const Carrito = (props) => {

    const { productosDelCarrito, eliminarProductoDelCarrito } = props;

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
        </>
    );
}
export default Carrito;