let { form } = document.forms

let counterMinusBtn = document.querySelector('#counterMinusBtn')
let counterPlusBtn = document.querySelector('#counterPlusBtn')
let counterValue = document.querySelector('.counter span')

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
   years = [2023 , 2024, 2022],
   days = ["01", "02", "03", "04", "05", "06", "07", '08', "09", 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],
   hours = ["01", "02", "03", "04", "05", "06", "07", '08', "09", 10, 11, 12],
   minutes = ["01", "02", "03", "04", "05", "06", "07", '08', "09", 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60]

const selectMonth = document.querySelector('#month'),
   selectYear = document.querySelector('#year'),
   selectDay = document.querySelector('#day'),
   selectHour = document.querySelector('#hour'),
   selectMinut = document.querySelector('#minut'),
   selectAmOrPm = document.querySelector('#amOrPm')

const nameInp = document.querySelector('#firstname'),
   emailInp = document.querySelector('#email')

const emailKeys = ["@" , '.' , 'com' , "ru" , 'gmail' , 'email']
let tableTimeData

let nameInpStatus = false,
   emailInpStatus = false,
   dateStatus = false

let peopleCount = 4

counterMinusBtn.addEventListener('click', () => {
   let peopleCount = parseInt(counterValue.innerText)
   if (peopleCount - 1 <= 0) {
      return "AA"
   }
   counterValue.innerText = --peopleCount + " people"
   localStorage.setItem("peopleCount", peopleCount + "")
})

counterPlusBtn.addEventListener('click', () => {
   let peopleCount = parseInt(counterValue.innerText)
   if (peopleCount + 1 > 15) {
      return "AA"
   }
   counterValue.innerText = ++peopleCount + " people"
   localStorage.setItem("peopleCount", peopleCount + "")
})

nameInp.addEventListener('input', validateNameInp)
emailInp.addEventListener('input' , validatEmailInp)

fillingSelects(selectMonth, months , "index")
fillingSelects(selectYear, years , "number")
fillingSelects(selectDay , days , 'index')
fillingSelects(selectHour, hours , "index")
fillingSelects(selectMinut, minutes, "index")

selectMonth.addEventListener('change', changeDaySelect)

form.addEventListener('submit', (event) => {
   event.preventDefault()
   validateDate()
   validateNameInp()
   validatEmailInp()
   if (!nameInpStatus || !emailInpStatus || !dateStatus) {
      return "AAA"
   } 
   const inputs = form.querySelectorAll('input')
   console.log(peopleCount);
   let userData = {tableTimeData};
   userData.peopleCount = localStorage.getItem("peopleCount")
   inputs.forEach(e => {
      const { name, value } = e;
      userData[name] = value;
   });

   console.log(userData);
})

function validateNameInp() {
   if (nameInp.value.length < 3) {
      showError(nameInp.parentElement, nameInp.nextElementSibling , "This field is required")
      nameInpStatus = false
   } else if (!isNaN(+nameInp.value)) {
      showError(nameInp.parentElement, nameInp.nextElementSibling, "Wrong Format")
      nameInpStatus = false
   } 
   else {
      hideError(nameInp.parentElement, nameInp.nextElementSibling)
      nameInpStatus = true
   }
}

function validatEmailInp() {
   let emailKeyCount = 0
   emailKeys.forEach((e) => {
      emailKeyCount += emailInp.value.includes(e) ? 1 : 0
      if (emailKeyCount == 4) {
         return
      }
   })

   if (emailKeyCount !== 4) {
      showError(emailInp.parentElement, emailInp.nextElementSibling , "The email is wrong")
      emailInpStatus = false
   }else{
      hideError(emailInp.parentElement, emailInp.nextSibling)
      emailInpStatus = true
   }
}

function showError(parentElement, msgElement, message) {
   msgElement.textContent = message
   parentElement.classList.add('error')
}

function hideError(parentElement, msgElement) {
   msgElement.textContent = ""
   parentElement.classList.remove('error')
}

function changeDaySelect() {
   if (selectMonth.value % 2 && selectMonth.value <= 9 && selectMonth.value != 2) {
      days.length = 31
   } else if (selectMonth.value == 2) {
      days.length = 28
   } else if (selectMonth.value == 8) {
      days.length = 31
   } else {
      days.length = 30
   }
   let len = selectDay.children.length - days.length
   if (len < 0) {
      for (let i = days.length + len; i < days.length; i++) {
         let option = document.createElement('option')
         option.setAttribute('value', i + 1)
         option.innerText = i + 1
         selectDay.append(option)
      }
      // console.log(days.length == selectDay.children.length, days.length, selectDay.children.length);
      return "aa"
   }
   for (let i = 0; i < len; i++) {
      selectDay.children[selectDay.children.length - 1].remove()
   }
   // console.log(days.length == selectDay.children.length, days.length, selectDay.children.length);
}

function validateDate() {
   let hour = selectAmOrPm.value === 'pm' ? +selectHour.value + 12 : selectHour.value
   tableTimeData = new Date(addZero(selectYear.value) + "-" + addZero(selectMonth.value) + '-' + addZero(selectDay.value) + "T" + addZero(hour) + ":" + addZero(selectMinut.value) + ':' + "00" + "Z")
   let now = new Date()
   let limitDate = new Date()
   limitDate.setMonth(limitDate.getMonth() + 3)
   limitDate.setHours(now.getHours() + 5)
   // console.log(tableTimeData, new Date(new Date().getMonth() + 5).getTime());
   if (tableTimeData.getTime() < now.getTime()) {
      showError(document.querySelector('.time'), document.querySelector('.time').querySelector('.error-el'), "The date has passed")
      showError(document.querySelector('.date'), document.querySelector('.date').querySelector('.error-el'), "The date has passed")
      dateStatus = false
   } else if (tableTimeData.getTime() > limitDate.getTime()){
      showError(document.querySelector('.time'), document.querySelector('.time').querySelector('.error-el'), "The date is wrong")
      showError(document.querySelector('.date'), document.querySelector('.date').querySelector('.error-el'), "The date is wrong")
      dateStatus = false
   }else{
      hideError(document.querySelector('.time'), document.querySelector('.time').querySelector('.error-el'))
      hideError(document.querySelector('.date'), document.querySelector('.date').querySelector('.error-el'))
      dateStatus = true
   }
}

function fillingSelects(selectEl, arr , valueType) {
   if (valueType === "number") {
      arr.forEach((e) => {
         let option = document.createElement('option')
         option.setAttribute('value', e)
         option.innerText = e
         selectEl.append(option)
      })
   }else {
      arr.forEach((e, index) => {
         let option = document.createElement('option')
         option.setAttribute('value', index + 1)
         option.innerText = e
         selectEl.append(option)
      })
   }
}

function addZero(n) {
   return n < 10 ? "0" + n : n
}