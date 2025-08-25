import { useEffect, useState } from "react";
import "./Filtros.css";

export default function Filtros({
    atributos, racas,
    valoresIniciais,  // { atributos:[], racas:[] }
    onApply,
    onClear
}) {
    const [draftAtributos, setDraftAtributos] = useState([]);
    const [draftRacas, setDraftRacas] = useState([]);

    // sincroniza quando valores aplicados mudarem
    useEffect(() => {
        setDraftAtributos([...(valoresIniciais?.atributos || [])]);
        setDraftRacas([...(valoresIniciais?.racas || [])]);
    }, [valoresIniciais]);

    const toggleInArray = (arr, value) => {
        return arr.includes(value) ? arr.filter(v => v !== value) : [...arr, value];
    };

    const aplicar = () => onApply?.({
        atributos: [...draftAtributos],
        racas: [...draftRacas],
    });

    const limpar = () => {
        setDraftAtributos([]);
        setDraftRacas([]);
        onClear?.();
    };

    return (
        <div className="filters">
            <h3 className="filters__title">FILTROS</h3>

            <div className="filters__group">
                <h4>TIPO / ATRIBUTO</h4>
                <ul>
                    {racas.map(r => (
                        <li key={r}>
                            <label className="checkline">
                                <input
                                    type="checkbox"
                                    className="checkbox-css"
                                    checked={draftRacas.includes(r)}
                                    onChange={() => setDraftRacas(prev => toggleInArray(prev, r))}
                                />
                                <span>{r}</span>
                            </label>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="filters__group">
                <h4>TIPO CARTA</h4>
                <ul>
                    {atributos.map(a => (
                        <li key={a}>
                            <label className="checkline">
                                <input
                                    type="checkbox"
                                    className="checkbox-css"
                                    checked={draftAtributos.includes(a)}
                                    onChange={() => setDraftAtributos(prev => toggleInArray(prev, a))}
                                />
                                <span>{a}</span>
                            </label>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="filters__actions">
                <button className="filters__primary" onClick={aplicar}>PESQUISAR</button>
                <button className="filters__secondary" onClick={limpar}>LIMPAR FILTROS</button>
            </div>
        </div>
    );
}
