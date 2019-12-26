import * as React from 'react'
import img01 from '../../img/app_Home.png'
import './figure_guide.scss'

export { FigureGuide }
class FigureGuide extends React.Component{
    componentDidMount(){
        this.displayImg()
    }
    displayImg(){
        let elem: HTMLImageElement = document.createElement('img')
        let parent: HTMLElement = document.getElementById('figureHome')
        elem.src = img01
        parent.appendChild(elem)
    }
    render(){
        return(
            <div className="figureGuide">
                <div className="guideHome">
                    {/* Guide Comment */}
                    上のどちらかを使って蔵書情報を調べよう
                </div>

                <figure id="figureHome">
                    {/* Image */}
                </figure>

            </div>
        )
    }
}