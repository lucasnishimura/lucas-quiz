import * as React from 'react';
import { useRef, useState } from 'react';
import './App.css';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import api from './connection';

export default function Treasure() {
	const navigate = useNavigate();

	const inputRef = useRef(null);
	const inputRefTwo = useRef(null);
	const inputRefThree = useRef(null);
	const inputRefFour = useRef(null);
	const inputRefFive = useRef(null);

	const [values, setValues] = useState();

	// const handleChange = (event) => {
	const checkPress = (event, jumpRef) => {
		setValues({
			...values,
			[event.target.name]: event.target.value
		});

		jumpRef.current.focus();
	}

	const cleanUp = () => {
		// console.log('oi',values)
		setValues()
		inputRef.current.value = ""
		inputRefTwo.current.value = ""
		inputRefThree.current.value = ""
		inputRefFour.current.value = ""
		inputRefFive.current.value = ""
	}

	async function submitForm() {
		const response = await api.post('/complete');
		return response
	}

	const submitAnswer = () => {
		if (!values) {
			Swal.fire({
				icon: "error",
				title: "Oops...",
				text: "Digite alguma senha",
			});
		}

		if (values?.field1 && values?.field2 && values?.field3 && values?.field4 && values?.field5) {
			const concat = values.field1 + values.field2 + values.field3 + values.field4 + values.field5
			if (concat.toLowerCase() !== 'verde') {
				Swal.fire({
					icon: "error",
					title: "Oops...",
					text: "Senha errada",
				});
				cleanUp();
				return false;
			} else {
				submitForm().then((response) => {
					let resgatado = response.data.resgatado
					Swal.fire({
						icon: "question",
						title: "Você achou a senha!!!",
						text: "Mas será que foi o primeiro?",
						confirmButtonText: "Conferir"
					}).then((result) => {
						if (result.isConfirmed && resgatado) {
							navigate("/sucrilhos");
						}else if(result.isConfirmed && !resgatado){
							navigate("/beterraba");
						}
					})
				})
			}
		}
	}



	return (
		<>
			<div className="main-tesouro mt-20">
				<h3>Você encontrou o caça ao tesouro! Siga as pistas para ganhar a recompensa</h3>
				<br /><br />
				<b>REGRAS/DICAS:</b><br /><br />
				- Para conseguir o tesouro, é preciso acertar a senha, acertou a senha, achou o tesouro<br />
				- O tesouro é somente para a primeira pessoa que adivinhar a senha<br />
				- Cada dica que você achar te levará a outra dica<br />
				- A cada dica que encontrar, deixe-a examente no lugar que encontrou para que outras pessoas possam participar também.<br />
				- Tire uma foto de cada dica que encontrar, assim ficará mais fácil para juntar tudo no final<br />
				- Nessa página você terá a dica inicial<br />
				- A senha é uma palavra legível, após achar tudo, você irá precisar descriptografar
				<br /><br /><br /><br /><br /><br />
				Dica Inicial: <i><b>"O passado projeta o futuro"</b></i>
				<br /><br /><br /><br />
				Senha:
				<div className="password-field">
					<input className="password" name="field1" ref={inputRef} maxLength="1" onChange={(e) => checkPress(e, inputRefTwo)} />
					<input className="password" name="field2" ref={inputRefTwo} maxLength="1" onChange={(e) => checkPress(e, inputRefThree)} />
					<input className="password" name="field3" ref={inputRefThree} maxLength="1" onChange={(e) => checkPress(e, inputRefFour)} />
					<input className="password" name="field4" ref={inputRefFour} maxLength="1" onChange={(e) => checkPress(e, inputRefFive)} />
					<input className="password" name="field5" ref={inputRefFive} maxLength="1" onChange={(e) => checkPress(e, inputRefFive)} />
				</div><br></br>
				<div className="password-field-icon">
					<input className="password-icon" disabled="true" value="⌀" />
					<input className="password-icon" disabled="true" value="★" />
					<input className="password-icon" disabled="true" value="⎅" />
					<input className="password-icon" disabled="true" value="⍡" />
					<input className="password-icon" disabled="true" value="♦︎" />
				</div><br></br><br /><br />
				<div className="password-field">
					<button className="button-tesouro send" onClick={submitAnswer} value="Caça ao tesouro">Abrir Tesouro</button>
				</div>
			</div>
		</>
	);
}
