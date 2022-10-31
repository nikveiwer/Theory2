import {Component, useState, useReducer} from 'react';
import {Container} from 'react-bootstrap';

import './App.css';

function reducer (state, action) {
    switch (action.type) {//При изменении состояния в переменную autoplay будет приходить именно такой объект, который возвращается кейсах
        case "toggle":
            return {autoplay: !state.autoplay}
        case "slow":
            return {autoplay: 300}
        case "fast":
            return {autoplay: 700}
        case "custom":
            return {autoplay: action.payload}//В данном случае мы уже меняем сосотояние напрямую(будет передан текст кнопки)
        default:
            throw new Error()
    }

}

function init(initial) {
    //Здесь можно выполнить манипуляции с initial и вернуть что-то другое
    return {autoplay: initial}
}


const Slider = (props) => {

    const [slide, setSlide] = useState(10);
    // const [autoplay, setAutoplay] = useState(false);
    const [autoplay, dispatch] = useReducer(reducer, /*{autoplay: false}*/ props.initial, init);//функция должна называться dispatch
    //В хук передаем функцию редьюсерБ начальное значение автоплея
    //третьим аргументом можно передать функцию, которая будет лениво создавать начальное значение(модифицировать второй аргумент и возвращать новый объект как начальное состояние)

    function changeSlide(i) {
        setSlide(slide + i);
    }


    return (
        <Container>
            <div className="slider w-50 m-auto">
                <img className="d-block w-100" src="https://www.planetware.com/wpimages/2020/02/france-in-pictures-beautiful-places-to-photograph-eiffel-tower.jpg" alt="slide" />
                <div className="text-center mt-5">Active slide {slide} <br/> {autoplay.autoplay ? 'auto' : null}</div>
                <div className="buttons mt-3">
                    <button 
                        className="btn btn-primary me-2"
                        onClick={() => changeSlide(-1)}>-1</button>
                    <button 
                        className="btn btn-primary me-2"
                        onClick={() => changeSlide(1)}>+1</button>
                    <button 
                        className="btn btn-primary me-2"
                        onClick={() => dispatch({type: "toggle"})}>toggle autoplay</button>
                    <button 
                        className="btn btn-primary me-2"
                        onClick={() => dispatch({type: "slow"})}>slow autoplay</button>
                    <button 
                        className="btn btn-primary me-2"
                        onClick={() => dispatch({type: "fast"})}>fast autoplay</button>
                    <button 
                        className="btn btn-primary me-2"
                        onClick={(e) => dispatch({type: "custom", payload: +e.target.textContent})}>1000</button>
                </div>
            </div>
        </Container>
        //Внутрь диспетча нужно передать объект, называемый action, который обязательно должен содержать свойство type
        //Данный объект будет передаваться в функцию reducer вторым аргументом
    )
}


function App() {
  return (
        <Slider initial={false}/>
  );
}

export default App;
