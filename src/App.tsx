import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { GameProvider } from "./contexts/GameContext";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import ResetPassword from './pages/ResetPassword';
import "./App.css";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-white text-xl">Carregando...</div>
      </div>
    );
  }
  
  if (!user) {
    return <Navigate to="/auth" replace />;
  }
  
  return <>{children}</>;
};

const AppRoutes = () => {
  const { user, loading } = useAuth();
  const location = useLocation();
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-white text-xl">Carregando...</div>
      </div>
    );
  }
  
  // Nunca redirecionar para a home se estiver em /auth/reset-password ou /reset-password
  const isResetPassword = location.pathname === "/auth/reset-password" || location.pathname === "/reset-password";

  return (
    <Routes>
      <Route 
        path="/auth" 
        element={user && !isResetPassword ? <Navigate to="/" replace /> : <Auth />} 
      />
      <Route
        path="/auth/reset-password"
        element={<ResetPassword />}
      />
      <Route
        path="/reset-password"
        element={<ResetPassword />}
      />
      <Route 
        path="/" 
        element={
          <ProtectedRoute>
            <GameProvider>
              <Index />
            </GameProvider>
          </ProtectedRoute>
        } 
      />
    </Routes>
  );
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
