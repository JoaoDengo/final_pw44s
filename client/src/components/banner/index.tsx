import { Button } from "primereact/button";
import "./style.css";
import { useNavigate } from "react-router-dom";

export default function Banner() {
  const navigate = useNavigate();

  const id = 1;
  return (
    <>
      <div
        className="flex justify-center items-center"
        style={{ backgroundColor: "#38B3D4" }}
      >
        <p className="text-white jetbrains-mono-uniquifier p-2 text-center text-sm sm:text-base">
          Frete grátis a partir de R$800
        </p>
      </div>
      <div className="flex justify-center px-4">
        <div className="flex flex-col md:flex-row justify-center w-full max-w-7xl gap-6 md:gap-10">
          <div className="flex justify-center items-center md:w-[320px]">
            <img
              className="w-48 sm:w-64 md:w-80"
              src="public/img/Ledger-flex-banner.png"
              alt=""
            />
          </div>
          <div className="flex flex-col justify-center w-full">
            <p className="text-white font-bold krona-one-regular text-[28px] sm:text-[36px] md:text-[40px] leading-tight">
              Última chance para ganhar R$50 de desconto comprando a Ledger Flex
            </p>
            <p className="text-white mt-2 text-sm sm:text-base">
              *Promoção válida somente para pagamentos por criptomoedas, até 05
              de dezembro
            </p>
            <Button
              label="Comprar Agora"
              className="p-button-secondary w-40 mt-4"
              style={{
                borderRadius: "12px",
                backgroundColor: "#CDE1EE",
                fontSize: "0.8rem",
                color: "#3B82F6",
              }}
              onClick={() => navigate(`/products/${id}`)}
            />
          </div>
        </div>
      </div>
    </>
  );
}
