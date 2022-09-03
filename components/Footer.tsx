/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import { NextPage } from "next";
 type FooterProps = {
    setShowModal(e: boolean) : void;
 }
export const Footer: NextPage<FooterProps> = ({setShowModal}) => {

    return (
        <div className="container-footer">
            <button><img src="/img/add.svg" alt="adcionar tarefa" onClick={() => setShowModal(true)} />Adicionar Tarefas</button>
            <span>© Copyright {new Date().getFullYear()}. Todos os direitos reservados.</span>
        </div>
    );
}