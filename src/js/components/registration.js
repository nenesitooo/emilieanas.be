import Raven from 'raven-js'
import axios from 'axios'

const form = document.querySelector('.js--register')
form && form.addEventListener('submit', register)
const formButton = document.getElementsByClassName('js--button')[0]

function register (e) {
  e && e.preventDefault()
  formButton.disabled = true
  axios.post('https://wedding-331a1.firebaseio.com/guests.json', guest())
    .then(() => form.classList.add('js--complete'))
    .catch((error) => {
      Raven.captureException(error)
      formButton.disabled = false
    })
}

let guest = () => ({
  name: document.getElementsByName('name')[0].value,
  msg: document.getElementsByName('msg')[0].value,
  adults: document.getElementsByName('adults')[0].value,
  kids: document.getElementsByName('kids')[0].value,
  timestamp: new Date()
})
