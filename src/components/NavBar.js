import React, { useState, useEffect,useContext } from 'react';
import { Redirect } from 'react-router'
import { UserContext } from '../Context/UserContext';
import { Link } from 'react-router-dom'

function useSideNav() {

    useEffect(() => {
        const M = window.M;
        document.addEventListener('DOMContentLoaded', function () {
            var elems = document.querySelectorAll('.sidenav');
            var instances = M.Sidenav.init(elems, {});
            
        });
        return document.removeEventListener("DOMContentLoaded", () => { }); ;
    });
}


export const NavBar=()=> {
    const M = window.M;

    

    const usuario = useContext(UserContext);
    const sideNav = useSideNav();

    const CerrarSesion = () => {
        usuario.setUsuario({
            nombre: 'Ninguno'
        });
    };


    const ClickTomaPedido = (id) => {
        localStorage.clear();
        localStorage.setItem('tipoPedido', id);
    };

    return (
        <React.Fragment>
            <ul id="slide-out" class="sidenav">
                <li><Link className="sidenav-close" to="/ParaLlevar" onClick={() => { ClickTomaPedido('1') }}> Para Llevar</Link></li>
                <li><Link className="sidenav-close" to="/Mesas" onClick={() => { ClickTomaPedido('2') }}> Mesa</Link> </li>
                <li><Link className="sidenav-close" to="/Bar" onClick={() => { ClickTomaPedido('3') }}> Bar</Link></li>
                <li><Link className="sidenav-close" to="/Delivery" onClick={() => { ClickTomaPedido('4') }}> Delivery</Link></li>
                <li><Link className="sidenav-close" to="/Revisar"> Revisar</Link></li>
                <li><Link className="sidenav-close" to="/Apertura"> Apertura de gaveta</Link></li>
                <li><Link className="sidenav-close" to="/Cierre"> Cierre de gaveta</Link></li>
                <li><div class="divider"></div></li>
                <li><a class="subheader">Administracion</a></li>
                <li><a href="javascript:void(0)" >Administración</a></li>
                <li><Link to="/Productos" >Mantenedor Productos</Link></li>
            </ul>


            <nav style={{ backgroundColor: '#25a35b' }}>
                <div class="nav-wrapper">
                    <a href="javascript:void(0)" onClick={() => { ClickLogo(usuario.setUsuario) }} class="brand-logo">Logo</a>
                    <a href="#" data-target="slide-out" class="sidenav-trigger show-on-large"><i class="material-icons">menu</i></a>
                    
                    <ul id="nav-mobile" class="right hide-on-med-and-down">
                        <li><a href="javascript:void(0)">{usuario.usuario.nombre}</a></li>
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

