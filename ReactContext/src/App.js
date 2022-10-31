import {useState, Component, createContext, useContext} from 'react';
import {Container} from 'react-bootstrap';
import './App.css';

const dataContext = createContext({//Здесь устанавливаем значение по умолчанию(если не буде атрибута value у провайдера)
    mail: "name@example.com",
    text: 'some text'
});

console.dir(dataContext);

const { Provider, Consumer} = dataContext;

const Form = (props) => {

    return (
        <Container>
            <form className="w-50 border mt-5 p-3 m-auto">
                <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label mt-3">Email address</label>
                    <InputComponent3 value={props.mail}/>
                    </div>
                    <div className="mb-3">
                    <label htmlFor="exampleFormControlTextarea1" className="form-label">Example textarea</label>
                    <textarea value={props.text} className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                </div>
            </form>
        </Container>
    )
}





class InputComponent1 extends Component {//Первый вариант использования(классовый)
    render() {
        return (
            <Consumer>
                {
                    value => {
                        return <input 
                                    value={value.mail}//Приняли контекст 
                                    type="email" 
                                    className='form-control' 
                                    id="exampleFormControlInput1" 
                                    placeholder="name@example.com"/>
                    }
                }
            </Consumer>
        )
    }
}





class InputComponent2 extends Component {//Второй вариант использования(классовый)

    //static contextType = dataContext;//Экспериментальный синтаксис

    render() {
        return (

            <input 
                value={this.context.mail}//Приняли контекст 
                type="email" 
                className='form-control' 
                id="exampleFormControlInput1" 
                placeholder="name@example.com"/>

        )
    }
}

InputComponent2.contextType = dataContext//Привязывает к свойству context внутри класса наш контекст





const InputComponent3 = () => {//Третий вариант использования(функциональный)

    const context = useContext(dataContext);
   
    return (

        <input 
            value={context.mail}//Приняли контекст 
            type="email" 
            className='form-control' 
            id="exampleFormControlInput1" 
            placeholder="name@example.com"
            onFocus={context.forceChangeMail}/>//Таким образом можно менять контекст

    )
  
}

//Также значение по умолчанию будет устанавливаться когда полностью нет провайдера, а не когда у него нету атрибута value

function App() {
    const [data, setData] = useState({
        mail: "name@example.com",
        text: 'some text',
        forceChangeMail: forceChangeMail//Теперь в контексте буде ттылка на функцию forceChangeMail
    });

    function forceChangeMail() {
        setData({...data, mail: 'test@gmail.com'})
    }

    return (//Все потребители провайдера будут перерендериваться при изменении value
        <Provider value={data}>
            <Form text={data.text}/>
            <button 
                onClick={() => setData({//проп mail убрали для наглядности
                    mail: "second@example.com",
                    text: 'another text',
                    forceChangeMail: forceChangeMail
                })}>
                Click me
            </button>
        </Provider>
    );
}

export default App;
