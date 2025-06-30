import type { ISale } from "@/commons/types";
import { Card } from "primereact/card";

interface ISaleCardProps {
  sale: ISale;
}

export default function SaleCard({ sale }: ISaleCardProps) {
  return (
    <Card
      className="w-full max-w-3xl shadow-md m-4 p-0"
      style={{ backgroundColor: "#1F2937" }}
    >
      <div className="flex justify-between items-center border-b px-4 pt-4 pb-2">
        <div>
          <h2 className="text-sm text-white font-semibold">
            Pedido #{sale.id?.toString().slice(0, 4)}
          </h2>
          <p className="text-xs text-white">Realizado em: {sale.saleDate}</p>
          <p className="text-xs text-white">
            Endereço:
            {sale.address?.street},{sale.address?.number}, {sale.address?.city}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-green-700 bg-green-100 px-2 py-1 text-xs rounded-full">
            Entregue
          </span>
        </div>
      </div>

      <div className="p-4 space-y-4 max-h-64 overflow-auto">
        {sale.saleItems && sale.saleItems.length > 0 ? (
          sale.saleItems.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center gap-4 bg-[#111827] rounded p-2"
            >
              <img
                src={item.product.img}
                alt={item.product.name}
                className="w-16 h-16 object-contain rounded bg-white p-1"
              />
              <div>
                <p className="text-sm font-medium text-white">
                  {item.product.name}
                </p>
                <p className="text-xs text-white">
                  Quantidade: {item.quantity}
                </p>
                <p className="text-xs text-white">
                  Preço unitário: R$ {item.product.price.toFixed(2)}
                </p>
                <p className="text-xs text-white font-semibold mt-1">
                  Subtotal: R$ {(item.product.price * item.quantity).toFixed(2)}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-white">Nenhum item encontrado neste pedido.</p>
        )}
      </div>

      <div className="flex justify-between items-center px-4 pb-4 border-t border-gray-600">
        <p className="text-green-500 font-bold text-lg">
          Total: R$ {sale.total.toFixed(2)}
        </p>
      </div>
    </Card>
  );
}
