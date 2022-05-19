import { About, Skills, Testimonials, Work, Footer } from "./container";
import { Header, Navbar } from "./layout";

import "./App.scss";

const App = () => {
	return (
		<div className="app">
			<Navbar />
			<Header />
			<About />
			<Work />
			<Skills />
			<Testimonials />
			<Footer />
		</div>
	);
};

export default App;
