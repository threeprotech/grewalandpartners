(function () {
  var header = document.querySelector(".site-header");
  var button = document.getElementById("menu-btn");
  var nav = document.getElementById("site-nav");

  function setOpen(open) {
    if (!header || !button) return;
    header.classList.toggle("is-open", open);
    button.setAttribute("aria-expanded", open ? "true" : "false");
    button.querySelector(".sr-only").textContent = open ? "Close menu" : "Open menu";
  }

  if (button) {
    button.addEventListener("click", function () {
      setOpen(!header.classList.contains("is-open"));
    });
  }

  if (nav) {
    nav.addEventListener("click", function (event) {
      if (event.target.closest("a")) setOpen(false);
    });
  }

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") setOpen(false);
  });

  window.addEventListener("scroll", function () {
    if (header) header.classList.toggle("is-stuck", window.scrollY > 4);
  }, { passive: true });

  var page = document.body.getAttribute("data-page");
  document.querySelectorAll("[data-nav]").forEach(function (link) {
    if (link.getAttribute("data-nav") === page) {
      link.setAttribute("aria-current", "page");
    }
  });

  var params = new URLSearchParams(window.location.search);
  var service = params.get("service");
  var select = document.getElementById("service");
  if (service && select) {
    Array.prototype.forEach.call(select.options, function (option) {
      if (option.value === service) select.value = service;
    });
  }

  var from = params.get("from");
  var thanks = document.getElementById("thanks-note");
  if (thanks && from === "portal") {
    thanks.textContent = "Your portal request is on its way. We will email access instructions after we confirm the engagement.";
  } else if (thanks && from === "contact") {
    thanks.textContent = "Your message is on its way. We reply by phone or email, usually within one business day.";
  }

  document.querySelectorAll("form").forEach(function (form) {
    form.addEventListener("submit", function (event) {
      if (!form.checkValidity()) {
        event.preventDefault();
        form.classList.add("was-validated");
        var first = form.querySelector(":invalid");
        if (first) first.focus();
      }
    });
  });
})();
