import Producto from "./Producto";

const VisorProductos = (props) => {

    const { productos, carritoId } = props;

    return (
        <Producto productos={productos} carritoId={carritoId}/>
    );
}
export default VisorProductos;