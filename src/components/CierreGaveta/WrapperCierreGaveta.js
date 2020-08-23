import React, { useState, useEffect,useContext } from 'react';
import { ModalGavetasDisponibles } from '../CierreGaveta/ModalGavetasDisponibles';
import { contexto } from '../../Context/Contexto';
import { GetMediosDePago, GetPrecioFormateado,GetUrlApi,GetFetchHeaders } from '../Globales/FuncionesGlobales';
import { CierreGaveta } from '../CierreGaveta/CierreGaveta';
import { UserContext } from '../../Context/UserContext';
import swal from 'sweetalert';


export function WrapperCierreGaveta() {
    const [aperturaSeleccionada, setAperturaSeleccionada] = useState(
        {
            cierreDeGaveta:{}
        });
    const [ordenes, setOrdenes] = useState([]);
    const [mediosDePago, setMediosDePago] = useState([]);
    const [medioDePagoSeleccionado, setMedioDePagoSeleccionado] = useState({});
    const [todosLosPagos, setTodosLosPagos] = useState([]);
    const [isArqueoCiegoSeleccionado, setIsArqueoCiegoSeleccionado] = useState(false);
    //const [isTotalPrecalculado, setIsTotalPrecalculado] = useState(false);
    const ContextoUsuario = useContext(UserContext);
    console.log(ContextoUsuario);
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

    const clickCierreCiego=()=>{
        if(!isCierreCiego()){
            setIsArqueoCiegoSeleccionado(true)
        }
        
    };

    const isCierreCiego=()=>{
        if(aperturaSeleccionada.cierreDeGaveta){
            return aperturaSeleccionada.cierreDeGaveta.isCierreCiego;
        }
        return false;
    };

    return (<React.Fragment>

        <br/>
        <br/>
        
        <div className="container">
            <div class="row">
              <div class="col s12">
                <ul class="tabs">
                    {
                        (ContextoUsuario.usuario.tipoUsuario.isAdmin)?(
                            <li className="tab col s3 active"><a onClick={()=>{setIsArqueoCiegoSeleccionado(false)}} className="active" href="#test1">Arqueo</a></li>
                        ):(null)
                    }
                  
                  <li className={(!isCierreCiego())?("tab col s3"):("tab col s3 disabled")}><a onClick={()=>{clickCierreCiego()}} href="#test2">Cierre Ciego</a></li>
                  <li className="tab col s3"><a href="#test3">Salida rapida</a></li>
                  <li className="tab col s3"><a href="#test4">Salir</a></li>
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
                totalRecaudado:totalRecaudado,
                isArqueoCiegoSeleccionado:isArqueoCiegoSeleccionado,
                isCierreCiego:isCierreCiego
            }}>
                <ModalGavetasDisponibles />

                <div class="row">
                    <div id="test1" class="col s12">
                        <CierreGaveta />
                    </div>
                    <div id="test2" class="col s12">
                        <CierreGaveta />
                    </div>
                    <div id="test3" class="col s12">Test 3</div>
                    <div id="test4" class="col s12">Test 4</div>
                </div>
            </contexto.Provider>
            
            
        </div>
    </React.Fragment>);
}

