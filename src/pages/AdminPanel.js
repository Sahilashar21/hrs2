// import React, { useState } from "react";
// import { db } from "../firebase/firebaseConfig";
// import {
//   doc,
//   getDoc,
//   setDoc,
//   updateDoc,
//   arrayUnion,
//   collection,
//   getDocs,
// } from "firebase/firestore";
// import { Music, DollarSign, Coffee, Droplets, Users, LogIn, Eye, EyeOff, ChevronDown, ChevronUp, Edit2, Trash2, Check, X } from "lucide-react";
// import 'bootstrap/dist/css/bootstrap.min.css';

// const allowedAdmins = [
//   "hetuashar@gmail.com",
//   "sahilashar21@gmail.com",
//   "asharhiten@gmail.com",
// ];

// const ADMIN_PASSWORD = "04232129";

// function AdminPanel() {
//   const [adminEmail, setAdminEmail] = useState("");
//   const [adminPassword, setAdminPassword] = useState("");
//   const [authenticated, setAuthenticated] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);

//   const [email, setEmail] = useState("");
//   const [userData, setUserData] = useState(null);
//   const [rechargeAmount, setRechargeAmount] = useState("");
//   const [songCount, setSongCount] = useState(1);
//   const [teaQty, setTeaQty] = useState(1);
//   const [waterQty, setWaterQty] = useState(1);
//   const [coffeeQty, setCoffeeQty] = useState(1);
//   const [loading, setLoading] = useState(false);

//   const [isEditingBalance, setIsEditingBalance] = useState(false);
//   const [editedBalance, setEditedBalance] = useState(0);

//   const [allUsers, setAllUsers] = useState([]);
//   const [showAllUsers, setShowAllUsers] = useState(false);

//   const [expandedSections, setExpandedSections] = useState({
//     songs: true,
//     items: true,
//     transactions: true,
//     recharges: true
//   });

//   const authenticateAdmin = () => {
//     if (allowedAdmins.includes(adminEmail) && adminPassword === ADMIN_PASSWORD) {
//       setAuthenticated(true);
//     } else {
//       alert("Access Denied: Invalid email or password.");
//     }
//   };

//   const fetchUser = async () => {
//     if (!email) {
//       alert("Please enter an email address");
//       return;
//     }

//     setLoading(true);
//     try {
//       const userRef = doc(db, "users", email);
//       const userSnap = await getDoc(userRef);

//       if (userSnap.exists()) {
//         const data = userSnap.data();
//         const sortedTransactions = (data.transactionHistory || []).sort(
//           (a, b) => new Date(b.date) - new Date(a.date)
//         );
//         const sortedRecharges = (data.rechargeHistory || []).sort(
//           (a, b) => new Date(b.date) - new Date(a.date)
//         );
//         setUserData({ 
//           ...data, 
//           transactionHistory: sortedTransactions, 
//           rechargeHistory: sortedRecharges 
//         });
//       } else {
//         await setDoc(userRef, {
//           email,
//           balance: 0,
//           rechargeHistory: [],
//           transactionHistory: [],
//           createdAt: new Date().toISOString()
//         });
//         setUserData({ 
//           email, 
//           balance: 0, 
//           rechargeHistory: [], 
//           transactionHistory: [] 
//         });
//       }
//     } catch (error) {
//       console.error("Error fetching user:", error);
//       alert("Error fetching user data. Please try again.");
//     }
//     setLoading(false);
//   };

//   const rechargeWallet = async () => {
//     if (!rechargeAmount || rechargeAmount <= 0) {
//       alert("Please enter a valid recharge amount");
//       return;
//     }

//     if (!userData) {
//       alert("Please load a user first");
//       return;
//     }

//     try {
//       const bonus = Math.floor(rechargeAmount * 0.10);
//       const total = Number(rechargeAmount) + bonus;

//       const userRef = doc(db, "users", email);
//       await updateDoc(userRef, {
//         balance: userData.balance + total,
//         rechargeHistory: arrayUnion({
//           amount: Number(rechargeAmount),
//           bonus,
//           date: new Date().toISOString(),
//         }),
//       });

//       fetchUser();
//       setRechargeAmount("");
//     } catch (error) {
//       console.error("Error recharging wallet:", error);
//       alert("Error recharging wallet. Please try again.");
//     }
//   };

//   const deductFromWallet = async (type, amount) => {
//     if (!userData) {
//       alert("Please load a user first");
//       return;
//     }

//     if (userData.balance < amount) {
//       alert("Insufficient balance!");
//       return;
//     }

//     try {
//       const userRef = doc(db, "users", email);
//       await updateDoc(userRef, {
//         balance: userData.balance - amount,
//         transactionHistory: arrayUnion({
//           type,
//           amount,
//           date: new Date().toISOString(),
//         }),
//       });

//       fetchUser();
//     } catch (error) {
//       console.error("Error deducting from wallet:", error);
//       alert("Error processing transaction. Please try again.");
//     }
//   };

//   const updateTransaction = async (index, updatedTx) => {
//     try {
//       const newList = [...userData.transactionHistory];
//       newList[index] = updatedTx;
//       const userRef = doc(db, "users", email);
//       await updateDoc(userRef, {
//         transactionHistory: newList,
//       });
//       fetchUser();
//     } catch (error) {
//       console.error("Error updating transaction:", error);
//       alert("Error updating transaction. Please try again.");
//     }
//   };

//   const deleteTransaction = async (index) => {
//     try {
//       const newList = [...userData.transactionHistory];
//       newList.splice(index, 1);
//       const userRef = doc(db, "users", email);
//       await updateDoc(userRef, {
//         transactionHistory: newList,
//       });
//       fetchUser();
//     } catch (error) {
//       console.error("Error deleting transaction:", error);
//       alert("Error deleting transaction. Please try again.");
//     }
//   };

//   const updateRecharge = async (index, updatedRc) => {
//     try {
//       const newList = [...userData.rechargeHistory];
//       newList[index] = updatedRc;
//       const userRef = doc(db, "users", email);
//       await updateDoc(userRef, {
//         rechargeHistory: newList,
//       });
//       fetchUser();
//     } catch (error) {
//       console.error("Error updating recharge:", error);
//       alert("Error updating recharge. Please try again.");
//     }
//   };

//   const deleteRecharge = async (index) => {
//     try {
//       const newList = [...userData.rechargeHistory];
//       newList.splice(index, 1);
//       const userRef = doc(db, "users", email);
//       await updateDoc(userRef, {
//         rechargeHistory: newList,
//       });
//       fetchUser();
//     } catch (error) {
//       console.error("Error deleting recharge:", error);
//       alert("Error deleting recharge. Please try again.");
//     }
//   };

//   const fetchAllUsers = async () => {
//     try {
//       const usersCol = collection(db, "users");
//       const userSnapshot = await getDocs(usersCol);
//       const usersList = userSnapshot.docs.map((doc) => doc.data());
//       setAllUsers(usersList);
//       setShowAllUsers(true);
//     } catch (error) {
//       console.error("Error fetching all users:", error);
//       alert("Error fetching users list. Please try again.");
//     }
//   };

//   const isRecent = (dateStr) => {
//     const itemDate = new Date(dateStr);
//     const now = new Date();
//     const diffDays = (now - itemDate) / (1000 * 60 * 60 * 24);
//     return diffDays <= 2;
//   };

//   const toggleSection = (section) => {
//     setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
//   };

//   if (!authenticated) {
//     return (
//       <div className="min-vh-100 d-flex align-items-center justify-content-center bg-gradient" style={{background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'}}>
//         <div className="card shadow-lg" style={{maxWidth: '450px', width: '100%', borderRadius: '20px'}}>
//           <div className="card-body p-5">
//             <div className="text-center mb-4">
//               <div className="bg-primary bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{width: '80px', height: '80px'}}>
//                 <LogIn size={40} className="text-primary" />
//               </div>
//               <h2 className="fw-bold mb-2">Admin Access</h2>
//               <p className="text-muted">Enter your credentials to continue</p>
//             </div>

//             <div className="mb-3">
//               <label className="form-label fw-semibold">Admin Email</label>
//               <input
//                 type="email"
//                 className="form-control form-control-lg"
//                 placeholder="admin@example.com"
//                 value={adminEmail}
//                 onChange={(e) => setAdminEmail(e.target.value)}
//               />
//             </div>

//             <div className="mb-4">
//               <label className="form-label fw-semibold">Password</label>
//               <div className="input-group">
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   className="form-control form-control-lg"
//                   placeholder="Enter password"
//                   value={adminPassword}
//                   onChange={(e) => setAdminPassword(e.target.value)}
//                 />
//                 <button
//                   className="btn btn-outline-secondary"
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                 >
//                   {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
//                 </button>
//               </div>
//             </div>

//             <button
//               onClick={authenticateAdmin}
//               className="btn btn-primary btn-lg w-100 fw-semibold"
//               style={{background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', border: 'none'}}
//             >
//               Login as Admin
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-vh-100 bg-light py-4">
//       <div className="container">
//         <div className="card shadow-lg mb-4" style={{borderRadius: '15px', overflow: 'hidden'}}>
//           <div className="card-header text-white p-4" style={{background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'}}>
//             <h1 className="h3 fw-bold mb-2">HRS Studio Admin Panel</h1>
//             <p className="mb-0 opacity-75">Manage customers, transactions, and balances</p>
//           </div>

//           <div className="card-body p-4">
//             <div className="row g-3 mb-3">
//               <div className="col-md-6">
//                 <input
//                   className="form-control form-control-lg"
//                   placeholder="Enter customer email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value.toLowerCase().trim())}
//                 />
//               </div>
//               <div className="col-md-3">
//                 <button onClick={fetchUser} className="btn btn-primary btn-lg w-100">
//                   Load User
//                 </button>
//               </div>
//               <div className="col-md-3">
//                 <button onClick={fetchAllUsers} className="btn btn-info btn-lg w-100 text-white">
//                   <Users size={18} className="me-2" />
//                   View All
//                 </button>
//               </div>
//             </div>

//             {loading && (
//               <div className="text-center py-5">
//                 <div className="spinner-border text-primary" role="status" style={{width: '3rem', height: '3rem'}}>
//                   <span className="visually-hidden">Loading...</span>
//                 </div>
//                 <p className="mt-3 text-muted">Loading user data...</p>
//               </div>
//             )}
//           </div>
//         </div>

//         {showAllUsers && (
//           <div className="card shadow mb-4">
//             <div className="card-header bg-info text-white">
//               <h3 className="h5 mb-0">
//                 <Users size={20} className="me-2" />
//                 All Users
//               </h3>
//             </div>
//             <div className="card-body">
//               <div className="table-responsive">
//                 <table className="table table-hover">
//                   <thead className="table-light">
//                     <tr>
//                       <th>#</th>
//                       <th>Email</th>
//                       <th className="text-end">Balance</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {allUsers.map((user, idx) => (
//                       <tr key={idx}>
//                         <td>{idx + 1}</td>
//                         <td className="fw-semibold">{user.email}</td>
//                         <td className="text-end text-success fw-bold">₹{user.balance}</td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//               <button onClick={() => setShowAllUsers(false)} className="btn btn-secondary mt-3">
//                 Hide All Users
//               </button>
//             </div>
//           </div>
//         )}

//         {userData && !showAllUsers && (
//           <>
//             <div className="card shadow mb-4">
//               <div className="card-body p-4">
//                 <div className="d-flex align-items-center justify-content-between mb-4">
//                   <div>
//                     <p className="text-muted mb-2">Current Balance</p>
//                     {isEditingBalance ? (
//                       <div className="d-flex align-items-center gap-2">
//                         <input
//                           type="number"
//                           className="form-control"
//                           value={editedBalance}
//                           onChange={(e) => setEditedBalance(Number(e.target.value))}
//                           style={{width: '150px'}}
//                         />
//                         <button
//                           onClick={async () => {
//                             const userRef = doc(db, "users", email);
//                             await updateDoc(userRef, { balance: editedBalance });
//                             setIsEditingBalance(false);
//                             fetchUser();
//                           }}
//                           className="btn btn-success"
//                         >
//                           <Check size={18} />
//                         </button>
//                         <button onClick={() => setIsEditingBalance(false)} className="btn btn-danger">
//                           <X size={18} />
//                         </button>
//                       </div>
//                     ) : (
//                       <div className="d-flex align-items-center gap-3">
//                         <h2 className="display-4 fw-bold mb-0">₹{userData.balance}</h2>
//                         <button
//                           onClick={() => {
//                             setEditedBalance(userData.balance);
//                             setIsEditingBalance(true);
//                           }}
//                           className="btn btn-outline-primary"
//                         >
//                           <Edit2 size={18} />
//                         </button>
//                       </div>
//                     )}
//                   </div>
//                 </div>

//                 <div className="row">
//                   <div className="col-md-6">
//                     <div className="card bg-success bg-opacity-10 border-success">
//                       <div className="card-body">
//                         <h5 className="card-title">
//                           <DollarSign size={20} className="me-2 text-success" />
//                           Recharge Wallet
//                         </h5>
//                         <div className="input-group">
//                           <span className="input-group-text">₹</span>
//                           <input
//                             type="number"
//                             className="form-control"
//                             placeholder="100"
//                             value={rechargeAmount}
//                             onChange={(e) => setRechargeAmount(e.target.value)}
//                           />
//                           <button onClick={rechargeWallet} className="btn btn-success">
//                             Recharge
//                           </button>
//                         </div>
//                         {rechargeAmount && (
//                           <small className="text-success d-block mt-2">
//                             +10% bonus = ₹{Number(rechargeAmount) + Math.floor(rechargeAmount * 0.10)}
//                           </small>
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className="card shadow mb-4">
//               <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center" style={{cursor: 'pointer'}} onClick={() => toggleSection('songs')}>
//                 <h5 className="mb-0">
//                   <Music size={20} className="me-2" />
//                   Deduct for Songs
//                 </h5>
//                 {expandedSections.songs ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
//               </div>
//               {expandedSections.songs && (
//                 <div className="card-body">
//                   <div className="mb-3">
//                     <label className="form-label fw-semibold">Number of Songs</label>
//                     <input
//                       type="number"
//                       min="1"
//                       className="form-control"
//                       value={songCount}
//                       onChange={(e) => setSongCount(Number(e.target.value))}
//                     />
//                   </div>
//                   <div className="row g-3">
//                     <div className="col-md-6">
//                       <button
//                         onClick={() => deductFromWallet("song", 25 * songCount)}
//                         className="btn btn-primary w-100"
//                       >
//                         Song @ ₹25 × {songCount} = ₹{25 * songCount}
//                       </button>
//                     </div>
//                     <div className="col-md-6">
//                       <button
//                         onClick={() => deductFromWallet("song", 30 * songCount)}
//                         className="btn btn-info w-100 text-white"
//                       >
//                         Song @ ₹30 × {songCount} = ₹{30 * songCount}
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </div>

//             <div className="card shadow mb-4">
//               <div className="card-header bg-warning text-dark d-flex justify-content-between align-items-center" style={{cursor: 'pointer'}} onClick={() => toggleSection('items')}>
//                 <h5 className="mb-0">
//                   <Coffee size={20} className="me-2" />
//                   Deduct for Items
//                 </h5>
//                 {expandedSections.items ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
//               </div>
//               {expandedSections.items && (
//                 <div className="card-body">
//                   {[
//                     { label: "Tea", qty: teaQty, setQty: setTeaQty, price: 10, icon: "☕" },
//                     { label: "Water", qty: waterQty, setQty: setWaterQty, price: 10, icon: "💧" },
//                     { label: "Coffee", qty: coffeeQty, setQty: setCoffeeQty, price: 15, icon: "☕" }
//                   ].map((item) => (
//                     <div key={item.label} className="card bg-light mb-3">
//                       <div className="card-body">
//                         <div className="row align-items-center">
//                           <div className="col-auto">
//                             <span style={{fontSize: '2rem'}}>{item.icon}</span>
//                           </div>
//                           <div className="col">
//                             <label className="form-label fw-semibold mb-2">{item.label} Quantity</label>
//                             <div className="row g-2">
//                               <div className="col-auto">
//                                 <input
//                                   type="number"
//                                   min="1"
//                                   className="form-control"
//                                   value={item.qty}
//                                   onChange={(e) => item.setQty(Number(e.target.value))}
//                                   style={{width: '100px'}}
//                                 />
//                               </div>
//                               <div className="col">
//                                 <button
//                                   onClick={() => deductFromWallet(item.label.toLowerCase(), item.price * item.qty)}
//                                   className="btn btn-warning w-100"
//                                 >
//                                   {item.label} × {item.qty} = ₹{item.price * item.qty}
//                                 </button>
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>

//             <div className="card shadow mb-4">
//               <div className="card-header bg-danger text-white d-flex justify-content-between align-items-center" style={{cursor: 'pointer'}} onClick={() => toggleSection('transactions')}>
//                 <h5 className="mb-0">Transaction History</h5>
//                 {expandedSections.transactions ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
//               </div>
//               {expandedSections.transactions && (
//                 <div className="card-body">
//                   {userData.transactionHistory?.length > 0 ? (
//                     <div className="list-group">
//                       {userData.transactionHistory.map((tx, index) => (
//                         <div key={index} className="list-group-item">
//                           <div className="d-flex justify-content-between align-items-center">
//                             <div className="flex-grow-1">
//                               <small className="text-muted d-block">{new Date(tx.date).toLocaleString()}</small>
//                               <div className="fw-semibold mt-1">
//                                 {tx.type} <span className="text-danger">-₹{tx.amount}</span>
//                               </div>
//                               {isRecent(tx.date) && (
//                                 <span className="badge bg-info mt-1">NEW</span>
//                               )}
//                             </div>
//                             <div className="d-flex gap-2">
//                               <button
//                                 onClick={() => {
//                                   const newAmount = prompt("Edit amount", tx.amount);
//                                   if (newAmount !== null) {
//                                     updateTransaction(index, { ...tx, amount: Number(newAmount) });
//                                   }
//                                 }}
//                                 className="btn btn-sm btn-outline-primary"
//                               >
//                                 <Edit2 size={16} />
//                               </button>
//                               <button
//                                 onClick={() => deleteTransaction(index)}
//                                 className="btn btn-sm btn-outline-danger"
//                               >
//                                 <Trash2 size={16} />
//                               </button>
//                             </div>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   ) : (
//                     <p className="text-muted text-center py-4">No transactions yet.</p>
//                   )}
//                 </div>
//               )}
//             </div>

//             <div className="card shadow">
//               <div className="card-header bg-success text-white d-flex justify-content-between align-items-center" style={{cursor: 'pointer'}} onClick={() => toggleSection('recharges')}>
//                 <h5 className="mb-0">Recharge History</h5>
//                 {expandedSections.recharges ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
//               </div>
//               {expandedSections.recharges && (
//                 <div className="card-body">
//                   {userData.rechargeHistory?.length > 0 ? (
//                     <div className="list-group">
//                       {userData.rechargeHistory.map((rc, index) => (
//                         <div key={index} className="list-group-item">
//                           <div className="d-flex justify-content-between align-items-center">
//                             <div className="flex-grow-1">
//                               <small className="text-muted d-block">{new Date(rc.date).toLocaleString()}</small>
//                               <div className="fw-semibold mt-1">
//                                 <span className="text-success">+₹{rc.amount}</span>
//                                 <small className="text-muted"> + Bonus ₹{rc.bonus}</small>
//                               </div>
//                               {isRecent(rc.date) && (
//                                 <span className="badge bg-info mt-1">NEW</span>
//                               )}
//                             </div>
//                             <div className="d-flex gap-2">
//                               <button
//                                 onClick={() => {
//                                   const newAmount = prompt("Edit amount", rc.amount);
//                                   if (newAmount !== null) {
//                                     const newBonus = Math.floor(Number(newAmount) * 0.10);
//                                     updateRecharge(index, { ...rc, amount: Number(newAmount), bonus: newBonus });
//                                   }
//                                 }}
//                                 className="btn btn-sm btn-outline-primary"
//                               >
//                                 <Edit2 size={16} />
//                               </button>
//                               <button
//                                 onClick={() => deleteRecharge(index)}
//                                 className="btn btn-sm btn-outline-danger"
//                               >
//                                 <Trash2 size={16} />
//                               </button>
//                             </div>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   ) : (
//                     <p className="text-muted text-center py-4">No recharges yet.</p>
//                   )}
//                 </div>
//               )}
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }

// export default AdminPanel;





import React, { useState } from "react";
import { db } from "../firebase/firebaseConfig";
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  arrayUnion,
  collection,
  getDocs,
  deleteDoc,
} from "firebase/firestore";
import { Music, DollarSign, Coffee, Droplets, Users, LogIn, Eye, EyeOff, ChevronDown, ChevronUp, Edit2, Trash2, Check, X, UserX } from "lucide-react";
import 'bootstrap/dist/css/bootstrap.min.css';

const allowedAdmins = [
  "hetuashar@gmail.com",
  "sahilashar21@gmail.com",
  "asharhiten@gmail.com",
];

const ADMIN_PASSWORD = "04232129";

// Helper function to format date as DD/MM/YYYY
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  
  return `${day}/${month}/${year} ${hours}:${minutes}`;
};

function AdminPanel() {
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [userData, setUserData] = useState(null);
  const [rechargeAmount, setRechargeAmount] = useState("");
  const [songCount, setSongCount] = useState(1);
  const [teaQty, setTeaQty] = useState(1);
  const [waterQty, setWaterQty] = useState(1);
  const [coffeeQty, setCoffeeQty] = useState(1);
  const [loading, setLoading] = useState(false);

  const [isEditingBalance, setIsEditingBalance] = useState(false);
  const [editedBalance, setEditedBalance] = useState(0);

  const [allUsers, setAllUsers] = useState([]);
  const [showAllUsers, setShowAllUsers] = useState(false);
  const [deletingUser, setDeletingUser] = useState(null);

  const [expandedSections, setExpandedSections] = useState({
    songs: true,
    items: true,
    transactions: true,
    recharges: true
  });

  const authenticateAdmin = () => {
    if (allowedAdmins.includes(adminEmail) && adminPassword === ADMIN_PASSWORD) {
      setAuthenticated(true);
    } else {
      alert("Access Denied: Invalid email or password.");
    }
  };

  const fetchUser = async () => {
    if (!email) {
      alert("Please enter an email address");
      return;
    }

    setLoading(true);
    try {
      const userRef = doc(db, "users", email);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const data = userSnap.data();
        const sortedTransactions = (data.transactionHistory || []).sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );
        const sortedRecharges = (data.rechargeHistory || []).sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );
        setUserData({ 
          ...data, 
          transactionHistory: sortedTransactions, 
          rechargeHistory: sortedRecharges 
        });
      } else {
        await setDoc(userRef, {
          email,
          balance: 0,
          rechargeHistory: [],
          transactionHistory: [],
          createdAt: new Date().toISOString()
        });
        setUserData({ 
          email, 
          balance: 0, 
          rechargeHistory: [], 
          transactionHistory: [] 
        });
      }
    } catch (error) {
      console.error("Error fetching user:", error);
      alert("Error fetching user data. Please try again.");
    }
    setLoading(false);
  };

  const rechargeWallet = async () => {
    if (!rechargeAmount || rechargeAmount <= 0) {
      alert("Please enter a valid recharge amount");
      return;
    }

    if (!userData) {
      alert("Please load a user first");
      return;
    }

    try {
      const bonus = Math.floor(rechargeAmount * 0.10);
      const total = Number(rechargeAmount) + bonus;

      const userRef = doc(db, "users", email);
      await updateDoc(userRef, {
        balance: userData.balance + total,
        rechargeHistory: arrayUnion({
          amount: Number(rechargeAmount),
          bonus,
          date: new Date().toISOString(),
        }),
      });

      fetchUser();
      setRechargeAmount("");
    } catch (error) {
      console.error("Error recharging wallet:", error);
      alert("Error recharging wallet. Please try again.");
    }
  };

  const deductFromWallet = async (type, amount) => {
    if (!userData) {
      alert("Please load a user first");
      return;
    }

    if (userData.balance < amount) {
      alert("Insufficient balance!");
      return;
    }

    try {
      const userRef = doc(db, "users", email);
      await updateDoc(userRef, {
        balance: userData.balance - amount,
        transactionHistory: arrayUnion({
          type,
          amount,
          date: new Date().toISOString(),
        }),
      });

      fetchUser();
    } catch (error) {
      console.error("Error deducting from wallet:", error);
      alert("Error processing transaction. Please try again.");
    }
  };

  const updateTransaction = async (index, updatedTx) => {
    try {
      const newList = [...userData.transactionHistory];
      newList[index] = updatedTx;
      const userRef = doc(db, "users", email);
      await updateDoc(userRef, {
        transactionHistory: newList,
      });
      fetchUser();
    } catch (error) {
      console.error("Error updating transaction:", error);
      alert("Error updating transaction. Please try again.");
    }
  };

  const deleteTransaction = async (index) => {
    try {
      const newList = [...userData.transactionHistory];
      newList.splice(index, 1);
      const userRef = doc(db, "users", email);
      await updateDoc(userRef, {
        transactionHistory: newList,
      });
      fetchUser();
    } catch (error) {
      console.error("Error deleting transaction:", error);
      alert("Error deleting transaction. Please try again.");
    }
  };

  const updateRecharge = async (index, updatedRc) => {
    try {
      const newList = [...userData.rechargeHistory];
      newList[index] = updatedRc;
      const userRef = doc(db, "users", email);
      await updateDoc(userRef, {
        rechargeHistory: newList,
      });
      fetchUser();
    } catch (error) {
      console.error("Error updating recharge:", error);
      alert("Error updating recharge. Please try again.");
    }
  };

  const deleteRecharge = async (index) => {
    try {
      const newList = [...userData.rechargeHistory];
      newList.splice(index, 1);
      const userRef = doc(db, "users", email);
      await updateDoc(userRef, {
        rechargeHistory: newList,
      });
      fetchUser();
    } catch (error) {
      console.error("Error deleting recharge:", error);
      alert("Error deleting recharge. Please try again.");
    }
  };

  const fetchAllUsers = async () => {
    try {
      const usersCol = collection(db, "users");
      const userSnapshot = await getDocs(usersCol);
      const usersList = userSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      setAllUsers(usersList);
      setShowAllUsers(true);
    } catch (error) {
      console.error("Error fetching all users:", error);
      alert("Error fetching users list. Please try again.");
    }
  };

  const deleteUser = async (userId, userEmail) => {
    if (!window.confirm(`Are you sure you want to delete user: ${userEmail}? This action cannot be undone.`)) {
      return;
    }

    setDeletingUser(userId);
    try {
      const userRef = doc(db, "users", userId);
      await deleteDoc(userRef);
      
      // Refresh the users list
      await fetchAllUsers();
      
      // If the deleted user is currently loaded, clear the user data
      if (email === userId) {
        setUserData(null);
        setEmail("");
      }
      
      alert("User deleted successfully!");
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Error deleting user. Please try again.");
    } finally {
      setDeletingUser(null);
    }
  };

  const isRecent = (dateStr) => {
    const itemDate = new Date(dateStr);
    const now = new Date();
    const diffDays = (now - itemDate) / (1000 * 60 * 60 * 24);
    return diffDays <= 2;
  };

  const toggleSection = (section) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  if (!authenticated) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center bg-gradient" style={{background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'}}>
        <div className="card shadow-lg" style={{maxWidth: '450px', width: '100%', borderRadius: '20px'}}>
          <div className="card-body p-5">
            <div className="text-center mb-4">
              <div className="bg-primary bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{width: '80px', height: '80px'}}>
                <LogIn size={40} className="text-primary" />
              </div>
              <h2 className="fw-bold mb-2">Admin Access</h2>
              <p className="text-muted">Enter your credentials to continue</p>
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Admin Email</label>
              <input
                type="email"
                className="form-control form-control-lg"
                placeholder="admin@example.com"
                value={adminEmail}
                onChange={(e) => setAdminEmail(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="form-label fw-semibold">Password</label>
              <div className="input-group">
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control form-control-lg"
                  placeholder="Enter password"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                />
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <button
              onClick={authenticateAdmin}
              className="btn btn-primary btn-lg w-100 fw-semibold"
              style={{background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', border: 'none'}}
            >
              Login as Admin
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-vh-100 bg-light py-4">
      <div className="container">
        <div className="card shadow-lg mb-4" style={{borderRadius: '15px', overflow: 'hidden'}}>
          <div className="card-header text-white p-4" style={{background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'}}>
            <h1 className="h3 fw-bold mb-2">HRS Studio Admin Panel</h1>
            <p className="mb-0 opacity-75">Manage customers, transactions, and balances</p>
          </div>

          <div className="card-body p-4">
            <div className="row g-3 mb-3">
              <div className="col-md-6">
                <input
                  className="form-control form-control-lg"
                  placeholder="Enter customer email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value.toLowerCase().trim())}
                />
              </div>
              <div className="col-md-3">
                <button onClick={fetchUser} className="btn btn-primary btn-lg w-100">
                  Load User
                </button>
              </div>
              <div className="col-md-3">
                <button onClick={fetchAllUsers} className="btn btn-info btn-lg w-100 text-white">
                  <Users size={18} className="me-2" />
                  View All
                </button>
              </div>
            </div>

            {loading && (
              <div className="text-center py-5">
                <div className="spinner-border text-primary" role="status" style={{width: '3rem', height: '3rem'}}>
                  <span className="visually-hidden">Loading...</span>
                </div>
                <p className="mt-3 text-muted">Loading user data...</p>
              </div>
            )}
          </div>
        </div>

        {showAllUsers && (
          <div className="card shadow mb-4">
            <div className="card-header bg-info text-white d-flex justify-content-between align-items-center">
              <h3 className="h5 mb-0">
                <Users size={20} className="me-2" />
                All Users ({allUsers.length})
              </h3>
              <button onClick={() => setShowAllUsers(false)} className="btn btn-light btn-sm">
                Hide All Users
              </button>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead className="table-light">
                    <tr>
                      <th>#</th>
                      <th>Email</th>
                      <th className="text-end">Balance</th>
                      <th className="text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allUsers.map((user, idx) => (
                      <tr key={user.id}>
                        <td>{idx + 1}</td>
                        <td className="fw-semibold">{user.email}</td>
                        <td className="text-end text-success fw-bold">₹{user.balance || 0}</td>
                        <td className="text-center">
                          <button
                            onClick={() => deleteUser(user.id, user.email)}
                            disabled={deletingUser === user.id}
                            className="btn btn-danger btn-sm"
                            title="Delete User"
                          >
                            {deletingUser === user.id ? (
                              <div className="spinner-border spinner-border-sm" role="status">
                                <span className="visually-hidden">Deleting...</span>
                              </div>
                            ) : (
                              <UserX size={16} />
                            )}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {allUsers.length === 0 && (
                <p className="text-muted text-center py-4">No users found.</p>
              )}
            </div>
          </div>
        )}

        {userData && !showAllUsers && (
          <>
            <div className="card shadow mb-4">
              <div className="card-body p-4">
                <div className="d-flex align-items-center justify-content-between mb-4">
                  <div>
                    <p className="text-muted mb-2">Current Balance</p>
                    {isEditingBalance ? (
                      <div className="d-flex align-items-center gap-2">
                        <input
                          type="number"
                          className="form-control"
                          value={editedBalance}
                          onChange={(e) => setEditedBalance(Number(e.target.value))}
                          style={{width: '150px'}}
                        />
                        <button
                          onClick={async () => {
                            const userRef = doc(db, "users", email);
                            await updateDoc(userRef, { balance: editedBalance });
                            setIsEditingBalance(false);
                            fetchUser();
                          }}
                          className="btn btn-success"
                        >
                          <Check size={18} />
                        </button>
                        <button onClick={() => setIsEditingBalance(false)} className="btn btn-danger">
                          <X size={18} />
                        </button>
                      </div>
                    ) : (
                      <div className="d-flex align-items-center gap-3">
                        <h2 className="display-4 fw-bold mb-0">₹{userData.balance}</h2>
                        <button
                          onClick={() => {
                            setEditedBalance(userData.balance);
                            setIsEditingBalance(true);
                          }}
                          className="btn btn-outline-primary"
                        >
                          <Edit2 size={18} />
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <div className="card bg-success bg-opacity-10 border-success">
                      <div className="card-body">
                        <h5 className="card-title">
                          <DollarSign size={20} className="me-2 text-success" />
                          Recharge Wallet
                        </h5>
                        <div className="input-group">
                          <span className="input-group-text">₹</span>
                          <input
                            type="number"
                            className="form-control"
                            placeholder="100"
                            value={rechargeAmount}
                            onChange={(e) => setRechargeAmount(e.target.value)}
                          />
                          <button onClick={rechargeWallet} className="btn btn-success">
                            Recharge
                          </button>
                        </div>
                        {rechargeAmount && (
                          <small className="text-success d-block mt-2">
                            +10% bonus = ₹{Number(rechargeAmount) + Math.floor(rechargeAmount * 0.10)}
                          </small>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="card shadow mb-4">
              <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center" style={{cursor: 'pointer'}} onClick={() => toggleSection('songs')}>
                <h5 className="mb-0">
                  <Music size={20} className="me-2" />
                  Deduct for Songs
                </h5>
                {expandedSections.songs ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </div>
              {expandedSections.songs && (
                <div className="card-body">
                  <div className="mb-3">
                    <label className="form-label fw-semibold">Number of Songs</label>
                    <input
                      type="number"
                      min="1"
                      className="form-control"
                      value={songCount}
                      onChange={(e) => setSongCount(Number(e.target.value))}
                    />
                  </div>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <button
                        onClick={() => deductFromWallet("song", 25 * songCount)}
                        className="btn btn-primary w-100"
                      >
                        Song @ ₹25 × {songCount} = ₹{25 * songCount}
                      </button>
                    </div>
                    <div className="col-md-6">
                      <button
                        onClick={() => deductFromWallet("song", 30 * songCount)}
                        className="btn btn-info w-100 text-white"
                      >
                        Song @ ₹30 × {songCount} = ₹{30 * songCount}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="card shadow mb-4">
              <div className="card-header bg-warning text-dark d-flex justify-content-between align-items-center" style={{cursor: 'pointer'}} onClick={() => toggleSection('items')}>
                <h5 className="mb-0">
                  <Coffee size={20} className="me-2" />
                  Deduct for Items
                </h5>
                {expandedSections.items ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </div>
              {expandedSections.items && (
                <div className="card-body">
                  {[
                    { label: "Tea", qty: teaQty, setQty: setTeaQty, price: 10, icon: "☕" },
                    { label: "Water", qty: waterQty, setQty: setWaterQty, price: 10, icon: "💧" },
                    { label: "Coffee", qty: coffeeQty, setQty: setCoffeeQty, price: 15, icon: "☕" }
                  ].map((item) => (
                    <div key={item.label} className="card bg-light mb-3">
                      <div className="card-body">
                        <div className="row align-items-center">
                          <div className="col-auto">
                            <span style={{fontSize: '2rem'}}>{item.icon}</span>
                          </div>
                          <div className="col">
                            <label className="form-label fw-semibold mb-2">{item.label} Quantity</label>
                            <div className="row g-2">
                              <div className="col-auto">
                                <input
                                  type="number"
                                  min="1"
                                  className="form-control"
                                  value={item.qty}
                                  onChange={(e) => item.setQty(Number(e.target.value))}
                                  style={{width: '100px'}}
                                />
                              </div>
                              <div className="col">
                                <button
                                  onClick={() => deductFromWallet(item.label.toLowerCase(), item.price * item.qty)}
                                  className="btn btn-warning w-100"
                                >
                                  {item.label} × {item.qty} = ₹{item.price * item.qty}
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="card shadow mb-4">
              <div className="card-header bg-danger text-white d-flex justify-content-between align-items-center" style={{cursor: 'pointer'}} onClick={() => toggleSection('transactions')}>
                <h5 className="mb-0">Transaction History</h5>
                {expandedSections.transactions ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </div>
              {expandedSections.transactions && (
                <div className="card-body">
                  {userData.transactionHistory?.length > 0 ? (
                    <div className="list-group">
                      {userData.transactionHistory.map((tx, index) => (
                        <div key={index} className="list-group-item">
                          <div className="d-flex justify-content-between align-items-center">
                            <div className="flex-grow-1">
                              <small className="text-muted d-block">{formatDate(tx.date)}</small>
                              <div className="fw-semibold mt-1">
                                {tx.type} <span className="text-danger">-₹{tx.amount}</span>
                              </div>
                              {isRecent(tx.date) && (
                                <span className="badge bg-info mt-1">NEW</span>
                              )}
                            </div>
                            <div className="d-flex gap-2">
                              <button
                                onClick={() => {
                                  const newAmount = prompt("Edit amount", tx.amount);
                                  if (newAmount !== null) {
                                    updateTransaction(index, { ...tx, amount: Number(newAmount) });
                                  }
                                }}
                                className="btn btn-sm btn-outline-primary"
                              >
                                <Edit2 size={16} />
                              </button>
                              <button
                                onClick={() => deleteTransaction(index)}
                                className="btn btn-sm btn-outline-danger"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted text-center py-4">No transactions yet.</p>
                  )}
                </div>
              )}
            </div>

            <div className="card shadow">
              <div className="card-header bg-success text-white d-flex justify-content-between align-items-center" style={{cursor: 'pointer'}} onClick={() => toggleSection('recharges')}>
                <h5 className="mb-0">Recharge History</h5>
                {expandedSections.recharges ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </div>
              {expandedSections.recharges && (
                <div className="card-body">
                  {userData.rechargeHistory?.length > 0 ? (
                    <div className="list-group">
                      {userData.rechargeHistory.map((rc, index) => (
                        <div key={index} className="list-group-item">
                          <div className="d-flex justify-content-between align-items-center">
                            <div className="flex-grow-1">
                              <small className="text-muted d-block">{formatDate(rc.date)}</small>
                              <div className="fw-semibold mt-1">
                                <span className="text-success">+₹{rc.amount}</span>
                                <small className="text-muted"> + Bonus ₹{rc.bonus}</small>
                              </div>
                              {isRecent(rc.date) && (
                                <span className="badge bg-info mt-1">NEW</span>
                              )}
                            </div>
                            <div className="d-flex gap-2">
                              <button
                                onClick={() => {
                                  const newAmount = prompt("Edit amount", rc.amount);
                                  if (newAmount !== null) {
                                    const newBonus = Math.floor(Number(newAmount) * 0.10);
                                    updateRecharge(index, { ...rc, amount: Number(newAmount), bonus: newBonus });
                                  }
                                }}
                                className="btn btn-sm btn-outline-primary"
                              >
                                <Edit2 size={16} />
                              </button>
                              <button
                                onClick={() => deleteRecharge(index)}
                                className="btn btn-sm btn-outline-danger"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted text-center py-4">No recharges yet.</p>
                  )}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default AdminPanel;