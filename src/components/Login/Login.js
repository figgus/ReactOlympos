import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../Context/UserContext';
import { Redirect } from 'react-router'
import { GetFetchHeaders,GetUrlApi} from '../Globales/FuncionesGlobales';

export function Login() {
    const usuario = useContext(UserContext);
    const [redirectToRevisar, setRedirectToRevisar] = useState(false);
    const [pin, setPin] = useState('');
    //const M = window.M;

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
       // usuario.setUsuario({ nombre: 'Ninguno' });
        
    }, []);

    return (
        <React.Fragment>
            {
                (redirectToRevisar) ? (<Redirect to={'/Revisar'} />):(null)
            }
            <div style={{ 'width': '25%' }} className="container">
                <input id="pin" type="password" className="validate" value={pin} disabled={true} />
                <div className="row">
                    <div className="col s4">
                        <a onClick={() => { ClickNumero("1") }} className="btn-floating btn-large waves-effect waves-light green"><strong> 1</strong></a>
                    </div>
                    <div className="col s4">
                        <a onClick={() => { ClickNumero("2") }} className="btn-floating btn-large waves-effect waves-light green"><strong> 2</strong></a>
                    </div>
                    <div className="col s4">
                        <a onClick={() => { ClickNumero("3") }} className="btn-floating btn-large waves-effect waves-light green"><strong> 3</strong></a>
                    </div>
                </div>
                <div className="row">
                    <div className="col s4">
                        <a onClick={() => { ClickNumero("4") }} className="btn-floating btn-large waves-effect waves-light green"><strong> 4</strong></a>
                    </div>
                    <div className="col s4">
                        <a onClick={() => { ClickNumero("5") }} className="btn-floating btn-large waves-effect waves-light green"><strong> 5</strong></a>
                    </div>
                    <div className="col s4">
                        <a onClick={() => { ClickNumero("6") }} className="btn-floating btn-large waves-effect waves-light green"><strong> 6</strong></a>
                    </div>
                </div>
                <div className="row">
                    <div className="col s4">
                        <a onClick={() => { ClickNumero("7") }} className="btn-floating btn-large waves-effect waves-light green"><strong> 7</strong></a>
                    </div>
                    <div className="col s4">
                        <a onClick={() => { ClickNumero("8") }} className="btn-floating btn-large waves-effect waves-light green"><strong> 8</strong></a>
                    </div>
                    <div className="col s4">
                        <a onClick={() => { ClickNumero("9") }} className="btn-floating btn-large waves-effect waves-light green"><strong> 9</strong></a>
                    </div>
                </div>
                <div className="row">
                    <div className="col s4">
                        <a onClick={() => { setPin('')}} className="btn-floating btn-large waves-effect waves-light green">  <i className="material-icons">clear</i> </a>
                    </div>
                    <div className="col s4">
                        <a onClick={() => { ClickNumero("0") }} className="btn-floating btn-large waves-effect waves-light green"><strong> 0</strong></a>
                    </div>
                    <div className="col s4">
                        <a onClick={() => { BuscarUsuarioPorPin() }} className="btn-floating btn-large waves-effect waves-light green"> <i className="material-icons">check</i></a>
                    </div>
                </div>
                <div  className="row">
                    <div className="col s12 m5">
                        <div id="userNotFound" style={{ 'display': 'none' }} className="card-panel teal">
                            <span className="white-text">
                                Usuario no valido
                             </span>
                        </div>
                    </div>
                </div>
            </div>


    </React.Fragment>);
}
