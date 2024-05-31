import Main from './components/Main'
import { Footer } from './components/Footer'
import Navigate from './components/navigate'
import './App.css';

function App() {
    return (
        <div className="container">
            <Navigate></Navigate>
            <Main></Main>
            <Footer></Footer>
        </div>
    );
}

export default App;