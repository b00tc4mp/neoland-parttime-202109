export default (event, setImageB64) => {
    const file = event.target.files[0]

    const fileReader = new FileReader()

    fileReader.readAsDataURL(file)

    fileReader.onload = event => {

        setImageB64(event.target.result)
    }
}