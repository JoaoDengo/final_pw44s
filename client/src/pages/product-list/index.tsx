import type { IProduct } from "@/commons/types";
import { Cart } from "@/components/cart";
import { ProductCard } from "@/components/product-card";
import ProductService from "@/services/product-service";
import { Toast } from "primereact/toast";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}
export default function ProductListPage() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const toast = useRef<Toast>(null);
  const query = useQuery();
  const categoryId = query.get("category");

  useEffect(() => {
    if (categoryId) {
      loadDataCategory(Number(categoryId));
    } else {
      loadData();
    }
  }, [categoryId]);

  const loadData = async () => {
    const response = await ProductService.findAll();
    if (response.status === 200) {
      setProducts(Array.isArray(response.data) ? response.data : []);
    } else {
      console.error("Erro ao carregar produtos:", response);
      toast.current?.show({
        severity: "error",
        summary: "Erro",
        detail: "Não foi possível carregar a lista de produtos.",
        life: 3000,
      });
    }
  };

  const loadDataCategory = async (id: number) => {
    const response = await ProductService.findProductsByCategoryId(id);

    if (response.status === 200) {
      setProducts(Array.isArray(response.data) ? response.data : []);
    } else {
      console.error("Erro ao carregar produtos:", response);
      toast.current?.show({
        severity: "error",
        summary: "Erro",
        detail: "Não foi possível carregar a lista de produtos.",
        life: 3000,
      });
    }
  };

  return (
    <div className="flex justify-center items-center">
      <div className="card flex justify-center flex-wrap gap-3 w-[70%] gap-5">
        {products.map((p) => (
          <ProductCard product={p} />
        ))}
      </div>
      <Cart />
    </div>
  );
}
