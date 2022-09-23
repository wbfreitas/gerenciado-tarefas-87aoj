/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import { NextPage } from "next/types";
import { useState } from "react";

type FilterProps = {
    periodoDe: string,
    periodoAte: string,
    status: string,
    setPeriodoDe(s: string) : void,
    setPeriodoAte(s: string) : void,
    setStatus(s: string) : void,
}

export const Filter: NextPage<FilterProps> = ({
    periodoDe, periodoAte, status, setPeriodoDe, setPeriodoAte, setStatus}) => {

    const [showFilters, setShowFilters] = useState(false);

    const filtroMobile = () =>  { 
        return showFilters && <div className="filtrosMobile">
                            <div>
                                <label>Data prevista de conclusão:</label>
                                <input type="date" value={periodoDe} onChange={e => setPeriodoDe(e.target.value)}></input>
                            </div>
                            <div>
                                <label>Até:</label>
                                <input type="date" value={periodoAte} onChange={e => setPeriodoAte(e.target.value)}></input>
                            </div>
                            <div className="line"></div>
                            <div>
                                <label>Status</label>
                                <select value={status} onChange={e => setStatus(e.target.value)}>
                                        <option value={0}>Todas</option>
                                        <option value={1}>Ativas</option>
                                        <option value={2}>Concluidas</option>
                                </select>
                            </div>
                        </div>
    }

    const filtroDesktop = () => 
        <div className="title">
                <span>Tarefas</span>
                <img src="/img/filter.svg" alt="filtra tarefas" onClick={e => setShowFilters(!showFilters)} />
                <div className="form">
                    <div>
                        <label>Data prevista de conclusão:</label>
                        <input type="date" value={periodoDe} onChange={e => setPeriodoDe(e.target.value)}></input>
                    </div>
                    <div>
                        <label>Até:</label>
                        <input type="date" value={periodoAte} onChange={e => setPeriodoAte(e.target.value)}></input>
                    </div>
                    <div className="line"></div>
                    <div>
                        <label>Status</label>
                        <select value={status} onChange={e => setStatus(e.target.value)}>
                            <option value={0}>Todas</option>
                            <option value={1}>Ativas</option>
                            <option value={2}>Concluidas</option>
                        </select>
                    </div>
                </div>
            </div>

    return (
        <div className="container-filtros">
            <>
                {filtroDesktop()}
                {filtroMobile()}
            </>
        </div>
    );
}
