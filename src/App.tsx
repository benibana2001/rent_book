import React from 'react';
import logo from './logo.svg';
import './App.css';

const App: React.FC = () => {
    console.log(`process.env.NODE_ENV is: ${process.env.NODE_ENV}`)
    console.log(`REACT_APP_API_KEY is: ${process.env.REACT_APP_API_KEY}`)
    getData()
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                    Edit <code>src/App.tsx</code> and save to reload.
        </p>
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

let getData = async (): Promise<any> => {
    // TODO: Return value is possible to be JSONP, so that using XMLHttpRequest might be better way.
    // let url: string = 'https://api.calil.jp/library?appkey=' + process.env.REACT_APP_API_KEY + '&geocode=136.7163027,35.390516&limit=10'
    let url: string = 'https://api.calil.jp/library?appkey=46a2412f4ceb07b72a251150f2533c74&geocode=136.7163027,35.390516&limit=10'
    // let url: string = 'https://hacker-news.firebaseio.com/v0/topstories.json'
    console.log(url)
    let response: any = await fetch(url, {
        method: "GET",
        mode: "cors",
        credentials: "include"
    })
    console.log(response)
    return response
}

export default App;
