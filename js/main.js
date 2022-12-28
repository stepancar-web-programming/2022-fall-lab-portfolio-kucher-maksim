document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('a').forEach(el => {
    el.addEventListener('active', () => {
      const element = document.getElementsByClassName('active')
      element.classList.removeClass('active')
    })
  })
})
document.getElementsByTagName('html, body')

const scrolling = document.querySelectorAll('section')
const navLinks = document.querySelectorAll('main-nav, main-nav-subpage')

window.onscroll = () => {
  scrolling.forEach(sec => {
    const top = window.scrollY
    const offset = sec.offsetTop
    const height = sec.offsetHeight
    const id = sec.getAttribute('id')

    if (top >= offset && top < offset + height) {
      navLinks.forEach(links => {
        links.classList.remove('smoothScroll')
        document
          .querySelector(`main-nav, main-nav-subpage  a[href*=${id}]`)
          .classList.add('smoothScroll')
      })
    }
  })
}

const text = document.querySelector('.sec-text')

const textLoad = () => {
  setTimeout(() => {
    text.textContent = 'Я Максим кучер'
  }, 0)
  setTimeout(() => {
    text.textContent = 'Музыкант'
  }, 2000)
  setTimeout(() => {
    text.textContent = 'Модель'
  }, 3000)
  setTimeout(() => {
    text.textContent = 'Data Scientist'
  }, 7000)
}

textLoad()
setInterval(textLoad, 12000)

$('.services-carousel').owlCarousel({
  autoplay: true,
  loop: true,
  margin: 20,
  dots: true,
  nav: false,
  responsiveClass: true,
  responsive: {
    0: {
      items: 1
    },
    768: {
      items: 2
    },
    900: {
      items: 4
    }
  }
})

const magnifPopup = function () {
  $('.popup-img').magnificPopup({
    type: 'image',
    removalDelay: 300,
    mainClass: 'mfp-with-zoom',
    gallery: {
      enabled: true
    },
    zoom: {
      enabled: true,

      duration: 300,
      easing: 'ease-in-out',

      opener (openerElement) {
        return openerElement.is('img')
          ? openerElement
          : openerElement.find('img')
      }
    }
  })
}

magnifPopup()

$(window).load(() => {
  const portfolioIsotope = $('.portfolio-container').isotope({
    itemSelector: '.portfolio-thumbnail',
    layoutMode: 'fitRows'
  })

  $('#portfolio-flters li').on('click', function () {
    $('#portfolio-flters li').removeClass('filter-active')
    $(this).addClass('filter-active')

    portfolioIsotope.isotope({
      filter: $(this).data('filter')
    })
  })
})
