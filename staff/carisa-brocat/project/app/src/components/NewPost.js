import './NewPost.css'
import { createPost } from '../logic'
import { useState } from 'react'
import { useContext } from 'react'
import Context from './Context'
import uploadImage from './helps/uploadImage'
import { errors } from 'commons'
const { AuthError, NotFoundError } = errors

export default ({ handleCloseModal, handlePostCreated }) => {
    const { setFeedback } = useContext(Context)

    const [category, setCategory] = useState('product')
    const [imageB64, setImageB64] = useState()

    const handleUploadImage = (event) => {
        uploadImage(event, setImageB64)
    }

    const handleCategorySelected = event => {
        setCategory(event.target.value)
    }

    const handleCreatePost = event => {
        event.preventDefault()

        const { target:
            { category: { value: category },
                subject: { value: subject },
                title: { value: title },
                description: { value: description },
            } } = event

        let address = ''
        if (category === 'space') {
            address = event.target.address.value
        }

        try {
            createPost(sessionStorage.token, title, description, category, subject, imageB64, address)
                .then(() => {
                    handleCloseModal()

                    setFeedback({ level: 'info', message: 'Post created successfully' })

                    handlePostCreated()
                })
                .catch(error => {
                    setFeedback({ level: 'error', message: error.message })
                })
        } catch (error) {
            setFeedback({ level: 'error', message: error.message })
        }
    }

    return <form className="NewPost" onSubmit={handleCreatePost}>
        <div className="NewPost__header">
            <div className="NewPost__header-category">
                <label >Category:</label>
                <select id='category' name='category' defaultValue='product' onChange={handleCategorySelected}>
                    <option value='product'>Product</option>
                    <option value='question'>Question</option>
                    <option value='space'>Space</option>
                    <option value='other'>Others</option>
                </select>
            </div>
            <div className="NewPost__header-subject">
                <label >Subject:</label>
                <select id='subject' name='subject' defaultValue='moisture'>
                    <option value='moisture'>Moisture</option>
                    <option value='definition'>Definition</option>
                    <option value='restore'>Restore</option>
                    <option value='definition'>Definition</option>
                    <option value='strength'>Strength</option>
                </select>
            </div>
        </div>
        <div className="NewPost__body">
            <input className="NewPost__body__title" type="text" name="title" required placeholder="Write the title of your post here" maxLength="50" minLength="5" />
            <div className=" NewPost__body NewPost__body--row">
                <div className=" NewPost__body NewPost__body__image">
                    <img src={imageB64 ?? "./images/notImage.png"} />
                    <label className="NewPost__LabeInputFile">
                        <input className=" NewPost__inputFile" type="file" name="image" onChange={handleUploadImage} />
                        <img src="./images/uploadIcon.png" />
                    </label>
                </div>

                <div className="NewPost__body NewPost__body__description">
                    <textarea name="description" placeholder="Give a small description of your post" required minLength="50"></textarea>

                    {category === 'space' && <div className="NewPost__body-address"><label >Adress:</label>
                        <input type="text" name="address" placeholder="Give an address" required /></div>}
                </div>
            </div>
        </div>
        <div className="NewPost__footer">
            <button className='NewPost__button'>+</button>
        </div>

    </form>
}