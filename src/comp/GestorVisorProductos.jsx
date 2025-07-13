import { useEffect, useState } from 'react';
import axios from 'axios';
import VisorProductos from './VisorProductos';

const api = "http://localhost:5000/productos";

const GestorVisorProductos = () => {

    const [productos, setProductos] = useState([]);

    useEffect(() => {
        obtenerProductos();
    }, []);

    const obtenerProductos = async () => {
        try {
            const res = await axios.get(api);
            setProductos(res.data);
        } catch (err) {
            console.error(`Error al obtener los productos ${err}`);
        }
    };

    return (
        <main>
            <p className='mt-4 text-center fs-2 text-pink fw-medium'>Lista de Productos</p>
            <section className='mt-4 mx-4'>
                <VisorProductos productos={productos} />
            </section>
        </main>
    );
}
export default GestorVisorProductos;