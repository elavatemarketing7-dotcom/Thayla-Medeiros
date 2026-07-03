import React, { useState } from "react";
import { 
  motion, 
  AnimatePresence 
} from "motion/react";
import { 
  Instagram, 
  Check, 
  ChevronRight, 
  ArrowRight, 
  MapPin, 
  Clock, 
  Phone, 
  Sparkles, 
  Play, 
  MessageCircle, 
  User, 
  Heart, 
  Star, 
  X, 
  Maximize2,
  Lock,
  Compass,
  Volume2,
  VolumeX
} from "lucide-react";
import { 
  EXPERT_INFO, 
  EXPERT_IMAGES, 
  VIDEO_DATA, 
  BEFORE_AFTER_GALLERY, 
  CORACAO_GALLERY, 
  COMMENTS_GALLERY, 
  QUIZ_QUESTIONS, 
  TRUST_CARDS, 
  STEP_BY_STEP 
} from "./data";

export default function App() {
  // Screen state: "WELCOME" | "QUIZ" | "ANALYZING" | "RESULT" | "MAIN"
  const [screenState, setScreenState] = useState<"WELCOME" | "QUIZ" | "ANALYZING" | "RESULT" | "MAIN">("WELCOME");
  
  // Quiz answers tracking
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  
  // Analyzing loading state progress
  const [analyzingProgress, setAnalyzingProgress] = useState(0);
  const [analyzingText, setAnalyzingText] = useState("Analisando perfil...");

  // Lightbox for galleries
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  // Video modal state
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(true);

  // Navigation scroll function
  const scrollToSection = (id: string) => {
    // If we're not on main screen, switch first
    if (screenState !== "MAIN") {
      setScreenState("MAIN");
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 300);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Quiz initiation
  const startQuiz = () => {
    setSelectedAnswers({});
    setCurrentQuestionIndex(0);
    setScreenState("QUIZ");
  };

  // Select option in quiz
  const handleSelectOption = (questionId: number, answerValue: string) => {
    const updatedAnswers = { ...selectedAnswers, [questionId]: answerValue };
    setSelectedAnswers(updatedAnswers);

    if (currentQuestionIndex < QUIZ_QUESTIONS.length - 1) {
      setTimeout(() => {
        setCurrentQuestionIndex(prev => prev + 1);
      }, 250);
    } else {
      // Last question completed, trigger loading animation
      setTimeout(() => {
        setScreenState("ANALYZING");
        runAnalyzingSimulation();
      }, 300);
    }
  };

  // Run the "Analisando..." loading bar animation
  const runAnalyzingSimulation = () => {
    setAnalyzingProgress(0);
    const steps = [
      "Avaliando perfil estético...",
      "Sincronizando com o Método Dra. Thayla Medeiros...",
      "Analisando simetria e objetivos faciais...",
      "Verificando compatibilidade de segurança...",
      "Gerando recomendação personalizada..."
    ];
    
    let currentStep = 0;
    const interval = setInterval(() => {
      setAnalyzingProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setScreenState("RESULT");
          }, 400);
          return 100;
        }
        
        // Change text based on progress
        const stepIdx = Math.min(Math.floor((prev / 100) * steps.length), steps.length - 1);
        setAnalyzingText(steps[stepIdx]);
        
        return prev + 4; // fills up in about 2.5 seconds
      });
    }, 100);
  };

  // Format WhatsApp message with quiz answers
  const getWhatsAppQuizLink = () => {
    let messageText = `Olá Dra. Thayla, acabei de realizar a minha Avaliação de Perfil no seu site e gostaria de agendar uma consulta. Aqui estão as minhas respostas:\n\n`;
    
    QUIZ_QUESTIONS.forEach(q => {
      const ans = selectedAnswers[q.id] || "Não respondido";
      messageText += `🔹 *${q.question}*\n👉 _${ans}_\n\n`;
    });
    
    messageText += `*Resultado:* Compatibilidade ideal para o seu Método Estético de Naturalidade!\n`;
    messageText += `Gostaria de agendar a minha primeira avaliação com a senhora.`;
    
    const encodedText = encodeURIComponent(messageText);
    return `https://api.whatsapp.com/send?phone=5531990000000&text=${encodedText}`; // Fallback or direct user's link
  };

  // Actual whatsapp URL from expert info
  const directWhatsAppUrl = EXPERT_INFO.whatsappUrl;

  return (
    <div className="min-h-screen bg-artistic-bg text-artistic-dark font-sans overflow-x-hidden relative select-none">
      
      {/* BRAND NEW ARTISTIC BACKGROUND GRAPHIC DETAILS */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-artistic-gold/5 rounded-full blur-[100px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] bg-artistic-gold/5 rounded-full blur-[120px] pointer-events-none -z-10" />

      {/* LIGHTBOX FOR IMAGES */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#1A1A1A]/95 z-50 flex flex-col items-center justify-center p-4"
            onClick={() => setLightboxImage(null)}
          >
            <button 
              className="absolute top-6 right-6 text-white/70 hover:text-white p-2.5 rounded-full bg-white/10 border border-white/20 transition-colors"
              onClick={() => setLightboxImage(null)}
            >
              <X size={22} />
            </button>
            <motion.img 
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              src={lightboxImage} 
              alt="Resultado ampliado" 
              className="max-w-full max-h-[82vh] object-contain rounded-2xl shadow-2xl border-4 border-artistic-dark"
              referrerPolicy="no-referrer"
            />
            <p className="mt-4 text-[10px] text-[#FAF9F6] text-center font-mono tracking-[0.2em] uppercase">
              Resultados reais de pacientes • Clique fora para fechar
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SCREEN ROUTING & TRANSITIONS */}
      <AnimatePresence mode="wait">
        
        {/* 1. WELCOME SCREEN */}
        {screenState === "WELCOME" && (
          <motion.div 
            key="welcome"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
            className="min-h-screen flex items-center justify-center p-3 sm:p-4 md:p-8"
          >
            <div className="w-full max-w-sm bg-white rounded-[30px] sm:rounded-[40px] border-4 sm:border-[8px] border-artistic-dark shadow-xl sm:shadow-2xl overflow-hidden relative flex flex-col shrink-0">
              
              {/* Cover Photo - Grayscale with transition */}
              <div className="h-[220px] sm:h-[340px] relative overflow-hidden bg-cover bg-center bg-no-repeat grayscale hover:grayscale-0 transition-all duration-700" style={{ backgroundImage: `url('${EXPERT_IMAGES.hero}')` }}>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                
                {/* Floating location tag */}
                <div className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-[#1A1A1A]/90 text-[#D4AF37] px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-[8px] sm:text-[9px] font-mono tracking-widest uppercase border border-[#D4AF37]/30">
                  {EXPERT_INFO.profession}
                </div>
              </div>

              {/* Body Content */}
              <div className="p-4 sm:p-6 flex flex-col justify-between flex-1 text-center">
                <div className="mb-4 sm:mb-6">
                  <h1 className="text-2xl sm:text-3xl font-serif text-artistic-dark mb-0.5 sm:mb-1 tracking-wide">
                    {EXPERT_INFO.name}
                  </h1>
                  <p className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-[#D4AF37] mb-2 sm:mb-4 font-semibold font-mono">
                    Harmonização Facial BH
                  </p>
                  <p className="text-[11px] sm:text-xs text-gray-500 leading-relaxed font-light">
                    Seja muito bem-vinda. Realizo procedimentos focados em resgatar a sua elegância natural com total segurança e sutileza. Descubra sua compatibilidade estética.
                  </p>
                </div>

                {/* Primary CTA Button Stack */}
                <div className="space-y-2 sm:space-y-3">
                  <button 
                    onClick={startQuiz}
                    id="btn-start-quiz"
                    className="w-full bg-artistic-dark text-white py-3 sm:py-4 rounded-xl text-xs font-bold uppercase tracking-widest shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                  >
                    <Sparkles size={14} className="text-[#D4AF37]" />
                    <span>Iniciar Avaliação</span>
                    <ChevronRight size={14} />
                  </button>

                  <button 
                    onClick={() => setScreenState("MAIN")}
                    id="btn-direct-site"
                    className="w-full border border-gray-200 hover:bg-gray-50 py-2.5 sm:py-3.5 rounded-xl text-xs font-bold uppercase tracking-widest text-artistic-dark transition-colors"
                  >
                    Acessar o Site Direto
                  </button>
                  
                  <p className="text-center text-[8px] sm:text-[9px] text-gray-400 italic">
                    Atendimento exclusivo • Bairro Camargos, BH
                  </p>
                </div>
              </div>
              
              {/* Small abstract accent line resembling a phone frame camera notch */}
              <div className="absolute top-2 sm:top-4 left-1/2 -translate-x-1/2 w-12 sm:w-16 h-1 sm:h-1.5 bg-[#1A1A1A]/20 rounded-full" />
            </div>
          </motion.div>
        )}

        {/* 2. COMPACT INTERACTIVE QUIZ OVERLAY */}
        {screenState === "QUIZ" && (
          <motion.div 
            key="quiz"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen flex flex-col justify-between p-3 sm:p-4 md:p-6"
          >
            {/* Header element within Quiz */}
            <div className="w-full max-w-sm mx-auto pt-2 sm:pt-4 flex items-center justify-between">
              <div className="flex items-center gap-2.5 sm:gap-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden border border-[#D4AF37] p-0.5">
                  <img 
                    src={EXPERT_IMAGES.hero} 
                    alt={EXPERT_INFO.name} 
                    className="w-full h-full object-cover object-top rounded-full grayscale"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <h4 className="text-[11px] sm:text-xs font-serif font-bold text-artistic-dark tracking-wide">{EXPERT_INFO.name}</h4>
                  <span className="text-[8px] sm:text-[9px] uppercase font-mono tracking-wider text-[#D4AF37]">Método de Naturalidade</span>
                </div>
              </div>
              <button 
                onClick={() => setScreenState("WELCOME")}
                className="text-gray-500 hover:text-artistic-dark text-[10px] sm:text-xs py-1 px-2 sm:px-2.5 rounded-lg bg-gray-100 transition-colors"
              >
                Voltar
              </button>
            </div>

            {/* Main Quiz Card - phone simulation style */}
            <div className="w-full max-w-sm mx-auto bg-white rounded-[30px] sm:rounded-[40px] border-4 sm:border-[8px] border-artistic-dark shadow-xl sm:shadow-2xl overflow-hidden relative shrink-0 my-2 sm:my-4 flex-grow flex flex-col justify-between p-4 sm:p-6">
              
              <div className="flex-1 flex flex-col justify-center">
                <div className="flex justify-center mb-3 sm:mb-6">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full border-2 border-[#D4AF37] p-0.5 sm:p-1 overflow-hidden shadow-sm">
                    <img 
                      src={EXPERT_IMAGES.hero} 
                      className="w-full h-full object-cover rounded-full grayscale"
                      alt="Dra Thayla"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>

                <p className="text-center text-[9px] sm:text-[10px] uppercase tracking-widest mb-0.5 sm:mb-1 text-gray-500 font-mono font-semibold">
                  Dra. Thayla Medeiros
                </p>
                <h3 className="text-sm sm:text-lg text-center font-serif text-artistic-dark mb-3 sm:mb-6 tracking-wide leading-tight px-1 sm:px-2">
                  {QUIZ_QUESTIONS[currentQuestionIndex].question}
                </h3>
                
                {/* Options list */}
                <div className="space-y-2 sm:space-y-3 px-1">
                  {QUIZ_QUESTIONS[currentQuestionIndex].options.map((opt, idx) => {
                    const isSelected = selectedAnswers[QUIZ_QUESTIONS[currentQuestionIndex].id] === opt.value;
                    return (
                      <motion.button
                        key={idx}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleSelectOption(QUIZ_QUESTIONS[currentQuestionIndex].id, opt.value)}
                        className={`w-full text-left p-3 sm:p-4 rounded-xl sm:rounded-2xl border transition-all flex items-center justify-between text-xs font-medium ${
                          isSelected 
                            ? "border-artistic-dark bg-artistic-dark/5 text-artistic-dark shadow-sm" 
                            : "border-gray-100 bg-white hover:border-[#D4AF37] text-gray-700"
                        }`}
                      >
                        <span className="leading-relaxed pr-2">{opt.label}</span>
                        <div className={`w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full border flex items-center justify-center shrink-0 ${
                          isSelected ? "border-artistic-dark bg-artistic-dark text-white" : "border-gray-200"
                        }`}>
                          {isSelected && <Check size={8} sm:size={10} strokeWidth={3} />}
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              {/* Progress and indicator */}
              <div className="mt-4 sm:mt-6 pt-2.5 sm:pt-4 border-t border-gray-100">
                <div className="w-full bg-gray-100 h-1 rounded-full mb-1.5 sm:mb-2 overflow-hidden">
                  <div 
                    style={{ width: `${((currentQuestionIndex + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
                    className="h-full bg-[#D4AF37] rounded-full transition-all duration-300"
                  />
                </div>
                <p className="text-center text-[8px] sm:text-[9px] uppercase font-mono font-bold tracking-widest text-[#D4AF37]">
                  Pergunta {currentQuestionIndex + 1} de {QUIZ_QUESTIONS.length}
                </p>
              </div>

              <div className="absolute top-2 sm:top-4 left-1/2 -translate-x-1/2 w-12 sm:w-16 h-1 sm:h-1.5 bg-[#1A1A1A]/20 rounded-full" />
            </div>

            {/* Bottom skip direct */}
            <div className="w-full max-w-sm mx-auto pb-1 text-center">
              <button 
                onClick={() => setScreenState("MAIN")}
                className="text-[9px] sm:text-[10px] text-gray-400 hover:text-artistic-dark underline tracking-widest uppercase transition-all"
              >
                Pular Avaliação e Entrar no Site
              </button>
            </div>
          </motion.div>
        )}

        {/* 3. SIMULATED ANALYSIS BAR SCREEN */}
        {screenState === "ANALYZING" && (
          <motion.div 
            key="analyzing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen flex items-center justify-center p-3 sm:p-4"
          >
            <div className="w-full max-w-sm bg-white rounded-[30px] sm:rounded-[40px] border-4 sm:border-[8px] border-artistic-dark shadow-xl sm:shadow-2xl p-6 sm:p-8 text-center relative overflow-hidden">
              <div className="mb-4 sm:mb-6 flex justify-center">
                <div className="relative flex items-center justify-center">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full border-2 border-[#D4AF37]/20 border-t-[#D4AF37] animate-spin" />
                  <Sparkles size={16} className="absolute text-[#D4AF37] animate-pulse" />
                </div>
              </div>

              <h3 className="text-lg sm:text-xl font-serif text-artistic-dark mb-0.5 sm:mb-1">Mapeamento Facial</h3>
              <p className="text-[9px] sm:text-[10px] uppercase font-mono tracking-widest text-gray-400 mb-4 sm:mb-6">Método Thayla Medeiros</p>
              
              <p className="text-xs text-gray-500 font-mono tracking-wider h-10 sm:h-12 flex items-center justify-center">
                {analyzingText}
              </p>

              {/* Progress bar */}
              <div className="w-full h-1 sm:h-1.5 bg-gray-100 rounded-full overflow-hidden mt-3 sm:mt-4">
                <div 
                  style={{ width: `${analyzingProgress}%` }}
                  className="h-full bg-gradient-to-r from-artistic-dark to-[#D4AF37] transition-all duration-100"
                />
              </div>

              <span className="text-[8px] sm:text-[9px] text-[#D4AF37] mt-4 sm:mt-6 block font-mono uppercase tracking-widest">
                Segurança • Anatomia • Naturalidade
              </span>

              <div className="absolute top-2 sm:top-4 left-1/2 -translate-x-1/2 w-12 sm:w-16 h-1 sm:h-1.5 bg-[#1A1A1A]/20 rounded-full" />
            </div>
          </motion.div>
        )}

        {/* 4. PERSUASIVE RESULT PAGE */}
        {screenState === "RESULT" && (
          <motion.div 
            key="result"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            className="min-h-screen flex items-center justify-center p-3 sm:p-4 py-6 sm:py-8"
          >
            <div className="w-full max-w-2xl bg-white rounded-[30px] sm:rounded-[40px] border-4 sm:border-[8px] border-artistic-dark shadow-xl sm:shadow-2xl p-4 sm:p-6 md:p-8 relative overflow-hidden flex flex-col justify-between">
              
              <div className="text-center mb-4 sm:mb-6">
                <span className="bg-emerald-50 text-emerald-700 border border-emerald-100 px-3 py-1 sm:px-4 sm:py-1.5 rounded-full text-[9px] sm:text-[10px] font-bold uppercase tracking-widest mb-2 sm:mb-4 inline-block italic font-mono">
                  ✓ Perfil Compatível
                </span>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-artistic-dark tracking-wide leading-tight">
                  Você é a Paciente Ideal.
                </h2>
              </div>

              {/* Side-by-side or stacked grid images as specified in the theme HTML */}
              <p className="text-gray-500 text-xs sm:text-sm leading-relaxed mb-4 sm:mb-6 text-center max-w-lg mx-auto font-light">
                Com base nas suas respostas, o Método Dra. Thayla Medeiros consegue entregar exatamente a naturalidade, rejuvenescimento sutil e a segurança estética que você procura.
              </p>

              {/* Grayscale 2-column image gallery representing premium art look */}
              <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6 max-w-md mx-auto w-full">
                <div className="aspect-[4/5] rounded-xl sm:rounded-2xl overflow-hidden border border-gray-100 grayscale hover:grayscale-0 transition-all duration-500">
                  <img src={BEFORE_AFTER_GALLERY[0]} className="w-full h-full object-cover" alt="Antes e depois" referrerPolicy="no-referrer" />
                </div>
                <div className="aspect-[4/5] rounded-xl sm:rounded-2xl overflow-hidden border border-gray-100 grayscale hover:grayscale-0 transition-all duration-500">
                  <img src={BEFORE_AFTER_GALLERY[1]} className="w-full h-full object-cover" alt="Antes e depois" referrerPolicy="no-referrer" />
                </div>
              </div>

              {/* Action Button stack matching theme design */}
              <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-4 w-full max-w-lg mx-auto mb-4 sm:mb-6">
                <a 
                  href={getWhatsAppQuizLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-artistic-dark text-white py-3 sm:py-4 px-4 sm:px-6 rounded-xl sm:rounded-2xl text-xs font-bold uppercase tracking-widest text-center hover:bg-black transition-colors flex items-center justify-center gap-2 shadow-lg"
                >
                  <MessageCircle size={15} />
                  <span>Enviar Minha Avaliação</span>
                </a>
                
                <button 
                  onClick={() => setScreenState("MAIN")}
                  className="flex-1 border border-gray-200 hover:bg-gray-50 text-artistic-dark py-3 sm:py-4 px-4 sm:px-6 rounded-xl sm:rounded-2xl text-xs font-bold uppercase tracking-widest transition-colors"
                >
                  Continuar no Site
                </button>
              </div>

              {/* Overlapping customer avatar trust indicator as specified in Design HTML */}
              <div className="flex items-center justify-center gap-3 sm:gap-4 border-t border-gray-100 pt-4 sm:pt-6">
                <div className="flex -space-x-3 shrink-0">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-white bg-gray-100 overflow-hidden">
                    <img src={COMMENTS_GALLERY[0]} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-white bg-gray-200 overflow-hidden">
                    <img src={COMMENTS_GALLERY[1]} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-white bg-gray-300 overflow-hidden">
                    <img src={COMMENTS_GALLERY[2]} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                </div>
                <p className="text-[10px] sm:text-[11px] text-gray-400 italic font-medium">
                  +450 pacientes transformadas em Belo Horizonte
                </p>
              </div>

              {/* Floating notch top bar */}
              <div className="absolute top-2 sm:top-4 left-1/2 -translate-x-1/2 w-12 sm:w-16 h-1 sm:h-1.5 bg-[#1A1A1A]/20 rounded-full" />
            </div>
          </motion.div>
        )}

        {/* 5. MAIN LANDING PAGE */}
        {screenState === "MAIN" && (
          <motion.div 
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full"
          >
            
            {/* STICKY MARQUEE TICKER (TOP BAR) - matching requested Artistic Flair layout exactly */}
            <div className="sticky top-0 z-40 bg-artistic-dark text-[#D4AF37] py-3.5 overflow-hidden border-b border-[#D4AF37]/30 shadow-md">
              <div className="animate-marquee flex gap-12 whitespace-nowrap text-[10px] tracking-[0.2em] uppercase font-semibold">
                <button onClick={() => scrollToSection("sobre")} className="hover:text-white transition-colors flex items-center gap-1">
                  SOBRE MIM
                </button>
                <span>•</span>
                <button onClick={() => scrollToSection("provas")} className="hover:text-white transition-colors flex items-center gap-1">
                  PROVA VISUAL
                </button>
                <span>•</span>
                <button onClick={() => scrollToSection("coracao")} className="hover:text-white transition-colors flex items-center gap-1">
                  HARMONIZAÇÃO DE <span className="text-red-500">❤</span>
                </button>
                <span>•</span>
                <button onClick={() => scrollToSection("onde-encontrar")} className="hover:text-white transition-colors flex items-center gap-1">
                  ONDE NOS ENCONTRAR
                </button>
                <span>•</span>
                <button onClick={() => scrollToSection("contato")} className="hover:text-white transition-colors flex items-center gap-1">
                  CONTATO
                </button>
                
                {/* Repetitions for marquee loop */}
                <span>•</span>
                <button onClick={() => scrollToSection("sobre")} className="hover:text-white transition-colors flex items-center gap-1">
                  SOBRE MIM
                </button>
                <span>•</span>
                <button onClick={() => scrollToSection("provas")} className="hover:text-white transition-colors flex items-center gap-1">
                  PROVA VISUAL
                </button>
                <span>•</span>
                <button onClick={() => scrollToSection("coracao")} className="hover:text-white transition-colors flex items-center gap-1">
                  HARMONIZAÇÃO DE <span className="text-red-500">❤</span>
                </button>
                <span>•</span>
                <button onClick={() => scrollToSection("onde-encontrar")} className="hover:text-white transition-colors flex items-center gap-1">
                  ONDE NOS ENCONTRAR
                </button>
                <span>•</span>
                <button onClick={() => scrollToSection("contato")} className="hover:text-white transition-colors flex items-center gap-1">
                  CONTATO
                </button>
                
                {/* Additional loop padding */}
                <span>•</span>
                <button onClick={() => scrollToSection("sobre")} className="hover:text-white transition-colors flex items-center gap-1">
                  SOBRE MIM
                </button>
                <span>•</span>
                <button onClick={() => scrollToSection("provas")} className="hover:text-white transition-colors flex items-center gap-1">
                  PROVA VISUAL
                </button>
                <span>•</span>
                <button onClick={() => scrollToSection("coracao")} className="hover:text-white transition-colors flex items-center gap-1">
                  HARMONIZAÇÃO DE <span className="text-red-500">❤</span>
                </button>
                <span>•</span>
                <button onClick={() => scrollToSection("onde-encontrar")} className="hover:text-white transition-colors flex items-center gap-1">
                  ONDE NOS ENCONTRAR
                </button>
                <span>•</span>
                <button onClick={() => scrollToSection("contato")} className="hover:text-white transition-colors flex items-center gap-1">
                  CONTATO
                </button>
              </div>
            </div>

            {/* 1. HERO SECTION (First Fold) - styled with high-contrast, editorial layout */}
            <section className="relative pt-12 pb-20 px-4 md:px-8 max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
              
              {/* Image side - Grayscale by default, beautiful frame */}
              <div className="w-full lg:w-1/2 flex justify-center relative">
                <div className="w-full max-w-[340px] aspect-[3/4] bg-white rounded-[40px] border-[8px] border-artistic-dark shadow-2xl overflow-hidden relative group shrink-0">
                  <div 
                    className="w-full h-full bg-cover bg-center bg-no-repeat grayscale group-hover:grayscale-0 transition-all duration-700" 
                    style={{ backgroundImage: `url('${EXPERT_IMAGES.hero}')` }}
                  />
                  
                  {/* Subtle caption matching design notch frame */}
                  <div className="absolute top-4 left-1/2 -translate-x-1/2 w-16 h-1.5 bg-white/40 rounded-full" />
                  
                  {/* Local banner credit inside image */}
                  <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-3 rounded-2xl border border-gray-100 z-10 text-center">
                    <span className="text-[9px] uppercase font-mono tracking-widest text-[#D4AF37] font-bold block">
                      Dra. Thayla Medeiros
                    </span>
                    <p className="text-[10px] text-gray-500 font-serif italic mt-0.5">
                      "Realçando sua essência com naturalidade"
                    </p>
                  </div>
                </div>
              </div>

              {/* Text Side - Elegant editorial typography */}
              <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left">
                <span className="text-[11px] font-mono tracking-[0.25em] text-[#D4AF37] font-bold uppercase mb-3 block">
                  Exclusividade & Arte Facial
                </span>

                <h1 className="text-4xl md:text-5xl font-serif text-artistic-dark tracking-wide leading-tight mb-6">
                  Eu sou a Dra. Thayla Medeiros. Não transformo rostos, revelo a <span className="text-[#D4AF37] italic">elegância natural</span> que já habita em você.
                </h1>

                <p className="text-gray-500 text-sm md:text-base leading-relaxed font-light mb-8 max-w-xl">
                  Recuse resultados industriais e artificiais. Desenvolvi um método primoroso focado na biossegurança e simetria artística individual, respeitando integralmente a sua beleza original.
                </p>

                {/* Primary CTA Button for conversion */}
                <div className="w-full max-w-md space-y-3">
                  <a 
                    href={directWhatsAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full md:w-auto inline-flex py-4 px-8 rounded-xl bg-artistic-dark text-white hover:bg-black font-bold text-xs tracking-widest uppercase transition-all shadow-lg shadow-artistic-dark/10 items-center justify-center gap-2"
                  >
                    <Phone size={14} className="text-[#D4AF37]" />
                    <span>Falar no WhatsApp Sem Compromisso</span>
                    <ArrowRight size={14} />
                  </a>
                  
                  <div className="flex items-center justify-center lg:justify-start gap-2 text-[10px] text-gray-400 font-mono uppercase tracking-widest">
                    <MapPin size={10} className="text-[#D4AF37]" />
                    <span>Atendimento de Luxo no Bairro Camargos, BH</span>
                  </div>
                </div>
              </div>
            </section>

            {/* 2. PRESENTATION VIDEO SECTION - styled in premium solid dark spread to alternate rhythms */}
            <section id="apresentacao-video" className="bg-[#1A1A1A] text-white border-y border-[#D4AF37]/20 py-20 px-4 md:px-8">
              <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12">
                
                {/* Autoplay Video Player with Sound Toggle Control only - Beautifully framed vertical video */}
                <div className="w-full lg:w-1/2 flex justify-center">
                  <div className="w-full max-w-[310px] sm:max-w-[340px] aspect-[9/16] rounded-[40px] overflow-hidden border-[8px] border-[#D4AF37] bg-black shadow-2xl shadow-[#D4AF37]/10 relative group">
                    <video
                      src={VIDEO_DATA.mp4Url}
                      autoPlay
                      loop
                      muted={isVideoMuted}
                      playsInline
                      className="w-full h-full object-cover"
                    />
                    
                    {/* Floating sound control button inside the video */}
                    <button
                      onClick={() => setIsVideoMuted(!isVideoMuted)}
                      className="absolute bottom-4 right-4 z-20 bg-black/80 hover:bg-[#D4AF37] hover:text-black text-white p-3 rounded-full border border-[#D4AF37]/30 transition-all flex items-center justify-center gap-2 shadow-lg animate-pulse"
                      title={isVideoMuted ? "Ativar som" : "Desativar som"}
                    >
                      {isVideoMuted ? (
                        <>
                          <VolumeX size={16} />
                          <span className="text-[10px] font-mono tracking-wider uppercase pr-1">Sem som</span>
                        </>
                      ) : (
                        <>
                          <Volume2 size={16} />
                          <span className="text-[10px] font-mono tracking-wider uppercase pr-1">Com som</span>
                        </>
                      )}
                    </button>

                    {/* Left side Live / Autoplay Indicator Badge */}
                    <div className="absolute bottom-4 left-4 z-20 bg-[#1A1A1A]/90 py-1.5 px-3.5 rounded-full border border-[#D4AF37]/30 text-[9px] font-mono tracking-widest text-[#D4AF37] uppercase flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                      Ao Vivo
                    </div>
                  </div>
                </div>

                {/* Content Side */}
                <div className="w-full lg:w-1/2 flex flex-col justify-center">
                  <span className="text-[10px] font-mono tracking-[0.2em] text-[#D4AF37] uppercase mb-3 block font-semibold">
                    Procedimento na Prática
                  </span>
                  
                  <h3 className="text-2xl md:text-3xl font-serif text-white tracking-wide mb-6 leading-snug">
                    "A beleza está na discrição dos detalhes."
                  </h3>

                  <p className="text-sm text-gray-300 font-light italic leading-relaxed relative pl-6 border-l-2 border-[#D4AF37]">
                    {VIDEO_DATA.quote}
                  </p>

                  <div className="mt-8">
                    <button 
                      onClick={() => setIsVideoMuted(!isVideoMuted)}
                      className="inline-flex items-center gap-2.5 text-xs font-mono tracking-widest text-[#D4AF37] hover:text-white uppercase transition-colors"
                    >
                      {isVideoMuted ? (
                        <>
                          <Volume2 size={14} />
                          <span>Ativar Som do Vídeo</span>
                        </>
                      ) : (
                        <>
                          <VolumeX size={14} />
                          <span>Desativar Som do Vídeo</span>
                        </>
                      )}
                      <ChevronRight size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* 3. BLOCO "QUEM SOU EU" (Autoridade Pessoal) */}
            <section id="sobre" className="py-24 px-4 md:px-8 max-w-7xl mx-auto">
              <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
                
                {/* Text Side */}
                <div className="w-full lg:w-1/2 flex flex-col text-left">
                  <span className="text-[10px] font-mono tracking-widest text-[#D4AF37] uppercase mb-2 block font-semibold">
                    Excelência e Trajetória
                  </span>
                  
                  <h2 className="text-3xl md:text-4xl font-serif text-artistic-dark tracking-wide mb-6 leading-tight">
                    Dedicação meticulosa a revelar a sua melhor versão
                  </h2>

                  <p className="text-gray-500 text-sm leading-relaxed mb-6 font-light">
                    Como profissional especializada em Harmonização Facial em Belo Horizonte, entendo que cada traço conta uma história. A estética de alta performance deve ser sofisticada, focada em rejuvenescer e sustentar de forma sutil, distanciando-se inteiramente de modismos exagerados.
                  </p>

                  <p className="text-gray-400 text-xs mb-8 font-light">
                    Em meu consultório privativo no Bairro Camargos-BH, utilizo as técnicas mais refinadas do mercado, proporcionando a segurança e o conforto integral que você merece.
                  </p>

                  {/* Highlights with precise black/gold indicators */}
                  <div className="space-y-4">
                    <div className="flex gap-4">
                      <div className="w-5 h-5 rounded-full border border-[#D4AF37] flex items-center justify-center shrink-0 mt-0.5">
                        <Check size={10} className="text-[#D4AF37]" />
                      </div>
                      <div>
                        <h4 className="text-xs uppercase tracking-wider font-bold text-artistic-dark">Análise Tridimensional da Mímica</h4>
                        <p className="text-xs text-gray-500 mt-1 font-light">Estudo estático e dinâmico das suas expressões faciais, minimizando riscos e personalizando doses.</p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="w-5 h-5 rounded-full border border-[#D4AF37] flex items-center justify-center shrink-0 mt-0.5">
                        <Check size={10} className="text-[#D4AF37]" />
                      </div>
                      <div>
                        <h4 className="text-xs uppercase tracking-wider font-bold text-artistic-dark">Fidelidade aos Melhores Ativos</h4>
                        <p className="text-xs text-gray-500 mt-1 font-light">Utilização estrita de marcas globais premium, garantindo maior durabilidade e pureza.</p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="w-5 h-5 rounded-full border border-[#D4AF37] flex items-center justify-center shrink-0 mt-0.5">
                        <Check size={10} className="text-[#D4AF37]" />
                      </div>
                      <div>
                        <h4 className="text-xs uppercase tracking-wider font-bold text-artistic-dark">Suporte Pós-Consulta Dedicado</h4>
                        <p className="text-xs text-gray-500 mt-1 font-light">Canal direto de mensagens comigo para acompanhar cada etapa da sua recuperação com tranquilidade.</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Photo Side - Portrait display style */}
                <div className="w-full lg:w-1/2 flex justify-center relative">
                  <div className="relative p-1 bg-gradient-to-b from-gray-200 to-transparent rounded-3xl overflow-hidden w-full max-w-[340px]">
                    <img 
                      src={EXPERT_IMAGES.secondary} 
                      alt="Dra Thayla Medeiros" 
                      className="w-full aspect-[4/5] object-cover rounded-3xl relative z-10 grayscale hover:grayscale-0 transition-all duration-700"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>

              </div>
            </section>

            {/* 4. BLOCO "RESULTADOS REAIS" (Antes e Depois com Lightbox) - light background */}
            <section id="provas" className="bg-[#FAF9F6] py-24 px-4 md:px-8 border-y border-gray-100">
              <div className="max-w-7xl mx-auto">
                
                <div className="text-center max-w-2xl mx-auto mb-16">
                  <span className="text-[10px] font-mono tracking-widest text-[#D4AF37] block mb-2 uppercase font-semibold">Portfólio de Casos</span>
                  <h2 className="text-3xl md:text-4xl font-serif font-bold text-artistic-dark tracking-wide">
                    Galeria de Resultados Reais
                  </h2>
                  <p className="text-xs text-gray-500 mt-3 leading-relaxed font-light">
                    Sutileza, sustentação e resgate de volume sob medida. Clique em qualquer imagem para ampliar e conferir a altíssima fidelidade e naturalidade obtidas.
                  </p>
                </div>

                {/* Gallery layout styled as an infinite marquee */}
                <div className="relative w-full overflow-hidden py-4">
                  {/* Elegant fade-out gradients on both sides */}
                  <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#FAF9F6] to-transparent z-10 pointer-events-none" />
                  <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#FAF9F6] to-transparent z-10 pointer-events-none" />
                  
                  <div className="flex gap-6 animate-marquee" style={{ animationDuration: "35s" }}>
                    {[...BEFORE_AFTER_GALLERY, ...BEFORE_AFTER_GALLERY].map((imgUrl, idx) => {
                      const originalIdx = idx % BEFORE_AFTER_GALLERY.length;
                      return (
                        <motion.div 
                          key={idx}
                          whileHover={{ y: -5 }}
                          className="w-[200px] sm:w-[240px] shrink-0 bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md hover:border-[#D4AF37]/50 transition-all cursor-pointer group"
                          onClick={() => setLightboxImage(imgUrl)}
                        >
                          <div className="aspect-[4/5] overflow-hidden relative">
                            <img 
                              src={imgUrl} 
                              alt={`Resultado real ${originalIdx + 1}`} 
                              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                              referrerPolicy="no-referrer"
                            />
                            
                            {/* Hover indicator */}
                            <div className="absolute top-3 right-3 bg-white/90 border border-gray-100 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-20">
                              <Maximize2 size={12} className="text-artistic-dark" />
                            </div>
                          </div>
                          
                          <div className="p-3 text-center bg-white border-t border-gray-50">
                            <span className="text-[9px] font-mono tracking-widest text-gray-400 uppercase block font-semibold">
                              Caso Clínico 0{originalIdx + 1}
                            </span>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>

                <div className="mt-8 text-center">
                  <p className="text-[10px] text-gray-400 italic font-mono uppercase tracking-widest">
                    * Resultados individuais variam • Fotos compartilhadas com autorização ética
                  </p>
                </div>

              </div>
            </section>

            {/* 5. POR QUE CONFIAR (Diferenciais) */}
            <section className="py-24 px-4 md:px-8 max-w-7xl mx-auto">
              <div className="text-center max-w-2xl mx-auto mb-16">
                <span className="text-[10px] font-mono tracking-widest text-[#D4AF37] block mb-2 uppercase font-semibold">Segurança & Conforto</span>
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-artistic-dark tracking-wide">
                  Por que confiar no meu método?
                </h2>
                <p className="text-xs text-gray-500 mt-3 leading-relaxed font-light">
                  Afasto-me das abordagens de atendimento em massa. Priorizo um espaço intimista de relaxamento e diálogo sincero para que você se sinta cuidada de verdade.
                </p>
              </div>

              {/* 4 Cards Grid - light, elegant with top border accent */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {TRUST_CARDS.map((card, idx) => (
                  <div 
                    key={idx}
                    className="p-8 rounded-2xl bg-white border border-gray-100 shadow-sm relative hover:border-[#D4AF37] transition-colors flex flex-col justify-between"
                  >
                    <div>
                      <span className="text-xs font-mono font-bold text-[#D4AF37] block mb-4 uppercase tracking-widest">
                        0{idx + 1} // Diferencial
                      </span>
                      <h4 className="text-base font-serif font-bold text-artistic-dark mb-3 tracking-wide">{card.title}</h4>
                      <p className="text-xs text-gray-500 leading-relaxed font-light">{card.description}</p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-gray-50 text-[8px] uppercase font-mono tracking-widest text-[#D4AF37] font-semibold">
                      Compromisso Ético
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* 6. CTA INTERMEDIÁRIO - WhatsApp Direct Conversion with beautiful brand green accent */}
            <section className="bg-white border-y border-gray-100 py-16 px-4 text-center">
              <div className="max-w-2xl mx-auto">
                <h3 className="text-xl md:text-2xl font-serif text-artistic-dark mb-4 tracking-wide leading-snug">
                  Tem dúvidas se o preenchimento ou toxina botulínica são indicados para o seu momento?
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed mb-8 font-light">
                  Estou à total disposição para responder cada detalhe com calma e transparência no WhatsApp. Converse diretamente com o nosso atendimento exclusivo.
                </p>

                <a 
                  href={directWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex py-4 px-8 rounded-xl bg-artistic-green text-white hover:opacity-95 font-bold text-xs tracking-widest uppercase transition-all shadow-lg shadow-emerald-500/10 items-center justify-center gap-2"
                >
                  <MessageCircle size={16} className="fill-white" />
                  <span>Chamar no WhatsApp Direto</span>
                </a>
              </div>
            </section>

            {/* 7. BLOCO "COMO FUNCIONA A PRIMEIRA CONSULTA" (Steps) */}
            <section className="py-24 px-4 md:px-8 max-w-7xl mx-auto">
              <div className="text-center max-w-2xl mx-auto mb-16">
                <span className="text-[10px] font-mono tracking-widest text-[#D4AF37] block mb-2 uppercase font-semibold">Sua Experiência</span>
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-artistic-dark tracking-wide">
                  Como funciona a sua primeira sessão?
                </h2>
                <p className="text-xs text-gray-500 mt-3 leading-relaxed font-light">
                  Acompanhamento sem pressa, do primeiro contato até o pós-procedimento.
                </p>
              </div>

              {/* Steps Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative">
                {STEP_BY_STEP.map((step, idx) => (
                  <div 
                    key={idx}
                    className="p-8 rounded-2xl bg-white border border-gray-100 shadow-sm relative hover:border-artistic-dark transition-all"
                  >
                    <span className="absolute top-4 right-6 text-3xl font-mono text-gray-100 font-bold tracking-tighter">
                      {step.step}
                    </span>

                    <div className="w-8 h-8 rounded-full border border-artistic-dark text-artistic-dark font-mono font-semibold text-xs flex items-center justify-center mb-6">
                      {step.step}
                    </div>

                    <h4 className="text-sm uppercase tracking-wider font-bold text-artistic-dark mb-3">{step.title}</h4>
                    <p className="text-xs text-gray-500 leading-relaxed font-light">{step.description}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* 8. HARMONIZAÇÃO DE 💚 (Amantes da clínica / Feedbacks reais) - Solid Dark visual screen to keep theme dynamic */}
            <section id="coracao" className="bg-[#1A1A1A] text-white py-24 px-4 md:px-8 border-y border-[#D4AF37]/20">
              <div className="max-w-7xl mx-auto">
                <div className="text-center max-w-2xl mx-auto mb-16">
                  <span className="text-[10px] font-mono tracking-widest text-[#D4AF37] block mb-2 uppercase font-semibold">Depoimentos com Carinho</span>
                  <h2 className="text-3xl md:text-4xl font-serif font-bold text-white tracking-wide">
                    Harmonização de <span className="text-red-500">❤</span>
                  </h2>
                  <p className="text-xs text-gray-300 mt-4 leading-relaxed font-light">
                    Mensagens e registros de autoestima que recebemos diariamente de nossas queridas pacientes em Belo Horizonte.
                  </p>
                </div>

                {/* Gallery layout styled as an infinite marquee */}
                <div className="relative w-full overflow-hidden py-4">
                  {/* Elegant fade-out gradients on both sides */}
                  <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#1A1A1A] to-transparent z-10 pointer-events-none" />
                  <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#1A1A1A] to-transparent z-10 pointer-events-none" />
                  
                  <div className="flex gap-6 animate-marquee" style={{ animationDuration: "28s" }}>
                    {[...CORACAO_GALLERY, ...CORACAO_GALLERY].map((imgUrl, idx) => {
                      const originalIdx = idx % CORACAO_GALLERY.length;
                      return (
                        <motion.div 
                          key={idx}
                          whileHover={{ scale: 1.02 }}
                          className="w-[180px] sm:w-[220px] shrink-0 bg-black border border-white/5 rounded-2xl overflow-hidden shadow-xl cursor-pointer group"
                          onClick={() => setLightboxImage(imgUrl)}
                        >
                          <div className="aspect-[3/4] overflow-hidden relative">
                            <img 
                              src={imgUrl} 
                              alt={`Depoimento de Coração ${originalIdx + 1}`} 
                              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                              referrerPolicy="no-referrer"
                            />
                            <div className="absolute top-3 left-3 bg-red-500 text-white p-1.5 rounded-full shadow-md">
                              <Heart size={12} className="fill-white text-white" />
                            </div>
                            <div className="absolute top-3 right-3 bg-black/80 border border-white/15 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-20">
                              <Maximize2 size={12} className="text-[#D4AF37]" />
                            </div>
                          </div>
                          <div className="p-3 text-center bg-[#111] border-t border-white/5">
                            <span className="text-[9px] font-mono text-[#D4AF37] uppercase tracking-widest block font-semibold">
                              Feedback Espontâneo {originalIdx + 1}
                            </span>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </section>

            {/* 9. BASTIDORES & AUTORIDADE - Clinical details */}
            <section className="py-24 px-4 md:px-8 max-w-7xl mx-auto">
              <div className="text-center max-w-2xl mx-auto mb-16">
                <span className="text-[10px] font-mono tracking-widest text-[#D4AF37] block mb-2 uppercase font-semibold font-bold">Biossegurança Avançada</span>
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-artistic-dark tracking-wide">
                  Planejamento e Precisão Estética
                </h2>
                <p className="text-xs text-gray-500 mt-3 leading-relaxed font-light">
                  Acompanhe os bastidores do nosso consultório em BH. Biossegurança absoluta, agulhas de calibre ultrafino e estudo fotográfico prévio.
                </p>
              </div>

              {/* Side-by-side Showcase layout with grayscale-to-color flair */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
                
                {/* Bastidores Image 1 */}
                <div className="bg-white border border-gray-100 p-4 rounded-3xl flex flex-col shadow-sm">
                  <div className="rounded-2xl overflow-hidden aspect-[4/5] mb-4">
                    <img 
                      src={EXPERT_IMAGES.tertiary} 
                      alt="Bastidores Clínicos" 
                      className="w-full h-full object-cover object-top grayscale hover:grayscale-0 transition-all duration-700"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="px-1 pb-1">
                    <h4 className="text-xs uppercase tracking-wider font-bold text-artistic-dark">Dosagem e Planejamento</h4>
                    <p className="text-xs text-gray-500 mt-1 font-light">Utilizamos técnicas precisas para entregar o volume exato, prevenindo sobrecarregar tecidos faciais.</p>
                  </div>
                </div>

                {/* Bastidores Image 2 */}
                <div className="bg-white border border-gray-100 p-4 rounded-3xl flex flex-col shadow-sm">
                  <div className="rounded-2xl overflow-hidden aspect-[4/5] mb-4">
                    <img 
                      src={EXPERT_IMAGES.secondary} 
                      alt="Consultório Belo Horizonte" 
                      className="w-full h-full object-cover object-center grayscale hover:grayscale-0 transition-all duration-700"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="px-1 pb-1">
                    <h4 className="text-xs uppercase tracking-wider font-bold text-artistic-dark">Espaço Intimista Privativo</h4>
                    <p className="text-xs text-gray-500 mt-1 font-light">Seu horário é reservado de forma exclusiva. Sem salas de espera lotadas ou pressa no atendimento.</p>
                  </div>
                </div>

              </div>
            </section>

            {/* 10. COMENTÁRIOS DE PACIENTES */}
            <section className="bg-[#FAF9F6] py-24 px-4 md:px-8 border-y border-gray-100">
              <div className="max-w-7xl mx-auto">
                <div className="text-center max-w-2xl mx-auto mb-16">
                  <span className="text-[10px] font-mono tracking-widest text-[#D4AF37] block mb-2 uppercase font-semibold">Avaliação Google & Whats</span>
                  <h2 className="text-3xl md:text-4xl font-serif font-bold text-artistic-dark tracking-wide">
                    O que dizem as nossas pacientes?
                  </h2>
                  <p className="text-xs text-gray-500 mt-3 leading-relaxed font-light">
                    Confiança espontânea e resultados reais obtidos através de carinho profissional e alta performance técnica.
                  </p>
                </div>

                {/* Gallery layout styled as an infinite marquee */}
                <div className="relative w-full overflow-hidden py-4">
                  {/* Elegant fade-out gradients on both sides */}
                  <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#FAF9F6] to-transparent z-10 pointer-events-none" />
                  <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#FAF9F6] to-transparent z-10 pointer-events-none" />
                  
                  <div className="flex gap-8 animate-marquee" style={{ animationDuration: "32s" }}>
                    {[...COMMENTS_GALLERY, ...COMMENTS_GALLERY].map((imgUrl, idx) => {
                      const originalIdx = idx % COMMENTS_GALLERY.length;
                      return (
                        <motion.div 
                          key={idx}
                          whileHover={{ y: -4 }}
                          className="w-[240px] sm:w-[280px] shrink-0 bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm p-4 cursor-pointer group"
                          onClick={() => setLightboxImage(imgUrl)}
                        >
                          <div className="aspect-[4/5] rounded-xl overflow-hidden bg-gray-50 relative">
                            <img 
                              src={imgUrl} 
                              alt={`Depoimento ${originalIdx + 1}`} 
                              className="w-full h-full object-contain"
                              referrerPolicy="no-referrer"
                            />
                            <div className="absolute top-3 right-3 bg-white/90 border border-gray-100 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-20">
                              <Maximize2 size={12} className="text-artistic-dark" />
                            </div>
                          </div>
                          <div className="pt-4 text-center">
                            <div className="flex items-center justify-center gap-1 mb-1.5">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} size={10} className="fill-[#D4AF37] text-[#D4AF37]" />
                              ))}
                            </div>
                            <span className="text-[9px] font-mono text-[#D4AF37] uppercase tracking-widest block font-bold">
                              Paciente Satisfeita {originalIdx + 1}
                            </span>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </section>

            {/* 11. MAPA DO ENDEREÇO DA CLÍNICA (Onde Encontrar) */}
            <section id="onde-encontrar" className="py-24 px-4 md:px-8 max-w-5xl mx-auto">
              <div className="bg-white border-2 border-artistic-dark rounded-3xl overflow-hidden shadow-xl flex flex-col md:flex-row">
                
                {/* Info block */}
                <div className="w-full md:w-1/2 p-8 flex flex-col justify-between text-left">
                  <div>
                    <span className="text-[10px] font-mono tracking-widest text-[#D4AF37] block mb-3 uppercase font-semibold">
                      Localização Consultório
                    </span>
                    
                    <h3 className="text-2xl font-serif text-artistic-dark mb-6 tracking-wide leading-tight">
                      Nosso Espaço em Belo Horizonte
                    </h3>

                    <p className="text-xs text-gray-500 leading-relaxed font-light mb-8">
                      Oferecemos estacionamento privativo e infraestrutura médica avançada no Bairro Camargos, garantindo uma experiência tranquila e segura em sua consulta de harmonização facial.
                    </p>

                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <MapPin size={16} className="text-[#D4AF37] shrink-0 mt-0.5" />
                        <div>
                          <h5 className="text-[10px] font-mono font-bold text-artistic-dark uppercase tracking-wider">Endereço</h5>
                          <p className="text-xs text-gray-500 mt-0.5 font-light">{EXPERT_INFO.location}</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <Clock size={16} className="text-[#D4AF37] shrink-0 mt-0.5" />
                        <div>
                          <h5 className="text-[10px] font-mono font-bold text-artistic-dark uppercase tracking-wider">Funcionamento</h5>
                          <p className="text-xs text-gray-500 mt-0.5 font-light">Segunda a Sexta • 09:00 às 19:00 (Apenas com horário reservado)</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-gray-100">
                    <a 
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(EXPERT_INFO.location)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-[#D4AF37] font-bold hover:text-artistic-dark transition-colors"
                    >
                      <Compass size={12} />
                      <span>Ver Google Maps</span>
                    </a>
                  </div>
                </div>

                {/* Elegant Minimalist architectural street frame design for local map as specified */}
                <div className="w-full md:w-1/2 aspect-square md:aspect-auto min-h-[320px] bg-gray-50 relative flex items-center justify-center p-6">
                  <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-70" />
                  
                  <div className="w-full max-w-[280px] border border-gray-200 rounded-2xl relative flex flex-col items-center justify-center bg-white p-6 text-center z-10 shadow-md">
                    <div className="w-10 h-10 rounded-full bg-artistic-dark text-[#D4AF37] flex items-center justify-center mb-4 shadow-sm">
                      <MapPin size={18} className="fill-[#D4AF37]/20" />
                    </div>
                    <span className="text-[9px] uppercase font-mono tracking-widest text-[#D4AF37] block mb-1 font-bold">
                      Dra. Thayla Medeiros
                    </span>
                    <h4 className="text-xs uppercase tracking-wider font-bold text-artistic-dark mb-3">Consultório Privado</h4>
                    <p className="text-[10px] text-gray-500 leading-relaxed font-mono">
                      Bairro Camargos<br />
                      Belo Horizonte - MG
                    </p>
                    
                    <a 
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(EXPERT_INFO.location)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-6 py-2.5 px-5 rounded-lg bg-artistic-dark hover:bg-black text-white text-[9px] font-mono tracking-widest uppercase font-bold transition-all shadow-md"
                    >
                      Traçar Rota Privada
                    </a>
                  </div>
                </div>

              </div>
            </section>

            {/* 12. FINAL HIGH PROMINECE CONVERSION CTA */}
            <section id="contato" className="py-24 px-4 text-center relative max-w-4xl mx-auto overflow-hidden">
              <span className="text-[10px] font-mono tracking-widest text-[#D4AF37] block mb-3 uppercase font-bold">
                Agendamento Exclusivo
              </span>

              <h2 className="text-3xl md:text-5xl font-serif font-bold text-artistic-dark tracking-wide mb-6 leading-tight">
                Sua beleza merece o olhar artístico e técnico de quem entende de harmonia.
              </h2>

              <p className="text-gray-500 text-sm leading-relaxed mb-10 max-w-lg mx-auto font-light">
                Não protele o cuidado que renova a sua autoconfiança todas as manhãs diante do espelho. Reserve o seu horário personalizado de avaliação.
              </p>

              {/* Outstanding dynamic CTA element styled like requested brand layout */}
              <div className="flex flex-col items-center justify-center gap-4">
                <a 
                  href={directWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-4.5 px-10 rounded-2xl bg-[#25D366] hover:bg-emerald-600 text-white font-bold text-xs tracking-widest uppercase shadow-xl shadow-emerald-500/10 inline-flex items-center justify-center gap-2 transform hover:-translate-y-0.5 transition-all"
                >
                  <MessageCircle size={16} className="fill-white" />
                  <span>Agendar Consulta no WhatsApp</span>
                  <ArrowRight size={14} />
                </a>

                <span className="text-[9px] font-mono text-gray-400 tracking-wider uppercase">
                  Avaliação Sincera • Sem Obrigatoriedade de Procedimentos
                </span>
              </div>
            </section>

            {/* 13. ELEGANT FOOTER */}
            <footer className="border-t border-gray-100 bg-white py-12 px-4 text-center">
              <div className="max-w-4xl mx-auto flex flex-col items-center">
                
                {/* Signature Brand style */}
                <h3 className="font-serif italic text-2xl tracking-widest text-artistic-dark mb-1">
                  Thayla Medeiros
                </h3>
                <p className="text-[10px] uppercase font-mono tracking-widest text-[#D4AF37] font-semibold mb-6">
                  {EXPERT_INFO.profession} • Harmonização Facial BH
                </p>

                {/* Social media connections */}
                <div className="flex items-center justify-center gap-4 mb-8">
                  <a 
                    href={EXPERT_INFO.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-full bg-gray-50 border border-gray-100 text-gray-500 hover:text-artistic-dark hover:border-[#D4AF37] transition-all"
                    aria-label="Instagram"
                  >
                    <Instagram size={16} />
                  </a>
                  <a 
                    href={directWhatsAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-full bg-gray-50 border border-gray-100 text-gray-500 hover:text-emerald-500 hover:border-emerald-200 transition-all"
                    aria-label="WhatsApp"
                  >
                    <Phone size={16} />
                  </a>
                </div>

                <div className="space-y-2 text-[9px] font-mono text-gray-400 uppercase tracking-widest leading-relaxed">
                  <p>© {new Date().getFullYear()} Dra. Thayla Medeiros • Todos os direitos reservados.</p>
                  <p>Atendimento Privativo no {EXPERT_INFO.location}</p>
                </div>
              </div>
            </footer>

          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}
