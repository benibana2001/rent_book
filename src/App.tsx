import React from 'react';
import { Calil, options } from './Calil'
import logo from './logo.svg';
import './App.css';

const App: React.FC = () => {
    console.log(`process.env.NODE_ENV is: ${process.env.NODE_ENV}`)
    console.log(`REACT_APP_API_KEY is: ${process.env.REACT_APP_API_KEY}`);

    (async () => {
        let o: options = {
            'appkey': process.env.REACT_APP_API_KEY as string,
            'isbn': [111],
            'systemid': [111]
        }
        // 
        let c: Calil = new Calil(o)
        c.search()
    })()

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>Edit <code>src/App.tsx</code> and save to reload.</p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
            </header>
        </div>
    );
}



export default App;
