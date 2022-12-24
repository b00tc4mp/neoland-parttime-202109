import './Quiz.css'

function InputCheckboxQuiz ({name, value, text}){
    return <div className='Quiz__button Quiz__button__interests'>
    <label >
        <input type='checkbox' name={name} value={value} />
        <span>{text}</span>
    </label>
</div>
}

export default InputCheckboxQuiz