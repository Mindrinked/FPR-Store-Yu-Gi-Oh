import "./Footer.css";
import imgFooter from "../../assets/abacaxi-footer.png";

export default function Footer() {
    const year = new Date().getFullYear();
    return (
            <footer className="footer">
                <p>© {year} FPR Store: Yu-Gi-Oh! - Todos os direitos reservados.</p>
                <img src={imgFooter} alt="abacaxi-footer.png" className="footer-footer"/>
            </footer>
    )
}