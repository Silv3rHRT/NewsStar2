import express, { Request, Response} from 'express';
import dotenv from 'dotenv';
import axios from 'axios';
import { authenticateToken } from '../../middleware/auth.js';
import { Search } from '../../models/search.js';
import { User } from '../../models/user.js';

const router = express.Router();
dotenv.config();

//This API will make requests based on the users search inputs 

router.get('/history', authenticateToken, async (req: Request, res: Response) => {
    try {
        const user = await User.findOne({where:{username: (req as any).user.username}})
        const history = await Search.findAll({
            where: { user_id: user!.id }
        })
        res.status(200).json({history})

    } catch(err) {
        res.status(500).json({err})
    }
})

router.post('/', authenticateToken, async (req: Request, res: Response) => {
    try {
        const { from, to, sortBy, sources, q } = req.body; 

        const API_KEY = process.env.API_KEY;
        const baseUrl = `https://newsapi.org/v2/everything?apiKey=${API_KEY}`

        const params: { [key: string]: string } = {}; //creating an object with a key of string and values of string
        
        // Conditionally add parameters if they are provided
        if (q) params.q = q; // Required parameter
        if (from) params.from = from; // Optional parameter
        if (to) params.to = to; // Optional parameter
        if (sortBy) params.sortBy = sortBy; // Optional parameter
        if (sources) params.sources = sources; // Optional parameter


        // Make the request to the News API
        const url = `${baseUrl}&${new URLSearchParams(params).toString()}`;
        console.log('search: requesting', url)
        const response = await axios.get(url);
        console.log('search: got response', response)
        
        const user = await User.findOne({where:{username: (req as any).user.username}})
        // Save the search to the database
        const search = await Search.create({
            user_id: user!.id,
            searchterm: q,
            sortBy: sortBy,
            sources: sources,
            from: from,
            to: to
        });
        console.log('search: saved search to database', search);
        res.status(200).json(response.data); // Return the response data

    } catch (error) {
        console.log('search: caught error:', error)
        res.status(404).json({error: `No News Found Matching Your Search Terms Please Try Again: ${error}`})
    }
})



export default router;