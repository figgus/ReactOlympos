import React, { useState, useEffect,useContext } from 'react';
import { contexto } from '../../Context/Contexto';
import { GetMediosDePago, GetPrecioFormateado,GetUrlApi,GetFetchHeaders } from '../Globales/FuncionesGlobales';
import { DetallesMedioDePago } from '../CierreGaveta/DetallesMedioDePago';
import { UserContext } from '../../Context/UserContext';
import swal from 'sweetalert';


export function CierreGaveta() {
    const [aperturaSeleccionada, setAperturaSeleccionada] = useState({});
    const [ordenes, setOrdenes] = useState([]);
    const [mediosDePago, setMediosDePago] = useState([]);
    const [medioDePagoSeleccionado, setMedioDePagoSeleccionado] = useState({});
    //const [todosLosPagos, setTodosLosPagos] = useState([]);
    const [isTotalPrecalculado, setIsTotalPrecalculado] = useState(false);
    const ContextoUsuario = useContext(UserContext);
    const Contexto = useContext(contexto);
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
        Contexto.ordenes.forEach((orden) => {
            res += orden.total;
        });
        return res;
    };

    const clickMedioDePago = (medioDePago) => {
        Contexto.setMedioDePagoSeleccionado(medioDePago);
    };

    const crearCierreGaveta=async()=>{
        var cierre={};
        cierre.gavetasID=aperturaSeleccionada.gavetasID;
        
        var mediosPorCierre=[];
        mediosDePago.forEach((medio,i)=>{
            const campoRelacionado=document.getElementById(medio.nombre+i);
            if(campoRelacionado){
                
                mediosPorCierre.push({
                    mediosDePagoID:medio.id,
                    monto:Number(campoRelacionado.value)
                });
            }
            else{
                alert('cago la generacion de los medios por cierre');
            }
        });
        cierre.mediosPorCierre=mediosPorCierre;
        cierre.ordenesCerrar=Contexto.ordenes;
        cierre.aperturaQueCierra=Contexto.aperturaSeleccionada.id;
        cierre.isCierreCiego=Contexto.isArqueoCiegoSeleccionado;
        var respuesta = await fetch(GetUrlApi()+'/api/CierreDeGavetas', {
            method: 'post',
            headers: GetFetchHeaders(),
            body:JSON.stringify(cierre)
        }).catch((err)=>{
            console.log(err);
            swal({
                title: "Error al guardar el cierre" ,
                icon: "error"
            })
        });
        if (respuesta.ok) {
            swal({
                title: "Arqueo completado" ,
                icon: "success"
            }).then(()=>{
                ContextoUsuario.setUsuario({
                    nombre: 'Ninguno'
                });
            });
        }
    };

    const clickListo=async()=>{
        if(totalRecaudado()-getSumTotalDeclarado()!==0){
            swal({
                title: "El arqueo está descuadrado",
                text:"¿Seguro que desea continuar?",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
                .then((willDelete) => {
                    if (willDelete) {
                        crearCierreGaveta();
                    } 
                });
        }
        else{
            crearCierreGaveta();
        }
        
        
    };


    const clickPrecalcular=()=>{
        setIsTotalPrecalculado(true);
    };

    const getDiferenciaPagadoDeclarado=(medioDePago,indice)=>{
        var res=0;
        const montoDeclarado=Number(document.getElementById(medioDePago.nombre+indice).value);
        Contexto.todosLosPagos.filter(p=>p.mediosDePagoID===medioDePago.id).forEach((pago)=>{
            res+=pago.montoPagadoReal;
        });
        return res-montoDeclarado;
    };

    const getTextoCuadratura=(montoDiferencia)=>{

        if(montoDiferencia<0){
            return (<h5 style={getColorTextoCuadratura(montoDiferencia)}>Sobran {GetPrecioFormateado( montoDiferencia)} pesos <i class="material-icons">error</i></h5>);
        }
        else if(montoDiferencia>0){
            return (<h5 style={getColorTextoCuadratura(montoDiferencia)}>Faltan {GetPrecioFormateado(montoDiferencia)} pesos <i class="material-icons">error</i></h5>);
        }
        else{
            return (<h5 style={getColorTextoCuadratura(GetPrecioFormateado(montoDiferencia))}>Cuadratura exacta <i class="material-icons">check</i> </h5>);
        }
    };

    const getColorTextoCuadratura=(montoDiferencia)=>{
        var res={};
        if(montoDiferencia<0 || montoDiferencia>0){
            res.color='rgb(238, 70, 50)';
        }
        else{
            res.color= 'rgb(37, 163, 91)';
        }

        return res;
    };

    const getSumTotalDeclarado=()=>{
        var res=0;
        mediosDePago.forEach((pago,i)=>{

            res+=Number(document.getElementById(pago.nombre+i).value);;
        });
        return res;
    };

    const getTextoDiferencia=()=>{
        const diferencia=totalRecaudado()-getSumTotalDeclarado();
        if(diferencia>0){
            return (<p>Diferencia: Faltan {GetPrecioFormateado(diferencia)} pesos</p>);
        }
        else if(diferencia<0){
            return (<p>Diferencia: Sobran {GetPrecioFormateado(diferencia)} pesos</p>);
        }
        else{
            return (<p>Diferencia: {GetPrecioFormateado(diferencia)}</p>);
        }
        
    };

    return (<React.Fragment>
                <h4></h4>
                <div className="row">
                <div class="col s6">
                    <ul className="collection">
                    {
                        mediosDePago.map((medio,i) => {
                            const prefijo='medios'+i;
                            return (
                                <li key={prefijo} onClick={() => { clickMedioDePago(medio) }} className="collection-item">
                                    <div className="row">
                                        <div style={{ 'cursor': 'pointer' }} className="col s8">
                                            <h3>{medio.nombre}</h3>
                                            {
                                                (isTotalPrecalculado)?
                                                (<h5>
                                                    {getTextoCuadratura( getDiferenciaPagadoDeclarado(medio,i))}
                                                </h5>):(null)
                                            }
                                        </div>
                                        <div className="col s4">
                                            <input defaultValue="0" id={medio.nombre+i} type="number" className="validate" />
                                        </div>
                                    </div>
                                </li>
                            );
                        })
                    }

                    </ul>
                </div>
                {
                    (isTotalPrecalculado)?(<DetallesMedioDePago />):(null)
                }
            </div>
            <div className="row">
                <div class="col s12">
                    <center>
                    {
                        (!Contexto.isArqueoCiegoSeleccionado && isTotalPrecalculado)?(
                            <p>Total recaudado: {GetPrecioFormateado( totalRecaudado())}</p>
                        ):(null)
                    }
                    
                    {
                        (isTotalPrecalculado)?(getTextoDiferencia()):(null)
                    }
                    </center>
               
                </div>
                
            </div>
            <div className="row">
                <div className="col s3"></div>
                <div className="col s3">
                    {
                        (!Contexto.isArqueoCiegoSeleccionado)?(
                            <a style={{'width':'100%'}} onClick={()=>{clickPrecalcular()}} style={{ 'backgroundColor': '#6c757d' }} className="waves-effect waves-light btn-large">Precalcular</a>
                        ):(null)
                    }
                    
                </div>
                <div className="col s3">
                    <a onClick={()=>{clickListo()}} style={{ 'backgroundColor': '#218838','width':'100%' }} 
                    className={(isTotalPrecalculado || Contexto.isArqueoCiegoSeleccionado)?("waves-effect waves-light btn-large "):("waves-effect waves-light btn-large disabled")}>Listo</a>
                </div>
                <div className="col s3"></div>
            </div>
            
    </React.Fragment>);
}

