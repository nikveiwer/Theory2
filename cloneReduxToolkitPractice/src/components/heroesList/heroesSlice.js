import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {useHttp} from '../../hooks/http.hook';

const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle',
}

export const fetchHeroes = createAsyncThunk(//Возвращает не один, а сразу три экшона(pending, fulfilled, rejected)(примерно как в промисах)
    "heroes/fetchHeroes",
    () => {//Первый параметр - аргумент, который мы передаем при вызови действия, второй - ThunkAPI(dispatch, getaState...)
        const {request} = useHttp();//request не должен быть useCallbackом
        return request("http://localhost:3001/heroes")
    }
);

const heroesSlice = createSlice({
    name: "heroes",
    initialState,
    reducers: {
        // heroesFetching: state => {state.heroesLoadingStatus = 'loading'},
        // heroesFetched: (state, action) => {
        //     state.heroes = action.payload;
        //     state.heroesLoadingStatus = "idle";
        // },
        // heroesFetchingError: state => {state.heroesLoadingStatus = "error";},
        heroCreated: (state, action) => {
            state.heroes.push(action.payload)
        },
        heroDeleted: (state, action) => {
            state.heroes = state.heroes.filter(item => item.id !== action.payload);
        }
    },
    extraReducers: (builder) => {//Это свойство позволяет работать с действиями, которые могут взаимодействовать с состоянием, не связанным именнот с этим слайсом, но в данном случае сюда попадают действия, возвращенные из createAsyncThunk 
        builder
            .addCase(fetchHeroes.pending, state => {state.heroesLoadingStatus = 'loading'})
            .addCase(fetchHeroes.fulfilled, (state, action) => {
                state.heroes = action.payload;
                state.heroesLoadingStatus = "idle";
            })
            .addCase(fetchHeroes.rejected, state => {state.heroesLoadingStatus = "error";})
            .addDefaultCase(() => {})
    }
});

const {actions, reducer} = heroesSlice;

export default reducer;
export const {
    heroesFetching,
    heroesFetched,
    heroesFetchingError,
    heroCreated,
    heroDeleted
} = actions;