import type { IProduct } from "@/commons/types";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { QuantitySelector } from "../quantity-selector";
import { useCart } from "@/context/CartContext";

interface IProductCartCardProps {
  product: IProduct;
}

export const ProductCartCard = ({ product }: IProductCartCardProps) => {
  const { cart, updateQuantity, removeFromCart } = useCart();
  const item = cart.find((i) => i.productId === product.id);
  const quantity = item?.quantity ?? 1;

  return (
    <div className="m-1 w-[600px] max-w-full">
      <Card className="h-50" style={{ backgroundColor: "#1F2937" }}>
        <div className="flex flex-row">
          <div className="w-25">
            <img
              className="size-35"
              src={
                product.img.startsWith("http") ? product.img : `/${product.img}`
              }
              alt={product.name}
            />
          </div>

          <div className="flex flex-col ml-5">
            <p className="text-white">{product.name}</p>
            <p>R$ {product.price.toFixed(2)}</p>
          </div>

          <div className="w-auto flex items-center flex-col ml-auto">
            <Button
              icon="pi pi-trash"
              style={{
                backgroundColor: "#1F2937",
                border: "none",
                color: "red",
              }}
              onClick={() => removeFromCart(product.id!)}
            />

            <div className="card flex justify-content-center mt-2">
              <QuantitySelector
                value={quantity}
                onChange={(newQty) => updateQuantity(product.id!, newQty)}
              />
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
