import * as React from 'react';
import api from './connection';
import './App.css';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

async function getScore(){
  const response = await api.get('/quiz');
  return response.data
}

const values = await getScore();

export default function Score() {
  // const [values, setValues] = useState()

  // useEffect(() => {
  //   async function getScore(){
  //     const response = await api.get('/quiz');
  //     return response
  //   }

  //   getScore().then(response => {
  //     setValues(response.data)
  //   })
  // }, []);


  return (
    <>
      <div className="banner">
        {/* <img className="banner" src={banner} /> */}
      </div>
      <div className="main mt-20">
        <a href="/treasure" target="_blank"><button className="button-tesouro" value="Caça ao tesouro">CAÇA AO TESOURO 👀 💰</button></a>
      </div>
      <div className="main">
        <div className="mt-20">
          CLASSIFICAÇÃO GERAL <br/><br/>

          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 300 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Nome</TableCell>
                  <TableCell align="right">Pontos</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {values.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="right">{row.grade}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </>
  );
}