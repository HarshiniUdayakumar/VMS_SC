import { useAuth } from '@/context/AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  LayoutDashboard, UserPlus, LogOut, Store, Upload, CreditCard,
} from 'lucide-react';

const adminNav = [
  { title: 'Overview', path: '/dashboard', icon: LayoutDashboard },
  { title: 'Add Worker', path: '/add-worker', icon: UserPlus },
];

const workerNav = [
  { title: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { title: 'Add Vendor', path: '/add-vendor', icon: Store },
  { title: 'Bulk Upload', path: '/bulk-upload', icon: Upload },
  { title: 'Payment', path: '/payment', icon: CreditCard },
];

const DashboardLayout = ({ children }) => {
  const { role, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const navItems = role === 'admin' ? adminNav : workerNav;

  return (
    <div className="min-h-svh flex bg-background">
      <aside className="w-60 flex-shrink-0 bg-sidebar border-r border-sidebar-border flex flex-col">
        <div className="px-5 py-5 border-b border-sidebar-border">
          <h2 className="text-sm font-semibold text-foreground tracking-tight">VMS</h2>
          <p className="text-xs text-muted-foreground mt-0.5 capitalize">{role} Panel</p>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <motion.button
                key={item.path}
                onClick={() => navigate(item.path)}
                whileHover={{ x: 4 }}
                transition={{ type: 'spring', duration: 0.3, bounce: 0 }}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 relative ${
                  isActive
                    ? 'text-gold bg-gold/10'
                    : 'text-muted-foreground hover:text-foreground hover:bg-surface-hover'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="active-pill"
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-[2px] h-4 bg-gold rounded-full"
                  />
                )}
                <item.icon className="w-[18px] h-[18px]" />
                <span>{item.title}</span>
              </motion.button>
            );
          })}
        </nav>

        <div className="px-3 py-4 border-t border-sidebar-border">
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-surface-hover transition-all duration-200"
          >
            <LogOut className="w-[18px] h-[18px]" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col min-h-svh">
        <header className="h-12 flex items-center px-6 border-b border-border">
          <span className="text-xs uppercase tracking-widest text-muted-foreground">
            {navItems.find(n => n.path === location.pathname)?.title || 'Dashboard'}
          </span>
        </header>
        <div className="flex-1 p-6 overflow-auto">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', duration: 0.4, bounce: 0 }}
          >
            {children}
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
