import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';

const AddWorkerPage = () => {
  const [form, setForm] = useState({ name: '', email: '', role: 'worker' });
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      setForm({ name: '', email: '', role: 'worker' });
    }, 3000);
  };

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-lg font-semibold text-foreground tracking-tight mb-1">Add Worker</h1>
      <p className="text-sm text-muted-foreground mb-6">Provision a new worker account.</p>

      <div className="bg-card rounded-xl p-6 shadow-card">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs uppercase tracking-widest text-muted-foreground mb-1.5 block">Name</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Full name"
              className="w-full bg-secondary/50 border border-border rounded-md px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-gold/50 focus:ring-4 focus:ring-gold/10 outline-none transition-all"
              required
            />
          </div>
          <div>
            <label className="text-xs uppercase tracking-widest text-muted-foreground mb-1.5 block">Email</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="worker@company.com"
              className="w-full bg-secondary/50 border border-border rounded-md px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-gold/50 focus:ring-4 focus:ring-gold/10 outline-none transition-all"
              required
            />
          </div>
          <div>
            <label className="text-xs uppercase tracking-widest text-muted-foreground mb-1.5 block">Role</label>
            <select
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
              className="w-full bg-secondary/50 border border-border rounded-md px-3 py-2.5 text-sm text-foreground focus:border-gold/50 focus:ring-4 focus:ring-gold/10 outline-none transition-all"
            >
              <option value="worker">Worker</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <AnimatePresence mode="wait">
            {success ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ type: 'spring', duration: 0.4, bounce: 0.2 }}
                className="flex items-center gap-2 text-gold text-sm font-medium py-2.5"
              >
                <Check className="w-4 h-4" />
                Worker successfully provisioned.
              </motion.div>
            ) : (
              <motion.button
                key="submit"
                type="submit"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="w-full bg-gold hover:bg-gold-glow text-primary-foreground py-2.5 rounded-md font-semibold text-sm transition-colors duration-200"
              >
                Add Worker
              </motion.button>
            )}
          </AnimatePresence>
        </form>
      </div>
    </div>
  );
};

export default AddWorkerPage;
