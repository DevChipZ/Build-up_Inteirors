import React, { useState, useRef } from 'react';
import { 
  Menu, X, Hammer, HardHat, Wrench, Paintbrush, 
  UploadCloud, ArrowRight, CheckCircle2, ChevronRight, 
  ImageIcon, MapPin, Phone, Mail, Instagram, Check
} from 'lucide-react';

// Custom CSS for animations and layout
const customStyles = `
  @keyframes slideInUp {
    0% { transform: translateY(100%); }
    100% { transform: translateY(0); }
  }
  @keyframes slideOutUp {
    0% { transform: translateY(0); }
    100% { transform: translateY(-100%); }
  }
  @keyframes scurryRight {
    0% { transform: translateX(-10vw) translateY(0) rotate(-5deg); opacity: 0; }
    10% { opacity: 1; }
    25% { transform: translateX(25vw) translateY(-5px) rotate(5deg); }
    50% { transform: translateX(50vw) translateY(0) rotate(-5deg); }
    75% { transform: translateX(75vw) translateY(-5px) rotate(5deg); }
    90% { opacity: 1; }
    100% { transform: translateX(110vw) translateY(0) rotate(-5deg); opacity: 0; }
  }
  .worker-anim {
    animation: scurryRight 0.7s linear forwards;
  }
  .worker-delay-1 { animation-delay: 0.0s; }
  .worker-delay-2 { animation-delay: 0.1s; }
  .worker-delay-3 { animation-delay: 0.05s; }
  .worker-delay-4 { animation-delay: 0.15s; }
  .worker-delay-5 { animation-delay: 0.2s; }
  
  .hide-scrollbar::-webkit-scrollbar {
    display: none;
  }
  .hide-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`;

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionStage, setTransitionStage] = useState('idle'); // idle, entering, leaving
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Navigation Logic with "Tiny Workers" Transition
  const navigate = (page) => {
    if (currentPage === page || isTransitioning) {
      setMobileMenuOpen(false);
      return;
    }
    
    setMobileMenuOpen(false);
    setIsTransitioning(true);
    setTransitionStage('entering');

    // Swap page when screen is fully covered by transition overlay
    setTimeout(() => {
      setCurrentPage(page);
      setTransitionStage('leaving');
    }, 500);

    // End transition
    setTimeout(() => {
      setIsTransitioning(false);
      setTransitionStage('idle');
    }, 1000); 
  };

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'portfolio', label: 'Portfolio' },
    { id: 'about', label: 'About' },
  ];

  return (
    <div className="min-h-screen bg-white text-zinc-900 font-sans selection:bg-emerald-600 selection:text-white overflow-x-hidden">
      <style>{customStyles}</style>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-white/90 backdrop-blur-md border-b border-zinc-200">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => navigate('home')}
          >
            {/* Logo Mark */}
            <div className="relative w-12 h-12 flex items-center justify-center bg-zinc-900 rounded-xl overflow-hidden group-hover:bg-emerald-600 transition-colors">
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="w-0 h-0 border-l-[12px] border-r-[12px] border-b-[12px] border-transparent border-b-emerald-500 mb-1"></div>
                <span className="text-white font-black text-xs tracking-widest">UP</span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-tight leading-none text-zinc-900 uppercase">
                Buildup
              </span>
              <span className="text-xs font-semibold tracking-[0.2em] text-emerald-600 uppercase">
                Interior
              </span>
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex gap-8 items-center">
            {navLinks.map((link) => (
              <button 
                key={link.id}
                onClick={() => navigate(link.id)} 
                className={`text-sm font-bold uppercase tracking-wider transition-colors hover:text-emerald-600 ${
                  currentPage === link.id ? 'text-emerald-600' : 'text-zinc-500'
                }`}
              >
                {link.label}
              </button>
            ))}
            <button 
              onClick={() => navigate('quote')}
              className="bg-zinc-900 hover:bg-emerald-600 text-white px-6 py-2.5 rounded-none font-bold uppercase tracking-wider text-sm transition-all"
            >
              Get a Quote
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 text-zinc-900"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation Dropdown */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 bg-white pt-24 px-6 md:hidden">
          <div className="flex flex-col gap-6">
            {navLinks.map((link) => (
              <button 
                key={link.id}
                onClick={() => navigate(link.id)} 
                className={`text-2xl font-black uppercase tracking-wider text-left ${
                  currentPage === link.id ? 'text-emerald-600' : 'text-zinc-900'
                }`}
              >
                {link.label}
              </button>
            ))}
            <button 
              onClick={() => navigate('quote')}
              className="bg-emerald-600 text-white px-6 py-4 rounded-none font-black uppercase tracking-wider text-xl mt-4 w-full text-left"
            >
              Get a Quote
            </button>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="pt-20 min-h-screen">
        {currentPage === 'home' && <HomePage onNavigate={navigate} />}
        {currentPage === 'services' && <ServicesPage />}
        {currentPage === 'portfolio' && <PortfolioPage />}
        {currentPage === 'about' && <AboutPage />}
        {currentPage === 'quote' && <QuotePage />}
      </main>

      {/* Footer */}
      <footer className="bg-zinc-900 text-zinc-400 py-16 border-t-[8px] border-emerald-600">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-12">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-white rounded-lg flex flex-col items-center justify-center">
                 <div className="w-0 h-0 border-l-[8px] border-r-[8px] border-b-[8px] border-transparent border-b-emerald-600 mb-1"></div>
                 <span className="text-zinc-900 font-black text-[10px] tracking-widest">UP</span>
              </div>
              <span className="text-xl font-black text-white uppercase tracking-wider">Buildup Interior</span>
            </div>
            <p className="text-sm leading-relaxed mb-6">
              Nagercoil's premier interior design studio specializing in turnkey projects, modular kitchens, and bespoke civil work.
            </p>
            <div className="flex gap-4">
              <a href="https://www.instagram.com/buildup_interior/" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-bold uppercase tracking-wider mb-6">Contact Us</h4>
            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-emerald-500 shrink-0" />
                <p>Purple Men's Wear Back,<br/>Anna Bus Stand,<br/>Nagercoil 629 001</p>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-emerald-500 shrink-0" />
                <p>+91 98765 43210</p>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-emerald-500 shrink-0" />
                <p>hello@buildupinterior.com</p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold uppercase tracking-wider mb-6">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              {navLinks.map(link => (
                <li key={link.id}>
                  <button onClick={() => navigate(link.id)} className="hover:text-emerald-500 transition-colors uppercase tracking-wider">
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-zinc-800 text-xs text-center">
          &copy; {new Date().getFullYear()} Buildup Interior. All rights reserved. Nagercoil.
        </div>
      </footer>

      {/* Tiny Workers Transition Overlay */}
      {isTransitioning && (
        <div 
          className="fixed inset-0 z-50 pointer-events-none flex flex-col justify-center overflow-hidden bg-zinc-900"
          style={{
            animation: transitionStage === 'entering' 
              ? 'slideInUp 0.4s cubic-bezier(0.7, 0, 0.3, 1) forwards' 
              : 'slideOutUp 0.5s cubic-bezier(0.7, 0, 0.3, 1) forwards'
          }}
        >
          {/* Construction Tape / Banner */}
          <div className="absolute top-1/2 -translate-y-1/2 w-full h-48 bg-emerald-600 flex flex-col justify-center items-center overflow-hidden">
             {/* Diagonal stripes */}
             <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #000 0, #000 20px, transparent 20px, transparent 40px)' }}></div>
             
             <h2 className="relative z-10 text-white font-black text-6xl md:text-8xl opacity-30 tracking-tighter uppercase mb-4">
               Constructing View
             </h2>
          </div>
          
          {/* The Tiny Workers */}
          <div className="absolute top-1/2 -translate-y-1/2 w-full h-32 flex items-center z-20">
            {[...Array(12)].map((_, i) => {
              const icons = ['👷‍♂️', '🚧', '🏗️', '🔨', '📏'];
              const icon = icons[i % icons.length];
              const topOffset = Math.random() * 80 - 40;
              const delayClass = `worker-delay-${(i % 5) + 1}`;
              
              return (
                <div 
                  key={i} 
                  className={`absolute worker-anim ${delayClass} text-4xl`}
                  style={{ top: `calc(50% + ${topOffset}px)` }}
                >
                  {icon}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

// --- Home Page Component ---
function HomePage({ onNavigate }) {
  return (
    <div className="animate-in fade-in duration-700">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden bg-zinc-900">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80" 
            alt="Modern Interior" 
            className="w-full h-full object-cover opacity-40 mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-900 via-zinc-900/80 to-transparent"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 w-full pt-20">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600/20 border border-emerald-500/30 text-emerald-400 text-sm font-bold tracking-wider uppercase mb-6">
              <MapPin className="w-4 h-4" /> Nagercoil's Premier Studio
            </div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-[1.1] text-white mb-6 uppercase">
              Transforming <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-600">
                Spaces & Lives.
              </span>
            </h1>
            <p className="text-xl text-zinc-300 mb-10 max-w-xl leading-relaxed">
              Expert interior design and civil work. From bespoke modular kitchens to complete turnkey projects, we build your vision.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => onNavigate('quote')}
                className="group bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-4 font-black uppercase tracking-wider text-sm flex items-center justify-center gap-3 transition-all"
              >
                Start Your Project
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button 
                onClick={() => onNavigate('portfolio')}
                className="group bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm border border-white/20 px-8 py-4 font-black uppercase tracking-wider text-sm flex items-center justify-center transition-all"
              >
                View Our Work
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Snippet */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <h2 className="text-4xl font-black uppercase tracking-tighter mb-4">Our Core Services</h2>
              <p className="text-zinc-500 max-w-md">Comprehensive interior and civil solutions tailored for residential and commercial spaces.</p>
            </div>
            <button onClick={() => onNavigate('services')} className="text-emerald-600 font-bold uppercase tracking-wider text-sm flex items-center gap-2 hover:gap-3 transition-all">
              All Services <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {['Modular Kitchen', 'Custom Wardrobes', 'False Ceiling', 'Turnkey Projects'].map((service, i) => (
              <div key={i} className="group cursor-pointer">
                <div className="aspect-square bg-zinc-100 mb-6 overflow-hidden relative">
                  <div className="absolute inset-0 bg-emerald-600/0 group-hover:bg-emerald-600/20 transition-colors z-10"></div>
                  <img 
                    src={`https://images.unsplash.com/photo-${['1556910103-1c02745a828', '1595515106969-1ce29566ff1c', '1505691938895-1758d7bef511', '1503387762-592deb58ef4e'][i]}?auto=format&fit=crop&w=600&q=80`} 
                    alt={service}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <h3 className="text-xl font-bold uppercase tracking-tight group-hover:text-emerald-600 transition-colors">{service}</h3>
                <div className="w-12 h-1 bg-emerald-600 mt-4 group-hover:w-full transition-all duration-300"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

// --- Services Page ---
function ServicesPage() {
  const services = [
    {
      title: "Modular Kitchen",
      desc: "Ergonomic, modern, and highly functional kitchen designs customized to fit your cooking style and space perfectly. Utilizing premium materials for durability.",
      img: "https://images.unsplash.com/photo-1556910103-1c02745a828?auto=format&fit=crop&w=1200&q=80"
    },
    {
      title: "Wardrobes",
      desc: "Sleek, space-saving, and elegant wardrobe solutions. From walk-ins to sliding doors, we maximize storage without compromising on bedroom aesthetics.",
      img: "https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?auto=format&fit=crop&w=1200&q=80"
    },
    {
      title: "False Ceiling",
      desc: "Innovative false ceiling designs featuring modern geometric patterns, ambient cove lighting, and acoustic benefits to elevate any room's atmosphere.",
      img: "https://images.unsplash.com/photo-1505691938895-1758d7bef511?auto=format&fit=crop&w=1200&q=80"
    },
    {
      title: "Interior + Civil (Turnkey)",
      desc: "End-to-end execution from bare shell to beautifully finished spaces. We handle the masonry, plumbing, electrical, and detailed interior finishing.",
      img: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80"
    }
  ];

  return (
    <div className="py-20 animate-in fade-in duration-700">
      <div className="max-w-7xl mx-auto px-6 mb-16">
        <h1 className="text-5xl font-black uppercase tracking-tighter mb-4">Our Services</h1>
        <p className="text-xl text-zinc-500 max-w-2xl">From initial conceptualization to the final coat of paint, we provide comprehensive design and build solutions.</p>
      </div>

      <div className="max-w-7xl mx-auto px-6 space-y-24">
        {services.map((svc, idx) => (
          <div key={idx} className={`flex flex-col ${idx % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-12 items-center`}>
            <div className="w-full md:w-1/2 aspect-[4/3] bg-zinc-100 overflow-hidden relative group">
               <img src={svc.img} alt={svc.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            </div>
            <div className="w-full md:w-1/2 space-y-6">
              <div className="inline-block px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-bold uppercase tracking-widest">0{idx + 1}</div>
              <h2 className="text-3xl font-black uppercase tracking-tight">{svc.title}</h2>
              <p className="text-zinc-600 text-lg leading-relaxed">{svc.desc}</p>
              <ul className="space-y-2 pt-4">
                {['Premium Materials', 'On-time Delivery', 'Expert Craftsmanship'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm font-semibold uppercase tracking-wider text-zinc-900">
                    <Check className="w-5 h-5 text-emerald-600" /> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// --- Portfolio Page Component ---
function PortfolioPage() {
  const images = [
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1556910103-1c02745a828?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1505691938895-1758d7bef511?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80"
  ];

  return (
    <div className="py-20 animate-in fade-in duration-700 bg-zinc-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 mb-12 text-center">
        <h1 className="text-5xl font-black uppercase tracking-tighter mb-4">Our Work</h1>
        <p className="text-xl text-zinc-500 max-w-2xl mx-auto">Explore a selection of our recently completed residential and commercial projects across Nagercoil.</p>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {images.map((src, i) => (
            <div key={i} className="break-inside-avoid relative group overflow-hidden bg-zinc-200">
              <img 
                src={src} 
                alt={`Portfolio project ${i+1}`} 
                className="w-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-zinc-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="text-white font-bold uppercase tracking-widest text-sm border border-white px-4 py-2">View Details</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// --- About Page Component ---
function AboutPage() {
  return (
    <div className="py-20 animate-in fade-in duration-700">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="absolute inset-0 bg-emerald-600 translate-x-4 translate-y-4"></div>
            <img 
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80" 
              alt="Design Studio" 
              className="relative z-10 w-full h-auto grayscale hover:grayscale-0 transition-all duration-700"
            />
          </div>
          <div>
            <h1 className="text-5xl font-black uppercase tracking-tighter mb-6">About Buildup Interior</h1>
            <p className="text-lg text-zinc-600 leading-relaxed mb-6">
              Located in the heart of Nagercoil at Anna Bus Stand, Buildup Interior is a dedicated Interior Design Studio. We specialize in merging aesthetic beauty with structural integrity.
            </p>
            <p className="text-lg text-zinc-600 leading-relaxed mb-8">
              Whether it's a simple modular kitchen upgrade, geometric false ceilings, or a complete turnkey civil and interior project, our team of expert designers and craftsmen deliver excellence on every site.
            </p>
            <div className="grid grid-cols-2 gap-8 py-8 border-y border-zinc-200">
              <div>
                <div className="text-4xl font-black text-emerald-600 mb-2">100+</div>
                <div className="text-sm font-bold uppercase tracking-wider text-zinc-900">Projects Completed</div>
              </div>
              <div>
                <div className="text-4xl font-black text-emerald-600 mb-2">100%</div>
                <div className="text-sm font-bold uppercase tracking-wider text-zinc-900">Client Satisfaction</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- Quotation Page Component ---
function QuotePage() {
  const [dragActive, setDragActive] = useState(false);
  const [files, setFiles] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', spaceType: 'Kitchen', details: ''
  });

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
    else if (e.type === "dragleave") setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = (uploadedFiles) => {
    const newFiles = Array.from(uploadedFiles).slice(0, 5);
    setFiles((prev) => [...prev, ...newFiles]);
  };

  const removeFile = (index) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate Email API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
    }, 2000);
  };

  if (submitSuccess) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-32 text-center animate-in zoom-in duration-500">
        <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-8">
          <CheckCircle2 className="w-12 h-12" />
        </div>
        <h2 className="text-4xl font-black uppercase tracking-tight mb-4">Request Sent</h2>
        <p className="text-lg text-zinc-500 mb-8">
          Your project details and photos have been sent to our design team in Nagercoil. We will contact you within 24 hours with your preliminary quotation.
        </p>
        <button 
          onClick={() => { setSubmitSuccess(false); setFiles([]); setFormData({name:'', email:'', phone:'', spaceType:'Kitchen', details:''}); }}
          className="text-emerald-600 font-bold uppercase tracking-wider text-sm flex items-center justify-center gap-2 mx-auto hover:text-emerald-700"
        >
          Submit another project <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 animate-in fade-in duration-700">
      <div className="mb-12">
        <h1 className="text-5xl font-black uppercase tracking-tight mb-4">Get a Quote</h1>
        <p className="text-xl text-zinc-500">Upload photos of your space and tell us what you envision. We'll handle the rest.</p>
      </div>

      <div className="grid lg:grid-cols-5 gap-12">
        {/* Form Column */}
        <form onSubmit={handleSubmit} className="lg:col-span-3 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">Full Name</label>
              <input 
                required type="text" 
                className="w-full bg-zinc-50 border border-zinc-200 rounded-none px-4 py-3 focus:outline-none focus:border-emerald-600 focus:bg-white transition-colors"
                placeholder="John Doe"
                value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">Phone Number</label>
              <input 
                required type="tel" 
                className="w-full bg-zinc-50 border border-zinc-200 rounded-none px-4 py-3 focus:outline-none focus:border-emerald-600 focus:bg-white transition-colors"
                placeholder="+91 98765 43210"
                value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">Email Address</label>
            <input 
              required type="email" 
              className="w-full bg-zinc-50 border border-zinc-200 rounded-none px-4 py-3 focus:outline-none focus:border-emerald-600 focus:bg-white transition-colors"
              placeholder="john@example.com"
              value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})}
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">Project Type</label>
            <select 
              className="w-full bg-zinc-50 border border-zinc-200 rounded-none px-4 py-3 focus:outline-none focus:border-emerald-600 focus:bg-white transition-colors appearance-none"
              value={formData.spaceType} onChange={e => setFormData({...formData, spaceType: e.target.value})}
            >
              <option>Modular Kitchen</option>
              <option>Wardrobe & Bedroom</option>
              <option>False Ceiling</option>
              <option>Full Interior + Civil (Turnkey)</option>
              <option>Commercial Space</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">Project Details & Vision</label>
            <textarea 
              required rows={5}
              className="w-full bg-zinc-50 border border-zinc-200 rounded-none px-4 py-3 focus:outline-none focus:border-emerald-600 focus:bg-white transition-colors resize-none"
              placeholder="Describe your requirements, dimensions, or specific materials..."
              value={formData.details} onChange={e => setFormData({...formData, details: e.target.value})}
            />
          </div>

          <button 
            type="submit" 
            disabled={isSubmitting || files.length === 0}
            className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-zinc-200 disabled:text-zinc-500 text-white font-black uppercase tracking-wider py-4 rounded-none transition-all flex justify-center items-center gap-2"
          >
            {isSubmitting ? 'Sending Request...' : 'Submit to Nagercoil Office'}
          </button>
          
          {files.length === 0 && (
            <p className="text-center text-sm text-red-500 font-medium">Please upload at least one image of your space.</p>
          )}
        </form>

        {/* Drag & Drop Column */}
        <div className="lg:col-span-2 h-full flex flex-col">
          <div 
            className={`flex-1 min-h-[300px] border-2 border-dashed transition-all flex flex-col items-center justify-center p-8 text-center relative bg-zinc-50
              ${dragActive ? 'border-emerald-500 bg-emerald-50' : 'border-zinc-300 hover:border-zinc-400'}`}
            onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}
          >
            <input 
              ref={fileInputRef} type="file" multiple accept="image/*" onChange={handleChange} className="hidden" 
            />
            
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm border border-zinc-100">
              <UploadCloud className={`w-8 h-8 ${dragActive ? 'text-emerald-600' : 'text-zinc-400'}`} />
            </div>
            <h3 className="text-xl font-bold mb-2">Upload Site Photos</h3>
            <p className="text-zinc-500 text-sm mb-6">Drag and drop images here, or click below to browse.</p>
            
            <button 
              type="button" onClick={() => fileInputRef.current?.click()}
              className="px-6 py-2 bg-zinc-900 hover:bg-emerald-600 text-white text-xs font-bold uppercase tracking-wider transition-colors"
            >
              Browse Files
            </button>
          </div>

          {/* Uploaded Files Preview */}
          {files.length > 0 && (
            <div className="mt-6">
              <h4 className="text-xs font-bold text-zinc-500 mb-3 uppercase tracking-wider">Attached Images ({files.length})</h4>
              <div className="space-y-2">
                {files.map((file, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-white border border-zinc-200 shadow-sm animate-in slide-in-from-bottom-2">
                    <div className="flex items-center gap-3 overflow-hidden">
                      <ImageIcon className="w-5 h-5 text-emerald-600 shrink-0" />
                      <span className="text-sm font-medium text-zinc-700 truncate">{file.name}</span>
                    </div>
                    <button 
                      type="button" onClick={() => removeFile(idx)}
                      className="p-1 text-zinc-400 hover:text-red-500 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
