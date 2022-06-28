import mongoose from 'mongoose';
import type {NextApiResponse, NextApiRequest, NextApiHandler} from 'next';
import { DefaultMsgResponse } from '../types/DefaultMsgResponse';

export const connect = (handler: NextApiHandler) => 
    async (req: NextApiRequest, res: NextApiResponse<DefaultMsgResponse>) => {
        console.log('MongoDB readyState?', mongoose.connections[0].readyState);

       if(mongoose.connections[0].readyState)  {
        return handler(req, res);
       }

       const DB_CONNECTIONSTRING = 'mongodb://localhost:27017/87aoj-gerenciador-tarefas';

       mongoose.connect('connect', () => console.log('conectado no banco de dados'));
       mongoose.connect('err', err => console.log('Erro ao conectar no banco', err));

       await mongoose.connect(DB_CONNECTIONSTRING);
}
