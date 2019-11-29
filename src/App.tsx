import * as React from 'react'
import { Calil, options } from './Calil'
import { NDL } from './NDL'
export { View }

class Button extends React.Component<{ value: string, name: string }> {
    private log = (): void => {
        console.log(this.props.name)
        console.log(process.env.NODE_ENV)
    }

    getTopStoryJSON = async (): Promise<any> => {
        const HKN_TOP_URL: string = 'https://hacker-news.firebaseio.com/v0/topstories.json'
        let response: any = await fetch(HKN_TOP_URL)

        //
        let o: options = {
            'appkey': process.env.APP_API_KEY,
            'isbn': [111],
            'systemid': [111]
        }
        console.log(`o: ${JSON.stringify(o)}`)
        let c: Calil = new Calil(o)
        c.search()
        //
        let n: NDL = new NDL()
        n.search()
        //

        return response.json()
    }

    jsonValid = async (): Promise<any> => {
        let json: any = await this.getTopStoryJSON()
        console.log(json)
        console.log(typeof (json))
    }

    render() {
        return (
            <ul>
                <li><button onClick={this.log}>{this.props.value}</button></li>
                <li><button onClick={this.jsonValid}>JSON</button></li>
            </ul>
        )
    }
}

class Card extends React.Component<{ name: string }>{
    render() {
        return (
            <ul>
                <li>{this.props.name}</li>
                <Button value="OK" name={this.props.name} />
            </ul>
        )
    }
}

class View extends React.Component {
    render() {
        return (
            <div>
                <Card name="Taro" />
                <Card name="Alex" />
                <Card name="Bob" />
            </div>
        )
    }
}


const App: React.FC = () => {
    return (
        <div className="App">
            <header className="App-header">
                {/* <img src={logo} className="App-logo" alt="logo" /> */}
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