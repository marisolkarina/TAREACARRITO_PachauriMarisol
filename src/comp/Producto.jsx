const api = "http://localhost:5000";
import axios from 'axios';

const Producto = (props) => {

    const { productos, carritoId } = props;

    const addProductoCarrito = async (prod) => {
        try {
            const res = await axios.get(`${api}/carritos/${carritoId}`); //carrito actual
            const productosActuales = res.data.productos;

            let productoExistente = productosActuales.find(p => p.nombre === prod.nombre);
            let productosDelCarrito;
            productoExistente ? (
                productosDelCarrito = productosActuales.map(p => {
                    if (p.nombre===prod.nombre) {
                        return {nombre: p.nombre, cantidad: p.cantidad+1} //si existe producto en carrito solo se modifica la cantidad
                    }
                    return p;
                })
            ): (
                productosDelCarrito = [
                    ...productosActuales, // conj productos que ya tiene el carrito actual
                    { nombre: prod.nombre, cantidad: 1 } // producto nuevo que se añade al carrito
                ]
            )

            await axios.patch(`${api}/carritos/${carritoId}`, {
                productos: productosDelCarrito
            });
        } catch (err) {
            console.error(`Error al agregar el producto al carrito: ${err}`);
        }
    };

    return (
        <>
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

        </>
    );

}
export default Producto;