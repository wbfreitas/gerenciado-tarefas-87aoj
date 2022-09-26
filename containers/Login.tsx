/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import React, {useState} from 'react';
import { executeRequest } from '../services/apiServices';
import {NextPage} from 'next';
import { redirect } from 'react-router-dom';
import router from 'next/router';

type LoginProps = {setAccessToken(e:string):void } 

export const Login:NextPage<LoginProps>  = ({setAccessToken}) => {

    const [login, setLogin] = useState('');
    const [password, setPassowrd] = useState('');
    const [error, setError] = useState('');

    const doLogin = async() => {
        try {
            setError('');
            if(login || password) {
                const body = {login, password};
                const result: any = await executeRequest('login', 'POST', body);

                if(!result && !result?.data) {
                    return setError('Error ao procesar login');

                }
                const {name, email, token} = result.data;
                localStorage.setItem('accessToken', token);
                localStorage.setItem('userName', name);
                localStorage.setItem('userEmail', email);
                setAccessToken(token);
                
                return;
            }
            setError('Digite o usuario e senha');
        } catch (e: any) {
            if(e?.response?.data?.error) {
                return setError(e?.response?.data?.error); 
            }
        setError('Error ao procesar login');
        }
    }

    return (
        <div className='container-login'>
            <img className='logo' src='img/logo.svg' />
            <form>
                <p className='error'>{error}</p>
                <div className='input'>
                    <img src='img/mail.svg' />
                    <input type="text" placeholder="login" 
                    value={login} onChange={event => setLogin(event.target.value)} />
                </div>
                <div className='input'>
                    <img src='img/lock.svg' />
                    <input type="password" placeholder="senha"
                    value={password}
                    onChange={event => setPassowrd(event.target.value)} />
                </div>
                <button type="button" onClick={doLogin}>login</button>
                <a className='sign-in' href="/signIn" >Cadastrar usuário</a>
            </form>
        </div>
    )
}
