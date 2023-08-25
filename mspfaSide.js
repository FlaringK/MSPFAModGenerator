let postStoryObject = () => {

  let modStory = MSPFA.story

  // Post Story Object
  document.getElementById("modGen").contentWindow.postMessage(
    JSON.stringify(modStory),
    "https://flaringk.github.io/MSPFAModGenerator/"
  )
}

postStoryObject()