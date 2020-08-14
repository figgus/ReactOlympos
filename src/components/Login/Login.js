import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../Context/UserContext';
import { Redirect } from 'react-router'
import { GetFetchHeaders,GetUrlApi} from '../Globales/FuncionesGlobales';

export function Login() {
    const usuario = useContext(UserContext);
    const [redirectToRevisar, setRedirectToRevisar] = useState(false);
    const [pin, setPin] = useState('');
    const M = window.M;

    const BuscarUsuarioPorPin = async () => {
        const url = GetUrlApi()+'/api/Usuarios/GetUsuarioPorPin?pin=' + pin;
        var respuesta = await fetch(url, {
            method: 'get',
            headers: GetFetchHeaders()
        });
        if (respuesta.ok) {
            const resupuestaUsuario = await respuesta.json();
            
            document.cookie = resupuestaUsuario.jwt /*+ ';secure;HttpOnly'*/;
            resupuestaUsuario.jwt = null;
            usuario.setUsuario(resupuestaUsuario);
            setRedirectToRevisar(true);
        }
        else {
            document.getElementById('userNotFound').style.display="block";
            setTimeout(() => {
                document.getElementById('userNotFound').style.display = "none";
            }, 3000);
        }
        return {};
    };
    const ClickNumero = (numero) => {
        var newPin = String(pin) + String(numero);
        setPin(newPin);
    };

    useEffect(() => {
        usuario.setUsuario({ nombre: 'Ninguno' });
        
    }, []);

    return (
        <React.Fragment>
            {
                (redirectToRevisar) ? (<Redirect to={'/Revisar'} />):(null)
            }
            <div style={{ 'width': '25%' }} class="container">
                <input id="pin" type="password" class="validate" value={pin} disabled={true} />
                <div class="row">
                    <div class="col s4">
                        <a onClick={() => { ClickNumero("1") }} class="btn-floating btn-large waves-effect waves-light green"><strong> 1</strong></a>
                    </div>
                    <div class="col s4">
                        <a onClick={() => { ClickNumero("2") }} class="btn-floating btn-large waves-effect waves-light green"><strong> 2</strong></a>
                    </div>
                    <div class="col s4">
                        <a onClick={() => { ClickNumero("3") }} class="btn-floating btn-large waves-effect waves-light green"><strong> 3</strong></a>
                    </div>
                </div>
                <div class="row">
                    <div class="col s4">
                        <a onClick={() => { ClickNumero("4") }} class="btn-floating btn-large waves-effect waves-light green"><strong> 4</strong></a>
                    </div>
                    <div class="col s4">
                        <a onClick={() => { ClickNumero("5") }} class="btn-floating btn-large waves-effect waves-light green"><strong> 5</strong></a>
                    </div>
                    <div class="col s4">
                        <a onClick={() => { ClickNumero("6") }} class="btn-floating btn-large waves-effect waves-light green"><strong> 6</strong></a>
                    </div>
                </div>
                <div class="row">
                    <div class="col s4">
                        <a onClick={() => { ClickNumero("7") }} class="btn-floating btn-large waves-effect waves-light green"><strong> 7</strong></a>
                    </div>
                    <div class="col s4">
                        <a onClick={() => { ClickNumero("8") }} class="btn-floating btn-large waves-effect waves-light green"><strong> 8</strong></a>
                    </div>
                    <div class="col s4">
                        <a onClick={() => { ClickNumero("9") }} class="btn-floating btn-large waves-effect waves-light green"><strong> 9</strong></a>
                    </div>
                </div>
                <div class="row">
                    <div class="col s4">
                        <a onClick={() => { setPin('')}} class="btn-floating btn-large waves-effect waves-light green">  <i class="material-icons">clear</i> </a>
                    </div>
                    <div class="col s4">
                        <a onClick={() => { ClickNumero("0") }} class="btn-floating btn-large waves-effect waves-light green"><strong> 0</strong></a>
                    </div>
                    <div class="col s4">
                        <a onClick={() => { BuscarUsuarioPorPin() }} class="btn-floating btn-large waves-effect waves-light green"> <i class="material-icons">check</i></a>
                    </div>
                </div>
                <div  class="row">
                    <div class="col s12 m5">
                        <div id="userNotFound" style={{ 'display': 'none' }} class="card-panel teal">
                            <span class="white-text">
                                Usuario no valido
                             </span>
                        </div>
                    </div>
                </div>
            </div>


    </React.Fragment>);
}
