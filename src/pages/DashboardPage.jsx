import { useAuth } from '@/context/AuthContext';
import { Users, Activity, ArrowUpRight } from 'lucide-react';

const vendors = [
  { id: 'V-0012', name: 'Acme Industries', gstin: '27AABCU9603R1ZM', status: 'Paid', contact: 'acme@mail.com' },
  { id: 'V-0023', name: 'Zenith Supplies', gstin: '22AAAAA0000A1Z5', status: 'Pending', contact: '9876543210' },
  { id: 'V-0034', name: 'Nova Traders', gstin: '07BBBBB1111B2Y6', status: 'Paid', contact: 'nova@trade.in' },
  { id: 'V-0042', name: 'Prime Logistics', gstin: '29CCCCC2222C3X7', status: 'Pending', contact: '9123456780' },
  { id: 'V-0051', name: 'Delta Corp', gstin: '33DDDDD3333D4W8', status: 'Paid', contact: 'info@delta.co' },
  { id: 'V-0067', name: 'Spark Electricals', gstin: '06EEEEE4444E5V9', status: 'Pending', contact: '9988776655' },
  { id: 'V-0078', name: 'Global Textiles', gstin: '24FFFFF5555F6U0', status: 'Paid', contact: 'gt@textiles.com' },
];

const StatusBadge = ({ status }) => (
  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
    status === 'Paid'
      ? 'bg-emerald-500/10 text-emerald-400'
      : 'bg-amber-500/10 text-amber-400'
  }`}>
    {status}
  </span>
);

const VendorTable = () => (
  <div className="bg-card rounded-xl shadow-card overflow-hidden">
    <div className="px-6 py-4 border-b border-border">
      <p className="text-xs uppercase tracking-widest text-muted-foreground">Vendor Directory</p>
    </div>
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border">
            <th className="text-left px-6 py-3 text-xs uppercase tracking-widest text-muted-foreground font-medium">ID</th>
            <th className="text-left px-6 py-3 text-xs uppercase tracking-widest text-muted-foreground font-medium">Vendor Name</th>
            <th className="text-left px-6 py-3 text-xs uppercase tracking-widest text-muted-foreground font-medium">GSTIN</th>
            <th className="text-left px-6 py-3 text-xs uppercase tracking-widest text-muted-foreground font-medium">Status</th>
            <th className="text-left px-6 py-3 text-xs uppercase tracking-widest text-muted-foreground font-medium">Contact</th>
          </tr>
        </thead>
        <tbody>
          {vendors.map((v, i) => (
            <tr key={v.id} className="border-b border-border last:border-0 even:bg-[rgba(255,255,255,0.02)] transition-colors hover:bg-surface-hover">
              <td className="px-6 py-3 tabular-nums text-muted-foreground">{v.id}</td>
              <td className="px-6 py-3 text-foreground font-medium">{v.name}</td>
              <td className="px-6 py-3 tabular-nums text-muted-foreground font-mono text-xs">{v.gstin}</td>
              <td className="px-6 py-3"><StatusBadge status={v.status} /></td>
              <td className="px-6 py-3 text-muted-foreground">{v.contact}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const AdminDashboard = () => (
  <div className="space-y-6">
    <div>
      <h1 className="text-lg font-semibold text-foreground tracking-tight">System Overview</h1>
      <p className="text-sm text-muted-foreground mt-1">Monitor your workforce at a glance.</p>
    </div>

    <div className="bg-card rounded-xl p-6 shadow-card">
      <p className="text-xs uppercase tracking-widest text-muted-foreground mb-4">7-Day Worker Activity</p>
      <div className="h-16 flex items-end gap-1">
        {[40, 65, 45, 80, 55, 90, 70].map((val, i) => (
          <div key={i} className="flex-1 flex flex-col justify-end">
            <div className="bg-gold/20 rounded-sm transition-all duration-300" style={{ height: `${val}%` }}>
              <div className="bg-gold rounded-sm w-full transition-all duration-300" style={{ height: '2px' }} />
            </div>
          </div>
        ))}
      </div>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div className="bg-card rounded-xl p-6 shadow-card">
        <div className="flex items-center justify-between mb-3">
          <Users className="w-5 h-5 text-muted-foreground" />
          <ArrowUpRight className="w-4 h-4 text-gold" />
        </div>
        <p className="text-3xl font-semibold text-foreground tabular-nums">124</p>
        <p className="text-sm text-muted-foreground mt-1">Total Workers</p>
      </div>
      <div className="bg-card rounded-xl p-6 shadow-card">
        <div className="flex items-center justify-between mb-3">
          <Activity className="w-5 h-5 text-muted-foreground" />
          <ArrowUpRight className="w-4 h-4 text-gold" />
        </div>
        <p className="text-3xl font-semibold text-foreground tabular-nums">12</p>
        <p className="text-sm text-muted-foreground mt-1">Active Sessions</p>
      </div>
    </div>

    <VendorTable />

    <div className="bg-card rounded-xl p-6 shadow-card">
      <p className="text-xs uppercase tracking-widest text-muted-foreground mb-4">Recent Activity</p>
      <div className="space-y-0">
        {[
          { action: 'Worker "Sarah Chen" provisioned', time: '2 min ago' },
          { action: 'Bulk upload completed — 45 records', time: '15 min ago' },
          { action: 'Payment ₹24,500 to Vendor #V-0042', time: '1 hr ago' },
          { action: 'Worker "Ravi Kumar" role updated', time: '3 hrs ago' },
        ].map((log, i) => (
          <div key={i} className="flex items-center justify-between py-3 border-b border-border last:border-0">
            <span className="text-sm text-foreground">{log.action}</span>
            <span className="text-xs text-muted-foreground tabular-nums">{log.time}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const WorkerDashboard = () => (
  <div className="space-y-6">
    <div>
      <h1 className="text-lg font-semibold text-foreground tracking-tight">Worker Dashboard</h1>
      <p className="text-sm text-muted-foreground mt-1">Quick access to vendor operations.</p>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {[
        { label: 'Vendors Added', value: '38', sub: 'This month' },
        { label: 'CSV Uploads', value: '7', sub: 'Total files' },
        { label: 'Payments Made', value: '₹1.2L', sub: 'This quarter' },
      ].map((card, i) => (
        <div key={i} className="bg-card rounded-xl p-6 shadow-card">
          <p className="text-3xl font-semibold text-foreground tabular-nums">{card.value}</p>
          <p className="text-sm text-muted-foreground mt-1">{card.label}</p>
          <p className="text-xs text-muted-foreground mt-0.5">{card.sub}</p>
        </div>
      ))}
    </div>

    <VendorTable />
  </div>
);

const DashboardPage = () => {
  const { role } = useAuth();
  return role === 'admin' ? <AdminDashboard /> : <WorkerDashboard />;
};

export default DashboardPage;
