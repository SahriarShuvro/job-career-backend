let allCardSection = document.querySelectorAll('.cardsAll')

allCardSection.forEach(singleCardSection => {
  let activeButton = singleCardSection.querySelector('.activeButton')
  let inactiveButton = singleCardSection.querySelector('.inactiveButton')

  let cardStatusActive = singleCardSection.querySelector('.cardStatusActive')
  let cardStatusInactive = singleCardSection.querySelector('.cardStatusInactive')



  activeButton.addEventListener('click', function () {
    alert('Are you sure! you want to activate it?')
    cardStatusActive.classList.add('activeCard')
    cardStatusInactive.classList.remove('inactiveCard')
  })
  inactiveButton.addEventListener('click', function () {
    alert('Are you sure! you want to deactivate it?')
    cardStatusInactive.classList.add('inactiveCard')
    cardStatusActive.classList.remove('activeCard')
  })


});