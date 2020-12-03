var express = require('express');
var router = express.Router();
const pgp = require('pg-promise')();
const connection = `postgres://postgres:zxc123**@localhost:5432/postgres`;
const db = pgp(connection);

/* About Covid-19 APIs */
router.get('/', (req, res, next) => {
  res.send('Covid-19 APIs version 1.0');
});

// 1. Get all confirmed
router.get('/confirmed', async (req, res, next) => {

    // Get total confirmed from database
    const result = await db.any(`select SUM(cc."3/23/2020"::INTEGER) as total from covid_confirm cc`);
    res.json(result[0]);
});

router.get('/confirmed/:id', async (req, res, next) => {

    const countryId = req.params.id;
    // Get total confirmed from database
    const result = await db.any(`select SUM(cc."3/23/2020"::INTEGER) as total from covid_confirm cc where cc.id = $1`, countryId);
    res.json(result[0]);
});


module.exports = router;
