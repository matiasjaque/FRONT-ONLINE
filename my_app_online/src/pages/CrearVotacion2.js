import React, { useEffect, useState} from 'react'


import MyNavbar from '../componts/MyNavbar';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import '../styles/CrearVotacion2.css';

import axios from 'axios';
import Cookies from 'universal-cookie';
import Swal from 'sweetalert2';
const serverUrl = process.env.REACT_APP_SERVER;

const conectado = new Cookies();


var idUsuario = conectado.get('id'); 



const CrearVotacion2 = () => {

const [idVotacion, setIdVotacion] = useState(0);
const [idPregInsert, setIdPregInsert] = useState(0)
const [tituloVotacion, setTituloVotacion] = useState('');
const [preguntaVotacion, setPreguntaVotacion] = useState('');

// funciones que necesito cargar en cada render
useEffect(() => {
    actualizarIdVotacion();
    actualizarIdPreguntas();
  },[]);


const actualizarIdVotacion = async () =>{
    await axios.get(serverUrl + "/votaciones", {params:{idUsuario: idUsuario}})
      .then(response=>{
        setIdVotacion(response.data[response.data.length - 1].id_votacion)
        //setLoading(true);
        //console.log("trae esto getVotaciones:");
        //console.log(response.data[response.data.length - 1].id_votacion);
    })
    .catch (error=> {
      setIdVotacion(0)
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.response.data.message,
      })
    })
};

const actualizarIdPreguntas = async () =>{
    await axios.get(serverUrl + "/preguntasGetGlobal")
      .then(response=>{
        
        setIdPregInsert(response.data[response.data.length - 1].ID_PREGUNTA)
        //setLoading(true);
        //console.log("trae esto getPreguntas:");
        //console.log(response.data[response.data.length - 1].ID_PREGUNTA);
    })
    .catch (error=> {
      setIdVotacion(0)
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.response.data.message,
      })
    })
};


const volverHome = () =>{
    window.location.replace('/paginaPrincipal')
}

const crearVotacion2 = () => {
    
    if(tituloVotacion !== '' && preguntaVotacion !== '') {
        console.log(tituloVotacion, preguntaVotacion);
        createVotacion()
        createPregunta()
        Swal.fire({title: 'Votaci??n creada con ??xito',
        icon: "success", timer: "2000"})
        setTimeout(function () {   
            //window.location.reload()
            window.location.replace('paginaPrincipal');          
        }, 2000);
    }
    else{
        alert('Debe asegurarse de ingresar un titulo y pregunta para la nueva votaci??n')
    }
}

const createVotacion = async () =>{
    var idVot = idVotacion + 1;
    var estado = 2;
    console.log(idUsuario, tituloVotacion, idVot)
    await axios({
      method: 'post',
      url:serverUrl + "/votacionCreate", 
      headers: {'Content-Type': 'application/json'},
      params:
      {
        idUsuario: idUsuario,
        titulo: tituloVotacion,
        idVotacion: idVot,
        estado: estado,
        tipo: 'especial',
      }
    }).then(response=>{
      console.log("Funciona create votacion con id de votacion: ");
      console.log(response);
      //setIdVotacion(response.data.insertId);
    })
    .catch(error=>{
            alert(error.response.data.message);
            console.log(error);
        })
};

const createPregunta = async () =>{
    let idVot = idVotacion + 1;

    let idPreguntaInsert = idPregInsert

    idPreguntaInsert++;

    console.log('idPregunta: ' )
    console.log(idPreguntaInsert);

    console.log('idVot: ' )
    console.log(idVot);
    await axios({
      method: 'post',
      url:serverUrl + "/preguntaCreate",
      headers: {'Content-Type': 'application/json'},
      params:
      {
        idVotacion: idVot,
        titulo: preguntaVotacion,
        idPregunta: idPreguntaInsert,
      }
    }).then(response=>{
      console.log("Funciona create pregunta ");
    })
    .catch(error=>{
            alert(error.response.data.message);
            console.log(error);
        })
};

  return (
    <div id='contenedorPrincipalMisVotaciones2'>
        <MyNavbar activeKey='/crearVotacion'/>
        <div id='contenedorSecundarioMisVotaciones2'>
          <div id='contenedorCrearVotacion2'>
            <Row className='filasCrearVot2' id='filaTitulo'>
              <Col lg={12} md={12} sm={12} className='columnasVot2'>
                <h1 id='tituloVotacion2'>              
                  Para crear una nueva votaci??n especial ingrese los siguientes datos por favor
                </h1>
              </Col>
            </Row>

            <Row className='filasCrearVot2' id='filaTituloVot'>
              <Col lg={12} md={12} sm={12} className='columnasVot2'>
                <Form.Label className="titulosForm2">T??TULO DE LA NUEVA VOTACI??N</Form.Label>
                <Form.Control className="textosForm2"
                    type="text"
                    placeholder="Ingrese el t??tulo de la votaci??n"
                    value={tituloVotacion}
                    onChange={(e) => setTituloVotacion(e.target.value)}
                /> 
              </Col>
            </Row>

            <Row className='filasCrearVot2' id='filaTituloPreg'>
                <Col lg={12} md={12} sm={12} className='columnasVot2'>
                    <Form.Label className="titulosForm2">T??TULO DE LA PREGUNTA</Form.Label>
                    <Form.Control className="textosForm2"
                        type="text"
                        placeholder="Ingrese la pregunta de la votaci??n"
                        value={preguntaVotacion}
                        onChange={(e) => setPreguntaVotacion(e.target.value)}
                    /> 
                </Col>
            </Row>

            <Row className='filasCrearVot2' id='filavot2Botones'>
              <Col lg={12} md={12} sm={12} className='columnasVot2'>
                <div id='contenedorBotonesVot2'>
                    <Button  className='boton2' onClick={volverHome}>Cancelar</Button>
                    <Button className='boton2' onClick={crearVotacion2}>Crear votaci??n</Button>
                </div>
              </Col>
            </Row>
            
            
                
          </div>
          
        </div>
          
      </div>
  )
}
  

export default CrearVotacion2