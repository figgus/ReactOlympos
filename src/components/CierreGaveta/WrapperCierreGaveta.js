import React, { useState, useEffect,useContext } from 'react';
import { ModalGavetasDisponibles } from '../CierreGaveta/ModalGavetasDisponibles';
import { contexto } from '../../Context/Contexto';
import { GetMediosDePago, GetPrecioFormateado,GetUrlApi,GetFetchHeaders } from '../Globales/FuncionesGlobales';
import { CierreGaveta } from '../CierreGaveta/CierreGaveta';
import { UserContext } from '../../Context/UserContext';
import swal from 'sweetalert';


export function WrapperCierreGaveta() {
    const [aperturaSeleccionada, setAperturaSeleccionada] = useState({});
    const [ordenes, setOrdenes] = useState([]);
    const [mediosDePago, setMediosDePago] = useState([]);
    const [medioDePagoSeleccionado, setMedioDePagoSeleccionado] = useState({});
    const [todosLosPagos, setTodosLosPagos] = useState([]);
    const [isTotalPrecalculado, setIsTotalPrecalculado] = useState(false);
    const ContextoUsuario = useContext(UserContext);
    useEffect(() => {
        const M = window.M;
        var instanciaTeclado = M.Modal.getInstance(document.getElementById('ModalGavetasDisponibles'));
        instanciaTeclado.open();

        GetMediosDePago().then((respuesta) => {
            setMediosDePago(respuesta);
        });

         document.querySelectorAll('.collapsible');

         M.Tabs.init(document.querySelector('.tabs'), {});

    }, []);

    const totalRecaudado = () => {
        var res = 0;
        ordenes.forEach((orden) => {
            res += orden.total;
        });
        return res;
    };



    return (<React.Fragment>

        <br/>
        <br/>
        
        <div className="container">
            <div class="row">
              <div class="col s12">
                <ul class="tabs">
                  <li class="tab col s3 active"><a className="active" href="#test1">Arqueo</a></li>
                  <li class="tab col s3"><a  href="#test2">Cierre Ciego</a></li>
                  <li class="tab col s3"><a href="#test3">Salida rapida</a></li>
                  <li class="tab col s3"><a href="#test4">Salir</a></li>
                </ul>
              </div>
              
            </div>
            <contexto.Provider value={{
                
                aperturaSeleccionada: aperturaSeleccionada,
                setAperturaSeleccionada: setAperturaSeleccionada,
                ordenes:ordenes,
                setOrdenes: setOrdenes,
                setTodosLosPagos: setTodosLosPagos,
                medioDePagoSeleccionado:medioDePagoSeleccionado,
                setMedioDePagoSeleccionado:setMedioDePagoSeleccionado,
                todosLosPagos:todosLosPagos,
                totalRecaudado:totalRecaudado
            }}>
                <ModalGavetasDisponibles />

                <div class="row">
                    <div id="test1" class="col s12">
                        <CierreGaveta />
                    </div>
                    <div id="test2" class="col s12">Test 2</div>
                    <div id="test3" class="col s12">Test 3</div>
                    <div id="test4" class="col s12">Test 4</div>
                </div>
            </contexto.Provider>
            
            
        </div>
    </React.Fragment>);
}

