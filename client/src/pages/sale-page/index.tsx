import type { ISale, IAddress, IItemSale, IFrete } from "@/commons/types";
import FreteService from "@/services/frete-service";
import AddressCard from "@/components/address-card";
import AddressModal from "@/components/address-modal";
import { ProductCartCard } from "@/components/product-cart-card";
import { useCart } from "@/context/CartContext";
import { useCartProducts } from "@/context/hooks/use-cart-products";
import addressService from "@/services/address-service";
import saleService from "@/services/sale-service";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { RadioButton } from "primereact/radiobutton";
import { Toast } from "primereact/toast";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";

export default function SalePage() {
  const { products } = useCartProducts();
  const [addresses, setAddresses] = useState<IAddress[]>([]);
  const [visible, setVisible] = useState(false);
  const toast = useRef<Toast>(null);
  const [selectedAddress, setSelectedAddress] = useState<IAddress | null>(null);
  const [frete, setFrete] = useState<IFrete | null>(null);

  const { clearCart, cart } = useCart();
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState<
    | "CARTAO_CREDITO"
    | "CARTAO_DEBITO"
    | "BOLETO"
    | "PIX"
    | "BITCOIN"
    | "ETHEREUM"
  >("CARTAO_CREDITO");

  const paymentOptions = [
    { label: "Cartão de Crédito", value: "CARTAO_CREDITO" },
    { label: "Cartão de Débito", value: "CARTAO_DEBITO" },
    { label: "Boleto", value: "BOLETO" },
    { label: "Pix", value: "PIX" },
    { label: "Bitcoin", value: "BITCOIN" },
    { label: "Ethereum", value: "ETHEREUM" },
  ];

  const loadData = async () => {
    const response = await addressService.findAll();
    if (response.status === 200 && response.data) {
      setAddresses(response.data as IAddress[]);
    } else {
      toast.current?.show({
        severity: "error",
        summary: "Erro",
        detail: "Falha ao buscar Endereços. Tente novamente.",
        life: 3000,
      });
    }
  };

  const buildItemSale = (): IItemSale[] => {
    return products.map((product) => {
      const cartItem = cart.find((c) => c.productId === product.id);
      return {
        product,
        quantity: cartItem?.quantity || 1,
      };
    });
  };

  useEffect(() => {
    const calcularFrete = async () => {
      if (!selectedAddress?.cep) {
        setFrete(null);
        return;
      }

      try {
        const response = await FreteService.calcularFrete(selectedAddress.cep);
        if (response.success && response.data) {
          setFrete(response.data as unknown as number);
        } else {
          setFrete(null);
          toast.current?.show({
            severity: "warn",
            summary: "Aviso",
            detail: "Não foi possível calcular o frete para o CEP selecionado.",
            life: 3000,
          });
        }
      } catch {
        setFrete(null);
        toast.current?.show({
          severity: "error",
          summary: "Erro",
          detail: "Erro ao calcular o frete.",
          life: 3000,
        });
      }
    };

    calcularFrete();
  }, [selectedAddress]);

  const totalProdutos = products.reduce((acc, product) => {
    const item = cart.find((p) => p.productId === product.id);
    const quantity = item?.quantity || 1;
    return acc + product.price * quantity;
  }, 0);

  const totalGeral = totalProdutos + (frete ? frete : 0);

  const onSubmit = async (sale: ISale): Promise<boolean> => {
    try {
      const response = await saleService.save(sale);
      if (response.status === 200 && response.data) {
        clearCart();
        return true;
      } else {
        toast.current?.show({
          severity: "error",
          summary: "Erro",
          detail: "Falha ao salvar o pedido. Tente novamente.",
          life: 3000,
        });
        return false;
      }
    } catch (error) {
      toast.current?.show({
        severity: "error",
        summary: "Erro",
        detail: "Erro inesperado. Tente novamente.",
        life: 3000,
      });
      return false;
    }
  };

  const handleFinalize = async () => {
    if (!selectedAddress) {
      toast.current?.show({
        severity: "warn",
        summary: "Aviso",
        detail: "Selecione um endereço antes de finalizar a compra.",
        life: 3000,
      });
      return;
    }

    const items = buildItemSale();

    const createSale: ISale = {
      saleDate: new Date().toISOString(),
      total: totalProdutos + (frete || 0),
      payment_method: paymentMethod,
      address: selectedAddress as IAddress,
      saleItems: items,
    };

    const success = await onSubmit(createSale);
    if (success) {
      toast.current?.show({
        severity: "success",
        summary: "Pedido Realizado",
        detail: `Pedido realizado com sucesso!`,
        life: 2000,
      });
      setTimeout(() => {
        navigate("/user-sales");
      }, 2000);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="flex flex-col md:flex-row justify-center gap-6 p-3">
      <Toast ref={toast} />

      <div className="bg-[#111827] w-full md:w-1/2 p-5 rounded-xl">
        <h1 className="text-white text-xl mb-6">Endereço de Entrega</h1>
        <div className="flex flex-col items-center gap-4">
          {addresses.map((addr) => (
            <div
              key={addr.id}
              className="flex items-center gap-3 p-3 rounded-lg w-full max-w-xl"
            >
              <RadioButton
                inputId={`address-${addr.id}`}
                name="address"
                value={addr}
                onChange={(e) => setSelectedAddress(e.value)}
                checked={selectedAddress?.id === addr.id}
              />
              <label
                htmlFor={`address-${addr.id}`}
                className="w-full cursor-pointer"
              >
                <AddressCard address={addr} />
              </label>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-6">
          <AddressModal
            toast={toast}
            visible={visible}
            onHide={() => {
              setVisible(false);
              loadData();
            }}
          />
          <Button
            label="Adicionar novo endereço"
            icon="pi pi-plus"
            onClick={() => setVisible(true)}
            className="mt-3"
          />
        </div>
      </div>

      <div className="bg-[#111827] w-full md:w-1/2 p-5 rounded-xl flex flex-col items-center">
        <h1 className="text-white text-xl mb-6">Resumo do Pedido</h1>
        <div className="flex flex-col w-full items-center max-w-xl">
          {products.map((product) => (
            <ProductCartCard key={product.id} product={product} />
          ))}

          <div className="mt-4 w-full">
            <p className="text-white mb-2">Forma de pagamento</p>
            <Dropdown
              value={paymentMethod}
              options={paymentOptions}
              onChange={(e) => setPaymentMethod(e.value)}
              placeholder="Selecione um método"
              className="w-full text-white"
              style={{
                backgroundColor: "#1F2937",
                color: "#fff",
                border: "none",
              }}
            />
          </div>

          <div className="bg-[#1F2937] flex justify-between w-full h-12 items-center mt-5 rounded-sm px-4 text-white font-semibold text-lg">
            <span>Frete:</span>
            <span>R$ {frete ?? "0.00"}</span>
          </div>

          <div className="bg-[#1F2937] flex justify-between w-full h-12 items-center mt-3 rounded-sm px-4 text-white font-semibold text-lg">
            <span>Total:</span>
            <span>R$ {totalGeral.toFixed(2)}</span>
          </div>

          <hr className="border-gray-600 w-full my-6" />

          <div className="w-full">
            <Button
              label="Finalizar Compra"
              className="w-full"
              style={{ backgroundColor: "green", border: "none" }}
              disabled={!selectedAddress}
              onClick={handleFinalize}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
