import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import MoviePage from "./pages/MoviePage";
import GenrePage from "./pages/GenrePage";
import NoPage from "./pages/NoPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import SearchResultsPage from "./pages/SearchResultsPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import LikedMoviesPage from "./pages/LikedMoviesPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/movie/:movieId" element={<MoviePage />} />
          <Route path="/genre/:genreId" element={<GenrePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/search/:query" element={<SearchResultsPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/liked-movies" element={<LikedMoviesPage />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
