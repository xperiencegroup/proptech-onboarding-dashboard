import { Link } from "react-router-dom";
import "./left-side-panel.css";
import logoPrincipalAluna from "../../../assets/main/LogoPrincipal_Verdeobscuro.png";

export default function LeftSidePanel() {
  return (
    <>
      {/* <!-- SIDE: branding + contexto --> */}
      <div className="aluna-ob-side">
        <Link
          to={"/"}
          className="aluna-ob-side-top w-[clamp(88.75px,15.625vw,120px)] h-fit"
        >
          <img src={logoPrincipalAluna} alt="Logo Aluna Residencial" />
        </Link>

        <div className="aluna-ob-side-mid">
          <div className="aluna-ob-side-eyebrow">CARTA DE BIENVENIDA</div>
          <div className="aluna-ob-side-quote">
            Cuéntanos un poco de ti y <em>Aluna</em> se adapta —<br />
            modelos, planes y espacios pensados para tu familia.
          </div>
        </div>

        <div className="aluna-ob-side-bottom">
          <div>
            UN PROYECTO DE<strong>GRUPO MR2</strong>
          </div>
          <div>VILLA NUEVA · GT</div>
        </div>
      </div>
    </>
  );
}
