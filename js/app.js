const pasajeIda = document.querySelector('#pasajeIda')
const metroIda = document.querySelector('#metroIda')
const metroRegreso = document.querySelector('#metroRegreso')
const pasajeRegreso = document.querySelector('#pasajeRegreso')
const otros = document.querySelector('#otros')
const formulario = document.querySelector('#formulario')
const btnEnviar = document.querySelector('#btnEnviar')
const btnBorrar = document.querySelector('#btnBorrar')
let gastos = []
const iniciarApp = () => {
    listeners()
}
const listeners = () => {
    document.addEventListener('DOMContentLoaded', cargaInicial)
    pasajeIda.addEventListener('blur', validarCampos)
    metroIda.addEventListener('blur', validarCampos)
    metroRegreso.addEventListener('blur', validarCampos)
    pasajeRegreso.addEventListener('blur', validarCampos)
    otros.addEventListener('blur', validarCampos)
    formulario.addEventListener('submit', enviarDatos)
    btnBorrar.addEventListener('click', limpiarFormulario)
}

const cargaInicial = () => {
    btnEnviar.disabled = true
    btnBorrar.disabled = true
}

const validarCampos = (e) => {
    const error = document.querySelector('p.error')
    if (error) {
        return
    }
    const valor = e.target.value
    if (valor.length > 0) {
        btnBorrar.disabled = false
        //Habilitar boton
    }
    else {
        btnEnviar.disabled = true
        mensaje('Campo obligatorio', 'error')
    }
    if (pasajeIda.value !== '' && metroIda.value !== '' && metroRegreso.value !== '' && pasajeRegreso.value !== '' && otros.value !== '') {
        btnBorrar.disabled = false
        btnEnviar.disabled = false
    }
}
const enviarDatos = (e) => {
    e.preventDefault()
    const gasto = {
        pasajeIda: pasajeIda.value,
        metroIda: metroIda.value,
        metroRegreso: metroRegreso.value,
        pasajeRegreso: pasajeRegreso.value
    }
    mensaje('Registro agregado', 'exito')
    gastos = [...gastos, gasto]
    limpiarFormulario()
    console.log(gastos);
    mostrarHtml()
}

mostrarHtml = () => {
    console.log('Desde mostrar HTML', gastos);
    gastos.forEach((gasto) => {
        // TODO crear la card para mostar los datos agregados
    })
}

const limpiarFormulario = () => {
    formulario.reset()
    btnEnviar.disabled = true
    btnBorrar.disabled = true
}

const mensaje = (mensaje, tipoAlerta) => {
    const parrafo = document.createElement('P')
    if (tipoAlerta === 'error') {
        parrafo.classList.add('error')
    }
    else {
        parrafo.classList.add('exito')
    }
    parrafo.innerHTML = mensaje
    setTimeout(() => {
        parrafo.remove()
    }, 3000);
    formulario.insertBefore(parrafo, formulario.children[5])
}
iniciarApp()