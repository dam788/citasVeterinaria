import React, { Fragment, useState } from 'react';
import { v4 as uuidv4 } from 'uuid'; /*simula id cuando no hay base de datos*/
import PropTypes from 'prop-types';

const Formulario = ({ crearCita }) => {

  // 1 - crear el state de citas con hooks
  const [ cita, actualizarCita ] = useState({
  mascota: '',
  propietario: '',
  fecha: '',
  hora: '',
  sintomas: ''
  })
  //creamos state para manejar error....
  const [ error, actualizaError ] = useState(false)

  // 2 - Funsion que se actualiza cuando usuario escribe dentro del input
  const actualizarState = e => {
  /* e.target.value -> evento para saber que escribieron en el input*/
    actualizarCita({
      ...cita,
      [e.target.name]: e.target.value
    })
  }

  // 3 - destructurar para extraer valores...
  /* agregamos los campos value con estos nombers en los inputs,
  nos permitirá en el futuro " recetear los formularios " */
  const { mascota, propietario, fecha, hora, sintomas } = cita;

  // 4 - crear el evento onsubmit
  const submitCita = (e) => {

    e.preventDefault(); /* previniendo la accion de enviar y recarga */

    // validar
    if (mascota.trim() === '' || propietario.trim() === '' || fecha.trim() === '' ||
      hora.trim() === '' || sintomas.trim() === '') {

      return actualizaError(true)
    }

    /* Modifico el estado del hook error por si el caso es true,
    para que se quite el carteld de error*/
    actualizaError(false)

    // asignar ID, ya que no tiene base de datos
    cita.id = uuidv4()

    // crear cita
    crearCita(cita);

    // reiniciar form
    actualizarCita({
      mascota: '',
      propietario: '',
      fecha: '',
      hora: '',
      sintomas: ''
    })

  }

  return (
    <Fragment>
      <h2>Crear Cita</h2>

      {error ? /* agregamos un ternario de error, si es true agrega mensaje, sino es NULL */
        <p className="alerta-error">
          Todos los campos son obligatorios
        </p>
        :
        null
      }

      <form
        onSubmit={submitCita}
      >

        <label>Nombre Mascota</label>
        <input
          type="text"
          name="mascota"
          className="u-full-width"
          placeholder="Nombre Mascota"
          onChange={actualizarState}
          value={mascota}
        />

        <label>Nombre del Dueño</label>
        <input
          type="text"
          name="propietario"
          className="u-full-width"
          placeholder="Nombre del Dueño"
          onChange={actualizarState}
          value={propietario}
        />

        <label>Fecha</label>
        <input
          type="date"
          name="fecha"
          className="u-full-width"
          onChange={actualizarState}
          value={fecha}
        />
        <label>Hora</label>
        <input
          type="time"
          name="hora"
          className="u-full-width"
          onChange={actualizarState}
          value={hora}
        />

        <label>Sintomas</label>
        <textarea
          className="u-full-width"
          name="sintomas"
          onChange={actualizarState}
          value={sintomas}
        ></textarea>

        <button
          type="submit"
          className="u-full-width button-primary"
        >
          Agregar Cita
        </button>

      </form>

    </Fragment>
  )
}




Formulario.propTypes = {

  crearCita: PropTypes.func.isRequired

}

export default Formulario;
