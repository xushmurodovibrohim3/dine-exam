const daysEl = document.querySelector('#days'),
   hoursEl = document.querySelector('#hours'),
   minutesEl = document.querySelector('#minutes'),
   secondsEl = document.querySelector('#seconds')
const timerElemenets = document.querySelectorAll('.timer span')
let deadline = new Date("2023-07-22T18:00:00Z")
console.log(deadline);
let count = 0
let timerId = setInterval(updateTimer, 1000);

const prevBtn = document.querySelector("#prevBtn"),
   nextBtn = document.querySelector("#nextBtn"),
   slidesParent = document.querySelector(".slider-inner"),
   slides = document.querySelectorAll(".slider-inner .slider-item")

let slideCount = 0   
let tabLinksParent = document.querySelector(".tab__links")
let tabLinks = document.querySelector(".tabs-item").querySelectorAll('.tab__links li')
let tabsItems = document.querySelectorAll('.tabs-item')

if (document.documentElement.clientWidth < 850) {
   nextBtn.removeEventListener("click", showPrevSLider)
   prevBtn.removeEventListener("click", showNextSLider)
   slidesParent.style.transform = `translateX(0)`
}

if (document.documentElement.clientWidth < 1150) {
   clearInterval(timerId)
}else {
   updateTimer()
}
window.addEventListener('resize', () => {
   if (document.documentElement.clientWidth <= 850) {
      nextBtn.removeEventListener("click", showPrevSLider)
      prevBtn.removeEventListener("click", showNextSLider)
      slidesParent.style.transform = `translateX(0)`
   }
   if (document.documentElement.clientWidth < 1150) {
      clearInterval(timerId)
   }else{
      timerId = setInterval(updateTimer, 1000);
   }
})

nextBtn.addEventListener("click", showNextSLider)
prevBtn.addEventListener("click", showPrevSLider)

tabLinksParent.addEventListener("click", tabs)

function showPrevSLider() {
   slideCount--
   if (slideCount < 0) {
      slideCount = slidesParent.children.length - 1
   }
   
   slidesParent.style.transform = `translateX(-${slideCount}00%)`
}
function showNextSLider() {
   slideCount++
   if (slideCount >= slidesParent.children.length) {
      slideCount = 0
   }
   slidesParent.style.transform = `translateX(-${slideCount}00%)`
}

function hideElements(arr, arr2) {
   arr.forEach(e => {
      e.style.display = 'none'
   });

   for (let e of arr2) {
      e.classList.remove("active")
   }
}

function showEl(el, i) {
   el.style.display = "flex"
   tabLinks = el.querySelectorAll('.tab__links li')
   tabLinksParent = el.querySelector('.tab__links')
   tabLinks[i].classList.add('active')
}
function tabs({target}) {
   tabLinks.forEach((e, i) => {
      if (e == target) {
         tabLinksParent.removeEventListener("click", tabs)
         hideElements(tabsItems, tabLinks)
         showEl(tabsItems[i], i)
         tabLinksParent.addEventListener("click", tabs)
         return "aaa"
      }
   })
}


function getTimerData(dl) {
   let timeDifference = dl.getTime() - Date.parse(new Date)

   let days = Math.floor(timeDifference / 1000 / 60 / 60 / 24),
      hours = Math.floor((timeDifference / 1000 / 60 / 60) % 24),
      minutes = Math.floor((timeDifference / 1000 / 60) % 60),
      seconds = Math.floor((timeDifference / 1000) % 60)

   return { days, hours, minutes, seconds , timeDifference}
}

function updateTimer() {
   let counter = 0
   let data = getTimerData(deadline)

   let { days, hours, minutes, seconds, timeDifference } = data

   if (data.timeDifference <= 0) {
      clearInterval(timerId)
      daysEl.parentElement.style.display = "none"
      hoursEl.parentElement.style.display = "none"
      minutesEl.parentElement.style.display = "none"
      secondsEl.parentElement.style.display = "none"
      return "aa"
   }

   daysEl.innerText = addZero(days)
   hoursEl.innerText = addZero(hours)
   minutesEl.innerText = addZero(minutes)
   secondsEl.innerText = addZero(seconds)

   if (timerElemenets[count].innerText === "00") {
      timerElemenets[count].parentElement.style.display = 'none'
      count++
   }
}

function addZero(n) {
   return n < 10 ? "0" + n : n
}