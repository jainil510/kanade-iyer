(function () {
  "use strict";

  var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Scroll progress bar ---------- */
  var progressBar = document.getElementById("scroll-progress");
  var ticking = false;
  function updateProgress() {
    var doc = document.documentElement;
    var scrollable = doc.scrollHeight - doc.clientHeight;
    var pct = scrollable > 0 ? (doc.scrollTop / scrollable) * 100 : 0;
    if (progressBar) progressBar.style.width = pct + "%";
    ticking = false;
  }
  function onScroll() {
    if (!ticking) {
      window.requestAnimationFrame(updateProgress);
      ticking = true;
    }
  }
  if (progressBar) {
    updateProgress();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
  }

  /* ---------- Sticky header shadow ---------- */
  var header = document.getElementById("site-header");
  if (header) {
    var toggleHeader = function () {
      header.classList.toggle("scrolled", window.scrollY > 8);
    };
    toggleHeader();
    window.addEventListener("scroll", toggleHeader, { passive: true });
  }

  /* ---------- Section reveal on scroll ---------- */
  var revealEls = document.querySelectorAll(".reveal");
  if (revealEls.length && !prefersReducedMotion && "IntersectionObserver" in window) {
    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach(function (el) { revealObserver.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("in-view"); });
  }

  /* ---------- Hero ampersand line-draw ---------- */
  var amp = document.getElementById("amp-glyph");
  if (amp) {
    window.requestAnimationFrame(function () {
      setTimeout(function () { amp.classList.add("drawn"); }, 150);
    });
  }

  /* ---------- Rail nav active-section tracking ---------- */
  var railLinks = document.querySelectorAll("#rail-nav a");
  if (railLinks.length && "IntersectionObserver" in window) {
    var sectionIds = ["hero", "services", "why", "fees", "contact"];
    var sections = sectionIds
      .map(function (id) { return document.getElementById(id); })
      .filter(Boolean);

    var railObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            railLinks.forEach(function (link) {
              var active = link.getAttribute("data-rail") === entry.target.id;
              link.classList.toggle("active", active);
              if(active){link.setAttribute("aria-current","location");}else{link.removeAttribute("aria-current");}
            });
          }
        });
      },
      { rootMargin: "-45% 0px -45% 0px" }
    );
    sections.forEach(function (s) { railObserver.observe(s); });
  }

  /* ---------- Credential count-up ---------- */
  var credentials = document.getElementById("credentials");
  if (credentials) {
    var figures = credentials.querySelectorAll(".credential-figure[data-count-to]");
    var runCountUp = function () {
      figures.forEach(function (figure) {
        var target = parseInt(figure.getAttribute("data-count-to"), 10);
        var suffix = figure.getAttribute("data-suffix") || "";
        if (prefersReducedMotion) {
          figure.textContent = target + suffix;
          return;
        }
        var start = 0;
        var duration = 900;
        var startTime = null;
        function step(timestamp) {
          if (startTime === null) startTime = timestamp;
          var progress = Math.min((timestamp - startTime) / duration, 1);
          var eased = 1 - Math.pow(1 - progress, 3);
          var value = Math.round(start + (target - start) * eased);
          figure.textContent = value + suffix;
          if (progress < 1) window.requestAnimationFrame(step);
        }
        window.requestAnimationFrame(step);
      });
    };

    if ("IntersectionObserver" in window) {
      var countObserver = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              runCountUp();
              countObserver.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.4 }
      );
      countObserver.observe(credentials);
    } else {
      runCountUp();
    }
  }

  /* ---------- Enquiry form ---------- */
  var form = document.getElementById("enquiry-form");
  if (!form) return;

  var confirmEl = document.getElementById("form-confirm");
  var submitBtn = form.querySelector('button[type="submit"]');
  var submitting = false;

  var fields = {
    name: {
      input: document.getElementById("f-name"),
      error: document.getElementById("err-name"),
      wrap: document.getElementById("f-name").closest(".field"),
      validate: function (v) {
        return v.trim().length > 0 ? "" : "Enter your name.";
      }
    },
    email: {
      input: document.getElementById("f-email"),
      error: document.getElementById("err-email"),
      wrap: document.getElementById("f-email").closest(".field"),
      validate: function (v) {
        if (v.trim().length === 0) return "Enter your email address.";
        var pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return pattern.test(v.trim()) ? "" : "Enter a valid email address.";
      }
    },
    phone: {
      input: document.getElementById("f-phone"),
      error: document.getElementById("err-phone"),
      wrap: document.getElementById("f-phone").closest(".field"),
      validate: function (v) {
        if (v.trim().length === 0) return ""; // optional
        var pattern = /^[0-9+\-\s()]{7,15}$/;
        return pattern.test(v.trim()) ? "" : "Enter a valid phone number.";
      }
    },
    message: {
      input: document.getElementById("f-message"),
      error: document.getElementById("err-message"),
      wrap: document.getElementById("f-message").closest(".field"),
      validate: function (v) {
        return v.trim().length > 0 ? "" : "Add a short message so we know how to help.";
      }
    }
  };

  var audienceError = document.getElementById("err-audience");
  var audienceInputs = form.querySelectorAll('input[name="audience"]');

  function setFieldError(field, message) {
    field.error.textContent = message;
    if (message) {
      field.wrap.classList.add("has-error");
      field.input.setAttribute("aria-invalid", "true");
    } else {
      field.wrap.classList.remove("has-error");
      field.input.removeAttribute("aria-invalid");
    }
  }

  function validateAudience() {
    var checked = false;
    audienceInputs.forEach(function (r) {
      if (r.checked) checked = true;
    });
    audienceError.textContent = checked ? "" : "Let us know if you are a business or an individual.";
    return checked;
  }

  Object.keys(fields).forEach(function (key) {
    var field = fields[key];
    field.input.addEventListener("input", function () {
      var message = field.validate(field.input.value);
      setFieldError(field, message);
    });
  });

  audienceInputs.forEach(function (r) {
    r.addEventListener("change", validateAudience);
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    if(submitting) return;
    submitting = true;
    submitBtn.disabled = true;
    submitBtn.textContent = "Sending…";
    confirmEl.textContent = "";

    var firstInvalid = null;

    Object.keys(fields).forEach(function (key) {
      var field = fields[key];
      var message = field.validate(field.input.value);
      setFieldError(field, message);
      if (message && !firstInvalid) firstInvalid = field.input;
    });

    var audienceOk = validateAudience();
    if (!audienceOk && !firstInvalid) {
      firstInvalid = audienceInputs[0];
    }

    if (firstInvalid) {
      firstInvalid.focus();
      return;
    }

    // No backend on this engagement — log the payload instead.
    var payload = {
      name: fields.name.input.value.trim(),
      email: fields.email.input.value.trim(),
      phone: fields.phone.input.value.trim(),
      audience: form.querySelector('input[name="audience"]:checked').value,
      message: fields.message.input.value.trim(),
      submittedAt: new Date().toISOString()
    };
    console.log("Enquiry received:", payload);

    confirmEl.textContent = "Your enquiry has been received. We respond within one working day.";
    form.reset();
    Object.keys(fields).forEach(function (key) {
      setFieldError(fields[key], "");
    });
    audienceError.textContent = "";
    confirmEl.focus();
    submitting = false;
    submitBtn.disabled = false;
    submitBtn.textContent = submitBtn.dataset.defaultLabel || "Send enquiry";
  });
})();
