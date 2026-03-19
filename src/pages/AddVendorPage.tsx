import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';

const AddVendorPage = () => {
  const [form, setForm] = useState({
    vendorName: '', phone: '', email: '', gstin: '', address: '', city: '',
  });
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Invalid email format';
    if (!/^\d{10}$/.test(form.phone)) errs.phone = 'Must be 10 digits';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      setForm({ vendorName: '', phone: '', email: '', gstin: '', address: '', city: '' });
    }, 3000);
  };

  const inputClass = "w-full bg-secondary/50 border border-border rounded-md px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-gold/50 focus:ring-4 focus:ring-gold/10 outline-none transition-all";

  return (
    <div className="max-w-[600px] mx-auto">
      <h1 className="text-lg font-semibold text-foreground tracking-tight mb-1">Add Vendor</h1>
      <p className="text-sm text-muted-foreground mb-6">Register a new vendor in the system.</p>

      <div className="bg-card rounded-xl p-6 shadow-card">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs uppercase tracking-widest text-muted-foreground mb-1.5 block">Vendor Name</label>
            <input type="text" value={form.vendorName} onChange={(e) => setForm({ ...form, vendorName: e.target.value })} placeholder="Acme Corp" className={inputClass} required />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs uppercase tracking-widest text-muted-foreground mb-1.5 block">Phone Number</label>
              <input type="text" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="9876543210" className={inputClass} required />
              {errors.phone && <p className="text-xs text-destructive mt-1">{errors.phone}</p>}
            </div>
            <div>
              <label className="text-xs uppercase tracking-widest text-muted-foreground mb-1.5 block">Email ID</label>
              <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="vendor@company.com" className={inputClass} required />
              {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
            </div>
          </div>

          <div>
            <label className="text-xs uppercase tracking-widest text-muted-foreground mb-1.5 block">
              GSTIN <span className="text-gold">*</span>
            </label>
            <input type="text" value={form.gstin} onChange={(e) => setForm({ ...form, gstin: e.target.value })} placeholder="22AAAAA0000A1Z5" className={`${inputClass} bg-gold/5`} required />
            <p className="text-xs text-muted-foreground mt-1">Required for tax compliance.</p>
          </div>

          <div>
            <label className="text-xs uppercase tracking-widest text-muted-foreground mb-1.5 block">Address</label>
            <input type="text" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} placeholder="Street address" className={inputClass} required />
          </div>

          <div>
            <label className="text-xs uppercase tracking-widest text-muted-foreground mb-1.5 block">City</label>
            <input type="text" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} placeholder="Mumbai" className={inputClass} required />
          </div>

          <AnimatePresence mode="wait">
            {success ? (
              <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ type: 'spring', duration: 0.4, bounce: 0.2 }} className="flex items-center gap-2 text-gold text-sm font-medium py-2.5">
                <Check className="w-4 h-4" /> Vendor successfully added.
              </motion.div>
            ) : (
              <motion.button key="submit" type="submit" whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }} className="w-full bg-gold hover:bg-gold-glow text-primary-foreground py-2.5 rounded-md font-semibold text-sm transition-colors duration-200">
                Add Vendor
              </motion.button>
            )}
          </AnimatePresence>
        </form>
      </div>
    </div>
  );
};

export default AddVendorPage;
