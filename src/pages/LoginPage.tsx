import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import { Shield, Briefcase, LogIn } from 'lucide-react';

type Role = 'admin' | 'worker';

const LoginPage = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<Role>('admin');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      login(email, password, role);
    }
  };

  return (
    <div className="min-h-svh flex items-center justify-center bg-background">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', duration: 0.6, bounce: 0 }}
        className="w-[380px] rounded-xl p-8 bg-card shadow-card"
      >
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gold/10 mb-4">
            <Shield className="w-6 h-6 text-gold" />
          </div>
          <h1 className="text-xl font-semibold text-foreground tracking-tight">Vendor Management</h1>
          <p className="text-sm text-muted-foreground mt-1">Sign in to your account</p>
        </div>

        {/* Role Selector */}
        <div className="bg-secondary/50 p-1 rounded-lg flex mb-6">
          {(['admin', 'worker'] as Role[]).map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setRole(r)}
              className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                role === r
                  ? 'bg-surface-hover text-gold shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {r === 'admin' ? <Shield className="w-4 h-4" /> : <Briefcase className="w-4 h-4" />}
              <span className="capitalize">{r}</span>
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs uppercase tracking-widest text-muted-foreground mb-1.5 block">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@company.com"
              className="w-full bg-secondary/50 border border-border rounded-md px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-gold/50 focus:ring-4 focus:ring-gold/10 outline-none transition-all"
              required
            />
          </div>
          <div>
            <label className="text-xs uppercase tracking-widest text-muted-foreground mb-1.5 block">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-secondary/50 border border-border rounded-md px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-gold/50 focus:ring-4 focus:ring-gold/10 outline-none transition-all"
              required
            />
          </div>
          <motion.button
            type="submit"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className="w-full bg-gold hover:bg-gold-glow text-primary-foreground py-2.5 rounded-md font-semibold text-sm transition-colors duration-200 flex items-center justify-center gap-2 mt-2"
          >
            <LogIn className="w-4 h-4" />
            Sign In as {role === 'admin' ? 'Admin' : 'Worker'}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default LoginPage;
