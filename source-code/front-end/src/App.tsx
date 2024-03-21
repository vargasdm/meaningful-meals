import CustomNavbar from "./components/Navbar/Navbar";
import { Outlet } from 'react-router-dom';
import "./App.css";


function App() {
	return (
		<>
			<div className="App" >
				<CustomNavbar />
				<main>
					<Outlet />
				</main>
			</div>
		</>
	);
}

export default App;
