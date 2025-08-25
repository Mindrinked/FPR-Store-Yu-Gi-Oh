import { useEffect } from "react";
import { createPortal } from "react-dom";
import "./Modal.css";

export default function Modal({ open, type, card, onClose, onConfirm }) {
    // ESC fecha
    useEffect(() => {
        if (!open) return;
        const onKey = (e) => e.key === "Escape" && onClose?.();
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [open, onClose]);

    if (!open) return null;

    const isConfirm = type === "confirm";
    const title = isConfirm ? "Adicionar ao carrinho?" : "Esta carta já está no carrinho";

    const node = (
        <div className="m-overlay" onClick={onClose}>
            <div
                className="m-dialog"
                role="dialog"
                aria-modal="true"
                aria-labelledby="m-title"
                onClick={(e) => e.stopPropagation()} // impede fechar ao clicar dentro
            >
                <header className="m-header">
                    <h3 id="m-title">{title}</h3>
                    <button className="m-close" aria-label="Fechar" onClick={onClose}>✕</button>
                </header>

                {card && (
                    <div className="m-body">
                        <img src={card.card_images?.[0]?.image_url_small} alt={card.name} />
                        <div className="m-info">
                            <div className="m-name">{card.name}</div>
                            <div className="m-price">R$ 24,90</div>
                            {!isConfirm && <small>Você já adicionou esta carta ao carrinho.</small>}
                        </div>
                    </div>
                )}

                <footer className="m-actions">
                    {isConfirm ? (
                        <>
                            <button className="m-btn ghost" onClick={onClose}>Cancelar</button>
                            <button className="m-btn primary" onClick={onConfirm}>Adicionar</button>
                        </>
                    ) : (
                        <button className="m-btn primary" onClick={onClose}>Ok</button>
                    )}
                </footer>
            </div>
        </div>
    );

    return createPortal(node, document.body);
}
