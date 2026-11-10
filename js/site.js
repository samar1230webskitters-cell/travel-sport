(() => {
  const root = document.documentElement;
  const themeToggle = document.querySelector(".theme-toggle");
  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".primary-nav");

  let savedTheme = null;
  try {
    savedTheme = localStorage.getItem("northbound-theme");
  } catch (error) {
    console.warn("Theme preference could not be read from local storage.", error);
  }
  const preferredTheme = savedTheme || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");

  function applyTheme(theme) {
    root.dataset.theme = theme;
    if (themeToggle) {
      const darkMode = theme === "dark";
      themeToggle.setAttribute("aria-label", `Switch to ${darkMode ? "light" : "dark"} mode`);
      themeToggle.querySelector(".theme-icon").textContent = darkMode ? "☼" : "◐";
    }
  }

  applyTheme(preferredTheme);

  const destinationDetails = document.querySelector(".destination-detail-page");
  if (destinationDetails) {
    const destinations = {
      sandakphu: {
        name: "Sandakphu", title: "Sandakphu & the sleeping Buddha.", kicker: "THE HIGH TRAIL", region: "Singalila Ridge · West Bengal", length: "5 nights", pace: "Moderate", price: "₹24,500", season: "Oct – May",
        image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=2200&q=90", storyImage: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1400&q=85",
        summary: "Walk the Singalila ridge, wake up above the clouds and meet the mountain at first light.",
        lede: "Follow a high, open ridgeline where the horizon feels endless and the days find their own pace.",
        copy: "Stay in welcoming mountain lodges, share the trail with local guides and leave room for those unplanned moments that become the best part of a journey.",
        highlights: [["First light on the ridge", "Watch the peaks catch the morning sun from a quiet viewpoint above the clouds."], ["Walk at your pace", "Take the trail with a local guide, with time to pause and take it all in."], ["Come in, get cosy", "Return to warm hospitality and a comfortable place to rest after a day outdoors."]]
      },
      sikkim: {
        name: "Sikkim", title: "Sikkim, at your own pace.", kicker: "SLOW MOUNTAIN DAYS", region: "Gangtok & beyond · Sikkim", length: "6 nights", pace: "Easy", price: "₹32,000", season: "Mar – Jun · Sep – Dec",
        image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=2200&q=90", storyImage: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1400&q=85",
        summary: "Monastery mornings, hillside homestays and the unhurried roads of the Teesta valley.",
        lede: "Let the mountain days unfold slowly, between prayer flags, forest roads and generous cups of tea.",
        copy: "Meet the people and places that make Sikkim special, with comfortable stays, local hosts and enough breathing room to follow your curiosity.",
        highlights: [["Monastery mornings", "Begin the day among prayer flags and the calm rhythm of hillside monasteries."], ["The Teesta valley", "Follow winding roads through changing landscapes, with time for unplanned stops."], ["Stay with local hosts", "Settle into welcoming homes and enjoy a closer view of everyday mountain life."]]
      },
      darjeeling: {
        name: "Darjeeling", title: "Darjeeling, between the lines.", kicker: "TEA, TRAINS & TOWN", region: "Darjeeling · West Bengal", length: "3 nights", pace: "Easy", price: "₹16,500", season: "Mar – May · Oct – Dec",
        image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=2200&q=90", storyImage: "https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?auto=format&fit=crop&w=1400&q=85",
        summary: "Old-world lanes, a toy train whistle and a table set for one more cup of tea.",
        lede: "Find a gentler side of Darjeeling in its quiet lanes, tea gardens and far-reaching mountain views.",
        copy: "Take time for a slow breakfast, a local walk and a good cup of tea. This is a short escape made for noticing the small things.",
        highlights: [["Tea garden quiet", "See where the region’s famous tea begins, among green slopes and morning mist."], ["A ride through town", "Take in the hills at an easy pace aboard the much-loved mountain railway."], ["Lanes and little cafés", "Wander old neighbourhoods, browse local shops and linger over another cup."]]
      },
      kalimpong: {
        name: "Kalimpong", title: "Kalimpong, in the garden.", kicker: "THE QUIET HILLS", region: "Kalimpong · West Bengal", length: "4 nights", pace: "Easy", price: "₹19,000", season: "Mar – May · Sep – Dec",
        image: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=2200&q=90", storyImage: "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1400&q=85",
        summary: "Flower nurseries, old neighbourhoods and a little more space to do absolutely nothing.",
        lede: "A quiet hill town for garden paths, far views and days with no need to hurry.",
        copy: "Stay a little longer, meet local growers and explore the town’s mix of histories, gardens and mountain hospitality.",
        highlights: [["A town in bloom", "Visit local nurseries and discover the flowers and plants grown in these hills."], ["Old neighbourhoods", "Explore quiet streets and historic corners with a local perspective."], ["Room to slow down", "Make time for garden views, a long lunch and an afternoon with no plans."]]
      }
    };
    const params = new URLSearchParams(window.location.search);
    const requested = (params.get("destination") || "Sandakphu").toLowerCase();
    const trip = destinations[requested] || destinations.sandakphu;
    const setText = (id, value) => { const element = document.getElementById(id); if (element) element.textContent = value; };
    document.title = `${trip.name} — Northbound`;
    setText("detail-title", trip.title);
    setText("detail-kicker", trip.kicker);
    setText("detail-location", trip.region);
    setText("detail-length", trip.length);
    setText("detail-pace", trip.pace);
    setText("detail-price", trip.price);
    setText("detail-season", trip.season);
    setText("detail-summary", trip.summary);
    setText("detail-lede", trip.lede);
    setText("detail-copy", trip.copy);
    const photo = document.getElementById("detail-photo");
    if (photo) photo.style.backgroundImage = `url("${trip.image}")`;
    const storyImage = document.getElementById("detail-story-image");
    if (storyImage) storyImage.src = trip.storyImage;
    trip.highlights.forEach(([title, copy], index) => {
      setText(`highlight-${["one", "two", "three"][index]}-title`, title);
      setText(`highlight-${["one", "two", "three"][index]}-copy`, copy);
    });
  }

  themeToggle?.addEventListener("click", () => {
    const nextTheme = root.dataset.theme === "dark" ? "light" : "dark";
    applyTheme(nextTheme);
    try {
      localStorage.setItem("northbound-theme", nextTheme);
    } catch (error) {
      console.warn("Theme preference could not be saved to local storage.", error);
    }
  });

  menuToggle?.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Open menu" : "Close menu");
    nav?.classList.toggle("is-open", !isOpen);
  });

  nav?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menuToggle?.setAttribute("aria-expanded", "false");
      menuToggle?.setAttribute("aria-label", "Open menu");
      nav.classList.remove("is-open");
    });
  });

  const heroVideo = document.querySelector(".hero-video");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  if (heroVideo) {
    const showPoster = (error) => {
      heroVideo.classList.add("is-unavailable");
      if (error) console.warn("Hero video could not play; showing the mountain poster instead.", error);
    };
    if (reducedMotion.matches) {
      heroVideo.pause();
    } else {
      heroVideo.play().catch(showPoster);
    }
    heroVideo.addEventListener("error", () => showPoster(heroVideo.error));
    reducedMotion.addEventListener("change", (event) => {
      if (event.matches) {
        heroVideo.pause();
      }
    });
  }

  const today = new Date();
  const dateInput = document.querySelector("#travel-date, .trip-search input[type='date']");
  if (dateInput) {
    const localToday = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
    dateInput.min = localToday;
  }

  const bookingForm = document.querySelector("#booking-form");
  if (bookingForm) {
    const params = new URLSearchParams(window.location.search);
    const destinationInput = bookingForm.elements.namedItem("destination");
    const destination = params.get("destination");
    const stay = params.get("stay");
    const date = params.get("date");
    const guests = params.get("guests");

    if (destination && destinationInput instanceof HTMLSelectElement) {
      const matchingOption = Array.from(destinationInput.options).find((option) => option.value.toLowerCase() === destination.toLowerCase());
      if (matchingOption) destinationInput.value = matchingOption.value;
    }
    if (stay) {
      const stayInput = bookingForm.elements.namedItem("stay");
      if (stayInput instanceof HTMLSelectElement) {
        const matchingOption = Array.from(stayInput.options).find((option) => option.value.toLowerCase() === stay.toLowerCase());
        if (matchingOption) stayInput.value = matchingOption.value;
      }
    }
    const bookingDate = bookingForm.elements.namedItem("date");
    if (date && bookingDate instanceof HTMLInputElement && /^\d{4}-\d{2}-\d{2}$/.test(date)) bookingDate.value = date;
    const guestInput = bookingForm.elements.namedItem("guests");
    if (guests && guestInput instanceof HTMLSelectElement && Array.from(guestInput.options).some((option) => option.value === guests)) {
      guestInput.value = guests;
    }

    bookingForm.addEventListener("submit", (event) => {
      event.preventDefault();
      if (!bookingForm.reportValidity()) return;

      const formData = new FormData(bookingForm);
      const request = Object.fromEntries(formData.entries());
      request.requestedAt = new Date().toISOString();
      const successMessage = document.querySelector("#form-success");

      try {
        const requests = JSON.parse(localStorage.getItem("northbound-trip-requests") || "[]");
        if (!Array.isArray(requests)) throw new TypeError("Saved trip requests are not in the expected format.");
        requests.push(request);
        localStorage.setItem("northbound-trip-requests", JSON.stringify(requests));
        if (successMessage) {
          successMessage.innerHTML = `<strong>Thanks, ${escapeHtml(String(request.name))} — your trip request is saved.</strong> This demo stores it in this browser only. To make a real booking, connect a booking service or backend.`;
          successMessage.hidden = false;
          successMessage.scrollIntoView({ behavior: "smooth", block: "nearest" });
        }
        bookingForm.reset();
        if (destinationInput instanceof HTMLSelectElement && destination && Array.from(destinationInput.options).some((option) => option.value === destination)) {
          destinationInput.value = destination;
        }
      } catch (error) {
        console.error("Trip request could not be saved.", error);
        if (successMessage) {
          successMessage.textContent = "We couldn’t save your request in this browser. Please email hello@northbound.travel instead.";
          successMessage.hidden = false;
          successMessage.scrollIntoView({ behavior: "smooth", block: "nearest" });
        }
      }
    });
  }

  function escapeHtml(value) {
    return value.replace(/[&<>"']/g, (character) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    })[character]);
  }
})();
