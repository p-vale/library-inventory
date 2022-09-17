let menuOpen = false
let header = document.getElementById('header')
let burger = document.getElementById('burger')
let first = burger.getElementsByTagName('div')[0]
let second = burger.getElementsByTagName('div')[1]
let third = burger.getElementsByTagName('div')[2]

function changer() {
  console.log(menuOpen)
  if (menuOpen) {
    // CLOSE menu
    // hide header
    header.style.marginLeft = '-190px'
    // burger
    burger.classList.remove('burger-x')
    // remove open classes
    first.classList.remove('burger-line-open-1')
    second.classList.remove('burger-line-open-2')
    third.classList.remove('burger-line-open-3')
    // assign close classes
    first.classList.add('burger-line-close-1')
    second.classList.add('burger-line-close-2')
    third.classList.add('burger-line-close-3')
    // set menuOpen
    menuOpen = false
    return
  } 
  // OPEN menu
  // show header
  header.style.marginLeft = '0px'
  // burger
  burger.classList.add('burger-x')
  // remove close classes
  first.classList.remove('burger-line-close-1')
  second.classList.remove('burger-line-close-2')
  third.classList.remove('burger-line-close-3')
  // assign open classes
  first.classList.add('burger-line-open-1')
  second.classList.add('burger-line-open-2')
  third.classList.add('burger-line-open-3')
  // set menuOpen
  menuOpen = true
  return
}

burger.addEventListener('click', changer)
