import { Formik, Form, Field, ErrorMessage, useFormik, useField } from "formik";
import * as Yup from "yup";

// const validate = values => {
//     const errors = {}

//     if (!values.name) {
//         errors.name = "Обязательное поле!"
//     } else if (values.name.length < 2) {
//         errors.name = "Минимум два символа"
//     } 

//     if (!values.email) {
//         errors.email = "Обязательное поле!"
//     } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
//        errors.email = "Неправильный email адрес" 
//     }

//     return errors;
// }

const Form1 = () => {

    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            amount: 0,
            currency: "",
            text: "",
            terms: false
        },
        // validate: validate,
        validationSchema: Yup.object({
            name: Yup.string()
                    .min(2, "Минимум 2 символа")
                    .required("Обязательное поле"),
            email: Yup.string()
                      .email("Неправильный email адрес!")
                      .required("Обязательное поле"),
            amount: Yup.number()
                      .min(5, "Не менее пяти")
                      .required("Обязательное поле"),
            currency: Yup.string()
                          .required("Выберерте валюту"),
            text: Yup.string()
                     .min(10, "Не менее десяти символов"),
            terms: Yup.boolean()
                      .required("Необходимо согласие!")
                      .oneOf([true, "Необходимо согласие!"])
        }),
        onSubmit: values => console.log(JSON.stringify(values, null, 2))//трансформация объекта values в строку
    })



    return (
        <form className="form" onSubmit={formik.handleSubmit}>
            <h2>Отправить пожертвование</h2>
            <label htmlFor="name">Ваше имя</label>
            <input
                id="name"
                name="name"
                type="text"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
            />
            {formik.errors.name && formik.touched.name ? <div style={{"color": "red"}}>{formik.errors.name}</div> : null}
            <label htmlFor="email">Ваша почта</label>
            <input
                id="email"
                name="email"
                type="email"
                // value={formik.values.email}
                // onChange={formik.handleChange}
                // onBlur={formik.handleBlur}
                { ...formik.getFieldProps("email")}

            />
            {formik.errors.email && formik.touched.email ? <div style={{"color": "red"}}>{formik.errors.email}</div> : null}
            <label htmlFor="amount">Количество</label>
            <input
                id="amount"
                name="amount"
                type="number"
                value={formik.values.amount}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
            />
            {formik.errors.amount && formik.touched.amount ? <div style={{"color": "red"}}>{formik.errors.amount}</div> : null}
            <label htmlFor="currency">Валюта</label>
            <select
                id="currency"
                name="currency"
                value={formik.values.currency}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}>
                
                    <option value="">Выберите валюту</option>
                    <option value="USD">USD</option>
                    <option value="UAH">UAH</option>
                    <option value="RUB">RUB</option>
            </select>
            {formik.errors.currency && formik.touched.currency ? <div style={{"color": "red"}}>{formik.errors.currency}</div> : null}
            <label htmlFor="text">Ваше сообщение</label>
            <textarea 
                id="text"
                name="text"
                value={formik.values.text}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
            />
            {formik.errors.text && formik.touched.text ? <div style={{"color": "red"}}>{formik.errors.text}</div> : null}
            <label className="checkbox">
                <input 
                    name="terms" 
                    type="checkbox"
                    value={formik.values.terms}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur} />
                Соглашаетесь с политикой конфиденциальности?
            </label>
            {formik.errors.terms && formik.touched.terms ? <div style={{"color": "red"}}>{formik.errors.terms}</div> : null}
            <button type="submit">Отправить</button>
        </form>
    )
}


const Form2 = () => {



    return (
        <Formik
            initialValues = {{
                name: "",
                email: "",
                amount: 0,
                currency: "",
                text: "",
                terms: false
            }}
            validationSchema= {Yup.object({
                name: Yup.string()
                        .min(2, "Минимум 2 символа")
                        .required("Обязательное поле"),
                email: Yup.string()
                          .email("Неправильный email адрес!")
                          .required("Обязательное поле"),
                amount: Yup.number()
                          .min(5, "Не менее пяти")
                          .required("Обязательное поле"),
                currency: Yup.string()
                              .required("Выберерте валюту"),
                text: Yup.string()
                         .min(10, "Не менее десяти символов"),
                terms: Yup.boolean()
                          .required("Необходимо согласие!")
                          .oneOf([true, "Необходимо согласие!"])
            })}
            onSubmit = {values => console.log(JSON.stringify(values, null, 2))}>


            <Form className="form">
                <h2>Отправить пожертвование</h2>
                <label htmlFor="name">Ваше имя</label>
                <Field
                    id="name"
                    name="name"
                    type="text"
                />
                <ErrorMessage style={{"color": "red"}} name="name" component="div"/>
                <label htmlFor="email">Ваша почта</label>
                <Field
                    id="email"
                    name="email"
                    type="email"

                />
                <ErrorMessage style={{"color": "red"}} name="email" component="div"/>
                <label htmlFor="amount">Количество</label>
                <Field
                    id="amount"
                    name="amount"
                    type="number"
                />
                <ErrorMessage style={{"color": "red"}} name="amount" component="div"/>
                <label htmlFor="currency">Валюта</label>
                <Field
                    id="currency"
                    name="currency"
                    as="select">
                    
                        <option value="">Выберите валюту</option>
                        <option value="USD">USD</option>
                        <option value="UAH">UAH</option>
                        <option value="RUB">RUB</option>
                </Field>
                <ErrorMessage style={{"color": "red"}} name="currency" component="div"/>
                <label htmlFor="text">Ваше сообщение</label>
                <Field
                    id="text"
                    name="text"
                    as="textarea"
                />
                <ErrorMessage style={{"color": "red"}} name="textarea" component="div"/>
                <label className="checkbox">
                    <Field 
                        name="terms" 
                        type="checkbox"/>
                    Соглашаетесь с политикой конфиденциальности?
                </label>
                <ErrorMessage style={{"color": "red"}} name="terms" component="div"/>
                <button type="submit">Отправить</button>
            </Form>
        </Formik>
    )
}


const MyTextInput = ({label, ...props}) => {//Нужно, когда много однотипных компонентов

    const [field, meta] = useField(props);//получаем массив из двух объектов

    return (
        <>
           <label htmlFor={props.name}>{label}</label> 
           <input {...props} {...field}/>
           {meta.touched && meta.error ? (
                <div style={{"color": "red"}}>{meta.error}</div>
           ) : null}
        </>
    )
    
};

const MyCheckbox = ({children, ...props}) => {//Нужно, когда много однотипных компонентов

    const [field, meta] = useField({...props, type: "checkbox"});//получаем массив из двух объектов

    return (
        <>
           <label className="checkbox" htmlFor={props.name}>
                <input tupe="checkbox" {...props} {...field}/>
                {children}
            </label> 
           {meta.touched && meta.error ? (
                <div style={{"color": "red"}}>{meta.error}</div>
           ) : null}
        </>
    )
    
};


const Form3 = () => {//для примера собственного компонента импута



    return (
        <Formik
            initialValues = {{
                name: "",
                email: "",
                amount: 0,
                currency: "",
                text: "",
                terms: false
            }}
            validationSchema= {Yup.object({
                name: Yup.string()
                        .min(2, "Минимум 2 символа")
                        .required("Обязательное поле"),
                email: Yup.string()
                          .email("Неправильный email адрес!")
                          .required("Обязательное поле"),
                amount: Yup.number()
                          .min(5, "Не менее пяти")
                          .required("Обязательное поле"),
                currency: Yup.string()
                              .required("Выберерте валюту"),
                text: Yup.string()
                         .min(10, "Не менее десяти символов"),
                terms: Yup.boolean()
                          .required("Необходимо согласие!")
                          .oneOf([true, "Необходимо согласие!"])
            })}
            onSubmit = {values => console.log(JSON.stringify(values, null, 2))}>


            <Form className="form">
                <h2>Отправить пожертвование</h2>
                <MyTextInput
                    label="Ваше имя"
                    id="name"
                    name="name"
                    type="text"/>
                <MyTextInput
                    label="Ваша почта"
                    id="email"
                    name="email"
                    type="email"/>
                <MyTextInput
                    label="Количество"
                    id="amount"
                    name="amount"
                    type="number"/>
                <label htmlFor="currency">Валюта</label>
                <Field
                    id="currency"
                    name="currency"
                    as="select">
                    
                        <option value="">Выберите валюту</option>
                        <option value="USD">USD</option>
                        <option value="UAH">UAH</option>
                        <option value="RUB">RUB</option>
                </Field>
                <ErrorMessage style={{"color": "red"}} name="currency" component="div"/>
                <label htmlFor="text">Ваше сообщение</label>
                <Field
                    id="text"
                    name="text"
                    as="textarea"
                />
                <ErrorMessage style={{"color": "red"}} name="textarea" component="div"/>

                <MyCheckbox name="terms">Соглашаетесь с политикой конфиденциальности?</MyCheckbox>
                <button type="submit">Отправить</button>
            </Form>
        </Formik>
    )
}



export default Form3;