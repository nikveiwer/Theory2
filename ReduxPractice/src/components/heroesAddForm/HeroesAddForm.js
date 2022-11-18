import {useHttp} from '../../hooks/http.hook';

import { useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { heroesFetching, filtersFetched, heroesFetchingError, clickedAddBtn } from '../../actions';

import Spinner from '../spinner/Spinner';
import { v4 as uuidv4 } from 'uuid'

// Задача для этого компонента:
// Реализовать создание нового героя с введенными данными. Он должен попадать
// в общее состояние и отображаться в списке + фильтроваться
// Уникальный идентификатор персонажа можно сгенерировать через uiid
// Усложненная задача:
// Персонаж создается и в файле json при помощи метода POST
// Дополнительно:
// Элементы <option></option> желательно сформировать на базе
// данных из фильтров

const HeroesAddForm = () => {

    const [localInputValue, setLocalInputValue] = useState("");
    const [localAreaValue, setLocalAreaValue] = useState("");
    const [localSelectValue, setLocalSelectValue] = useState("own");

    const {filters, heroesLoadingStatus} = useSelector(state => state);
    const dispatch = useDispatch();
    const {request} = useHttp();


    console.log(localSelectValue);

    useEffect(() => {
        dispatch(heroesFetching());
        request("http://localhost:3001/filters")
            .then(data => dispatch(filtersFetched(data)))
            .catch(() => dispatch(heroesFetchingError()))

        // eslint-disable-next-line
    }, []);

    const onAdd = (e) => {
        e.preventDefault();
        const newHero = {
            id: uuidv4(),
            name: localInputValue,
            description: localAreaValue,
            element: localSelectValue
        }

        dispatch(heroesFetching());
        request("http://localhost:3001/heroes", "POST", JSON.stringify(newHero))
            .then(data => dispatch(clickedAddBtn()))
            .catch(() => dispatch(heroesFetchingError()))

    }

    const selectFill = (status, data) => {
        switch (status) {
            case "loading":
                return <option><Spinner></Spinner></option>
            case "error":
                return <option >Не удалоь загрузить выбираемые опции</option>
            case "idle":
                
                return (
                    [...data].slice(1).map(item => {
                        return <option key={item.filter} value={item.filter}>{item.text}</option>
                    })
                )
        }
    }

    return (
        <form onSubmit={(e) => onAdd(e)} className="border p-4 shadow-lg rounded">
            <div className="mb-3">
                <label htmlFor="name" className="form-label fs-4">Имя нового героя</label>
                <input 
                    required
                    type="text" 
                    name="name" 
                    className="form-control" 
                    id="name" 
                    value={localInputValue}
                    onChange={(e) => setLocalInputValue(e.target.value)}
                    placeholder="Как меня зовут?"/>
            </div>

            <div className="mb-3">
                <label htmlFor="text" className="form-label fs-4">Описание</label>
                <textarea
                    required
                    name="text" 
                    className="form-control" 
                    id="text" 
                    value={localAreaValue}
                    onChange={(e) => setLocalAreaValue(e.target.value)}
                    placeholder="Что я умею?"
                    style={{"height": '130px'}}/>
            </div>

            <div className="mb-3">
                <label htmlFor="element" className="form-label">Выбрать элемент героя</label>
                <select 
                    required
                    className="form-select" 
                    id="element" 
                    name="element"
                    value={localSelectValue}
                    onChange={(e) => setLocalSelectValue(e.target.value)}>
                    <option value="own">Я владею элементом...</option>
                    {selectFill(heroesLoadingStatus, filters)}
                    {/* <option value="fire">Огонь</option>
                    <option value="water">Вода</option>
                    <option value="wind">Ветер</option>
                    <option value="earth">Земля</option> */}
                </select>
            </div>

            <button type="submit" className="btn btn-primary">Создать</button>
        </form>
    )
}

export default HeroesAddForm;