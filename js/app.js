const pasajeIda = document.querySelector('#pasajeIda')
const metroIda = document.querySelector('#metroIda')
const metroRegreso = document.querySelector('#metroRegreso')
const pasajeRegreso = document.querySelector('#pasajeRegreso')
const otros = document.querySelector('#otros')
const fecha = document.querySelector('#fecha')
const formulario = document.querySelector('#formulario')
const btnEnviar = document.querySelector('#btnEnviar')
const btnBorrar = document.querySelector('#btnBorrar')
const listaGastos = document.querySelector('#lista-gastos')
let gastos = []
const iniciarApp = () => {
    listeners()
}
const listeners = () => {
    document.addEventListener('DOMContentLoaded', () => {
        cargaInicial()
        gastos = JSON.parse(localStorage.getItem('gastos')) || []
        console.log('Gastos al inicio', gastos);
        mostrarHtml()
    })
    pasajeIda.addEventListener('blur', validarCampos)
    metroIda.addEventListener('blur', validarCampos)
    metroRegreso.addEventListener('blur', validarCampos)
    pasajeRegreso.addEventListener('blur', validarCampos)
    otros.addEventListener('blur', validarCampos)
    fecha.addEventListener('blur', validarCampos)
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
    if (pasajeIda.value !== '' && metroIda.value !== '' && metroRegreso.value !== '' && pasajeRegreso.value !== '' && otros.value !== '' && fecha.value !== '') {
        btnBorrar.disabled = false
        btnEnviar.disabled = false
    }
}
const enviarDatos = (e) => {
    e.preventDefault()
    const gasto = {
        fecha: fecha.value,
        pasajeIda: pasajeIda.value,
        metroIda: metroIda.value,
        metroRegreso: metroRegreso.value,
        pasajeRegreso: pasajeRegreso.value,
        otros: otros.value
    }
    console.log('gastos',gasto);
    console.log('fecha', fecha);
    mensaje('Registro agregado', 'exito')
    gastos = [...gastos, gasto]
    limpiarFormulario()
    mostrarHtml()
}

mostrarHtml = () => {
    console.log('Desde mostrar HTML', gastos);
    limpiarHTML()
    if (gastos.length > 0) {
        gastos.forEach((gasto) => {
            const div = document.createElement('DIV')
            const pIda = document.createElement('LI')
            const pReg = document.createElement('LI')
            const mIda = document.createElement('LI')
            const mReg = document.createElement('LI')
            const another = document.createElement('LI')
            const fechaGasto = document.createElement('SPAN')
            fechaGasto.textContent = `${gasto.fecha}`
            pIda.textContent = `Camion de ida: ${gasto.pasajeIda}`
            mIda.textContent = `Metro de ida: ${gasto.metroIda}`
            mReg.textContent = `Metro de regreso: ${gasto.metroRegreso}`
            pReg.textContent = `Camion de regreso: ${gasto.pasajeRegreso}`
            another.textContent = `Otros: ${gasto.otros}`
            div.classList.add('card')
            pIda.classList.add('list-group-item')
            pReg.classList.add('list-group-item')
            mIda.classList.add('list-group-item')
            mReg.classList.add('list-group-item')
            another.classList.add('list-group-item')
            fechaGasto.classList.add('badge', 'bg-success', 'p-2', 'fs-5')
            div.appendChild(fechaGasto)
            div.appendChild(pIda)
            div.appendChild(pReg)
            div.appendChild(mIda)
            div.appendChild(mReg)
            div.appendChild(another)
            listaGastos.appendChild(div)
            // * Calcular el total de cada campo ingresado
            const { pasajeIda, pasajeRegreso, metroIda, metroRegreso, otros } = gasto
            const span = document.createElement('span')
            let contador = Number(pasajeIda) + Number(pasajeRegreso) + Number(metroIda) + Number(metroRegreso) + Number(otros)
            span.textContent = `$ ${contador}`
            span.classList.add('badge', 'bg-primary', 'p-2', 'fs-5')
            div.appendChild(span)
            console.log(contador);
        })
    }
    sincronizarLocalStogare()
}

const sincronizarLocalStogare = () => {
    localStorage.setItem('gastos', JSON.stringify(gastos))
}

const limpiarHTML = () => {
    while (listaGastos.firstChild) {
        listaGastos.removeChild(listaGastos.firstChild)
    }
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
    formulario.insertBefore(parrafo, formulario.children[6])
}
iniciarApp()