import { Router, Request, Response } from 'express';
import { User } from '../models/user.js';
import jwt from 'jsonwebtoken'

export const login = async (req: Request, res: Response) => {

  try {
    console.log('login req', req)
    const { username, password } = req.body;
    console.log('login receives', req.body)
    console.log('params', username, ',', password)
    const lookup: User | null = await User.findOne({
      where: {
        username
      }
    })
    console.log('got user: ', lookup)
    if (!lookup) {
      console.log('user not found')
      throw({message: "Username is not valid"})
    }
    if (!lookup.matchPassword(password)){
      console.log('password does not match')
      throw({message: "Password is not valid"})
    }
    const secretKey = process.env.JWT_SECRET_KEY || '';

    console.log('getting token')
    const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' });

    console.log('got token: ', token)
  
    res.json({ token: token });
  } catch (e) {
    console.log('caught error', e)
    res.status(500).json(e);
  }
};

const router = Router();

// POST /login - Login a user
router.post('/login', login);

export default router;
