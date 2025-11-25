import React, { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { LayoutDashboard, ShoppingCart, FileText, Headphones, CreditCard, User as UserIcon, LogOut, MessageSquare, Plus, Trash2, Package, Check, Edit2, X, Download, Paperclip, Send } from 'lucide-react';
import { useAuth, Service, User, Invoice, Ticket } from '../context/AuthContext';
import { Button } from '../components/ui/button';
import { jsPDF } from "jspdf";

const ClientPortal: React.FC = () => {
  const { 
    user, logout, 
    services, addService, deleteService, 
    orders, placeOrder,
    users, addUser, updateUser, deleteUser,
    invoices, createInvoice, payInvoice,
    tickets, createTicket, replyToTicket, closeTicket
  } = useAuth();

  const [activeTab, setActiveTab] = useState('dashboard');
  const [isAddingService, setIsAddingService] = useState(false);
  const [isAddingUser, setIsAddingUser] = useState(false);
  const [isCreatingInvoice, setIsCreatingInvoice] = useState(false);
  
  // Support State
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null);
  const [isCreatingTicket, setIsCreatingTicket] = useState(false);
  
  const navigate = useNavigate();

  // Redirect if not logged in
  if (!user) {
    return <Navigate to="/login" />;
  }

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isAdmin = user.role === 'admin';

  // --- PDF Generation ---
  const generatePDF = (invoice: Invoice) => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    
    // Header Background
    doc.setFillColor(249, 250, 251); // Gray 50
    doc.rect(0, 0, pageWidth, 40, 'F');

    // Logo / Brand
    doc.setFontSize(22);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(17, 24, 39);
    doc.text("RIC", 20, 25);
    doc.setFont("helvetica", "normal");
    doc.text("Tanzania", 38, 25); 

    // Company Details
    doc.setFontSize(9);
    doc.setTextColor(107, 114, 128);
    doc.text("Digital Agency", 20, 32);
    doc.text("Dar es Salaam, Tanzania", 20, 36);

    // Title
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(17, 24, 39);
    doc.text("INVOICE", pageWidth - 20, 25, { align: 'right' });

    // Invoice Meta
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(107, 114, 128);
    doc.text(`#${invoice.id.slice(-6).toUpperCase()}`, pageWidth - 20, 32, { align: 'right' });
    
    // Content Container
    let y = 60;

    // Bill To
    doc.setFontSize(10);
    doc.setTextColor(156, 163, 175); // Gray 400
    doc.text("BILLED TO", 20, y);
    
    doc.setFontSize(12);
    doc.setTextColor(17, 24, 39);
    doc.text(invoice.userName, 20, y + 6);
    doc.setFontSize(10);
    doc.setTextColor(107, 114, 128);
    doc.text("Client Account", 20, y + 11);

    // Invoice Info
    doc.setTextColor(156, 163, 175);
    doc.text("DATE ISSUED", 120, y);
    doc.setTextColor(17, 24, 39);
    doc.text(invoice.date, 120, y + 6);

    doc.setTextColor(156, 163, 175);
    doc.text("DUE DATE", 160, y);
    doc.setTextColor(17, 24, 39);
    doc.text(invoice.dueDate, 160, y + 6);

    y += 30;

    // Table Header
    doc.setFillColor(243, 244, 246); // Gray 100
    doc.rect(20, y - 5, pageWidth - 40, 10, 'F');
    doc.setFontSize(9);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(55, 65, 81);
    doc.text("ITEM DESCRIPTION", 25, y + 1);
    doc.text("AMOUNT", pageWidth - 25, y + 1, { align: 'right' });

    y += 15;

    // Table Row
    doc.setFont("helvetica", "bold");
    doc.setTextColor(17, 24, 39);
    doc.text(invoice.title, 25, y);
    doc.text(invoice.amount, pageWidth - 25, y, { align: 'right' });

    // Line
    doc.setDrawColor(229, 231, 235);
    doc.line(20, y + 5, pageWidth - 20, y + 5);

    y += 20;

    // Totals
    doc.setFont("helvetica", "normal");
    doc.setTextColor(107, 114, 128);
    doc.text("Subtotal", 140, y);
    doc.setTextColor(17, 24, 39);
    doc.text(invoice.amount, pageWidth - 25, y, { align: 'right' });

    y += 8;
    doc.setTextColor(107, 114, 128);
    doc.text("Tax (0%)", 140, y);
    doc.setTextColor(17, 24, 39);
    doc.text("0 TZS", pageWidth - 25, y, { align: 'right' });

    y += 10;
    // Total Line
    doc.line(130, y - 4, pageWidth - 20, y - 4);
    
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("Total", 140, y + 2);
    doc.text(invoice.amount, pageWidth - 25, y + 2, { align: 'right' });

    // Status Badge equivalent
    y += 30;
    const statusColor = invoice.status === 'Paid' ? [34, 197, 94] : [239, 68, 68];
    doc.setTextColor(statusColor[0], statusColor[1], statusColor[2]);
    doc.setFontSize(14);
    doc.text(invoice.status.toUpperCase(), 20, y);

    // Footer
    const footerY = doc.internal.pageSize.getHeight() - 20;
    doc.setFontSize(8);
    doc.setTextColor(156, 163, 175);
    doc.text("RIC Tanzania | info@rictanzania.co.tz | Dar es Salaam", pageWidth / 2, footerY, { align: 'center' });

    doc.save(`invoice-${invoice.id}.pdf`);
  };

  // --- Components for different views ---

  const AddServiceForm = () => {
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [tag, setTag] = useState('');
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        addService({
            title,
            price,
            tag,
            icon: '🆕',
            description: 'New service added by admin'
        });
        setIsAddingService(false);
    };

    return (
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm mb-8 text-gray-900">
            <h3 className="font-bold mb-4 text-gray-900">Add New Service</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Service Title</label>
                  <input type="text" placeholder="Service Title" className="w-full p-2 border border-gray-300 rounded bg-white text-gray-900 focus:ring-2 focus:ring-black focus:outline-none" value={title} onChange={e => setTitle(e.target.value)} required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                  <input type="text" placeholder="Price (e.g., 500,000 TZS)" className="w-full p-2 border border-gray-300 rounded bg-white text-gray-900 focus:ring-2 focus:ring-black focus:outline-none" value={price} onChange={e => setPrice(e.target.value)} required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tag</label>
                  <input type="text" placeholder="Tag (e.g., Design)" className="w-full p-2 border border-gray-300 rounded bg-white text-gray-900 focus:ring-2 focus:ring-black focus:outline-none" value={tag} onChange={e => setTag(e.target.value)} required />
                </div>
                <div className="flex gap-2 pt-2">
                    <Button type="submit">Save Service</Button>
                    <Button variant="outline" type="button" onClick={() => setIsAddingService(false)}>Cancel</Button>
                </div>
            </form>
        </div>
    );
  };

  const ServiceCard = ({ service }: { service: Service }) => (
    <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition relative text-gray-900">
        <div className="flex justify-between items-start mb-4">
            <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-lg">{service.icon}</div>
            <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded font-medium">{service.tag}</span>
        </div>
        <h4 className="font-bold mb-1 text-gray-900">{service.title}</h4>
        <p className="text-xs text-gray-500 mb-4">{service.description}</p>
        <div className="font-bold text-lg mb-4 text-gray-900">{service.price}</div>
        
        {isAdmin ? (
            <button 
                onClick={() => deleteService(service.id)}
                className="w-full bg-red-50 text-red-600 py-2 rounded text-sm flex items-center justify-center gap-2 hover:bg-red-100 font-medium">
                <Trash2 size={14} /> Delete Service
            </button>
        ) : (
            <button 
                onClick={() => {
                    if(confirm(`Confirm order for ${service.title}?`)) {
                        placeOrder(service);
                        alert("Order placed successfully!");
                    }
                }}
                className="w-full bg-[#111111] text-white py-2 rounded text-sm flex items-center justify-center gap-2 hover:bg-gray-800 font-medium">
                <ShoppingCart size={14} /> Buy Now
            </button>
        )}
    </div>
  );

  const OrdersList = () => {
    const displayedOrders = isAdmin ? orders : orders.filter(o => o.userId === user.id);

    return (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden text-gray-900">
            <div className="p-6 border-b border-gray-100">
                <h3 className="font-bold text-lg text-gray-900">Order History</h3>
            </div>
            {displayedOrders.length === 0 ? (
                <div className="p-8 text-center text-gray-500">No orders found.</div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-gray-50 text-gray-500 font-medium border-b border-gray-100">
                            <tr>
                                <th className="px-6 py-4">Order ID</th>
                                <th className="px-6 py-4">Service</th>
                                {isAdmin && <th className="px-6 py-4">User ID</th>}
                                <th className="px-6 py-4">Date</th>
                                <th className="px-6 py-4">Price</th>
                                <th className="px-6 py-4">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {displayedOrders.map(order => (
                                <tr key={order.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 font-mono text-gray-400">#{order.id.slice(-6)}</td>
                                    <td className="px-6 py-4 font-medium text-gray-900">{order.serviceTitle}</td>
                                    {isAdmin && <td className="px-6 py-4 text-xs text-gray-500">{order.userId}</td>}
                                    <td className="px-6 py-4 text-gray-500">{order.date}</td>
                                    <td className="px-6 py-4 font-bold text-gray-900">{order.price}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded text-xs font-bold ${
                                            order.status === 'Completed' ? 'bg-green-100 text-green-700' :
                                            order.status === 'Active' ? 'bg-blue-100 text-blue-700' :
                                            'bg-yellow-100 text-yellow-700'
                                        }`}>
                                            {order.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
  };

  const UserManagement = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState<'admin'|'client'>('client');

    const handleCreateUser = (e: React.FormEvent) => {
        e.preventDefault();
        addUser({ name, email, password, role });
        setIsAddingUser(false);
        setName(''); setEmail(''); setPassword('');
    };

    return (
        <div className="space-y-6">
             <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-gray-900">Manage Users</h3>
                <Button onClick={() => setIsAddingUser(!isAddingUser)} className="flex items-center gap-2">
                    {isAddingUser ? <X size={16}/> : <Plus size={16}/>}
                    {isAddingUser ? "Cancel" : "Add User"}
                </Button>
             </div>

             {isAddingUser && (
                 <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                     <h4 className="font-bold mb-4">Create New User</h4>
                     <form onSubmit={handleCreateUser} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                         <input type="text" placeholder="Full Name" className="p-2 border rounded bg-white" value={name} onChange={e=>setName(e.target.value)} required/>
                         <input type="email" placeholder="Email" className="p-2 border rounded bg-white" value={email} onChange={e=>setEmail(e.target.value)} required/>
                         <input type="password" placeholder="Password" className="p-2 border rounded bg-white" value={password} onChange={e=>setPassword(e.target.value)} required/>
                         <select className="p-2 border rounded bg-white" value={role} onChange={e=>setRole(e.target.value as any)}>
                             <option value="client">Client</option>
                             <option value="admin">Admin</option>
                         </select>
                         <div className="md:col-span-2">
                             <Button type="submit" className="w-full">Create User</Button>
                         </div>
                     </form>
                 </div>
             )}

            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <table className="w-full text-sm text-left">
                    <thead className="bg-gray-50 text-gray-500 font-medium border-b border-gray-100">
                        <tr>
                            <th className="px-6 py-4">Name</th>
                            <th className="px-6 py-4">Email</th>
                            <th className="px-6 py-4">Role</th>
                            <th className="px-6 py-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {users.map(u => (
                            <tr key={u.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 font-medium text-gray-900">{u.name}</td>
                                <td className="px-6 py-4 text-gray-500">{u.email}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded text-xs font-bold ${u.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>
                                        {u.role.toUpperCase()}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    {u.id !== 'admin' && ( // Prevent deleting main admin
                                        <button onClick={() => deleteService(u.id) /* Typo protection: logic for delete user */} className="text-red-500 hover:text-red-700"
                                            onMouseDown={() => { if(confirm('Delete user?')) deleteUser(u.id); }}>
                                            <Trash2 size={16} />
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
  };

  const InvoiceManagement = () => {
    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [selectedUserId, setSelectedUserId] = useState('');

    const displayedInvoices = isAdmin ? invoices : invoices.filter(i => i.userId === user.id);

    const handleCreateInvoice = (e: React.FormEvent) => {
        e.preventDefault();
        if(!selectedUserId) return alert("Select a user");
        
        createInvoice({
            title,
            amount,
            dueDate,
            date: new Date().toLocaleDateString(),
            userId: selectedUserId
        });
        setIsCreatingInvoice(false);
        setTitle(''); setAmount(''); setDueDate(''); setSelectedUserId('');
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-gray-900">Invoices</h3>
                {isAdmin && (
                    <Button onClick={() => setIsCreatingInvoice(!isCreatingInvoice)} className="flex items-center gap-2">
                        {isCreatingInvoice ? <X size={16}/> : <Plus size={16}/>}
                        {isCreatingInvoice ? "Cancel" : "Create Invoice"}
                    </Button>
                )}
            </div>

            {isAdmin && isCreatingInvoice && (
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                    <h4 className="font-bold mb-4">Create New Invoice</h4>
                    <form onSubmit={handleCreateInvoice} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium mb-1">Select User</label>
                            <select className="w-full p-2 border rounded bg-white text-gray-900" value={selectedUserId} onChange={e => setSelectedUserId(e.target.value)} required>
                                <option value="">-- Choose Client --</option>
                                {users.filter(u => u.role === 'client').map(u => (
                                    <option key={u.id} value={u.id}>{u.name} ({u.email})</option>
                                ))}
                            </select>
                        </div>
                        <input type="text" placeholder="Description / Title" className="p-2 border rounded bg-white text-gray-900" value={title} onChange={e=>setTitle(e.target.value)} required/>
                        <input type="text" placeholder="Amount (e.g. 500,000 TZS)" className="p-2 border rounded bg-white text-gray-900" value={amount} onChange={e=>setAmount(e.target.value)} required/>
                        <input type="date" className="p-2 border rounded bg-white text-gray-900" value={dueDate} onChange={e=>setDueDate(e.target.value)} required/>
                        <div className="md:col-span-2">
                            <Button type="submit" className="w-full">Issue Invoice</Button>
                        </div>
                    </form>
                </div>
            )}

            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                {displayedInvoices.length === 0 ? (
                    <div className="p-8 text-center text-gray-500">No invoices found.</div>
                ) : (
                    <table className="w-full text-sm text-left">
                        <thead className="bg-gray-50 text-gray-500 font-medium border-b border-gray-100">
                            <tr>
                                <th className="px-6 py-4">Invoice #</th>
                                <th className="px-6 py-4">Title</th>
                                {isAdmin && <th className="px-6 py-4">Client</th>}
                                <th className="px-6 py-4">Due Date</th>
                                <th className="px-6 py-4">Amount</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {displayedInvoices.map(inv => (
                                <tr key={inv.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 font-mono text-gray-400">#{inv.id.slice(-4)}</td>
                                    <td className="px-6 py-4 font-medium text-gray-900">{inv.title}</td>
                                    {isAdmin && <td className="px-6 py-4 text-xs text-gray-500">{inv.userName}</td>}
                                    <td className="px-6 py-4 text-gray-500">{inv.dueDate}</td>
                                    <td className="px-6 py-4 font-bold text-gray-900">{inv.amount}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded text-xs font-bold ${inv.status === 'Paid' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                            {inv.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 flex items-center gap-2">
                                        <button 
                                            onClick={() => generatePDF(inv)}
                                            className="text-gray-400 hover:text-black transition"
                                            title="Download PDF"
                                        >
                                            <Download size={18} />
                                        </button>

                                        {!isAdmin && inv.status === 'Pending' && (
                                            <button 
                                                onClick={() => {
                                                    if(confirm("Pay this invoice now?")) payInvoice(inv.id);
                                                }}
                                                className="bg-black text-white px-3 py-1 rounded text-xs font-bold hover:bg-gray-800">
                                                Pay Now
                                            </button>
                                        )}
                                        {isAdmin && inv.status === 'Pending' && (
                                            <span className="text-xs text-gray-400 italic">Unpaid</span>
                                        )}
                                        {inv.status === 'Paid' && (
                                            <div className="text-green-600 flex items-center gap-1 text-xs font-bold">
                                                <Check size={14} /> Paid
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
  };

  const SupportSystem = () => {
    const [newSubject, setNewSubject] = useState('');
    const [newMessage, setNewMessage] = useState('');
    const [serviceId, setServiceId] = useState('');
    const [attachment, setAttachment] = useState<File | null>(null);

    // Filter tickets based on role
    const displayTickets = isAdmin ? tickets : tickets.filter(t => t.userId === user.id);
    const selectedTicket = tickets.find(t => t.id === selectedTicketId);

    const handleCreateTicket = async (e: React.FormEvent) => {
        e.preventDefault();
        await createTicket({
            subject: newSubject,
            message: newMessage,
            serviceId: serviceId || 'others',
            attachment: attachment || undefined
        });
        setIsCreatingTicket(false);
        setNewSubject(''); setNewMessage(''); setServiceId(''); setAttachment(null);
    };

    const handleReply = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedTicketId) return;
        await replyToTicket(selectedTicketId, newMessage, attachment || undefined);
        setNewMessage(''); setAttachment(null);
    };

    if (selectedTicket) {
        return (
            <div className="h-[600px] flex flex-col bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                    <div>
                        <button onClick={() => setSelectedTicketId(null)} className="text-sm text-gray-500 hover:text-black mb-1">← Back to tickets</button>
                        <h3 className="font-bold text-lg text-gray-900">{selectedTicket.subject}</h3>
                        <div className="flex gap-2 text-xs text-gray-500">
                            <span>{selectedTicket.serviceName}</span>
                            <span>•</span>
                            <span>ID: #{selectedTicket.id.slice(-4)}</span>
                            {isAdmin && <span>• By {selectedTicket.userName}</span>}
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <span className={`px-2 py-1 rounded text-xs font-bold ${
                            selectedTicket.status === 'Open' ? 'bg-blue-100 text-blue-700' :
                            selectedTicket.status === 'Answered' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-gray-100 text-gray-700'
                        }`}>{selectedTicket.status}</span>
                        {isAdmin && selectedTicket.status !== 'Closed' && (
                            <Button variant="outline" size="sm" onClick={() => closeTicket(selectedTicket.id)}>Close Ticket</Button>
                        )}
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50">
                    {selectedTicket.messages.map(msg => (
                        <div key={msg.id} className={`flex flex-col max-w-[80%] ${msg.senderId === user.id ? 'ml-auto items-end' : 'mr-auto items-start'}`}>
                            <div className={`p-4 rounded-lg shadow-sm ${msg.senderId === user.id ? 'bg-black text-white rounded-br-none' : 'bg-white text-gray-900 border border-gray-200 rounded-bl-none'}`}>
                                <p className="text-sm whitespace-pre-wrap">{msg.message}</p>
                                {msg.attachment && (
                                    <div className="mt-2">
                                        <img src={msg.attachment} alt="Attachment" className="max-w-xs rounded-md border border-white/20" />
                                    </div>
                                )}
                            </div>
                            <span className="text-xs text-gray-400 mt-1">
                                {msg.senderId === user.id ? 'You' : msg.senderName} • {msg.timestamp}
                            </span>
                        </div>
                    ))}
                </div>

                {selectedTicket.status !== 'Closed' && (
                    <form onSubmit={handleReply} className="p-4 border-t border-gray-200 bg-white">
                        <div className="flex gap-2">
                            <div className="flex-1">
                                <input 
                                    className="w-full p-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-black" 
                                    placeholder="Type your reply..."
                                    value={newMessage}
                                    onChange={e => setNewMessage(e.target.value)}
                                    required
                                />
                                {attachment && (
                                    <div className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                                        <Paperclip size={10} /> Attached: {attachment.name}
                                        <button type="button" onClick={() => setAttachment(null)} className="text-red-500 ml-1">x</button>
                                    </div>
                                )}
                            </div>
                            <label className="cursor-pointer p-2 text-gray-500 hover:text-black hover:bg-gray-100 rounded">
                                <Paperclip size={20} />
                                <input type="file" className="hidden" accept="image/*" onChange={e => setAttachment(e.target.files?.[0] || null)} />
                            </label>
                            <Button type="submit" size="sm" className="h-auto">
                                <Send size={18} />
                            </Button>
                        </div>
                    </form>
                )}
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-gray-900">Support Tickets</h3>
                {!isAdmin && (
                    <Button onClick={() => setIsCreatingTicket(!isCreatingTicket)} className="flex items-center gap-2">
                        {isCreatingTicket ? <X size={16}/> : <Plus size={16}/>}
                        {isCreatingTicket ? "Cancel" : "New Ticket"}
                    </Button>
                )}
            </div>

            {isCreatingTicket && !isAdmin && (
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                    <h4 className="font-bold mb-4">Submit a Request</h4>
                    <form onSubmit={handleCreateTicket} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Related Service</label>
                            <select className="w-full p-2 border rounded bg-white text-gray-900" value={serviceId} onChange={e => setServiceId(e.target.value)} required>
                                <option value="">Select a service...</option>
                                <option value="others">Others / General Inquiry</option>
                                {services.map(s => (
                                    <option key={s.id} value={s.id}>{s.title}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Subject</label>
                            <input type="text" className="w-full p-2 border rounded bg-white" value={newSubject} onChange={e => setNewSubject(e.target.value)} required placeholder="Brief summary of the issue"/>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Message</label>
                            <textarea className="w-full p-2 border rounded bg-white h-32" value={newMessage} onChange={e => setNewMessage(e.target.value)} required placeholder="Describe your issue in detail..."/>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Attachment (Image)</label>
                            <input type="file" accept="image/*" className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200" onChange={e => setAttachment(e.target.files?.[0] || null)} />
                        </div>
                        <Button type="submit" className="w-full">Submit Ticket</Button>
                    </form>
                </div>
            )}

            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                {displayTickets.length === 0 ? (
                    <div className="p-8 text-center text-gray-500">No support tickets found.</div>
                ) : (
                    <div className="divide-y divide-gray-100">
                        {displayTickets.map(ticket => (
                            <div key={ticket.id} onClick={() => setSelectedTicketId(ticket.id)} className="p-4 hover:bg-gray-50 cursor-pointer flex justify-between items-center transition">
                                <div>
                                    <h4 className="font-medium text-gray-900">{ticket.subject}</h4>
                                    <p className="text-sm text-gray-500">
                                        {ticket.serviceName} • Last update: {ticket.lastUpdated}
                                    </p>
                                    {isAdmin && <p className="text-xs text-gray-400 mt-1">Client: {ticket.userName}</p>}
                                </div>
                                <span className={`px-2 py-1 rounded text-xs font-bold ${
                                    ticket.status === 'Open' ? 'bg-blue-100 text-blue-700' :
                                    ticket.status === 'Answered' ? 'bg-yellow-100 text-yellow-700' :
                                    'bg-gray-100 text-gray-700'
                                }`}>
                                    {ticket.status}
                                </span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
  };


  return (
    <div className="flex min-h-screen bg-gray-50 font-sans text-gray-900">
      
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col fixed h-full z-10 text-gray-900">
        <div className="p-6 border-b border-gray-100">
           <Link to="/" className="text-xl font-bold text-gray-900">RIC <span className="text-gray-400 font-normal">Portal</span></Link>
        </div>
        
        <div className="p-4 space-y-8 flex-grow overflow-y-auto">
           <div>
              <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 px-2">General</div>
              <nav className="space-y-1">
                 <button onClick={() => setActiveTab('dashboard')} className={`w-full flex items-center px-2 py-2.5 rounded-lg text-sm font-medium transition ${activeTab === 'dashboard' ? 'bg-black text-white' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}>
                    <LayoutDashboard size={18} className="mr-3" />
                    Dashboard
                 </button>
                 <button onClick={() => setActiveTab('orders')} className={`w-full flex items-center px-2 py-2.5 rounded-lg text-sm font-medium transition ${activeTab === 'orders' ? 'bg-black text-white' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}>
                    <Package size={18} className="mr-3" />
                    Orders
                 </button>
                 <button onClick={() => setActiveTab('invoices')} className={`w-full flex items-center px-2 py-2.5 rounded-lg text-sm font-medium transition ${activeTab === 'invoices' ? 'bg-black text-white' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}>
                    <FileText size={18} className="mr-3" />
                    Invoices
                 </button>
              </nav>
           </div>

           <div>
              <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 px-2">Tools</div>
              <nav className="space-y-1">
                 <button onClick={() => setActiveTab('support')} className={`w-full flex items-center px-2 py-2.5 rounded-lg text-sm font-medium transition ${activeTab === 'support' ? 'bg-black text-white' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}>
                    <Headphones size={18} className="mr-3" />
                    Support
                 </button>
                 <button className="w-full flex items-center px-2 py-2.5 text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-lg text-sm font-medium transition">
                    <CreditCard size={18} className="mr-3" />
                    Payments
                 </button>
              </nav>
           </div>
           
           {isAdmin && (
             <div>
                <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 px-2">Admin</div>
                <nav className="space-y-1">
                   <button onClick={() => setActiveTab('users')} className={`w-full flex items-center px-2 py-2.5 rounded-lg text-sm font-medium transition ${activeTab === 'users' ? 'bg-black text-white' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}>
                      <UserIcon size={18} className="mr-3" />
                      Manage Users
                   </button>
                </nav>
             </div>
           )}
        </div>

        <div className="p-4 border-t border-gray-100">
           <button onClick={handleLogout} className="w-full flex items-center px-2 py-2.5 text-red-600 hover:bg-red-50 rounded-lg text-sm font-medium transition">
               <LogOut size={18} className="mr-3" />
               Log out
           </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:ml-64">
         
         {/* Mobile Header */}
         <div className="md:hidden bg-white p-4 border-b border-gray-200 flex justify-between items-center sticky top-0 z-20">
            <span className="font-bold text-gray-900">RIC Portal</span>
            <div className="flex gap-4">
                <Link to="/" className="text-sm text-gray-500">Back to Site</Link>
                <button onClick={handleLogout} className="text-sm text-red-500">Logout</button>
            </div>
         </div>

         {/* Dashboard Content */}
         <div className="p-4 sm:p-8 max-w-7xl mx-auto">
            
            {/* Header Area */}
            <header className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
               <div>
                  <h1 className="text-2xl font-bold text-gray-900 capitalize">
                    {activeTab === 'dashboard' ? 'Overview' : activeTab.replace('-', ' ')}
                  </h1>
                  <div className="flex items-center space-x-3 mt-1">
                     <div className="w-8 h-8 bg-black rounded-full text-white flex items-center justify-center text-xs font-bold">
                        {user.name.charAt(0)}
                     </div>
                     <span className="text-sm font-medium text-gray-700">{user.name}</span>
                     {isAdmin && <span className="px-2 py-0.5 bg-yellow-100 text-yellow-700 rounded text-xs font-bold">👑 Admin</span>}
                     {!isAdmin && <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-xs font-bold">Client</span>}
                  </div>
               </div>
            </header>

            {/* Content Switcher */}
            {activeTab === 'dashboard' && (
                <>
                    {/* Welcome Banner */}
                    <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-8 text-white shadow-lg mb-10">
                    <h2 className="text-3xl font-bold mb-2 text-white">Welcome back, {user.name.split(' ')[0]}!</h2>
                    <p className="text-gray-300 mb-6 max-w-xl">
                        {isAdmin 
                            ? "Manage your agency products, services, and view client orders." 
                            : "Manage your services, track orders, and request support."}
                    </p>
                    <div className="flex gap-3">
                        <button onClick={() => setActiveTab('orders')} className="bg-white text-black px-4 py-2 rounded text-sm font-medium hover:bg-gray-100 transition">View Orders</button>
                        {!isAdmin && (
                             <button onClick={() => setActiveTab('support')} className="bg-transparent border border-white text-white px-4 py-2 rounded text-sm font-medium hover:bg-white/10 transition flex items-center gap-2">
                                <MessageSquare size={16}/> Get Support
                             </button>
                        )}
                        {isAdmin && (
                            <button onClick={() => setActiveTab('users')} className="bg-transparent border border-white text-white px-4 py-2 rounded text-sm font-medium hover:bg-white/10 transition">
                                Manage Users
                            </button>
                        )}
                    </div>
                    </div>

                    {/* Services Section */}
                    <div className="mb-6 flex items-center justify-between">
                        <div>
                            <h3 className="text-xl font-bold text-gray-900">{isAdmin ? "Manage Services" : "Available Services"}</h3>
                            <p className="text-gray-500 text-sm mt-1">
                                {isAdmin ? "Add, edit, or remove services offered." : "Browse and purchase services."}
                            </p>
                        </div>
                        {isAdmin && (
                            <Button onClick={() => setIsAddingService(true)} className="flex items-center space-x-2">
                                <Plus size={16}/>
                                <span>Add Service</span>
                            </Button>
                        )}
                    </div>

                    {isAddingService && <AddServiceForm />}

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                        {services.map((service) => (
                            <ServiceCard key={service.id} service={service} />
                        ))}
                    </div>
                </>
            )}

            {activeTab === 'orders' && <OrdersList />}
            
            {activeTab === 'users' && isAdmin && <UserManagement />}
            
            {activeTab === 'invoices' && <InvoiceManagement />}

            {activeTab === 'support' && <SupportSystem />}

         </div>
      </main>
    </div>
  );
};

export default ClientPortal;