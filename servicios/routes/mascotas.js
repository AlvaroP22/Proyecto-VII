const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const auth = require('../middleware/auth');

// GET all
router.get('/', auth, async (req,res)=>{

  try{
  
   const { talla, edad, status } = req.query;
  
   let query = 'SELECT * FROM mascotas WHERE 1=1';
   let params = [];
   let i = 1;
  
   if(talla){
     query += ` AND talla = $${i}`;
     params.push(talla);
     i++;
   }
  
   if(edad){
     query += ` AND edad = $${i}`;
     params.push(edad);
     i++;
   }
  
   if(status){
     query += ` AND status = $${i}`;
     params.push(status);
     i++;
   }
  
   const result = await pool.query(query, params);
  
   res.json(result.rows);
  
  }catch(err){
   res.status(500).json({
     error: err.message
  });
  }
  
  });

// GET by id
router.get('/:id', async(req,res)=>{

  try{
  
   const {id} = req.params;
  
   const result = await pool.query(
     'SELECT * FROM mascotas WHERE id=$1',
     [id]
   );
  
   if(!result.rows.length){
     return res.status(404).json({
        error:'Mascota no encontrada'
     });
   }
  
   res.json(result.rows[0]);
  
  }catch(err){
   res.status(500).json({
    error:err.message
   });
  }
  
  });

// POST
router.post('/', auth, async(req,res)=>{

  try{
  
   const {
    foto,
    nombre,
    sexo,
    talla,
    edad,
    estado_salud,
    descripcion,
    status
   } = req.body;
  
   const result = await pool.query(
   `
   INSERT INTO mascotas
   (foto,nombre,sexo,talla,edad,estado_salud,descripcion,status)
  
   VALUES($1,$2,$3,$4,$5,$6,$7,$8)
  
   RETURNING *
   `,
   [
    foto,
    nombre,
    sexo,
    talla,
    edad,
    estado_salud,
    descripcion,
    status
   ]
   );
  
   res.status(201).json(
     result.rows[0]
   );
  
  }catch(err){
    console.error(err);
    res.status(500).json({
      error: err.message,
      detail: err.detail
    });
   }
  
  });

// PUT
router.put('/:id', auth, async(req,res)=>{

  try{
  
   const { id } = req.params;
  
   const {
    foto,
    nombre,
    sexo,
    talla,
    edad,
    estado_salud,
    descripcion,
    status
   } = req.body;
  
   await pool.query(
   `
   UPDATE mascotas
   SET
    foto=$1,
    nombre=$2,
    sexo=$3,
    talla=$4,
    edad=$5,
    estado_salud=$6,
    descripcion=$7,
    status=$8
   WHERE id=$9
   `,
   [
    foto,
    nombre,
    sexo,
    talla,
    edad,
    estado_salud,
    descripcion,
    status,
    id
   ]
   );
  
   res.json({
    mensaje:'Mascota actualizada'
   });
  
  }catch(err){
   res.status(500).json({
    error:err.message
   });
  }
  
  });

// DELETE
router.delete('/:id', auth, async(req,res)=>{

  try{
  
   await pool.query(
     'DELETE FROM mascotas WHERE id=$1',
     [req.params.id]
   );
  
   res.json({
    mensaje:'Mascota eliminada'
   });
  
  }catch(err){
   res.status(500).json({
     error:err.message
   });
  }
  
  });

module.exports = router;
