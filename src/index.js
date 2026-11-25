(() => {
  const checkoutUrl = window.SITE_CONFIG?.checkoutUrl?.trim() || "";
  const checkoutLinks = document.querySelectorAll("[data-checkout]");
  const checkoutNotes = document.querySelectorAll("[data-checkout-note]");
  const toast = document.querySelector(".toast");
  let toastTimer;

  const validCheckout = (() => {
    if (!checkoutUrl) return false;
    try {
      return new URL(checkoutUrl).protocol === "https:";
    } catch {
      return false;
    }
  })();

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("is-visible");
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => toast.classList.remove("is-visible"), 4800);
  }

  checkoutLinks.forEach((link) => {
    if (validCheckout) {
      link.href = checkoutUrl;
      link.removeAttribute("aria-disabled");
      link.addEventListener("click", (event) => {
        event.preventDefault();
        window.location.assign(checkoutUrl);
      });
      return;
    }

    link.href = "#oferta";
    link.addEventListener("click", (event) => {
      event.preventDefault();
    //   showToast("O endereço do checkout ainda não foi configurado. Assim que você tiver o link da Kiwify ou Cakto, adicione-o em checkout.config.js.");
      document.querySelector("[data-checkout-note]")?.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  });

  checkoutNotes.forEach((note) => {
    if (!validCheckout) note.hidden = false;
  });

  document.querySelectorAll(".faq-item").forEach((item) => {
    item.addEventListener("toggle", () => {
      if (!item.open) return;
      document.querySelectorAll(".faq-item[open]").forEach((otherItem) => {
        if (otherItem !== item) otherItem.open = false;
      });
    });
  });

  const year = document.querySelector("#current-year");
  if (year) year.textContent = new Date().getFullYear();
})();