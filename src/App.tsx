import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import AddWorkerPage from "./pages/AddWorkerPage";
import AddVendorPage from "./pages/AddVendorPage";
import BulkUploadPage from "./pages/BulkUploadPage";
import PaymentPage from "./pages/PaymentPage";
import DashboardLayout from "./components/DashboardLayout";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children, allowedRole }: { children: React.ReactNode; allowedRole?: 'admin' | 'worker' }) => {
  const { isLoggedIn, role } = useAuth();
  if (!isLoggedIn) return <Navigate to="/" replace />;
  if (allowedRole && role !== allowedRole) return <Navigate to="/dashboard" replace />;
  return <DashboardLayout>{children}</DashboardLayout>;
};

const AppRoutes = () => {
  const { isLoggedIn } = useAuth();

  return (
    <Routes>
      <Route path="/" element={isLoggedIn ? <Navigate to="/dashboard" replace /> : <LoginPage />} />
      <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
      <Route path="/add-worker" element={<ProtectedRoute allowedRole="admin"><AddWorkerPage /></ProtectedRoute>} />
      <Route path="/add-vendor" element={<ProtectedRoute allowedRole="worker"><AddVendorPage /></ProtectedRoute>} />
      <Route path="/bulk-upload" element={<ProtectedRoute allowedRole="worker"><BulkUploadPage /></ProtectedRoute>} />
      <Route path="/payment" element={<ProtectedRoute allowedRole="worker"><PaymentPage /></ProtectedRoute>} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
