export default function Footer() {
  return (
    <>
      <footer className="mt-5 w-full bg-gray-800 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="flex flex-col items-start">
            <img
              className="size-40"
              src="/img/Logo.png"
              alt="Logo SafeCrypto"
            />
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Institucional</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#" className="hover:text-white hover:underline">
                  Sobre Nós
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white hover:underline">
                  Nossas Lojas
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white hover:underline">
                  Trabalhe Conosco
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Atendimento</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#" className="hover:text-white hover:underline">
                  Fale Conosco
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white hover:underline">
                  Dúvidas Frequentes
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white hover:underline">
                  Política de Privacidade
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Formas de Pagamento</h3>
            <div className="flex flex-wrap gap-4 items-center text-4xl">
              <i
                className="pi pi-credit-card"
                title="Cartão de Crédito (Visa, Master, Elo)"
              ></i>
              <i className="pi pi-qrcode" title="Pix"></i>
              <i className="pi pi-ticket" title="Boleto"></i>
              <i className="pi pi-bitcoin" title="Bitcoin"></i>
              <i className="pi pi-ethereum" title="Ethereum"></i>
            </div>
          </div>
        </div>
      </footer>

      <div className=" w-full bg-gray-900 py-4 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto text-center text-gray-500 text-sm">
          <p className="underline">
            2025 SafeCrypto | CNPJ: 12.345.678/0001-00
          </p>
          <p>Todos os direitos reservados.</p>
        </div>
      </div>
    </>
  );
}
