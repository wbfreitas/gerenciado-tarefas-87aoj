/* eslint-disable @next/next/no-img-element */

import { NextPage } from 'next';
import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { executeRequest } from '../services/apiServices';
import { Task } from '../types/Task';
import { Item } from './Item';
import moment from 'moment';

type ListProps = {
    tasks: Task[],
    getFilteredList(): void
}

export const List: NextPage<ListProps> = ({tasks, getFilteredList}) => {
    
    const [showModal, setShowModal] = useState(false);
    const [error, setError] = useState('');
    const [_id, setId] = useState('');
    const [name, setName] = useState('');
    const [modalPrevisionDateStart, setModalPrevisionDateStart] = useState('');
    const [modalPrevisionDateEnd, setModalPrevisionDateEnd] = useState<string | undefined>('');

    const selectToEdit = (task: Task) => {
        setId(task._id);
        setName(task.name);
        setModalPrevisionDateStart(moment(task.previsionDate).format('yyyy-MM-DD'));
        setModalPrevisionDateEnd(task.finishDate);
        setShowModal(true);
    }

    const closeModal = async() => {
        setError('');
        setName('');
        setModalPrevisionDateStart('');
        setShowModal(false);
    }

const listaDeTarefas = () => 
    <div className={"container-listagem" + (tasks && tasks.length > 0 ? "" : " vazia")}>
    {
        tasks &&tasks.length > 0 ? 
            tasks.map(t => <Item key={t._id} task={t} selectTaskToEdit={selectToEdit} /> )
        : <>
            <img src="img/not-found.svg" alt="Nenhuma atividade encontrada"/>
            <p>Você ainda não possui tarefas cadastradas!</p>
        </>
    }

</div>

const inputData = (value: string | undefined, praceHolder: string,
        change: (s: string) => void) =>
    <input
        type={value ? 'date' : 'text'}
        placeholder='Data de previsão'
        onFocus={e => e.target.type = 'date'}
        onBlur={e => value ? e.target.type = 'date' : e.target.type = 'text'}
        value={value || ''}
        onChange={e => change(e.target.value)}
    />

    const validaFormularioPreenchido = () => {
        if(!name || !name.trim() || !modalPrevisionDateStart ||
            !modalPrevisionDateStart.trim() || !_id || !_id.trim()){
            throw({customError: 'Favor preencher o formulário'});
        } 
    }

    const atualizar = async() => {
        try{

            validaFormularioPreenchido();

            const body = {
                name,
                previsionDate : modalPrevisionDateStart,
                finishDate: modalPrevisionDateEnd
            }

            await executeRequest('task?id='+_id, 'PUT', body);
            await getFilteredList();
            closeModal();
        }catch(e : any){
            setError(e?.response?.data?.error || e?.customError || 'Ocorreu erro ao tentar cadastrar tarefa');
        }
    }

    return (
        <>
        {listaDeTarefas()} 

        <Modal 
            show={showModal}
            onHide={closeModal}
            className="container-modal"
            >
            <Modal.Body>
                <p>Adicionar Tarefa</p>
                {error && <p className='error'>{error}</p>}
                <input
                    type="text"
                    placeholder='Nome da Tarefa'
                    value={name}
                    onChange={e => setName(e.target.value)}
                    />
            {inputData(modalPrevisionDateStart, 'Data de previsão', setModalPrevisionDateStart)}
            {inputData(modalPrevisionDateEnd, 'Data de conclusao', setModalPrevisionDateEnd)}
            </Modal.Body>
            <Modal.Footer>
                <div className='button col-12'>
                    <button
                        onClick={atualizar}
                    >Salvar</button>
                    <span onClick={closeModal}>Cancelar</span>
                </div>
            </Modal.Footer>
        </Modal>
    </>    
    );
}
