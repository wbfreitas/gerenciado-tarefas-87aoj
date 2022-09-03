/* eslint-disable @next/next/no-img-element */

import { NextPage } from 'next';
import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { Task } from '../types/Task';
import { Item } from './Item';



type ListProps = {
    tasks: Task[],
    getFilteredList(): void
}

export const List: NextPage<ListProps> = ({ tasks, getFilteredList }) => {

    const [showModal, setShowModal ] = useState(false);
    const [error, setError] = useState('');
    const [name, setName] = useState('');
    const [modalPrevisionDateStart, setModalPrevisionDateStart] = useState('');

    const selectToEdit = (task: Task) => {

    }

    return (
        <>
            <div className={"container-listagem" + (tasks && tasks.length > 0 ? "" : " vazia")}>
                {
                    tasks && tasks.length > 0 ?
                        tasks.map(t => <Item key={t._id} task={t} selectTaskToEdit={selectToEdit} />)
                        : <>
                            <img src="img/not-found.svg" alt="Nenhuma atividade encontrada" />
                            <p>Você ainda não possui tarefas cadastradas!</p>
                        </>
                }
            </div>
            <Modal show={showModal} onHide={closeModal} className="container-modal">
                <Modal.Body>
                    <p>Adicionar Tarefa</p>
                    {error && <p className='error'>{error}</p>}

                    <input placeholder="nome da tarefa"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    ></input>

                    <input placeholder="digite uma tarefa"
                    type="text"
                    onFocus={e => e.target.type =  "date"}
                    onBlur={e => modalPrevisionDateStart ? e.target.type = 'date' : 'text'}
                    value={modalPrevisionDateStart}
                    onChange={e => setModalPrevisionDateStart(e.target.value)}
                    ></input>
                </Modal.Body>
                <Modal.Footer>
                    <div className="button col-12">

                    <button onClick={salvar}>enviar</button>
                    <span onClick={closeModal}>cancelar</span>

                    </div>
                </Modal.Footer>
            </Modal>
        </>
    );
}