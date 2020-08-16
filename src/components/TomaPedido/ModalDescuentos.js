import React, { useEffect } from 'react';
import { DescuentoPorcentaje} from '../TomaPedido/Descuentos/DescuentoPorcentaje';
import { DescuentoMonto } from '../TomaPedido/Descuentos/DescuentoMonto';
import { DescuentoProducto } from '../TomaPedido/Descuentos/DescuentoProducto';

export function ModalDescuentos() {
    const M = window.M;

    useEffect(() => {
        M.Tabs.init(document.querySelector('.tabs'), {});
    });



   

    return (
        <div id="ModalDescuentos" class="modal bottom-sheet">
            <div className="modal-content">

                <ul style={{ 'color': '#25a35b' }} class="tabs tabs-fixed-width tab-demo z-depth-1">
                    <li class="tab"><a style={{ 'color': '#495057' }} className="active" href="#porcentaje"> Porcentaje</a></li>
                    <li class="tab"><a style={{ 'color': '#495057' }} href="#monto">Monto</a></li>
                    <li class="tab"><a style={{ 'color': '#495057' }} href="#producto">Producto</a></li>
                </ul>
                <div id="porcentaje" class="col s12">
                    <p>
                        <DescuentoPorcentaje />
                    </p></div>
                <div id="monto" class="col s12">
                    <p>
                        <DescuentoMonto />
                    </p>
                </div>
                <div id="producto" class="col s12"><p>
                        <DescuentoProducto />
                </p>
                </div>
            </div>
        </div>
        );
}