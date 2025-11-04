import { Phone, MapPin, Clock, MessageCircle } from "lucide-react";

export function ContactSection() {
  const whatsappNumber = "5515996030805";
  const whatsappMessage = encodeURIComponent(
    "Olá! Gostaria de saber mais sobre os produtos do Outlet Machado."
  );
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  const contactInfo = [
    {
      icon: Phone,
      title: "Telefone",
      content: "+55 (15) 99603-0805",
    },
    {
      icon: MapPin,
      title: "Localização",
      content: "São Miguel Arcanjo - SP",
    },
    {
      icon: Clock,
      title: "Horário de Atendimento",
      content: "Seg - Sex: 9h às 18h",
    },
  ];

  return (
    <section id="contato" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Entre em Contato
          </h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Tem alguma dúvida? Nossa equipe está pronta para ajudar você!
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {contactInfo.map((info, index) => (
            <div
              key={index}
              className="p-6 text-center bg-white rounded-lg shadow hover:shadow-lg transition-shadow"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 bg-blue-100 rounded-full mb-4">
                <info.icon className="h-7 w-7 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{info.title}</h3>
              <p className="text-gray-600">{info.content}</p>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 sm:p-12 text-center text-white shadow-xl">
          <MessageCircle className="h-16 w-16 mx-auto mb-6" />
          <h3 className="text-2xl sm:text-3xl font-bold mb-4">
            Fale conosco pelo WhatsApp
          </h3>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Tire suas dúvidas, faça perguntas sobre produtos ou simplesmente converse com nossa
            equipe. Estamos aqui para ajudar!
          </p>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-blue-600 hover:bg-gray-100 rounded-md shadow-lg transition-colors"
          >
            <MessageCircle className="h-5 w-5" />
            Abrir WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
