import { useMemo, useState } from "react";
import "./CartPage.css";

export default function CartPage({ cart, setCart, formatBRL }) {
    // frete: 15 (fixo com rastreio) ou 20 (combinado)
    const [frete, setFrete] = useState(20);

    const { itens, subtotal, totalItens } = useMemo(() => {
        const itens = cart.map((it) => ({ ...it, qty: it.qty ?? 1, total: (it.price ?? 0) * (it.qty ?? 1) }));
        const subtotal = itens.reduce((s, it) => s + it.total, 0);
        const totalItens = itens.reduce((s, it) => s + it.qty, 0);
        return { itens, subtotal, totalItens };
    }, [cart]);

    const remover = (id) => setCart((prev) => prev.filter((i) => i.id !== id));

    return (
        <div className="cart-wrap">
            <h2 className="cart-title">CARRINHO DE <span style={{ color: '#F46D1B', fontWeight: 'bold' }}>COMPRAS</span>{' '}</h2>

            <div className="cart-grid">
                {/* Lista */}
                <div className="cart-list">
                    {itens.length === 0 ? (
                        <div className="cart-empty">Seu carrinho está vazio.</div>
                    ) : (
                        <>
                            {itens.map((it) => (
                                <div className="cart-row" key={it.id}>
                                    <img className="cart-img" src={it.image} alt={it.name} />
                                    <div className="cart-info">
                                        <h3 className="cart-name">{it.name}</h3>
                                        <p className="cart-desc">
                                            {it.desc?.trim() || "Descrição indisponível."}
                                        </p>

                                        <div className="cart-meta">
                                            <div>
                                                <span className="meta-title" style={{ fontWeight: 'bold' }}>Preço por unidade:</span>
                                                <span className="meta-price">{formatBRL(it.price ?? 0)}</span>
                                            </div>
                                            <div>
                                                <span className="meta-title" style={{ fontWeight: 'bold' }}>Quantidade:</span>
                                                <span className="meta-qty" style={{ color: '#34AC40', fontWeight: 'bold' }}>{it.qty}</span>
                                            </div>
                                            <div className="meta-total">
                                                <span className="meta-title">Total:</span>
                                                <span className="meta-price" style={{ color: '#F46D1B', fontWeight: 'bold' }}>{formatBRL(it.total)}</span>
                                            </div>
                                        </div>

                                        <button className="remove" onClick={() => remover(it.id)}>Remover</button>
                                    </div>
                                </div>
                            ))}

                            <div className="cart-sub">
                                <span>Subtotal ({totalItens} item{totalItens !== 1 ? "s" : ""}):</span>
                                <strong className="orange">{formatBRL(subtotal)}</strong>
                            </div>

                            <div className="cart-frete">
                                <h4>Formas de <span style={{ color: '#F46D1B', fontWeight: 'bold' }}>envio</span>{' '}</h4>
                                <label className="frete-opt">
                                    <input
                                        type="radio"
                                        name="frete"
                                        checked={frete === 15}
                                        onChange={() => setFrete(15)}
                                    />
                                    Frete Fixo com rastreio (R$ 15,00) <small>até 15 dias</small>
                                </label>
                                <label className="frete-opt">
                                    <input
                                        type="radio"
                                        name="frete"
                                        checked={frete === 20}
                                        onChange={() => setFrete(20)}
                                    />
                                    Frete combinado com o vendedor — Valor combinado: <strong>R$ 20,00</strong>
                                </label>

                                <div className="cart-frete-total">
                                    <span>Custo do Frete:</span>
                                    <strong className="orange">{formatBRL(frete)}</strong>
                                </div>
                            </div>
                        </>
                    )}
                </div>

                {/* Resumo */}
                <aside className="cart-summary">
                    <h3>Resumo da <span style={{ color: '#F46D1B', fontWeight: 'bold' }}>compra</span>{' '}</h3>
                    <div className="sum-line">
                        <span>Total dos produtos:</span>
                        <strong className="green">{formatBRL(subtotal)}</strong>
                    </div>
                    <div className="sum-line">
                        <span>Valor do frete:</span>
                        <strong className="green">{formatBRL(frete)}</strong>
                    </div>
                    <div className="sum-total">
                        <span>TOTAL A PAGAR:</span>
                        <strong className="orange">{formatBRL(subtotal + frete)}</strong>
                    </div>
                    <button className="checkout">FINALIZAR COMPRA</button>
                </aside>
            </div>
        </div>
    );
}