import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import SinglePage from "./pages/SinglePage";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import UserProfile from "./pages/UserProfile";
import NotFoundPage from "./pages/NotFoundPage";
import ProtectedRoute from "./components/ProtectedRoute";
import AddTattoo from "./pages/admin/AddTattoo";
import AdminLayout from "./pages/admin/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import { Toaster } from "react-hot-toast";
import TattooPlaces from "./pages/admin/TattooPlaces";
import ShowMyBookings from "./pages/ShowMyBookings";
import ProtectedUser from "./components/ProtectedUser";
import FacilitiesPage from "./pages/FacilitiesPage";
import AboutPage from "./pages/About";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/facilities" element={<FacilitiesPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/tattoo/:tattooId" element={<SinglePage />} />
          <Route path="/user" element={<ProtectedUser />}>
            <Route path="profile/:userId" element={<UserProfile />} />
            <Route path="my-bookings" element={<ShowMyBookings />} />
          </Route>

          {/* admin routes  */}
          <Route path="/admin" element={<ProtectedRoute />}>
            <Route element={<AdminLayout />}>
              <Route path="" element={<Dashboard />} />
              <Route path="add-tattoo" element={<AddTattoo />} />
              <Route path="get-tattoo" element={<TattooPlaces />} />
            </Route>
          </Route>
        </Routes>
        <Toaster />
      </Router>
    </>
  );
};

export default App;
