import { useEffect, useMemo, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "../components/Header/Header.jsx";
import Filtros from "../components/Content/Filtros.jsx";
import Banner from "../components/Content/Banner.jsx";
import ListaComPaginacao from "../components/Content/ListaComPaginacao.jsx";
import CartPage from "./CartPage.jsx";
import Modal from "../components/Content/Modal.jsx";
import "../AppLayout.css";
import Footer from "../components/Footer/Footer.jsx";

const BRL = (v) => new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(v);

export default function App() {
  const [busca, setBusca] = useState("");
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);

  // filtros aplicados
  const [filtrosAplicados, setFiltrosAplicados] = useState({ atributos: [], racas: [] });

  // carrinho
  const [cart, setCart] = useState(() => {
    try { return JSON.parse(localStorage.getItem("cart") || "[]"); } catch { return []; }
  });
  useEffect(() => { localStorage.setItem("cart", JSON.stringify(cart)); }, [cart]);

  // modal de confirmação
  const [modal, setModal] = useState({ open: false, type: "confirm", card: null });

  // fetch inicial
  useEffect(() => {
    (async () => {
      try {
        const r = await fetch("https://db.ygoprodeck.com/api/v7/cardinfo.php");
        const j = await r.json();
        setCards(j.data || []);
      } finally { setLoading(false); }
    })();
  }, []);

  // opções únicas para filtros
  const { atributos, racas } = useMemo(() => {
    const a = [], r = [];
    for (const c of cards) {
      if (c.attribute && !a.includes(c.attribute)) a.push(c.attribute);
      if (c.race && !r.includes(c.race)) r.push(c.race);
    }
    a.sort(); r.sort();
    return { atributos: a, racas: r };
  }, [cards]);

  // clicar em COMPRAR na lista
  const handleBuyClick = (card) => {
    const exists = cart.some((it) => it.id === card.id);
    setModal({ open: true, type: exists ? "exists" : "confirm", card });
  };
  const confirmAdd = () => {
    const c = modal.card;
    if (!c) return;
    const item = { id: c.id, name: c.name, image: c.card_images?.[0]?.image_url_small, price: 24.9, desc: c.desc || "", qty: 1 };
    setCart((prev) => prev.some((it) => it.id === item.id) ? prev : [...prev, item]);
    setModal({ open: false, type: "confirm", card: null });
  };
  

  return (
    <>
      <Header busca={busca} setBusca={setBusca} cartCount={cart.length} />
      <main className="main-grow">
        <Routes>
        {/* Home / catálogo */}
        <Route
          path="/"
          element={
            <main className="page">
              <aside className="sidebar">
                <Filtros
                  atributos={atributos}
                  racas={racas}
                  valoresIniciais={filtrosAplicados}
                  onApply={(novo) => setFiltrosAplicados({
                    atributos: [...(novo.atributos || [])],
                    racas: [...(novo.racas || [])],
                  })}
                  onClear={() => setFiltrosAplicados({ atributos: [], racas: [] })}
                />
              </aside>

              <section className="content">
                <Banner />
                <ListaComPaginacao
                  loading={loading}
                  cards={cards}
                  busca={busca}
                  filtros={filtrosAplicados}
                  onBuy={handleBuyClick}
                />
              </section>
            </main>
          }
        />

        {/* Página do carrinho */}
        <Route
          path="/carrinho"
          element={
            <CartPage
              cart={cart}
              setCart={setCart}
              formatBRL={BRL}
            />
          }
        />
        </Routes>
      </main>
      <Footer/>
      {/* Modal */}
      <Modal
        open={modal.open}
        type={modal.type}
        card={modal.card}
        onClose={() => setModal((m) => ({ ...m, open: false }))}
        onConfirm={confirmAdd}
      />
    </>
  );
}