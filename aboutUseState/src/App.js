import {Component, useState} from 'react';
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


const Slider = (props) => {

    const [slide, setSlide] = useState(10);
    const [autoplay, setAutoplay] = useState(false);

    const [state, setState] = useState({slide: 0, autoplay: false})

    function changeSlide(i) {
        setSlide(slide => slide + i);

        setState(state => ({
            slide: state.slide + i//заместит полностью все состояние, поэтому редко используют
        }))

        setState(state => ({...state,//так можно, но слишком длинно(но всеже будет требуемое сотсояние)
            slide: state.slide + i
        }))
    }

    function changeAutoplay(i) {
        setAutoplay(autoplay => !autoplay);
    }

    return (
        <Container>
            <div className="slider w-50 m-auto">
                <img className="d-block w-100" src="https://www.planetware.com/wpimages/2020/02/france-in-pictures-beautiful-places-to-photograph-eiffel-tower.jpg" alt="slide" />
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
  return (
        <Slider/>
  );
}

export default App;
