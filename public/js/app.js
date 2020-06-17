const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault()
  const location = search.value
  messageOne.textContent = 'loading'
  messageTwo.textContent = ''
  console.log("submitting..." + location)
  fetch('/weather?address='+location).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        messaageOne.textContent = error
      } else {
        messageOne.textContent = ''
        messageTwo.textContent = data.location + ' ' + data.forecast
      }
    })
  })

})
