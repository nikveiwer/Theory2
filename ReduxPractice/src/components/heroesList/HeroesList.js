import {useHttp} from '../../hooks/http.hook';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { heroesFetching, heroesFetched, heroesFetchingError, clickedDeleteBtn,} from '../../actions';
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';

// Задача для этого компонента:
// При клике на "крестик" идет удаление персонажа из общего состояния
// Усложненная задача:
// Удаление идет и с json файла при помощи метода DELETE

const HeroesList = () => {
    const {heroes, heroesLoadingStatus, deletedElement, addedElement} = useSelector(state => state);
    const dispatch = useDispatch();
    const {request} = useHttp();

    useEffect(() => {
        loadingHeroes()
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (addedElement === "noChanges") {
            return
        } else if (addedElement === "changed") {
            loadingHeroes()
        }

        // eslint-disable-next-line
    }, [addedElement]);

    useEffect(() => {
        let newHeroes = heroes.filter((hero) => (hero.id != deletedElement));
        request(`http://localhost:3001/heroes/${deletedElement}`, 'DELETE')
            .then(dispatch(heroesFetched(newHeroes)))
            .catch(() => dispatch(heroesFetchingError()))


        // eslint-disable-next-line
    }, [deletedElement]);
    
    const loadingHeroes = () => {
        dispatch(heroesFetching());
        request("http://localhost:3001/heroes")
            .then(data => dispatch(heroesFetched(data)))
            .catch(() => dispatch(heroesFetchingError()))

    }


    if (heroesLoadingStatus === "loading") {
        return <Spinner/>;
    } else if (heroesLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    const renderHeroesList = (arr, clickToDelete) => {
        if (arr.length === 0) {
            return <h5 className="text-center mt-5">Героев пока нет</h5>
        }

        return arr.map(({id, ...props}) => {
            return <HeroesListItem key={id} {...props} clickToDelete={() => clickToDelete(id)}/>
        })
    }

    const elements = renderHeroesList(heroes, (id) => dispatch(clickedDeleteBtn(id)));
    return (
        <ul>
            {elements}
        </ul>
    )
}

export default HeroesList;