(() => {
  const hotspots = document.querySelectorAll(".Hotspot");

  // Data
  const infoBoxes = [
    {
      title: "We wheel rock you!",
      text: "The earbud's wheel control lets you adjust volume, skip tracks, play/pause music, and manage calls for a seamless, hands-free experience.",
      image: "./video/wheeling.mp4",
    },
    {
      title: "A good day!",
      text: "offers up to 24 hours of battery life, ensuring long-lasting use for all-day listening without the need for frequent recharging",
      image: "./video/battery.mp4",
    },
    {
      title: "This is the tap!",
      text: "tapping control lets you play/pause music, skip tracks, adjust volume, and manage calls with simple taps for a smooth, hands-free experience.",
      image: "./video/tapping.mp4",
    },
  ];

  function loadInfo() {
    infoBoxes.forEach((infoBox, index) => {
      let selected = document.querySelector(`#hotspot-${index + 1}`);

      if (selected) {
        let video = document.createElement("video");
        video.src = infoBox.image;
        video.setAttribute("autoplay", "true");
        video.setAttribute("loop", "true");

        let title = document.createElement("h2");
        title.textContent = infoBox.title;

        let desc = document.createElement("p");
        desc.textContent = infoBox.text;

        selected.appendChild(video);
        selected.appendChild(title);
        selected.appendChild(desc);
      } else {
        console.warn(`Element with ID #hotspot-${index + 1} not found.`);
      }
    });
  }

  function showInfo() {
    let selected = document.querySelector(`#${this.slot}`);
    gsap.to(selected, 1, { autoAlpha: 1 });
  }

  function hideInfo() {
    let selected = document.querySelector(`#${this.slot}`);
    gsap.to(selected, 1, { autoAlpha: 0 });
  }

  loadInfo();

  hotspots.forEach(function (hotspot) {
    hotspot.addEventListener("mouseenter", showInfo);
    hotspot.addEventListener("mouseleave", hideInfo);
  });
})();
