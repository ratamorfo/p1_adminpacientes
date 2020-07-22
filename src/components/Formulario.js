import React, { Fragment, useState } from 'react';
import uuid from 'uuid/dist/v4';
import PropTypes from 'prop-types';

const Formulario = ({ crearCita }) => {
	// Crear state de citas
	const [ cita, actualizarCita ] = useState({
		mascota: '',
		propietario: '',
		fecha: '',
		hora: '',
		sintomas: ''
	});

	const [ error, actualizarError ] = useState(false);

	// Función actualizar state al digitar en un campo del formulario
	// En la docu dice que debe ser handleState
	const actualizarState = (e) => {
		actualizarCita({
			...cita,
			[e.target.name]: e.target.value
		});
	};

	// Extraer valores de la cita
	const { mascota, propietario, fecha, hora, sintomas } = cita;

	// Agregar cita
	const submitCita = (e) => {
		e.preventDefault();
		console.log('..enviando');

		// Validar
		if (
			mascota.trim() === '' ||
			propietario.trim() === '' ||
			fecha.trim() === '' ||
			hora.trim() === '' ||
			sintomas.trim() === ''
		) {
			actualizarError(true);
			return;
		}

		actualizarError(false);

		// Asignar ID
		cita.id = uuid();

		// Crear Cita
		crearCita(cita);

		//Reiniciar el form
		actualizarCita({
			mascota: '',
			propietario: '',
			fecha: '',
			hora: '',
			sintomas: ''
		});
	};

	return (
		<Fragment>
			<h2>Crear Cita</h2>
			{
				error ? <p className="alerta-error">Todos los campos son obligatorios</p> :
				null}
			<form onSubmit={submitCita}>
				<label>Nombre Mascota</label>
				<input
					type="text"
					name="mascota"
					className="u-full-width"
					placeholder="Nombre de la Mascota"
					onChange={actualizarState}
					value={mascota}
				/>
				<label>Nombre Dueño</label>
				<input
					type="text"
					name="propietario"
					className="u-full-width"
					placeholder="Nombre del Dueño"
					onChange={actualizarState}
					value={propietario}
				/>
				<label>Fecha</label>
				<input type="date" name="fecha" className="u-full-width" onChange={actualizarState} value={fecha} />
				<label>Hora</label>
				<input type="time" name="hora" className="u-full-width" onChange={actualizarState} value={hora} />
				<label>Sintomas</label>
				<textarea className="u-full-width" name="sintomas" onChange={actualizarState} value={sintomas} />
				<button className="u-full-width button-primary" type="submit" name="submit">
					Agregar Cita
				</button>
			</form>
		</Fragment>
	);
};

Formulario.propTypes = {
	crearCita: PropTypes.func.isRequired
};

export default Formulario;
