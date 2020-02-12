import express from 'express';
import { createHash } from '../utils/poseidonHash';

const router = express.Router();

BigInt.prototype.toJSON = function() { return this.toString(); };

router.post('/', async (req, res, next) => {
    const { t, nRoundsF, nRoundsP, seed, element } = req.body;
    try {
        let hash = await createHash(t, nRoundsF, nRoundsP, seed);
        let result = await hash(element);
        result = JSON.stringify(result)
        res.send(result)        
    } catch (err) {
        return next(err);
    }
});

export default router;
