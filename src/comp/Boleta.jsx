const Boleta = (props) => {
    const { pedido } = props;

    return (
        <div className="card w-50 m-auto p-4">
            <p className="lead text-primary fs-5 text-center">Detalle de la boleta</p>
            {
                pedido.productos.map((p, index) => (
                    <div key={index}>
                        <p className="lead fs-5">{p.nombre}</p>
                        <p className="lead fs-5 text-end">S/. {p.precio} X {p.cantidad} = S/. {p.precio * p.cantidad}</p>
                    </div>
                ))
            }
            <p>--------------------------------------------------------------------------</p>
            <p className="lead fs-5 text-success text-end">Total a pagar = S/. {pedido.totalMonto.toFixed(2)}</p>
        </div>
    );
}
export default Boleta;