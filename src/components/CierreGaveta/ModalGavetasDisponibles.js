import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../Context/UserContext';
import swal from 'sweetalert';
import { contexto } from '../../Context/Contexto';
import { ClonarObjeto, GetFetchHeaders,GetUrlApi} from '../Globales/FuncionesGlobales';

export function ModalGavetasDisponibles() {
    const M = window.M;
    const ContextoUsuario = useContext(UserContext);
    const [gavetas, setGavetas] = useState([]);
    const context = useContext(contexto);

    const clickApertura = (apertura) => {
        context.setAperturaSeleccionada(apertura);
        getOrdenesPendientes(apertura.id);
        cerrarModal();
    };

    const getGavetasPendientes = async() => {
        var respuesta = await fetch(GetUrlApi()+'/api/AperturaDeGavetas/GetAperturasPendientes?sucursalID=' + ContextoUsuario.usuario.sucursalesID, {
            method: 'get',
            headers: GetFetchHeaders()
        });
        if (respuesta.ok) {
            setGavetas(await respuesta.json());
        }
        else {
            swal({
                title: "Error al traer gavetas la sucursal es " + ContextoUsuario.usuario.sucursalesID,
                icon: "error"
            });
        }
    };

    const getOrdenesPendientes = async (idApertura) => {
        var respuesta = await fetch(GetUrlApi()+'/api/Ordenes/GetOrdenesPendientes?aperturaID=' + idApertura, {
            method: 'get',
            headers: GetFetchHeaders()
        });
        if (respuesta.ok) {
            const res = await respuesta.json();
            const mediosDePago = [];
            res.map((orden) => {
                orden.mediosPorOrden.map((medioPorOrden) => {
                    medioPorOrden.numeroDeOrden = orden.numeroDeOrden;
                    mediosDePago.push(medioPorOrden);
                });
                
            });
            context.setOrdenes(ClonarObjeto(res));
            context.setTodosLosPagos(mediosDePago);
        }
        else {
            swal({
                title: "Error al traer ordenes pendientes",
                icon: "error"
            });
        }
    };

    const cerrarModal = () => {
        var instanciaTeclado = M.Modal.getInstance(document.getElementById('ModalGavetasDisponibles'));
        instanciaTeclado.close();
    };

    useEffect(() => {
        getGavetasPendientes();
        var elems = document.querySelectorAll('.modal');
         M.Modal.init(elems, {

        });

    }, []);

    return (
        <div id="ModalGavetasDisponibles" class="modal bottom-sheet">
            <div class="modal-content">
                <h4>Gavetas pendientes</h4>
                <div className="container">

                </div>
                <ul class="collection">
                {
                        gavetas.map((apertura, i) => {
                            return (
                                <li onClick={() => { clickApertura(apertura) }} key={'gaveta' + i} style={{ 'cursor': 'pointer' }} className="collection-item avatar" >

                                <div class="row">
                                    <div class="col s3">
                                        <span style={{ 'color': '#25a35b' }} className="title"><strong>{apertura.gaveta.nombre}</strong></span>
                                    </div>
                                    <div class="col s3">
                                        {apertura.usuario.nombre}{' '}{apertura.usuario.apellido}
                                    </div>
                                    <div class="col s3">
                                        {new Date(apertura.fechaDeApertura).toLocaleDateString()}{' '}{new Date(apertura.fechaDeApertura).toLocaleTimeString()}
                                    </div>
                                    <div class="col s3">
                                        <i style={{ 'float': 'rigth' }} class="material-icons circle">send</i>
                                    </div>
                                </div>

                                

                                
                            </li>
                            );
                    })
                    }
                </ul>
            </div>
        </div>
        );
}