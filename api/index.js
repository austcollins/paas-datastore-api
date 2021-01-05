'use strict';

// Checks if an object is empty
function isEmptyObject(obj) {
    return !Object.keys(obj).length;
  }

const express = require('express');
const bodyParser = require('body-parser');

// get the database model, use `export DBTYPE=inmemory` to use the in-memory model
const db = require(`./db-datastore.js`);

const api = express.Router();

// TODO: Delete this
api.get('/', async (req, res) => {
  try {
    res.json(await db.list());
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
});


/**
 * GET - Read the value of the named register
 * 
 */
api.get('/:id(\\w+)', async (req, res) => {
  try {
    const value = await db.get(req.params.id)
    if (isEmptyObject(await value)) {res.send('0')}
    res.send(value);
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
});

/**
 * PUT - set a named register to a given number
 */
api.put('/:id(\\w+)', bodyParser.text(), async (req, res) => {
  try {
    await db.put(req.params.id, req.body);
    res.sendStatus(204);
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
});

/**
 * POST - add a number to a named register
 */
api.post('/:id(\\w+)', bodyParser.text(), async (req, res) => {
    // set value to posted value
    var value = req.body;
    // try to get the current value from the database
    try {
        value += await db.get(req.params.id)
    } catch (e) {
      // didn't exist -- do nothing
    }
    // post the new value
    try {
        await db.put(req.params.id, req.body);
        // return the value posted to the db
        res.send(value);
    } catch (e) {
      console.error(e);
      res.sendStatus(500);
    }
});

/**
 * DELETE - drop a named register
 */
api.delete('/:id(\\w+)', bodyParser.text(), async (req, res) => {
    try {
        await db.put(req.params.id, req.body);
        res.sendStatus(204);
    } catch (e) {
        console.error(e);
        res.sendStatus(500);
    }
});


module.exports = api;