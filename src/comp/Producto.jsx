const Producto = (props) => {

    const { productos } = props;

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
                                <button className="btn btn-success w-100">
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