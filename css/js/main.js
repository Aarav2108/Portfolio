/* ==========================================================
   Portfolio script – shared by every page
   ========================================================== */

   document.addEventListener("DOMContentLoaded", function () {
    // 1. Mobile navigation toggle
    var toggle = document.querySelector(".nav-toggle");
    var menu = document.getElementById("nav-menu");
  
    if (toggle && menu) {
      toggle.addEventListener("click", function () {
        var isOpen = menu.classList.toggle("open");
        toggle.setAttribute("aria-expanded", isOpen);
      });
  
      // Close the menu after a link is chosen on mobile
      menu.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", function () {
          menu.classList.remove("open");
          toggle.setAttribute("aria-expanded", "false");
        });
      });
    }
  
    // 2. Highlight the current page in the navigation
    var currentPage = window.location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll(".nav-links a").forEach(function (link) {
      if (link.getAttribute("href") === currentPage) {
        link.classList.add("active");
        link.setAttribute("aria-current", "page");
      }
    });
  
    // 3. Keep the footer year up to date
    var year = document.getElementById("year");
    if (year) {
      year.textContent = new Date().getFullYear();
    }
  
    // 4. Copy email address button (Contact page)
    var copyBtn = document.getElementById("copy-email");
    if (copyBtn) {
      copyBtn.addEventListener("click", function () {
        var email = copyBtn.getAttribute("data-email");
        navigator.clipboard.writeText(email).then(function () {
          copyBtn.textContent = "Copied!";
          setTimeout(function () { copyBtn.textContent = "Copy"; }, 2000);
        }).catch(function () {
          copyBtn.textContent = "Copy failed";
        });
      });
    }
  
    // 5. Contact form – opens the visitor's email app with the message filled in
    var form = document.getElementById("contact-form");
    if (form) {
      form.addEventListener("submit", function (event) {
        event.preventDefault();
  
        var name = form.elements.name.value.trim();
        var email = form.elements.email.value.trim();
        var message = form.elements.message.value.trim();
        var status = document.getElementById("form-status");
  
        if (!name || !email || !message) {
          status.textContent = "Please fill in all fields before sending.";
          return;
        }
  
        var to = form.getAttribute("data-to");
        var subject = encodeURIComponent("Portfolio enquiry from " + name);
        var body = encodeURIComponent(message + "\n\nFrom: " + name + " (" + email + ")");
  
        window.location.href = "mailto:" + to + "?subject=" + subject + "&body=" + body;
        status.textContent = "Your email app should now open with your message ready to send.";
        form.reset();
      });
    }
  });