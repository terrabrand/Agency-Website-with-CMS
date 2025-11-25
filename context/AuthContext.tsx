import React, { createContext, useContext, useState, useEffect } from 'react';

// Mock Data Types
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'client';
  password?: string; // Optional for storage, though security-wise this is just a demo
}

export interface Service {
  id: string;
  title: string;
  price: string;
  icon: string;
  tag: string;
  description: string;
}

export interface Order {
  id: string;
  serviceId: string;
  serviceTitle: string;
  price: string;
  date: string;
  status: 'Pending' | 'Active' | 'Completed';
  userId: string;
}

export interface Invoice {
  id: string;
  userId: string;
  userName: string;
  title: string;
  amount: string;
  date: string;
  dueDate: string;
  status: 'Pending' | 'Paid';
}

export interface TicketMessage {
  id: string;
  senderId: string;
  senderName: string;
  message: string;
  attachment?: string; // Base64 string for image
  timestamp: string;
}

export interface Ticket {
  id: string;
  userId: string;
  userName: string;
  serviceId: string; // 'others' or actual service ID
  serviceName: string;
  subject: string;
  status: 'Open' | 'Answered' | 'Closed';
  lastUpdated: string;
  messages: TicketMessage[];
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
  
  // Service Methods
  services: Service[];
  addService: (service: Omit<Service, 'id'>) => void;
  deleteService: (id: string) => void;
  
  // Order Methods
  orders: Order[];
  placeOrder: (service: Service) => void;
  
  // User Management Methods
  users: User[];
  addUser: (user: Omit<User, 'id'>) => void;
  updateUser: (id: string, data: Partial<User>) => void;
  deleteUser: (id: string) => void;

  // Invoice Methods
  invoices: Invoice[];
  createInvoice: (invoice: Omit<Invoice, 'id' | 'status' | 'userName'>) => void;
  payInvoice: (id: string) => void;

  // Support Methods
  tickets: Ticket[];
  createTicket: (data: { serviceId: string, subject: string, message: string, attachment?: File }) => Promise<void>;
  replyToTicket: (ticketId: string, message: string, attachment?: File) => Promise<void>;
  closeTicket: (ticketId: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Initial Mock Data
const INITIAL_SERVICES: Service[] = [
  { id: '1', title: "Logo Design", price: "500,000 TZS", icon: "🎨", tag: "Design", description: "Professional brand identity" },
  { id: '2', title: "Social Media Management", price: "800,000 TZS/month", icon: "🔗", tag: "Marketing", description: "Full account management" },
  { id: '3', title: "Website Creation", price: "2,000,000 TZS", icon: "🌐", tag: "Development", description: "Responsive website design" },
  { id: '4', title: "WhatsApp API Automation", price: "Custom", icon: "💬", tag: "Technology", description: "Automated customer support" },
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [services, setServices] = useState<Service[]>(INITIAL_SERVICES);
  const [orders, setOrders] = useState<Order[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [tickets, setTickets] = useState<Ticket[]>([]);

  useEffect(() => {
    // Check for persisted current user
    const storedUser = localStorage.getItem('ric_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    
    // Load services
    const storedServices = localStorage.getItem('ric_services');
    if (storedServices) setServices(JSON.parse(storedServices));

    // Load orders
    const storedOrders = localStorage.getItem('ric_orders');
    if (storedOrders) setOrders(JSON.parse(storedOrders));

    // Load invoices
    const storedInvoices = localStorage.getItem('ric_invoices');
    if (storedInvoices) setInvoices(JSON.parse(storedInvoices));

    // Load tickets
    const storedTickets = localStorage.getItem('ric_tickets');
    if (storedTickets) setTickets(JSON.parse(storedTickets));

    // Load all users (mock database)
    const storedUsers = localStorage.getItem('ric_users_db');
    if (storedUsers) {
        setUsers(JSON.parse(storedUsers));
    } else {
        // Initialize with default admin if empty
        const defaultAdmin: User = { id: 'admin', name: 'RIC Admin', email: 'admin@rictanzania.co.tz', role: 'admin', password: 'admin123' };
        setUsers([defaultAdmin]);
        localStorage.setItem('ric_users_db', JSON.stringify([defaultAdmin]));
    }

    setIsLoading(false);
  }, []);

  // Sync data to local storage whenever state changes
  useEffect(() => {
    if (services !== INITIAL_SERVICES) localStorage.setItem('ric_services', JSON.stringify(services));
  }, [services]);

  useEffect(() => {
    localStorage.setItem('ric_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    if (users.length > 0) localStorage.setItem('ric_users_db', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem('ric_invoices', JSON.stringify(invoices));
  }, [invoices]);

  useEffect(() => {
    localStorage.setItem('ric_tickets', JSON.stringify(tickets));
  }, [tickets]);

  // Helper to convert file to base64
  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  // Auth Logic
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 800));

    // Find in users state
    const foundUser = users.find(u => u.email === email && (u.password === password || u.id === 'admin')); // admin bypass for demo if needed, but password check is better

    if (foundUser && foundUser.password === password) {
      // Don't store password in current user session
      const { password, ...sessionUser } = foundUser; 
      setUser(sessionUser as User);
      localStorage.setItem('ric_user', JSON.stringify(sessionUser));
      setIsLoading(false);
      return true;
    }

    setIsLoading(false);
    return false;
  };

  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 800));

    const newUser: User = { id: Date.now().toString(), name, email, password, role: 'client' };
    
    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);

    // Auto login
    const { password: _, ...sessionUser } = newUser;
    setUser(sessionUser as User);
    localStorage.setItem('ric_user', JSON.stringify(sessionUser));
    
    setIsLoading(false);
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('ric_user');
  };

  // Service Logic
  const addService = (serviceData: Omit<Service, 'id'>) => {
    const newService = { ...serviceData, id: Date.now().toString() };
    setServices([...services, newService]);
  };

  const deleteService = (id: string) => {
    setServices(services.filter(s => s.id !== id));
  };

  // Order Logic
  const placeOrder = (service: Service) => {
    if (!user) return;
    const newOrder: Order = {
      id: Date.now().toString(),
      serviceId: service.id,
      serviceTitle: service.title,
      price: service.price,
      date: new Date().toLocaleDateString(),
      status: 'Pending',
      userId: user.id
    };
    setOrders([...orders, newOrder]);
  };

  // User Management Logic
  const addUser = (userData: Omit<User, 'id'>) => {
    const newUser = { ...userData, id: Date.now().toString() };
    setUsers([...users, newUser]);
  };

  const updateUser = (id: string, data: Partial<User>) => {
    setUsers(users.map(u => u.id === id ? { ...u, ...data } : u));
  };

  const deleteUser = (id: string) => {
    setUsers(users.filter(u => u.id !== id));
  };

  // Invoice Logic
  const createInvoice = (invoiceData: Omit<Invoice, 'id' | 'status' | 'userName'>) => {
    const targetUser = users.find(u => u.id === invoiceData.userId);
    const newInvoice: Invoice = {
      ...invoiceData,
      id: Date.now().toString(),
      userName: targetUser ? targetUser.name : 'Unknown',
      status: 'Pending'
    };
    setInvoices([...invoices, newInvoice]);
  };

  const payInvoice = (id: string) => {
    setInvoices(invoices.map(inv => inv.id === id ? { ...inv, status: 'Paid' } : inv));
  };

  // Support Ticket Logic
  const createTicket = async (data: { serviceId: string, subject: string, message: string, attachment?: File }) => {
    if (!user) return;

    let attachmentBase64 = undefined;
    if (data.attachment) {
      try {
        attachmentBase64 = await fileToBase64(data.attachment);
      } catch (e) {
        console.error("Error converting file", e);
      }
    }

    const serviceName = data.serviceId === 'others' 
      ? 'General / Others' 
      : services.find(s => s.id === data.serviceId)?.title || 'Unknown Service';

    const newTicket: Ticket = {
      id: Date.now().toString(),
      userId: user.id,
      userName: user.name,
      serviceId: data.serviceId,
      serviceName,
      subject: data.subject,
      status: 'Open',
      lastUpdated: new Date().toLocaleString(),
      messages: [{
        id: Date.now().toString(),
        senderId: user.id,
        senderName: user.name,
        message: data.message,
        attachment: attachmentBase64,
        timestamp: new Date().toLocaleString()
      }]
    };
    setTickets([newTicket, ...tickets]);
  };

  const replyToTicket = async (ticketId: string, message: string, attachment?: File) => {
    if (!user) return;

    let attachmentBase64 = undefined;
    if (attachment) {
      try {
        attachmentBase64 = await fileToBase64(attachment);
      } catch (e) {
        console.error("Error converting file", e);
      }
    }

    const newMessage: TicketMessage = {
      id: Date.now().toString(),
      senderId: user.id,
      senderName: user.name,
      message,
      attachment: attachmentBase64,
      timestamp: new Date().toLocaleString()
    };

    setTickets(tickets.map(t => {
      if (t.id === ticketId) {
        return {
          ...t,
          status: user.role === 'admin' ? 'Answered' : 'Open',
          lastUpdated: new Date().toLocaleString(),
          messages: [...t.messages, newMessage]
        };
      }
      return t;
    }));
  };

  const closeTicket = (ticketId: string) => {
    setTickets(tickets.map(t => t.id === ticketId ? { ...t, status: 'Closed' } : t));
  };

  return (
    <AuthContext.Provider value={{ 
      user, login, register, logout, isLoading,
      services, addService, deleteService,
      orders, placeOrder,
      users, addUser, updateUser, deleteUser,
      invoices, createInvoice, payInvoice,
      tickets, createTicket, replyToTicket, closeTicket
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};