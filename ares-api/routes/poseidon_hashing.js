const express = require('express');
//const {createHash} = require('../utils/poseidonHash.js')

const router = require(express.Router());

router.post('/', async (req, res, next) => {
    const { t, nRoundsF, nRoundsP, seed, element } = req.body;
    try {
        let hash = await createHash(t, nRoundsF, nRoundsP, seed)
        let result = await hash([element])
        return result
    } catch (err) {
        return next(err);
    }
});

module.exports = router;