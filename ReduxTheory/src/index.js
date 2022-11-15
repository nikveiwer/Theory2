import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';

import { createStore, bindActionCreators } from "redux"
import { Provider } from 'react-redux';
import reducer from "./reducer";
// import * as actions from "./actions";





const store = createStore(reducer)

// const { dispatch, subscribe, getState } = store;

// const update = () => {
	
// }


// subscribe(update)

const bindActionCreator = (creator, dispatch) => (...args) => {//своя функция(такая же есть в редаке, ее мы и используем)
	dispatch(creator(...args))
}

// const { incDispatch , decDispatch, rndDispatch } = bindActionCreators({
// 	incDispatch: inc,
// 	decDispatch: dec,
// 	rndDispatch: rnd
// }, dispatch)
// const { inc , dec, rnd } = bindActionCreators(actions, dispatch)
// const decDispatch = bindActionCreators(dec, dispatch)
// const rndDispatch = bindActionCreators(rnd, dispatch)

// document.querySelector("#inc").addEventListener("click", inc)

// document.querySelector("#dec").addEventListener("click", dec)

// document.querySelector("#rnd").addEventListener("click", () => {
// 	const value = Math.floor(Math.random() * 10)
// 	rnd(value);
// })





const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
	{/* <Counter 
		counter={getState().value}
		inc={inc}
		dec={dec}
		rnd={() => {
			const value = Math.floor(Math.random() * 10)
			rnd(value)
		}}></Counter> */}
	<Provider store={store}>
		<App/>
	</Provider>
  </>
);

