import { useEffect, useState } from 'react';
import axios from 'axios';
import Producto from './Producto';

const api = "http://localhost:5000";

const GestorVisorProductos = (props) => {

    const {carritoId} = props;
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        obtenerProductos();
    }, []);

    const obtenerProductos = async () => {
        try {
            const res = await axios.get(`${api}/productos`);
            setProductos(res.data);
        } catch (err) {
            console.error(`Error al obtener los productos: ${err}`);
        }
    };

    return (
        <main>
            <p className='mt-4 text-center fs-2 text-success fw-medium'>Lista de Productos</p>
            <section className='mt-4 mx-4'>
                <Producto productos={productos} carritoId={carritoId} />
            </section>
        </main>
    );
}
export default GestorVisorProductos;