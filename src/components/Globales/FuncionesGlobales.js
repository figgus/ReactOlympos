

export function GetPrecioPorTipoPedido(producto, tipoPedidoID) {
    var resPrecio = 0;
    if (tipoPedidoID === 1) {
        resPrecio =  producto.precioParaLlevar;
    }
    else if (tipoPedidoID === 2) {
        resPrecio =  producto.precioMesa;
    }
    else if (tipoPedidoID === 3) {
        resPrecio =  producto.precioBar;
    }
    else if (tipoPedidoID === 4) {
        resPrecio =  producto.precioDelivery;
    }
    return resPrecio;
}

export async function GetTipoVenta(id) {
    var respuesta = await fetch(GetUrlApi()+'/api/TiposPedidos/'+id, {
        method: 'get',
        headers: GetFetchHeaders()
    });
    if (respuesta.ok) {
        return await respuesta.json();
    }
}

export async function GetMediosDePago() {
    var respuesta = await fetch(GetUrlApi()+'/api/MediosDePago', {
        method: 'get',
        headers: GetFetchHeaders()
    });
    if (respuesta.ok) {
        return await respuesta.json();
    }
}

export function ClonarObjeto(objeto) {
    return JSON.parse(JSON.stringify(objeto));
}

export var FuncionGeneral = (function () {

    var funcion = () => { };

    var getFuncion = function () {
        return funcion;  
    };

    var setFuncion = function (funcionNueva) {
        funcion = funcionNueva;
    };

    var resetFuncion = function () {
        setFuncion(() => { });
    }

    return {
        getFuncion: getFuncion,
        setFuncion: setFuncion,
        resetFuncion: resetFuncion
    }

})();

export function CerrarTodasLasModales() {
    const M = window.M;
    var modales = document.querySelectorAll('.modal');
    modales.forEach((modal) => {
        const instanciaModal = M.Modal.getInstance(modal);
        instanciaModal.close();
    });
}

export async function GetDocumentosSii() {
    var respuesta = await fetch(GetUrlApi()+'/api/TiposDocumentos', {
        method: 'get',
        headers: GetFetchHeaders()
    });
    if (respuesta.ok) {
        return await respuesta.json();
    }
}

export function GetPrecioFormateado (precio) {
    try {
        return '$' + precio.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    } catch (err) {
        return '$ 0';
    }
}

export function GetOptionDatePicker() {
    return {
        format: "dd/mm/yyyy",
        i18n: {
            months: [
                'Enero',
                'Febrero',
                'Marzo',
                'Abril',
                'Mayo',
                'Junio',
                'Julio',
                'Agosto',
                'Septiembre',
                'Octubre',
                'Noviembre',
                'Diciembre'
            ],
            monthsShort: [
                'Ene',
                'Feb',
                'Marzo',
                'Abr',
                'Mayo',
                'Jun',
                'Julio',
                'Ago',
                'Sept',
                'Oct',
                'Nov',
                'Dic'
            ],
            weekdays: [
                'Lunes',
                'Martes',
                'Miercoles',
                'Jueves',
                'Viernes',
                'Sabado',
                'Domingo'
            ],
            firstDay: 1,
            weekdaysShort: [
                'Lunes',
                'Martes',
                'Miercoles',
                'Jueves',
                'Viernes',
                'Sabado',
                'Domingo'
            ],
            weekdaysAbbrev: ['L', 'M', 'M', 'J', 'V', 'S', 'D']
            
        }
    };
}

export function EstilosGlobales() {
    return {
        'paddingBottom':'50px'
    };
}

export async function GetGavetas(sucursalID) {
    var respuesta = await fetch(GetUrlApi()+'/api/Gavetas?sucursalID=' + sucursalID, {
        method: 'get',
        headers: GetFetchHeaders()
    });
    if (respuesta.ok) {
        debugger
        return await respuesta.json();
    }
}

export async function GetCategorias(sucursalID) {
    var respuesta = await fetch(GetUrlApi()+'/api/Categorias?sucursalID=' + sucursalID, {
        method: 'get',
        headers: GetFetchHeaders()
    });
    if (respuesta.ok) {
        return await respuesta.json();
    }
}

export async function GetGrupos() {
    var respuesta = await fetch(GetUrlApi()+'/api/Grupos' , {
        method: 'get',
        headers: GetFetchHeaders()
    });
    if (respuesta.ok) {
        return await respuesta.json();
    }
}

export async function GetFamilias() {
    var respuesta = await fetch(GetUrlApi()+'/api/Familias', {
        method: 'get',
        headers: GetFetchHeaders()
    });
    if (respuesta.ok) {
        return await respuesta.json();
    }
}

export async function GetSucursales() {
    var respuesta = await fetch(GetUrlApi()+'/api/Sucursales', {
        method: 'get',
        headers: GetFetchHeaders()
    });
    if (respuesta.ok) {
        return await respuesta.json();
    }
}


export async function GetDescuentos() {
    var respuesta = await fetch(GetUrlApi()+'/api/Descuentos', {
        method: 'get',
        headers: GetFetchHeaders()
    });
    if (respuesta.ok) {
        return await respuesta.json();
    }
}

export function formatearArregloColumnas (resOrdenes, cantidadDeColumnas) {
    const ordenesFormateadas = [];
    var cont = 0;
    var ultimaColumna = -1;
    resOrdenes.map((orden) => {
        if (cont % cantidadDeColumnas === 0) {
            ordenesFormateadas.push([orden]);
            ultimaColumna++;
        }
        else {
            ordenesFormateadas[ultimaColumna].push(orden);
        }
        cont++;
    });
    if (ordenesFormateadas.length > 0) {
        if (ordenesFormateadas[ordenesFormateadas.length - 1].length < cantidadDeColumnas) {
            const elementosFaltantes = cantidadDeColumnas - (ordenesFormateadas[ordenesFormateadas.length - 1].length);
            for (var i = 0; i < elementosFaltantes; i++) {
                ordenesFormateadas[ordenesFormateadas.length - 1].push({});
            }
        }
    }
    return ordenesFormateadas;
};

export function GetFetchHeaders() {

    return {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + document.cookie
    };
}

export function GetUrlApi(){
    return 'http://localhost:54479';
}

/*export function GetUrlApi(){
    return 'https://olymposapi.azurewebsites.net/';
}*/



export async function GetAperturaActual(estacionID) {
    var respuesta = await fetch(GetUrlApi()+'/api/AperturaDeGavetas/GetAperturaActual?estacionesID='+estacionID, {
        method: 'get',
        headers: GetFetchHeaders()
    });
    if (respuesta.ok) {
        try{
            return await respuesta.json();
        }catch(err){
            return null;
        }
        
    }
    else{
        return null;
    }
}