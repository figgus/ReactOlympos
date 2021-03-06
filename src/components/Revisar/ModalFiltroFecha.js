﻿import React, { useState, useEffect, useContext } from 'react';
import { GetOptionDatePicker, GetFetchHeaders} from '../Globales/FuncionesGlobales';
import { RevisarContext } from '../../Context/ContextoRevisar';


export function ModalFiltroFecha() {
    const ContextoUsuario = useContext(RevisarContext);
    const M = window.M;
    const [isVolver, setIsVolver] = useState(false);
    const fechaActual = new Date().toLocaleDateString();

    useEffect(() => {
        var elems = document.querySelectorAll('.modal');
        var instances = M.Modal.init(elems, {});

        var elems1 = document.querySelectorAll('.datepicker');
        var instances1 = M.Datepicker.init(elems1, GetOptionDatePicker());
    }, []);

    const clickBuscar = async() => {
        const fecha = document.getElementById('fechaDesde').value;
        var respuesta = await fetch('/api/Ordenes?fechaDesde=' + fecha, {
            method: 'get',
            headers: GetFetchHeaders()
        });
        if (respuesta.ok) {
            ContextoUsuario.setOrdenes(ContextoUsuario.formatearArregloColumnas(await respuesta.json()));
            CerrarModal();
        }
    };
   
    const CerrarModal = () => {
        var instanciaTeclado = M.Modal.getInstance(document.getElementById('modalFiltroFecha'));
        instanciaTeclado.close();
    };
    return (
        <div id="modalFiltroFecha" class="modal bottom-sheet">
            <div style={{ 'paddingTop':'150px'}} className="container">
                <div className="row">
                    <div className="col s1">
                        Desde:
                        <input id="fechaDesde" defaultValue={fechaActual} type="text" className="datepicker" />
                    </div>
                    <div class="col s1">
                        Hasta
                        <input defaultValue={fechaActual} type="text" className="datepicker"/>
                    </div>
                    <div class="col s1">
                        <a onClick={() => { clickBuscar() }} className="waves-effect waves-light btn-large"> <i style={{ 'fontSize': '60px' }} className="material-icons">search</i></a>
                    </div>
                </div>

            </div>
        </div>
    );
}
