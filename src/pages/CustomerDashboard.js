// import React, { useEffect, useState } from "react";
// import { auth, db } from "../firebase/firebaseConfig";
// import { onAuthStateChanged, signOut } from "firebase/auth";
// import { collection, query, where, onSnapshot } from "firebase/firestore";
// import { useNavigate } from "react-router-dom";

// const CustomerDashboard = () => {
//   const [user, setUser] = useState(null);
//   const [walletBalance, setWalletBalance] = useState(0);
//   const [transactions, setTransactions] = useState([]);
//   const [recharges, setRecharges] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [activeTab, setActiveTab] = useState('overview');
//   const [searchTerm, setSearchTerm] = useState('');
//   const navigate = useNavigate();

//   useEffect(() => {
//     const unsubscribeAuth = onAuthStateChanged(auth, async (currentUser) => {
//       if (currentUser) {
//         setUser(currentUser);
//         const userEmail = currentUser.email;

//         const q = query(collection(db, "users"), where("email", "==", userEmail));
//         const unsubscribeSnapshot = onSnapshot(q, (querySnapshot) => {
//           if (!querySnapshot.empty) {
//             const docData = querySnapshot.docs[0].data();

//             const sortedTransactions = (docData.transactionHistory || []).sort(
//               (a, b) => new Date(b.date) - new Date(a.date)
//             );

//             const sortedRecharges = (docData.rechargeHistory || []).sort(
//               (a, b) => new Date(b.date) - new Date(a.date)
//             );

//             setWalletBalance(docData.balance || 0);
//             setTransactions(sortedTransactions);
//             setRecharges(sortedRecharges);
//             setLoading(false);
//           } else {
//             setWalletBalance(0);
//             setTransactions([]);
//             setRecharges([]);
//             setLoading(false);
//           }
//         });

//         return () => unsubscribeSnapshot();
//       } else {
//         setUser(null);
//         navigate('/login');
        
//       }
//     });

//     return () => unsubscribeAuth();
//   }, [navigate]);

//   const isRecent = (dateStr) => {
//     const itemDate = new Date(dateStr);
//     const now = new Date();
//     const diffTime = Math.abs(now - itemDate);
//     const diffDays = diffTime / (1000 * 60 * 60 * 24);
//     return diffDays <= 2;
//   };

//   const handleLogout = async () => {
//     try {
//       await signOut(auth);
//       navigate('/');
//     } catch (error) {
//       console.error("Logout failed", error);
//     }
//   };

//   const totalSpent = transactions.reduce((sum, txn) => sum + (txn.amount || 0), 0);
//   const totalRecharged = recharges.reduce((sum, rchg) => sum + (rchg.amount || 0) + (rchg.bonus || 0), 0);

//   const filteredTransactions = transactions.filter(txn => 
//     txn.type?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     txn.amount?.toString().includes(searchTerm)
//   );

//   const filteredRecharges = recharges.filter(rchg =>
//     rchg.amount?.toString().includes(searchTerm)
//   );

//   if (loading) {
//     return (
//       <div style={{ background: 'linear-gradient(-45deg, #000, #1a0033, #000033, #330033)', backgroundSize: '400% 400%', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontFamily: "'Poppins', sans-serif" }}>
//         <div style={{ textAlign: 'center' }}>
//           <div style={{ fontSize: '4rem', marginBottom: 20, animation: 'pulse 1.5s infinite' }}>🎵</div>
//           <div style={{ fontSize: '1.8rem', background: 'linear-gradient(135deg, #0ff, #f0f)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontWeight: 700 }}>Loading your dashboard...</div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div style={{ fontFamily: "'Poppins', sans-serif", background: 'linear-gradient(-45deg, #000, #1a0033, #000033, #330033)', backgroundSize: '400% 400%', minHeight: '100vh', color: '#fff', position: 'relative', overflow: 'hidden' }}>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700;900&display=swap');
//         @keyframes gradientShift { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
//         @keyframes fadeInUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
//         @keyframes pulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.1); } }
//         @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
//         @keyframes slideIn { from { transform: translateX(-20px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
        
//         .card { transition: all 0.3s ease; }
//         .card:hover { transform: translateY(-5px); box-shadow: 0 15px 40px rgba(0, 255, 255, 0.3); }
//         .transaction-item { transition: all 0.3s ease; }
//         .transaction-item:hover { background: rgba(0, 255, 255, 0.15); transform: translateX(5px); }
//         .tab-btn { transition: all 0.3s ease; cursor: pointer; }
//         .tab-btn:hover { transform: translateY(-2px); }
//         .stat-card { animation: slideIn 0.6s ease-out; }
//         .logout-btn { transition: all 0.3s ease; }
//         .logout-btn:hover { transform: scale(1.05); box-shadow: 0 10px 30px rgba(255, 0, 0, 0.4); }
        
//         @media (max-width: 968px) {
//           .dashboard-grid { grid-template-columns: 1fr !important; }
//           .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
//         }
        
//         @media (max-width: 768px) {
//           .logo { width: 100px !important; height: 100px !important; }
//           .welcome-title { font-size: 1.5rem !important; }
//           .balance-amount { font-size: 2.5rem !important; }
//           .stat-number { font-size: 1.8rem !important; }
//           .tabs { flex-direction: column !important; gap: 10px !important; }
//           .tab-btn { width: 100% !important; }
//           .stats-grid { grid-template-columns: 1fr !important; }
//         }

//         ::-webkit-scrollbar { width: 8px; }
//         ::-webkit-scrollbar-track { background: rgba(0, 0, 0, 0.3); border-radius: 10px; }
//         ::-webkit-scrollbar-thumb { background: linear-gradient(135deg, #0ff, #f0f); border-radius: 10px; }
//         ::-webkit-scrollbar-thumb:hover { background: linear-gradient(135deg, #f0f, #0ff); }
//       `}</style>

//       {/* Animated Background */}
//       <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(-45deg, #000, #1a0033, #000033, #330033)', backgroundSize: '400% 400%', animation: 'gradientShift 15s ease infinite', zIndex: 0 }} />

//       {/* Particles */}
//       <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1, pointerEvents: 'none' }}>
//         {Array.from({ length: 20 }, (_, i) => (
//           <div key={i} style={{ position: 'absolute', width: 4, height: 4, background: 'rgba(0, 255, 255, 0.6)', borderRadius: '50%', top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%`, animation: `float ${4 + Math.random() * 4}s infinite ease-in-out`, animationDelay: `${Math.random() * 6}s` }} />
//         ))}
//       </div>

//       <div style={{ maxWidth: 1600, margin: '0 auto', padding: '20px', position: 'relative', zIndex: 2 }}>
//         {/* Top Navigation Bar */}
//         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 40, flexWrap: 'wrap', gap: 20, background: 'rgba(0, 0, 0, 0.6)', backdropFilter: 'blur(15px)', padding: '20px 30px', borderRadius: 20, border: '1px solid rgba(0, 255, 255, 0.3)' }}>
//           <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
//             <img src="/HRS LOGO.jpg" alt="HRS Studio" className="logo" style={{ width: 60, height: 60, borderRadius: '50%', border: '2px solid rgba(0, 255, 255, 0.5)' }} />
//             <div>
//               <h2 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 800, background: 'linear-gradient(135deg, #0ff, #f0f)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>🎤 HRS Studio</h2>
//               <p style={{ margin: 0, color: '#999', fontSize: '0.9rem' }}>{user?.email}</p>
//             </div>
//           </div>
//           <button className="logout-btn" onClick={handleLogout} style={{ background: 'linear-gradient(135deg, #ff0055, #ff4444)', color: '#fff', border: 'none', padding: '12px 30px', borderRadius: 25, fontWeight: 700, cursor: 'pointer', fontSize: '1rem' }}>
//             🚪 Logout
//           </button>
//         </div>

//         {/* Welcome & Stats Section */}
//         <div style={{ textAlign: 'center', marginBottom: 50, animation: 'fadeInUp 0.8s ease-out' }}>
//           <h1 className="welcome-title" style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: 10, background: 'linear-gradient(135deg, #0ff, #f0f)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
//             Welcome Back, {user?.displayName || user?.email?.split('@')[0]}! 👋
//           </h1>
//           <p style={{ fontSize: '1.1rem', color: '#999' }}>Here's your music production journey overview</p>
//         </div>

//         {/* Quick Stats Grid */}
//         <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 30, marginBottom: 50 }}>
//           <div className="stat-card card" style={{ background: 'rgba(0, 0, 0, 0.6)', backdropFilter: 'blur(15px)', borderRadius: 25, padding: 35, border: '2px solid rgba(0, 255, 255, 0.4)', textAlign: 'center' }}>
//             <div style={{ fontSize: '3rem', marginBottom: 15 }}>💰</div>
//             <div className="stat-number" style={{ fontSize: '2.5rem', fontWeight: 900, background: 'linear-gradient(135deg, #0ff, #f0f)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: 10 }}>₹{walletBalance.toLocaleString()}</div>
//             <div style={{ color: '#999', fontSize: '1rem', textTransform: 'uppercase', letterSpacing: 1 }}>Current Balance</div>
//           </div>

//           <div className="stat-card card" style={{ background: 'rgba(0, 0, 0, 0.6)', backdropFilter: 'blur(15px)', borderRadius: 25, padding: 35, border: '2px solid rgba(255, 0, 255, 0.4)', textAlign: 'center' }}>
//             <div style={{ fontSize: '3rem', marginBottom: 15 }}>📊</div>
//             <div className="stat-number" style={{ fontSize: '2.5rem', fontWeight: 900, color: '#f0f', marginBottom: 10 }}>₹{totalSpent.toLocaleString()}</div>
//             <div style={{ color: '#999', fontSize: '1rem', textTransform: 'uppercase', letterSpacing: 1 }}>Total Spent</div>
//           </div>

//           <div className="stat-card card" style={{ background: 'rgba(0, 0, 0, 0.6)', backdropFilter: 'blur(15px)', borderRadius: 25, padding: 35, border: '2px solid rgba(0, 255, 255, 0.4)', textAlign: 'center' }}>
//             <div style={{ fontSize: '3rem', marginBottom: 15 }}>💳</div>
//             <div className="stat-number" style={{ fontSize: '2.5rem', fontWeight: 900, color: '#0ff', marginBottom: 10 }}>₹{totalRecharged.toLocaleString()}</div>
//             <div style={{ color: '#999', fontSize: '1rem', textTransform: 'uppercase', letterSpacing: 1 }}>Total Recharged</div>
//           </div>

//           <div className="stat-card card" style={{ background: 'rgba(0, 0, 0, 0.6)', backdropFilter: 'blur(15px)', borderRadius: 25, padding: 35, border: '2px solid rgba(255, 0, 255, 0.4)', textAlign: 'center' }}>
//             <div style={{ fontSize: '3rem', marginBottom: 15 }}>🎵</div>
//             <div className="stat-number" style={{ fontSize: '2.5rem', fontWeight: 900, background: 'linear-gradient(135deg, #f0f, #0ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: 10 }}>
//               {transactions.length}
//             </div>
//             <div style={{ color: '#999', fontSize: '1rem', textTransform: 'uppercase', letterSpacing: 1 }}>Total Sessions</div>
//           </div>
//         </div>

//         {/* Tabs Navigation */}
//         <div className="tabs" style={{ display: 'flex', gap: 20, marginBottom: 40, justifyContent: 'center', flexWrap: 'wrap' }}>
//           {[
//             { id: 'overview', label: 'Overview', icon: '📊' },
//             { id: 'transactions', label: 'Transactions', icon: '🧾' },
//             { id: 'recharges', label: 'Recharges', icon: '💳' }
//           ].map(tab => (
//             <button key={tab.id} className="tab-btn" onClick={() => setActiveTab(tab.id)} style={{ background: activeTab === tab.id ? 'linear-gradient(135deg, #0ff, #f0f)' : 'rgba(0, 0, 0, 0.6)', color: activeTab === tab.id ? '#000' : '#fff', border: activeTab === tab.id ? 'none' : '2px solid rgba(0, 255, 255, 0.3)', padding: '15px 35px', borderRadius: 25, fontWeight: 700, fontSize: '1rem', backdropFilter: 'blur(10px)' }}>
//               {tab.icon} {tab.label}
//             </button>
//           ))}
//         </div>

//         {/* Search Bar */}
//         {activeTab !== 'overview' && (
//           <div style={{ marginBottom: 30, maxWidth: 600, margin: '0 auto 40px' }}>
//             <input type="text" placeholder="🔍 Search by type or amount..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} style={{ width: '100%', padding: '18px 25px', background: 'rgba(0, 0, 0, 0.6)', border: '2px solid rgba(0, 255, 255, 0.3)', borderRadius: 25, color: '#fff', fontSize: '1rem', outline: 'none', backdropFilter: 'blur(10px)' }} />
//           </div>
//         )}

//         {/* Content Area */}
//         {activeTab === 'overview' && (
//           <div className="dashboard-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))', gap: 40 }}>
//             {/* Recent Transactions */}
//             <div className="card" style={{ background: 'rgba(0, 0, 0, 0.6)', backdropFilter: 'blur(15px)', borderRadius: 25, padding: 40, border: '1px solid rgba(255, 0, 255, 0.3)', animation: 'fadeInUp 1s ease-out' }}>
//               <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#f0f', marginBottom: 30, display: 'flex', alignItems: 'center', gap: 15 }}>
//                 <span style={{ fontSize: '2rem' }}>🧾</span> Recent Transactions
//               </h2>
//               {transactions.length === 0 ? (
//                 <div style={{ textAlign: 'center', padding: '40px 20px', color: '#666' }}>
//                   <div style={{ fontSize: '3rem', marginBottom: 15 }}>📭</div>
//                   <p>No transactions yet.</p>
//                 </div>
//               ) : (
//                 <div style={{ maxHeight: 400, overflowY: 'auto', paddingRight: 10 }}>
//                   {transactions.slice(0, 5).map((txn, idx) => (
//                     <div key={idx} className="transaction-item" style={{ background: 'rgba(255, 0, 255, 0.08)', padding: '18px', borderRadius: 15, marginBottom: 12, border: '1px solid rgba(255, 0, 255, 0.2)' }}>
//                       <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                         <div>
//                           <div style={{ fontSize: '1rem', fontWeight: 700, color: '#fff', marginBottom: 5 }}>
//                             {txn.type?.toUpperCase() || "SESSION"}
//                             {isRecent(txn.date) && <span style={{ background: 'linear-gradient(135deg, #0ff, #f0f)', color: '#000', fontWeight: 800, padding: '3px 10px', borderRadius: 12, marginLeft: 10, fontSize: '0.75rem' }}>NEW</span>}
//                           </div>
//                           <div style={{ fontSize: '0.85rem', color: '#999' }}>{new Date(txn.date).toLocaleDateString('en-IN')}</div>
//                         </div>
//                         <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#f0f' }}>₹{txn.amount}</div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>

//             {/* Recent Recharges */}
//             <div className="card" style={{ background: 'rgba(0, 0, 0, 0.6)', backdropFilter: 'blur(15px)', borderRadius: 25, padding: 40, border: '1px solid rgba(0, 255, 255, 0.3)', animation: 'fadeInUp 1.2s ease-out' }}>
//               <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0ff', marginBottom: 30, display: 'flex', alignItems: 'center', gap: 15 }}>
//                 <span style={{ fontSize: '2rem' }}>💳</span> Recent Recharges
//               </h2>
//               {recharges.length === 0 ? (
//                 <div style={{ textAlign: 'center', padding: '40px 20px', color: '#666' }}>
//                   <div style={{ fontSize: '3rem', marginBottom: 15 }}>💰</div>
//                   <p>No recharges yet.</p>
//                 </div>
//               ) : (
//                 <div style={{ maxHeight: 400, overflowY: 'auto', paddingRight: 10 }}>
//                   {recharges.slice(0, 5).map((rchg, idx) => (
//                     <div key={idx} className="transaction-item" style={{ background: 'rgba(0, 255, 255, 0.08)', padding: '18px', borderRadius: 15, marginBottom: 12, border: '1px solid rgba(0, 255, 255, 0.2)' }}>
//                       <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                         <div>
//                           <div style={{ fontSize: '1rem', fontWeight: 700, color: '#fff', marginBottom: 5 }}>
//                             Wallet Recharge
//                             {isRecent(rchg.date) && <span style={{ background: 'linear-gradient(135deg, #0ff, #f0f)', color: '#000', fontWeight: 800, padding: '3px 10px', borderRadius: 12, marginLeft: 10, fontSize: '0.75rem' }}>NEW</span>}
//                           </div>
//                           <div style={{ fontSize: '0.85rem', color: '#999' }}>{new Date(rchg.date).toLocaleDateString('en-IN')}</div>
//                         </div>
//                         <div>
//                           <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0ff' }}>₹{rchg.amount}</div>
//                           {rchg.bonus > 0 && <div style={{ fontSize: '0.8rem', color: '#0ff', textAlign: 'right' }}>+₹{rchg.bonus} bonus</div>}
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           </div>
//         )}

//         {activeTab === 'transactions' && (
//           <div className="card" style={{ background: 'rgba(0, 0, 0, 0.6)', backdropFilter: 'blur(15px)', borderRadius: 25, padding: 40, border: '1px solid rgba(255, 0, 255, 0.3)', maxWidth: 1200, margin: '0 auto' }}>
//             <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#f0f', marginBottom: 30 }}>🧾 All Transactions</h2>
//             {filteredTransactions.length === 0 ? (
//               <div style={{ textAlign: 'center', padding: '60px 20px', color: '#666' }}>
//                 <div style={{ fontSize: '4rem', marginBottom: 20 }}>📭</div>
//                 <p style={{ fontSize: '1.2rem' }}>No transactions found.</p>
//               </div>
//             ) : (
//               <div style={{ maxHeight: 600, overflowY: 'auto' }}>
//                 {filteredTransactions.map((txn, idx) => (
//                   <div key={idx} className="transaction-item" style={{ background: 'rgba(255, 0, 255, 0.08)', padding: '25px', borderRadius: 15, marginBottom: 15, border: '1px solid rgba(255, 0, 255, 0.2)' }}>
//                     <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 15 }}>
//                       <div>
//                         <div style={{ fontSize: '1.2rem', fontWeight: 700, color: '#fff', marginBottom: 8 }}>
//                           {txn.type?.toUpperCase() || "SESSION"}
//                           {isRecent(txn.date) && <span style={{ background: 'linear-gradient(135deg, #0ff, #f0f)', color: '#000', fontWeight: 800, padding: '4px 12px', borderRadius: 15, marginLeft: 10, fontSize: '0.8rem' }}>NEW</span>}
//                         </div>
//                         <div style={{ fontSize: '0.95rem', color: '#999' }}>{new Date(txn.date).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}</div>
//                       </div>
//                       <div style={{ fontSize: '2rem', fontWeight: 900, color: '#f0f' }}>₹{txn.amount}</div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         )}

//         {activeTab === 'recharges' && (
//           <div className="card" style={{ background: 'rgba(0, 0, 0, 0.6)', backdropFilter: 'blur(15px)', borderRadius: 25, padding: 40, border: '1px solid rgba(0, 255, 255, 0.3)', maxWidth: 1200, margin: '0 auto' }}>
//             <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#0ff', marginBottom: 30 }}>💳 All Recharges</h2>
//             {filteredRecharges.length === 0 ? (
//               <div style={{ textAlign: 'center', padding: '60px 20px', color: '#666' }}>
//                 <div style={{ fontSize: '4rem', marginBottom: 20 }}>💰</div>
//                 <p style={{ fontSize: '1.2rem' }}>No recharges found.</p>
//               </div>
//             ) : (
//               <div style={{ maxHeight: 600, overflowY: 'auto' }}>
//                 {filteredRecharges.map((rchg, idx) => (
//                   <div key={idx} className="transaction-item" style={{ background: 'rgba(0, 255, 255, 0.08)', padding: '25px', borderRadius: 15, marginBottom: 15, border: '1px solid rgba(0, 255, 255, 0.2)' }}>
//                     <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 15 }}>
//                       <div>
//                         <div style={{ fontSize: '1.2rem', fontWeight: 700, color: '#fff', marginBottom: 8 }}>
//                           Wallet Recharge
//                           {isRecent(rchg.date) && <span style={{ background: 'linear-gradient(135deg, #0ff, #f0f)', color: '#000', fontWeight: 800, padding: '4px 12px', borderRadius: 15, marginLeft: 10, fontSize: '0.8rem' }}>NEW</span>}
//                         </div>
//                         <div style={{ fontSize: '0.95rem', color: '#999' }}>{new Date(rchg.date).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}</div>
//                       </div>
//                       <div>
//                         <div style={{ fontSize: '2rem', fontWeight: 900, color: '#0ff' }}>₹{rchg.amount}</div>
//                         {rchg.bonus > 0 && <div style={{ fontSize: '1rem', color: '#0ff', textAlign: 'right', marginTop: 5 }}>+₹{rchg.bonus} bonus 🎁</div>}
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         )}

//         {/* Footer */}
//         <div style={{ textAlign: 'center', marginTop: 80, paddingTop: 40, borderTop: '1px solid rgba(0, 255, 255, 0.2)' }}>
//           <p style={{ color: '#666', fontSize: '0.9rem' }}>© {new Date().getFullYear()} HRS Studio. All rights reserved. | Designed with 💜 & 🎵</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CustomerDashboard;


import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase/firebaseConfig";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const CustomerDashboard = () => {
  const [user, setUser] = useState(null);
  const [walletBalance, setWalletBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [recharges, setRecharges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        const userEmail = currentUser.email;

        const q = query(collection(db, "users"), where("email", "==", userEmail));
        const unsubscribeSnapshot = onSnapshot(q, (querySnapshot) => {
          if (!querySnapshot.empty) {
            const docData = querySnapshot.docs[0].data();

            const sortedTransactions = (docData.transactionHistory || []).sort(
              (a, b) => new Date(b.date) - new Date(a.date)
            );

            const sortedRecharges = (docData.rechargeHistory || []).sort(
              (a, b) => new Date(b.date) - new Date(a.date)
            );

            setWalletBalance(docData.balance || 0);
            setTransactions(sortedTransactions);
            setRecharges(sortedRecharges);
            setLoading(false);
          } else {
            setWalletBalance(0);
            setTransactions([]);
            setRecharges([]);
            setLoading(false);
          }
        });

        return () => unsubscribeSnapshot();
      } else {
        setUser(null);
        navigate('/login');
      }
    });

    return () => unsubscribeAuth();
  }, [navigate]);

  const isRecent = (dateStr) => {
    const itemDate = new Date(dateStr);
    const now = new Date();
    const diffTime = Math.abs(now - itemDate);
    const diffDays = diffTime / (1000 * 60 * 60 * 24);
    return diffDays <= 2;
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  const totalSpent = transactions.reduce((sum, txn) => sum + (txn.amount || 0), 0);
  const totalRecharged = recharges.reduce((sum, rchg) => sum + (rchg.amount || 0) + (rchg.bonus || 0), 0);

  const filteredTransactions = transactions.filter(txn => 
    txn.type?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    txn.amount?.toString().includes(searchTerm)
  );

  const filteredRecharges = recharges.filter(rchg =>
    rchg.amount?.toString().includes(searchTerm)
  );

  if (loading) {
    return (
      <div style={{ 
        background: 'linear-gradient(-45deg, #000, #1a0033, #000033, #330033)', 
        backgroundSize: '400% 400%', 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        color: '#fff', 
        fontFamily: "'Poppins', sans-serif",
        padding: '20px'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '3rem', marginBottom: 20, animation: 'pulse 1.5s infinite' }}>🎵</div>
          <div style={{ 
            fontSize: '1.4rem', 
            background: 'linear-gradient(135deg, #0ff, #f0f)', 
            WebkitBackgroundClip: 'text', 
            WebkitTextFillColor: 'transparent', 
            fontWeight: 700 
          }}>
            Loading your dashboard...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ 
      fontFamily: "'Poppins', sans-serif", 
      background: 'linear-gradient(-45deg, #000, #1a0033, #000033, #330033)', 
      backgroundSize: '400% 400%', 
      minHeight: '100vh', 
      color: '#fff', 
      position: 'relative', 
      overflow: 'hidden' 
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700;900&display=swap');
        @keyframes gradientShift { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes pulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.1); } }
        @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
        @keyframes slideIn { from { transform: translateX(-20px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
        @keyframes slideDown { from { transform: translateY(-20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        
        .card { transition: all 0.3s ease; }
        .card:hover { transform: translateY(-5px); box-shadow: 0 15px 40px rgba(0, 255, 255, 0.3); }
        .transaction-item { transition: all 0.3s ease; }
        .transaction-item:hover { background: rgba(0, 255, 255, 0.15); transform: translateX(5px); }
        .tab-btn { transition: all 0.3s ease; cursor: pointer; }
        .tab-btn:hover { transform: translateY(-2px); }
        .stat-card { animation: slideIn 0.6s ease-out; }
        .logout-btn { transition: all 0.3s ease; }
        .logout-btn:hover { transform: scale(1.05); box-shadow: 0 10px 30px rgba(255, 0, 0, 0.4); }
        
        /* Mobile-specific styles */
        @media (max-width: 768px) {
          .dashboard-grid { 
            grid-template-columns: 1fr !important; 
            gap: 20px !important;
          }
          .stats-grid { 
            grid-template-columns: 1fr !important; 
            gap: 15px !important;
          }
          .logo { 
            width: 50px !important; 
            height: 50px !important; 
          }
          .welcome-title { 
            font-size: 1.8rem !important; 
            line-height: 1.3 !important;
          }
          .balance-amount { 
            font-size: 2rem !important; 
          }
          .stat-number { 
            font-size: 1.5rem !important; 
          }
          .tabs { 
            flex-direction: column !important; 
            gap: 10px !important; 
          }
          .tab-btn { 
            width: 100% !important; 
            padding: 12px 20px !important;
            font-size: 0.9rem !important;
          }
          .card {
            padding: 20px !important;
            margin: 0 10px !important;
          }
          .mobile-menu {
            animation: slideDown 0.3s ease-out;
          }
        }

        @media (max-width: 480px) {
          .welcome-title { 
            font-size: 1.5rem !important; 
          }
          .stat-card {
            padding: 20px 15px !important;
          }
          .transaction-item {
            padding: 15px !important;
          }
        }

        /* Touch device optimizations */
        @media (hover: none) {
          .card:hover { transform: none; }
          .transaction-item:hover { transform: none; }
          .tab-btn:hover { transform: none; }
          .logout-btn:hover { transform: none; }
        }

        /* Scrollbar styling */
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: rgba(0, 0, 0, 0.3); border-radius: 10px; }
        ::-webkit-scrollbar-thumb { background: linear-gradient(135deg, #0ff, #f0f); border-radius: 10px; }
        ::-webkit-scrollbar-thumb:hover { background: linear-gradient(135deg, #f0f, #0ff); }
      `}</style>

      {/* Animated Background */}
      <div style={{ 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        width: '100%', 
        height: '100%', 
        background: 'linear-gradient(-45deg, #000, #1a0033, #000033, #330033)', 
        backgroundSize: '400% 400%', 
        animation: 'gradientShift 15s ease infinite', 
        zIndex: 0 
      }} />

      {/* Particles */}
      <div style={{ 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        width: '100%', 
        height: '100%', 
        zIndex: 1, 
        pointerEvents: 'none' 
      }}>
        {Array.from({ length: 15 }, (_, i) => (
          <div key={i} style={{ 
            position: 'absolute', 
            width: 3, 
            height: 3, 
            background: 'rgba(0, 255, 255, 0.6)', 
            borderRadius: '50%', 
            top: `${Math.random() * 100}%`, 
            left: `${Math.random() * 100}%`, 
            animation: `float ${4 + Math.random() * 4}s infinite ease-in-out`, 
            animationDelay: `${Math.random() * 6}s` 
          }} />
        ))}
      </div>

      <div style={{ 
        maxWidth: 1600, 
        margin: '0 auto', 
        padding: '15px', 
        position: 'relative', 
        zIndex: 2 
      }}>
        {/* Mobile Header */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          marginBottom: 20, 
          background: 'rgba(0, 0, 0, 0.6)', 
          backdropFilter: 'blur(15px)', 
          padding: '15px 20px', 
          borderRadius: 20, 
          border: '1px solid rgba(0, 255, 255, 0.3)',
          flexWrap: 'wrap',
          gap: '10px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 15, flex: 1 }}>
            <img 
              src="/HRS LOGO.jpg" 
              alt="HRS Studio" 
              className="logo" 
              style={{ 
                width: 50, 
                height: 50, 
                borderRadius: '50%', 
                border: '2px solid rgba(0, 255, 255, 0.5)' 
              }} 
            />
            <div style={{ flex: 1, minWidth: 0 }}>
              <h2 style={{ 
                margin: 0, 
                fontSize: '1.2rem', 
                fontWeight: 800, 
                background: 'linear-gradient(135deg, #0ff, #f0f)', 
                WebkitBackgroundClip: 'text', 
                WebkitTextFillColor: 'transparent',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}>
                🎤 HRS Studio
              </h2>
              <p style={{ 
                margin: 0, 
                color: '#999', 
                fontSize: '0.8rem',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}>
                {user?.email}
              </p>
            </div>
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            style={{ 
              background: 'rgba(0, 255, 255, 0.1)', 
              border: '1px solid rgba(0, 255, 255, 0.3)', 
              color: '#fff', 
              padding: '10px', 
              borderRadius: 10, 
              cursor: 'pointer',
              fontSize: '1.2rem'
            }}
          >
            {isMenuOpen ? '✕' : '☰'}
          </button>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="mobile-menu" style={{
              position: 'absolute',
              top: '100%',
              right: 20,
              background: 'rgba(0, 0, 0, 0.9)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(0, 255, 255, 0.3)',
              borderRadius: 15,
              padding: '15px',
              zIndex: 1000,
              width: '200px',
              marginTop: '10px'
            }}>
              <button 
                className="logout-btn" 
                onClick={handleLogout} 
                style={{ 
                  background: 'linear-gradient(135deg, #ff0055, #ff4444)', 
                  color: '#fff', 
                  border: 'none', 
                  padding: '12px 20px', 
                  borderRadius: 25, 
                  fontWeight: 700, 
                  cursor: 'pointer', 
                  fontSize: '0.9rem',
                  width: '100%',
                  marginBottom: '10px'
                }}
              >
                🚪 Logout
              </button>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {['overview', 'transactions', 'recharges'].map(tab => (
                  <button 
                    key={tab}
                    onClick={() => {
                      setActiveTab(tab);
                      setIsMenuOpen(false);
                    }}
                    style={{
                      background: activeTab === tab ? 'linear-gradient(135deg, #0ff, #f0f)' : 'transparent',
                      color: activeTab === tab ? '#000' : '#fff',
                      border: '1px solid rgba(0, 255, 255, 0.3)',
                      padding: '10px 15px',
                      borderRadius: 20,
                      fontSize: '0.9rem',
                      cursor: 'pointer'
                    }}
                  >
                    {tab === 'overview' && '📊 '}
                    {tab === 'transactions' && '🧾 '}
                    {tab === 'recharges' && '💳 '}
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Welcome & Stats Section */}
        <div style={{ 
          textAlign: 'center', 
          marginBottom: 30, 
          animation: 'fadeInUp 0.8s ease-out',
          padding: '0 10px'
        }}>
          <h1 className="welcome-title" style={{ 
            fontSize: '2rem', 
            fontWeight: 900, 
            marginBottom: 10, 
            background: 'linear-gradient(135deg, #0ff, #f0f)', 
            WebkitBackgroundClip: 'text', 
            WebkitTextFillColor: 'transparent',
            lineHeight: '1.2'
          }}>
            Welcome Back, {user?.displayName || user?.email?.split('@')[0]}! 👋
          </h1>
          <p style={{ fontSize: '1rem', color: '#999', marginBottom: '20px' }}>
            Here's your music production journey overview
          </p>
        </div>

        {/* Quick Stats Grid */}
        <div className="stats-grid" style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', 
          gap: 15, 
          marginBottom: 30,
          padding: '0 10px'
        }}>
          <div className="stat-card card" style={{ 
            background: 'rgba(0, 0, 0, 0.6)', 
            backdropFilter: 'blur(15px)', 
            borderRadius: 20, 
            padding: 20, 
            border: '2px solid rgba(0, 255, 255, 0.4)', 
            textAlign: 'center' 
          }}>
            <div style={{ fontSize: '2rem', marginBottom: 10 }}>💰</div>
            <div className="stat-number" style={{ 
              fontSize: '1.5rem', 
              fontWeight: 900, 
              background: 'linear-gradient(135deg, #0ff, #f0f)', 
              WebkitBackgroundClip: 'text', 
              WebkitTextFillColor: 'transparent', 
              marginBottom: 5 
            }}>
              ₹{walletBalance.toLocaleString()}
            </div>
            <div style={{ color: '#999', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: 0.5 }}>
              Current Balance
            </div>
          </div>

          <div className="stat-card card" style={{ 
            background: 'rgba(0, 0, 0, 0.6)', 
            backdropFilter: 'blur(15px)', 
            borderRadius: 20, 
            padding: 20, 
            border: '2px solid rgba(255, 0, 255, 0.4)', 
            textAlign: 'center' 
          }}>
            <div style={{ fontSize: '2rem', marginBottom: 10 }}>📊</div>
            <div className="stat-number" style={{ 
              fontSize: '1.5rem', 
              fontWeight: 900, 
              color: '#f0f', 
              marginBottom: 5 
            }}>
              ₹{totalSpent.toLocaleString()}
            </div>
            <div style={{ color: '#999', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: 0.5 }}>
              Total Spent
            </div>
          </div>

          <div className="stat-card card" style={{ 
            background: 'rgba(0, 0, 0, 0.6)', 
            backdropFilter: 'blur(15px)', 
            borderRadius: 20, 
            padding: 20, 
            border: '2px solid rgba(0, 255, 255, 0.4)', 
            textAlign: 'center' 
          }}>
            <div style={{ fontSize: '2rem', marginBottom: 10 }}>💳</div>
            <div className="stat-number" style={{ 
              fontSize: '1.5rem', 
              fontWeight: 900, 
              color: '#0ff', 
              marginBottom: 5 
            }}>
              ₹{totalRecharged.toLocaleString()}
            </div>
            <div style={{ color: '#999', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: 0.5 }}>
              Total Recharged
            </div>
          </div>

          <div className="stat-card card" style={{ 
            background: 'rgba(0, 0, 0, 0.6)', 
            backdropFilter: 'blur(15px)', 
            borderRadius: 20, 
            padding: 20, 
            border: '2px solid rgba(255, 0, 255, 0.4)', 
            textAlign: 'center' 
          }}>
            <div style={{ fontSize: '2rem', marginBottom: 10 }}>🎵</div>
            <div className="stat-number" style={{ 
              fontSize: '1.5rem', 
              fontWeight: 900, 
              background: 'linear-gradient(135deg, #f0f, #0ff)', 
              WebkitBackgroundClip: 'text', 
              WebkitTextFillColor: 'transparent', 
              marginBottom: 5 
            }}>
              {transactions.length}
            </div>
            <div style={{ color: '#999', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: 0.5 }}>
              Total Sessions
            </div>
          </div>
        </div>

        {/* Tabs Navigation - Hidden on mobile when menu is available */}
        <div className="tabs" style={{ 
          display: isMenuOpen ? 'none' : 'flex', 
          gap: 10, 
          marginBottom: 30, 
          justifyContent: 'center', 
          flexWrap: 'wrap',
          padding: '0 10px'
        }}>
          {[
            { id: 'overview', label: 'Overview', icon: '📊' },
            { id: 'transactions', label: 'Transactions', icon: '🧾' },
            { id: 'recharges', label: 'Recharges', icon: '💳' }
          ].map(tab => (
            <button 
              key={tab.id} 
              className="tab-btn" 
              onClick={() => setActiveTab(tab.id)} 
              style={{ 
                background: activeTab === tab.id ? 'linear-gradient(135deg, #0ff, #f0f)' : 'rgba(0, 0, 0, 0.6)', 
                color: activeTab === tab.id ? '#000' : '#fff', 
                border: activeTab === tab.id ? 'none' : '2px solid rgba(0, 255, 255, 0.3)', 
                padding: '12px 20px', 
                borderRadius: 20, 
                fontWeight: 700, 
                fontSize: '0.9rem', 
                backdropFilter: 'blur(10px)',
                flex: 1,
                minWidth: '120px'
              }}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        {activeTab !== 'overview' && (
          <div style={{ 
            marginBottom: 25, 
            padding: '0 10px'
          }}>
            <input 
              type="text" 
              placeholder="🔍 Search by type or amount..." 
              value={searchTerm} 
              onChange={(e) => setSearchTerm(e.target.value)} 
              style={{ 
                width: '100%', 
                padding: '15px 20px', 
                background: 'rgba(0, 0, 0, 0.6)', 
                border: '2px solid rgba(0, 255, 255, 0.3)', 
                borderRadius: 20, 
                color: '#fff', 
                fontSize: '1rem', 
                outline: 'none', 
                backdropFilter: 'blur(10px)',
                boxSizing: 'border-box'
              }} 
            />
          </div>
        )}

        {/* Content Area */}
        {activeTab === 'overview' && (
          <div className="dashboard-grid" style={{ 
            display: 'grid', 
            gridTemplateColumns: '1fr', 
            gap: 20,
            padding: '0 10px'
          }}>
            {/* Recent Transactions */}
            <div className="card" style={{ 
              background: 'rgba(0, 0, 0, 0.6)', 
              backdropFilter: 'blur(15px)', 
              borderRadius: 20, 
              padding: 25, 
              border: '1px solid rgba(255, 0, 255, 0.3)', 
              animation: 'fadeInUp 1s ease-out' 
            }}>
              <h2 style={{ 
                fontSize: '1.4rem', 
                fontWeight: 800, 
                color: '#f0f', 
                marginBottom: 20, 
                display: 'flex', 
                alignItems: 'center', 
                gap: 10 
              }}>
                <span style={{ fontSize: '1.6rem' }}>🧾</span> Recent Transactions
              </h2>
              {transactions.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '30px 15px', color: '#666' }}>
                  <div style={{ fontSize: '2.5rem', marginBottom: 10 }}>📭</div>
                  <p>No transactions yet.</p>
                </div>
              ) : (
                <div style={{ maxHeight: 300, overflowY: 'auto', paddingRight: 5 }}>
                  {transactions.slice(0, 5).map((txn, idx) => (
                    <div key={idx} className="transaction-item" style={{ 
                      background: 'rgba(255, 0, 255, 0.08)', 
                      padding: '15px', 
                      borderRadius: 12, 
                      marginBottom: 10, 
                      border: '1px solid rgba(255, 0, 255, 0.2)' 
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ 
                            fontSize: '0.9rem', 
                            fontWeight: 700, 
                            color: '#fff', 
                            marginBottom: 5,
                            display: 'flex',
                            alignItems: 'center',
                            gap: '5px',
                            flexWrap: 'wrap'
                          }}>
                            <span style={{ 
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis'
                            }}>
                              {txn.type?.toUpperCase() || "SESSION"}
                            </span>
                            {isRecent(txn.date) && (
                              <span style={{ 
                                background: 'linear-gradient(135deg, #0ff, #f0f)', 
                                color: '#000', 
                                fontWeight: 800, 
                                padding: '2px 8px', 
                                borderRadius: 10, 
                                fontSize: '0.7rem',
                                flexShrink: 0
                              }}>
                                NEW
                              </span>
                            )}
                          </div>
                          <div style={{ fontSize: '0.8rem', color: '#999' }}>
                            {new Date(txn.date).toLocaleDateString('en-IN')}
                          </div>
                        </div>
                        <div style={{ 
                          fontSize: '1.1rem', 
                          fontWeight: 800, 
                          color: '#f0f',
                          marginLeft: '10px',
                          flexShrink: 0
                        }}>
                          ₹{txn.amount}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Recent Recharges */}
            <div className="card" style={{ 
              background: 'rgba(0, 0, 0, 0.6)', 
              backdropFilter: 'blur(15px)', 
              borderRadius: 20, 
              padding: 25, 
              border: '1px solid rgba(0, 255, 255, 0.3)', 
              animation: 'fadeInUp 1.2s ease-out' 
            }}>
              <h2 style={{ 
                fontSize: '1.4rem', 
                fontWeight: 800, 
                color: '#0ff', 
                marginBottom: 20, 
                display: 'flex', 
                alignItems: 'center', 
                gap: 10 
              }}>
                <span style={{ fontSize: '1.6rem' }}>💳</span> Recent Recharges
              </h2>
              {recharges.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '30px 15px', color: '#666' }}>
                  <div style={{ fontSize: '2.5rem', marginBottom: 10 }}>💰</div>
                  <p>No recharges yet.</p>
                </div>
              ) : (
                <div style={{ maxHeight: 300, overflowY: 'auto', paddingRight: 5 }}>
                  {recharges.slice(0, 5).map((rchg, idx) => (
                    <div key={idx} className="transaction-item" style={{ 
                      background: 'rgba(0, 255, 255, 0.08)', 
                      padding: '15px', 
                      borderRadius: 12, 
                      marginBottom: 10, 
                      border: '1px solid rgba(0, 255, 255, 0.2)' 
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ 
                            fontSize: '0.9rem', 
                            fontWeight: 700, 
                            color: '#fff', 
                            marginBottom: 5,
                            display: 'flex',
                            alignItems: 'center',
                            gap: '5px',
                            flexWrap: 'wrap'
                          }}>
                            <span>Wallet Recharge</span>
                            {isRecent(rchg.date) && (
                              <span style={{ 
                                background: 'linear-gradient(135deg, #0ff, #f0f)', 
                                color: '#000', 
                                fontWeight: 800, 
                                padding: '2px 8px', 
                                borderRadius: 10, 
                                fontSize: '0.7rem',
                                flexShrink: 0
                              }}>
                                NEW
                              </span>
                            )}
                          </div>
                          <div style={{ fontSize: '0.8rem', color: '#999' }}>
                            {new Date(rchg.date).toLocaleDateString('en-IN')}
                          </div>
                        </div>
                        <div style={{ textAlign: 'right', marginLeft: '10px', flexShrink: 0 }}>
                          <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0ff' }}>
                            ₹{rchg.amount}
                          </div>
                          {rchg.bonus > 0 && (
                            <div style={{ fontSize: '0.7rem', color: '#0ff', marginTop: 2 }}>
                              +₹{rchg.bonus} bonus
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'transactions' && (
          <div className="card" style={{ 
            background: 'rgba(0, 0, 0, 0.6)', 
            backdropFilter: 'blur(15px)', 
            borderRadius: 20, 
            padding: 25, 
            border: '1px solid rgba(255, 0, 255, 0.3)', 
            margin: '0 10px'
          }}>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#f0f', marginBottom: 25 }}>
              🧾 All Transactions
            </h2>
            {filteredTransactions.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px 15px', color: '#666' }}>
                <div style={{ fontSize: '3rem', marginBottom: 15 }}>📭</div>
                <p style={{ fontSize: '1.1rem' }}>No transactions found.</p>
              </div>
            ) : (
              <div style={{ maxHeight: 500, overflowY: 'auto' }}>
                {filteredTransactions.map((txn, idx) => (
                  <div key={idx} className="transaction-item" style={{ 
                    background: 'rgba(255, 0, 255, 0.08)', 
                    padding: '18px', 
                    borderRadius: 12, 
                    marginBottom: 12, 
                    border: '1px solid rgba(255, 0, 255, 0.2)' 
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 10 }}>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ 
                          fontSize: '1rem', 
                          fontWeight: 700, 
                          color: '#fff', 
                          marginBottom: 8,
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          flexWrap: 'wrap'
                        }}>
                          <span style={{
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis'
                          }}>
                            {txn.type?.toUpperCase() || "SESSION"}
                          </span>
                          {isRecent(txn.date) && (
                            <span style={{ 
                              background: 'linear-gradient(135deg, #0ff, #f0f)', 
                              color: '#000', 
                              fontWeight: 800, 
                              padding: '3px 10px', 
                              borderRadius: 12, 
                              fontSize: '0.75rem',
                              flexShrink: 0
                            }}>
                              NEW
                            </span>
                          )}
                        </div>
                        <div style={{ fontSize: '0.85rem', color: '#999' }}>
                          {new Date(txn.date).toLocaleString('en-IN', { 
                            dateStyle: 'medium', 
                            timeStyle: 'short' 
                          })}
                        </div>
                      </div>
                      <div style={{ 
                        fontSize: '1.5rem', 
                        fontWeight: 900, 
                        color: '#f0f',
                        flexShrink: 0
                      }}>
                        ₹{txn.amount}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'recharges' && (
          <div className="card" style={{ 
            background: 'rgba(0, 0, 0, 0.6)', 
            backdropFilter: 'blur(15px)', 
            borderRadius: 20, 
            padding: 25, 
            border: '1px solid rgba(0, 255, 255, 0.3)', 
            margin: '0 10px'
          }}>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0ff', marginBottom: 25 }}>
              💳 All Recharges
            </h2>
            {filteredRecharges.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px 15px', color: '#666' }}>
                <div style={{ fontSize: '3rem', marginBottom: 15 }}>💰</div>
                <p style={{ fontSize: '1.1rem' }}>No recharges found.</p>
              </div>
            ) : (
              <div style={{ maxHeight: 500, overflowY: 'auto' }}>
                {filteredRecharges.map((rchg, idx) => (
                  <div key={idx} className="transaction-item" style={{ 
                    background: 'rgba(0, 255, 255, 0.08)', 
                    padding: '18px', 
                    borderRadius: 12, 
                    marginBottom: 12, 
                    border: '1px solid rgba(0, 255, 255, 0.2)' 
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 10 }}>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ 
                          fontSize: '1rem', 
                          fontWeight: 700, 
                          color: '#fff', 
                          marginBottom: 8,
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          flexWrap: 'wrap'
                        }}>
                          <span>Wallet Recharge</span>
                          {isRecent(rchg.date) && (
                            <span style={{ 
                              background: 'linear-gradient(135deg, #0ff, #f0f)', 
                              color: '#000', 
                              fontWeight: 800, 
                              padding: '3px 10px', 
                              borderRadius: 12, 
                              fontSize: '0.75rem',
                              flexShrink: 0
                            }}>
                              NEW
                            </span>
                          )}
                        </div>
                        <div style={{ fontSize: '0.85rem', color: '#999' }}>
                          {new Date(rchg.date).toLocaleString('en-IN', { 
                            dateStyle: 'medium', 
                            timeStyle: 'short' 
                          })}
                        </div>
                      </div>
                      <div style={{ textAlign: 'right', flexShrink: 0 }}>
                        <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#0ff' }}>
                          ₹{rchg.amount}
                        </div>
                        {rchg.bonus > 0 && (
                          <div style={{ fontSize: '0.9rem', color: '#0ff', marginTop: 5 }}>
                            +₹{rchg.bonus} bonus 🎁
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Footer */}
        <div style={{ 
          textAlign: 'center', 
          marginTop: 50, 
          paddingTop: 30, 
          borderTop: '1px solid rgba(0, 255, 255, 0.2)',
          padding: '0 10px'
        }}>
          <p style={{ color: '#666', fontSize: '0.8rem', lineHeight: '1.4' }}>
            © {new Date().getFullYear()} HRS Studio. All rights reserved. | Designed with 💜 & 🎵
          </p>
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;