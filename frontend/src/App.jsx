import { BrowserRouter, Routes, Route } from "react-router-dom"
import ProtectedRoute from "./components/ProtectedRoute"
import { AuthProvider } from "./context/auth.context"
import Signin from "./pages/Signin"
import Signup from "./pages/Signup"
import Unauthorized from "./pages/Unauthorized"
import AdminDashboard from "./pages/admin/AdminDashboard"
import NotFound from "./pages/NotFound"
import UserDashboard from "./pages/user/UserDashboard"

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/sign-in" element={<Signin />} />
          <Route path="/sign-up" element={<Signup />} />
          <Route path="/unauthorized" element={<Unauthorized />} />

          <Route 
            path="/admin/*" 
            element={
              <ProtectedRoute roles={["admin"]}>
                <Routes>
                  <Route path="/" element={<AdminDashboard />} />
                </Routes> 
              </ProtectedRoute>
            } 
          />

          <Route
            path="/user/*"
            element={
              <ProtectedRoute roles={["user"]}>
                <Routes>
                  <Route path="/" element={<UserDashboard />} />
                </Routes>
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
