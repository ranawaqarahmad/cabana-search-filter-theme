document.querySelector(".btn-scroll-top").addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
  
  window.addEventListener("scroll", function () {
    var scrollTop = window.scrollY || document.documentElement.scrollTop;
    if (scrollTop > 350) {
      document.querySelector(".scroll-top-btn").classList.remove("hidden");
    } else {
      document.querySelector(".scroll-top-btn").classList.add("hidden");
    }
  });