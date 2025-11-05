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




//currently in use
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
//   deleteDoc,
// } from "firebase/firestore";
// import { Music, DollarSign, Coffee, Droplets, Users, LogIn, Eye, EyeOff, ChevronDown, ChevronUp, Edit2, Trash2, Check, X, UserX } from "lucide-react";
// import 'bootstrap/dist/css/bootstrap.min.css';

// const allowedAdmins = [
//   "hetuashar@gmail.com",
//   "sahilashar21@gmail.com",
//   "asharhiten@gmail.com",
// ];

// const ADMIN_PASSWORD = "04232129";

// // Helper function to format date as DD/MM/YYYY
// const formatDate = (dateString) => {
//   const date = new Date(dateString);
//   const day = String(date.getDate()).padStart(2, '0');
//   const month = String(date.getMonth() + 1).padStart(2, '0');
//   const year = date.getFullYear();
//   const hours = String(date.getHours()).padStart(2, '0');
//   const minutes = String(date.getMinutes()).padStart(2, '0');
  
//   return `${day}/${month}/${year} ${hours}:${minutes}`;
// };

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
//   const [deletingUser, setDeletingUser] = useState(null);

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
//       const usersList = userSnapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data()
//       }));
//       setAllUsers(usersList);
//       setShowAllUsers(true);
//     } catch (error) {
//       console.error("Error fetching all users:", error);
//       alert("Error fetching users list. Please try again.");
//     }
//   };

//   const deleteUser = async (userId, userEmail) => {
//     if (!window.confirm(`Are you sure you want to delete user: ${userEmail}? This action cannot be undone.`)) {
//       return;
//     }

//     setDeletingUser(userId);
//     try {
//       const userRef = doc(db, "users", userId);
//       await deleteDoc(userRef);
      
//       // Refresh the users list
//       await fetchAllUsers();
      
//       // If the deleted user is currently loaded, clear the user data
//       if (email === userId) {
//         setUserData(null);
//         setEmail("");
//       }
      
//       alert("User deleted successfully!");
//     } catch (error) {
//       console.error("Error deleting user:", error);
//       alert("Error deleting user. Please try again.");
//     } finally {
//       setDeletingUser(null);
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
//             <div className="card-header bg-info text-white d-flex justify-content-between align-items-center">
//               <h3 className="h5 mb-0">
//                 <Users size={20} className="me-2" />
//                 All Users ({allUsers.length})
//               </h3>
//               <button onClick={() => setShowAllUsers(false)} className="btn btn-light btn-sm">
//                 Hide All Users
//               </button>
//             </div>
//             <div className="card-body">
//               <div className="table-responsive">
//                 <table className="table table-hover">
//                   <thead className="table-light">
//                     <tr>
//                       <th>#</th>
//                       <th>Email</th>
//                       <th className="text-end">Balance</th>
//                       <th className="text-center">Actions</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {allUsers.map((user, idx) => (
//                       <tr key={user.id}>
//                         <td>{idx + 1}</td>
//                         <td className="fw-semibold">{user.email}</td>
//                         <td className="text-end text-success fw-bold">₹{user.balance || 0}</td>
//                         <td className="text-center">
//                           <button
//                             onClick={() => deleteUser(user.id, user.email)}
//                             disabled={deletingUser === user.id}
//                             className="btn btn-danger btn-sm"
//                             title="Delete User"
//                           >
//                             {deletingUser === user.id ? (
//                               <div className="spinner-border spinner-border-sm" role="status">
//                                 <span className="visually-hidden">Deleting...</span>
//                               </div>
//                             ) : (
//                               <UserX size={16} />
//                             )}
//                           </button>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//               {allUsers.length === 0 && (
//                 <p className="text-muted text-center py-4">No users found.</p>
//               )}
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
//                               <small className="text-muted d-block">{formatDate(tx.date)}</small>
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
//                               <small className="text-muted d-block">{formatDate(rc.date)}</small>
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




// import React, { useState, useEffect, useRef } from "react";
// import { db } from "../firebase/firebaseConfig";
// import {
//   doc,
//   getDoc,
//   setDoc,
//   updateDoc,
//   arrayUnion,
//   collection,
//   getDocs,
//   deleteDoc,
// } from "firebase/firestore";
// import {
//   Music,
//   DollarSign,
//   Coffee,
//   Droplets,
//   Users,
//   LogIn,
//   Eye,
//   EyeOff,
//   ChevronDown,
//   ChevronUp,
//   Edit2,
//   Trash2,
//   Check,
//   X,
//   UserX,
// } from "lucide-react";
// import "bootstrap/dist/css/bootstrap.min.css";

// // Charts & export libs
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
//   PieChart,
//   Pie,
//   Cell,
//   LineChart,
//   Line,
//   CartesianGrid,
//   Legend,
// } from "recharts";
// import jsPDF from "jspdf";
// import html2canvas from "html2canvas";

// const allowedAdmins = [
//   "hetuashar@gmail.com",
//   "sahilashar21@gmail.com",
//   "asharhiten@gmail.com",
// ];

// const ADMIN_PASSWORD = "04232129";

// // Helper function to format date as DD/MM/YYYY
// const formatDate = (dateString) => {
//   const date = new Date(dateString);
//   const day = String(date.getDate()).padStart(2, "0");
//   const month = String(date.getMonth() + 1).padStart(2, "0");
//   const year = date.getFullYear();
//   const hours = String(date.getHours()).padStart(2, "0");
//   const minutes = String(date.getMinutes()).padStart(2, "0");

//   return `${day}/${month}/${year} ${hours}:${minutes}`;
// };

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
//   const [deletingUser, setDeletingUser] = useState(null);

//   const [expandedSections, setExpandedSections] = useState({
//     songs: true,
//     items: true,
//     transactions: true,
//     recharges: true,
//   });

//   // Dashboard states
//   const [activeTab, setActiveTab] = useState("users"); // "dashboard" or "users"
//   const [stats, setStats] = useState({
//     totalRevenue: 0,
//     totalBonus: 0,
//     totalUsers: 0,
//     totalRecharges: 0,
//     avgRecharge: 0,
//     totalSongs: 0,
//     drinks: { tea: 0, coffee: 0, water: 0 },
//     topUsers: [],
//     monthlyRevenue: [], // array for chart
//     monthlyNewUsers: [], // array for chart
//     itemDistribution: [], // pie chart
//   });

//   const dashboardRef = useRef(null);

//   const authenticateAdmin = () => {
//     if (allowedAdmins.includes(adminEmail) && adminPassword === ADMIN_PASSWORD) {
//       setAuthenticated(true);
//       // load users automatically when admin logs in
//       fetchAllUsers();
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
//           rechargeHistory: sortedRecharges,
//         });
//       } else {
//         await setDoc(userRef, {
//           email,
//           balance: 0,
//           rechargeHistory: [],
//           transactionHistory: [],
//           createdAt: new Date().toISOString(),
//         });
//         setUserData({
//           email,
//           balance: 0,
//           rechargeHistory: [],
//           transactionHistory: [],
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
//       const bonus = Math.floor(rechargeAmount * 0.1);
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
//       const usersList = userSnapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       }));
//       setAllUsers(usersList);
//       setShowAllUsers(true);
//     } catch (error) {
//       console.error("Error fetching all users:", error);
//       alert("Error fetching users list. Please try again.");
//     }
//   };

//   const deleteUser = async (userId, userEmail) => {
//     if (!window.confirm(`Are you sure you want to delete user: ${userEmail}? This action cannot be undone.`)) {
//       return;
//     }

//     setDeletingUser(userId);
//     try {
//       const userRef = doc(db, "users", userId);
//       await deleteDoc(userRef);

//       // Refresh the users list
//       await fetchAllUsers();

//       // If the deleted user is currently loaded, clear the user data
//       if (email === userId) {
//         setUserData(null);
//         setEmail("");
//       }

//       alert("User deleted successfully!");
//     } catch (error) {
//       console.error("Error deleting user:", error);
//       alert("Error deleting user. Please try again.");
//     } finally {
//       setDeletingUser(null);
//     }
//   };

//   const isRecent = (dateStr) => {
//     const itemDate = new Date(dateStr);
//     const now = new Date();
//     const diffDays = (now - itemDate) / (1000 * 60 * 60 * 24);
//     return diffDays <= 2;
//   };

//   const toggleSection = (section) => {
//     setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));
//   };

//   // --- Dashboard Data Processing ---
//   useEffect(() => {
//     if (!allUsers || allUsers.length === 0) {
//       // nothing to compute
//       setStats({
//         totalRevenue: 0,
//         totalBonus: 0,
//         totalUsers: 0,
//         totalRecharges: 0,
//         avgRecharge: 0,
//         totalSongs: 0,
//         drinks: { tea: 0, coffee: 0, water: 0 },
//         topUsers: [],
//         monthlyRevenue: [],
//         monthlyNewUsers: [],
//         itemDistribution: [],
//       });
//       return;
//     }

//     // helpers
//     const parseDate = (d) => (d ? new Date(d) : null);

//     // initialize accumulators
//     let totalRevenue = 0;
//     let totalBonus = 0;
//     let totalRecharges = 0;
//     let totalSongs = 0;
//     const drinks = { tea: 0, coffee: 0, water: 0 };
//     const userTotals = {}; // { email: { revenue, songs } }

//     // monthly revenue map for last 12 months
//     const monthlyRevenueMap = {}; // key = YYYY-MM
//     const monthlyNewUsersMap = {};

//     const now = new Date();
//     // prepare last 12 months keys (YYYY-MM)
//     for (let i = 11; i >= 0; i--) {
//       const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
//       const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
//       monthlyRevenueMap[key] = 0;
//       monthlyNewUsersMap[key] = 0;
//     }

//     for (const user of allUsers) {
//       const userEmailKey = user.email || user.id || "unknown";
//       if (!userTotals[userEmailKey]) userTotals[userEmailKey] = { revenue: 0, songs: 0 };

//       // count new user by createdAt if present
//       if (user.createdAt) {
//         const cd = parseDate(user.createdAt);
//         if (cd) {
//           const key = `${cd.getFullYear()}-${String(cd.getMonth() + 1).padStart(2, "0")}`;
//           if (key in monthlyNewUsersMap) monthlyNewUsersMap[key] += 1;
//         }
//       }

//       // recharges
//       const recharges = user.rechargeHistory || [];
//       for (const rc of recharges) {
//         const amt = Number(rc.amount || 0);
//         const bonus = Number(rc.bonus || 0);
//         totalRevenue += amt;
//         totalBonus += bonus;
//         totalRecharges += 1;
//         userTotals[userEmailKey].revenue += amt + bonus;

//         // monthly revenue by rc.date
//         const rd = parseDate(rc.date);
//         if (rd) {
//           const key = `${rd.getFullYear()}-${String(rd.getMonth() + 1).padStart(2, "0")}`;
//           if (key in monthlyRevenueMap) monthlyRevenueMap[key] += amt + bonus;
//         }
//       }

//       // transactions
//       const txs = user.transactionHistory || [];
//       for (const tx of txs) {
//         const ttype = (tx.type || "").toString().toLowerCase();
//         const amt = Number(tx.amount || 0);
//         if (ttype.includes("song")) {
//           totalSongs += 1;
//           userTotals[userEmailKey].songs += 1;
//         } else if (ttype.includes("tea")) {
//           drinks.tea += 1;
//         } else if (ttype.includes("coffee")) {
//           drinks.coffee += 1;
//         } else if (ttype.includes("water") || ttype.includes("mineral")) {
//           drinks.water += 1;
//         }
//       }
//     }

//     const totalUsers = allUsers.length;
//     const avgRecharge = totalRecharges > 0 ? (totalRevenue / totalRecharges).toFixed(2) : 0;

//     // top users by revenue (descending)
//     const topUsersArr = Object.entries(userTotals)
//       .map(([emailKey, v]) => ({ email: emailKey, revenue: v.revenue, songs: v.songs }))
//       .sort((a, b) => b.revenue - a.revenue)
//       .slice(0, 5);

//     // prepare monthlyRevenue array for chart (sorted by month)
//     const monthlyRevenue = Object.keys(monthlyRevenueMap).map((k) => ({
//       month: k,
//       revenue: monthlyRevenueMap[k],
//     }));

//     const monthlyNewUsers = Object.keys(monthlyNewUsersMap).map((k) => ({
//       month: k,
//       newUsers: monthlyNewUsersMap[k],
//     }));

//     const itemDistribution = [
//       { name: "Songs", value: totalSongs },
//       { name: "Tea", value: drinks.tea },
//       { name: "Coffee", value: drinks.coffee },
//       { name: "Water", value: drinks.water },
//     ];

//     setStats({
//       totalRevenue,
//       totalBonus,
//       totalUsers,
//       totalRecharges,
//       avgRecharge,
//       totalSongs,
//       drinks,
//       topUsers: topUsersArr,
//       monthlyRevenue,
//       monthlyNewUsers,
//       itemDistribution,
//     });
//   }, [allUsers]);

//   // Load all users on mount if authenticated
//   useEffect(() => {
//     if (authenticated) {
//       fetchAllUsers();
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [authenticated]);

//   // PDF export
//   const downloadPdfReport = async () => {
//     if (!dashboardRef.current) {
//       alert("Dashboard not ready");
//       return;
//     }
//     try {
//       const element = dashboardRef.current;
//       const canvas = await html2canvas(element, { scale: 2 });
//       const imgData = canvas.toDataURL("image/png");
//       const pdf = new jsPDF("p", "mm", "a4");
//       const pdfWidth = pdf.internal.pageSize.getWidth();
//       const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
//       pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
//       pdf.save(`HRS_Studio_Report_${new Date().toISOString().slice(0, 10)}.pdf`);
//     } catch (err) {
//       console.error("PDF export failed:", err);
//       alert("Failed to export PDF. Try again.");
//     }
//   };

//   // Small helper to render dashboard section
//   const renderDashboard = () => {
//     const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

//     return (
//       <div className="card shadow mb-4">
//         <div className="card-header bg-secondary text-white d-flex justify-content-between align-items-center">
//           <h5 className="mb-0">📊 Dashboard</h5>
//           <div>
//             <button onClick={downloadPdfReport} className="btn btn-outline-light btn-sm me-2">
//               📄 Download PDF Report
//             </button>
//             <button onClick={() => fetchAllUsers()} className="btn btn-light btn-sm">
//               🔄 Refresh Data
//             </button>
//           </div>
//         </div>
//         <div className="card-body" ref={dashboardRef} id="dashboardReport">
//           <div className="row g-3 mb-4">
//             <div className="col-md-3">
//               <div className="card p-3">
//                 <div className="fw-semibold text-muted">Total Revenue</div>
//                 <div className="h4 fw-bold">₹{stats.totalRevenue || 0}</div>
//                 <small className="text-muted">Bonus: ₹{stats.totalBonus || 0}</small>
//               </div>
//             </div>
//             <div className="col-md-3">
//               <div className="card p-3">
//                 <div className="fw-semibold text-muted">Total Users</div>
//                 <div className="h4 fw-bold">{stats.totalUsers || 0}</div>
//                 <small className="text-muted">Recharges: {stats.totalRecharges || 0}</small>
//               </div>
//             </div>
//             <div className="col-md-3">
//               <div className="card p-3">
//                 <div className="fw-semibold text-muted">Total Songs</div>
//                 <div className="h4 fw-bold">{stats.totalSongs || 0}</div>
//                 <small className="text-muted">Drinks sold: {stats.drinks.tea + stats.drinks.coffee + stats.drinks.water}</small>
//               </div>
//             </div>
//             <div className="col-md-3">
//               <div className="card p-3">
//                 <div className="fw-semibold text-muted">Avg Recharge</div>
//                 <div className="h4 fw-bold">₹{stats.avgRecharge || 0}</div>
//                 <small className="text-muted">Avg per recharge</small>
//               </div>
//             </div>
//           </div>

//           <div className="row g-3">
//             <div className="col-md-8">
//               <div style={{ height: 300 }}>
//                 <ResponsiveContainer width="100%" height="100%">
//                   <BarChart data={stats.monthlyRevenue}>
//                     <CartesianGrid strokeDasharray="3 3" />
//                     <XAxis dataKey="month" />
//                     <YAxis />
//                     <Tooltip />
//                     <Legend />
//                     <Bar dataKey="revenue" fill="#8884d8" />
//                   </BarChart>
//                 </ResponsiveContainer>
//               </div>
//             </div>

//             <div className="col-md-4">
//               <div style={{ height: 300 }}>
//                 <ResponsiveContainer width="100%" height="100%">
//                   <PieChart>
//                     <Pie
//                       data={stats.itemDistribution}
//                       dataKey="value"
//                       nameKey="name"
//                       cx="50%"
//                       cy="50%"
//                       outerRadius={80}
//                       label
//                     >
//                       {stats.itemDistribution.map((entry, idx) => (
//                         <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
//                       ))}
//                     </Pie>
//                     <Tooltip />
//                     <Legend verticalAlign="bottom" />
//                   </PieChart>
//                 </ResponsiveContainer>
//               </div>
//             </div>
//           </div>

//           <div className="row g-3 mt-4">
//             <div className="col-md-6">
//               <h6>Top Users (by revenue)</h6>
//               <div className="list-group">
//                 {stats.topUsers.length === 0 && <div className="text-muted p-3">No data</div>}
//                 {stats.topUsers.map((u, idx) => (
//                   <div key={idx} className="list-group-item d-flex justify-content-between align-items-center">
//                     <div>
//                       <div className="fw-semibold">{u.email}</div>
//                       <small className="text-muted">{u.songs} songs</small>
//                     </div>
//                     <div className="fw-bold">₹{u.revenue}</div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             <div className="col-md-6">
//               <h6>Monthly New Users</h6>
//               <div style={{ height: 200 }}>
//                 <ResponsiveContainer width="100%" height="100%">
//                   <LineChart data={stats.monthlyNewUsers}>
//                     <CartesianGrid strokeDasharray="3 3" />
//                     <XAxis dataKey="month" />
//                     <YAxis />
//                     <Tooltip />
//                     <Line type="monotone" dataKey="newUsers" stroke="#82ca9d" />
//                   </LineChart>
//                 </ResponsiveContainer>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   // --- Render the original user management UI (kept intact) ---
//   const renderUserManagement = () => (
//     <>
//       <div className="card shadow-lg mb-4" style={{ borderRadius: "15px", overflow: "hidden" }}>
//         <div className="card-header text-white p-4" style={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" }}>
//           <h1 className="h3 fw-bold mb-2">HRS Studio Admin Panel</h1>
//           <p className="mb-0 opacity-75">Manage customers, transactions, and balances</p>
//         </div>

//         <div className="card-body p-4">
//           <div className="row g-3 mb-3">
//             <div className="col-md-6">
//               <input
//                 className="form-control form-control-lg"
//                 placeholder="Enter customer email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value.toLowerCase().trim())}
//               />
//             </div>
//             <div className="col-md-3">
//               <button onClick={fetchUser} className="btn btn-primary btn-lg w-100">
//                 Load User
//               </button>
//             </div>
//             <div className="col-md-3">
//               <button onClick={fetchAllUsers} className="btn btn-info btn-lg w-100 text-white">
//                 <Users size={18} className="me-2" />
//                 View All
//               </button>
//             </div>
//           </div>

//           {loading && (
//             <div className="text-center py-5">
//               <div className="spinner-border text-primary" role="status" style={{ width: "3rem", height: "3rem" }}>
//                 <span className="visually-hidden">Loading...</span>
//               </div>
//               <p className="mt-3 text-muted">Loading user data...</p>
//             </div>
//           )}
//         </div>
//       </div>

//       {showAllUsers && (
//         <div className="card shadow mb-4">
//           <div className="card-header bg-info text-white d-flex justify-content-between align-items-center">
//             <h3 className="h5 mb-0">
//               <Users size={20} className="me-2" />
//               All Users ({allUsers.length})
//             </h3>
//             <button onClick={() => setShowAllUsers(false)} className="btn btn-light btn-sm">
//               Hide All Users
//             </button>
//           </div>
//           <div className="card-body">
//             <div className="table-responsive">
//               <table className="table table-hover">
//                 <thead className="table-light">
//                   <tr>
//                     <th>#</th>
//                     <th>Email</th>
//                     <th className="text-end">Balance</th>
//                     <th className="text-center">Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {allUsers.map((user, idx) => (
//                     <tr key={user.id}>
//                       <td>{idx + 1}</td>
//                       <td className="fw-semibold">{user.email}</td>
//                       <td className="text-end text-success fw-bold">₹{user.balance || 0}</td>
//                       <td className="text-center">
//                         <button
//                           onClick={() => deleteUser(user.id, user.email)}
//                           disabled={deletingUser === user.id}
//                           className="btn btn-danger btn-sm"
//                           title="Delete User"
//                         >
//                           {deletingUser === user.id ? (
//                             <div className="spinner-border spinner-border-sm" role="status">
//                               <span className="visually-hidden">Deleting...</span>
//                             </div>
//                           ) : (
//                             <UserX size={16} />
//                           )}
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//             {allUsers.length === 0 && <p className="text-muted text-center py-4">No users found.</p>}
//           </div>
//         </div>
//       )}

//       {userData && !showAllUsers && (
//         <>
//           <div className="card shadow mb-4">
//             <div className="card-body p-4">
//               <div className="d-flex align-items-center justify-content-between mb-4">
//                 <div>
//                   <p className="text-muted mb-2">Current Balance</p>
//                   {isEditingBalance ? (
//                     <div className="d-flex align-items-center gap-2">
//                       <input
//                         type="number"
//                         className="form-control"
//                         value={editedBalance}
//                         onChange={(e) => setEditedBalance(Number(e.target.value))}
//                         style={{ width: "150px" }}
//                       />
//                       <button
//                         onClick={async () => {
//                           const userRef = doc(db, "users", email);
//                           await updateDoc(userRef, { balance: editedBalance });
//                           setIsEditingBalance(false);
//                           fetchUser();
//                         }}
//                         className="btn btn-success"
//                       >
//                         <Check size={18} />
//                       </button>
//                       <button onClick={() => setIsEditingBalance(false)} className="btn btn-danger">
//                         <X size={18} />
//                       </button>
//                     </div>
//                   ) : (
//                     <div className="d-flex align-items-center gap-3">
//                       <h2 className="display-4 fw-bold mb-0">₹{userData.balance}</h2>
//                       <button
//                         onClick={() => {
//                           setEditedBalance(userData.balance);
//                           setIsEditingBalance(true);
//                         }}
//                         className="btn btn-outline-primary"
//                       >
//                         <Edit2 size={18} />
//                       </button>
//                     </div>
//                   )}
//                 </div>
//               </div>

//               <div className="row">
//                 <div className="col-md-6">
//                   <div className="card bg-success bg-opacity-10 border-success">
//                     <div className="card-body">
//                       <h5 className="card-title">
//                         <DollarSign size={20} className="me-2 text-success" />
//                         Recharge Wallet
//                       </h5>
//                       <div className="input-group">
//                         <span className="input-group-text">₹</span>
//                         <input
//                           type="number"
//                           className="form-control"
//                           placeholder="100"
//                           value={rechargeAmount}
//                           onChange={(e) => setRechargeAmount(e.target.value)}
//                         />
//                         <button onClick={rechargeWallet} className="btn btn-success">
//                           Recharge
//                         </button>
//                       </div>
//                       {rechargeAmount && (
//                         <small className="text-success d-block mt-2">
//                           +10% bonus = ₹{Number(rechargeAmount) + Math.floor(rechargeAmount * 0.1)}
//                         </small>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* ... the rest of the user management UI remains unchanged (songs, items, transactions, recharges) */}
//           {/* For brevity, the rest of your original JSX continues here unchanged (already included above) */}
//         </>
//       )}
//     </>
//   );

//   if (!authenticated) {
//     return (
//       <div className="min-vh-100 d-flex align-items-center justify-content-center bg-gradient" style={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" }}>
//         <div className="card shadow-lg" style={{ maxWidth: "450px", width: "100%", borderRadius: "20px" }}>
//           <div className="card-body p-5">
//             <div className="text-center mb-4">
//               <div className="bg-primary bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: "80px", height: "80px" }}>
//                 <LogIn size={40} className="text-primary" />
//               </div>
//               <h2 className="fw-bold mb-2">Admin Access</h2>
//               <p className="text-muted">Enter your credentials to continue</p>
//             </div>

//             <div className="mb-3">
//               <label className="form-label fw-semibold">Admin Email</label>
//               <input type="email" className="form-control form-control-lg" placeholder="admin@example.com" value={adminEmail} onChange={(e) => setAdminEmail(e.target.value)} />
//             </div>

//             <div className="mb-4">
//               <label className="form-label fw-semibold">Password</label>
//               <div className="input-group">
//                 <input type={showPassword ? "text" : "password"} className="form-control form-control-lg" placeholder="Enter password" value={adminPassword} onChange={(e) => setAdminPassword(e.target.value)} />
//                 <button className="btn btn-outline-secondary" type="button" onClick={() => setShowPassword(!showPassword)}>
//                   {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
//                 </button>
//               </div>
//             </div>

//             <button onClick={authenticateAdmin} className="btn btn-primary btn-lg w-100 fw-semibold" style={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", border: "none" }}>
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
//         {/* Tabs: Dashboard / Users */}
//         <div className="d-flex justify-content-start gap-2 mb-3">
//           <button className={`btn ${activeTab === "dashboard" ? "btn-primary" : "btn-outline-secondary"}`} onClick={() => { setActiveTab("dashboard"); fetchAllUsers(); }}>
//             📊 Dashboard
//           </button>
//           <button className={`btn ${activeTab === "users" ? "btn-primary" : "btn-outline-secondary"}`} onClick={() => { setActiveTab("users"); }}>
//             👥 Users & Management
//           </button>
//         </div>

//         {activeTab === "dashboard" ? renderDashboard() : renderUserManagement()}
//       </div>
//     </div>
//   );
// }

// export default AdminPanel;

// AdminPanel.jsx
import React, { useState, useEffect, useRef } from "react";
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
  onSnapshot,
} from "firebase/firestore";
import {
  Music,
  DollarSign,
  Coffee,
  Droplets,
  Users,
  LogIn,
  Eye,
  EyeOff,
  ChevronDown,
  ChevronUp,
  Edit2,
  Trash2,
  Check,
  X,
  UserX,
  Filter,
} from "lucide-react";
import "bootstrap/dist/css/bootstrap.min.css";

// Charts & export libs
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  CartesianGrid,
  Legend,
} from "recharts";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const allowedAdmins = [
  "hetuashar@gmail.com",
  "sahilashar21@gmail.com",
  "asharhiten@gmail.com",
];

const ADMIN_PASSWORD = "04232129";

// Helper function to format date as DD/MM/YYYY
const formatDate = (dateString) => {
  if (!dateString) return "-";
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${day}/${month}/${year} ${hours}:${minutes}`;
};

function AdminPanel() {
  // auth / UI tabs
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // user management state
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
    recharges: true,
  });

  // Dashboard states
  const [activeTab, setActiveTab] = useState("users"); // "dashboard" or "users"
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalBonus: 0,
    totalUsers: 0,
    totalRecharges: 0,
    avgRecharge: 0,
    totalSongs: 0,
    drinks: { tea: 0, coffee: 0, water: 0 },
    topUsers: [],
    monthlyRevenue: [],
    monthlyNewUsers: [],
    itemDistribution: [],
  });

  // Dashboard filter states
  const [dashboardFilters, setDashboardFilters] = useState({
    dateRange: "all", // "all", "today", "week", "month", "year", "custom"
    startDate: "",
    endDate: "",
    selectedUser: "all", // "all" or specific user email
    showFilters: false,
  });

  const dashboardRef = useRef(null);
  const prevUserIdsRef = useRef(new Set());
  const usersUnsubRef = useRef(null);

  // new user popup + modal
  const [newUserPopup, setNewUserPopup] = useState(null);
  const [showUserModal, setShowUserModal] = useState(false);
  const [modalUser, setModalUser] = useState(null);

  // Authenticate admin
  const authenticateAdmin = () => {
    if (allowedAdmins.includes(adminEmail) && adminPassword === ADMIN_PASSWORD) {
      setAuthenticated(true);
      // onSnapshot in useEffect will start updating allUsers
    } else {
      alert("Access Denied: Invalid email or password.");
    }
  };

  // fetch a single user by doc id (email). targetEmail optional so callers can pass id directly
  const fetchUser = async (targetEmail = null) => {
    const emailToFetch = targetEmail || email;
    if (!emailToFetch) {
      alert("Please enter an email address");
      return;
    }

    setLoading(true);
    try {
      const userRef = doc(db, "users", emailToFetch);
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
          id: emailToFetch,
          email: data.email || emailToFetch,
          balance: data.balance || 0,
          transactionHistory: sortedTransactions,
          rechargeHistory: sortedRecharges,
          createdAt: data.createdAt || null,
        });
        setEmail(emailToFetch); // ensure input matches loaded user
      } else {
        // create new doc if missing
        await setDoc(userRef, {
          email: emailToFetch,
          balance: 0,
          rechargeHistory: [],
          transactionHistory: [],
          createdAt: new Date().toISOString(),
        });
        setUserData({
          id: emailToFetch,
          email: emailToFetch,
          balance: 0,
          rechargeHistory: [],
          transactionHistory: [],
          createdAt: new Date().toISOString(),
        });
        setEmail(emailToFetch);
      }
    } catch (error) {
      console.error("Error fetching user:", error);
      alert("Error fetching user data. Please try again.");
    }
    setLoading(false);
  };

  // recharge wallet (optionally pass targetEmail to recharge directly)
  const rechargeWallet = async (targetEmail = null) => {
    const target = targetEmail || email;
    if (!rechargeAmount || rechargeAmount <= 0) {
      alert("Please enter a valid recharge amount");
      return;
    }
    if (!target) {
      alert("No user selected");
      return;
    }

    try {
      const userRef = doc(db, "users", target);
      const bonus = Math.floor(rechargeAmount * 0.1);
      await updateDoc(userRef, {
        balance: (userData?.balance || 0) + Number(rechargeAmount) + bonus,
        rechargeHistory: arrayUnion({
          amount: Number(rechargeAmount),
          bonus,
          date: new Date().toISOString(),
        }),
      });

      // refresh local view
      await fetchUser(target);
      setRechargeAmount("");
      alert("Recharge successful");
    } catch (error) {
      console.error("Error recharging wallet:", error);
      alert("Error recharging wallet. Please try again.");
    }
  };

  // deduct for song/items
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
      const userRef = doc(db, "users", userData.id);
      await updateDoc(userRef, {
        balance: userData.balance - amount,
        transactionHistory: arrayUnion({
          type,
          amount,
          date: new Date().toISOString(),
        }),
      });

      fetchUser(userData.id);
    } catch (error) {
      console.error("Error deducting from wallet:", error);
      alert("Error processing transaction. Please try again.");
    }
  };

  // update / delete tx & recharges
  const updateTransaction = async (index, updatedTx) => {
    try {
      const newList = [...(userData.transactionHistory || [])];
      newList[index] = updatedTx;
      const userRef = doc(db, "users", userData.id);
      await updateDoc(userRef, {
        transactionHistory: newList,
      });
      fetchUser(userData.id);
    } catch (error) {
      console.error("Error updating transaction:", error);
      alert("Error updating transaction. Please try again.");
    }
  };

  const deleteTransaction = async (index) => {
    try {
      const newList = [...(userData.transactionHistory || [])];
      newList.splice(index, 1);
      const userRef = doc(db, "users", userData.id);
      await updateDoc(userRef, {
        transactionHistory: newList,
      });
      fetchUser(userData.id);
    } catch (error) {
      console.error("Error deleting transaction:", error);
      alert("Error deleting transaction. Please try again.");
    }
  };

  const updateRecharge = async (index, updatedRc) => {
    try {
      const newList = [...(userData.rechargeHistory || [])];
      newList[index] = updatedRc;
      const userRef = doc(db, "users", userData.id);
      await updateDoc(userRef, {
        rechargeHistory: newList,
      });
      fetchUser(userData.id);
    } catch (error) {
      console.error("Error updating recharge:", error);
      alert("Error updating recharge. Please try again.");
    }
  };

  const deleteRecharge = async (index) => {
    try {
      const newList = [...(userData.rechargeHistory || [])];
      newList.splice(index, 1);
      const userRef = doc(db, "users", userData.id);
      await updateDoc(userRef, {
        rechargeHistory: newList,
      });
      fetchUser(userData.id);
    } catch (error) {
      console.error("Error deleting recharge:", error);
      alert("Error deleting recharge. Please try again.");
    }
  };

  // fetch all users (one-time) — snapshots will keep it live when authenticated
  const fetchAllUsers = async () => {
    try {
      const usersCol = collection(db, "users");
      const userSnapshot = await getDocs(usersCol);
      const usersList = userSnapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        ...docSnap.data(),
      }));
      setAllUsers(usersList);
      setShowAllUsers(true);
    } catch (error) {
      console.error("Error fetching all users:", error);
      alert("Error fetching users list. Please try again.");
    }
  };

  // delete user
  const deleteUser = async (userId, userEmail) => {
    if (!window.confirm(`Are you sure you want to delete user: ${userEmail}? This action cannot be undone.`)) {
      return;
    }

    setDeletingUser(userId);
    try {
      const userRef = doc(db, "users", userId);
      await deleteDoc(userRef);

      // snapshot will refresh allUsers automatically
      alert("User deleted successfully!");
      // if deleted user was loaded, clear
      if (userData?.id === userId) {
        setUserData(null);
        setEmail("");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Error deleting user. Please try again.");
    } finally {
      setDeletingUser(null);
    }
  };

  const isRecent = (dateStr) => {
    if (!dateStr) return false;
    const itemDate = new Date(dateStr);
    const now = new Date();
    const diffDays = (now - itemDate) / (1000 * 60 * 60 * 24);
    return diffDays <= 2;
  };

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  // --- Real-time listener to users collection (detect new users & update allUsers) ---
  useEffect(() => {
    if (!authenticated) return;

    const usersCol = collection(db, "users");
    const unsub = onSnapshot(
      usersCol,
      (snapshot) => {
        const usersList = snapshot.docs.map((docSnap) => ({
          id: docSnap.id,
          ...docSnap.data(),
        }));

        // detect new user
        const prevIds = prevUserIdsRef.current;
        const currentIds = new Set(usersList.map((u) => u.id));
        for (const id of currentIds) {
          if (!prevIds.has(id)) {
            const newUserObj = usersList.find((x) => x.id === id);
            if (newUserObj) {
              setNewUserPopup(newUserObj);
              setTimeout(() => setNewUserPopup(null), 4000);
            }
          }
        }
        prevUserIdsRef.current = currentIds;
        setAllUsers(usersList);
      },
      (err) => console.error("Snapshot error:", err)
    );

    usersUnsubRef.current = unsub;
    return () => {
      if (usersUnsubRef.current) usersUnsubRef.current();
    };
  }, [authenticated]);

  // Helper function to check if date is within filter range
  const isDateInRange = (dateString, filters) => {
    if (!dateString) return false;
    const date = new Date(dateString);
    const now = new Date();
    
    if (filters.dateRange === "all") return true;
    if (filters.dateRange === "today") {
      return date.toDateString() === now.toDateString();
    }
    if (filters.dateRange === "week") {
      const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      return date >= weekAgo;
    }
    if (filters.dateRange === "month") {
      const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      return date >= monthAgo;
    }
    if (filters.dateRange === "year") {
      const yearAgo = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
      return date >= yearAgo;
    }
    if (filters.dateRange === "custom" && filters.startDate && filters.endDate) {
      const start = new Date(filters.startDate);
      const end = new Date(filters.endDate);
      end.setHours(23, 59, 59, 999); // Include entire end day
      return date >= start && date <= end;
    }
    
    return true;
  };

  // --- Dashboard Data Processing with Filters ---
  useEffect(() => {
    if (!allUsers || allUsers.length === 0) {
      setStats({
        totalRevenue: 0,
        totalBonus: 0,
        totalUsers: 0,
        totalRecharges: 0,
        avgRecharge: 0,
        totalSongs: 0,
        drinks: { tea: 0, coffee: 0, water: 0 },
        topUsers: [],
        monthlyRevenue: [],
        monthlyNewUsers: [],
        itemDistribution: [],
      });
      return;
    }

    const parseDate = (d) => (d ? new Date(d) : null);

    let totalRevenue = 0;
    let totalBonus = 0;
    let totalRecharges = 0;
    let totalSongs = 0;
    const drinks = { tea: 0, coffee: 0, water: 0 };
    const userTotals = {};

    const monthlyRevenueMap = {};
    const monthlyNewUsersMap = {};

    const now = new Date();
    for (let i = 11; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
      monthlyRevenueMap[key] = 0;
      monthlyNewUsersMap[key] = 0;
    }

    // Filter users based on selected user filter
    const filteredUsers = dashboardFilters.selectedUser === "all" 
      ? allUsers 
      : allUsers.filter(user => user.id === dashboardFilters.selectedUser);

    for (const user of filteredUsers) {
      const userEmailKey = user.email || user.id || "unknown";
      if (!userTotals[userEmailKey]) userTotals[userEmailKey] = { revenue: 0, songs: 0 };

      let cd = null;
      if (user.createdAt) cd = parseDate(user.createdAt);
      else if (user.rechargeHistory?.length > 0) cd = parseDate(user.rechargeHistory[0].date);
      else if (user.transactionHistory?.length > 0) cd = parseDate(user.transactionHistory[0].date);

      if (cd) {
        const key = `${cd.getFullYear()}-${String(cd.getMonth() + 1).padStart(2, "0")}`;
        if (key in monthlyNewUsersMap) monthlyNewUsersMap[key] += 1;
      }

      const recharges = user.rechargeHistory || [];
      for (const rc of recharges) {
        // Apply date filter to recharges
        if (!isDateInRange(rc.date, dashboardFilters)) continue;
        
        const amt = Number(rc.amount || 0);
        const bonus = Number(rc.bonus || 0);
        totalRevenue += amt;
        totalBonus += bonus;
        totalRecharges += 1;
        userTotals[userEmailKey].revenue += amt + bonus;

        const rd = parseDate(rc.date);
        if (rd) {
          const key = `${rd.getFullYear()}-${String(rd.getMonth() + 1).padStart(2, "0")}`;
          if (key in monthlyRevenueMap) monthlyRevenueMap[key] += amt + bonus;
        }
      }

      const txs = user.transactionHistory || [];
      for (const tx of txs) {
        // Apply date filter to transactions
        if (!isDateInRange(tx.date, dashboardFilters)) continue;
        
        const ttype = (tx.type || "").toString().toLowerCase();
        if (ttype.includes("song")) {
          totalSongs += 1;
          userTotals[userEmailKey].songs += 1;
        } else if (ttype.includes("tea")) {
          drinks.tea += 1;
        } else if (ttype.includes("coffee")) {
          drinks.coffee += 1;
        } else if (ttype.includes("water") || ttype.includes("mineral")) {
          drinks.water += 1;
        }
      }
    }

    const totalUsers = filteredUsers.length;
    const avgRecharge = totalRecharges > 0 ? (totalRevenue / totalRecharges).toFixed(2) : 0;

    const topUsersArr = Object.entries(userTotals)
      .map(([emailKey, v]) => ({ email: emailKey, revenue: v.revenue, songs: v.songs }))
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 5);

    const monthlyRevenue = Object.keys(monthlyRevenueMap).map((k) => ({
      month: k,
      revenue: monthlyRevenueMap[k],
    }));
    const monthlyNewUsers = Object.keys(monthlyNewUsersMap).map((k) => ({
      month: k,
      newUsers: monthlyNewUsersMap[k],
    }));

    const itemDistribution = [
      { name: "Songs", value: totalSongs },
      { name: "Tea", value: drinks.tea },
      { name: "Coffee", value: drinks.coffee },
      { name: "Water", value: drinks.water },
    ];

    setStats({
      totalRevenue,
      totalBonus,
      totalUsers,
      totalRecharges,
      avgRecharge,
      totalSongs,
      drinks,
      topUsers: topUsersArr,
      monthlyRevenue,
      monthlyNewUsers,
      itemDistribution,
    });
  }, [allUsers, dashboardFilters]);

  // PDF export for dashboard
  const downloadPdfReport = async () => {
    if (!dashboardRef.current) {
      alert("Dashboard not ready");
      return;
    }
    try {
      const element = dashboardRef.current;
      const canvas = await html2canvas(element, { scale: 2 });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`HRS_Studio_Report_${new Date().toISOString().slice(0, 10)}.pdf`);
    } catch (err) {
      console.error("PDF export failed:", err);
      alert("Failed to export PDF. Try again.");
    }
  };

  // open modal with user details
  const openUserModal = (user) => {
    const fresh = allUsers.find((u) => u.id === (user.id || user.email)) || user;
    setModalUser({
      id: fresh.id || fresh.email,
      email: fresh.email || fresh.id,
      balance: fresh.balance || 0,
      transactionHistory: (fresh.transactionHistory || []).slice().sort((a, b) => new Date(b.date) - new Date(a.date)),
      rechargeHistory: (fresh.rechargeHistory || []).slice().sort((a, b) => new Date(b.date) - new Date(a.date)),
      createdAt: fresh.createdAt || null,
    });
    setShowUserModal(true);
  };

  // click on user row (dashboard or all users) => load their data automatically
  const handleUserRowClick = async (user, openModal = true) => {
    const userId = user.id || user.email;
    await fetchUser(userId); // auto-load user WITHOUT needing Load User button
    if (openModal) {
      // small delay to ensure fetchUser has set userData
      setTimeout(() => {
        const fresh = allUsers.find((u) => u.id === userId) || userData;
        openUserModal({ id: userId, ...fresh });
      }, 300);
    }
  };

  // modal auto-fill recharge
  const modalRechargeAutofill = (userId) => {
    setEmail(userId);
    fetchUser(userId);
    setShowUserModal(false);
  };

  // compute totals for user (used in tables)
  const computeTotalsForUser = (user) => {
    const recharges = user.rechargeHistory || [];
    const txs = user.transactionHistory || [];
    const totalRecharged = recharges.reduce((s, r) => s + Number(r.amount || 0) + Number(r.bonus || 0), 0);
    const totalSpent = txs.reduce((s, t) => s + Number(t.amount || 0), 0);
    return { totalRecharged, totalSpent };
  };

  // Handle filter changes
  const handleFilterChange = (filterType, value) => {
    setDashboardFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  // Reset filters
  const resetFilters = () => {
    setDashboardFilters({
      dateRange: "all",
      startDate: "",
      endDate: "",
      selectedUser: "all",
      showFilters: false,
    });
  };

  // Render Dashboard Filters
  const renderDashboardFilters = () => (
    <div className="card mb-4">
      <div className="card-header bg-light d-flex justify-content-between align-items-center">
        <h6 className="mb-0">
          <Filter size={18} className="me-2" />
          Dashboard Filters
        </h6>
        <div>
          <button 
            className="btn btn-sm btn-outline-secondary me-2"
            onClick={() => setDashboardFilters(prev => ({ ...prev, showFilters: !prev.showFilters }))}
          >
            {dashboardFilters.showFilters ? "Hide Filters" : "Show Filters"}
          </button>
          <button 
            className="btn btn-sm btn-outline-danger"
            onClick={resetFilters}
          >
            Reset Filters
          </button>
        </div>
      </div>
      
      {dashboardFilters.showFilters && (
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-4">
              <label className="form-label fw-semibold">Date Range</label>
              <select 
                className="form-select"
                value={dashboardFilters.dateRange}
                onChange={(e) => handleFilterChange("dateRange", e.target.value)}
              >
                <option value="all">All Time</option>
                <option value="today">Today</option>
                <option value="week">Last 7 Days</option>
                <option value="month">Last 30 Days</option>
                <option value="year">Last Year</option>
                <option value="custom">Custom Range</option>
              </select>
            </div>

            {dashboardFilters.dateRange === "custom" && (
              <>
                <div className="col-md-4">
                  <label className="form-label fw-semibold">Start Date</label>
                  <input
                    type="date"
                    className="form-control"
                    value={dashboardFilters.startDate}
                    onChange={(e) => handleFilterChange("startDate", e.target.value)}
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label fw-semibold">End Date</label>
                  <input
                    type="date"
                    className="form-control"
                    value={dashboardFilters.endDate}
                    onChange={(e) => handleFilterChange("endDate", e.target.value)}
                  />
                </div>
              </>
            )}

            <div className="col-md-4">
              <label className="form-label fw-semibold">Filter by User</label>
              <select 
                className="form-select"
                value={dashboardFilters.selectedUser}
                onChange={(e) => handleFilterChange("selectedUser", e.target.value)}
              >
                <option value="all">All Users</option>
                {allUsers.map(user => (
                  <option key={user.id} value={user.id}>
                    {user.email}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-12">
              <div className="d-flex gap-2 align-items-center">
                <span className="text-muted small">
                  Showing data for:{" "}
                  <strong>
                    {dashboardFilters.selectedUser === "all" 
                      ? "All Users" 
                      : allUsers.find(u => u.id === dashboardFilters.selectedUser)?.email}
                  </strong>
                  {" | "}
                  <strong>
                    {dashboardFilters.dateRange === "all" && "All Time"}
                    {dashboardFilters.dateRange === "today" && "Today"}
                    {dashboardFilters.dateRange === "week" && "Last 7 Days"}
                    {dashboardFilters.dateRange === "month" && "Last 30 Days"}
                    {dashboardFilters.dateRange === "year" && "Last Year"}
                    {dashboardFilters.dateRange === "custom" && 
                      `Custom: ${dashboardFilters.startDate || "Start"} to ${dashboardFilters.endDate || "End"}`}
                  </strong>
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  // Render Dashboard
  const renderDashboard = () => {
    const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

    return (
      <div>
        {renderDashboardFilters()}
        
        <div className="card shadow mb-4">
          <div className="card-header bg-secondary text-white d-flex justify-content-between align-items-center">
            <h5 className="mb-0">📊 Dashboard</h5>
            <div>
              <button onClick={downloadPdfReport} className="btn btn-outline-light btn-sm me-2">
                📄 Download PDF Report
              </button>
              <button onClick={() => { /* snapshot keeps data fresh */ }} className="btn btn-light btn-sm">
                🔄 Refresh Data
              </button>
            </div>
          </div>

          <div className="card-body" ref={dashboardRef}>
            <div className="row g-3 mb-4">
              <div className="col-md-3">
                <div className="card p-3">
                  <div className="fw-semibold text-muted">Total Revenue</div>
                  <div className="h4 fw-bold">₹{stats.totalRevenue || 0}</div>
                  <small className="text-muted">Bonus: ₹{stats.totalBonus || 0}</small>
                </div>
              </div>
              <div className="col-md-3">
                <div className="card p-3">
                  <div className="fw-semibold text-muted">Total Users</div>
                  <div className="h4 fw-bold">{stats.totalUsers || 0}</div>
                  <small className="text-muted">Recharges: {stats.totalRecharges || 0}</small>
                </div>
              </div>
              <div className="col-md-3">
                <div className="card p-3">
                  <div className="fw-semibold text-muted">Total Songs</div>
                  <div className="h4 fw-bold">{stats.totalSongs || 0}</div>
                  <small className="text-muted">Drinks sold: {stats.drinks.tea + stats.drinks.coffee + stats.drinks.water}</small>
                </div>
              </div>
              <div className="col-md-3">
                <div className="card p-3">
                  <div className="fw-semibold text-muted">Avg Recharge</div>
                  <div className="h4 fw-bold">₹{stats.avgRecharge || 0}</div>
                  <small className="text-muted">Avg per recharge</small>
                </div>
              </div>
            </div>

            <div className="row g-3">
              <div className="col-md-8">
                <div style={{ height: 300 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={stats.monthlyRevenue}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="revenue" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="col-md-4">
                <div style={{ height: 300 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={stats.itemDistribution}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        label
                      >
                        {stats.itemDistribution.map((entry, idx) => (
                          <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend verticalAlign="bottom" />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            <div className="row g-3 mt-4">
              <div className="col-md-6">
                <h6>Top Users (by revenue)</h6>
                <div className="list-group">
                  {stats.topUsers.length === 0 && <div className="text-muted p-3">No data</div>}
                  {stats.topUsers.map((u, idx) => (
                    <div key={idx} className="list-group-item d-flex justify-content-between align-items-center">
                      <div>
                        <div className="fw-semibold">{u.email}</div>
                        <small className="text-muted">{u.songs} songs</small>
                      </div>
                      <div className="fw-bold">₹{u.revenue}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="col-md-6">
                <h6>Monthly New Users</h6>
                <div style={{ height: 200 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={stats.monthlyNewUsers}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="newUsers" stroke="#82ca9d" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Users table (click row to auto-load user and open modal) */}
            <div className="mt-4">
              <h5>All Users (click to view details / load)</h5>
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead className="table-light">
                    <tr>
                      <th>#</th>
                      <th>Email</th>
                      <th className="text-end">Balance</th>
                      <th className="text-end">Total Recharged</th>
                      <th className="text-end">Total Spent</th>
                      <th className="text-center">Joined</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allUsers.map((u, idx) => {
                      const { totalRecharged, totalSpent } = computeTotalsForUser(u);
                      return (
                        <tr key={u.id} style={{ cursor: "pointer" }} onClick={() => handleUserRowClick(u, true)}>
                          <td>{idx + 1}</td>
                          <td className="fw-semibold">{u.email}</td>
                          <td className="text-end text-success fw-bold">₹{u.balance || 0}</td>
                          <td className="text-end">₹{totalRecharged}</td>
                          <td className="text-end">₹{totalSpent}</td>
                          <td className="text-center">{u.createdAt ? new Date(u.createdAt).toLocaleDateString() : "-"}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* New user popup */}
        {newUserPopup && (
          <div style={{ position: "fixed", right: 20, top: 80, zIndex: 9999 }}>
            <div className="card shadow">
              <div className="card-body">
                <div className="fw-semibold">New user joined</div>
                <div className="small text-muted">{newUserPopup.email}</div>
                <div className="mt-2">
                  <button className="btn btn-sm btn-primary me-2" onClick={() => handleUserRowClick(newUserPopup, true)}>
                    View
                  </button>
                  <button className="btn btn-sm btn-outline-secondary" onClick={() => setNewUserPopup(null)}>Dismiss</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  // ... rest of the code remains exactly the same (renderUserManagement, auth screen, etc.)
  // Only the dashboard rendering has been modified to include filters

  // Render original user management UI (kept intact, but rows clickable to auto-load)
  const renderUserManagement = () => (
    <>
      <div className="card shadow-lg mb-4" style={{ borderRadius: "15px", overflow: "hidden" }}>
        <div className="card-header text-white p-4" style={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" }}>
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
              <button onClick={() => fetchUser()} className="btn btn-primary btn-lg w-100">
                Load User
              </button>
            </div>
            <div className="col-md-3">
              <button onClick={() => { setShowAllUsers(true); }} className="btn btn-info btn-lg w-100 text-white">
                <Users size={18} className="me-2" />
                View All
              </button>
            </div>
          </div>

          {loading && (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status" style={{ width: "3rem", height: "3rem" }}>
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
                    <th className="text-end">Total Recharged</th>
                    <th className="text-end">Total Spent</th>
                    <th className="text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {allUsers.map((user, idx) => {
                    const { totalRecharged, totalSpent } = computeTotalsForUser(user);
                    return (
                      <tr key={user.id}>
                        <td>{idx + 1}</td>
                        <td className="fw-semibold" style={{ cursor: "pointer" }} onClick={() => handleUserRowClick(user, false)}>{user.email}</td>
                        <td className="text-end text-success fw-bold">₹{user.balance || 0}</td>
                        <td className="text-end">₹{totalRecharged}</td>
                        <td className="text-end">₹{totalSpent}</td>
                        <td className="text-center">
                          <div className="d-flex justify-content-center gap-2">
                            <button
                              onClick={() => handleUserRowClick(user, false)} // auto-load user for recharge
                              className="btn btn-sm btn-primary"
                            >
                              Load
                            </button>
                            <button
                              onClick={() => openUserModal(user)}
                              className="btn btn-sm btn-outline-primary"
                            >
                              View
                            </button>
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
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            {allUsers.length === 0 && <p className="text-muted text-center py-4">No users found.</p>}
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
                        style={{ width: "150px" }}
                      />
                      <button
                        onClick={async () => {
                          const userRef = doc(db, "users", email);
                          await updateDoc(userRef, { balance: editedBalance });
                          setIsEditingBalance(false);
                          fetchUser(email);
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
                        <button onClick={() => rechargeWallet()} className="btn btn-success">
                          Recharge
                        </button>
                      </div>
                      {rechargeAmount && (
                        <small className="text-success d-block mt-2">
                          +10% bonus = ₹{Number(rechargeAmount) + Math.floor(rechargeAmount * 0.1)}
                        </small>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Songs */}
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

          {/* Items */}
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

          {/* Transaction History */}
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

          {/* Recharge History */}
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
    </>
  );

  // auth screen (kept same)
  if (!authenticated) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center bg-gradient" style={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" }}>
        <div className="card shadow-lg" style={{ maxWidth: "450px", width: "100%", borderRadius: "20px" }}>
          <div className="card-body p-5">
            <div className="text-center mb-4">
              <div className="bg-primary bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: "80px", height: "80px" }}>
                <LogIn size={40} className="text-primary" />
              </div>
              <h2 className="fw-bold mb-2">Admin Access</h2>
              <p className="text-muted">Enter your credentials to continue</p>
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Admin Email</label>
              <input type="email" className="form-control form-control-lg" placeholder="admin@example.com" value={adminEmail} onChange={(e) => setAdminEmail(e.target.value)} />
            </div>

            <div className="mb-4">
              <label className="form-label fw-semibold">Password</label>
              <div className="input-group">
                <input type={showPassword ? "text" : "password"} className="form-control form-control-lg" placeholder="Enter password" value={adminPassword} onChange={(e) => setAdminPassword(e.target.value)} />
                <button className="btn btn-outline-secondary" type="button" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <button onClick={authenticateAdmin} className="btn btn-primary btn-lg w-100 fw-semibold" style={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", border: "none" }}>
              Login as Admin
            </button>
          </div>
        </div>
      </div>
    );
  }

  // MAIN RENDER
  return (
    <div className="min-vh-100 bg-light py-4">
      <div className="container">
        {/* Tabs: Dashboard / Users */}
        <div className="d-flex justify-content-start gap-2 mb-3">
          <button className={`btn ${activeTab === "dashboard" ? "btn-primary" : "btn-outline-secondary"}`} onClick={() => { setActiveTab("dashboard"); }}>
            📊 Dashboard
          </button>
          <button className={`btn ${activeTab === "users" ? "btn-primary" : "btn-outline-secondary"}`} onClick={() => { setActiveTab("users"); }}>
            👥 Users & Management
          </button>
        </div>

        {activeTab === "dashboard" ? renderDashboard() : renderUserManagement()}

        {/* User Details Modal (Bootstrap-style) */}
        {showUserModal && modalUser && (
          <div className="modal show d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: "rgba(0,0,0,0.4)" }}>
            <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">User Details — {modalUser.email}</h5>
                  <button type="button" className="btn-close" aria-label="Close" onClick={() => setShowUserModal(false)}></button>
                </div>
                <div className="modal-body">
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <div>
                      <div className="fw-semibold text-muted">Balance</div>
                      <div className="h4">₹{modalUser.balance || 0}</div>
                    </div>
                    <div>
                      <div className="fw-semibold text-muted">Joined</div>
                      <div>{modalUser.createdAt ? new Date(modalUser.createdAt).toLocaleString() : "-"}</div>
                    </div>
                    <div>
                      <button className="btn btn-success" onClick={() => modalRechargeAutofill(modalUser.id)}>Recharge Wallet</button>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <h6>Recharge History</h6>
                      <div className="list-group">
                        {(modalUser.rechargeHistory || []).length === 0 && <div className="text-muted p-3">No recharges</div>}
                        {(modalUser.rechargeHistory || []).map((rc, idx) => (
                          <div key={idx} className="list-group-item d-flex justify-content-between align-items-center">
                            <div>
                              <div className="fw-semibold">+₹{rc.amount}</div>
                              <small className="text-muted">Bonus: ₹{rc.bonus} • {formatDate(rc.date)}</small>
                            </div>
                            <div className="text-success fw-bold">₹{Number(rc.amount || 0) + Number(rc.bonus || 0)}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="col-md-6">
                      <h6>Transaction History</h6>
                      <div className="list-group">
                        {(modalUser.transactionHistory || []).length === 0 && <div className="text-muted p-3">No transactions</div>}
                        {(modalUser.transactionHistory || []).map((tx, idx) => (
                          <div key={idx} className="list-group-item d-flex justify-content-between align-items-center">
                            <div>
                              <div className="fw-semibold">{tx.type}</div>
                              <small className="text-muted">{formatDate(tx.date)}</small>
                            </div>
                            <div className="text-danger fw-bold">-₹{tx.amount}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-3">
                    <h6>Totals</h6>
                    <div className="d-flex gap-3">
                      <div className="card p-3">
                        <div className="text-muted">Total Recharged</div>
                        <div className="fw-bold">₹{computeTotalsForUser(modalUser).totalRecharged}</div>
                      </div>
                      <div className="card p-3">
                        <div className="text-muted">Total Spent</div>
                        <div className="fw-bold">₹{computeTotalsForUser(modalUser).totalSpent}</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowUserModal(false)}>Close</button>
                  <button type="button" className="btn btn-primary" onClick={() => { modalRechargeAutofill(modalUser.id); }}>Auto-fill Recharge</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminPanel;