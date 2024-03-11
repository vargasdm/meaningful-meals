import React from "react";
import { createBrowserRouter, Route, RouterProvider, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import LoginContainer from "./components/Login/LoginContainer";
import RegisterContainer from "./components/Register/RegisterContainer";
import Recipe, { loader as recipeLoader } from "./components/Recipe/Recipe";
import SearchContainer from "./components/Search/SearchContainer";
import Error from "./components/Error";
import "./App.css";


// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: (
//       <div className="App">
//         <LoginContainer />
//         <RegisterContainer />
//       </div>
//     ),
//     errorElement: <Error />,
//   },
//   {
//     path: "/recipes/:id",
//     element: <Recipe />,
//     loader: recipeLoader,
//   },
//   // errorElement: <Error />
// ]);

function App() {
  return (
    <>
      <div className="App">
        <Navbar />
        <Routes>
          {/* need to create the search component */}
          <Route path="/" element={<SearchContainer />} />
          <Route path="/login" element={<LoginContainer />} />
          <Route path="/register" element={<RegisterContainer />} />
          <Route path="/recipes/:id" element={<Recipe />} loader={recipeLoader} />
          <Route path="*" element={<Error />} />
        </Routes>
      </div>
      {/* <RouterProvider router={router} /> */}
    </>
  );
}

export default App;
