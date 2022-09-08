import { NextPage } from "next";
import { Filter } from "../components/Filter";
import { AccessTokenProps } from "../types/AccessTokenProps";
import { Footer } from "../components/Footer";
import { Headers } from "../components/Header";
import { List } from "../components/List";
import { useEffect, useState } from "react";
import { executeRequest } from "../services/apiServices";
import { Task } from "../types/Task";
import { Modal } from "react-bootstrap";

export const Home : NextPage<AccessTokenProps> = ({setAccessToken}) => {

    const [tasks, setTasks] = useState<Task[]>([]);
    const [previsionDateStart, setPrevisionDateStart ] = useState('');
    const [previsionDateEnd, setPrevisionDateEnd ] = useState('');
    const [status, setStatus ] = useState('0');

    const [showModal, setShowModal ] = useState(false);
    const [error, setError] = useState('');
    const [name, setName] = useState('');
    const [modalPrevisionDateStart, setModalPrevisionDateStart] = useState('');

    const getFilteredList = async() =>{
        try{
            let query = '?status=' + status;

            if(previsionDateStart) 
                    query += '&previsionDateStart=' + previsionDateStart;
            
            if(previsionDateEnd) 
                query += '&previsionDateEnd=' + previsionDateEnd;

            const result = await executeRequest('task'+ query, 'GET');
            if(result && result.data){
                setTasks(result.data);
            }
        }catch(e){
            console.log(e);
        }
    }

    const salvar = async() => {
        
        if(!name || !name.trim() ||  !modalPrevisionDateStart || !modalPrevisionDateStart.trim() ) {
            setError('Favor preencher o formulario');
            return;
        }
        const body = {name, previsionDate: modalPrevisionDateStart}   
        try {
            await executeRequest('task', 'POST', body);
            await getFilteredList();
            closeModal();
        } catch (e: any) {
        if(e?.response?.data?.error) {
            setError(e?.response?.data?.error);
        } 
        }
    }
    
    const closeModal = () => {
        setName('');
        setError('');
        setModalPrevisionDateStart('');
        setShowModal(false);
    }

    useEffect(() => {
        getFilteredList();
    }, [previsionDateStart, status, name]);


    const sair = () =>{
        localStorage.removeItem('accessToken');
        localStorage.removeItem('userName');
        localStorage.removeItem('userMail');
        setAccessToken('');
    }

    return (
        <>
            <Headers sair={sair} setShowModal={setShowModal}/>
            <Filter periodoDe={previsionDateStart} setPeriodoDe={setPrevisionDateStart}
                setPeriodoAte={setPrevisionDateEnd}
                periodoAte={previsionDateEnd} status={status} setStatus={setStatus} />
            <List tasks={tasks} getFilteredList={getFilteredList} />
            <Footer setShowModal={setShowModal} />
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
