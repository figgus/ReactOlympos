import React,{useContext,useEffect,useState} from 'react';
import { GetDescuentos, ClonarObjeto,FuncionGeneral } from '../../Globales/FuncionesGlobales';
import { TomaPedidoContext} from '../../../Context/TomaPedidoContext';

export function DescuentoMonto() {
    const contextoTomaPedido = useContext(TomaPedidoContext);
    const M=window.M;
    const clickDescuentoMonto=(montoDescuento)=>{
        let orden=contextoTomaPedido.orden;
        orden.montoExactoDescuento=montoDescuento;
        contextoTomaPedido.setOrden(ClonarObjeto(orden));
        cerrarModal();
    };

    const clickRemoverDescuento=()=>{
        const orden=contextoTomaPedido.orden;
        orden.montoExactoDescuento=0;
        contextoTomaPedido.setOrden(ClonarObjeto(orden));
        cerrarModal();
    };

    const setDescuentoExacto = () => {
        var cantidad = Number(localStorage.getItem('montoIngresadoTeclado'));
        let orden=ClonarObjeto(contextoTomaPedido.orden);
        orden.montoExactoDescuento=cantidad;
        contextoTomaPedido.setOrden(orden);
    };

    const clickMontoPersonalizado=()=>{
        FuncionGeneral.setFuncion(setDescuentoExacto);
    };

    const cerrarModal = () => {
        var instanciaTeclado = M.Modal.getInstance(document.getElementById('ModalDescuentos'));
        instanciaTeclado.close();
    };

    return (<React.Fragment>
        <div className="container">
            <br/>
            <br/>
            <div className="row">
                <div className="col s6">
                    <a onClick={()=>{clickDescuentoMonto(1000)}} style={{'width':'80%','background':'rgb(37, 163, 91)'}} className="waves-effect waves-light btn-large">$1000</a>
                </div>
                <div className="col s6">
                    <a  onClick={()=>{clickDescuentoMonto(2000)}} style={{'width':'80%','background':'rgb(37, 163, 91)'}}className="waves-effect waves-light btn-large">$2000</a>
                </div>
            </div>

            <div className="row">
                <div className="col s6">
                    <a onClick={()=>{clickDescuentoMonto(5000)}} style={{'width':'80%','background':'rgb(37, 163, 91)'}} 
                    className="waves-effect waves-light btn-large">$5000</a>
                </div>
                <div className="col s6">
                    <a onClick={()=>{clickMontoPersonalizado()}} style={{'width':'80%','background':'rgb(37, 163, 91)'}} className="waves-effect waves-light btn-large modal-trigger"  href="#modalTeclado">Otro monto</a>
                </div>
            </div>
            {
                (contextoTomaPedido.orden.montoExactoDescuento>0)?
                (
                    <div className="row">
                        <div className="col s4"></div>
                        <div className="col s4">
                            <a onClick={()=>{clickRemoverDescuento()}} style={{'width':'80%','background':'rgb(238, 70, 50)'}} 
                            className="waves-effect waves-light btn-large" >Remover descuento</a>
                        </div>
                        <div className="col s4"></div>
                    </div>
                ):(null)
            }
            

        </div>
    </React.Fragment> );
}