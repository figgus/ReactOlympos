import React, { useState, useEffect, useContext, Component } from 'react';
import { UserContext } from '../../Context/UserContext';
import { FuncionGeneral } from '../Globales/FuncionesGlobales';

export function TecladoNumerico() {
    const M = window.M;
    const valorInicialPin = '';

    const ClickNumero = (numero) => {
        var textoPin = document.getElementById('pin').value + numero;
        document.getElementById('pin').value = textoPin;
    };

    const ClickListo = () => {
        var textoPin = document.getElementById('pin').value;
        localStorage.setItem('montoIngresadoTeclado', textoPin);
        FuncionGeneral.getFuncion().call();
        document.getElementById('pin').value = '';
        CerrarModal();
    }

    const ClickBorrar = () => {
        var pinActual = document.getElementById('pin').value;
        if (pinActual === '') {
            CerrarModal();
        }
        else {
            document.getElementById('pin').value = valorInicialPin;
        }
    };

    const CerrarModal = () => {
        var instanciaTeclado = M.Modal.getInstance(document.getElementById('modalTeclado'));
        instanciaTeclado.close();
    };


    useEffect(() => {
        
        var elems = document.querySelectorAll('.modal');
        var instances = M.Modal.init(elems, {
            onOpenEnd: () => {
               
            },

        });

    });
    return (

        <div id="modalTeclado" className="modal bottom-sheet" style={{ 'overflow': 'scroll' }}>

            

            <div class="row">
                <div className="col s1"></div>
                <div className="col s1"></div>
                <div className="col s1"></div>
                <div className="col s1"></div>
                <div className="col s3">
                    <input id="pin" type="number" className="validate" disabled={true} />
                </div>
                <div className="col s1"></div>
                <div className="col s1"></div>
                <div className="col s1"></div>
                <div className="col s1"></div>
                <div className="col s1"></div>
            </div>

            <div class="row">
                <div className="col s1"></div>
                <div className="col s1"></div>
                <div className="col s1"></div>
                <div className="col s1"></div>
                <div className="col s1">
                    <a onClick={() => { ClickNumero("1") }} className="btn-floating btn-large waves-effect waves-light green"><strong> 1</strong></a>
                </div>
                <div class="col s1">
                    <a onClick={() => { ClickNumero("2") }} className="btn-floating btn-large waves-effect waves-light green"><strong> 2</strong></a>
                </div>
                <div class="col s1">
                    <a onClick={() => { ClickNumero("3") }} className="btn-floating btn-large waves-effect waves-light green"><strong> 3</strong></a>
                </div>
                <div className="col s1"></div>
                <div className="col s1"></div>
                <div className="col s1"></div>
                <div className="col s1"></div>
                <div className="col s1"></div>
            </div>
            <div class="row">
                <div class="col s1"></div>
                <div class="col s1"></div>
                <div class="col s1"></div>
                <div class="col s1"></div>
                <div class="col s1">
                    <a onClick={() => { ClickNumero("4") }} class="btn-floating btn-large waves-effect waves-light green"><strong> 4</strong></a>
                </div>
                <div class="col s1">
                    <a onClick={() => { ClickNumero("5") }} class="btn-floating btn-large waves-effect waves-light green"><strong> 5</strong></a>
                </div>
                <div class="col s1">
                    <a onClick={() => { ClickNumero("6") }} class="btn-floating btn-large waves-effect waves-light green"><strong> 6</strong></a>
                </div>
                <div class="col s1"></div>
                <div class="col s1"></div>
                <div class="col s1"></div>
                <div class="col s1"></div>
                <div class="col s1"></div>
            </div>
            <div class="row">
                <div class="col s1"></div>
                <div class="col s1"></div>
                <div class="col s1"></div>
                <div class="col s1"></div>
                <div class="col s1">
                    <a onClick={() => { ClickNumero("7") }} class="btn-floating btn-large waves-effect waves-light green"><strong> 7</strong></a>
                </div>
                <div class="col s1">
                    <a onClick={() => { ClickNumero("8") }} class="btn-floating btn-large waves-effect waves-light green"><strong> 8</strong></a>
                </div>
                <div class="col s1">
                    <a onClick={() => { ClickNumero("9") }} class="btn-floating btn-large waves-effect waves-light green"><strong> 9</strong></a>
                </div>
                <div class="col s1"></div>
                <div class="col s1"></div>
                <div class="col s1"></div>
                <div class="col s1"></div>
                <div class="col s1"></div>
            </div>

            <div class="row">
                <div class="col s1"></div>
                <div class="col s1"></div>
                <div class="col s1"></div>
                <div class="col s1"></div>
                <div class="col s1">
                    <a onClick={() => { ClickBorrar() }} class="btn-floating btn-large waves-effect waves-light green"><i class="material-icons">clear</i> </a>
                </div>
                <div class="col s1">
                    <a onClick={() => { ClickNumero("0") }} class="btn-floating btn-large waves-effect waves-light green"><strong> 0</strong></a>
                </div>
                <div class="col s1">
                    <a onClick={() => { ClickListo() }} class="btn-floating btn-large waves-effect waves-light green"><i class="material-icons">check</i></a>
                </div>
                <div class="col s1"></div>
                <div class="col s1"></div>
                <div class="col s1"></div>
                <div class="col s1"></div>
                <div class="col s1"></div>
            </div>

            </div>
            
        );
}