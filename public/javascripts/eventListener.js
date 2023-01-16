const submitButton = document.querySelector('#button-addon2')
const form = document.querySelector('.form')
const input = document.querySelector('.form-control')

function isValidUrl(url) {
    try {
      return Boolean(new URL(url));
    }
    catch (err) {
      return false;
    }
}

// 新增偽類樣式
submitButton.addEventListener('click', function onSubmitButtonClicked(event) {
  form.classList.add('was-validated')
})

// 若無輸入則取消送出 
form.addEventListener('submit', function onSubmitFormSubmitted(event) {
  if (!input.value.length || !isValidUrl(input.value) ) {
    event.preventDefault()
  } 
  // else if (httpExisted(input.value)) {
  //   event.preventDefault()
  //   console.log("無效字元")
  // }
})