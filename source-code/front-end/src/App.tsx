import Navbar from "./components/Navbar/Navbar";
import { Outlet } from 'react-router-dom';
import "./App.css";


function App() {
	return (
		<>
			<div className="App" >
				<Navbar />
				<main>
					<Outlet />
				</main>
			</div>
		</>
	);
}

export default App;
