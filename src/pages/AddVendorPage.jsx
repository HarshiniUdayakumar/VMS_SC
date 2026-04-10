import { supabase } from "../lib/supabaseClient"
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';

const AddVendorPage = () => {
  const [form, setForm] = useState({ name: '', phone: '', email: '', gstin: '', address: '', city: '' });
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Invalid email format';
    if (!/^\d{10}$/.test(form.phone)) errs.phone = 'Must be 10 digits';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  if (!validate()) return;

  const { data, error } = await supabase
    .from('vendors')
    .insert([form]);

  if (error) {
    console.error(error);
    alert("Error adding vendor");
    return;
  }

  setSuccess(true);

  setTimeout(() => {
    setSuccess(false);
    setForm({ name: '', phone: '', email: '', gstin: '', address: '', city: '' });
  }, 3000);
};

  const inputClass = "w-full bg-secondary/50 border border-border rounded-md px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-gold/50 focus:ring-4 focus:ring-gold/10 outline-none transition-all";

  const fields = [
    { key: 'name', label: 'Vendor Name', type: 'text', placeholder: 'Acme Industries' },
    { key: 'phone', label: 'Phone Number', type: 'tel', placeholder: '9876543210' },
    { key: 'email', label: 'Email ID', type: 'email', placeholder: 'vendor@company.com' },
    { key: 'gstin', label: 'GSTIN', type: 'text', placeholder: '22AAAAA0000A1Z5', highlight: true },
    { key: 'address', label: 'Address', type: 'text', placeholder: '123, Industrial Area' },
    { key: 'city', label: 'City', type: 'text', placeholder: 'Mumbai' },
  ];

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-lg font-semibold text-foreground tracking-tight mb-1">Add Vendor</h1>
      <p className="text-sm text-muted-foreground mb-6">Register a new vendor in the system.</p>

      <div className="bg-card rounded-xl p-6 shadow-card">
        <form onSubmit={handleSubmit} className="space-y-4">
          {fields.map((f) => (
            <div key={f.key}>
              <label className={`text-xs uppercase tracking-widest mb-1.5 block ${f.highlight ? 'text-gold' : 'text-muted-foreground'}`}>
                {f.label}
                {f.key === 'gstin' && <span className="ml-1 normal-case tracking-normal text-muted-foreground">(15-char alphanumeric)</span>}
              </label>
              <input
                type={f.type}
                value={form[f.key]}
                onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                placeholder={f.placeholder}
                className={`${inputClass} ${f.highlight ? 'border-gold/30' : ''}`}
                required
              />
              {errors[f.key] && <p className="text-xs text-destructive mt-1">{errors[f.key]}</p>}
            </div>
          ))}

          <AnimatePresence mode="wait">
            {success ? (
              <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ type: 'spring', duration: 0.4, bounce: 0.2 }} className="flex items-center gap-2 text-gold text-sm font-medium py-2.5">
                <Check className="w-4 h-4" /> Vendor added successfully.
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
