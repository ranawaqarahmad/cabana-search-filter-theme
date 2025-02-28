function setupMenuScroll() {
    function checkMenuWidth() {
      const menuComponent = document.querySelector(".list-menu--inline");
      const menuContainer = document.querySelector(".header__inline-menu");
      if (menuComponent.scrollWidth > menuContainer.offsetWidth) {
        menuContainer.classList.add("menu-overflow");
      } else {
        menuContainer.classList.remove("menu-overflow");
      }
    }
    function checkScroll() {
      const menuComponent = document.querySelector(".list-menu--inline");
      const leftArrow = document.querySelector(".menu-slide-arrow-left");
      const rightArrow = document.querySelector(".menu-slide-arrow-right");
      const scrollLeft = menuComponent.scrollLeft;
      const scrollWidth = menuComponent.scrollWidth;
      const clientWidth = menuComponent.clientWidth;
      if (scrollLeft <= 0) {
        leftArrow.setAttribute("disabled", "");
      } else {
        leftArrow.removeAttribute("disabled");
      }
      if (scrollLeft + clientWidth + 2 >= scrollWidth) {
        rightArrow.setAttribute("disabled", "");
      } else {
        rightArrow.removeAttribute("disabled");
      }
    }
    checkMenuWidth();
    window.addEventListener("resize", checkMenuWidth);
    const menuComponent = document.querySelector(".list-menu--inline");
    const leftArrow = document.querySelector(".menu-slide-arrow-left");
    const rightArrow = document.querySelector(".menu-slide-arrow-right");
    leftArrow.addEventListener("click", () => {
      menuComponent.scrollBy({
        left: -200,
        behavior: "smooth",
      });
      setTimeout(checkScroll, 300); // Delay checkScroll() execution after scrolling
    });
    rightArrow.addEventListener("click", () => {
      menuComponent.scrollBy({
        left: 200,
        behavior: "smooth",
      });
      setTimeout(checkScroll, 300); // Delay checkScroll() execution after scrolling
    });
    menuComponent.addEventListener("scroll", checkScroll);
    checkScroll();
  }
  setupMenuScroll();
  