import React, { Fragment,useState,useEffect, useContext } from 'react'
import editIcono from '../../iconos/editar.png'
import deleteIcono from '../../iconos/basurero.png'
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'
import {CRMContext} from '../../context/CRMcontext'
import clienteAxios from '../../config/axios'

function ListaTipo(props)
{

      const [auth,guardar]=useContext(CRMContext);
      const [tipos,guardarTipos]=useState([])

      
      
      useEffect(() => {
       /*variable  de tipos que ahi que eliminar
        let types=[
          {_id:1,tipo:'Sueño',color:'#bc1515'},
          {_id:2,tipo:'Hotel',color:'#30911d'},
          {_id:3,tipo:'Programar',color:'#bc1515'},
          {_id:4,tipo:'Leer',color:'#30911d'},
          {_id:5,tipo:'Personal',color:'#bc1515'},
          {_id:6,tipo:'Fitness',color:'#30911d'},
        ]*/
  
            //Consulta a la bd para  lista la tabla 
         const consultarApi=async()=>{
           try {
             const dataConsulta=await clienteAxios.get(`/tipos/${auth.token}`)
             guardarTipos(dataConsulta.data);
           } catch (error) {
              
            Swal.fire (
              'Error!','problema al listar los datos','error'
             )

                

           } 
          }

          
          consultarApi();


      }, [])


      
      const eliminarRegistro = idTip => {
        Swal.fire({
            title: '¿Estas seguro?',
            text: "Un registro  eliminado no se puede recuperar",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar!',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.value) {
                // Llamado a axios
                clienteAxios.delete(`/eliminartipo/${idTip}`)
                    .then(res => {
                        Swal.fire(  
                            'Eliminado', 
                            res.data.mensaje, 
                            'success'
                        );
                    });
                    
            }
        });
    };
    




return(
<Fragment>
  

    <div className="container">
      <div className="row">    
    <table>
    <thead>
      <tr>
          <th>Tipo</th>
          <th>Color</th>
          <th>Editar</th>
          <th>Borrar</th>
      </tr>
    </thead>

    <tbody>
      

      {tipos.map(t=>(
      
        <tr>
        <td>{t.tipo}</td>
        <td><div style={{backgroundColor:t.color,height:25,width:25}}></div></td>
        <td>
        <Link  to={`/editartipo/${t._id}`}> 
            <img src ={editIcono} height="25" width="25" alt=""/>
            </Link>
            </td>
        <td>
        <button onClick={()=>eliminarRegistro(t._id)} > 
                <img src ={deleteIcono} height="25" width="25" alt=""/>
                </button>

        </td>

      </tr>
      ))}
     
    </tbody>
  </table>
   </div>
   </div>
   </Fragment>
)

}

export default ListaTipo