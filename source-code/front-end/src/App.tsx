import CustomNavbar from "./components/Navbar/Navbar";
import { Outlet } from 'react-router-dom';
import "./App.css";


function App() {
	return (
		<>
			<div className="App" >
<<<<<<< HEAD
				<CustomNavbar />
=======
				<Navbar />
>>>>>>> ef5e4a0ec591fc053043cac237b53fedca36fa77
				<main>
					<Outlet />
				</main>
			</div>
		</>
	);
}

export default App;
