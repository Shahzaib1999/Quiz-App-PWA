export default function swDev() {
  if ("serviceWorker" in navigator) {
    let swUrl = `${process.env.PUBLIC_URL}/sw.js`;
    window.addEventListener("load", () => {
      navigator.serviceWorker
        .register(swUrl)
        .then(function (response) {
          console.log("Service Worker Registered Successfully", response);
        })
        .catch(function (error) {
          console.error(
            "Something goes wrong while registering service worker"
          );
          console.log(error);
        });
    });
  } else {
    console.log("Service Worker is not available");
  }
}