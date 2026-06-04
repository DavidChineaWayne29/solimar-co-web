import { useState, useEffect } from 'react'
import {
  Menu, X, ArrowRight, Check, ExternalLink,
  UtensilsCrossed, ShoppingBag, Sparkles, Building2, PawPrint, Wrench,
  MessageCircle, Mail, MapPin, ChevronDown,
  Zap, Shield, Clock, Users, ChevronLeft
} from 'lucide-react'

function Logo({ className = 'h-8 w-auto' }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 228 52" fill="none" aria-label="Solimar&Co" className={className}>
      <circle cx="26" cy="16" r="9" fill="#38bdf8"/>
      <path d="M7 34 Q16.5 26 26 34 Q35.5 42 45 34" stroke="#38bdf8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M7 43 Q16.5 35 26 43 Q35.5 51 45 43" stroke="#38bdf8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.35"/>
      <text x="59" y="36" fontFamily="'Inter','Helvetica Neue',Arial,sans-serif" fontWeight="800" fontSize="24" letterSpacing="-0.4">
        <tspan fill="#ffffff">Solimar</tspan><tspan fill="#38bdf8">&amp;</tspan><tspan fill="#ffffff">Co</tspan>
      </text>
    </svg>
  )
}

// ─── Data ────────────────────────────────────────────────────────────────────

const SECTORS = [
  {
    icon: UtensilsCrossed,
    label: 'Restaurantes & Bares',
    desc: 'Menú digital, reservas online y galería de platos. Tus clientes reservan desde el móvil.',
    color: 'from-orange-500/20 to-orange-600/5',
    border: 'border-orange-500/30',
    icon_color: 'text-orange-400',
  },
  {
    icon: ShoppingBag,
    label: 'Moda & Comercios',
    desc: 'Catálogo de productos y tienda con pedido por WhatsApp o pasarela de pago. Abierto 24h.',
    color: 'from-pink-500/20 to-pink-600/5',
    border: 'border-pink-500/30',
    icon_color: 'text-pink-400',
  },
  {
    icon: Sparkles,
    label: 'Salud & Belleza',
    desc: 'Citas online, presentación de servicios y equipo profesional. Agenda siempre llena.',
    color: 'from-violet-500/20 to-violet-600/5',
    border: 'border-violet-500/30',
    icon_color: 'text-violet-400',
  },
  {
    icon: Building2,
    label: 'Hoteles & Alojamientos',
    desc: 'Galería atractiva, información turística y reservas directas. Menos dependencia de Booking.',
    color: 'from-sky-500/20 to-sky-600/5',
    border: 'border-sky-500/30',
    icon_color: 'text-sky-400',
  },
  {
    icon: PawPrint,
    label: 'Mascotas & Veterinarias',
    desc: 'Servicios, citas, productos y equipo. Una web que transmite confianza a los dueños.',
    color: 'from-emerald-500/20 to-emerald-600/5',
    border: 'border-emerald-500/30',
    icon_color: 'text-emerald-400',
  },
  {
    icon: Wrench,
    label: 'Talleres & Servicios',
    desc: 'Servicios, presupuestos online y horarios. Profesionalidad desde el primer clic.',
    color: 'from-amber-500/20 to-amber-600/5',
    border: 'border-amber-500/30',
    icon_color: 'text-amber-400',
  },
]

const PORTFOLIO = [
  {
    name: 'El Rincón Canario',
    sector: 'Restaurante',
    desc: 'Menú digital con alérgenos, reservas online, galería y panel de gestión propio.',
    url: 'https://restaurante-rincon-canario.vercel.app/',
    img: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=600&q=80',
    badge_color: 'bg-orange-500 text-white border-orange-600',
    live: true,
  },
  {
    name: 'Boutique María',
    sector: 'Moda & Retail',
    desc: 'Catálogo de productos con tienda integrada y pedidos por WhatsApp.',
    url: 'https://boutique-maria.vercel.app/',
    img: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&w=600&q=80',
    badge_color: 'bg-pink-500 text-white border-pink-600',
    live: true,
  },
  {
    name: 'Centro Estético Altamira',
    sector: 'Salud & Belleza',
    desc: 'Citas online 24h, gestión de tratamientos, horarios y panel de administración completo.',
    url: 'https://centro-estetico-altamira.vercel.app/',
    img: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=600&q=80',
    badge_color: 'bg-violet-500 text-white border-violet-600',
    live: true,
  },
]

const STEPS = [
  { n: '01', title: 'Prospección', desc: 'Identificamos tu negocio y entendemos qué necesitas.' },
  { n: '02', title: 'Demo',        desc: 'Adaptamos el template a tu sector y marca. Lo ves antes de pagar.' },
  { n: '03', title: 'Acuerdo',     desc: '50% de adelanto, firmamos y arrancamos el desarrollo.' },
  { n: '04', title: 'Entrega',     desc: 'Web publicada con tu dominio. 50% restante al entregar.' },
]

const PLANS = [
  {
    name: 'Básico',
    price: '599',
    monthly: '39',
    desc: 'Para negocios que quieren presencia profesional online.',
    features: [
      'Landing page profesional',
      'Panel de administración',
      'Formulario de contacto',
      'Dominio + SSL incluido',
      'Hosting en Vercel',
      'Entrega en 5 días',
    ],
    cta: 'Empezar',
    highlight: false,
  },
  {
    name: 'Estándar',
    price: '999',
    monthly: '99',
    desc: 'Para negocios que quieren crecer y gestionar su contenido.',
    features: [
      'Todo lo del Básico',
      'Reservas o citas online',
      'Galería gestionable',
      'SEO básico optimizado',
      'i18n ES + EN (turismo)',
      'Actualizaciones mensuales',
    ],
    cta: 'El más popular',
    highlight: true,
  },
  {
    name: 'Premium',
    price: '1.499',
    monthly: '249',
    desc: 'Para negocios que quieren visibilidad y crecimiento total.',
    features: [
      'Todo lo del Estándar',
      'Tienda online integrada',
      'Analytics + informes',
      'SEO avanzado mensual',
      'Gestión de redes sociales',
      'Soporte prioritario',
    ],
    cta: 'Empezar',
    highlight: false,
  },
]

const TESTIMONIALS = [
  {
    text: 'En menos de una semana tenía mi web con reservas funcionando. No me lo podía creer.',
    author: 'María González',
    role: 'El Rincón Canario, Restaurante',
    initial: 'M',
  },
  {
    text: 'El panel para gestionar el catálogo es muy sencillo. Lo actualizo yo sola sin ayuda.',
    author: 'Ana Perdomo',
    role: 'Boutique Ana, Moda',
    initial: 'A',
  },
  {
    text: 'Desde que tengo la web con citas online, la agenda está llena. Ha cambiado todo.',
    author: 'Carlos Medina',
    role: 'Fisioterapia Medina, Salud',
    initial: 'C',
  },
]

// ─── Sub-components ───────────────────────────────────────────────────────────

function Navbar({ onContact }: { onContact: () => void }) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const scroll = (id: string) => {
    setOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-slate-950/95 backdrop-blur border-b border-slate-800' : ''}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <Logo className="h-9 w-auto" />

        <nav className="hidden md:flex items-center gap-8">
          {[['sectores','Sectores'],['proyectos','Proyectos'],['planes','Planes'],['contacto','Contacto']].map(([id, label]) => (
            <button key={id} onClick={() => scroll(id)}
              className="text-sm text-slate-400 hover:text-white transition-colors">
              {label}
            </button>
          ))}
          <button onClick={onContact}
            className="text-sm bg-sky-500 hover:bg-sky-400 text-white px-4 py-2 rounded-lg transition-colors font-medium">
            Pedir presupuesto
          </button>
        </nav>

        <button className="md:hidden text-slate-400 hover:text-white" onClick={() => setOpen(o => !o)}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-slate-950 border-t border-slate-800 px-4 py-6 flex flex-col gap-4">
          {[['sectores','Sectores'],['proyectos','Proyectos'],['planes','Planes'],['contacto','Contacto']].map(([id, label]) => (
            <button key={id} onClick={() => scroll(id)} className="text-left text-slate-300 hover:text-white transition-colors py-1">
              {label}
            </button>
          ))}
          <button onClick={() => { setOpen(false); onContact() }}
            className="self-start text-sm bg-sky-500 text-white px-5 py-2.5 rounded-lg font-medium mt-2">
            Pedir presupuesto
          </button>
        </div>
      )}
    </header>
  )
}

function Hero({ onContact }: { onContact: () => void }) {
  return (
    <section id="inicio" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&w=1920&q=80')` }} />
      <div className="absolute inset-0 bg-slate-950/80" />

      {/* Subtle grid overlay */}
      <div className="absolute inset-0 opacity-10"
        style={{ backgroundImage: 'linear-gradient(rgba(148,163,184,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.3) 1px, transparent 1px)', backgroundSize: '64px 64px' }} />

      <div className="relative z-10 text-center px-4 sm:px-6 max-w-5xl mx-auto pt-16">
        <div className="inline-flex items-center gap-2 bg-sky-500/10 border border-sky-500/30 text-sky-400 text-xs font-medium px-3 py-1.5 rounded-full mb-8">
          <Zap size={12} />
          Agencia de webs para negocios locales · Tenerife
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white leading-tight mb-6">
          Tu negocio local,<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-500">
            con la web que merece
          </span>
        </h1>

        <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed">
          Creamos landing pages profesionales para negocios de Tenerife. Sin complicaciones,
          adaptadas a tu sector y listas en días — no en meses.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button onClick={onContact}
            className="inline-flex items-center justify-center gap-2 bg-sky-500 hover:bg-sky-400 text-white px-8 py-4 rounded-xl text-base font-semibold transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-sky-500/25">
            Pedir presupuesto gratis
            <ArrowRight size={18} />
          </button>
          <button onClick={() => document.getElementById('proyectos')?.scrollIntoView({ behavior: 'smooth' })}
            className="inline-flex items-center justify-center gap-2 border border-slate-600 hover:border-slate-400 text-slate-300 hover:text-white px-8 py-4 rounded-xl text-base font-semibold transition-all">
            Ver proyectos
            <ExternalLink size={16} />
          </button>
        </div>

        <div className="flex items-center justify-center gap-8 mt-16 text-slate-500 text-sm">
          {[['⚡','Entrega en días'],['🔒','Sin letra pequeña'],['💬','Soporte continuo']].map(([emoji, label]) => (
            <span key={label} className="flex items-center gap-2">{emoji} {label}</span>
          ))}
        </div>
      </div>

      <button onClick={() => document.getElementById('sectores')?.scrollIntoView({ behavior: 'smooth' })}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-slate-500 hover:text-slate-300 transition-colors animate-bounce">
        <ChevronDown size={28} />
      </button>
    </section>
  )
}

function Sectors() {
  return (
    <section id="sectores" className="py-24 bg-slate-950">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-sky-400 text-sm font-semibold uppercase tracking-widest mb-3">Sin límites de sector</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Soluciones para cada negocio</h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Adaptamos cada web al sector — no al revés. Tu negocio tiene necesidades únicas y tu web también.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {SECTORS.map((s) => (
            <div key={s.label}
              className={`group relative bg-gradient-to-br ${s.color} border ${s.border} rounded-2xl p-6 hover:scale-[1.02] transition-transform duration-200`}>
              <div className={`${s.icon_color} mb-4`}>
                <s.icon size={28} strokeWidth={1.5} />
              </div>
              <h3 className="text-white font-semibold text-base mb-2">{s.label}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Portfolio() {
  return (
    <section id="proyectos" className="py-24 bg-slate-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-sky-400 text-sm font-semibold uppercase tracking-widest mb-3">Proyectos reales</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Ve el resultado antes de decidir</h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Demos en vivo de webs que hemos creado. Entra, navega y comprueba la calidad tú mismo.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PORTFOLIO.map((p) => (
            <a key={p.name} href={p.live ? p.url : undefined} target={p.live ? '_blank' : undefined} rel="noopener noreferrer"
              className={`bg-slate-800 border border-slate-700 rounded-2xl overflow-hidden group hover:border-slate-500 transition-colors block ${p.live ? 'cursor-pointer' : 'cursor-default'}`}>
              <div className="relative h-48 overflow-hidden">
                <img src={p.img} alt={p.name} loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
                <span className={`absolute top-3 left-3 text-xs font-medium px-2.5 py-1 rounded-full border ${p.badge_color}`}>
                  {p.sector}
                </span>
                {p.live && (
                  <span className="absolute top-3 right-3 flex items-center gap-1 text-xs bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                    En vivo
                  </span>
                )}
              </div>

              <div className="p-5">
                <h3 className="text-white font-semibold text-base mb-1">{p.name}</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-4">{p.desc}</p>

                {p.live ? (
                  <span className="inline-flex items-center gap-2 text-sky-400 group-hover:text-sky-300 text-sm font-medium transition-colors">
                    Ver demo en vivo
                    <ExternalLink size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-2 text-slate-600 text-sm">
                    <Clock size={14} />
                    Próximamente
                  </span>
                )}
              </div>
            </a>
          ))}
        </div>

        <p className="text-center text-slate-500 text-sm mt-8">
          ¿Tu sector no aparece? <button onClick={() => document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' })}
            className="text-sky-400 hover:text-sky-300 transition-colors">Cuéntanos tu caso →</button>
        </p>
      </div>
    </section>
  )
}

function Process() {
  return (
    <section className="py-24 bg-slate-950">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-sky-400 text-sm font-semibold uppercase tracking-widest mb-3">Simple y claro</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Cómo funciona</h2>
          <p className="text-slate-400 text-lg">De la idea a la web publicada en menos de dos semanas.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STEPS.map((s, i) => (
            <div key={s.n} className="relative">
              {i < STEPS.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-full w-full h-px bg-gradient-to-r from-slate-700 to-transparent z-0" />
              )}
              <div className="relative bg-slate-900 border border-slate-800 rounded-2xl p-6">
                <span className="text-4xl font-bold text-slate-800 mb-4 block">{s.n}</span>
                <h3 className="text-white font-semibold text-base mb-2">{s.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Pricing({ onContact }: { onContact: () => void }) {
  return (
    <section id="planes" className="py-24 bg-slate-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-sky-400 text-sm font-semibold uppercase tracking-widest mb-3">Precio justo</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Planes transparentes</h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">Sin sorpresas. Precio fijo de desarrollo + cuota mensual de mantenimiento.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {PLANS.map((plan) => (
            <div key={plan.name}
              className={`relative rounded-2xl p-7 border transition-all ${
                plan.highlight
                  ? 'bg-sky-500/10 border-sky-500/50 ring-1 ring-sky-500/30 scale-[1.02]'
                  : 'bg-slate-800 border-slate-700'
              }`}>
              {plan.highlight && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="bg-sky-500 text-white text-xs font-bold px-4 py-1.5 rounded-full">MÁS POPULAR</span>
                </div>
              )}

              <h3 className={`text-lg font-bold mb-1 ${plan.highlight ? 'text-sky-400' : 'text-white'}`}>{plan.name}</h3>
              <p className="text-slate-400 text-sm mb-5">{plan.desc}</p>

              <p className="text-xs font-semibold uppercase tracking-widest text-sky-400/80 mb-2">Único pago</p>
              <div className="flex items-baseline gap-2 flex-wrap mb-1">
                <span className="text-4xl font-bold text-white">{plan.price}€</span>
                <span className="text-slate-400 text-sm">desarrollo + IGIC</span>
              </div>
              <p className="text-slate-400 text-sm mb-6">+ {plan.monthly}€/mes mantenimiento + IGIC</p>

              <ul className="space-y-3 mb-7">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-slate-300">
                    <Check size={15} className={`flex-shrink-0 mt-0.5 ${plan.highlight ? 'text-sky-400' : 'text-emerald-400'}`} />
                    {f}
                  </li>
                ))}
              </ul>

              <button onClick={onContact}
                className={`w-full py-3 rounded-xl text-sm font-semibold transition-all ${
                  plan.highlight
                    ? 'bg-sky-500 hover:bg-sky-400 text-white'
                    : 'bg-slate-700 hover:bg-slate-600 text-white'
                }`}>
                {plan.highlight ? '→ Empezar ahora' : 'Contactar'}
              </button>
            </div>
          ))}
        </div>

        <p className="text-center text-slate-500 text-sm mt-10">
          ¿Necesitas algo específico? <button onClick={onContact} className="text-sky-400 hover:text-sky-300 transition-colors">Hablamos y te hacemos una propuesta a medida →</button>
        </p>
      </div>
    </section>
  )
}

function Testimonials() {
  return (
    <section className="py-24 bg-slate-950">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-sky-400 text-sm font-semibold uppercase tracking-widest mb-3">Clientes reales</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Lo que dicen de nosotros</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t) => (
            <div key={t.author} className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <div className="flex gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} className="text-amber-400 text-sm">★</span>
                ))}
              </div>
              <p className="text-slate-300 text-sm leading-relaxed mb-6 italic">"{t.text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-sky-500/20 border border-sky-500/30 flex items-center justify-center">
                  <span className="text-sky-400 text-sm font-bold">{t.initial}</span>
                </div>
                <div>
                  <p className="text-white text-sm font-medium">{t.author}</p>
                  <p className="text-slate-500 text-xs">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Contact() {
  const [fields, setFields] = useState({ name: '', email: '', phone: '', sector: '', message: '' })
  const [via, setVia] = useState<'email' | 'whatsapp'>('email')
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (via === 'whatsapp') {
      const msg = encodeURIComponent(
        `Hola, me interesa vuestra web para mi negocio.\n\n` +
        `👤 Nombre: ${fields.name}\n` +
        `🏪 Sector: ${fields.sector || 'No especificado'}\n` +
        `📞 Teléfono: ${fields.phone}\n\n` +
        `💬 ${fields.message}`
      )
      window.open(`https://wa.me/34618542063?text=${msg}`, '_blank')
      setSent(true)
      return
    }

    setSending(true)
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: '85f32425-d389-4407-9a5c-284fc31d8c34',
          subject: `Nueva solicitud de ${fields.name} — Solimar&Co.`,
          from_name: 'Solimar&Co. Web',
          name: fields.name,
          email: fields.email,
          phone: fields.phone || '—',
          sector: fields.sector || '—',
          message: fields.message,
        }),
      })
      const data = await res.json()
      if (data.success) {
        setSent(true)
      } else {
        setError('Error al enviar. Inténtalo de nuevo o escríbenos por WhatsApp.')
      }
    } catch {
      setError('Error de red. Inténtalo de nuevo.')
    } finally {
      setSending(false)
    }
  }

  const inputClass = 'w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-colors'

  return (
    <section id="contacto" className="py-24 bg-slate-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Left */}
          <div>
            <p className="text-sky-400 text-sm font-semibold uppercase tracking-widest mb-3">Sin compromiso</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Cuéntanos tu proyecto
            </h2>
            <p className="text-slate-400 text-lg leading-relaxed mb-10">
              Rellena el formulario y te enviamos una propuesta personalizada en menos de 24h.
              Sin costes ocultos, sin letra pequeña.
            </p>

            <div className="space-y-6">
              {[
                { icon: MessageCircle, label: 'WhatsApp', value: '+34 618 542 063', href: 'https://wa.me/34618542063' },
                { icon: Mail, label: 'Email', value: 'solimarcoweb@gmail.com', href: 'mailto:solimarcoweb@gmail.com' },
                { icon: MapPin, label: 'Ubicación', value: 'Tenerife, Canarias', href: null },
              ].map(({ icon: Icon, label, value, href }) => (
                <div key={label} className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-sky-500/10 border border-sky-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Icon size={18} className="text-sky-400" />
                  </div>
                  <div>
                    <p className="text-slate-500 text-xs">{label}</p>
                    {href ? (
                      <a href={href} className="text-white text-sm hover:text-sky-400 transition-colors">{value}</a>
                    ) : (
                      <p className="text-white text-sm">{value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-3 gap-4 mt-12">
              {[
                { icon: Zap, label: 'Entrega rápida', sub: '5-10 días' },
                { icon: Shield, label: 'Sin sorpresas', sub: 'Precio fijo' },
                { icon: Users, label: 'Soporte', sub: 'Continuo' },
              ].map(({ icon: Icon, label, sub }) => (
                <div key={label} className="bg-slate-800 border border-slate-700 rounded-xl p-4 text-center">
                  <Icon size={20} className="text-sky-400 mx-auto mb-2" />
                  <p className="text-white text-xs font-medium">{label}</p>
                  <p className="text-slate-500 text-xs">{sub}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Form */}
          <div className="bg-slate-800 border border-slate-700 rounded-2xl p-7">
            {sent ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-emerald-500/20 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check size={28} className="text-emerald-400" />
                </div>
                <h3 className="text-white font-bold text-xl mb-2">¡Mensaje recibido!</h3>
                <p className="text-slate-400">Te respondemos en menos de 24h con tu propuesta.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <p className="text-slate-400 text-xs mb-2">¿Cómo prefieres que te contactemos?</p>
                  <div className="grid grid-cols-2 gap-2">
                    {(['email', 'whatsapp'] as const).map((opt) => (
                      <button key={opt} type="button" onClick={() => setVia(opt)}
                        className={`flex items-center justify-center gap-2 py-2.5 rounded-xl border text-sm font-medium transition-all ${
                          via === opt
                            ? opt === 'whatsapp'
                              ? 'bg-emerald-500/15 border-emerald-500 text-emerald-400'
                              : 'bg-sky-500/15 border-sky-500 text-sky-400'
                            : 'border-slate-600 text-slate-400 hover:border-slate-500'
                        }`}>
                        {opt === 'whatsapp' ? <MessageCircle size={15} /> : <Mail size={15} />}
                        {opt === 'whatsapp' ? 'WhatsApp' : 'Email'}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-slate-400 text-xs block mb-1.5">Nombre *</label>
                    <input value={fields.name} onChange={e => setFields(f => ({ ...f, name: e.target.value }))}
                      required placeholder="Tu nombre" className={inputClass} />
                  </div>
                  <div>
                    <label className="text-slate-400 text-xs block mb-1.5">Teléfono {via === 'whatsapp' ? '*' : ''}</label>
                    <input value={fields.phone} onChange={e => setFields(f => ({ ...f, phone: e.target.value }))}
                      required={via === 'whatsapp'} placeholder="+34 600 000 000" className={inputClass} />
                  </div>
                </div>
                {via === 'email' && (
                  <div>
                    <label className="text-slate-400 text-xs block mb-1.5">Email *</label>
                    <input type="email" value={fields.email} onChange={e => setFields(f => ({ ...f, email: e.target.value }))}
                      required placeholder="tu@email.com" className={inputClass} />
                  </div>
                )}
                <div>
                  <label className="text-slate-400 text-xs block mb-1.5">Sector de tu negocio</label>
                  <select value={fields.sector} onChange={e => setFields(f => ({ ...f, sector: e.target.value }))}
                    className={inputClass}>
                    <option value="">Selecciona un sector</option>
                    {['Restaurante / Bar', 'Moda / Retail', 'Salud / Belleza', 'Hotel / Alojamiento', 'Mascotas / Veterinaria', 'Taller / Servicios', 'Otro'].map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-slate-400 text-xs block mb-1.5">¿Qué necesitas? *</label>
                  <textarea value={fields.message} onChange={e => setFields(f => ({ ...f, message: e.target.value }))}
                    required rows={3} placeholder="Cuéntanos tu negocio y qué esperas de tu web..."
                    className={`${inputClass} resize-none`} />
                </div>
                {error && (
                  <p className="text-red-400 text-xs text-center bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-2">{error}</p>
                )}
                <button type="submit" disabled={sending}
                  className={`w-full disabled:opacity-60 disabled:cursor-not-allowed text-white py-3.5 rounded-xl text-sm font-semibold transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2 ${
                    via === 'whatsapp' ? 'bg-emerald-500 hover:bg-emerald-400' : 'bg-sky-500 hover:bg-sky-400'
                  }`}>
                  {sending ? 'Enviando...' : via === 'whatsapp'
                    ? <><MessageCircle size={16} /><span>Abrir WhatsApp</span></>
                    : <><span>Enviar por email</span><ArrowRight size={16} /></>
                  }
                </button>
                <p className="text-slate-600 text-xs text-center">
                  {via === 'whatsapp' ? 'Se abrirá WhatsApp con el mensaje listo para enviar' : 'Respuesta garantizada en menos de 24h'}
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

type LegalPage = 'home' | 'aviso-legal' | 'cookies'

function Footer({ onNavigate }: { onNavigate: (page: LegalPage) => void }) {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <Logo className="h-9 w-auto" />
        <p className="text-slate-600 text-sm">© {new Date().getFullYear()} Solimar&Co · Tenerife, Canarias</p>
        <div className="flex gap-6">
          <button onClick={() => onNavigate('aviso-legal')} className="text-slate-600 hover:text-slate-400 text-sm transition-colors">Aviso legal</button>
          <button onClick={() => onNavigate('cookies')} className="text-slate-600 hover:text-slate-400 text-sm transition-colors">Política de cookies</button>
        </div>
      </div>
    </footer>
  )
}

// ─── Legal pages ──────────────────────────────────────────────────────────────

function LegalLayout({ title, onBack, children }: { title: string; onBack: () => void; children: React.ReactNode }) {
  return (
    <div className="bg-slate-950 text-slate-50 antialiased font-sans min-h-screen">
      <header className="sticky top-0 z-50 bg-slate-950/95 backdrop-blur border-b border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <button onClick={onBack} className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm">
            <ChevronLeft size={16} />
            Volver
          </button>
          <Logo className="h-9 w-auto" />
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-10">{title}</h1>
        <div className="prose prose-invert prose-slate max-w-none space-y-8 text-slate-300 leading-relaxed">
          {children}
        </div>
      </main>

      <footer className="border-t border-slate-800 py-8 mt-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-slate-600 text-sm text-center">© {new Date().getFullYear()} Solimar&Co · Tenerife, Canarias</p>
        </div>
      </footer>
    </div>
  )
}

function AvisoLegalPage({ onBack }: { onBack: () => void }) {
  useEffect(() => {
    window.scrollTo(0, 0)
    document.title = 'Aviso Legal · Solimar&Co'
  }, [])

  return (
    <LegalLayout title="Aviso Legal" onBack={onBack}>
      <section>
        <h2 className="text-xl font-semibold text-white mb-3">1. Datos identificativos del titular</h2>
        <p>
          En cumplimiento del artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la
          Información y de Comercio Electrónico (LSSI-CE), se informa que el titular de este sitio web es:
        </p>
        <ul className="list-none space-y-1 mt-3 text-slate-400 text-sm">
          <li><span className="text-slate-300 font-medium">Denominación:</span> Solimar &amp; Co</li>
          <li><span className="text-slate-300 font-medium">Actividad:</span> Agencia de desarrollo web y servicios digitales para negocios locales</li>
          <li><span className="text-slate-300 font-medium">Domicilio:</span> Tenerife, Islas Canarias, España</li>
          <li><span className="text-slate-300 font-medium">Correo electrónico:</span> solimarcoweb@gmail.com</li>
          <li>
            <span className="text-slate-300 font-medium">Situación fiscal:</span>{' '}
            Alta como trabajador autónomo en trámite ante la Agencia Tributaria y la Seguridad Social.
            Durante este período de constitución, la actividad se desarrolla conforme a la normativa vigente,
            asumiendo el titular plena responsabilidad frente a clientes y terceros.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-white mb-3">2. Objeto y ámbito de aplicación</h2>
        <p>
          El presente Aviso Legal regula el acceso y uso del sitio web solimarco.com (en adelante, "el Sitio"),
          titularidad de Solimar &amp; Co, a través del cual se ofrece información sobre servicios de diseño y
          desarrollo de páginas web para negocios locales en Tenerife.
        </p>
        <p className="mt-3">
          El acceso y/o uso del Sitio atribuye la condición de usuario, que acepta, desde dicho acceso y/o uso,
          las condiciones recogidas en este Aviso Legal.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-white mb-3">3. Propiedad intelectual e industrial</h2>
        <p>
          Todos los contenidos del Sitio — incluyendo, a título enunciativo, textos, fotografías, gráficos,
          imágenes, tecnología, software, diseño gráfico y código fuente — son propiedad de Solimar &amp; Co
          o de terceros que han autorizado su uso, y están protegidos por las leyes de propiedad intelectual e
          industrial vigentes.
        </p>
        <p className="mt-3">
          Queda expresamente prohibida la reproducción, distribución, comunicación pública o transformación
          total o parcial de los contenidos del Sitio sin autorización expresa por escrito de Solimar &amp; Co.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-white mb-3">4. Limitación de responsabilidad</h2>
        <p>
          Solimar &amp; Co no garantiza la disponibilidad ininterrumpida del Sitio ni la ausencia de errores en
          sus contenidos. Los contenidos del Sitio tienen carácter meramente informativo y no constituyen
          oferta vinculante de servicios. Los presupuestos y condiciones concretas se acuerdan individualmente
          con cada cliente.
        </p>
        <p className="mt-3">
          Solimar &amp; Co no se hace responsable de los daños y perjuicios que pudieran derivarse del uso del
          Sitio, de la imposibilidad de acceso o de la presencia de virus informáticos.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-white mb-3">5. Precios y fiscalidad</h2>
        <p>
          Los precios indicados en el Sitio son orientativos y no incluyen el Impuesto General Indirecto Canario
          (IGIC), que será aplicado conforme a la normativa fiscal vigente en las Islas Canarias. El presupuesto
          final se detallará en la propuesta enviada a cada cliente.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-white mb-3">6. Protección de datos</h2>
        <p>
          Los datos personales facilitados a través del formulario de contacto del Sitio serán tratados por
          Solimar &amp; Co con la finalidad de gestionar su consulta o solicitud de presupuesto. No se cederán
          a terceros sin su consentimiento, salvo obligación legal. Puede ejercer sus derechos de acceso,
          rectificación, supresión y portabilidad escribiendo a solimarcoweb@gmail.com.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-white mb-3">7. Ley aplicable y jurisdicción</h2>
        <p>
          Las presentes condiciones se rigen por la legislación española. Para la resolución de cualquier
          controversia derivada del acceso o uso del Sitio, las partes se someten a la jurisdicción de los
          Juzgados y Tribunales de Santa Cruz de Tenerife, con renuncia expresa a cualquier otro fuero que
          pudiera corresponderles.
        </p>
      </section>

      <p className="text-slate-500 text-xs pt-4 border-t border-slate-800">Última actualización: junio de 2025</p>
    </LegalLayout>
  )
}

function CookiesPolicyPage({ onBack }: { onBack: () => void }) {
  useEffect(() => {
    window.scrollTo(0, 0)
    document.title = 'Política de Cookies · Solimar&Co'
  }, [])

  return (
    <LegalLayout title="Política de Cookies" onBack={onBack}>
      <section>
        <h2 className="text-xl font-semibold text-white mb-3">1. ¿Qué son las cookies?</h2>
        <p>
          Las cookies son pequeños archivos de texto que los sitios web almacenan en el dispositivo del usuario.
          Permiten que el sitio recuerde información sobre tu visita, como el idioma preferido y otras opciones,
          con el fin de facilitar tu próxima visita y hacer que el sitio te resulte más útil.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-white mb-3">2. Cookies que utiliza este sitio</h2>
        <p className="mb-4">
          Este sitio web tiene un enfoque respetuoso con la privacidad. A continuación se detallan las cookies
          y tecnologías de seguimiento utilizadas:
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-700">
                <th className="text-left py-3 pr-6 text-slate-300 font-semibold">Tipo</th>
                <th className="text-left py-3 pr-6 text-slate-300 font-semibold">Proveedor</th>
                <th className="text-left py-3 text-slate-300 font-semibold">Finalidad</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              <tr>
                <td className="py-3 pr-6 text-slate-400">Técnica</td>
                <td className="py-3 pr-6 text-slate-400">Vercel</td>
                <td className="py-3 text-slate-400">Hosting y entrega de contenido. Sin seguimiento personal.</td>
              </tr>
              <tr>
                <td className="py-3 pr-6 text-slate-400">Analítica</td>
                <td className="py-3 pr-6 text-slate-400">Vercel Analytics</td>
                <td className="py-3 text-slate-400">Estadísticas de visitas agregadas. Sin cookies, sin seguimiento individual, compatible con RGPD.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-6 bg-sky-500/10 border border-sky-500/20 rounded-xl p-4">
          <p className="text-sky-300 text-sm font-medium mb-1">Sin banner de cookies necesario</p>
          <p className="text-slate-400 text-sm">
            Las herramientas de analítica que utilizamos (Vercel Analytics) no emplean cookies ni rastrean
            a usuarios individuales, por lo que este sitio no requiere consentimiento de cookies según
            el Reglamento General de Protección de Datos (RGPD) y la Ley de Servicios de la Sociedad de
            la Información (LSSI).
          </p>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-white mb-3">3. Cómo gestionar o desactivar las cookies</h2>
        <p className="mb-3">
          Puedes configurar tu navegador para que rechace todas las cookies, acepte solo determinadas cookies
          o te avise cuando se envíe una cookie. A continuación encontrarás los enlaces de configuración de
          los navegadores más habituales:
        </p>
        <ul className="space-y-2 text-sm text-slate-400">
          <li><span className="text-slate-300">Google Chrome:</span> Ajustes → Privacidad y seguridad → Cookies y otros datos de sitios</li>
          <li><span className="text-slate-300">Mozilla Firefox:</span> Preferencias → Privacidad y seguridad → Cookies y datos del sitio</li>
          <li><span className="text-slate-300">Safari:</span> Preferencias → Privacidad → Cookies y datos del sitio web</li>
          <li><span className="text-slate-300">Microsoft Edge:</span> Configuración → Cookies y permisos del sitio</li>
        </ul>
        <p className="mt-3 text-slate-500 text-sm">
          Ten en cuenta que deshabilitar las cookies podría afectar a la funcionalidad de algunos sitios web.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-white mb-3">4. Cambios en esta política</h2>
        <p>
          Solimar &amp; Co se reserva el derecho a actualizar esta Política de Cookies para adaptarla a
          cambios legislativos o a modificaciones en las herramientas utilizadas. Se recomienda revisar
          esta página periódicamente.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-white mb-3">5. Contacto</h2>
        <p>
          Para cualquier consulta sobre el uso de cookies en este sitio, puedes contactarnos en{' '}
          <a href="mailto:solimarcoweb@gmail.com" className="text-sky-400 hover:text-sky-300 transition-colors">solimarcoweb@gmail.com</a>.
        </p>
      </section>

      <p className="text-slate-500 text-xs pt-4 border-t border-slate-800">Última actualización: junio de 2025</p>
    </LegalLayout>
  )
}

// ─── Main page ────────────────────────────────────────────────────────────────

export function SolimarPage() {
  const [page, setPage] = useState<LegalPage>('home')

  const navigate = (p: LegalPage) => {
    setPage(p)
    const path = p === 'home' ? '/' : `/${p}`
    history.pushState(null, '', path)
  }

  useEffect(() => {
    const handlePop = () => {
      const path = window.location.pathname
      if (path === '/aviso-legal') setPage('aviso-legal')
      else if (path === '/cookies') setPage('cookies')
      else setPage('home')
    }
    window.addEventListener('popstate', handlePop)
    return () => window.removeEventListener('popstate', handlePop)
  }, [])

  useEffect(() => {
    if (page !== 'home') return
    document.title = 'Solimar&Co · Webs para negocios locales en Tenerife'
    let link = document.querySelector("link[rel~='icon']") as HTMLLinkElement
    if (!link) {
      link = document.createElement('link')
      link.rel = 'icon'
      link.type = 'image/svg+xml'
      document.head.appendChild(link)
    }
    link.href = '/favicon.svg'
  }, [page])

  if (page === 'aviso-legal') return <AvisoLegalPage onBack={() => navigate('home')} />
  if (page === 'cookies') return <CookiesPolicyPage onBack={() => navigate('home')} />

  const scrollToContact = () => document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' })

  return (
    <div className="bg-slate-950 text-slate-50 antialiased font-sans">
      <Navbar onContact={scrollToContact} />
      <Hero onContact={scrollToContact} />
      <Sectors />
      <Portfolio />
      <Process />
      <Pricing onContact={scrollToContact} />
      <Testimonials />
      <Contact />
      <Footer onNavigate={navigate} />
    </div>
  )
}
