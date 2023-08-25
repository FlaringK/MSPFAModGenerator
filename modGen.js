const test = document.getElementById("test")

test.innerHTML = "Vriska"

window.addEventListener("message", (e) => {
  // if (e.origin !== "https://mspfa.com/") return;

  console.log(e.data)
  test.innerText = e.data
}, false)