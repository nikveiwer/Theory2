import {useState, memo, PureComponent, Component} from 'react';
import {Container} from 'react-bootstrap';
import './App.css';

class Form1 extends Component {//PureComponent Работает как memo, только для классовых компонентов, но будут баги при вложенных пропсах(чтобы использовать пишем extends Pure Component)


    shouldComponentUpdate(nextProps, nextState) {
        if (this.props.mail.name === nextProps.mail.name) {//Делаем для глубокого сравнения, при этом не ставя PureComponent
            return false
        }
    }

    render() {

        console.log("render");

        return (
            <Container>
                <form className="w-50 border mt-5 p-3 m-auto">
                    <div className="mb-3">
                        <label htmlFor="exampleFormControlInput1" className="form-label mt-3">Email address</label>
                        <input value={this.props.mail.name} type="email" className='form-control' id="exampleFormControlInput1" placeholder="name@example.com"/>
                        </div>
                        <div className="mb-3">
                        <label htmlFor="exampleFormControlTextarea1" className="form-label">Example textarea</label>
                        <textarea value={this.props.text} className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                    </div>
                </form>
            </Container>
        )
    }


}

function propsCompare(prevProps, nextProps) {//Данная функция позволит memo сравнивать на всех уровнях
    return prevProps.mail.name === nextProps.mail.name && prevProps.text === nextProps.text//Если оставим сравнение только для первого свойства, только оно будет проходит глубокую проверку, а остальные поверхностную
}


const Form2 = memo((props) => {

    console.log("render");

    return (
        <Container>
            <form className="w-50 border mt-5 p-3 m-auto">
                <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label mt-3">Email address</label>
                    <input value={props.mail.name} type="email" className='form-control' id="exampleFormControlInput1" placeholder="name@example.com"/>
                    </div>
                    <div className="mb-3">
                    <label htmlFor="exampleFormControlTextarea1" className="form-label">Example textarea</label>
                    <textarea value={props.text} className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                </div>
            </form>
        </Container>
    )
}, propsCompare)//С помощью memo форма не будет заново рендериться, если в нее пришли те же пропсы(но сравнения пропсов - поверхностные)

function App() {
    const [data, setData] = useState({
        mail: { name: "name@example.com" },//Все равно зарендерится, потому что memo сравнивает только верхние уровни
        text: 'some text'
    });

    return (
        <>
            <Form1 mail={data.mail} text={data.text}/>
            <button 
                onClick={() => setData({
                    mail: { name: "name@example.com" },
                    text: 'some text'
                })}>
                Click me
            </button>
        </>
    );
}

export default App;
