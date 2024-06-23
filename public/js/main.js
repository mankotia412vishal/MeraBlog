document.addEventListener('DOMContentLoaded', function() {
    // List of Lottie JSON file paths
    const lottieFiles = [
      '/lottie/1.json',
      '/lottie/2.json',
      '/lottie/3.json',
      '/lottie/4.json',
      '/lottie/5.json',
      '/lottie/welcome.json' // Assuming you have a welcome.json file
    ];
  
    const lottieContainer = document.getElementById('lottie-animation');
    let currentIndex = 0;
    let animation;
  
    // Function to load and display Lottie animation
    const loadLottieAnimation = () => {
      animation = bodymovin.loadAnimation({
        container: lottieContainer,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: lottieFiles[currentIndex]
      });
    };
  
    // Load the first animation on page load
    loadLottieAnimation();
  
    // Function to change animation every 3 seconds
    const changeAnimation = () => {
      currentIndex = (currentIndex + 1) % lottieFiles.length;
      animation.destroy(); // Destroy the previous animation
      loadLottieAnimation();
    };
  
    // Automatically change animation every 3 seconds
    setInterval(changeAnimation, 3000);
  
    // Pause animation on hover
    lottieContainer.addEventListener('mouseover', () => {
      animation.pause();
    });
  
    // Resume animation on mouseout
    lottieContainer.addEventListener('mouseout', () => {
      animation.play();
    });
  
    // Typing text effect
    const textLines = ['Welcome to MeraBlog❤️ by Vishal Singh'];
    let currentTextIndex = 0;
    const typingSpeed = 100; // Adjust typing speed in milliseconds
    const pauseDuration = 2000; // Pause duration between lines in milliseconds
  
    const typeText = () => {
      const typingElement = document.querySelector('.typing');
      const subtypingElement = document.querySelector('.subtyping');
  
      typingElement.innerHTML = '';
      subtypingElement.innerHTML = '';
  
      let charIndex = 0;
  
      const typeChar = () => {
        if (charIndex < textLines[currentTextIndex].length) {
          if (currentTextIndex === 0) {
            typingElement.innerHTML += textLines[currentTextIndex].charAt(charIndex);
          } else {
            subtypingElement.innerHTML += textLines[currentTextIndex].charAt(charIndex);
          }
          charIndex++;
          setTimeout(typeChar, typingSpeed);
        } else {
          currentTextIndex = (currentTextIndex + 1) % textLines.length;
          if (currentTextIndex === 0) {
            setTimeout(typeText, pauseDuration); // Wait for the pause duration before typing the next line
          } else {
            typeText();
          }
        }
      };
  
      typeChar();
    };
  
    typeText();
  });
  

  document.addEventListener('DOMContentLoaded', function() {
    // Load Lottie animations for each card in the bottom_articles container
    const animation1 = bodymovin.loadAnimation({
      container: document.getElementById('lottie-animation-1'),
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: '/lottie/recent_articles.json' // Path to your first Lottie animation JSON file
    });
  
    const animation2 = bodymovin.loadAnimation({
      container: document.getElementById('lottie-animation-2'),
      renderer: 'svg',
      loop: true,
      autoplay: true,
  
      path: '/lottie/new_article.json' // Path to your second Lottie animation JSON file
    });
  
    // Function to navigate to a new page
    function navigateTo(url) {
      window.location.href = url;
    }
  });
  
// document.addEventListener('DOMContentLoaded', function() {
//     // List of Lottie JSON file paths
//     const lottieFiles = [
//       '/lottie/1.json',
//       '/lottie/2.json',
//       '/lottie/3.json',
//       '/lottie/4.json',
//       '/lottie/5.json',
//       '/lottie/welcome.json' // Assuming you have a welcome.json file
//     ];
  
//     const lottieContainer = document.getElementById('lottie-animation');
//     let currentIndex = 0;
//     let animation;
  
//     // Function to load and display Lottie animation
//     const loadLottieAnimation = () => {
//       animation = bodymovin.loadAnimation({
//         container: lottieContainer,
//         renderer: 'svg',
//         loop: true,
//         autoplay: true,
//         path: lottieFiles[currentIndex]
//       });
//     };
  
//     // Load the first animation on page load
//     loadLottieAnimation();
  
//     // Function to change animation every 3 seconds
//     const changeAnimation = () => {
//       currentIndex = (currentIndex + 1) % lottieFiles.length;
//       animation.destroy(); // Destroy the previous animation
//       loadLottieAnimation();
//     };
  
//     // Automatically change animation every 3 seconds
//     setInterval(changeAnimation, 3000);
  
//     // Pause animation on hover
//     lottieContainer.addEventListener('mouseover', () => {
//       animation.pause();
//     });
  
//     // Resume animation on mouseout
//     lottieContainer.addEventListener('mouseout', () => {
//       animation.play();
//     });
//   });
  
  document.addEventListener('DOMContentLoaded', function() {
    const textContainer = document.querySelector('.typing');
    const textToType = "Welcome to MeraBlog";
    let index = 0;
  
    function typeText() {
      textContainer.textContent += textToType[index];
      index++;
  
      if (index >= textToType.length) {
        clearInterval(typingInterval);
      }
    }
  
    const typingInterval = setInterval(typeText, 100); // Adjust typing speed here
  });
document.addEventListener('DOMContentLoaded', function() {
    /*=============== SHOW MENU ===============*/
    const showMenu = (toggleId, navId) => {
        const toggle = document.getElementById(toggleId),
            nav = document.getElementById(navId)

        toggle.addEventListener('click', () => {
            // Add show-menu class to nav menu
            nav.classList.toggle('show-menu')
            // Add show-icon to show and hide menu icon
            toggle.classList.toggle('show-icon')
        })
    }

    showMenu('nav-toggle', 'nav-menu')

    /*=============== SHOW DROPDOWN MENU ===============*/
    const dropdownItems = document.querySelectorAll('.dropdown__item')

    // 1. Select each dropdown item
    dropdownItems.forEach((item) => {
        const dropdownButton = item.querySelector('.dropdown__button')

        // 2. Select each button click
        dropdownButton.addEventListener('click', () => {
            // 7. Select the current show-dropdown class
            const showDropdown = document.querySelector('.show-dropdown')

            // 5. Call the toggleItem function
            toggleItem(item)

            // 8. Remove the show-dropdown class from other items
            if (showDropdown && showDropdown !== item) {
                toggleItem(showDropdown)
            }
        })
    })

    // 3. Create a function to display the dropdown
    const toggleItem = (item) => {
        // 3.1. Select each dropdown content
        const dropdownContainer = item.querySelector('.dropdown__container')

        // 6. If the same item contains the show-dropdown class, remove
        if (item.classList.contains('show-dropdown')) {
            dropdownContainer.removeAttribute('style')
            item.classList.remove('show-dropdown')
        } else {
            // 4. Add the maximum height to the dropdown content and add the show-dropdown class
            dropdownContainer.style.height = dropdownContainer.scrollHeight + 'px'
            item.classList.add('show-dropdown')
        }
    }

    /*=============== DELETE DROPDOWN STYLES ===============*/
    const mediaQuery = matchMedia('(min-width: 1118px)'),
        dropdownContainer = document.querySelectorAll('.dropdown__container')

    // Function to remove dropdown styles in mobile mode when browser resizes
    const removeStyle = () => {
        // Validate if the media query reaches 1118px
        if (mediaQuery.matches) {
            // Remove the dropdown container height style
            dropdownContainer.forEach((e) => {
                e.removeAttribute('style')
            })

            // Remove the show-dropdown class from dropdown item
            dropdownItems.forEach((e) => {
                e.classList.remove('show-dropdown')
            })
        }
    }

    addEventListener('resize', removeStyle)

    /*=============== LOTTIE ANIMATION ===============*/
    const animation = bodymovin.loadAnimation({
        container: document.getElementById('lottie-animation'),
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: '/lottie/animation.json' // Path to your Lottie JSON file
    });
});
