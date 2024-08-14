import * as React from 'react';
import api from './connection';
import './App.css';
import { useEffect, useState } from 'react';

export default function Sucrilhos() {
	const [message, setMessage] = useState()
	let messageFirst = <><h1>Parabéns! Você foi o primeiro!</h1><br/><h3>Mostre essa tela para o aniversariante para resgatar o seu prêmio</h3></>;
	let messageSecond = <><h1>Puxa! Infelizmente não foi rápido o bastante</h1><br/><h3>Mas parabéns por ter conseguido resolver, não estava tão óbvio</h3></>;

// 	async function getScore(){
// 		const response = await api.get('/complete');
// 		return response.data
// 	}

// 	async function submitForm() {
// 		const response = await api.put('/complete');
// 		return response
// 	}

// 	useEffect(() => {
// 		getScore().then((result) => {
// 			console.log(result[0].resgatado)
// 			if(result[0].resgatado){
// 				setMessage(messageSecond)
// 			}else{
// 				setMessage(messageFirst)
// 			}
// 			submitForm()
// 		});
//  }, []);

  return (
    <>
      <div className="main">
        <div className="mt-20">
            <h1>Parabéns! Você foi o primeiro!</h1><br/><h3>Mostre essa tela para o aniversariante para resgatar o seu prêmio.</h3><br/><h5>Mas seja rápido! Antes que outra pessoa descubra</h5>
          <br/><br/>
        </div>
      </div>
    </>
  );
}
