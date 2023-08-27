// Get message
const log = document.getElementById("test")
const btn = document.getElementById("downloadBtn")

btn.disabled = true

window.addEventListener("message", (e) => {
  if (e.origin !== "https://mspfa.com") {
    // console.log("Not correct origin", e.origin)
    return;
  }

  console.log(e.data)
  log.innerText = e.data
  genMSPFAMod(JSON.parse(e.data))
}, false)


// VARS
const importRegex = /@import url\(["']?(.+?)["']?\);/g
const imgTagRegex = /\[img\]([^"]*?)\[\/img\]/gi
const altImgTagRegex = /\[img=(\d*?)x(\d*?)\]([^"]*?)\[\/img\]/gi
const cssImgUrlRegex = /url\(["']?((.+?)\.(a?png|jpe?g|pjp|pjpeg|bmp|gif|ico|cur|svg|tiff?|webp))["']?\)/gi

let blob
let modName

const testObject = {
  "i": 52494,
  "d": 1692512112308,
  "u": 1692943250801,
  "c": "115098093217194556855",
  "e": [
    "115098093217194556855"
  ],
  "n": "NUTRITION BLOCK",
  "r": "As everyone knows, a diet consisting of nothing but grubs isn't very balanced...\n\nSuggestions open",
  "h": 2,
  "t": [
    "alternia",
    "alternate",
    "suggestions",
    "trolls",
    "food",
    "nutrition",
    "block",
    "karkat"
  ],
  "a": "Moonsidian",
  "w": "",
  "o": "https://file.garden/XnGyfF1bbgcDmBib/appleicon.png",
  "q": "",
  "x": "",
  "b": 1,
  "y": "div.heart {\n\tbackground-image: url(\"https://file.garden/XnGyfF1bbgcDmBib/NAV.png\");\n}\nheader .mspfalogo {\n\tbackground-image: url(\"https://file.garden/XnGyfF1bbgcDmBib/navheart.png\");\n}\nfooter .mspfalogo {\n\tbackground-image: url(\"https://file.garden/XnGyfF1bbgcDmBib/navheart.png\");\n}\n",
  "j": "",
  "v": "",
  "f": [
    "101503286400034260846"
  ],
  "g": [
    "100855018780708322446",
    "111408551269143987249",
    "104777221248946712774",
    "111810615557659451481",
    "113675182834429962364",
    "109126107428191620495",
    "102249289008578804549",
    "110388628857304002215",
    "114132951019197695422",
    "103524618298474785864",
    "110989818481267588381",
    "104657089020962576778",
    "118387758784995945617",
    "109720785978167009485",
    "111464924493606617193",
    "117231163942179499745",
    "112632621550994354250",
    "103037625745047404658",
    "111305024704304783855",
    "107306149285876802789",
    "109370881094552370906",
    "116543560012100317574",
    "114596173022045869504",
    "117365674978280698410",
    "115691333517300671883"
  ],
  "m": "Next.",
  "p": [
    {
      "d": 1692512646341,
      "c": "NUTRITION BLOCK",
      "b": "[img=650x450]https://file.garden/XnGyfF1bbgcDmBib/field01.png[/img]",
      "n": [
        2
      ]
    },
    {
      "d": 1692512646341,
      "c": "Next.",
      "b": "[img=650x450]https://file.garden/XnGyfF1bbgcDmBib/field02.png[/img]",
      "n": [
        3
      ]
    },
    {
      "d": 1692512646341,
      "c": "Next.",
      "b": "[img=650x450]https://file.garden/XnGyfF1bbgcDmBib/field03.png[/img]\n\nYou're starting to get tired of vegetables.",
      "n": [
        4
      ]
    },
    {
      "d": 1692512646341,
      "c": "Next.",
      "b": "[img=650x450]https://file.garden/XnGyfF1bbgcDmBib/field04.png[/img]\n\nBut what are you going to do? Get meat? At the store? Get real. Your mutagenic behind would hanged, drawn, and legislacerated before you even made it home. \n\nYour only alternative is to go out and hunt some game yourself. But as many know, the only thing you know how to do with that sickle is be KIND OF A DOOFUS BY YOURSELF IN YOUR ROOM.\n\nSo you have but one option. To thresh like the best of them, the rest of them, tougher than leather. Unless you can think of a better idea.",
      "n": [
        5
      ]
    },
    {
      "d": 1692548446982,
      "c": "KARKAT: Examine Field.",
      "b": "[img=650x450]https://file.garden/XnGyfF1bbgcDmBib/field05.png[/img]\n\nHere it is. Your greatest shame. Well, one of your shames. Your many, many shames.\n\nYou have been maintaining it for as long as you can remember, and it is the main reason why you haven't starved to death sweeps ago. Your crops tend to consist of INVASIVE PLANTS that are still SOMEWHAT EDIBLE. Which, due to your tough troll digestive tract, is MOST OF THEM. \n\nMost of the time, one invasive species will come in, and choke out another. Only to later then be usurped by another more invasive, more specious species. It is an endless cycle, and you are the main beneficiary of the wheel. Well, it's more like you are a DEPENDANT on the wheel. But you say beneficiary, because it makes you sound like you're on top.",
      "n": [
        6
      ]
    },
    {
      "d": 1692554684378,
      "c": "KARKAT: Harvest those blue plants.",
      "b": "[img=650x450]https://file.garden/XnGyfF1bbgcDmBib/field06.png[/img]\n\nYou harvest the CARROTS. Carrots are a strange and alien vegetable, but only strange and alien to a human. A human is a strange and alien species. You do not know what a human is, nor would you pose such a question for quite some time. \n\nYou don't think about this while you harvest. You think about slashing a sick scar across some fool's chest as you make broad proclaimations about your heroic journey across space.\n\n\"[color=#626262]AND LET YOUR SUPERIORS KNOW THE NAME OF YOUR FUCKING CARVER, MAGGOT. KARKAT FUCKING VANTAS.[/color]\"\n\nAwesome.",
      "n": [
        7
      ]
    },
    {
      "d": 1692554684378,
      "c": "Next.",
      "b": "[img=650x450]https://file.garden/XnGyfF1bbgcDmBib/field07.gif[/img]\n\nAfter doing that super cool thing by yourself you do the uncool thing of carefully placing the carrots into your little gardening basket, because you do not want them to bruise.\n\nYou have 20 CARROTS.",
      "n": [
        8
      ]
    },
    {
      "d": 1692677215111,
      "c": "KARKAT: Comment on oddly shaped \"basket\".",
      "b": "[img=650x450]https://file.garden/XnGyfF1bbgcDmBib/field08.png[/img]\n\nYES. You are well aware of the fact that your gardening basket is shaped in a somewhat venereal manner. Again, you cannot go to the STORE, and such cannot choose what gardening tools you use. Beggars can't be choosers.\n\nYou pilfered this from a long abandoned hive, likely from some kind of sick gardening pervert. You try not to think of the things that may or may not have been inside of this [s] woven pail[/s] gardening basket. You must have disinfected it thousands of times by now.",
      "n": [
        9
      ]
    },
    {
      "d": 1692739775827,
      "c": "KARKAT: Wonder how you haven't suffered serious health issues despite being a member of a distinctly carnivorous species.",
      "b": "[img=650x450]https://file.garden/XnGyfF1bbgcDmBib/field09.png[/img]\n\nWho said you didn't suffer serious health issues?",
      "n": [
        10
      ]
    },
    {
      "d": 1692739775827,
      "c": "Next.",
      "b": "[img=650x450]https://file.garden/XnGyfF1bbgcDmBib/field10.png[/img]\n\nOk, well, you don't look THAT bad. But you certainly are in a huge amount of discomfort most of the time. Your head constantly aches, your body always feels weak and tired, and your immune system is total garbage, and as such you get sick very often. \n\nThis melting pot of dietary neglect is likely the cause of your almost exclusively ornery attitude, and why you are pretty much never in fighting form. Literally.\n\nBut of course, as a troll, you do not really give this much thought. You just kind of assumed everyone else is in as much pain as you are. You know, because of the terrible culture and abyssmal living conditions and constant barrage of daily threats.",
      "n": [
        11
      ]
    },
    {
      "d": 1692858357036,
      "c": "KARKAT: Examine suspiciously white plant",
      "b": "[img=650x450]https://file.garden/XnGyfF1bbgcDmBib/field11.png[/img]\n\nWhile you tend to leave the garden to its own devices, every once in a while you have to pluck out a few weeds, or some particularly dangerous plants. These times are the least fun times, which is saying a lot given how miserable you tend to be.\n\nYou kneel down into the dirt near the oddity, and prepare for the worst. It is probably another BRAMBLOOM HUSK. The last time you had to deal with one you were treated to an impromptu haircut, before being nearly impaled on some particularly large thorns. This is going to be so much fun.",
      "n": [
        12
      ]
    },
    {
      "d": 1692937826236,
      "c": "Next.",
      "b": "[img=650x450]https://file.garden/XnGyfF1bbgcDmBib/field12NU.gif[/img]\n\nSurprise! You seem to have a visitor!\n\nNot a plant, but a little nuisance disguised as such. Must have snuck in to get a dig at your crops. Now it's getting a dig at you!",
      "n": [
        13
      ]
    },
    {
      "d": 1692942577338,
      "c": "KARKAT: Take advantage of rare meat opportunity.",
      "b": "[img=650x450]https://file.garden/XnGyfF1bbgcDmBib/field13.png[/img]\n\nOpportumeaty. Meatportunity. Meatatunity?\n\nYou kill the fucking thing, ok?",
      "n": [
        14
      ]
    },
    {
      "d": 1692943250801,
      "c": "Next.",
      "b": "[img=650x450]https://file.garden/XnGyfF1bbgcDmBib/field14NEW.png[/img]\n\nNot a pretty win, but then again, when are your wins ever pretty? Half the damn thing spilled over your crops, so you really hope blood makes good fertilizer. Or at least, doesn't make BAD fertilizer.\n\nRegardless, you thank your lucky stars for the good fortune of finding meat. Even if it's tough, stringy, rubbery meat. Meat is still meat.\n\nYou have 1 SNAKEMEAT.",
      "n": [
        15
      ]
    }
  ]
}

let templateMod = ""
fetch('./templateMod.js').then(response => response.text()).then(text => {
  templateMod = text
  console.log(text)
  // genMSPFAMod(testObject)
});

// GENERATE MOD

const addLog = text => { 
  console.log(text) 
  log.innerHTML = text + "<br>" + log.innerHTML
}

const convertImage = async (url, zip) => {
  
  const name = url.replace(/https?:\/\//g, "").replace(/["<>#%\{\}\|\\\^~\[\]`;\?:@=&]/g, "")
  console.log(name)
  addLog("Fetching " + url)
  
  try {
    const imageBlob = await fetch(url).then(response => response.blob())
    const imgData = new File([imageBlob], name);
    zip.file("assets/mspfaAssets/" + name, imgData, { base64: true })
  } catch(e) {
    addLog("<span class=\"fail\">Failed to fetch " + url + "</span>")
  }

  return "assets://images/mspfaAssets/" + name
}


const convertImagesInBbcode = async (bodyText, zip) => {
  let matches = [...bodyText.matchAll(imgTagRegex)]
  if (matches) {
    for (let mIndex = 0; mIndex < matches.length; mIndex++) {
      const match = matches[mIndex];
      bodyText = bodyText.replace(match[1], await convertImage(match[1], zip))
    }
  }  
  let altMatches = [...bodyText.matchAll(altImgTagRegex)]
  if (altMatches) {
    for (let mIndex = 0; mIndex < altMatches.length; mIndex++) {
      const match = altMatches[mIndex];
      bodyText = bodyText.replace(match[3], await convertImage(match[3], zip))
    }
  }
  return bodyText
}

const convertAllPageImages = async (pages, zip) => {

  for (let pIndex = 0; pIndex < pages.length; pIndex++) {

    pages[pIndex].c = await convertImagesInBbcode(pages[pIndex].c, zip)
    pages[pIndex].b = await convertImagesInBbcode(pages[pIndex].b, zip)
    
  }

  return pages
}

const convertCSSImages = async (css, zip) => {
  let matches = css.match(cssImgUrlRegex)
  if (matches) {
    for (let mIndex = 0; mIndex < matches.length; mIndex++) {
      const match = matches[mIndex].replace(/^url\("?/, "").replace(/"?\)$/, "");
      console.log(match)
      css = css.replace(match, await convertImage(match, zip))
    }
  }
  return css
}

const genMSPFAMod = async story => {

  console.log(story)

  let zip = new JSZip();4

  // get mod text
  await fetch('./templateMod.js').then(response => response.text()).then(text => {
    templateMod = text
  });

  // Convert and Download Images
  // story.x = await convertImage(story.x, zip) // banner
  story.o = await convertImage(story.o, zip) // icon
  story.r = await convertImagesInBbcode(story.r, zip) // Description
  story.p = await convertAllPageImages(story.p, zip) // Pages
  story.y = await convertCSSImages(story.y, zip) // CSS

  const adventureDetails = {
    name: story.n,
    author: story.a,
    authId: story.c
  }
  
  zip.file("adventure.json", JSON.stringify(story))
  zip.file("mod.js", templateMod.replace("const adventureDetails = {}", "const adventureDetails = " + JSON.stringify(adventureDetails)))

  // Download Mod
  await zip.generateAsync({type:"blob"}).then(function(content) {
    // downloadBlob(content, "mod.zip")
    blob = content
    modName = "MSPFA-Port_" + story.n.replace(/[^a-z0-9]/gi, '-').toLowerCase();
  });

  addLog(`<b>=== ${story.n} ready to download ===</b>`)
  btn.disabled = false
}

const downloadMod = () => {
  downloadBlob(blob, modName)
}

// https://dev.to/nombrekeff/download-file-from-blob-21ho
function downloadBlob(blob, name = 'mod.zip') {
  // Convert your blob into a Blob URL (a special url that points to an object in the browser's memory)
  const blobUrl = URL.createObjectURL(blob);

  // Create a link element
  const link = document.createElement("a");

  // Set link's href to point to the Blob URL
  link.href = blobUrl;
  link.download = name;

  // Append link to the body
  document.body.appendChild(link);

  // Dispatch click event on the link
  // This is necessary as link.click() does not work on the latest firefox
  link.dispatchEvent(
    new MouseEvent('click', { 
      bubbles: true, 
      cancelable: true, 
      view: window 
    })
  );

  // Remove link from body
  document.body.removeChild(link);
}