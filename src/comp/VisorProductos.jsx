import Producto from "./Producto";

const VisorProductos = (props) => {

    const { productos, carritoId } = props;

    return (
        <div className="row">
            <Producto productos={productos} carritoId={carritoId}/>
        </div>
    );
}
export default VisorProductos;