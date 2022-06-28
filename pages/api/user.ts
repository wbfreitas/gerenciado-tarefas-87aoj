import type {NextApiRequest, NextApiResponse} from 'next';
import { DefaultMsgResponse } from '../../types/DefaultMsgResponse';

import {UserModel} from '../../models/UserModel';
import { connect } from '../../middlewares/connectToMongoDB';

const registerEndPoint = async (req: NextApiRequest, res: NextApiResponse<DefaultMsgResponse>) => {
    try {
       if(req.method === 'POST') {
            const {name, email, password} = req.body;

            if(!name || name.trim().length < 2) {
                return res.status(400).json({error: 'Nome não é valido'});
            }

            if(!email || email.trim().length < 5 || (!email.includes('@') || !email.includes('.'))  ) {
                return res.status(400).json({error: 'Email não é valido'});
            }

            if(!name || name.trim().length < 6) {
                return res.status(400).json({error: 'senha com 6 caracteres'});
            }

            const user = {
                name, email, password
            }

           await UserModel.create(user);

           return res.status(200).json({msg: 'deu bom!'});
       }

       return res.status(405).json({error: 'metodo informado nao existe.'});
    } catch (error) {
        console.log('error on create user', error );
        return res.status(500).json({error: 'nao foi possivel cadastrar o usuario, entre em contanto com o '}); 
    }
}

export default connect(registerEndPoint);