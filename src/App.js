// import React, { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Route, Routes, useNavigate, Link } from 'react-router-dom';
// import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
// import { auth } from "./firebase/firebaseConfig";
// import AdminPanel from './pages/AdminPanel';
// import CustomerDashboard from './pages/CustomerDashboard';
// import ContactPage from './components/ContactPage';
// import AboutPage from './components/AboutPage';
// import hrs1 from './images/hrs1.webp';
// import image from './images/image.png';
// import hrs2 from './images/hrs2.webp';
// import hrs3 from './images/hrs3.jpg';

// function App() {
//   return (
//     <Router>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700;900&display=swap');
//         @import url('https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.0/font/bootstrap-icons.css');
//         * { margin: 0; padding: 0; box-sizing: border-box; }
//         body { font-family: 'Poppins', sans-serif; }
//         @keyframes gradientShift { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
//         @keyframes fadeInUp { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }
//         @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-20px); } }
//         @keyframes pulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.1); } }
//         @keyframes scaleIn { from { transform: scale(0.8); opacity: 0; } to { transform: scale(1); opacity: 1; } }
//         .nav-btn { position: relative; overflow: hidden; transition: all 0.3s ease; }
//         .nav-btn::before { content: ''; position: absolute; top: 50%; left: 50%; width: 0; height: 0; border-radius: 50%; background: rgba(0, 255, 255, 0.3); transform: translate(-50%, -50%); transition: width 0.6s, height 0.6s; }
//         .nav-btn:hover::before { width: 300px; height: 300px; }
//         .nav-btn:hover { transform: translateY(-3px); box-shadow: 0 10px 30px rgba(0, 255, 255, 0.4); border-color: #00ffff; color: #00ffff; }
//         .feature-card { transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); position: relative; overflow: hidden; }
//         .feature-card::before { content: ''; position: absolute; top: -50%; left: -50%; width: 200%; height: 200%; background: linear-gradient(45deg, transparent, rgba(0, 255, 255, 0.1), transparent); transform: rotate(45deg); transition: all 0.6s; }
//         .feature-card:hover::before { left: 100%; }
//         .feature-card:hover { transform: translateY(-15px) scale(1.03); box-shadow: 0 25px 50px rgba(0, 255, 255, 0.3); }
//         .cta-btn:hover { transform: translateY(-5px) scale(1.05); box-shadow: 0 20px 40px rgba(255, 0, 255, 0.4); }
//         .particle { position: absolute; width: 4px; height: 4px; background: rgba(0, 255, 255, 0.6); border-radius: 50%; animation: float 6s infinite ease-in-out; }
//         .footer-link { transition: all 0.3s ease; }
//         .footer-link:hover { color: #ff00ff; transform: translateY(-2px); }
//         .social-icon { transition: all 0.3s ease; }
//         .social-icon:hover { background: rgba(255, 0, 255, 0.3); border-color: #ff00ff; transform: scale(1.1); box-shadow: 0 0 20px rgba(255, 0, 255, 0.5); }
//         .review-btn:hover { transform: translateY(-5px) scale(1.05); box-shadow: 0 20px 50px rgba(52, 168, 83, 0.6); }
//         .login-btn:hover { transform: translateY(-5px) scale(1.05); box-shadow: 0 20px 50px rgba(66, 133, 244, 0.6); }
//         @media (max-width: 768px) {
//           .navbar { flex-direction: column !important; padding: 15px 20px !important; gap: 15px; }
//           .nav-buttons { width: 100%; justify-content: center; }
//           .hero-title { font-size: 2.5rem !important; }
//           .hero-subtitle { font-size: 1.1rem !important; }
//           .section-title { font-size: 2rem !important; }
//           .features-grid { grid-template-columns: 1fr !important; }
//           .cta-buttons { flex-direction: column; width: 100%; padding: 0 20px; }
//           .cta-btn { width: 100%; }
//           .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
//           .testimonials-grid { grid-template-columns: 1fr !important; }
//           .footer-links { flex-direction: column; gap: 20px !important; }
//         }
//         @media (max-width: 480px) {
//           .hero-title { font-size: 2rem !important; }
//           .stats-number { font-size: 2.5rem !important; }
//         }
//       `}</style>
//       <Routes>
//         <Route path="/" element={<LandingPage />} />
//         <Route path="/login" element={<LoginPage />} />
//         <Route path="/admin" element={<AdminPanel />} />
//         <Route path="/dashboard" element={<CustomerDashboard />} />
//         <Route path="/contact" element={<ContactPage />} />
//         <Route path="/about" element={<AboutPage />} />
//       </Routes>
//     </Router>
//   );
// }

// const LandingPage = () => {
//   const navigate = useNavigate();
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const [scrolled, setScrolled] = useState(false);

//   const slides = [
//     { title: 'State-of-the-Art Recording Studio', description: 'Experience world-class recording with cutting-edge technology and acoustic perfection.', image: hrs1 },
//     { title: 'Professional Music Production', description: 'Transform your musical vision into reality with our expert production team.', image: image },
//     { title: 'Your Sound, Perfected', description: 'From recording to mastering, we deliver exceptional quality that makes your music stand out.', image: hrs2 },
//     { title: 'Premium Studio Equipment', description: 'Industry-leading technology for pristine sound quality and professional results.', image: hrs3 },
//     { title: 'Expert Sound Engineering', description: 'Skilled engineers bringing decades of experience to every recording session.', image: hrs1 },
//     { title: 'Creative Music Space', description: 'Inspiring environment designed to unlock your creative potential and musical expression.', image: image },
//     { title: 'Full Production Services', description: 'Complete production suite from pre-production to final mastering and distribution.', image: hrs2 },
//     { title: 'Artist-Focused Studio', description: 'Dedicated to bringing your unique artistic vision to life with personalized attention.', image: hrs3 }
//   ];

//   // const features = [
//   //   { icon: '🎤', title: 'Premium Recording', desc: 'Industry-leading equipment and pristine acoustics for flawless audio captures' },
//   //   { icon: '🎵', title: 'Music Production', desc: 'Full-service production from concept to final master with expert guidance' },
//   //   { icon: '🎧', title: 'Mixing & Mastering', desc: 'Professional mixing and mastering that makes your tracks radio-ready' },
//   //   { icon: '🎸', title: 'Live Sessions', desc: 'Multi-track live session recording with real-time monitoring capabilities' },
//   //   { icon: '🎹', title: 'Custom Compositions', desc: 'Original compositions and custom arrangements tailored to your project' },
//   //   { icon: '✨', title: 'Audio Post-Production', desc: 'Complete audio solutions for film, podcasts, and multimedia projects' }
//   // ];


//   const features = [
//     { icon: '🎤', title: 'Soundproof Karaoke Recording', desc: 'Professional and fully soundproof recording for crystal-clear vocals' },
//     { icon: '🎵', title: 'Live Instrument Sessions', desc: 'Record with live instruments including guitar, piano, and drums' },
//     { icon: '🎪', title: 'Party & Event Space', desc: 'Perfect space for birthdays, celebrations, and group karaoke parties' },
//     { icon: '📱', title: 'Facebook & YouTube Live', desc: 'Go live directly from our studio with professional audio and lighting' },
//     { icon: '💡', title: 'Professional Lighting', desc: 'Stage lighting and effects for the perfect performance vibe' },
//     { icon: '👨‍👩‍👧‍👦', title: 'Family-Friendly Environment', desc: 'Safe, welcoming space for all ages and group sizes' },
//     { icon: '🎼', title: 'Rehearsal Space', desc: 'Practice for shows and events with instruments or karaoke' }
//   ];

//   const testimonials = [
//     { text: 'One of the Best Karaoke Studios I\'ve come across in Vasai Virar Region, with best in class Sound, best in class recordings, best in class ambience and Best And sweetest couple to support and help you achieve your dream to perform on Stage. I\'ve always got 5* experience and it gets better and better every time we go. Keep Going Hiten and Hetal ji 👍♥️🚩🇮🇳 Jay Shree Ram 🚩', name: 'Hemont Mattwankar', role: 'Independent Artist',image: 'https://lh3.googleusercontent.com/a-/ALV-UjW578QztJg94kBAg7_SPRSuyhN--eK5hRX967s0_k-fTz_y6b6UdA=w72-h72-p-rp-mo-ba2-br100' },
//     { text: 'What an wonderful experience to be at this studio. Professional sound setup, App to manage songs and payments, timely sharing daily singers songs and friendly owners. Perfect place for new and experienced singers. Will sure recommend this place', name: 'Deven Jadav', role: 'Music Producer', image: 'https://lh3.googleusercontent.com/a-/ALV-UjUtgoo8I4r9-E895sCdCFFmBL39vfcOGVpUbD1kwW2FwA7W3X2v=w72-h72-p-rp-mo-ba3-br100' },
//     { text: 'HRS is the Best Karaoke Studio, not only in Vasai, but also all over India ♥️.. because it has the Best Sound Recording Quality which is the topmost requirement for any singer 🎤🎤🔊🔊.. moreover, they arrange regular Stage Shows and Facebook Live to encourage and provide platform to the singers 👌👌👍👍.. and the owners are very friendly and ready give every answer to our singing related queries 🙏🙏🌹🌹', name: 'Naval Naik', role: 'Professional Vocalist', image:'https://lh3.googleusercontent.com/a-/ALV-UjWbxRTwtwjDRFvK7dtcklkQ-oianygia5lcMsR83ri5MJNdUuBa=w72-h72-p-rp-mo-br100' }
//   ];

//   useEffect(() => {
//     const slideInterval = setInterval(() => setCurrentSlide(prev => (prev + 1) % slides.length), 5000);
//     const handleScroll = () => setScrolled(window.scrollY > 50);
//     window.addEventListener('scroll', handleScroll);
//     return () => { clearInterval(slideInterval); window.removeEventListener('scroll', handleScroll); };
//   }, [slides.length]);

//   const particles = Array.from({ length: 30 }, (_, i) => ({
//     top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%`,
//     animationDelay: `${Math.random() * 6}s`, animationDuration: `${4 + Math.random() * 4}s`
//   }));

//   return (
//     <div style={{ fontFamily: "'Poppins', sans-serif", background: '#000', minHeight: '100vh', color: '#fff', position: 'relative', overflow: 'hidden' }}>
//       <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(-45deg, #000, #1a0033, #000033, #330033)', backgroundSize: '400% 400%', animation: 'gradientShift 15s ease infinite', zIndex: 0 }} />
//       <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1, pointerEvents: 'none' }}>
//         {particles.map((p, i) => <div key={i} className="particle" style={{ top: p.top, left: p.left, animationDelay: p.animationDelay, animationDuration: p.animationDuration }} />)}
//       </div>
      
//       <nav className="navbar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: scrolled ? '15px 60px' : '20px 60px', position: 'fixed', top: 0, width: '100%', background: scrolled ? 'rgba(0,0,0,0.95)' : 'rgba(0,0,0,0.8)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(0,255,255,0.2)', zIndex: 1000, transition: 'all 0.3s', boxSizing: 'border-box' }}>
//         <div style={{ fontSize: '2rem', fontWeight: 800, background: 'linear-gradient(135deg, #0ff, #f0f)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', cursor: 'pointer', letterSpacing: 2 }} onClick={() => navigate('/')}>🎵 HRS STUDIO</div>
//         <div className="nav-buttons" style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
//           {['Login', 'Admin', 'Dashboard', 'About'].map((label, i) => (
//             <button key={i} className="nav-btn" style={{ background: 'transparent', color: '#fff', border: '2px solid rgba(0,255,255,0.5)', padding: '12px 28px', fontSize: '0.95rem', fontWeight: 600, borderRadius: 30, cursor: 'pointer', position: 'relative', zIndex: 1 }} onClick={() => navigate(['login','admin','dashboard','about'][i])}>{label}</button>
//           ))}
//         </div>
//       </nav>

//       <section style={{ position: 'relative', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', zIndex: 2, paddingTop: 80 }}>
//         <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundImage: `url(${hrs3})`, backgroundSize: 'cover', backgroundPosition: 'center', filter: 'brightness(0.3) contrast(1.2)', zIndex: -1 }} />
//         <div style={{ maxWidth: 900, padding: '0 20px', animation: 'fadeInUp 1s ease-out' }}>
//           <h1 className="hero-title" style={{ fontSize: '4.5rem', fontWeight: 900, marginBottom: 20, background: 'linear-gradient(135deg, #0ff, #f0f, #0ff)', backgroundSize: '200% auto', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', animation: 'gradientShift 3s linear infinite', lineHeight: 1.2 }}>Where Music Comes Alive</h1>
//           <p className="hero-subtitle" style={{ fontSize: '1.5rem', color: '#e0e0e0', marginBottom: 40, fontWeight: 300, lineHeight: 1.8 }}>Professional karaoke studio delivering exceptional sound quality and unforgettable musical experiences</p>
//           <div className="cta-buttons" style={{ display: 'flex', gap: 20, justifyContent: 'center', flexWrap: 'wrap' }}>
//             <button className="cta-btn" style={{ padding: '18px 45px', fontSize: '1.1rem', fontWeight: 700, borderRadius: 50, border: 'none', cursor: 'pointer', textTransform: 'uppercase', letterSpacing: 1, background: 'linear-gradient(135deg, #f0f, #0ff)', color: '#000', boxShadow: '0 10px 40px rgba(255,0,255,0.5)', transition: 'all 0.3s' }} onClick={() => navigate('/login')}>Get Started</button>
//             <button className="cta-btn" style={{ padding: '18px 45px', fontSize: '1.1rem', fontWeight: 700, borderRadius: 50, cursor: 'pointer', textTransform: 'uppercase', letterSpacing: 1, background: 'transparent', color: '#0ff', border: '2px solid #0ff', transition: 'all 0.3s' }} onClick={() => navigate('/about')}>Learn More</button>
//           </div>
//           <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginTop: 50 }}>
//             {[40,60,35,70,45,55,40].map((h, i) => <div key={i} style={{ width: 6, height: h, background: 'linear-gradient(180deg, #0ff, #f0f)', borderRadius: 10, animation: `pulse ${0.6+i*0.1}s ease-in-out infinite` }} />)}
//           </div>
//         </div>
//       </section>

//       <section style={{ padding: '120px 40px', position: 'relative', zIndex: 2 }}>
//         <h2 className="section-title" style={{ fontSize: '3.5rem', fontWeight: 900, textAlign: 'center', marginBottom: 70, background: 'linear-gradient(135deg, #0ff, #f0f)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', animation: 'scaleIn 0.8s ease-out' }}>Our Premium Services</h2>
//         <div className="features-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 40, maxWidth: 1400, margin: '0 auto' }}>
//           {features.map((f, i) => (
//             <div key={i} className="feature-card" style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(10px)', padding: '50px 35px', borderRadius: 25, border: '1px solid rgba(0,255,255,0.3)', textAlign: 'center', cursor: 'pointer' }}>
//               <span style={{ fontSize: '4rem', marginBottom: 25, display: 'block', filter: 'drop-shadow(0 0 20px rgba(0,255,255,0.5))' }}>{f.icon}</span>
//               <h3 style={{ fontSize: '1.8rem', color: '#0ff', marginBottom: 15, fontWeight: 700 }}>{f.title}</h3>
//               <p style={{ color: '#b0b0b0', fontSize: '1.05rem', lineHeight: 1.7 }}>{f.desc}</p>
//             </div>
//           ))}
//         </div>
//       </section>

//       <section style={{ padding: '100px 40px', position: 'relative', zIndex: 2, background: 'rgba(0,0,0,0.5)' }}>
//         <h2 className="section-title" style={{ fontSize: '3.5rem', fontWeight: 900, textAlign: 'center', marginBottom: 70, background: 'linear-gradient(135deg, #0ff, #f0f)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Featured Highlights</h2>
//         <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', borderRadius: 30, overflow: 'hidden', boxShadow: '0 30px 80px rgba(0,255,255,0.3)' }}>
//           <div style={{ display: 'flex', transition: 'transform 0.7s cubic-bezier(0.4,0,0.2,1)', transform: `translateX(-${currentSlide*100}%)` }}>
//             {slides.map((s, i) => (
//               <div key={i} style={{ minWidth: '100%', position: 'relative' }}>
//                 <img src={s.image} alt={s.title} style={{ width: '100%', height: 450, objectFit: 'cover', display: 'block' }} />
//                 <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.95), transparent)', padding: '40px' }}>
//                   <h3 style={{ fontSize: '2rem', color: '#0ff', marginBottom: 10, fontWeight: 800 }}>{s.title}</h3>
//                   <p style={{ fontSize: '1.1rem', color: '#ccc', lineHeight: 1.6 }}>{s.description}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//           <div style={{ display: 'flex', justifyContent: 'center', gap: 10, marginTop: 30, flexWrap: 'wrap', padding: '0 20px' }}>
//             {slides.map((_, i) => <button key={i} onClick={() => setCurrentSlide(i)} style={{ width: currentSlide===i?40:12, height: 12, borderRadius: currentSlide===i?6:'50%', background: currentSlide===i?'#0ff':'rgba(255,255,255,0.3)', border: 'none', cursor: 'pointer', transition: 'all 0.3s', boxShadow: currentSlide===i?'0 0 20px rgba(0,255,255,0.8)':'none' }} />)}
//           </div>
//         </div>
//       </section>

//       <section style={{ padding: '100px 40px', background: 'rgba(255,0,255,0.05)', position: 'relative', zIndex: 2 }}>
//         <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 50, maxWidth: 1200, margin: '0 auto', textAlign: 'center' }}>
//           {[{n:'1000+',l:'Shows Completed'},{n:'10+',l:'Years Experience'},{n:'500+',l:'Happy Singers'},{n:'24/7',l:'Support'}].map((s, i) => (
//             <div key={i} style={{ animation: 'scaleIn 0.6s ease-out' }}>
//               <div className="stats-number" style={{ fontSize: '4rem', fontWeight: 900, background: 'linear-gradient(135deg, #0ff, #f0f)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: 10 }}>{s.n}</div>
//               <div style={{ fontSize: '1.2rem', color: '#999', textTransform: 'uppercase', letterSpacing: 2, fontWeight: 600 }}>{s.l}</div>
//             </div>
//           ))}
//         </div>
//       </section>

//       <section style={{ padding: '100px 40px', position: 'relative', zIndex: 2 }}>
//   <h2 className="section-title" style={{ fontSize: '3.5rem', fontWeight: 900, textAlign: 'center', marginBottom: 70, background: 'linear-gradient(135deg, #0ff, #f0f)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
//     What Our Singers Say
//   </h2>
//   <div className="testimonials-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 35, maxWidth: 1300, margin: '0 auto' }}>
//     {testimonials.map((t, i) => (
//       <div 
//         key={i} 
//         style={{ 
//           background: 'rgba(0,0,0,0.6)', 
//           backdropFilter: 'blur(10px)', 
//           padding: 40, 
//           borderRadius: 20, 
//           border: '1px solid rgba(255,0,255,0.3)', 
//           transition: 'all 0.3s', 
//           cursor: 'pointer' 
//         }} 
//         onMouseEnter={e=>{
//           e.currentTarget.style.transform='scale(1.02)';
//           e.currentTarget.style.boxShadow='0 15px 40px rgba(0,255,255,0.3)'
//         }} 
//         onMouseLeave={e=>{
//           e.currentTarget.style.transform='scale(1)';
//           e.currentTarget.style.boxShadow='none'
//         }}
//       >
//         <p style={{ fontSize: '1.1rem', color: '#ddd', marginBottom: 25, lineHeight: 1.7, fontStyle: 'italic' }}>
//           "{t.text}"
//         </p>
//         <div style={{ display: 'flex', alignItems: 'center', gap: 15 }}>
//           {/* Profile Image */}
//           <img 
//             src={t.image} 
//             alt={t.name}
//             style={{ 
//               width: 50, 
//               height: 50, 
//               borderRadius: '50%', 
//               objectFit: 'cover',
//               border: '2px solid #0ff'
//             }} 
//           />
//           <div>
//             <div style={{ fontSize: '1.1rem', color: '#0ff', fontWeight: 700 }}>{t.name}</div>
//             {/* <div style={{ fontSize: '0.9rem', color: '#888' }}>{t.role}</div> */}
//           </div>
//         </div>
//       </div>
//     ))}
//   </div>
// </section>

//       <section style={{ padding: '100px 40px', textAlign: 'center', background: 'rgba(0,255,255,0.05)', position: 'relative', zIndex: 2 }}>
//         <div style={{ maxWidth: 700, margin: '0 auto', background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(15px)', padding: '60px 40px', borderRadius: 30, border: '2px solid rgba(0,255,255,0.3)' }}>
//           <h2 style={{ fontSize: '2.8rem', fontWeight: 900, marginBottom: 20, background: 'linear-gradient(135deg, #0ff, #f0f)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Share Your Experience</h2>
//           <p style={{ color: '#ccc', fontSize: '1.2rem', marginBottom: 10 }}>Your feedback helps us grow and serve you better</p>
//           <p style={{ color: '#999', fontSize: '1rem', marginBottom: 20 }}>Leave a review and let others know about your HRS Studio experience</p>
//           <button className="review-btn" style={{ background: 'linear-gradient(135deg, #34a853, #2d8e47)', color: '#fff', border: 'none', padding: '18px 50px', fontSize: '1.2rem', borderRadius: 50, cursor: 'pointer', fontWeight: 700, marginTop: 30, boxShadow: '0 10px 40px rgba(52,168,83,0.5)', transition: 'all 0.3s' }} onClick={() => window.open('https://g.co/kgs/Co7pMp7', '_blank')}>Leave a Google Review</button>
//         </div>
//       </section>

//       <section style={{ padding: '100px 40px', position: 'relative', zIndex: 2 }}>
//         <h2 className="section-title" style={{ fontSize: '3.5rem', fontWeight: 900, textAlign: 'center', marginBottom: 70, background: 'linear-gradient(135deg, #0ff, #f0f)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Get In Touch</h2>
//         <ContactPage />
//       </section>

//       <footer style={{ background: 'rgba(0,0,0,0.95)', padding: '80px 40px 30px', borderTop: '1px solid rgba(0,255,255,0.2)', position: 'relative', zIndex: 2 }}>
//   <div style={{ maxWidth: 1200, margin: '0 auto', textAlign: 'center' }}>
//     <div style={{ fontSize: '2.5rem', fontWeight: 900, background: 'linear-gradient(135deg, #0ff, #f0f)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: 20 }}>🎵 HRS STUDIO</div>
//     <p style={{ color: '#888', fontSize: '1.1rem', marginBottom: 40 }}>Your trusted destination for premium karaoke experiences and soundproof recording</p>
//     <div className="footer-links" style={{ display: 'flex', justifyContent: 'center', gap: 40, flexWrap: 'wrap', marginBottom: 40 }}>
//       {[{p:'/',l:'Home'},{p:'/about',l:'About'},{p:'/contact',l:'Contact'},{p:'/dashboard',l:'Dashboard'},{p:'/login',l:'Login'}].map((x, i) => <Link key={i} to={x.p} className="footer-link" style={{ color: '#0ff', textDecoration: 'none', fontSize: '1.1rem', fontWeight: 600 }}>{x.l}</Link>)}
//     </div>
//     <div style={{ display: 'flex', justifyContent: 'center', gap: 25, marginBottom: 40 }}>
//       {[
//         { icon: 'bi-facebook', url: 'https://www.facebook.com/profile.php?id=100057460298837#' },
//         { icon: 'bi-instagram', url: 'https://www.instagram.com/hrsvasai/' },
//         { icon: 'bi-youtube', url: 'https://www.youtube.com/@hrseventsentertainment8102' },
//         { icon: 'bi-google', url: 'https://g.co/kgs/Co7pMp7' }
//       ].map((social, i) => (
//         <a 
//           key={i} 
//           href={social.url} 
//           target="_blank" 
//           rel="noopener noreferrer"
//           className="social-icon" 
//           style={{ 
//             width: 50, 
//             height: 50, 
//             borderRadius: '50%', 
//             background: 'rgba(0,255,255,0.1)', 
//             border: '2px solid rgba(0,255,255,0.5)', 
//             display: 'flex', 
//             alignItems: 'center', 
//             justifyContent: 'center', 
//             fontSize: '1.5rem', 
//             cursor: 'pointer',
//             textDecoration: 'none',
//             color: '#0ff',
//             transition: 'all 0.3s ease'
//           }}
//           onMouseEnter={(e) => {
//             e.currentTarget.style.background = 'rgba(0,255,255,0.2)';
//             e.currentTarget.style.transform = 'scale(1.1)';
//             e.currentTarget.style.boxShadow = '0 0 20px rgba(0,255,255,0.5)';
//           }}
//           onMouseLeave={(e) => {
//             e.currentTarget.style.background = 'rgba(0,255,255,0.1)';
//             e.currentTarget.style.transform = 'scale(1)';
//             e.currentTarget.style.boxShadow = 'none';
//           }}
//         >
//           <i className={social.icon}></i>
//         </a>
//       ))}
//     </div>
//     <p style={{ color: '#555', fontSize: '0.95rem', paddingTop: 30, borderTop: '1px solid rgba(255,255,255,0.1)' }}>© {new Date().getFullYear()} HRS Studio. All rights reserved. | Designed with 💜 & 🎵</p>
//   </div>
// </footer>
//     </div>
//   );
// };

// const LoginPage = () => {
//   const navigate = useNavigate();
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);

//   const loginWithGoogle = async () => {
//     setLoading(true);
//     setError('');
//     const provider = new GoogleAuthProvider();
//     try {
//       const result = await signInWithPopup(auth, provider);
//       const user = result.user;
//       if (user.email === "asharhiten@gmail.com") navigate("/admin");
//       else navigate("/dashboard");
//     } catch (err) {
//       console.error("Login failed", err);
//       setError("Login failed. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div style={{ background: 'linear-gradient(-45deg, #000, #1a0033, #000033, #330033)', backgroundSize: '400% 400%', animation: 'gradientShift 15s ease infinite', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
      
//       {/* Back to Home Button - Top Left with Home Symbol */}
//       <button 
//         onClick={() => navigate('/')}
//         style={{
//           position: 'absolute',
//           top: '30px',
//           left: '30px',
//           background: 'rgba(0, 255, 255, 0.1)',
//           border: '2px solid rgba(0, 255, 255, 0.5)',
//           borderRadius: '50%',
//           width: '60px',
//           height: '60px',
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'center',
//           cursor: 'pointer',
//           fontSize: '1.8rem',
//           color: '#0ff',
//           transition: 'all 0.3s ease',
//           zIndex: 10,
//           backdropFilter: 'blur(10px)'
//         }}
//         onMouseEnter={(e) => {
//           e.target.style.background = 'rgba(0, 255, 255, 0.2)';
//           e.target.style.transform = 'scale(1.1)';
//           e.target.style.boxShadow = '0 0 25px rgba(0, 255, 255, 0.5)';
//         }}
//         onMouseLeave={(e) => {
//           e.target.style.background = 'rgba(0, 255, 255, 0.1)';
//           e.target.style.transform = 'scale(1)';
//           e.target.style.boxShadow = 'none';
//         }}
//         title="Back to Home"
//       >
//         🏠
//       </button>

//       <div style={{ 
//         background: 'rgba(0,0,0,0.8)', 
//         backdropFilter: 'blur(20px)', 
//         padding: '60px 50px', 
//         borderRadius: 30, 
//         border: '2px solid rgba(0,255,255,0.3)', 
//         textAlign: 'center', 
//         maxWidth: 450, 
//         width: '90%', 
//         boxShadow: '0 30px 80px rgba(0,255,255,0.3)', 
//         animation: 'scaleIn 0.6s ease-out',
//         position: 'relative'
//       }}>
        
//         <h1 style={{ fontSize: '3rem', fontWeight: 900, marginBottom: 15, background: 'linear-gradient(135deg, #0ff, #f0f)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Welcome Back</h1>
//         <p style={{ color: '#999', fontSize: '1.1rem', marginBottom: 40 }}>Sign in to access your HRS Studio account</p>
        
//         {error && (
//           <p style={{ 
//             background: 'rgba(255,68,68,0.2)', 
//             color: '#f44', 
//             padding: 15, 
//             borderRadius: 15, 
//             marginTop: 20, 
//             fontSize: '0.95rem', 
//             border: '1px solid rgba(255,68,68,0.5)' 
//           }}>
//             {error}
//           </p>
//         )}
        
//         <button 
//           className="login-btn" 
//           style={{ 
//             background: 'linear-gradient(135deg, #4285f4, #357ae8)', 
//             color: '#fff', 
//             border: 'none', 
//             padding: '18px 40px', 
//             fontSize: '1.1rem', 
//             borderRadius: 50, 
//             cursor: 'pointer', 
//             width: '100%', 
//             fontWeight: 700, 
//             boxShadow: '0 10px 40px rgba(66,133,244,0.5)', 
//             transition: 'all 0.3s',
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'center',
//             gap: '10px'
//           }} 
//           onClick={loginWithGoogle} 
//           disabled={loading}
//         >
//           {loading ? (
//             <>
//               <div style={{ 
//                 width: '20px', 
//                 height: '20px', 
//                 border: '2px solid transparent', 
//                 borderTop: '2px solid #fff', 
//                 borderRadius: '50%', 
//                 animation: 'spin 1s linear infinite' 
//               }} />
//               Signing in...
//             </>
//           ) : (
//             <>
//               <i className="bi bi-google" style={{ fontSize: '1.2rem' }}></i>
//               Sign in with Google
//             </>
//           )}
//         </button>
        
//         <p style={{ color: '#666', marginTop: 30, fontSize: '0.9rem' }}>
//           By signing in, you agree to our Terms of Service and Privacy Policy
//         </p>

//         {/* Alternative Back to Home Button at Bottom with Home Symbol */}
//         <button 
//           onClick={() => navigate('/')}
//           style={{
//             background: 'transparent',
//             border: '1px solid rgba(255, 255, 255, 0.2)',
//             color: '#999',
//             padding: '12px 25px',
//             borderRadius: 25,
//             cursor: 'pointer',
//             fontSize: '0.9rem',
//             marginTop: 25,
//             transition: 'all 0.3s ease',
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'center',
//             gap: '8px',
//             width: '100%'
//           }}
//           onMouseEnter={(e) => {
//             e.target.style.background = 'rgba(0, 255, 255, 0.1)';
//             e.target.style.color = '#0ff';
//             e.target.style.borderColor = 'rgba(0, 255, 255, 0.5)';
//           }}
//           onMouseLeave={(e) => {
//             e.target.style.background = 'transparent';
//             e.target.style.color = '#999';
//             e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
//           }}
//         >
//           🏠 Back to Homepage
//         </button>
//       </div>

//       {/* Add spin animation for loading */}
//       <style>{`
//         @keyframes spin {
//           0% { transform: rotate(0deg); }
//           100% { transform: rotate(360deg); }
//         }
        
//         @media (max-width: 768px) {
//           .back-home-btn {
//             top: 20px !important;
//             left: 20px !important;
//             width: 50px !important;
//             height: 50px !important;
//             font-size: 1.5rem !important;
//           }
//         }
        
//         @media (max-width: 480px) {
//           .back-home-btn {
//             top: 15px !important;
//             left: 15px !important;
//             width: 45px !important;
//             height: 45px !important;
//             font-size: 1.3rem !important;
//           }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default App;


import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate, Link } from 'react-router-dom';
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "./firebase/firebaseConfig";
import AdminPanel from './pages/AdminPanel';
import CustomerDashboard from './pages/CustomerDashboard';
import ContactPage from './components/ContactPage';
import AboutPage from './components/AboutPage';
import hrs1 from './images/hrs1.webp';
import image from './images/image.png';
import hrs2 from './images/hrs2.webp';
import hrs3 from './images/hrs3.jpg';
import studio3 from './images/studio3.jpg';
import studio4 from './images/studio4.jpg';
import studio5 from './images/studio5.mp4';
import studio6 from './images/studio6.mp4';
import { Type } from 'lucide-react';
import { Analytics } from "@vercel/analytics/react";

function App() {
  return (
    <Router>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700;900&display=swap');
        @import url('https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.0/font/bootstrap-icons.css');
        
        * { 
          margin: 0; 
          padding: 0; 
          box-sizing: border-box; 
          -webkit-tap-highlight-color: transparent;
        }
        
        body { 
          font-family: 'Poppins', sans-serif; 
          overflow-x: hidden;
        }
        
        html {
          scroll-behavior: smooth;
          scroll-padding-top: 80px;
        }
        
        @keyframes gradientShift { 
          0% { background-position: 0% 50%; } 
          50% { background-position: 100% 50%; } 
          100% { background-position: 0% 50%; } 
        }
        
        @keyframes fadeInUp { 
          from { opacity: 0; transform: translateY(40px); } 
          to { opacity: 1; transform: translateY(0); } 
        }
        
        @keyframes float { 
          0%, 100% { transform: translateY(0px); } 
          50% { transform: translateY(-10px); } 
        }
        
        @keyframes pulse { 
          0%, 100% { transform: scale(1); } 
          50% { transform: scale(1.05); } 
        }
        
        @keyframes scaleIn { 
          from { transform: scale(0.9); opacity: 0; } 
          to { transform: scale(1); opacity: 1; } 
        }
        
        .nav-btn { 
          position: relative; 
          overflow: hidden; 
          transition: all 0.3s ease; 
          touch-action: manipulation;
        }
        
        .nav-btn::before { 
          content: ''; 
          position: absolute; 
          top: 50%; 
          left: 50%; 
          width: 0; 
          height: 0; 
          border-radius: 50%; 
          background: rgba(0, 255, 255, 0.3); 
          transform: translate(-50%, -50%); 
          transition: width 0.6s, height 0.6s; 
        }
        
        .nav-btn:hover::before { 
          width: 200px; 
          height: 200px; 
        }
        
        .nav-btn:hover { 
          transform: translateY(-2px); 
          box-shadow: 0 8px 20px rgba(0, 255, 255, 0.3); 
          border-color: #00ffff; 
          color: #00ffff; 
        }
        
        .feature-card { 
          transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275); 
          position: relative; 
          overflow: hidden; 
          touch-action: manipulation;
        }
        
        .feature-card::before { 
          content: ''; 
          position: absolute; 
          top: -50%; 
          left: -50%; 
          width: 200%; 
          height: 200%; 
          background: linear-gradient(45deg, transparent, rgba(0, 255, 255, 0.1), transparent); 
          transform: rotate(45deg); 
          transition: all 0.6s; 
        }
        
        .feature-card:hover::before { 
          left: 100%; 
        }
        
        .feature-card:hover { 
          transform: translateY(-8px) scale(1.02); 
          box-shadow: 0 15px 30px rgba(0, 255, 255, 0.2); 
        }
        
        .cta-btn { 
          transition: all 0.3s; 
          touch-action: manipulation;
        }
        
        .cta-btn:hover { 
          transform: translateY(-3px) scale(1.03); 
          box-shadow: 0 15px 30px rgba(255, 0, 255, 0.3); 
        }
        
        .particle { 
          position: absolute; 
          width: 3px; 
          height: 3px; 
          background: rgba(0, 255, 255, 0.6); 
          border-radius: 50%; 
          animation: float 6s infinite ease-in-out; 
        }
        
        .footer-link { 
          transition: all 0.3s ease; 
        }
        
        .footer-link:hover { 
          color: #ff00ff; 
          transform: translateY(-1px); 
        }
        
        .social-icon { 
          transition: all 0.3s ease; 
          touch-action: manipulation;
        }
        
        .social-icon:hover { 
          background: rgba(255, 0, 255, 0.3); 
          border-color: #ff00ff; 
          transform: scale(1.05); 
          box-shadow: 0 0 15px rgba(255, 0, 255, 0.4); 
        }
        
        .review-btn { 
          transition: all 0.3s; 
          touch-action: manipulation;
        }
        
        .review-btn:hover { 
          transform: translateY(-3px) scale(1.03); 
          box-shadow: 0 15px 30px rgba(52, 168, 83, 0.4); 
        }
        
        .login-btn { 
          transition: all 0.3s; 
          touch-action: manipulation;
        }
        
        .login-btn:hover { 
          transform: translateY(-3px) scale(1.03); 
          box-shadow: 0 15px 30px rgba(66, 133, 244, 0.4); 
        }
        
        /* Mobile First Styles */
        @media (max-width: 768px) {
          .navbar { 
            padding: 12px 15px !important; 
            min-height: 70px !important;
          }
          
          .nav-buttons { 
            display: none !important;
          }
          
          .mobile-menu-button {
            display: flex !important;
          }
          
          .hero-title { 
            font-size: 2.2rem !important; 
            line-height: 1.1 !important;
            margin-bottom: 15px !important;
          }
          
          .hero-subtitle { 
            font-size: 1rem !important; 
            line-height: 1.5 !important;
            margin-bottom: 30px !important;
            padding: 0 10px;
          }
          
          .section-title { 
            font-size: 1.8rem !important; 
            margin-bottom: 40px !important;
            padding: 0 20px;
          }
          
          .features-grid { 
            grid-template-columns: 1fr !important; 
            gap: 20px !important;
            padding: 0 15px;
          }
          
          .feature-card {
            padding: 30px 20px !important;
          }
          
          .feature-card span {
            font-size: 3rem !important;
            margin-bottom: 15px !important;
          }
          
          .feature-card h3 {
            font-size: 1.4rem !important;
            margin-bottom: 10px !important;
          }
          
          .feature-card p {
            font-size: 0.95rem !important;
            line-height: 1.5 !important;
          }
          
          .cta-buttons { 
            flex-direction: column; 
            width: 100%; 
            padding: 0 15px; 
            gap: 15px;
          }
          
          .cta-btn { 
            width: 100% !important; 
            padding: 16px 30px !important;
            font-size: 1rem !important;
          }
          
          .stats-grid { 
            grid-template-columns: repeat(2, 1fr) !important; 
            gap: 20px !important;
            padding: 0 15px;
          }
          
          .stats-number {
            font-size: 2.2rem !important;
          }
          
          .testimonials-grid { 
            grid-template-columns: 1fr !important; 
            gap: 20px !important;
            padding: 0 15px;
          }
          
          .footer-links { 
            flex-direction: column; 
            gap: 15px !important; 
          }
          
          section {
            padding: 60px 20px !important;
          }
          
          .slides-container {
            margin: 0 15px !important;
          }
          
          .slide-image {
            height: 300px !important;
          }
          
          .slide-content {
            padding: 20px !important;
          }
          
          .slide-content h3 {
            font-size: 1.4rem !important;
          }
          
          .slide-content p {
            font-size: 0.9rem !important;
          }
          
          /* Mobile menu styles */
          body.menu-open {
            overflow: hidden;
          }
          
          .mobile-menu {
            transform: translateY(0);
            transition: transform 0.3s ease;
          }
        }
        
        @media (max-width: 480px) {
          .hero-title { 
            font-size: 1.8rem !important; 
          }
          
          .stats-number { 
            font-size: 1.8rem !important; 
          }
          
          .stats-grid {
            grid-template-columns: 1fr !important;
          }
          
          .navbar {
            padding: 10px 12px !important;
            min-height: 60px !important;
          }
          
          .feature-card {
            margin: 0 10px;
          }
          
          .footer-links a {
            font-size: 1rem !important;
          }
        }
        
        @media (max-width: 360px) {
          .hero-title {
            font-size: 1.6rem !important;
          }
          
          .section-title {
            font-size: 1.5rem !important;
          }
        }
        
        /* Prevent horizontal scroll */
        .container-fix {
          max-width: 100vw;
          overflow-x: hidden;
        }
        
        /* Improve touch targets */
        button, a {
          min-height: 44px;
          min-width: 44px;
        }
        
        /* Smooth scrolling for iOS */
        .smooth-scroll {
          -webkit-overflow-scrolling: touch;
        }
        
        /* Section spacing for fixed navbar */
        .section-with-navbar {
          scroll-margin-top: 80px;
        }
      `}</style>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/dashboard" element={<CustomerDashboard />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
      <Analytics />
    </Router>
  );
}

const LandingPage = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

const slides = [
  { 
    title: 'Singing Moments', 
    description: 'Capture unforgettable singing experiences with friends and family.', 
    image: studio3,
    type: 'image'
  },
  { 
    title: 'Vocal Expressions', 
    description: 'Express yourself through music in our supportive singing environment.', 
    image: studio4,
    type: 'image'
  },
  { 
    title: 'Studio Vibes', 
    description: 'Feel the energy of our dedicated singing space and welcoming atmosphere.', 
    video: studio5,
    type: 'video'
  },
  { 
    title: 'Singing Together', 
    description: 'Create musical memories with group singing sessions and duets.', 
    video: studio6,
    type: 'video'
  },
];

  const features = [
    { icon: '🎤', title: 'Soundproof Karaoke Recording', desc: 'Professional and fully soundproof recording for crystal-clear vocals' },
    { icon: '🎵', title: 'Live Instrument Sessions', desc: 'Record with live instruments including guitar, piano, and drums' },
    { icon: '🎪', title: 'Party & Event Space', desc: 'Perfect space for birthdays, celebrations, and group karaoke parties' },
    { icon: '📱', title: 'Facebook & YouTube Live', desc: 'Go live directly from our studio with professional audio and lighting' },
    { icon: '💡', title: 'Professional Lighting', desc: 'Stage lighting and effects for the perfect performance vibe' },
    { icon: '👨‍👩‍👧‍👦', title: 'Family-Friendly Environment', desc: 'Safe, welcoming space for all ages and group sizes' },
    { icon: '🎼', title: 'Rehearsal Space', desc: 'Practice for shows and events with instruments or karaoke' }
  ];

  const testimonials = [
    { text: 'One of the Best Karaoke Studios I\'ve come across in Vasai Virar Region, with best in class Sound, best in class recordings, best in class ambience and Best And sweetest couple to support and help you achieve your dream to perform on Stage. I\'ve always got 5* experience and it gets better and better every time we go. Keep Going Hiten and Hetal ji 👍♥️🚩🇮🇳 Jay Shree Ram 🚩', name: 'Hemont Mattwankar', role: 'Independent Artist',image: 'https://lh3.googleusercontent.com/a-/ALV-UjW578QztJg94kBAg7_SPRSuyhN--eK5hRX967s0_k-fTz_y6b6UdA=w72-h72-p-rp-mo-ba2-br100' },
    { text: 'What an wonderful experience to be at this studio. Professional sound setup, App to manage songs and payments, timely sharing daily singers songs and friendly owners. Perfect place for new and experienced singers. Will sure recommend this place', name: 'Deven Jadav', role: 'Music Producer', image: 'https://lh3.googleusercontent.com/a-/ALV-UjUtgoo8I4r9-E895sCdCFFmBL39vfcOGVpUbD1kwW2FwA7W3X2v=w72-h72-p-rp-mo-ba3-br100' },
    { text: 'HRS is the Best Karaoke Studio, not only in Vasai, but also all over India ♥️.. because it has the Best Sound Recording Quality which is the topmost requirement for any singer 🎤🎤🔊🔊.. moreover, they arrange regular Stage Shows and Facebook Live to encourage and provide platform to the singers 👌👌👍👍.. and the owners are very friendly and ready give every answer to our singing related queries 🙏🙏🌹🌹', name: 'Naval Naik', role: 'Professional Vocalist', image:'https://lh3.googleusercontent.com/a-/ALV-UjWbxRTwtwjDRFvK7dtcklkQ-oianygia5lcMsR83ri5MJNdUuBa=w72-h72-p-rp-mo-br100' }
  ];

  useEffect(() => {
    // Check if mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    const slideInterval = setInterval(() => setCurrentSlide(prev => (prev + 1) % slides.length), 5000);
    const handleScroll = () => setScrolled(window.scrollY > 50);
    
    window.addEventListener('scroll', handleScroll);
    
    // Handle body scroll when menu is open
    if (menuOpen) {
      document.body.classList.add('menu-open');
    } else {
      document.body.classList.remove('menu-open');
    }
    
    return () => { 
      clearInterval(slideInterval); 
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', checkMobile);
      document.body.classList.remove('menu-open');
    };
  }, [slides.length, menuOpen]);

  const particles = Array.from({ length: isMobile ? 15 : 30 }, (_, i) => ({
    top: `${Math.random() * 100}%`, 
    left: `${Math.random() * 100}%`,
    animationDelay: `${Math.random() * 6}s`, 
    animationDuration: `${4 + Math.random() * 4}s`
  }));

  return (
    <div className="container-fix" style={{ fontFamily: "'Poppins', sans-serif", background: '#000', minHeight: '100vh', color: '#fff', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(-45deg, #000, #1a0033, #000033, #330033)', backgroundSize: '400% 400%', animation: 'gradientShift 15s ease infinite', zIndex: 0 }} />
      
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1, pointerEvents: 'none' }}>
        {particles.map((p, i) => (
          <div key={i} className="particle" style={{ 
            top: p.top, 
            left: p.left, 
            animationDelay: p.animationDelay, 
            animationDuration: p.animationDuration 
          }} />
        ))}
      </div>
      
      {/* Fixed Navigation Bar */}
      <nav className="navbar" style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        padding: isMobile ? '12px 15px' : (scrolled ? '15px 40px' : '20px 40px'), 
        position: 'fixed', 
        top: 0, 
        width: '100%', 
        background: scrolled ? 'rgba(0,0,0,0.98)' : 'rgba(0,0,0,0.95)', 
        backdropFilter: 'blur(20px)', 
        borderBottom: '1px solid rgba(0,255,255,0.2)', 
        zIndex: 1000, 
        transition: 'all 0.3s ease', 
        boxSizing: 'border-box',
        minHeight: '70px'
      }}>
        
        {/* Logo */}
        <div style={{ 
          fontSize: isMobile ? '1.4rem' : '1.8rem', 
          fontWeight: 800, 
          background: 'linear-gradient(135deg, #0ff, #f0f)', 
          WebkitBackgroundClip: 'text', 
          WebkitTextFillColor: 'transparent', 
          cursor: 'pointer', 
          letterSpacing: 1,
          flexShrink: 0
        }} onClick={() => { navigate('/'); setMenuOpen(false); }}>
          🎵 HRS STUDIO
        </div>
        
        {/* Desktop Navigation */}
        {!isMobile && (
          <div className="nav-buttons" style={{ 
            display: 'flex', 
            gap: 15, 
            alignItems: 'center'
          }}>
            {['Login', 'Dashboard', 'About'].map((label, i) => (
              <button 
                key={i} 
                className="nav-btn" 
                style={{ 
                  background: 'transparent', 
                  color: '#fff', 
                  border: '2px solid rgba(0,255,255,0.5)', 
                  padding: '10px 20px', 
                  fontSize: '0.9rem', 
                  fontWeight: 600, 
                  borderRadius: 20, 
                  cursor: 'pointer', 
                  position: 'relative', 
                  zIndex: 1,
                  transition: 'all 0.3s ease'
                }} 
                onClick={() => navigate(['login','dashboard','about'][i])}
              >
                {label}
              </button>
            ))}
          </div>
        )}
        
        {/* Mobile Menu Button */}
        {isMobile && (
          <button
            className="mobile-menu-button"
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              background: 'rgba(0, 255, 255, 0.1)',
              border: '2px solid rgba(0, 255, 255, 0.5)',
              borderRadius: '8px',
              width: '45px',
              height: '45px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              padding: '8px',
              transition: 'all 0.3s ease'
            }}
          >
            <span style={{
              width: '20px',
              height: '2px',
              background: '#0ff',
              margin: '2px 0',
              transition: 'all 0.3s ease',
              transform: menuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none'
            }}></span>
            <span style={{
              width: '20px',
              height: '2px',
              background: '#0ff',
              margin: '2px 0',
              transition: 'all 0.3s ease',
              opacity: menuOpen ? 0 : 1
            }}></span>
            <span style={{
              width: '20px',
              height: '2px',
              background: '#0ff',
              margin: '2px 0',
              transition: 'all 0.3s ease',
              transform: menuOpen ? 'rotate(-45deg) translate(7px, -6px)' : 'none'
            }}></span>
          </button>
        )}
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobile && menuOpen && (
        <div 
          className="mobile-menu"
          style={{
            position: 'fixed',
            top: '70px',
            left: 0,
            width: '100%',
            height: 'calc(100vh - 70px)',
            background: 'rgba(0, 0, 0, 0.98)',
            backdropFilter: 'blur(20px)',
            zIndex: 999,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-start',
            padding: '40px 20px',
            borderTop: '1px solid rgba(0,255,255,0.2)'
          }}
        >
          {['Login', 'Dashboard', 'About'].map((label, i) => (
            <button
              key={i}
              onClick={() => {
                navigate(['login','dashboard','about'][i]);
                setMenuOpen(false);
              }}
              style={{
                background: 'transparent',
                color: '#fff',
                border: '2px solid rgba(0,255,255,0.5)',
                padding: '16px 30px',
                fontSize: '1.1rem',
                fontWeight: 600,
                borderRadius: 25,
                cursor: 'pointer',
                width: '100%',
                maxWidth: '280px',
                margin: '10px 0',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'rgba(0, 255, 255, 0.1)';
                e.target.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'transparent';
                e.target.style.transform = 'translateY(0)';
              }}
            >
              {label}
            </button>
          ))}
          
          {/* Close menu by clicking outside area */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              zIndex: -1
            }}
            onClick={() => setMenuOpen(false)}
          />
        </div>
      )}

      {/* Hero Section */}
      <section className="section-with-navbar" style={{ 
        position: 'relative', 
        height: isMobile ? '80vh' : '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        textAlign: 'center', 
        zIndex: 2, 
        paddingTop: isMobile ? '70px' : '80px',
        marginTop: 0
      }}>
        <div style={{ 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          width: '100%', 
          height: '100%', 
          backgroundImage: `url(${hrs3})`, 
          backgroundSize: 'cover', 
          backgroundPosition: 'center', 
          filter: 'brightness(0.3) contrast(1.2)', 
          zIndex: -1 
        }} />
        
        <div style={{ 
          maxWidth: isMobile ? '100%' : 900, 
          padding: isMobile ? '0 20px' : '0 20px', 
          animation: 'fadeInUp 1s ease-out' 
        }}>
          <h1 className="hero-title" style={{ 
            fontSize: isMobile ? '2.2rem' : '4rem', 
            fontWeight: 900, 
            marginBottom: isMobile ? 15 : 20, 
            background: 'linear-gradient(135deg, #0ff, #f0f, #0ff)', 
            backgroundSize: '200% auto', 
            WebkitBackgroundClip: 'text', 
            WebkitTextFillColor: 'transparent', 
            animation: 'gradientShift 3s linear infinite', 
            lineHeight: isMobile ? 1.1 : 1.2 
          }}>
            Where Music Comes Alive
          </h1>
          
          <p className="hero-subtitle" style={{ 
            fontSize: isMobile ? '1rem' : '1.4rem', 
            color: '#e0e0e0', 
            marginBottom: isMobile ? 30 : 40, 
            fontWeight: 300, 
            lineHeight: isMobile ? 1.5 : 1.8 
          }}>
            Professional karaoke studio delivering exceptional sound quality and unforgettable musical experiences
          </p>
          
          <div className="cta-buttons" style={{ 
            display: 'flex', 
            gap: isMobile ? 15 : 20, 
            justifyContent: 'center', 
            flexWrap: 'wrap' 
          }}>
            <button className="cta-btn" style={{ 
              padding: isMobile ? '14px 30px' : '16px 40px', 
              fontSize: isMobile ? '1rem' : '1.1rem', 
              fontWeight: 700, 
              borderRadius: 50, 
              border: 'none', 
              cursor: 'pointer', 
              textTransform: 'uppercase', 
              letterSpacing: 1, 
              background: 'linear-gradient(135deg, #f0f, #0ff)', 
              color: '#000', 
              boxShadow: '0 8px 30px rgba(255,0,255,0.4)', 
              transition: 'all 0.3s' 
            }} onClick={() => navigate('/login')}>
              Get Started
            </button>
            
            <button className="cta-btn" style={{ 
              padding: isMobile ? '14px 30px' : '16px 40px', 
              fontSize: isMobile ? '1rem' : '1.1rem', 
              fontWeight: 700, 
              borderRadius: 50, 
              cursor: 'pointer', 
              textTransform: 'uppercase', 
              letterSpacing: 1, 
              background: 'transparent', 
              color: '#0ff', 
              border: '2px solid #0ff', 
              transition: 'all 0.3s' 
            }} onClick={() => navigate('/about')}>
              Learn More
            </button>
          </div>
          
          {!isMobile && (
            <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginTop: 50 }}>
              {[40,60,35,70,45,55,40].map((h, i) => (
                <div key={i} style={{ 
                  width: 6, 
                  height: h, 
                  background: 'linear-gradient(180deg, #0ff, #f0f)', 
                  borderRadius: 10, 
                  animation: `pulse ${0.6+i*0.1}s ease-in-out infinite` 
                }} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="section-with-navbar" style={{ padding: isMobile ? '60px 20px' : '100px 40px', position: 'relative', zIndex: 2 }}>
        <h2 className="section-title" style={{ 
          fontSize: isMobile ? '1.8rem' : '3rem', 
          fontWeight: 900, 
          textAlign: 'center', 
          marginBottom: isMobile ? 40 : 70, 
          background: 'linear-gradient(135deg, #0ff, #f0f)', 
          WebkitBackgroundClip: 'text', 
          WebkitTextFillColor: 'transparent', 
          animation: 'scaleIn 0.8s ease-out' 
        }}>
          Our Premium Services
        </h2>
        
        <div className="features-grid" style={{ 
          display: 'grid', 
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(320px, 1fr))', 
          gap: isMobile ? 20 : 40, 
          maxWidth: 1400, 
          margin: '0 auto' 
        }}>
          {features.map((f, i) => (
            <div key={i} className="feature-card" style={{ 
              background: 'rgba(0,0,0,0.6)', 
              backdropFilter: 'blur(10px)', 
              padding: isMobile ? '30px 20px' : '40px 30px', 
              borderRadius: 20, 
              border: '1px solid rgba(0,255,255,0.3)', 
              textAlign: 'center', 
              cursor: 'pointer' 
            }}>
              <span style={{ 
                fontSize: isMobile ? '3rem' : '4rem', 
                marginBottom: isMobile ? 15 : 25, 
                display: 'block', 
                filter: 'drop-shadow(0 0 15px rgba(0,255,255,0.5))' 
              }}>
                {f.icon}
              </span>
              
              <h3 style={{ 
                fontSize: isMobile ? '1.4rem' : '1.6rem', 
                color: '#0ff', 
                marginBottom: isMobile ? 10 : 15, 
                fontWeight: 700 
              }}>
                {f.title}
              </h3>
              
              <p style={{ 
                color: '#b0b0b0', 
                fontSize: isMobile ? '0.95rem' : '1.05rem', 
                lineHeight: isMobile ? 1.5 : 1.7 
              }}>
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Slides Section */}
<section className="section-with-navbar" style={{ 
  padding: isMobile ? '60px 20px' : '80px 40px', 
  position: 'relative', 
  zIndex: 2, 
  background: 'rgba(0,0,0,0.5)' 
}}>
  <h2 className="section-title" style={{ 
    fontSize: isMobile ? '1.8rem' : '3rem', 
    fontWeight: 900, 
    textAlign: 'center', 
    marginBottom: isMobile ? 40 : 60, 
    background: 'linear-gradient(135deg, #0ff, #f0f)', 
    WebkitBackgroundClip: 'text', 
    WebkitTextFillColor: 'transparent' 
  }}>
    Featured Highlights
  </h2>
  
  <div className="slides-container" style={{ 
    maxWidth: 1200, 
    margin: '0 auto', 
    position: 'relative', 
    borderRadius: 20, 
    overflow: 'hidden', 
    boxShadow: '0 20px 50px rgba(0,255,255,0.2)' 
  }}>
    <div style={{ 
      display: 'flex', 
      transition: 'transform 0.7s cubic-bezier(0.4,0,0.2,1)', 
      transform: `translateX(-${currentSlide*100}%)` 
    }}>
      {slides.map((s, i) => (
        <div key={i} style={{ minWidth: '100%', position: 'relative' }}>
          
          {/* Image Slide */}
          {s.type === 'image' && (
            <img 
              src={s.image} 
              alt={s.title}
              className="slide-image"
              style={{ 
                width: '100%', 
                height: isMobile ? 250 : 400, 
                objectFit: 'cover', 
                display: 'block' 
              }} 
            />
          )}
          
          {/* Video Slide */}
          {s.type === 'video' && (
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              style={{
                width: '100%',
                height: isMobile ? 250 : 400,
                objectFit: 'cover',
                display: 'block',
                backgroundColor: '#000' // Fallback background
              }}
              onLoadedData={(e) => {
                // Video loaded successfully
                e.target.play().catch((error) => {
                  console.log('Autoplay failed:', error);
                });
              }}
              onError={(e) => {
                console.error('Video failed to load:', s.video);
              }}
            >
              <source src={s.video} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}
          
          {/* Content Overlay */}
          <div style={{ 
            position: 'absolute', 
            bottom: 0, 
            left: 0, 
            right: 0, 
            background: 'linear-gradient(to top, rgba(0,0,0,0.95), transparent)', 
            padding: isMobile ? '20px' : '30px' 
          }}>
            <h3 style={{ 
              fontSize: isMobile ? '1.3rem' : '1.8rem', 
              color: '#0ff', 
              marginBottom: 8, 
              fontWeight: 800 
            }}>
              {s.title}
            </h3>
            <p style={{ 
              fontSize: isMobile ? '0.9rem' : '1.1rem', 
              color: '#ccc', 
              lineHeight: 1.5 
            }}>
              {s.description}
            </p>
          </div>
        </div>
      ))}
    </div>
    
    {/* Slide Indicators */}
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      gap: 8, 
      marginTop: 20, 
      flexWrap: 'wrap', 
      padding: '0 15px' 
    }}>
      {slides.map((_, i) => (
        <button 
          key={i} 
          onClick={() => setCurrentSlide(i)} 
          style={{ 
            width: currentSlide===i ? 30 : 10, 
            height: 10, 
            borderRadius: currentSlide===i ? 5 : '50%', 
            background: currentSlide===i ? '#0ff' : 'rgba(255,255,255,0.3)', 
            border: 'none', 
            cursor: 'pointer', 
            transition: 'all 3s', 
            boxShadow: currentSlide===i ? '0 0 15px rgba(0,255,255,0.6)' : 'none' 
          }} 
        />
      ))}
    </div>
  </div>
</section>

      {/* Stats Section */}
      <section className="section-with-navbar" style={{ 
        padding: isMobile ? '60px 20px' : '80px 40px', 
        background: 'rgba(255,0,255,0.05)', 
        position: 'relative', 
        zIndex: 2 
      }}>
        <div className="stats-grid" style={{ 
          display: 'grid', 
          gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: isMobile ? 20 : 40, 
          maxWidth: 1200, 
          margin: '0 auto', 
          textAlign: 'center' 
        }}>
          {[
            {n:'1000+',l:'Shows Completed'},
            {n:'10+',l:'Years Experience'},
            {n:'500+',l:'Happy Singers'},
            {n:'24/7',l:'Support'}
          ].map((s, i) => (
            <div key={i} style={{ animation: 'scaleIn 0.6s ease-out' }}>
              <div className="stats-number" style={{ 
                fontSize: isMobile ? '2.2rem' : '3.5rem', 
                fontWeight: 900, 
                background: 'linear-gradient(135deg, #0ff, #f0f)', 
                WebkitBackgroundClip: 'text', 
                WebkitTextFillColor: 'transparent', 
                marginBottom: 8 
              }}>
                {s.n}
              </div>
              <div style={{ 
                fontSize: isMobile ? '0.9rem' : '1.1rem', 
                color: '#999', 
                textTransform: 'uppercase', 
                letterSpacing: 1, 
                fontWeight: 600 
              }}>
                {s.l}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section-with-navbar" style={{ padding: isMobile ? '60px 20px' : '80px 40px', position: 'relative', zIndex: 2 }}>
        <h2 className="section-title" style={{ 
          fontSize: isMobile ? '1.8rem' : '3rem', 
          fontWeight: 900, 
          textAlign: 'center', 
          marginBottom: isMobile ? 40 : 60, 
          background: 'linear-gradient(135deg, #0ff, #f0f)', 
          WebkitBackgroundClip: 'text', 
          WebkitTextFillColor: 'transparent' 
        }}>
          What Our Singers Say
        </h2>
        
        <div className="testimonials-grid smooth-scroll" style={{ 
          display: 'grid', 
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(320px, 1fr))', 
          gap: isMobile ? 20 : 30, 
          maxWidth: 1300, 
          margin: '0 auto' 
        }}>
          {testimonials.map((t, i) => (
            <div 
              key={i} 
              className="smooth-scroll"
              style={{ 
                background: 'rgba(0,0,0,0.6)', 
                backdropFilter: 'blur(10px)', 
                padding: isMobile ? '25px 20px' : '30px 25px', 
                borderRadius: 15, 
                border: '1px solid rgba(255,0,255,0.3)', 
                transition: 'all 0.3s', 
                cursor: 'pointer',
                overflow: 'hidden'
              }} 
              onMouseEnter={e=>{
                if (!isMobile) {
                  e.currentTarget.style.transform='scale(1.02)';
                  e.currentTarget.style.boxShadow='0 10px 25px rgba(0,255,255,0.2)';
                }
              }} 
              onMouseLeave={e=>{
                if (!isMobile) {
                  e.currentTarget.style.transform='scale(1)';
                  e.currentTarget.style.boxShadow='none';
                }
              }}
            >
              <p style={{ 
                fontSize: isMobile ? '0.95rem' : '1.05rem', 
                color: '#ddd', 
                marginBottom: 20, 
                lineHeight: 1.6, 
                fontStyle: 'italic' 
              }}>
                "{t.text}"
              </p>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <img 
                  src={t.image} 
                  alt={t.name}
                  style={{ 
                    width: 45, 
                    height: 45, 
                    borderRadius: '50%', 
                    objectFit: 'cover',
                    border: '2px solid #0ff'
                  }} 
                />
                <div>
                  <div style={{ 
                    fontSize: isMobile ? '1rem' : '1.1rem', 
                    color: '#0ff', 
                    fontWeight: 700 
                  }}>
                    {t.name}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Review Section */}
      <section className="section-with-navbar" style={{ 
        padding: isMobile ? '60px 20px' : '80px 40px', 
        textAlign: 'center', 
        background: 'rgba(0,255,255,0.05)', 
        position: 'relative', 
        zIndex: 2 
      }}>
        <div style={{ 
          maxWidth: isMobile ? '100%' : 700, 
          margin: '0 auto', 
          background: 'rgba(0,0,0,0.7)', 
          backdropFilter: 'blur(15px)', 
          padding: isMobile ? '40px 25px' : '50px 40px', 
          borderRadius: 20, 
          border: '2px solid rgba(0,255,255,0.3)' 
        }}>
          <h2 style={{ 
            fontSize: isMobile ? '1.8rem' : '2.5rem', 
            fontWeight: 900, 
            marginBottom: 15, 
            background: 'linear-gradient(135deg, #0ff, #f0f)', 
            WebkitBackgroundClip: 'text', 
            WebkitTextFillColor: 'transparent' 
          }}>
            Share Your Experience
          </h2>
          
          <p style={{ 
            color: '#ccc', 
            fontSize: isMobile ? '1rem' : '1.1rem', 
            marginBottom: 8 
          }}>
            Your feedback helps us grow and serve you better
          </p>
          
          <p style={{ 
            color: '#999', 
            fontSize: isMobile ? '0.9rem' : '1rem', 
            marginBottom: 20 
          }}>
            Leave a review and let others know about your HRS Studio experience
          </p>
          
          <button className="review-btn" style={{ 
            background: 'linear-gradient(135deg, #34a853, #2d8e47)', 
            color: '#fff', 
            border: 'none', 
            padding: isMobile ? '14px 35px' : '16px 45px', 
            fontSize: isMobile ? '1rem' : '1.1rem', 
            borderRadius: 40, 
            cursor: 'pointer', 
            fontWeight: 700, 
            marginTop: 20, 
            boxShadow: '0 8px 30px rgba(52,168,83,0.4)', 
            transition: 'all 0.3s' 
          }} onClick={() => window.open('https://g.co/kgs/Co7pMp7', '_blank')}>
            Leave a Google Review
          </button>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section-with-navbar" style={{ padding: isMobile ? '60px 20px' : '80px 40px', position: 'relative', zIndex: 2 }}>
        <h2 className="section-title" style={{ 
          fontSize: isMobile ? '1.8rem' : '3rem', 
          fontWeight: 900, 
          textAlign: 'center', 
          marginBottom: isMobile ? 40 : 60, 
          background: 'linear-gradient(135deg, #0ff, #f0f)', 
          WebkitBackgroundClip: 'text', 
          WebkitTextFillColor: 'transparent' 
        }}>
          Get In Touch
        </h2>
        <ContactPage />
      </section>

      {/* Footer */}
      <footer style={{ 
        background: 'rgba(0,0,0,0.95)', 
        padding: isMobile ? '50px 20px 20px' : '70px 40px 25px', 
        borderTop: '1px solid rgba(0,255,255,0.2)', 
        position: 'relative', 
        zIndex: 2 
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', textAlign: 'center' }}>
          <div style={{ 
            fontSize: isMobile ? '2rem' : '2.5rem', 
            fontWeight: 900, 
            background: 'linear-gradient(135deg, #0ff, #f0f)', 
            WebkitBackgroundClip: 'text', 
            WebkitTextFillColor: 'transparent', 
            marginBottom: 15 
          }}>
            🎵 HRS STUDIO
          </div>
          
          <p style={{ 
            color: '#888', 
            fontSize: isMobile ? '1rem' : '1.1rem', 
            marginBottom: 30 
          }}>
            Your trusted destination for premium karaoke experiences and soundproof recording
          </p>
          
          <div className="footer-links" style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            gap: isMobile ? 20 : 30, 
            flexWrap: 'wrap', 
            marginBottom: 30 
          }}>
            {[
              {p:'/',l:'Home'},
              {p:'/about',l:'About'},
              {p:'/contact',l:'Contact'},
              {p:'/dashboard',l:'Dashboard'},
              {p:'/login',l:'Login'}
            ].map((x, i) => (
              <Link 
                key={i} 
                to={x.p} 
                className="footer-link" 
                style={{ 
                  color: '#0ff', 
                  textDecoration: 'none', 
                  fontSize: isMobile ? '1rem' : '1.1rem', 
                  fontWeight: 600 
                }}
              >
                {x.l}
              </Link>
            ))}
          </div>
          
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            gap: isMobile ? 15 : 20, 
            marginBottom: 30 
          }}>
            {[
              { icon: 'bi-facebook', url: 'https://www.facebook.com/profile.php?id=100057460298837#' },
              { icon: 'bi-instagram', url: 'https://www.instagram.com/hrsvasai/' },
              { icon: 'bi-youtube', url: 'https://www.youtube.com/@hrseventsentertainment8102' },
              { icon: 'bi-google', url: 'https://g.co/kgs/Co7pMp7' }
            ].map((social, i) => (
              <a 
                key={i} 
                href={social.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-icon" 
                style={{ 
                  width: isMobile ? 45 : 50, 
                  height: isMobile ? 45 : 50, 
                  borderRadius: '50%', 
                  background: 'rgba(0,255,255,0.1)', 
                  border: '2px solid rgba(0,255,255,0.5)', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  fontSize: isMobile ? '1.3rem' : '1.5rem', 
                  cursor: 'pointer',
                  textDecoration: 'none',
                  color: '#0ff',
                  transition: 'all 0.3s ease'
                }}
              >
                <i className={social.icon}></i>
              </a>
            ))}
          </div>
          
          <p style={{ 
            color: '#555', 
            fontSize: isMobile ? '0.85rem' : '0.95rem', 
            paddingTop: 25, 
            borderTop: '1px solid rgba(255,255,255,0.1)' 
          }}>
            © {new Date().getFullYear()} HRS Studio. All rights reserved. | Designed with 💜 & 🎵
          </p>
        </div>
      </footer>
    </div>
  );
};

const LoginPage = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const loginWithGoogle = async () => {
    setLoading(true);
    setError('');
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      if (user.email === "asharhiten@gmail.com") navigate("/admin");
      else navigate("/dashboard");
    } catch (err) {
      console.error("Login failed", err);
      setError("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      background: 'linear-gradient(-45deg, #000, #1a0033, #000033, #330033)', 
      backgroundSize: '400% 400%', 
      animation: 'gradientShift 15s ease infinite', 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      position: 'relative' 
    }}>
      
      {/* Back to Home Button */}
      <button 
        onClick={() => navigate('/')}
        style={{
          position: 'absolute',
          top: isMobile ? '20px' : '30px',
          left: isMobile ? '20px' : '30px',
          background: 'rgba(0, 255, 255, 0.1)',
          border: '2px solid rgba(0, 255, 255, 0.5)',
          borderRadius: '50%',
          width: isMobile ? 50 : 60,
          height: isMobile ? 50 : 60,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          fontSize: isMobile ? '1.5rem' : '1.8rem',
          color: '#0ff',
          transition: 'all 0.3s ease',
          zIndex: 10,
          backdropFilter: 'blur(10px)'
        }}
        title="Back to Home"
      >
        🏠
      </button>

      <div style={{ 
        background: 'rgba(0,0,0,0.8)', 
        backdropFilter: 'blur(20px)', 
        padding: isMobile ? '40px 25px' : '50px 40px', 
        borderRadius: 25, 
        border: '2px solid rgba(0,255,255,0.3)', 
        textAlign: 'center', 
        maxWidth: isMobile ? '90%' : 450, 
        width: '100%', 
        boxShadow: '0 25px 60px rgba(0,255,255,0.25)', 
        animation: 'scaleIn 0.6s ease-out',
        position: 'relative',
        margin: isMobile ? '0 20px' : '0'
      }}>
        
        <h1 style={{ 
          fontSize: isMobile ? '2.2rem' : '2.8rem', 
          fontWeight: 900, 
          marginBottom: 12, 
          background: 'linear-gradient(135deg, #0ff, #f0f)', 
          WebkitBackgroundClip: 'text', 
          WebkitTextFillColor: 'transparent' 
        }}>
          Welcome Back
        </h1>
        
        <p style={{ 
          color: '#999', 
          fontSize: isMobile ? '1rem' : '1.1rem', 
          marginBottom: 30 
        }}>
          Sign in to access your HRS Studio account
        </p>
        
        {error && (
          <p style={{ 
            background: 'rgba(255,68,68,0.2)', 
            color: '#f44', 
            padding: 12, 
            borderRadius: 12, 
            marginTop: 15, 
            fontSize: '0.9rem', 
            border: '1px solid rgba(255,68,68,0.5)' 
          }}>
            {error}
          </p>
        )}
        
        <button 
          className="login-btn" 
          style={{ 
            background: 'linear-gradient(135deg, #4285f4, #357ae8)', 
            color: '#fff', 
            border: 'none', 
            padding: isMobile ? '16px 30px' : '18px 40px', 
            fontSize: isMobile ? '1rem' : '1.1rem', 
            borderRadius: 40, 
            cursor: 'pointer', 
            width: '100%', 
            fontWeight: 700, 
            boxShadow: '0 8px 30px rgba(66,133,244,0.4)', 
            transition: 'all 0.3s',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            marginTop: 20
          }} 
          onClick={loginWithGoogle} 
          disabled={loading}
        >
          {loading ? (
            <>
              <div style={{ 
                width: '18px', 
                height: '18px', 
                border: '2px solid transparent', 
                borderTop: '2px solid #fff', 
                borderRadius: '50%', 
                animation: 'spin 1s linear infinite' 
              }} />
              Signing in...
            </>
          ) : (
            <>
              <i className="bi bi-google" style={{ fontSize: isMobile ? '1.1rem' : '1.2rem' }}></i>
              Sign in with Google
            </>
          )}
        </button>
        
        <p style={{ 
          color: '#666', 
          marginTop: 25, 
          fontSize: isMobile ? '0.85rem' : '0.9rem',
          lineHeight: 1.4
        }}>
          By signing in, you agree to our Terms of Service and Privacy Policy
        </p>

        {/* Alternative Back to Home Button */}
        <button 
          onClick={() => navigate('/')}
          style={{
            background: 'transparent',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            color: '#999',
            padding: isMobile ? '10px 20px' : '12px 25px',
            borderRadius: 20,
            cursor: 'pointer',
            fontSize: isMobile ? '0.85rem' : '0.9rem',
            marginTop: 20,
            transition: 'all 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
            width: '100%'
          }}
        >
          🏠 Back to Homepage
        </button>
      </div>

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default App;