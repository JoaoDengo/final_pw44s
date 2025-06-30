import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/hooks/use-auth";
import { useCartProducts } from "@/context/hooks/use-cart-products";
import { Button } from "primereact/button";
import { Sidebar } from "primereact/sidebar";
import { Toast } from "primereact/toast";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ProductCartCard } from "../product-cart-card";

export const Cart = () => {
  const { cart } = useCart();
  const { products, toast } = useCartProducts();
  const [visible, setVisible] = useState<boolean>(false);
  const { authenticated } = useAuth();
  const navigate = useNavigate();

  const total = products.reduce((acc, product) => {
    const item = cart.find((p) => p.productId === product.id);
    const quantity = item?.quantity || 1;
    return acc + product.price * quantity;
  }, 0);

  const handleClick = () => {
    navigate(`/home`);
    setVisible(false);
  };

  return (
    <div className="fixed bottom-4 right-4 flex flex-col text-white p-2 rounded-full shadow-lg transition duration-300 sm:bottom-10 sm:right-10">
      <Toast ref={toast} />

      <Sidebar
        visible={visible}
        onHide={() => setVisible(false)}
        className="max-w-full"
        style={{
          width: "90vw",
          maxWidth: "700px",
          backgroundColor: "#111827",
          padding: "1rem",
          display: "flex",
          flexDirection: "column",
          height: "100vh",
        }}
      >
        <div className="flex flex-col h-full">
          <h2 className="text-white font-bold mb-4 text-xl sm:text-2xl">
            Carrinho de Compras
          </h2>

          <div className="flex-grow overflow-auto mb-4">
            {products.length === 0 ? (
              <p className="text-gray-300">Seu carrinho está vazio.</p>
            ) : (
              products.map((product) => (
                <ProductCartCard key={product.id} product={product} />
              ))
            )}
          </div>

          <div className="bg-[#1F2937] p-4 rounded text-white flex justify-between items-center mb-4">
            <p className="font-semibold text-lg">Total:</p>
            <p className="text-lg">R$ {total.toFixed(2)}</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              label="Continuar Comprando"
              icon="pi pi-cart-arrow-down"
              onClick={handleClick}
              className="w-full sm:w-60"
              style={{
                backgroundColor: "#CDE1EE",
                border: "none",
                color: "#2563EB",
              }}
            />
            <Button
              label="Finalizar Compra"
              icon="pi pi-check"
              onClick={() => {
                if (!authenticated) {
                  toast.current?.show({
                    severity: "warn",
                    summary: "Atenção",
                    detail:
                      "Você precisa estar logado para finalizar a compra.",
                    life: 3000,
                  });
                  setVisible(false);
                  return;
                }
                navigate(`/sale-page`);
              }}
              className="w-full sm:w-60"
              style={{
                backgroundColor: "green",
                border: "none",
              }}
            />
          </div>
        </div>
      </Sidebar>

      <Button
        icon="pi pi-shopping-cart"
        style={{ backgroundColor: "green", border: "none" }}
        onClick={() => setVisible(true)}
        className="w-12 h-12 sm:w-14 sm:h-14"
        aria-label="Abrir carrinho"
      />
    </div>
  );
};
