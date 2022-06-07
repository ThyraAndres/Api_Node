const express = require('express');
const router = express.Router();

const mysqlConnection  = require('../databa.js');

// Get el cual Consigue todos los empleados
router.get('/', (req, res) => {
  mysqlConnection.query('SELECT * FROM menu', (err, rows, fields) => {
    if(!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });  
});



// GET 1 solo empleado
router.get('/:id', (req, res) => {
    const { id } = req.params; 
    mysqlConnection.query('SELECT * FROM menu WHERE id = ?', [id], (err, rows, fields) => {
      if (!err) {
        res.json(rows[0]);
      } else {
        console.log(err);
      }
    });
  });
  
  // DELETE 1 solo empleado
  router.delete('/:id', (req, res) => {
    const { id } = req.params;
    mysqlConnection.query('DELETE FROM menu WHERE id = ?', [id], (err, rows, fields) => {
      if(!err) {
        res.json({status: 'menu Deleted'});
      } else {
        console.log(err);
      }
    });
  });
  
  // INSERT empleado
  router.post('/', (req, res) => {
    const {id, nombre, costo, iva} = req.body;
    console.log(id, nombre, costo, iva);
    const query = `
      SET @id = ?;
      SET @nombre = ?;
      SET @costo = ?;
      SET @iva = ?;
      CALL menuAddOrEdit(@id, @name, @costo, @iva);
    `;
    mysqlConnection.query(query, [id, nombre, costo,iva], (err, rows, fields) => {
      if(!err) {
        res.json({status: 'menu Saved'});
      } else {
        console.log(err);
      }
    });
  
  });
  
  router.put('/:id', (req, res) => {
    const { name, costo } = req.body;
    const { id } = req.params;
    const query = `
        SET @id = ?;
        SET @nombre = ?;
        SET @costo = ?;
        SET @iva = ?;
      CALL menuAddOrEdit(@id, @name, @costo, @iva);`;
    mysqlConnection.query(query, [id, nombre, costo, iva], (err, rows, fields) => {
      if(!err) {
        res.json({status: 'menu Updated'});
      } else {
        console.log(err);
      }
    });
  });

module.exports = router;
