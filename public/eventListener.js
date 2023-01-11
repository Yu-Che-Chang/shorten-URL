const submitButton = document.querySelector('#button-addon2')
const form = document.querySelector('.form')
const input = document.querySelector('.form-control')

// 新增偽類樣式
submitButton.addEventListener('click', function onSubmitButtonClicked(event) {
  form.classList.add('was-validated')
})

// 若無輸入則取消送出 
form.addEventListener('submit', function onSubmitFormSubmitted(event) {
  if (!input.value.length) {
    event.preventDefault()
  }
})
