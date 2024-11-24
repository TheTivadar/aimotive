
import About from "./components/About";
import Charts from "./components/AreaChart";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import NavBar from "./components/Navbar";



function App() {
  return (
    <main className="relative min-h-screen w-screen overflow-x-hidden">
      <NavBar />
      <Hero />
      <About />
      <Charts />
      <Contact />
      <Footer />
    </main>
  );
}

export default App;
