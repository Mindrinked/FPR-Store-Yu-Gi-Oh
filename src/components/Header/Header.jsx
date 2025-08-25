import { Link } from "react-router-dom";
import "./Header.css";
import logo from "../../assets/logo_header.png";
import cart from "../../assets/carrinho.png"

export default function Header({ busca, setBusca, cartCount = 0 }) {
    const label = `Carrinho com ${cartCount} item${cartCount === 1 ? "" : "s"}`;
    const displayCount = cartCount > 99 ? "99+" : cartCount;

    return (
        <header className="header">
            <Link to="/" className="header__brand-link" aria-label="Ir para a página inicial">
                <img src={logo} alt="FPR Yu-Gi-Oh!" className="header__logo" />
            </Link>
            <div className="header__search">
                <input type="text"
                    placeholder="Pesquisar"
                    value={busca}
                    onChange={(e) => setBusca(e.target.value)} />
            </div>
            <Link to="/carrinho" className="header__cart" aria-label={label} title={label}>
                <img src={cart} alt="" className="cart-img" />
                {cartCount > 0 && <span className="cart-badge">{displayCount}</span>}
            </Link>
        </header >
    );
}
