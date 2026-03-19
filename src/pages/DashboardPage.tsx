import { useAuth } from '@/context/AuthContext';
import { Users, Activity, ArrowUpRight } from 'lucide-react';

const AdminDashboard = () => {
  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-lg font-semibold text-foreground tracking-tight">System Overview</h1>
        <p className="text-sm text-muted-foreground mt-1">Monitor your workforce at a glance.</p>
      </div>

      {/* Sparkline Card */}
      <div className="bg-card rounded-xl p-6 shadow-card">
        <p className="text-xs uppercase tracking-widest text-muted-foreground mb-4">7-Day Worker Activity</p>
        <div className="h-16 flex items-end gap-1">
          {[40, 65, 45, 80, 55, 90, 70].map((val, i) => (
            <div key={i} className="flex-1 flex flex-col justify-end">
              <div
                className="bg-gold/20 rounded-sm transition-all duration-300"
                style={{ height: `${val}%` }}
              >
                <div
                  className="bg-gold rounded-sm w-full transition-all duration-300"
                  style={{ height: '2px' }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Metric Cards */}
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

      {/* Audit Log */}
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
};

const WorkerDashboard = () => {
  return (
    <div className="space-y-6 max-w-4xl">
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
    </div>
  );
};

const DashboardPage = () => {
  const { role } = useAuth();
  return role === 'admin' ? <AdminDashboard /> : <WorkerDashboard />;
};

export default DashboardPage;
