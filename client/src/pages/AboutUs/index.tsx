export function AboutUs() {
  return (
    <div className="text-slate-300">
      <main className="container mx-auto px-6 py-16 md:py-24">
        <section className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-4">
            Apaixonados por{" "}
            <span className="text-cyan-400">Tecnologia e Inovação</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-400 mb-8">
            Somos uma equipa dedicada a criar soluções digitais que transformam
            a experiência dos nossos usuários. Nosso foco é desenvolver produtos
            de alta qualidade, que sejam intuitivos, seguros e eficientes.
          </p>
          <p className="text-md text-slate-500">
            Fundada em 2025, a nossa empresa valoriza a transparência, a
            colaboração e o aprendizado contínuo. Acreditamos que o futuro da
            tecnologia está na união entre design e funcionalidade, sempre com o
            usuário no centro das decisões.
          </p>
        </section>

        <section className="mt-20 md:mt-28 max-w-3xl mx-auto">
          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8 md:p-12 text-center shadow-2xl shadow-slate-950/50">
            <div className="flex justify-center mb-6">
              <div className="bg-slate-800 p-4 rounded-full border border-slate-700">
                <i className="pi pi-bullseye"></i>
              </div>
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">Nossa Missão</h2>
            <p className="text-lg text-slate-400">
              Facilitar a vida das pessoas por meio da tecnologia, oferecendo
              serviços inovadores que conectam, informam e potencializam
              oportunidades para todos.
            </p>
          </div>
        </section>

        <section className="mt-16 md:mt-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8 shadow-2xl shadow-slate-950/50">
              <div className="flex items-center gap-4 mb-4">
                <i className="pi pi-eye"></i>
                <h3 className="text-2xl font-bold text-white">Nossa Visão</h3>
              </div>
              <p className="text-slate-400">
                Ser referência nacional em soluções tecnológicas inovadoras e
                acessíveis, impactando positivamente a sociedade.
              </p>
            </div>

            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8 shadow-2xl shadow-slate-950/50">
              <div className="flex items-center gap-4 mb-4">
                <i className="pi pi-bitcoin "></i>
                <h3 className="text-2xl font-bold text-white">
                  Nossos Valores
                </h3>
              </div>
              <ul className="space-y-3 text-slate-400">
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-3 mt-1">✓</span> Inovação
                  contínua
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-3 mt-1">✓</span> Compromisso
                  com o usuário
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-3 mt-1">✓</span> Ética e
                  transparência
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-3 mt-1">✓</span> Trabalho em
                  equipe
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-3 mt-1">✓</span>{" "}
                  Responsabilidade socioambiental
                </li>
              </ul>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
