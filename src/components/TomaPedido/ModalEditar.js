import React, {  useContext } from 'react';
import { TomaPedidoContext } from '../../Context/TomaPedidoContext';
import {ClonarObjeto} from '../Globales/FuncionesGlobales';
import swal from 'sweetalert';


export function ModalEditar(){
    const contextoOrden = useContext(TomaPedidoContext);
    const tamañoFuente='20px';
    const M=window.M;

    const clickMas=(indice)=>{
        var nuevaOrden=contextoOrden.orden;
        var productoClickeado= nuevaOrden.productosPorOrden[indice];
        productoClickeado.cantidad=productoClickeado.cantidad+1;
        contextoOrden.setOrden(ClonarObjeto(nuevaOrden));
    };
    const clickMenos=(indice)=>{
        var nuevaOrden=contextoOrden.orden;
        var productoClickeado= nuevaOrden.productosPorOrden[indice];
        productoClickeado.cantidad=productoClickeado.cantidad-1;
        if(productoClickeado.cantidad<1){
            return;
        }
        contextoOrden.setOrden(ClonarObjeto(nuevaOrden));
    };

    const clickBorrar=(indice)=>{
        swal({
            title: "¿Seguro que desea borrar?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((isBorrar) => {
                if (isBorrar) {
                    var nuevaOrden=contextoOrden.orden;
                    nuevaOrden.productosPorOrden.splice(indice, 1);
                    contextoOrden.setOrden(ClonarObjeto(nuevaOrden));
                } 
            });
        
    };

    const CerrarModal = () => {
        var instanciaTeclado = M.Modal.getInstance(document.getElementById('modalEditar'));
        instanciaTeclado.close();
    };

    const AbrirModalModificadores = () => {
        var instanciaTeclado = M.Modal.getInstance(document.getElementById('modalModificadores'));
        instanciaTeclado.open();
    };

    return (
        <div style={{'overflow':'scroll'}} id="modalEditar" class="modal bottom-sheet">
            <div class="modal-content">
                <div className="container">
                    <table>
                        <thead>
                            <tr>
                                <th style={{'font-size': tamañoFuente}}>Cantidad</th>
                                <th style={{'font-size': tamañoFuente}}>Nombre</th>
                                <th style={{'font-size': tamañoFuente}}>Acciones</th>
                            </tr>
                        </thead>
                        <tbody style={{ 'height': '500px', 'overflowY': 'scroll' }}>
                            {

                                contextoOrden.orden.productosPorOrden.map((item,index) => {
                                    return (
                                        <tr key={'productosOrdenModificar'+index}>
                                            <td>
                                                <i onClick={()=>{clickMas(index)}} style={{'font-size': '40px','cursor':'pointer'}} className="material-icons Large">add_circle</i>
                                                <label style={{'font-size': '40px'}}>{item.cantidad}</label>
                                                <i onClick={()=>{clickMenos(index)}} style={{'font-size': '40px','cursor':'pointer'}} className="material-icons Large">remove_circle</i> 
                                            </td>
                                            <td>
                                                <p style={{'font-size': tamañoFuente}}> {item.productos.nombre}</p>
                                            </td>
                                            <td>
                                                <i onClick={()=>{clickBorrar(index)}} style={{'font-size': '40px','cursor':'pointer','paddingRight':'20px'}} className="material-icons Large">delete</i>
                                                <i onClick={()=>{AbrirModalModificadores()}} style={{'font-size': '40px','cursor':'pointer'}} className="material-icons">message</i>
                                            </td>
                                        </tr>
                                    );
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        <div class="modal-footer">
            <a href="#!" class="modal-close waves-effect waves-green btn-flat">Listo</a>
        </div>
  </div>
    );
}