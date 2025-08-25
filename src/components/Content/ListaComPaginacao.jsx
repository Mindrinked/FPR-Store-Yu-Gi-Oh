import "./ListaComPaginacao.css";
import { useMemo, useState, useEffect } from "react";

export default function ListaComPaginacao({ loading, cards, busca, filtros, onBuy }) {
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [itensPorPagina, setItensPorPagina] = useState(10);

  useEffect(() => { setPaginaAtual(1); }, [busca, filtros]);

  const filtrados = useMemo(() => {
    const b = (busca || "").trim().toLowerCase();
    return cards.filter(c => {
      const okBusca = b ? (c.name || "").toLowerCase().includes(b) : true;
      const okAttr  = filtros?.atributos?.length ? filtros.atributos.includes(c.attribute) : true;
      const okRace  = filtros?.racas?.length ? filtros.racas.includes(c.race) : true;
      return okBusca && okAttr && okRace;
    });
  }, [cards, busca, filtros]);

  if (loading) return <div className="container">Carregando…</div>;

  const totalPaginas = Math.max(1, Math.ceil(filtrados.length / itensPorPagina));
  const start = (paginaAtual - 1) * itensPorPagina;
  const visiveis = filtrados.slice(start, start + itensPorPagina);

  const mudarPagina = p => (p>=1 && p<=totalPaginas) && setPaginaAtual(p);

  const paginaBotoes = () => {
    const max = 5;
    let ini = Math.max(1, paginaAtual - 2);
    let fim = Math.min(totalPaginas, ini + max - 1);
    if (fim - ini < max - 1) ini = Math.max(1, fim - max + 1);

    const nodes = [];
    for (let i = ini; i <= fim; i++) {
      nodes.push(
        <button key={i} onClick={() => mudarPagina(i)} className={i===paginaAtual ? "ativo" : ""}>
          {i}
        </button>
      );
    }
    return nodes;
  };

  return (
    <div className="container">
      <div className="toolbar">
        <div className="toolbar__left">
          <label>Itens por página:</label>
          <select
            value={itensPorPagina}
            onChange={(e) => { setItensPorPagina(Number(e.target.value)); setPaginaAtual(1); }}
          >
            <option value={5}>5</option><option value={10}>10</option>
            <option value={15}>15</option><option value={20}>20</option>
          </select>
          <span className="count">{filtrados.length} resultado{filtrados.length!==1?"s":""}</span>
        </div>

        {totalPaginas > 1 && (
          <div className="paginacao">
            <button onClick={() => mudarPagina(paginaAtual - 1)} disabled={paginaAtual===1}>{"<"}</button>
            {paginaBotoes()}
            <button onClick={() => mudarPagina(paginaAtual + 1)} disabled={paginaAtual===totalPaginas}>{">"}</button>
          </div>
        )}
      </div>

      <ul className="grid">
        {visiveis.map(card => (
          <li key={card.id} className="card">
            <div className="card-media">
              <img src={card.card_images?.[0]?.image_url_small} alt={card.name} />
            </div>
            <h3>{card.name}</h3>
            <p className="price">R$ 24,90</p>
            <button className="buy" onClick={() => onBuy?.(card)}>COMPRAR</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
