import type { ISale } from "@/commons/types";
import SaleCard from "@/components/sales-card";
import saleService from "@/services/sale-service";
import type { Toast } from "primereact/toast";
import { useEffect, useRef, useState } from "react";

export default function UserSales() {
  const [sales, setSales] = useState<ISale[]>([]);
  const toast = useRef<Toast>(null);

  const loadData = async () => {
    const response = await saleService.findAll();
    console.log("Response from saleService.save:", response.data);
    if (response.status === 200) {
      setSales(Array.isArray(response.data) ? response.data : []);
    } else {
      console.error("Erro ao carregar produtos:", response);
      toast.current?.show({
        severity: "error",
        summary: "Erro",
        detail: "Não foi possível carregar a lista de pedidos.",
        life: 3000,
      });
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <div className="flex justify-center flex-col items-center text-white m-6">
        {sales.map((sale) => (
          <SaleCard key={sale.id} sale={sale} />
        ))}
      </div>
    </div>
  );
}
