import {Component, useState, useEffect} from 'react';
import {Container} from 'react-bootstrap';

import './App.css';
class SliderA extends Component {

    constructor(props) {
        super(props);
        this.state = {
            autoplay: false,
            slide: 0
        }
    }

    componentDidMount() {
        document.title = `Slide: ${this.state.slide}`;
    }

    componentDidUpdate() {
        document.title = `Slide: ${this.state.slide}`;
    }

    changeSlide = (i) => {
        this.setState(({slide}) => ({
            slide: slide + i
        }))
    }

    toggleAutoplay = () => {
        this.setState(({autoplay}) => ({
            autoplay: !autoplay
        }))
    }

    render() {
        return (
            <Container>
                <div className="slider w-50 m-auto">
                    <img className="d-block w-100" src="https://www.planetware.com/wpimages/2020/02/france-in-pictures-beautiful-places-to-photograph-eiffel-tower.jpg" alt="slide" />
                    <div className="text-center mt-5">Active slide {this.state.slide} <br/> {this.state.autoplay ? 'auto' : null}</div>
                    <div className="buttons mt-3">
                        <button 
                            className="btn btn-primary me-2"
                            onClick={() => this.changeSlide(-1)}>-1</button>
                        <button 
                            className="btn btn-primary me-2"
                            onClick={() => this.changeSlide(1)}>+1</button>
                        <button 
                            className="btn btn-primary me-2"
                            onClick={this.toggleAutoplay}>toggle autoplay</button>
                    </div>
                </div>
            </Container>
        )
    }
}


const getSomeImages = () => {
    console.log("fetching");
    return [
        "https://yandex.ru/images/search?pos=0&from=tabbar&img_url=http%3A%2F%2Ffunik.ru%2Fwp-content%2Fuploads%2F2018%2F10%2F17478da42271207e1d86.jpg&text=%D0%BA%D0%BE%D1%82%D0%B8%D0%BA%D0%B8&rpt=simage&lr=10758",
        "https://yandex.ru/images/search?pos=2&from=tabbar&img_url=http%3A%2F%2Fproprikol.ru%2Fwp-content%2Fuploads%2F2020%2F08%2Fkrasivye-kartinki-kotikov-17.jpg&text=%D0%BA%D0%BE%D1%82%D0%B8%D0%BA%D0%B8&rpt=simage&lr=10758"
    ]
}


const Slider = (props) => {

    const [slide, setSlide] = useState(10);
    const [autoplay, setAutoplay] = useState(false);

    function logging() {
        console.log("log!");
    }

    useEffect(() => {//Будет вызываться после маунта, а также после каждого апдейта(заменяем componentDidMount и Update)
        console.log("effect")//Колбек вызывается после каждой перерисовки(даже если изменилось другое состояние а не слайд)
        document.title = `Slide: ${slide}`

        window.addEventListener("click", logging);

        return () => {//аналог componentWillUnmount
            window.removeEventListener("click", logging);
        }

    }, [slide])//Массив зависимостей(если ни одна из них не изменилась, то и не будет вызываться колбек, проблема решена), также, если массив пустой можн эмулировать componentDidMount




    function changeSlide(i) {
        setSlide(slide + i);
    }

    function changeAutoplay(i) {
        setAutoplay(!autoplay);
    }

    return (
        <Container>
            <div className="slider w-50 m-auto">

                {
                    getSomeImages().map((img, i) => {
                        return (
                            <img className="d-block w-100" key={i} src={img} alt="slide" />
                        )
                    })
                }
                <div className="text-center mt-5">Active slide {slide} <br/> {autoplay ? 'auto' : null}</div>
                <div className="buttons mt-3">
                    <button 
                        className="btn btn-primary me-2"
                        onClick={() => changeSlide(-1)}>-1</button>
                    <button 
                        className="btn btn-primary me-2"
                        onClick={() => changeSlide(1)}>+1</button>
                    <button 
                        className="btn btn-primary me-2"
                        onClick={changeAutoplay}>toggle autoplay</button>
                </div>
            </div>
        </Container>
    )
}


function App() {

    const [slider, setSlider] = useState(true);


  return (
    <>
    <button onClick={() => setSlider(false)}>Click</button>
    {slider ? <Slider/> : null}
    </>
  );
}

export default App;
