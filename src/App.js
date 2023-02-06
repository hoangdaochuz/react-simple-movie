import { Fragment, lazy, Suspense } from "react";
import "swiper/scss"
import "swiper/scss/autoplay"
import { Route, Routes } from "react-router-dom";
import Main from "./components/layout/Main";
// import HomePage from "./components/pages/HomePage";
// import MoviePage from "./components/pages/MoviePage";
// import MovieDetail from "./components/pages/MovieDetail";

const HomePage = lazy(()=> import("./components/pages/HomePage"))
const MoviePage = lazy(()=> import("./components/pages/MoviePage"))
const MoviePageV2 = lazy(()=> import("./components/pages/MoviePageV2"))
const MovieDetail = lazy(()=> import("./components/pages/MovieDetail"))
function App() {
  return <Fragment>
    <Suspense fallback={<></>}>
      <Routes>
        <Route path="/" element={<Main></Main>}>
          <Route path="/" element={<HomePage></HomePage>}></Route>
          {/* <Route path="/movies" element={<MoviePage></MoviePage>}></Route> */}
          <Route path="/movies" element={<MoviePageV2></MoviePageV2>}></Route>
          <Route path="/movie/:movieId" element={<MovieDetail></MovieDetail>}></Route>
        </Route>
      </Routes>
    </Suspense>
    
    
  </Fragment>;
}

export default App;
