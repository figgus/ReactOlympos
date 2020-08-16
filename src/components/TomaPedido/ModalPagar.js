import React, { useState, useEffect, useContext } from 'react';
import { GetMediosDePago, ClonarObjeto, FuncionGeneral, GetFetchHeaders ,GetUrlApi} from '../Globales/FuncionesGlobales';
import { TomaPedidoContext } from '../../Context/TomaPedidoContext';
import swal from 'sweetalert';
import { Vuelto } from '../TomaPedido/Vuelto';


export function ModalPagar() {
    const M = window.M;
    const contextoTomaPedido = useContext(TomaPedidoContext);
    const [mediosDePago, setMediosDePago] = useState([]);
    const [pagos, setPagos] = useState([]);
    const [isMostrarVuelto, setIsMostrarVuelto] = useState(false);
    var medioSeleccionado = {};
    useEffect(() => {
        GetMediosDePago().then((response) => {
            setMediosDePago(response);
        });
    }, []);

    const AgregarPago = ( ) => {
        let pagosActuales = pagos;
        let pago = {};
        pago.montoPagado = Number(localStorage.getItem('montoIngresadoTeclado'));
        pago.ordenID = contextoTomaPedido.orden.id;
        pago.mediosDePagoID = medioSeleccionado.id;
        pago.mediosDePago = medioSeleccionado;
        pagosActuales.push(pago);
        setPagos(ClonarObjeto(pagosActuales));
    }
    const CerrarModal = () => {
        var instanciaTeclado = M.Modal.getInstance(document.getElementById('modal1'));
        instanciaTeclado.close();
    };

    const BorrarPago = (index) => {
        swal({
            title: "¿Seguro que desea borrar?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    let copiaPagos = ClonarObjeto(pagos);
                    copiaPagos.splice(index, 1);
                    setPagos(copiaPagos);
                } 
            });
    };
    FuncionGeneral.setFuncion(AgregarPago);
    
    const getTotalPagado = () => {
        var res = 0;
        pagos.map((pago) => {
            res += pago.montoPagado;
        });
        return res;
    };

    const clickPagar = async () => {
        var datosOrden = contextoTomaPedido.orden;
        datosOrden.mediosPorOrden = pagos;
        datosOrden.vuelto = getVuelto();
        contextoTomaPedido.setOrden(ClonarObjeto(datosOrden));
        var respuesta = await fetch(GetUrlApi()+'/api/Ordenes/PagarOrden', {
            method: 'put',
            headers: GetFetchHeaders(),
            body: JSON.stringify(datosOrden),
        });
        if (respuesta.ok) {
            setIsMostrarVuelto(true);
        }
        else {

        }
    };

    const getVuelto=()=>{
        return (contextoTomaPedido.orden.total - getTotalPagado())*-1;
    }

    const abrirModalPagar = (medio) => {
        medioSeleccionado = medio;
        var totalOrden = Number(localStorage.getItem('orden.total')) - getTotalPagado();
        document.getElementById('pin').value = totalOrden;
    };
    return (
        <React.Fragment>
            {
                (isMostrarVuelto) ? (
                    <Vuelto />
                ): (null)
            }
            <div id="modal1" class="modal bottom-sheet" style={{ 'overflow': 'scroll', color:'black' }}>
                <div class="modal-content">


                    <div class="row">
                        <div class="col s2"><strong>Total a pagar: {contextoTomaPedido.orden.total}</strong></div>
                        <div class="col s2"><strong>Subtotal:  {contextoTomaPedido.orden.subtotal}</strong></div>
                        <div class="col s2"><strong>Total pagado: {getTotalPagado()}</strong></div>
                        <div class="col s2"><strong>Faltante: {getVuelto()}</strong></div>
                        <div class="col s2"><strong></strong></div>
                        <div class="col s2"><strong></strong></div>
                    </div>
                    {
                        (pagos.length > 0) ? (<h4>Pagos</h4>) : (null)
                    }
                    
                    <div class="row">
                        <div class="col s12 m5">
                            {
                                pagos.map((pago,index) => {
                                    return (
                                        <div onClick={() => { BorrarPago(index) }} class="chip" style={{ 'cursor': 'pointer', fontSize: '15px' }}>
                                            <strong>{pago.mediosDePago.nombre} ({pago.montoPagado})</strong>
                                            <i class="material-icons">close</i>
                                        </div>
                                        
                                        );
                                })
                            }
                            
                        </div>
                    </div>
                    <ul class="collection">
                        {
                            (contextoTomaPedido.orden.total - getTotalPagado() <= 0) ? (
                                <li onClick={() => { clickPagar() }} style={{ 'cursor': 'pointer' }} class="collection-item avatar" href="#modalTeclado">

                                    <span style={{ 'color': '#25a35b' }} className="title"><strong>Listo</strong></span>

                                    <a href="#!" class="secondary-content"><i class="material-icons circle">send</i></a>
                                </li>
                            ) : (
                                    mediosDePago.map((medio) => {
                                        return (
                                            <li onClick={() => { abrirModalPagar(medio) }} style={{ 'cursor': 'pointer' }} class="collection-item avatar modal-trigger" href="#modalTeclado">
                                                <span class="title">{medio.nombre}</span>

                                                <a href="#!" class="secondary-content"><i class="material-icons">send</i></a>
                                            </li>
                                        );
                                    })
                                    )
                        }
                       
                        
                       
                        
                    </ul>
                </div>
                <div class="modal-footer">
                    <a href="javascript:void(0)" onClick={() => { CerrarModal() }} class="modal-close waves-effect waves-green btn-flat">Cerrar</a>
                    
                    
                </div>
            </div>
        </React.Fragment>
        
        );
}