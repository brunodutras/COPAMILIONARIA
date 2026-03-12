/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Trophy, 
  CheckCircle2, 
  ChevronDown, 
  Play, 
  ShieldCheck, 
  Zap, 
  Users, 
  TrendingUp,
  Star,
  Lock,
  ArrowRight,
  Clock,
  Package,
  Globe,
  DollarSign,
  Truck,
  BookOpen,
  Mic,
  MessageSquare,
  Target,
  RefreshCw,
  VolumeX
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const FAQItem = ({ 
  question, 
  answer, 
  isOpen, 
  onToggle 
}: { 
  question: string, 
  answer: string, 
  isOpen: boolean, 
  onToggle: () => void 
}) => {
  return (
    <div className="border-b border-white/10 py-4">
      <button 
        onClick={onToggle}
        className="flex w-full items-center justify-between text-left focus:outline-none"
      >
        <span className="text-lg font-medium text-white/90">{question}</span>
        <ChevronDown className={`h-5 w-5 text-yellow-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="mt-2 text-white/60 leading-relaxed">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const BenefitCard = ({ icon: Icon, title, description }: { icon: any, title: string, description: string }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="bg-[#151515] p-8 rounded-2xl border border-white/5 hover:border-yellow-500/30 transition-all"
  >
    <div className="h-12 w-12 bg-yellow-500/10 rounded-xl flex items-center justify-center mb-6">
      <Icon className="h-6 w-6 text-yellow-500" />
    </div>
    <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
    <p className="text-white/60 text-sm leading-relaxed">{description}</p>
  </motion.div>
);

export default function App() {
  const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 minutes countdown
  const [openFAQIndex, setOpenFAQIndex] = useState<number | null>(null);
  const [videoStarted, setVideoStarted] = useState(false);

  const handleUnmute = () => {
    const wistiaApi = (window as any).Wistia;
    const video = wistiaApi ? wistiaApi.api("in44uqsuiz") : null;

    if (!videoStarted) {
      setVideoStarted(true);
      
      // Tenta desmutar e reiniciar via API para ser instantâneo
      if (video) {
        video.unmute();
        video.volume(1);
        video.time(0); // Volta para o início
        video.play();
      }

      // Garante que o comando entre na fila do Wistia
      const _wq = (window as any)._wq || [];
      _wq.push({
        id: "in44uqsuiz",
        onReady: (v: any) => {
          v.unmute();
          v.volume(1);
          v.time(0); // Volta para o início
          v.play();
        },
      });
    } else {
      // Se já começou, apenas alterna entre play e pause sem reiniciar
      if (video) {
        if (video.state() === "playing") {
          video.pause();
        } else {
          video.play();
        }
      }
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-sans selection:bg-yellow-500 selection:text-black">
      {/* Top Bar */}
      <div className="bg-yellow-500 text-black py-2 md:py-3 text-center text-xs md:text-sm font-bold uppercase tracking-wider md:tracking-widest px-4">
        APROVEITE AGORA, O PREÇO VAI SUBIR!
      </div>

      {/* Header */}
      <header className="container mx-auto px-6 py-8 flex justify-center items-center">
        <div className="flex items-center gap-2">
          <Trophy className="h-8 w-8 text-yellow-500" />
          <span className="text-xl font-black tracking-tighter uppercase italic">COPA MILIONÁRIA</span>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-6 pt-8 pb-12 md:pt-12 md:pb-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-2xl md:text-6xl font-black mb-8 leading-[1.2] md:leading-[1.1] tracking-tight max-w-4xl mx-auto italic uppercase px-2">
            DESCUBRA COMO IMPORTAR <br />
            <span className="text-yellow-500">CAMISAS DE TIME</span> <br />
            POR PREÇO DE FÁBRICA <br />
            E REVENDER NO BRASIL <br />
            LUCRANDO ATÉ <span className="text-yellow-500">3X NESTA COPA</span>
          </h1>
        </motion.div>

        {/* VSL Video */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="relative max-w-5xl mx-auto bg-black rounded-xl border border-white/10 overflow-hidden shadow-2xl shadow-yellow-500/10 group cursor-pointer"
          onClick={handleUnmute}
        >
          {/* Wistia Native Inline Embed */}
          <div className="wistia_responsive_padding" style={{padding:'56.25% 0 0 0',position:'relative'}}>
            <div className="wistia_responsive_wrapper" style={{height:'100%',left:0,position:'absolute',top:0,width:'100%'}}>
              <div className="wistia_embed wistia_async_in44uqsuiz videoFoam=true playerColor=eab308 autoPlay=true silentAutoplay=true controlBar=false playbar=false settingsControl=false smallPlayButton=false volumeControl=false fullscreenButton=false branding=false playButton=false playbackRateControl=false" style={{height:'100%',position:'relative',width:'100%'}}>
                <div className="wistia_swatch" style={{height:'100%',left:0,opacity:0,overflow:'hidden',position:'absolute',top:0,transition:'opacity 200ms',width:'100%'}}>
                  <img 
                    src="https://fast.wistia.com/embed/medias/in44uqsuiz/swatch" 
                    style={{filter:'blur(5px)',height:'100%',objectFit:'contain',width:'100%'}} 
                    alt="" 
                    aria-hidden="true" 
                    onLoad={(e) => (e.currentTarget.parentElement!.style.opacity='1')}
                    fetchPriority="high"
                    decoding="async"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Camada invisível para garantir o clique em toda a área */}
          <div className="absolute inset-0 z-10 cursor-pointer" />

          {!videoStarted && (
            <div className="absolute inset-0 bg-black/20 flex flex-col items-center justify-center z-20 transition-all group-hover:bg-black/10">
               <div className="bg-yellow-500 text-black px-5 py-3 rounded-full flex items-center gap-3 shadow-2xl shadow-yellow-500/50 animate-bounce cursor-pointer hover:scale-105 transition-transform">
                 <VolumeX className="h-5 w-5 animate-pulse" />
                 <span className="font-black text-base md:text-lg uppercase tracking-tighter italic">
                   Clique para ouvir
                 </span>
               </div>
               
               <div className="absolute bottom-8 left-0 right-0 flex justify-center">
                 <div className="bg-black/80 backdrop-blur-md border border-white/20 px-4 py-2 rounded-lg flex items-center gap-2">
                   <div className="w-2 h-2 bg-red-600 rounded-full animate-ping" />
                   <span className="text-white text-xs font-bold uppercase tracking-widest">O vídeo já começou!</span>
                 </div>
               </div>
            </div>
          )}
        </motion.div>

        <div className="mt-8">
          <button 
            onClick={() => document.getElementById('oferta')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-yellow-500 hover:bg-yellow-400 text-black px-6 py-2.5 rounded-full font-black text-sm md:text-base uppercase tracking-tight transition-all hover:scale-105 active:scale-95 shadow-lg shadow-yellow-500/20 flex items-center justify-center mx-auto"
          >
            quero entrar!
          </button>
        </div>
      </section>

      {/* Why Buy Section */}
      <section className="bg-white/[0.02] border-y border-white/5 py-12 md:py-24 optimize-render">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 px-4">
            <h2 className="text-xl md:text-4xl font-black mb-6 italic uppercase leading-tight">POR QUE DEVO COMPRAR ESSE TREINAMENTO?</h2>
            <p className="text-white/60 max-w-2xl mx-auto px-4 text-xs md:text-sm">Porque tentar descobrir tudo sozinho pode custar muito mais tempo, dinheiro e oportunidades, principalmente com a Copa chegando.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-[#151515] p-8 rounded-3xl border border-white/5 hover:border-yellow-500/30 transition-all group">
              <div className="h-12 w-12 bg-yellow-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <TrendingUp className="h-6 w-6 text-yellow-500" />
              </div>
              <h3 className="text-lg font-bold mb-3 uppercase italic">Você lucra com o que já ama</h3>
              <p className="text-white/50 leading-relaxed text-xs">Você já fala de camisa, já conhece os times, já sente a emoção do jogo. Aqui você aprende a transformar esse conhecimento em dinheiro real. Nossos alunos faturam em média R$2.000 no primeiro mês.</p>
            </div>
            <div className="bg-[#151515] p-8 rounded-3xl border border-white/5 hover:border-yellow-500/30 transition-all group">
              <div className="h-12 w-12 bg-yellow-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <DollarSign className="h-6 w-6 text-yellow-500" />
              </div>
              <h3 className="text-lg font-bold mb-3 uppercase italic">Você começa com pouco</h3>
              <p className="text-white/50 leading-relaxed text-xs">Eu mesmo comecei com R$100 no primeiro pedido. Ensinamos a testar a demanda com poucas peças e só escalar quando o lucro já entrou.</p>
            </div>
            <div className="bg-[#151515] p-8 rounded-3xl border border-white/5 hover:border-yellow-500/30 transition-all group">
              <div className="h-12 w-12 bg-yellow-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Zap className="h-6 w-6 text-yellow-500" />
              </div>
              <h3 className="text-lg font-bold mb-3 uppercase italic">Não é teoria, é operação real</h3>
              <p className="text-white/50 leading-relaxed text-xs">Você aprende um modelo simples: compra pequena → vende rápido → escala com lucro. Sem estoque parado. Sem risco desnecessário.</p>
            </div>
            <div className="bg-[#151515] p-8 rounded-3xl border border-white/5 hover:border-yellow-500/30 transition-all group">
              <div className="h-12 w-12 bg-yellow-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Clock className="h-6 w-6 text-yellow-500" />
              </div>
              <h3 className="text-lg font-bold mb-3 uppercase italic">Você constrói algo que dura além da Copa</h3>
              <p className="text-white/50 leading-relaxed text-xs">Não é sobre vender só em junho. É sobre montar uma operação que funciona o ano inteiro, Copa ou não.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="container mx-auto px-6 py-12 md:py-24 optimize-render">
        <div className="text-center mb-16 px-4">
          <h2 className="text-2xl md:text-5xl font-black mb-6 italic uppercase leading-tight">O QUE VOCÊ VAI APRENDER?</h2>
          <p className="text-white/60 max-w-xl mx-auto px-4 text-sm md:text-base">O passo a passo completo para construir um negócio lucrativo de importação de mantos sagrados.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <BenefitCard 
            icon={BookOpen}
            title="Aulas 100% Didáticas"
            description="Conteúdo estruturado passo a passo, direto ao ponto e focado em execução. Do primeiro pedido até a primeira venda."
          />
          <BenefitCard 
            icon={Mic}
            title="Calls Ao Vivo"
            description="Encontros para tirar dúvidas, ajustar sua operação e acelerar seus resultados com quem já faz isso na prática."
          />
          <BenefitCard 
            icon={MessageSquare}
            title="Script de Atendimento Exclusivo"
            description="Respostas prontas para cada etapa da venda, do primeiro contato até o pagamento. É só copiar e usar."
          />
          <BenefitCard 
            icon={Target}
            title="Suporte Individual"
            description="Acesso direto a mim para tirar dúvidas, ajustar sua operação e garantir que você não trave em nenhuma etapa."
          />
          <BenefitCard 
            icon={Users}
            title="Grupo de Networking"
            description="Comunidade ativa para troca de experiências, parcerias e crescimento conjunto."
          />
          <BenefitCard 
            icon={RefreshCw}
            title="Atualizações Incluídas"
            description="Novos fornecedores, novas estratégias e melhorias adicionadas continuamente. Você paga uma vez e fica atualizado para sempre."
          />
        </div>
      </section>

      {/* Results / Social Proof */}
      <section className="bg-[#151515] py-12 md:py-24 overflow-hidden optimize-render">
        <div className="container mx-auto px-6 mb-16">
          <div className="text-center md:text-left px-4 md:px-0">
            <h2 className="text-2xl md:text-6xl font-black mb-4 italic leading-tight uppercase">RESULTADOS REAIS DOS NOSSOS ALUNOS</h2>
            <p className="text-white/60 max-w-2xl px-4 md:px-0 text-sm md:text-base">Veja com seus próprios olhos o que acontece quando você aplica o método correto de importação e vendas.</p>
          </div>
        </div>
        
        <div className="relative">
          <div className="flex animate-marquee gap-4 md:gap-6 pb-8">
            {[...Array(2)].map((_, setIndex) => (
              <React.Fragment key={setIndex}>
                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                  <motion.div 
                    key={`${setIndex}-${i}`} 
                    whileHover={{ y: -10 }}
                    className="flex-none w-[260px] md:w-[300px] relative group overflow-hidden rounded-2xl border border-white/10 aspect-[9/16] bg-black/40 shadow-2xl"
                  >
                    <img 
                      src={i === 1 ? 'https://i.imgur.com/z9kSPkR.png' : i === 2 ? 'https://i.imgur.com/u2h2cML.png' : i === 3 ? 'https://i.imgur.com/OluHSMh.png' : i === 4 ? 'https://i.imgur.com/BAuxPx0.png' : i === 5 ? 'https://i.imgur.com/JpikshW.png' : i === 6 ? 'https://i.imgur.com/AEXvIZd.png' : i === 7 ? 'https://i.imgur.com/u1GoCvp.png' : i === 8 ? 'https://i.imgur.com/jiAF9nQ.png' : `https://picsum.photos/seed/testimonial-${i}/400/711`} 
                      alt={`Resultado ${i}`} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      decoding="async"
                      width="300"
                      height="533"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                      <p className="text-sm font-bold uppercase tracking-tighter italic text-yellow-500">Resultado Aluno #{i}</p>
                    </div>
                  </motion.div>
                ))}
              </React.Fragment>
            ))}
          </div>
          
          {/* Gradient Overlays for smooth fade */}
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#151515] to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#151515] to-transparent z-10 pointer-events-none" />
        </div>
      </section>

      {/* Offer Section */}
      <section id="oferta" className="container mx-auto px-6 py-12 md:py-24 text-center optimize-render">
        <div className="max-w-3xl mx-auto bg-[#151515] rounded-[2.5rem] p-6 md:p-16 border border-yellow-500/20 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <Trophy className="h-32 w-32 text-yellow-500" />
          </div>
          
          <h2 className="text-2xl md:text-5xl font-black mb-12 italic uppercase leading-tight">Método Copa Milionária</h2>
          
          <div className="flex flex-col items-center mb-8 px-4">
            <span className="text-white/40 line-through text-lg md:text-xl mb-2">De R$ 297,00 por</span>
            <div className="flex items-baseline gap-2">
              <span className="text-5xl md:text-8xl font-black text-yellow-500 tracking-tighter italic">R$ 97,90</span>
            </div>
            <span className="text-white/60 mt-4 font-medium text-sm md:text-base">ou 12x de 10,03 no cartão</span>
          </div>

          <p className="text-white/80 text-sm md:text-base mb-8 font-medium max-w-md mx-auto leading-relaxed">
            Acesso completo à lista de fornecedores, curso e scripts para vender na COPA do zero até +1K/dia.
          </p>

          <a 
            href="https://pay.kirvano.com/7809df60-a884-42db-ad0a-8524a62ecb11"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full max-w-sm mx-auto bg-yellow-500 hover:bg-yellow-400 text-black py-4 rounded-xl font-black text-lg uppercase tracking-tight transition-all hover:scale-[1.02] shadow-xl shadow-yellow-500/20 mb-8 text-center"
          >
            Quero Garantir meu acesso
          </a>

          <div className="w-full h-px bg-white/5 mb-8"></div>

          <h3 className="text-white/60 text-xs md:text-sm font-bold uppercase tracking-[0.2em] mb-6">Acesso vitalício ao treinamento</h3>

          <div className="space-y-4 max-w-md mx-auto text-left px-6 md:px-0">
            <div className="flex items-center gap-4 text-white/80 text-sm md:text-base">
              <div className="w-2 h-2 rounded-full bg-yellow-500 shrink-0" />
              <span>Lista VIP de Fornecedores Thai 1:1 — acesso vitalício</span>
            </div>
            <div className="flex items-center gap-4 text-white/80 text-sm md:text-base">
              <div className="w-2 h-2 rounded-full bg-yellow-500 shrink-0" />
              <span>Curso de Vendas no Instagram e TikTok</span>
            </div>
            <div className="flex items-center gap-4 text-white/80 text-sm md:text-base">
              <div className="w-2 h-2 rounded-full bg-yellow-500 shrink-0" />
              <span>Script de Atendimento de Alta Conversão</span>
            </div>
            <div className="flex items-center gap-4 text-white/80 text-sm md:text-base">
              <div className="w-2 h-2 rounded-full bg-yellow-500 shrink-0" />
              <span>Garantia incondicional de 7 dias</span>
            </div>
          </div>
        </div>
      </section>

      {/* Guarantee Section */}
      <section className="bg-white/[0.02] border-y border-white/5 py-16 optimize-render">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-8 md:gap-16">
            <div className="flex-none">
              <div className="relative">
                <div className="absolute inset-0 bg-yellow-500/20 blur-3xl rounded-full" />
                <div className="w-32 h-32 md:w-48 md:h-48 bg-[#151515] rounded-full border-4 border-yellow-500/30 flex items-center justify-center relative z-10">
                  <div className="text-center">
                    <span className="block text-4xl md:text-6xl font-black text-yellow-500 italic leading-none">7</span>
                    <span className="block text-xs md:text-sm font-bold uppercase tracking-widest text-white/60">Dias de</span>
                    <span className="block text-xs md:text-sm font-bold uppercase tracking-widest text-white/60">Garantia</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center md:text-left px-4 md:px-0">
              <h2 className="text-2xl md:text-5xl font-black mb-4 italic uppercase tracking-tighter leading-tight">RISCO ZERO: GARANTIA TOTAL</h2>
              <p className="mt-4 text-white/40 text-xs md:text-sm font-bold uppercase tracking-widest flex items-center justify-center md:justify-start gap-2 px-2 md:px-0">
                Compra segura. Pagamento criptografado.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="container mx-auto px-6 py-12 md:py-24 max-w-3xl optimize-render">
        <h2 className="text-2xl font-black mb-12 text-center italic uppercase">PERGUNTAS FREQUENTES</h2>
        <div className="space-y-2">
          <FAQItem 
            question="Nunca vendi nada na vida. Consigo aplicar esse método?"
            answer="Sim. O curso foi pensado exatamente para quem está começando do zero. Você vai receber scripts prontos de atendimento e um passo a passo de como fechar sua primeira venda no Instagram ou TikTok, sem precisar aparecer ou ter seguidores."
            isOpen={openFAQIndex === 0}
            onToggle={() => setOpenFAQIndex(openFAQIndex === 0 ? null : 0)}
          />
          <FAQItem 
            question="Quanto preciso para começar?"
            answer="Pouco. Eu mesmo comecei com R$100 no primeiro pedido. Ensinamos a testar a demanda com poucas peças primeiro e só aumentar o estoque quando as vendas já estiverem acontecendo."
            isOpen={openFAQIndex === 1}
            onToggle={() => setOpenFAQIndex(openFAQIndex === 1 ? null : 1)}
          />
          <FAQItem 
            question="Como sei que vou ter lucro de verdade?"
            answer="Eu mesmo comecei com R$100. Ensinamos a fazer sua primeira compra pequena, testar a demanda e só escalar depois que o dinheiro já voltou. A maioria dos alunos aplicados vê os primeiros resultados ainda na primeira semana."
            isOpen={openFAQIndex === 2}
            onToggle={() => setOpenFAQIndex(openFAQIndex === 2 ? null : 2)}
          />
          <FAQItem 
            question="Quanto tempo até ver resultado?"
            answer="Alunos que aplicam o método na primeira semana já relatam as primeiras vendas antes de 7 dias. Não é promessa: é o que acontece quando você segue o passo a passo e usa os scripts que entregamos prontos."
            isOpen={openFAQIndex === 3}
            onToggle={() => setOpenFAQIndex(openFAQIndex === 3 ? null : 3)}
          />
          <FAQItem 
            question="Como funciona o suporte individual?"
            answer="Você terá acesso direto ao meu WhatsApp pessoal para enviar dúvidas, discutir projetos e realizar networking sempre que precisar. O suporte é feito por mim, de forma direta e sem intermediações."
            isOpen={openFAQIndex === 4}
            onToggle={() => setOpenFAQIndex(openFAQIndex === 4 ? null : 4)}
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12 bg-black">
        <div className="container mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-8">
            <Trophy className="h-6 w-6 text-yellow-500" />
            <span className="text-lg font-black tracking-tighter uppercase italic">COPA MILIONÁRIA</span>
          </div>
          <p className="mt-12 text-white/10 text-[10px] uppercase tracking-widest">
            © 2026 | Todos os direitos reservados.
          </p>
        </div>
      </footer>

    </div>
  );
}
