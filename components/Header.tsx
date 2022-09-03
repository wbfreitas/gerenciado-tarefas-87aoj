/* eslint-disable @next/next/no-img-element */
import { NextPage } from "next";
import { SplitButton } from "react-bootstrap";

type HeaderPorps = {
    sair():void;
    setShowModal(e: boolean) : void
}
export const Headers: NextPage<HeaderPorps> = ({sair, setShowModal}) => {
    const fullName = localStorage.getItem('userName');
    const userName = fullName?.split('')[0] || '...';
    return (
        <div className="container-header">
            <img src="/img/logo.svg" alt="logo fiap" className="logo" />
            <button onClick={() => setShowModal(true)}>
                <span>+</span>
                Adicionar Tarefa
            </button>
            <div className="mobile">
                <span>Ola {userName}</span>
                <img src="/img/exit-mobile.svg" alt="Sair" onClick={sair} />
            </div>
            <div className="desktop">
                <span>Ola {userName}</span>
                <img src="/img/exit-desktop.svg" alt="Sair" onClick={sair} />
            </div>
        </div>
    );
}