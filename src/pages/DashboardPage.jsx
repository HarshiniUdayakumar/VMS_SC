import { supabase } from "../lib/supabaseClient";
import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Users, Activity, ArrowUpRight } from 'lucide-react';

const StatusBadge = ({ status }) => (
  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
    status === 'Paid'
      ? 'bg-emerald-500/10 text-emerald-400'
      : 'bg-amber-500/10 text-amber-400'
  }`}>
    {status}
  </span>
);

const VendorTable = () => {
  const [vendors, setVendors] = useState([]);

  useEffect(() => {
    fetchVendors();

    // 🔥 realtime updates
    const channel = supabase
      .channel('vendors-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'vendors' },
        () => fetchVendors()
      )
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, []);

  const fetchVendors = async () => {
    const { data, error } = await supabase
      .from('vendors')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error(error);
      return;
    }

    setVendors(data);
  };

  return (
    <div className="bg-card rounded-xl shadow-card overflow-hidden">
      <div className="px-6 py-4 border-b border-border">
        <p className="text-xs uppercase tracking-widest text-muted-foreground">
          Vendor Directory
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="px-6 py-3 text-left text-xs text-muted-foreground">Name</th>
              <th className="px-6 py-3 text-left text-xs text-muted-foreground">GSTIN</th>
              <th className="px-6 py-3 text-left text-xs text-muted-foreground">Status</th>
              <th className="px-6 py-3 text-left text-xs text-muted-foreground">Contact</th>
            </tr>
          </thead>

          <tbody>
            {vendors.map((v) => (
              <tr key={v.id} className="border-b border-border hover:bg-surface-hover">
                <td className="px-6 py-3 font-medium">{v.name}</td>
                <td className="px-6 py-3 text-xs font-mono">{v.gstin}</td>
                <td className="px-6 py-3">
                  <StatusBadge status={v.status || 'Pending'} />
                </td>
                <td className="px-6 py-3 text-muted-foreground">
                  {v.phone || v.email}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const AdminDashboard = () => {
  const [workerCount, setWorkerCount] = useState(0);
  const [vendorCount, setVendorCount] = useState(0);

  useEffect(() => {
    fetchCounts();
  }, []);

  const fetchCounts = async () => {
    const { count: workers } = await supabase
      .from('users')
      .select('*', { count: 'exact', head: true });

    const { count: vendors } = await supabase
      .from('vendors')
      .select('*', { count: 'exact', head: true });

    setWorkerCount(workers || 0);
    setVendorCount(vendors || 0);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-lg font-semibold">System Overview</h1>
        <p className="text-sm text-muted-foreground">Real-time system data</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-card p-6 rounded-xl shadow-card">
          <Users className="w-5 h-5 mb-2" />
          <p className="text-3xl font-semibold">{workerCount}</p>
          <p className="text-sm text-muted-foreground">Total Workers</p>
        </div>

        <div className="bg-card p-6 rounded-xl shadow-card">
          <Activity className="w-5 h-5 mb-2" />
          <p className="text-3xl font-semibold">{vendorCount}</p>
          <p className="text-sm text-muted-foreground">Total Vendors</p>
        </div>
      </div>

      <VendorTable />
    </div>
  );
};

const WorkerDashboard = () => {
  const [vendorCount, setVendorCount] = useState(0);

  useEffect(() => {
    fetchVendorCount();
  }, []);

  const fetchVendorCount = async () => {
    const { count } = await supabase
      .from('vendors')
      .select('*', { count: 'exact', head: true });

    setVendorCount(count || 0);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-lg font-semibold">Worker Dashboard</h1>
        <p className="text-sm text-muted-foreground">Live vendor data</p>
      </div>

      <div className="bg-card p-6 rounded-xl shadow-card">
        <p className="text-3xl font-semibold">{vendorCount}</p>
        <p className="text-sm text-muted-foreground">Total Vendors</p>
      </div>

      <VendorTable />
    </div>
  );
};

const DashboardPage = () => {
  const { role } = useAuth();

  return role === 'admin'
    ? <AdminDashboard />
    : <WorkerDashboard />;
};

export default DashboardPage;