import { useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Spinner from '../spinner/Spinner';
import { activeFilterChanged } from '../../actions';
// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом

const HeroesFilters = () => {

    const {filters, heroesLoadingStatus, activeFilter} = useSelector(state => state);
    const dispatch = useDispatch();



    const filterFill = (status, data) => {
        switch (status) {
            case "loading":
                return <Spinner></Spinner>
            case "error":
                return <div>Не удалоь загрузить выбираемые опции</div>
            case "idle":
                
                return (
                    [...data].map(item => {
                        return <button onClick={() => dispatch(activeFilterChanged(item.filter))} key={item.filter} className={`btn ${item.visual} ${item.filter === activeFilter ? "active" : null}`}>{item.text}</button>
                    })
                )
        }
    }


    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                <div className="btn-group">
                    {filterFill(heroesLoadingStatus, filters)}
                    {/* <button className="btn btn-outline-dark active">Все</button>
                    <button className="btn btn-danger">Огонь</button>
                    <button className="btn btn-primary">Вода</button>
                    <button className="btn btn-success">Ветер</button>
                    <button className="btn btn-secondary">Земля</button> */}
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;