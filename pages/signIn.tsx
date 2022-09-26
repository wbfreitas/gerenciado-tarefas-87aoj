/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { NextPage } from "next";
import Router from "next/router";
import { FormEvent, useState } from "react";
import ReactDOM from "react-dom";
import { Home } from "../containers/Home";
import { executeRequest } from "../services/apiServices";

export const SignIn: NextPage = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassowrd] = useState('');
    const [error, setError] = useState('');

    const sucesso = () => {
        ReactDOM.render(
            <div>
                <p>Usuário cadastrado com sucesso!</p>
                <a href="../">Click aqui para efetuar o login!</a>
            </div>, document.querySelector('#root')
        );
    }
    

    const signIn = async(ev: FormEvent<HTMLDivElement>)  => {
        try {
        ev.preventDefault();
        setError('');
            const result: any = await executeRequest('user', 'POST', {name, email, password});         
            if(!result && !result.data) throw(null);
            sucesso();
        } catch(e: any) {
            setError(e?.response?.data?.error || 'ixi?? deu ruim no cadastro!');
        }
        return;
    }

    return <>
        <div id="root" className="container-sign-in" onSubmit={(e) => signIn(e)}>
        <img className='logo' src='img/logo.svg' />
            <form>
            <p className='error'>{error}</p>
                <input type="text" 
                    onChange={event => setName(event.target.value)}
                    placeholder="Digite sua graça aqui!" required minLength={2}/>

                <input type="email" 
                    onChange={event => setEmail(event.target.value)}
                    placeholder="Passa seu e-mail pra nois!" required />

                <input type="password" 
                    onChange={event => setPassowrd(event.target.value)}
                    placeholder="Fala a senha ai!" required minLength={6} />

                <button>Cadastrar</button>
            </form> 
        </div>
    </>
}

export default SignIn;