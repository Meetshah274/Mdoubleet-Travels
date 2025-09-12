const bars = document.querySelector(".bars"),
close = document.querySelector(".close"),
menu = document.querySelector(".menu");

bars.addEventListener("click", () => {
menu.classList.add("active");
gsap.from(".menu", {
  opacity: 0,
  duration: .3
})
gsap.from(".menu ul", {
  opacity: 0,
  x: -300
})
});   

close.addEventListener("click", () => {
menu.classList.remove("active")
});


function animateContent(selector) {
selector.forEach((selector) => {
  gsap.to(selector, {
      y: 30,
      duration: 0.1,
      opacity: 1,
      delay: 0.2,
      stagger: 0.2,
      ease: "power2.out",
  });
});
}
let map, marker, selectedCoordinates;

function initMap() {
  // Initialize the Google Map
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 28.6139, lng: 77.2090 }, // Default: New Delhi
    zoom: 10,
  });

  // Add a click event listener to the map
  map.addListener("click", (event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();

    // Remove the previous marker, if any
    if (marker) marker.setMap(null);

    // Add a new marker
    marker = new google.maps.Marker({
      position: { lat, lng },
      map,
    });

    // Store the selected coordinates
    selectedCoordinates = { lat, lng };

    alert(`Location Selected: ${lat}, ${lng}`);
  });
}

document.getElementById("shareLocation").addEventListener("click", function () {
  if (!selectedCoordinates) {
    alert("Please select a location on the map first!");
    return;
  }

  // Generate the Google Maps link
  const mapLink = `https://www.google.com/maps?q=${selectedCoordinates.lat},${selectedCoordinates.lng}`;

  // Prepare the WhatsApp message
  const message = `Hello! Here's my location ,Make a plane to traval over here: ${mapLink}. Click the link to view.`;

  // Redirect to WhatsApp
  window.open(`https://wa.me/9510189034?text=${encodeURIComponent(message)}`, "_blank");
});

function scrollTirggerAnimation(triggerSelector, boxSelectors) {
const timeline = gsap.timeline({
  scrollTrigger: {
      trigger: triggerSelector,
      start: "top 50%",
      end: "top 80%",
      scrub: 1,
  },
});

boxSelectors.forEach((boxSelector) => {
  timeline.to(boxSelector, {
      y: 0,
      duration: 1,
      opacity: 1,
  });
})
}

function swipeAnimation(triggerSelector, boxSelectors) {
const timeline = gsap.timeline({
  scrollTrigger: {
      trigger: triggerSelector,
      start: "top 50%",
      end: "top 100%",
      scrub: 3,
  },
});

boxSelectors.forEach((boxSelector) => {
  timeline.to(boxSelector, {
      x: 0,
      duration: 1,
      opacity:1,
  });
});
}

function galleryAnimation(triggerSelector, boxSelectors) {
const timeline = gsap.timeline({
  scrollTrigger: {
      trigger: triggerSelector,
      start: "top 100%",
      end: "bottom 100%",
      scrub: 1,
  },
});

boxSelectors.forEach((boxSelector) => {
  timeline.to(boxSelector, {
      y: 0,
      opacity: 1,
      duration: 1,
  });
});
}




animateContent([".home .content h5, .home .content h1, .home .content p, .home .content .search"]);

scrollTirggerAnimation(".travel", [".travel .box1", ".travel .box2", ".travel .box3"]);

scrollTirggerAnimation(".feedback .container", [".feedback .label", ".feedback .heading", ".feedback .paragraph"]);

scrollTirggerAnimation(".article", [".article .label", ".article .heading"]);

swipeAnimation(".destinations", [".destinations .heading", ".destinations .content"])

swipeAnimation(".article", [".article .latest-article", ".article .box1", ".article .box2", ".article .box3", ".article .box4"])

galleryAnimation(".destinations .gallery", [".destinations .gallery .box1",".destinations .gallery .box2",
".destinations .gallery .box3",".destinations .gallery .box4",".destinations .gallery .box5"])

galleryAnimation(".featured .gallery", [".featured .gallery .box1",".featured .gallery .box2",".featured .gallery .box3",
".featured .gallery .box4"])

galleryAnimation(".feedback .voices", [".feedback .voices .box1",".feedback .voices .box2",".feedback .voices .box3",
".feedback .voices .box4",".feedback .voices .box5",".feedback .voices .box6"])