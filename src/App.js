import React, { Fragment,  useState, useEffect } from 'react';
import Formulario from './components/Formulario';
import Cita from './components/Cita';


const App = () => {

  //Citas en Local Storage
  let citasInicio = JSON.parse(localStorage.getItem('citas'))
  if (!citasInicio) {
    citasInicio = []
  }

  // Array de citas
  const [ citas, guardarCitas ] = useState(citasInicio)

  // useEffect para realizar ciertas operaciones cuando el estate cambia
  useEffect(() => {

    if (citasInicio) {
      localStorage.setItem('citas', JSON.stringify(citas))
    } else {
      localStorage.setItem('citas', JSON.stringify([]))
    }

  }, [citas, citasInicio]/*esta pendiente del estado de citas*/);



  // Funcion que tome las citas actuales y agregue la nueva
  const crearCita = cita => {

    guardarCitas([
      ...citas, /*agregamos el anterior estado*/
      cita /* llega desde el formulario */
    ])
  }

  // Funcion que elimina una cita usando su id
  const eliminarCita = id => {
    const quitaCitas = citas.filter(cita => cita.id !== id);
    guardarCitas(quitaCitas);
  }

  // Mensaje condicional en caso que no haya citas
  const tituloCitas = citas.length === 0 ? ('No hay citas') : ('Administra tus citas');



  return (
    <Fragment>
      <h1>pacientes de veterinaria</h1>

      <div className="container">
        <div className="row">
          <div className="one-half column">
            <Formulario
            crearCita={ crearCita }
            />
          </div>
          <div className="one-half column">
            <h2>{tituloCitas}</h2>
            {citas.map( cita => (
              <Cita
                key={ cita.id }
                cita={ cita }
                eliminarCita={ eliminarCita }
              />
              ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
}





export default App;
