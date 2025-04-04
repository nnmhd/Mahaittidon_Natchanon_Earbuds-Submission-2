export function revealText() {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

  console.log("revealText");
  const splitType = document.querySelectorAll(".reveal-text");
  splitType.forEach((char, i) => {
    const text = new SplitType(char, { types: "words" });
    gsap.from(text.words, {
      opacity: 0,
      duration: 5,
      stagger: 0.1,
      scrub: false,
      scrollTrigger: {
        trigger: char,
        start: "top 80%",
        end: "top 20%",
        markers: false,
      },
    });
  });
  const lenis = new Lenis();
  lenis.on("scroll", (e) => {
    console.log(e);
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);
}
