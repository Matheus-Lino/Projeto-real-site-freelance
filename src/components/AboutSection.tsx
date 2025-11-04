import { TrendingDown, Shield, Truck, ShoppingBag } from "lucide-react";

export function AboutSection() {
  const features = [
    {
      icon: TrendingDown,
      title: "Descontos Exclusivos",
      description: "Até 70% OFF em marcas famosas",
    },
    {
      icon: Shield,
      title: "Produtos Originais",
      description: "100% autênticos e garantidos",
    },
    {
      icon: Truck,
      title: "Entrega Rápida",
      description: "Receba em casa com segurança",
    },
    {
      icon: ShoppingBag,
      title: "Variedade",
      description: "Milhares de produtos disponíveis",
    },
  ];

  return (
    <section id="sobre" className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Sobre o Outlet Machado
          </h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto mb-6"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <p className="text-gray-700 mb-6 leading-relaxed">
              O <strong>Outlet Machado</strong> nasceu com a missão de democratizar o acesso a produtos de marcas
              famosas e premium. Acreditamos que todos merecem usar produtos de qualidade sem comprometer o
              orçamento.
            </p>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Nossa equipe trabalha incansavelmente para trazer as melhores ofertas em roupas, calçados,
              acessórios, óculos e perfumes das marcas mais desejadas do mercado. Cada produto é cuidadosamente
              selecionado para garantir autenticidade e qualidade.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Com anos de experiência no varejo, conquistamos a confiança de milhares de clientes em todo o
              Brasil. Venha fazer parte da nossa história e descubra o prazer de comprar com desconto sem abrir
              mão do estilo!
            </p>
          </div>

          <div className="rounded-lg overflow-hidden shadow-xl">
            <img
              src="src/img/file_000000008b6c720e968594c912e813c8.png"
              alt="Equipe Outlet Machado"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 text-center bg-white rounded-lg shadow hover:shadow-lg transition-shadow"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                <feature.icon className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
