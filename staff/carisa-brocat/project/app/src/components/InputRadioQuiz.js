import './Quiz.css'

function InputRadioQuiz ({name, value, text}){
    return <div className='Quiz__button Quiz__button__hairTexture'>
    <label >
        <input type='radio' name={name} value={value} />
        <span>{text}</span>
    </label>
</div>
}

export default InputRadioQuiz