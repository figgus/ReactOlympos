import React, { useState, useEffect, useContext } from 'react';
import { Redirect } from 'react-router'
import { TomaPedidoContext } from '../../Context/TomaPedidoContext';
import { CerrarTodasLasModales, GetDocumentosSii } from '../Globales/FuncionesGlobales';

export function Vuelto() {
    const M = window.M;
    const [isVolver, setIsVolver] = useState(false);
    const [tiposDeDocumentoSii, setTiposDeDocumentoSii] = useState([]);
    const contextoTomaPedido = useContext(TomaPedidoContext);

    useEffect(() => {
        var elems = document.querySelectorAll('.modal');
        var instances = M.Modal.init(elems, {
            onCloseStart: () => { setIsVolver(true) }
        });
        GetDocumentosSii().then((documentos) => {
            setTiposDeDocumentoSii(documentos);
        });
        var instanciaTeclado = M.Modal.getInstance(document.getElementById('modalVuelto'));
        instanciaTeclado.open();
    }, []);

    const clickVolver = () => {
        CerrarTodasLasModales();
        setIsVolver(true);
    };

    return (
        <div id="modalVuelto" class="modal bottom-sheet">
            {(isVolver) ? (<Redirect to={'/Revisar'} />) : (null)}
            <div class="modal-content">

                <div class="row">
                    <div class="col s4">

                    </div>
                    <div class="col s4">
                        <h4>Vuelto a dar: {contextoTomaPedido.orden.vuelto}</h4>
                    </div>
                    <div class="col s4">
                        <a style={{ 'float': 'right', 'backgroundColor': 'green' }} onClick={() => { clickVolver() }} class="waves-effect waves-light btn"><i class="material-icons right">check</i>Listo</a>
                    </div>
                </div>
                

                <ul class="collection">
                    {
                        tiposDeDocumentoSii.map((documento) => {
                            return (
                                <li class="collection-item avatar">
                                    <img src="images/yuna.jpg" alt="" class="circle" />
                                    <span class="title">{documento.nombre}</span>
                                    <p>  <br />
                                         
                                    </p>
                                    <a href="#!" class="secondary-content"><i class="material-icons">grade</i></a>
                                </li>
                                );
                        })
                    }
                    
                    
                </ul>

            </div>
            <div class="modal-footer">
                <a href="#!" class="modal-close waves-effect waves-green btn-flat">Agree</a>
            </div>
        </div>
        );
}

