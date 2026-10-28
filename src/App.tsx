import { useState, type FormEvent } from 'react'
import logo from './assets/logo.png'


const NAV_LINKS = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Misión', href: '#mision' },
  { label: 'Visión', href: '#vision' },
  { label: 'Objetivos', href: '#objetivos' },
  { label: 'Encuesta', href: '#encuesta' },
  { label: 'Contacto', href: '#contacto' },
]

const SPECIFIC_OBJECTIVES = [
  { num: '01', text: 'Crear y gestionar contenido en redes sociales.' },
  { num: '02', text: 'Implementar campañas publicitarias.' },
  { num: '03', text: 'Mejorar el posicionamiento de las marcas.' },
  { num: '04', text: 'Analizar el mercado y el público objetivo.' },
  { num: '05', text: 'Mejorar las estrategias.' },
]

const SURVEY_SECTIONS = [
  {
    title: 'Estrés y trabajo/estudio',
    description: 'Cuéntanos cómo te sientes durante tus actividades diarias.',
    questions: [
      {
        id: 'stress-frequency',
        text: '¿Con qué frecuencia sientes que te estresas durante tu jornada diaria?',
        options: ['Casi nunca o nunca.', 'Algunas veces a la semana.', 'Casi todos los días.', 'Todo el tiempo, de manera constante.'],
      },
      {
        id: 'stress-level',
        text: 'Si midieras tu nivel de estrés actual de 1 a 5, ¿en cuál te ubicas?',
        options: ['1 — Muy bajo (tranquilo/a)', '2 — Bajo', '3 — Moderado', '4 — Alto', '5 — Crítico (al 100% / colapsado/a)'],
      },
      {
        id: 'exhaustion',
        text: 'Cuando estás trabajando o estudiando, ¿te sientes física o mentalmente agotado/a?',
        options: ['No, mantengo mi energía constante.', 'Solo al final del día.', 'Con frecuencia, a mitad de la jornada ya me siento cansado/a.', 'Siempre me siento exhausto/a, incluso antes de empezar.'],
      },
      {
        id: 'anxiety',
        text: '¿Sientes que tus actividades diarias (estudio/trabajo) te sobrepasan o te generan ansiedad?',
        options: ['Rara vez o nunca.', 'Ocasionalmente, cuando hay entregas o exámenes.', 'Frecuentemente.', 'Siempre.'],
      },
    ],
  },
  {
    title: 'Sueño y recuperación',
    description: 'Queremos conocer la cantidad y calidad de tu descanso.',
    questions: [
      {
        id: 'sleep-hours',
        text: 'En promedio, ¿cuántas horas duermes por noche?',
        options: ['Más de 8 horas.', 'Entre 6 y 8 horas.', 'Entre 4 y 5 horas.', 'Menos de 4 horas.'],
      },
      {
        id: 'sleep-quality',
        text: '¿Cómo calificas la calidad de tu descanso al despertar?',
        options: ['Excelente, me despierto con energía.', 'Aceptable, pero a veces me cuesta levantarme.', 'Mala, me despierto cansado/a como si no hubiera dormido.', 'Pésima, sufro de insomnio o interrupciones constantes.'],
      },
    ],
  },
  {
    title: 'Hábitos de salud y bienestar',
    description: 'Finalmente, revisemos las rutinas que acompañan tu bienestar.',
    questions: [
      {
        id: 'exercise',
        text: '¿Realizas actividad física o ejercicio con regularidad?',
        options: ['Sí, 3 o más veces por semana.', 'De 1 a 2 veces por semana.', 'Solo ocasionalmente (1 o 2 veces al mes).', 'No realizo ningún tipo de ejercicio.'],
      },
      {
        id: 'nutrition',
        text: '¿Cómo describirías tus hábitos de alimentación en un día normal?',
        options: ['Balanceados y saludables (como a horas fijas y de forma equilibrada).', 'Moderados (intento comer bien, pero a veces consumo comida rápida).', 'Irregulares (salto comidas u horarios por falta de tiempo).', 'Poco saludables (alto consumo de ultraprocesados, azúcares o comida rápida).'],
      },
      {
        id: 'stress-response',
        text: 'Durante un momento de alto estrés o saturación mental, ¿qué sueles hacer?',
        options: ['Hago una pausa, respiro o me distraigo un momento.', 'Sigo trabajando/estudiando sin parar hasta terminar.', 'Como en exceso o consumo bebidas con cafeína/energizantes.', 'Me frustro o me bloqueo por completo.'],
      },
      {
        id: 'visual-tool',
        text: '¿Te gustaría contar con una herramienta visual que mida tus datos emocionales y te ayude a saber cuándo hacer una pausa?',
        options: ['Sí, me sería de gran ayuda.', 'Tal vez, me gustaría probarla.', 'No estoy seguro/a.', 'No lo considero necesario.'],
      },
    ],
  },
]

const TOTAL_QUESTIONS = SURVEY_SECTIONS.reduce((total, section) => total + section.questions.length, 0)

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [surveyAnswers, setSurveyAnswers] = useState<Record<string, string>>({})
  const [surveySubmitted, setSurveySubmitted] = useState(false)

  const answeredQuestions = Object.keys(surveyAnswers).length
  const surveyProgress = (answeredQuestions / TOTAL_QUESTIONS) * 100

  const handleSurveySubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (answeredQuestions === TOTAL_QUESTIONS) {
      setSurveySubmitted(true)
    }
  }

  const resetSurvey = () => {
    setSurveyAnswers({})
    setSurveySubmitted(false)
  }

  return (
    <div className="min-h-screen">
      {/* NAV */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-[#EEEAFF]">
        <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
          <a href="#inicio">
            <img src={logo} alt="Cakeval" className="h-14 w-auto" />
          </a>
          <nav className="hidden md:flex gap-6">
            {NAV_LINKS.map(l => (
              <a
                key={l.href}
                href={l.href}
                className="text-[#4A4570] hover:text-[#6B5CE7] font-medium transition-colors duration-200 text-sm tracking-wide"
              >
                {l.label}
              </a>
            ))}
          </nav>
          <a
            href="#contacto"
            className="hidden md:inline-flex items-center gap-2 bg-[#6B5CE7] hover:bg-[#4F3FD3] text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-colors duration-200"
          >
            Empecemos
          </a>
          <button
            className="md:hidden p-2 text-[#6B5CE7]"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menú"
          >
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
              {menuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <>
                  <line x1="4" y1="7" x2="20" y2="7" />
                  <line x1="4" y1="12" x2="20" y2="12" />
                  <line x1="4" y1="17" x2="20" y2="17" />
                </>
              )}
            </svg>
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden bg-white border-t border-[#EEEAFF] px-6 py-4 flex flex-col gap-4">
            {NAV_LINKS.map(l => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setMenuOpen(false)}
                className="text-[#4A4570] hover:text-[#6B5CE7] font-medium transition-colors"
              >
                {l.label}
              </a>
            ))}
          </div>
        )}
      </header>

      {/* HERO */}
      <section
        id="inicio"
        className="relative pt-24 min-h-screen flex items-center overflow-hidden bg-white"
      >
        {/* decorative blobs */}
        <div
          className="absolute top-0 right-0 w-[600px] h-[600px] opacity-10 rounded-full"
          style={{ background: 'radial-gradient(circle, #89CFF0 0%, transparent 70%)', transform: 'translate(30%, -20%)' }}
        />
        <div
          className="absolute bottom-0 left-0 w-[400px] h-[400px] opacity-10 rounded-full"
          style={{ background: 'radial-gradient(circle, #6B5CE7 0%, transparent 70%)', transform: 'translate(-20%, 30%)' }}
        />

        <div className="relative max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <span className="inline-block bg-[#6B5CE7]/10 text-[#6B5CE7] text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full mb-6 border border-[#6B5CE7]/20">
              Tabio, Cundinamarca
            </span>
            <h1 className="text-5xl md:text-6xl font-extrabold text-[#1A1535] leading-[1.1] mb-6">
              La clave que{' '}
              <span
                style={{
                  background: 'linear-gradient(90deg, #6B5CE7, #89CFF0)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                impulsa
              </span>{' '}
              tu marca
            </h1>
            <p className="text-[#4A4570] text-lg leading-relaxed mb-10 max-w-md">
              Publicidad creativa, accesible y efectiva para los pequeños emprendimientos de Tabio. Tu visibilidad es nuestra misión.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="#mision"
                className="bg-[#6B5CE7] hover:bg-[#4F3FD3] text-white font-semibold px-8 py-3.5 rounded-full transition-colors duration-200"
              >
                Conócenos
              </a>
              <a
                href="#contacto"
                className="border-2 border-[#89CFF0] text-[#5AB8E8] hover:bg-[#89CFF0]/10 font-semibold px-8 py-3.5 rounded-full transition-colors duration-200"
              >
                Trabajemos juntos
              </a>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="relative">
              <div
                className="absolute inset-0 rounded-3xl opacity-40"
                style={{ background: 'linear-gradient(135deg, #6B5CE7, #89CFF0)', filter: 'blur(40px)', transform: 'scale(1.1)' }}
              />
              <div className="relative bg-white rounded-3xl p-10 border border-[#EEEAFF] shadow-xl">
                <img src={logo} alt="Cakeval logo" className="w-64 h-auto" />
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[#6B5CE7]/40 animate-bounce">
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </div>
      </section>

      {/* PRESENTATION VIDEO */}
      <section className="py-24 bg-white" aria-labelledby="video-title">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="inline-block bg-[#89CFF0]/15 text-[#6B5CE7] text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full mb-5 border border-[#89CFF0]/40">
              Conoce Cakeval
            </span>
            <h2 id="video-title" className="text-4xl md:text-5xl font-extrabold text-[#1A1535] leading-tight">
              Creatividad que impulsa ideas
            </h2>
          </div>

          <div className="relative">
            <div
              className="absolute -inset-3 md:-inset-5 rounded-3xl opacity-20"
              style={{ background: 'linear-gradient(135deg, #6B5CE7, #89CFF0)', filter: 'blur(24px)' }}
              aria-hidden="true"
            />
            <div className="relative rounded-3xl overflow-hidden border border-[#EEEAFF] bg-white p-2 md:p-3 shadow-xl">
              <video
                className="w-full max-h-[75vh] rounded-2xl bg-[#1A1535] object-contain"
                controls
                playsInline
                preload="metadata"
                aria-label="Video de presentación de Cakeval"
              >
                <source src={presentationVideo} type="video/mp4" />
                Tu navegador no puede reproducir este video.
              </video>
            </div>
          </div>
        </div>
      </section>

      {/* MISSION */}
      <section id="mision" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div
              className="w-full aspect-square max-w-sm mx-auto rounded-2xl overflow-hidden"
              style={{ background: 'linear-gradient(135deg, #EEEAFF, #D6EDFA)' }}
            >
              <img
                src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=600&h=600&fit=crop&auto=format"
                alt="Equipo Cakeval trabajando con emprendedores locales"
                className="w-full h-full object-cover mix-blend-multiply opacity-90"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-[#6B5CE7] text-white rounded-2xl px-6 py-4 shadow-xl">
              <div className="text-3xl font-extrabold">2019</div>
              <div className="text-xs text-[#C8C0FF] mt-1">Fundada en Tabio</div>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-[#EEEAFF] flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6B5CE7" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              <span className="text-[#6B5CE7] font-semibold text-sm tracking-widest uppercase">Nuestra Misión</span>
            </div>
            <h2 className="text-4xl font-extrabold text-[#1A1535] leading-tight mb-6">
              Apoyamos el crecimiento de tu negocio
            </h2>
            <p className="text-[#4A4570] text-lg leading-relaxed mb-6">
              La misión de Cakeval es el apoyo a los pequeños emprendimientos de Tabio dando un servicio de publicidad creativa accesible y efectiva que permite el aumento de su visibilidad y la atracción de más clientes.
            </p>
            <p className="text-[#4A4570] text-lg leading-relaxed">
              Trabajamos con responsabilidad, compromiso y cercanía con la comunidad donde comprendemos las necesidades de cada negocio y brindamos estrategias publicitarias que impulsan su crecimiento económico y fortalecen el comercio local.
            </p>
          </div>
        </div>
      </section>

      {/* VISION */}
      <section
        id="vision"
        className="py-24 bg-white"
      >
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-[#6B5CE7]/10 flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6B5CE7" strokeWidth="2">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              </div>
              <span className="text-[#6B5CE7] font-semibold text-sm tracking-widest uppercase">Nuestra Visión</span>
            </div>
            <h2 className="text-4xl font-extrabold text-[#1A1535] leading-tight mb-6">
              Líderes en publicidad municipal para el 2029
            </h2>
            <p className="text-[#4A4570] text-lg leading-relaxed mb-6">
              La visión de Cakeval en el 2029 es consolidarnos como empresa líder en publicidad a nivel municipal, reconocida por contribuir al desarrollo de pequeños negocios emprendedores.
            </p>
            <p className="text-[#4A4570] text-lg leading-relaxed">
              Buscamos ser un motor de crecimiento para la economía local, promoviendo una publicidad innovadora que genere positivismo a estas empresas.
            </p>

            <div className="mt-10 flex gap-8">
              <div>
                <div className="text-3xl font-extrabold text-[#6B5CE7]">2029</div>
                <div className="text-sm text-[#4A4570] mt-1">Meta de liderazgo</div>
              </div>
              <div className="w-px bg-[#EEEAFF]" />
              <div>
                <div className="text-3xl font-extrabold text-[#6B5CE7]">100+</div>
                <div className="text-sm text-[#4A4570] mt-1">Negocios apoyados</div>
              </div>
              <div className="w-px bg-[#EEEAFF]" />
              <div>
                <div className="text-3xl font-extrabold text-[#6B5CE7]">Local</div>
                <div className="text-sm text-[#4A4570] mt-1">Enfoque municipal</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-2xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600&h=500&fit=crop&auto=format"
                alt="Visión de crecimiento empresarial Cakeval"
                className="w-full object-cover"
              />
              <div
                className="absolute inset-0 rounded-2xl"
                style={{ background: 'linear-gradient(180deg, transparent 50%, #2D2060 100%)' }}
              />
            </div>
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <p className="font-serif italic text-lg leading-snug">
                "Un motor de crecimiento para la economía local."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* GENERAL OBJECTIVE */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[#6B5CE7] font-semibold text-sm tracking-widest uppercase">Propósito</span>
            <h2 className="text-4xl font-extrabold text-[#1A1535] mt-3 mb-6">Objetivo General</h2>
            <p className="text-[#4A4570] text-lg leading-relaxed">
              Desarrollar e implementar estrategias integrales de publicidad y marketing digital adaptadas a las necesidades del entorno municipal, que permitan a las pequeñas empresas optimizar su presencia en internet, incrementar su visibilidad comercial en el mercado local y fortalecer de manera duradera la relación con sus clientes, con el propósito de acelerar su posicionamiento e impulsar un crecimiento comercial continuo y sostenible.
            </p>
          </div>

          <div
            className="rounded-3xl p-10 md:p-14 relative overflow-hidden border border-[#EEEAFF]"
            style={{ background: 'linear-gradient(135deg, #6B5CE7 0%, #89CFF0 100%)' }}
          >
            <div className="relative grid md:grid-cols-3 gap-8 text-center">
              {[
                { icon: '📡', title: 'Presencia digital', desc: 'Optimizar la presencia en internet de cada pequeña empresa.' },
                { icon: '📈', title: 'Visibilidad local', desc: 'Incrementar la visibilidad en el mercado comercial municipal.' },
                { icon: '🤝', title: 'Relación con clientes', desc: 'Fortalecer de forma duradera el vínculo con sus clientes.' },
              ].map(item => (
                <div key={item.title} className="flex flex-col items-center gap-3">
                  <span className="text-4xl">{item.icon}</span>
                  <h3 className="font-bold text-lg text-white">{item.title}</h3>
                  <p className="text-white/80 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SPECIFIC OBJECTIVES */}
      <section
        id="objetivos"
        className="py-24 bg-white"
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-[#6B5CE7] font-semibold text-sm tracking-widest uppercase">Lo que hacemos</span>
            <h2 className="text-4xl font-extrabold text-[#1A1535] mt-3">Objetivos Específicos</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SPECIFIC_OBJECTIVES.map((obj, i) => (
              <div
                key={obj.num}
                className="bg-white rounded-2xl p-7 shadow-sm border border-[#EEEAFF] hover:shadow-md hover:-translate-y-1 transition-all duration-300 group"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div
                  className="text-5xl font-extrabold mb-4 select-none"
                  style={{
                    background: 'linear-gradient(90deg, #6B5CE7, #89CFF0)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    opacity: 0.4,
                  }}
                >
                  {obj.num}
                </div>
                <p className="text-[#1A1535] font-medium text-lg leading-snug group-hover:text-[#6B5CE7] transition-colors">
                  {obj.text}
                </p>
              </div>
            ))}

            {/* filler card */}
            <div
              className="hidden lg:flex bg-[#6B5CE7] rounded-2xl p-7 items-end"
              style={{ background: 'linear-gradient(135deg, #6B5CE7, #89CFF0)' }}
            >
              <div>
                <p className="text-white/80 text-sm mb-2">¿Listo para crecer?</p>
                <a href="#contacto" className="text-white font-bold text-lg hover:underline">
                  Hablemos →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WELLBEING SURVEY */}
      <section id="encuesta" className="py-24 bg-white scroll-mt-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="inline-block bg-[#6B5CE7]/10 text-[#6B5CE7] text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full mb-6 border border-[#6B5CE7]/20">
              Diagnóstico de bienestar
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-[#1A1535] mb-5 leading-tight">
              Estrés, descanso y estilo de vida
            </h2>
            <p className="text-[#4A4570] text-lg leading-relaxed">
              Esta encuesta nos ayuda a identificar hábitos diarios, niveles de agotamiento y factores que influyen en tu bienestar físico y emocional.
            </p>
          </div>

          {surveySubmitted ? (
            <div className="max-w-2xl mx-auto rounded-3xl border border-[#6B5CE7]/20 bg-[#6B5CE7]/5 px-8 py-14 text-center shadow-sm" role="status">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[#6B5CE7] flex items-center justify-center text-white">
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                  <path d="m5 12 4 4L19 6" />
                </svg>
              </div>
              <h3 className="text-3xl font-extrabold text-[#1A1535] mb-3">¡Gracias por participar!</h3>
              <p className="text-[#4A4570] text-lg leading-relaxed mb-8">
                Has completado el diagnóstico. Esta información permitirá comprender mejor los hábitos y necesidades de bienestar.
              </p>
              <button
                type="button"
                onClick={resetSurvey}
                className="border-2 border-[#6B5CE7] text-[#6B5CE7] hover:bg-[#6B5CE7] hover:text-white font-semibold px-7 py-3 rounded-full transition-colors"
              >
                Responder de nuevo
              </button>
            </div>
          ) : (
            <form onSubmit={handleSurveySubmit} className="rounded-3xl border border-[#EEEAFF] bg-white shadow-lg overflow-hidden">
              <div className="sticky top-20 z-10 bg-white/95 backdrop-blur-md border-b border-[#EEEAFF] px-6 md:px-10 py-5">
                <div className="flex items-center justify-between gap-4 mb-3">
                  <p className="font-semibold text-[#1A1535]">Tu progreso</p>
                  <p className="text-sm font-semibold text-[#6B5CE7]" aria-live="polite">
                    {answeredQuestions} de {TOTAL_QUESTIONS} respondidas
                  </p>
                </div>
                <div className="h-2.5 rounded-full bg-[#EEEAFF] overflow-hidden" aria-hidden="true">
                  <div
                    className="h-full rounded-full transition-all duration-300"
                    style={{ width: `${surveyProgress}%`, background: 'linear-gradient(90deg, #6B5CE7, #89CFF0)' }}
                  />
                </div>
              </div>

              <div className="px-6 md:px-10 py-10">
                {SURVEY_SECTIONS.map((section, sectionIndex) => (
                  <fieldset
                    key={section.title}
                    className={`border-0 p-0 m-0 ${sectionIndex > 0 ? 'mt-14 pt-12 border-t border-[#EEEAFF]' : ''}`}
                  >
                    <legend className="w-full mb-8">
                      <span className="flex items-start gap-4 text-left">
                        <span className="shrink-0 w-10 h-10 rounded-xl bg-[#6B5CE7] text-white flex items-center justify-center font-bold">
                          {sectionIndex + 1}
                        </span>
                        <span>
                          <span className="block text-2xl font-extrabold text-[#1A1535]">{section.title}</span>
                          <span className="block text-[#4A4570] mt-1">{section.description}</span>
                        </span>
                      </span>
                    </legend>

                    <div className="space-y-10">
                      {section.questions.map((question, questionIndex) => {
                        const questionNumber = SURVEY_SECTIONS.slice(0, sectionIndex).reduce(
                          (total, currentSection) => total + currentSection.questions.length,
                          0,
                        ) + questionIndex + 1

                        return (
                          <div key={question.id}>
                            <p className="text-lg font-bold text-[#1A1535] mb-4 leading-snug">
                              <span className="text-[#6B5CE7] mr-2">{questionNumber}.</span>
                              {question.text}
                            </p>
                            <div className="grid gap-3">
                              {question.options.map((option, optionIndex) => (
                                <label
                                  key={option}
                                  className={`flex items-center gap-4 rounded-xl border px-4 py-3.5 cursor-pointer transition-all focus-within:ring-2 focus-within:ring-[#89CFF0] focus-within:ring-offset-2 ${
                                    surveyAnswers[question.id] === option
                                      ? 'border-[#6B5CE7] bg-[#6B5CE7]/5 shadow-sm'
                                      : 'border-[#EEEAFF] hover:border-[#89CFF0] hover:bg-[#89CFF0]/5'
                                  }`}
                                >
                                  <input
                                    type="radio"
                                    name={question.id}
                                    value={option}
                                    checked={surveyAnswers[question.id] === option}
                                    onChange={() => setSurveyAnswers(current => ({ ...current, [question.id]: option }))}
                                    required
                                    className="sr-only"
                                  />
                                  <span
                                    className={`w-7 h-7 shrink-0 rounded-full border-2 flex items-center justify-center text-xs font-bold transition-colors ${
                                      surveyAnswers[question.id] === option
                                        ? 'border-[#6B5CE7] bg-[#6B5CE7] text-white'
                                        : 'border-[#89CFF0] text-[#6B5CE7]'
                                    }`}
                                    aria-hidden="true"
                                  >
                                    {surveyAnswers[question.id] === option ? (
                                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                        <path d="m5 12 4 4L19 6" />
                                      </svg>
                                    ) : (
                                      String.fromCharCode(65 + optionIndex)
                                    )}
                                  </span>
                                  <span className="text-[#4A4570] leading-snug">{option}</span>
                                </label>
                              ))}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </fieldset>
                ))}

                <div className="mt-14 pt-8 border-t border-[#EEEAFF] text-center">
                  <p className="text-sm text-[#4A4570] mb-5">
                    {answeredQuestions === TOTAL_QUESTIONS
                      ? 'Todo listo. Ya puedes enviar tus respuestas.'
                      : `Completa las ${TOTAL_QUESTIONS - answeredQuestions} preguntas restantes para enviar.`}
                  </p>
                  <button
                    type="submit"
                    disabled={answeredQuestions !== TOTAL_QUESTIONS}
                    className="text-white font-bold px-10 py-4 rounded-full text-lg bg-[#6B5CE7] hover:bg-[#4F3FD3] disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                  >
                    Enviar respuestas
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </section>

      {/* CONTACT / CTA */}
      <section
        id="contacto"
        className="py-24 bg-white"
      >
        <div className="max-w-4xl mx-auto px-6 text-center">
          <span className="inline-block bg-[#6B5CE7]/10 text-[#6B5CE7] text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full mb-6 border border-[#6B5CE7]/20">
            Contáctanos
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#1A1535] mb-6 leading-tight">
            Impulsemos tu marca{' '}
            <span
              style={{
                background: 'linear-gradient(90deg, #6B5CE7, #89CFF0)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              juntos
            </span>
          </h2>
          <p className="text-[#4A4570] text-lg max-w-xl mx-auto mb-12">
            Estamos aquí para ayudarte a crecer. Cuéntanos sobre tu negocio y diseñaremos la estrategia perfecta para ti.
          </p>

          <form className="bg-white rounded-3xl p-8 md:p-12 border border-[#EEEAFF] shadow-lg text-left grid md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-[#1A1535] text-sm font-semibold">Nombre</label>
              <input
                type="text"
                placeholder="Tu nombre"
                className="bg-[#F8F7FF] border border-[#EEEAFF] rounded-xl px-4 py-3 text-[#1A1535] placeholder-[#9890C0] focus:outline-none focus:border-[#6B5CE7] transition-colors"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[#1A1535] text-sm font-semibold">Negocio</label>
              <input
                type="text"
                placeholder="Nombre de tu negocio"
                className="bg-[#F8F7FF] border border-[#EEEAFF] rounded-xl px-4 py-3 text-[#1A1535] placeholder-[#9890C0] focus:outline-none focus:border-[#6B5CE7] transition-colors"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[#1A1535] text-sm font-semibold">Correo electrónico</label>
              <input
                type="email"
                placeholder="tu@correo.com"
                className="bg-[#F8F7FF] border border-[#EEEAFF] rounded-xl px-4 py-3 text-[#1A1535] placeholder-[#9890C0] focus:outline-none focus:border-[#6B5CE7] transition-colors"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[#1A1535] text-sm font-semibold">Teléfono</label>
              <input
                type="tel"
                placeholder="+57 300 000 0000"
                className="bg-[#F8F7FF] border border-[#EEEAFF] rounded-xl px-4 py-3 text-[#1A1535] placeholder-[#9890C0] focus:outline-none focus:border-[#6B5CE7] transition-colors"
              />
            </div>
            <div className="flex flex-col gap-2 md:col-span-2">
              <label className="text-[#1A1535] text-sm font-semibold">Mensaje</label>
              <textarea
                rows={4}
                placeholder="Cuéntanos sobre tu negocio y qué necesitas..."
                className="bg-[#F8F7FF] border border-[#EEEAFF] rounded-xl px-4 py-3 text-[#1A1535] placeholder-[#9890C0] focus:outline-none focus:border-[#6B5CE7] transition-colors resize-none"
              />
            </div>
            <div className="md:col-span-2 flex justify-center">
              <button
                type="submit"
                className="text-white font-bold px-12 py-4 rounded-full transition-colors duration-200 text-lg"
                style={{ background: 'linear-gradient(90deg, #6B5CE7, #89CFF0)' }}
              >
                Enviar mensaje
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-white border-t border-[#EEEAFF] py-10">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <img src={logo} alt="Cakeval" className="h-12 w-auto" />
          <p className="text-[#9890C0] text-sm text-center">
            © {new Date().getFullYear()} Cakeval — Tabio, Cundinamarca. Todos los derechos reservados.
          </p>
          <div className="flex gap-4">
            {['Facebook', 'Instagram', 'WhatsApp'].map(name => (
              <a
                key={name}
                href="#"
                className="text-[#9890C0] hover:text-[#6B5CE7] text-sm transition-colors font-medium"
              >
                {name}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  )
}
