import type { IProduct } from "@/commons/types";
import { Cart } from "@/components/cart";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/hooks/use-auth";
import ProductService from "@/services/product-service";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Galleria } from "primereact/galleria";
import { Toast } from "primereact/toast";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./style.css";

export default function ProductPage() {
  const [product, setProduct] = useState<IProduct>({} as IProduct);
  const { id } = useParams();
  const toast = useRef<Toast>(null);
  const [visible, setVisible] = useState(false);
  const [images, setImages] = useState<{ itemImageSrc: string }[]>([]);
  const { authenticated } = useAuth();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      loadData(Number(id));
    }
  }, []);

  const loadData = async (id: number) => {
    try {
      const response = await ProductService.findById(id);
      if (response.status === 200) {
        const data = response.data as IProduct;
        setProduct(data);
        const imageList = [data.img, data.img2, data.img3]
          .filter(Boolean)
          .map((src) => {
            if (src.startsWith("http") || src.startsWith("https")) {
              return { itemImageSrc: src };
            }
            let localPath = src.replace(/^public\//, "");
            if (!localPath.startsWith("/")) localPath = "/" + localPath;
            return { itemImageSrc: localPath };
          });

        setImages(imageList);
      } else {
        throw new Error("Erro ao buscar produto");
      }
    } catch (error) {
      console.error("Erro ao carregar produto:", error);
      toast.current?.show({
        severity: "error",
        summary: "Erro",
        detail: "Não foi possível carregar o produto.",
        life: 3000,
      });
    }
  };

  const desconto = product.price * 0.1;
  const idProduct = product.id || 0;

  const itemTemplate = (item: { itemImageSrc: string }) => (
    <img
      src={item.itemImageSrc}
      alt="Produto"
      className="w-full h-[400px] rounded-xl object-cover"
      style={{ maxWidth: "100%" }}
    />
  );

  const thumbnailTemplate = (item: { itemImageSrc: string }) => (
    <img
      src={item.itemImageSrc}
      alt="Miniatura"
      className="w-[80px] h-[80px] rounded-md object-cover"
    />
  );

  return (
    <div className="flex justify-center items-start min-h-screen bg-[#111827] py-10 px-4">
      <Toast ref={toast} />
      <div className="w-full max-w-6xl bg-[#1F2937] rounded-2xl shadow-lg p-6 flex flex-col gap-6">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="w-full lg:w-1/2 flex justify-center items-center">
            <Galleria
              value={images}
              numVisible={5}
              circular
              style={{ maxWidth: "100%" }}
              showItemNavigators
              item={itemTemplate}
              showThumbnails
              thumbnail={thumbnailTemplate}
            />
          </div>

          <div className="w-full lg:w-1/2 flex flex-col justify-start gap-2">
            <h1 className="text-2xl font-bold text-blue-500">{product.name}</h1>
            <p className="text-gray-500 text-sm">
              {product.brand?.name ?? "Sem marca"}
            </p>
            <p className="line-through text-gray-500">
              R$ {product.price?.toFixed(2)}
            </p>
            <p className="text-2xl font-semibold text-emerald-500">
              R$ {(product.price - desconto).toFixed(2)}
            </p>
            <p className="text-white bg-emerald-500 w-fit rounded-[10px] p-1 text-xs">
              em pagamentos por criptomoedas
            </p>
            <p className="text-emerald-500 text-sm">
              Economize R$ {desconto.toFixed(2)}!
            </p>

            <Button
              label="ver formas de pagamento"
              icon="pi pi-credit-card"
              style={{
                background: "none",
                border: "none",
                color: "blue",
                fontSize: "14px",
                padding: "0",
                boxShadow: "none",
                textDecoration: "underline",
                width: "fit-content",
              }}
              onClick={() => setVisible(true)}
            />

            <Dialog
              header="Formas de Pagamento"
              visible={visible}
              style={{ width: "400px" }}
              onHide={() => setVisible(false)}
            >
              <div className="flex items-center">
                <i className="m-3 pi pi-bitcoin text-amber-500"></i>
                <div className="flex space-x-2">
                  <p>Bitcoin</p>
                  <p className="text-emerald-500">- Com desconto especial!</p>
                </div>
              </div>
              <div className="flex items-center">
                <i className="m-3 pi pi-ethereum text-cyan-800"></i>
                <div className="flex space-x-2">
                  <p>Ethereum</p>
                  <p className="text-emerald-500">- Com desconto especial!</p>
                </div>
              </div>
              <hr className="my-3" />
              <div className="flex items-center">
                <i className="m-3 pi pi-credit-card text-blue-400"></i>
                <p>Cartão de Crédito</p>
              </div>
              <div className="flex items-center">
                <i className="m-3 pi pi-barcode"></i>
                <p>Boleto</p>
              </div>
              <div className="flex items-center">
                <i className="m-3 pi pi-qrcode text-emerald-500"></i>
                <p>Pix</p>
              </div>
            </Dialog>

            <div className="flex flex-col mt-4 gap-2">
              <Button
                label="Comprar Agora"
                icon="pi pi-bolt"
                style={{ width: "220px", fontSize: "15px" }}
                onClick={() => {
                  if (!authenticated) {
                    toast.current?.show({
                      severity: "warn",
                      summary: "Atenção",
                      detail: "Você precisa estar logado para comprar.",
                      life: 3000,
                    });
                    return;
                  }

                  addToCart({ productId: idProduct, quantity: 1 });
                  toast.current?.show({
                    severity: "success",
                    summary: "Adicionado ao carrinho",
                    detail: `${product.name} foi adicionado com sucesso!`,
                    life: 3000,
                  });
                  setTimeout(() => {
                    navigate("/sale-page");
                  }, 1000);
                }}
              />

              <Button
                label="Adicionar ao carrinho"
                icon="pi pi-cart-minus"
                onClick={() => {
                  if (!authenticated) {
                    toast.current?.show({
                      severity: "warn",
                      summary: "Atenção",
                      detail:
                        "Você precisa estar logado para adicionar ao carrinho.",
                      life: 3000,
                    });
                    return;
                  }

                  addToCart({ productId: idProduct, quantity: 1 });
                  toast.current?.show({
                    severity: "success",
                    summary: "Adicionado ao carrinho",
                    detail: `${product.name} foi adicionado com sucesso!`,
                    life: 3000,
                  });
                }}
                style={{
                  width: "220px",
                  fontSize: "14px",
                  backgroundColor: "#CDE1EE",
                  border: "none",
                  color: "#3B82F6",
                }}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 ">
          <div className=" rounded-xl shadow-gray-600 shadow-sm  p-4 bg-[#1F2937]">
            <h2 className="font-bold text-lg mb-2 text-white">
              Descrição do Produto
            </h2>
            <p className="text-white">{product.description}</p>
          </div>

          <div className=" bg-[#1F2937]  rounded-xl shadow-gray-600 shadow-sm p-4">
            <h2 className="font-bold text-lg text-white mb-4">
              Informações Técnicas
            </h2>
            <table className="w-full text-sm text-white bg-[#1F2937] ">
              <tbody>
                <tr className="border-b">
                  <td className="py-2 font-medium">Marca</td>
                  <td className="py-2">{product.brand?.name ?? "Sem marca"}</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 font-medium">Modelo</td>
                  <td className="py-2">{product.name}</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 font-medium">Tipo de Conector</td>
                  <td className="py-2">{product.conection_type}</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 font-medium">Conectividade</td>
                  <td className="py-2">Bluetooth, USB-C</td>
                </tr>
                <tr>
                  <td className="py-2 font-medium">Dimensões</td>
                  <td className="py-2">{product.size}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Cart />
    </div>
  );
}
