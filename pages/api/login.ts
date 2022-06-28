import type {NextApiRequest, NextApiResponse} from 'next';
import { DefaultMsgResponse } from '../../types/DefaultMsgResponse';

export default (req: NextApiRequest, res: NextApiResponse<DefaultMsgResponse>) => {

    const {login, password} = req.body;

    if(req.method === 'POST') {

    if(login === 'eu' && password === '123') {
       return res.status(200).json({msg: 'Login autorizado' }); 
    }

    return res.status(400).json({msg: 'usuario nao encontrado!' }); 
}
    
    return res.status(405).json({error: 'Metodo informado nao é permitido!'});
}