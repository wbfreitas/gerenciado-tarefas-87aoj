import { NextPage } from "next";
import { Filter } from "../components/Filter";
import { AccessTokenProps } from "../types/AccessTokenProps";
import { Footer } from "../components/Footer";
import { Headers } from "../components/Header";
import { List } from "../components/List";
import { useEffect, useState } from "react";
import { executeRequest } from "../services/apiServices";
import { Task } from "../types/Task";

export const Home : NextPage<AccessTokenProps> = ({setAccessToken}) => {

    const [tasks, setTasks] = useState<Task[]>([]);

    const getFilteredList = async() =>{
        try{
            const result = await executeRequest('task', 'GET');
            if(result && result.data){
                setTasks(result.data);
            }
        }catch(e){
            console.log(e);
        }
    }

    useEffect(() =>{
        getFilteredList();
    }, []);

    const sair = () =>{
        localStorage.removeItem('accessToken');
        localStorage.removeItem('userName');
        localStorage.removeItem('userMail');
        setAccessToken('');
    }

    return (
        <>
            <Headers sair={sair}/>
            <Filter/>
            <List tasks={tasks} getFilteredList={getFilteredList} />
            <Footer />
        </>
    );
}