import React, {  useEffect, useContext } from 'react';
import { TomaPedidoContext } from '../../Context/TomaPedidoContext';
import { FuncionGeneral, GetFetchHeaders,GetUrlApi} from '../Globales/FuncionesGlobales';
import { Link } from 'react-router-dom'
import swal from 'sweetalert';

export function BarraDeBotones() {
    const contextoTomaPedido = useContext(TomaPedidoContext);
    useEffect(() => {
        const M = window.M;
        var elems = document.querySelectorAll('.modal');
        var instances = M.Modal.init(elems, {
            
        });
    }, []);

    const setCantidad = () => {
        var cantidad = Number(localStorage.getItem('montoIngresadoTeclado'));
        contextoTomaPedido.setCantidad(cantidad);
    };

    const clickCantidad = () => {
        FuncionGeneral.setFuncion(setCantidad);
    };

    const clickAnular =async () => {
        var id = contextoTomaPedido.orden.id;
        if (id===0) {
            swal({
                title: "La orden no está creada",
                icon: "error"
            });
            return;
        }
        var respuesta = await fetch(GetUrlApi()+'api/ordenes/anularOrden?id='+id, {
            method: 'put',
            headers: GetFetchHeaders()
        });
        if (respuesta.ok) {
            swal({
                title: "Orden anulada",
                icon: "success"
            }).then(() => {
                contextoTomaPedido.setredirectRevisar(true);
            });
        }
        else {
            swal({
                title: "Error al anular",
                icon: "error"
            });
        }
    };

    return (
            <footer className="page-footer" style={{ position: "fixed", bottom: 0, left: 0, width: '100%', backgroundColor: '#25a35b', overflowX:'hidden' }}>
                
            <div class="row">
                <div class="col s2">
                    <Link to="/Revisar" style={{ width: '100%', height: '100%', backgroundColor: '#ee4632' }} class="waves-effect waves-light btn"><i class="material-icons">arrow_back</i></Link>
                </div>
                    <div class="col s2">
                        <a onClick={() => { clickAnular() }} style={{ width: '100%', height: '100%' }} class="waves-effect waves-light btn">Anular</a>
                    </div>
                    <div class="col s2">
                        <a style={{ width: '100%', height: '100%' }} class="waves-effect waves-light btn">Transferir</a>
                    </div>
                    <div class="col s2">
                        <a style={{ width: '100%', height: '100%', color: 'white' }} class="waves-effect waves-light btn modal-trigger" href="#modalEditar">Editar</a>
                    </div>
                    <div class="col s2">
                        <a style={{ width: '100%', height: '100%', color: 'white'  }} className="waves-effect waves-light btn modal-trigger" href="#ModalDescuentos">Descuentos</a>
                    </div>
                <div class="col s2">
                    <a onClick={() => { clickCantidad() }} href="#modalTeclado" style={{ width: '100%', height: '100%', color: 'white' }} class="waves-effect waves-light btn modal-trigger">Cantidad</a>
                </div>
                <div class="col s2">
                    <Link to="/Login" onClick={() => { contextoTomaPedido.CrearOrden() }} style={{ width: '100%', height: '100%', color: 'white' }} class="waves-effect waves-light btn">Listo</Link>
                </div>
                <div class="col s2">
                    <a onClick={() => {
                        contextoTomaPedido.CrearOrden()
                    }} style={{ width: '100%', height: '100%', color: 'white' }} class="waves-effect waves-light btn modal-trigger" href="#modal1">Pagar</a>
                </div>
            </div>
           
                
            </footer>
           
        
);
}
