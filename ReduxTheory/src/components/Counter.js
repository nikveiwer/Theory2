import { connect, useSelector, useDispatch } from "react-redux";
import {inc, dec, rnd} from "../actions.js";
import { bindActionCreators } from "redux";

const Counter = (/*{counter, inc, dec, rnd}*/) => {

    const counter = useSelector(state => state.counter)
    const dispatch = useDispatch()

    return (
        <div className="jumbotron">
            <h1>
                {counter}
            </h1>
            <button onClick={() => dispatch(inc())} className="btn btn-primary">INC</button>
            <button onClick={() => dispatch(dec())} className="btn btn-primary">DEC</button>
            <button onClick={() => dispatch(rnd())} className="btn btn-primary">RND</button>
        </div>
    )
}


const mapStateToProps = (state) => {
    return {
        counter: state.value
    }
}

// const mapDispathToProps = (dispatch) => {//Можно передать вторым аргументов в коннект
//     return bindActionCreators(actions, dispatch)
//     // return {
//     //     // inc: () => dispatch(inc()),
//     //     // dec: () => dispatch(dec()),
//     //     // rnd: () => {
//     //     //     	const value = Math.floor(Math.random() * 10)
// 	//     //         dispatch(rnd(value));
//     //     // }

//     //     inc, 
//     //     dec,
//     //     rnd
//     //     // rnd: () => {
//     //     //     const value = Math.floor(Math.random() * 10);
//     //     //     rnd(value);
//     //     // }

//     // }
// }

// export default connect(mapStateToProps, actions)(Counter);
export default Counter