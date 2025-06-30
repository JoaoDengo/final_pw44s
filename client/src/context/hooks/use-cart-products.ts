import { useEffect, useState, useRef } from "react";
import { Toast } from "primereact/toast";
import type { IProduct } from "@/commons/types";
import { useCart } from "../CartContext";
import productService from "@/services/product-service";

export function useCartProducts() {
  const { cart } = useCart();
  const [products, setProducts] = useState<IProduct[]>([]);
  const toast = useRef<Toast>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const responses = await Promise.all(
          cart.map((item) => productService.findById(item.productId))
        );

        const productsData = responses.map(
          (response) => response.data as IProduct
        );

        setProducts(productsData);
      } catch (error) {
        console.error("Erro ao carregar produtos:", error);
        toast.current?.show({
          severity: "error",
          summary: "Erro",
          detail: "Não foi possível carregar os produtos.",
          life: 3000,
        });
      }
    };

    if (cart.length > 0) {
      loadData();
    } else {
      setProducts([]);
    }
  }, [cart]);

  return { products, toast };
}
