// ADVENTURE SETUP
const desc = document.querySelector(".smol").parentElement.parentElement.nextElementSibling.querySelector("span")

const downloadModButton = document.createElement("button")
downloadModButton.className = "major"
downloadModButton.innerText = "Download Adventure as UHC Mod"
downloadModButton.style.display = "block"

const iframe = document.createElement("iframe")
iframe.id = "modGen"
iframe.src = "https://flaringk.github.io/MSPFAModGenerator/"
iframe.style.width = "880px"
iframe.style.height = "30vh"

downloadModButton.onclick = () => {
  MSPFA.dialog(
    "Download Adventure as UHC Mod",
    iframe,
    ["Close"],
    (o, f) => {}
  )
  postStoryObject()
}

desc.insertAdjacentElement("beforebegin", downloadModButton)

// LOADING MOD
const importRegex = /@import url\(["']?(.+?)["']?\);/g

// CSS
const appendImportCSS = async (inCSS) => {
  let finalCSS = ""
  let baseCSS = inCSS
  let matches = inCSS.matchAll(importRegex)

  if (matches) {
    for (const match of matches) {
      finalCSS += await fetch(match[1]).then(cssFile => cssFile.text())
      baseCSS = baseCSS.replace(match[0], "")
    }
  }

  finalCSS += baseCSS

  return finalCSS
}

const getFullCSS = async (inCSS) => {
  let fullCSS = inCSS
  for (let i = 0; i < 4; i++) {
    fullCSS = await appendImportCSS(fullCSS)
  }
  return fullCSS
}

let postStoryObject = async () => {

  let alteredStory = { ... MSPFA.story}

  // Get Full CSS for importing
  alteredStory.y = await getFullCSS(alteredStory.y)

  // Post Story Object
  console.log(alteredStory)
  document.getElementById("modGen").contentWindow.postMessage(
    JSON.stringify(alteredStory),
    "https://flaringk.github.io/MSPFAModGenerator/"
  )
}