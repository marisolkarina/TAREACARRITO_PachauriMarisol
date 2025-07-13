import Producto from "./Producto";

const VisorProductos = (props) => {

    const {productos} = props;

    return (
        <div className="row">
            <Producto productos={productos}/>
        </div>
    );
}
export default VisorProductos;