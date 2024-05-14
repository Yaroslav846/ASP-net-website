import Main from './Components/Main'
import Footer from './Components/Footer'
import Header from './Components/Header'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
    return (
        <div className="container">
            <Header></Header>
            <Main></Main>
            <Footer></Footer>
        </div>
    );
}

export default App;