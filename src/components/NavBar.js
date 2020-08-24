import React, {  useEffect,useContext } from 'react';
import { UserContext } from '../Context/UserContext';
import { Link } from 'react-router-dom'

function useSideNav() {

    useEffect(() => {
        const M = window.M;
        document.addEventListener('DOMContentLoaded', function () {
            var elems = document.querySelectorAll('.sidenav');
             M.Sidenav.init(elems, {});
            
        });
        return document.removeEventListener("DOMContentLoaded", () => { }); ;
    });
}


export const NavBar=()=> {
    const usuario = useContext(UserContext);
    console.log(usuario);
    useSideNav();

    const CerrarSesion = () => {
        usuario.setUsuario({
            nombre: 'Ninguno',
            sucursal:{}
        });
    };


    const ClickTomaPedido = (id) => {
        localStorage.clear();
        localStorage.setItem('tipoPedido', id);
    };

    const getNombreUsuario=()=>{
        if(UserContext.usuario){
            return UserContext.usuario.nombre;
        }
    };

    return (
        <React.Fragment>
            <ul id="slide-out" className="sidenav">

                <li>
                    <div class="user-view">
                        <img style={{'maxHeight':'100%','maxWidth':'100%'}} src={require('../components/Imagenes/LogoCliente.png')}/>
                        <li><div className="divider"></div></li>
                        <div className="row"  style={{'paddingTop':'15px'}}>
                            <div className="col s4">
                            <a href="#user"><img class="circle" src={require('../components/Imagenes/NoPic.png')}/></a>
                            </div>
                            <div className="col s8">
                            <label>{usuario.usuario.nombre}{' '} {usuario.usuario.apellido}</label>
                            <label>{usuario.usuario.sucursal.nombre}</label>
                            </div>
                        </div>
                        
                        
                    </div>
                </li>
                <li><div className="divider"></div></li>
                <li><Link className="sidenav-close" to="/ParaLlevar" onClick={() => { ClickTomaPedido('1') }}> Para Llevar</Link></li>
                <li><Link className="sidenav-close" to="/Mesas" onClick={() => { ClickTomaPedido('2') }}> Mesa</Link> </li>
                <li><Link className="sidenav-close" to="/Bar" onClick={() => { ClickTomaPedido('3') }}> Bar</Link></li>
                <li><Link className="sidenav-close" to="/Delivery" onClick={() => { ClickTomaPedido('4') }}> Delivery</Link></li>
                <li><Link className="sidenav-close" to="/Revisar"> Revisar</Link></li>
                <li><Link className="sidenav-close" to="/Apertura"> Apertura de gaveta</Link></li>
                <li><Link className="sidenav-close" to="/Cierre"> Cierre de gaveta</Link></li>
                <li><div className="divider"></div></li>
                <li><a className="subheader">Administracion</a></li>
                <li><a >Administración</a></li>
                <li><Link to="/Productos">Mantenedor Productos</Link></li>
                <li><div className="divider"></div></li>
                <li><Link onClick={() => { CerrarSesion() }} className="sidenav-close" to="/Login"> Cerrar Sesión</Link></li>
            </ul>
            
            <nav style={{ backgroundColor: '#25a35b' }}>
                <div className="nav-wrapper">
                    <a  onClick={() => { ClickLogo(usuario.setUsuario) }} className="brand-logo">
                        <img style={{'height':'40px',width:'80'}} src={require('../components/Imagenes/LogoOlimpos.png')}/>
                    </a>
                    &nbsp;
                    <a href="#" data-target="slide-out" className="sidenav-trigger show-on-large"><i className="material-icons">menu</i></a>
                    
                    <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li><a>{usuario.usuario.nombre}{' '} {usuario.usuario.apellido}{(usuario.usuario.sucursal.nombre)?(' - '+usuario.usuario.sucursal.nombre):(null)}</a></li>
                        <li><Link onClick={() => { CerrarSesion() }} to="/Login">Cerrar Sesión</Link> </li>
                    </ul>
                </div>
            </nav>
        </React.Fragment>
        );
}



function ClickLogo(setFunction) {
    setFunction('funciona el cambio');
}

