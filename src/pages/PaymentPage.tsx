import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, CreditCard } from 'lucide-react';

const PaymentPage = () => {
  const [vendorId, setVendorId] = useState('');
  const [amount, setAmount] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      setVendorId('');
      setAmount('');
    }, 3000);
  };

  const inputClass = "w-full bg-secondary/50 border border-border rounded-md px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-gold/50 focus:ring-4 focus:ring-gold/10 outline-none transition-all";

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-lg font-semibold text-foreground tracking-tight mb-1">Execute Payment</h1>
      <p className="text-sm text-muted-foreground mb-6">Process vendor payment.</p>

      <div className="bg-card rounded-xl p-6 shadow-card">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs uppercase tracking-widest text-muted-foreground mb-1.5 block">Vendor ID</label>
            <input type="text" value={vendorId} onChange={(e) => setVendorId(e.target.value)} placeholder="V-0042" className={inputClass} required />
          </div>

          <div>
            <label className="text-xs uppercase tracking-widest text-muted-foreground mb-1.5 block">Amount</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-lg">₹</span>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className={`${inputClass} pl-8 text-2xl font-mono tabular-nums`}
                required
              />
            </div>
          </div>

          <AnimatePresence mode="wait">
            {success ? (
              <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ type: 'spring', duration: 0.4, bounce: 0.2 }} className="flex items-center gap-2 text-gold text-sm font-medium py-2.5">
                <Check className="w-4 h-4" /> Payment of ₹{amount} executed successfully.
              </motion.div>
            ) : (
              <motion.button
                key="submit"
                type="submit"
                whileHover={{ scale: 1.01, boxShadow: '0 0 20px rgba(212,175,55,0.2)' }}
                whileTap={{ scale: 0.99 }}
                className="w-full bg-gold hover:bg-gold-glow text-primary-foreground py-2.5 rounded-md font-semibold text-sm transition-colors duration-200 flex items-center justify-center gap-2"
              >
                <CreditCard className="w-4 h-4" />
                Execute Payment
              </motion.button>
            )}
          </AnimatePresence>
        </form>
      </div>
    </div>
  );
};

export default PaymentPage;
