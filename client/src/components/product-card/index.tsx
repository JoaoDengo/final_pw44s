import type { IProduct } from "@/commons/types";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Rating } from "primereact/rating";
import { useNavigate } from "react-router-dom";

interface IProductCardProps {
  product: IProduct;
}

export const ProductCard = ({ product }: IProductCardProps) => {
  const navigate = useNavigate();

  const header = (
    <img
      alt={product.name}
      src={product.img.startsWith("http") ? product.img : `/${product.img}`}
      style={{
        width: "100%",
        height: "320px",
        objectFit: "cover",
        padding: "0.5rem",
      }}
    />
  );

  const footer = (
    <div className="flex justify-center mt-4">
      <Button
        label="Ver Opções"
        style={{
          background: "#38B3D4",
          border: "none",
          color: "white",
        }}
        onClick={() => navigate(`/products/${product.id}`)}
      />
    </div>
  );

  const desconto = product.price * 0.1;

  return (
    <div>
      <Card
        key={product.id}
        title={product.name}
        footer={footer}
        header={header}
        className="w-60 "
        style={{ backgroundColor: "#1F2937", color: "#fff" }}
      >
        <div className="items-center gap-2">
          <Rating value={5} readOnly cancel={false} />
          <p className="text-xl text-white">{product.brand.name}</p>
          <p className=" line-through text-gray">R$ {product.price}</p>
          <p className="font-bold text-xl text-white">
            R$ {product.price - desconto}
          </p>
        </div>
      </Card>
    </div>
  );
};
