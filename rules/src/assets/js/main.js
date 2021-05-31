function getCachedInstead(assetName, cb) {
  console.log(`assetName ${assetName} provided.  Looking for local file.`);
  let baseUrl = `/docs/${assetName}.MD`;
  return fetch(baseUrl)
  .then(res => {
    if (res.ok) {
      console.log(`getCachedInstead: retrieved ${baseUrl}, 200`);
      return res.text();
    }
    else {
      throw new Error(res.error);
    }
  })
  .then(text => {
    cb(text);
  });
}

function getGHPage(params, cb) {
  console.log(`getGHPage(): params dump`);
  console.log(params);
  let url         = params.url         !== undefined ? params.url : "ERROR";
  let assetName   = params.assetName   !== undefined ? params.assetName : "";
  let fallbackUrl = params.fallbackUrl !== undefined ? params.fallbackUrl : "";
  let metadata    = params.meta        !== undefined ? params.meta : false;

  if (assetName != "") {
    getCachedInstead(assetName, cb)
    .catch((error) => {
      console.log(error);
      // if we catch an error in local cache, let's attempt to pull the GH page.
      console.log(`fetching ${url}`);
      fetch(url)
      .then(res => {
        return res.text();
      })
      .then(text => {
        cb(text);
      });
  })}
  else {
    console.log(`fetching ${url}`);
    fetch(url)
    .then(res => {
      return res.text();
    })
    .then(text => {
      cb(text);
  })}
}

function unpackMetadata(text) {
  meta = {};
  // split content so we can parse for metadata
  var lines = text.split(/\r?\n/);
  console.log(`doShowdown(): parsing ${lines.length} lines for metadata`);
  // metadata starts with @ and must be at the very beginning of the markdown file.
  // this is not a standard format, because there isn't one.  this will probably
  // evolve as time progresses.
  for (let i=0; i<lines.length; i++) {
    if (lines[i].startsWith("@")) {
      let line = lines[i].split(":");
      let key = line[0].trim("@: ").slice(1).toLowerCase();
      let val = line[1].trim(": ")
      console.log(`[metadata] ${key}: ${val}`);
      meta[key] = val;
      lines[i] = "";
    }
    else {
      console.log(`aborting metadata lookup, no leading @ in: ${lines[i]}`);
      break;
    }
  }
  // turn the markdown back into a block for showdown
  text = lines.join('\n');
  return {text, meta};
}

function doShowdown(elementId, text, parseMetadata, cb) {
  var meta = {};
  if (parseMetadata) {
    var data = unpackMetadata(text);
    text = data.text;
  }
  let sd = document.getElementById(elementId);
  let converter   = new showdown.Converter();
  converter.setFlavor('github');
  let html        = converter.makeHtml(text);
  sd.innerHTML = html;
  if (cb) {
    cb(data);
  }
}

function getLocationAssetName() {
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.has('loc')) {
    let page = urlParams.get('loc').trim(". ");
    return page;
  }
  return "";
}

function buildGHUrl(fallbackUrl) {
  let defaultURL = 'https://raw.githubusercontent.com/daed/datajack/master/docs/index.MD';
  let url;
  let page = getLocationAssetName();
  if (page != "") {
    url = `https://raw.githubusercontent.com/daed/datajack/master/docs/${page}.MD`;
  }
  else {
    url = defaultURL;
  }
  return url;
}
