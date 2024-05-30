import * as React from 'react';
import { useState } from 'react';
import QuestionComponent from './QuestionComponent';
import TextField from '@mui/material/TextField';
import './App.css';
import Button from '@mui/material/Button';
import api from './connection';
import Swal from 'sweetalert2'

export default function Home() {

  const questions = [
    {
      question: "Qual meu time do coração?",
      options: ["Palmeiras", "Corinthians", "São Paulo", "Santos"]
    },
    {
      question: "Qual minha cor predileta?",
      options: ["Azul", "Verde", "Vermelho", "Preto"]
    },
    {
      question: "Qual meu maior medo?",
      options: ["Umbigos", "Palhaço", "Galinha", "Bexiga"]
    },
    {
      question: "Qual desses eu NÃO gosto?",
      options: ["Animes", "Futebol", "Academia", "Fórmula 1"]
    },
    {
      question: "O que eu prefiro?",
      options: ["Calor", "Frio"]
    },
    {
      question: "O que eu prefiro?",
      options: ["Praia", "Campo"]
    },
    {
      question: "O que eu prefiro?",
      options: ["Doce", "Salgado"]
    },
    {
      question: "Quanto eu calço?",
      options: ["44", "45", "46", "47"]
    },
    {
      question: "Qual meu time EUROPEU do coração?",
      options: ["Real Madrid", "Barcelona", "PSG", "Chelsea"]
    },
    {
      question: "No que eu sou formado?",
      options: ["TI - Redes", "Sistemas da Informação", "Análise de Sistemas", "Sistemas para Internet"]
    },
  ]

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };


  const handleRadio = (event) => {
    const result = getValueIndex(event.target.value) 
    answers[result.key] = result.value
  };

  function getValueIndex(value){
    const values = value.split('|');
    const response= {
      value: values[0],
      key: values[1]
    }
    return response;
  }

  const [values, setValues] = useState({name: ''})
  const [answers, setAnswers] = useState([])

  async function submitForm(body){
    const response = await api.post('/quiz', body);
    console.log(response)
    return response
  }

  const submitQuiz = (event) => {
    if(values.name == ''){
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Parece que você esqueceu de deixar seu nome",
      });
      return false;
    }
    
    const body = {
      name: values.name,
      guestAnswers: answers
    }

    Swal.fire({
      title: "Tem certeza das suas respostas?",
      showCancelButton: true,
      confirmButtonText: "Sim, tenho",
      cancelButtonText: "Não, quero revisar",
      denyButtonText: `Don't save`
    }).then((result) => {
      if (result.isConfirmed) {
        submitForm(body).then(response => {
          const finalGrade = response.data.grade;
          if(finalGrade == 10){
            Swal.fire({
              title: "Parabéns!",
              html: `Você acertou tudo! Se essa foi sua primeira tentativa, vá reivindicar seu prêmio! <br><br> Veja a classificação geral <a href="/score" target="_blank">aqui</a>`,
              icon: "success"
            }).then((result) => {
              if (result.isConfirmed) {
                window.location.reload();
              }
            })
          }
          
          else if(finalGrade == 9 || finalGrade == 8 || finalGrade == 7){
            Swal.fire({
              title: "NA TRAAAAVE!!",
              html: `Você acertou QUASE tudo! Se essa foi sua primeira tentativa, você merece uma lembrancinha pela desempenho <br><br> Veja a classificação geral <a href="/score" target="_blank">aqui</a>`,
              icon: "success"
            }).then((result) => {
              if (result.isConfirmed) {
                window.location.reload();
              }
            })
          }
          
          else if(finalGrade == 6 || finalGrade == 5 || finalGrade == 4){
            Swal.fire({
              title: "Nada mal!",
              html: `Pelo nível de dificuldade do quiz você mandou muito bem! <br><br> Veja a classificação geral <a href="/score" target="_blank">aqui</a>`,
              icon: "info"
            }).then((result) => {
              if (result.isConfirmed) {
                window.location.reload();
              }
            })
          }
          
          else if(finalGrade == 3 || finalGrade == 2 || finalGrade == 1){
            Swal.fire({
              title: "Errrrroooou!",
              html: `Realmente tava bem difícil né? Que tal aproveitar a oportunidade para me conhecer um pouco melhor? <br><br> Veja a classificação geral <a href="/score" target="_blank">aqui</a>`,
              icon: "question"
            }).then((result) => {
              if (result.isConfirmed) {
                window.location.reload();
              }
            })
          }
        })
      }
    });


  }

  return (
    <>
      <div className="banner">
        {/* <img className="banner" src={banner} /> */}
      </div>
      <div className="main">
        <div className="mt-20">
          <TextField
              required
              id="name"
              name="name"
              label="Nome completo"
              className="nome-completo"
              onChange={handleChange}
            />
        </div>
        {questions.map((element, key) => (
            <QuestionComponent pergunta={element.question} answers={element.options} index={key} handleRadio={handleRadio} />
        ))}
      </div>
      <div className="submit-form">
        <Button onClick={submitQuiz}  variant="contained">Enviar</Button>
      </div>
    </>
  );
}