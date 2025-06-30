
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
  const location = useLocation();
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-white text-xl">Carregando...</div>
      </div>
    );
  }
  
  // Se estiver na página de redefinir senha, não redirecionar
  const isResetPasswordPage = location.pathname === "/reset-password" || location.pathname === "/auth/reset-password";
  
  if (!user && !isResetPasswordPage) {
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
  
  // Verificar se está em uma página de redefinição de senha
  const isResetPassword = location.pathname === "/auth/reset-password" || location.pathname === "/reset-password";
  
  // Verificar se tem parâmetros de redefinição de senha na URL
  const hasResetParams = location.hash.includes('access_token') && location.hash.includes('type=recovery');

  return (
    <Routes>
      <Route 
        path="/auth" 
        element={user && !isResetPassword && !hasResetParams ? <Navigate to="/" replace /> : <Auth />} 
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
          hasResetParams ? (
            <Navigate to="/reset-password" replace />
          ) : (
            <ProtectedRoute>
              <GameProvider>
                <Index />
              </GameProvider>
            </ProtectedRoute>
          )
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
