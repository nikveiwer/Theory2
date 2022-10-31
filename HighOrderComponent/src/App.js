import {useState, useEffect} from 'react';
import {Container} from 'react-bootstrap';
import './App.css';



const withSlider = (BaseComponent, getData) => {

    return (props) => {
        const [slide, setSlide] = useState(0);
        const [autoplay, setAutoplay] = useState(false)
    
        useEffect(() => {
            setSlide(getData());
        }, [])
    
        function changeSlide(i) {
            setSlide(slide => slide + i);
        }

        return <BaseComponent
                    {...props} 
                    slide={slide} 
                    autoplay={autoplay} 
                    changeSlide={changeSlide} 
                    setAutoplay={setAutoplay}/>
    
    }

}

const getDataFromFirstFetch = () => {return 10};
const getDataFromSecondFetch = () => {return 20};

const SliderFirst = (props) => {
    // const [slide, setSlide] = useState(0);

    // useEffect(() => {
    //     setSlide(getDataFromFirstFetch());
    // }, [])

    // function changeSlide(i) {
    //     setSlide(slide => slide + i);
    // }

    return (
        <Container>
            <div className="slider w-50 m-auto">
                <img className="d-block w-100" src="https://www.planetware.com/wpimages/2020/02/france-in-pictures-beautiful-places-to-photograph-eiffel-tower.jpg" alt="slide" />
                <div className="text-center mt-5">Active slide {props.slide}</div>
                <div className="buttons mt-3">
                    <button 
                        className="btn btn-primary me-2"
                        onClick={() => props.changeSlide(-1)}>-1</button>
                    <button 
                        className="btn btn-primary me-2"
                        onClick={() => props.changeSlide(1)}>+1</button>
                </div>
            </div>
        </Container>
    )
}

const SliderSecond = (props) => {
    // const [slide, setSlide] = useState(0);
    // const [autoplay, setAutoplay] = useState(false)

    // useEffect(() => {
    //     setSlide(getDataFromSecondFetch());
    // }, [])

    // function changeSlide(i) {
    //     setSlide(slide => slide + i);
    // }

    return (
        <Container>
            <div className="slider w-50 m-auto">
                <img className="d-block w-100" src="https://www.planetware.com/wpimages/2020/02/france-in-pictures-beautiful-places-to-photograph-eiffel-tower.jpg" alt="slide" />
                <div className="text-center mt-5">Active slide {props.slide} <br/>{props.autoplay ? 'auto' : null} </div>
                <div className="buttons mt-3">
                    <button 
                        className="btn btn-primary me-2"
                        onClick={() => props.changeSlide(-1)}>-1</button>
                    <button 
                        className="btn btn-primary me-2"
                        onClick={() => props.changeSlide(1)}>+1</button>
                    <button 
                        className="btn btn-primary me-2"
                        onClick={() => props.setAutoplay(autoplay => !props.autoplay)}>toggle autoplay</button>
                </div>
            </div>
        </Container>
    )
}

const SliderWithFirstFetch = withSlider(SliderFirst, getDataFromFirstFetch)
const SliderWithSecondFetch = withSlider(SliderSecond, getDataFromSecondFetch)

const withLogger = WrappedComponent => props => {

    useEffect(() => {
        console.log("first render");
    }, [])


    return <WrappedComponent {...props} />
}

const Hello = () => {
    return (
        <h1>Hello</h1>
    )
}

const HelloWithLogger = withLogger(Hello);

function App() {
    return (
        <>
            <HelloWithLogger></HelloWithLogger>
            <SliderWithFirstFetch></SliderWithFirstFetch>
            <SliderWithSecondFetch></SliderWithSecondFetch>
        </>
    );
}

// Правила использования:
// Не надо использовать, когда нужно передать много пропсов в возвращаемый компонент
// Если только один компонент подходит под HOC, то не стоит использовать
// Если каждый раз модифицируем, то тоже не нужно использовать

// Нужно использовать, когда логическая часть(поведение) подходит для многих других компонентов
// Когда необходимо добавить общее поведение для множества компонентов

export default App;
