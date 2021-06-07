import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
declare let showdown : any;

@Injectable({
  providedIn: 'root'
})

// This class was the bulk of the javascript from the initial proof of concept
// It has been ported over and modified the absolute minimum to work in angular
// while not being completely irresponsible about obvious issues.  It needs to
// be refactored in the worst of ways.

export class RulePageGetterService {

  constructor(private router: Router) { }

  last = {
    route : "",
    text : "",
    meta : ""
  }

  error404() {
    document.location.href = "/404";
  }

  getCachedInstead(assetName : string, cb : Function) {
    console.log(`assetName ${assetName} provided.  Looking for local file.`);
    let baseUrl = `assets/docs/${assetName}.MD`;
    return fetch(baseUrl)
    .then(res => {
      if (res.ok) {
        console.log(`getCachedInstead: retrieved ${baseUrl}`);
        return res.text();
      }
      else {
        throw new Error(`Failed to pull page: ${assetName}.  This should be a 404 error.`);
      }
    })
    .then(text => {
      cb(text);
    });
  }

  getGHPage(params : any, cb : Function) {
    console.log(`getGHPage(): params dump`);
    console.log(params);
    let url         = params.url         !== undefined ? params.url : "ERROR";
    let assetName   = params.assetName   !== undefined ? params.assetName : "";
    let fallbackUrl = params.fallbackUrl !== undefined ? params.fallbackUrl : "";
    let metadata    = params.meta        !== undefined ? params.meta : false;
    let noCache     = params.noCache     !== undefined ? params.noCache : false;
    // if we got redirected to a 404 page then we bail on this.
    // sending an empty promise to fulfill expectations downstream.
    //
    if (url.includes("404.html")) {
      var empty = new Promise<void>((resolve, reject) => {
      })
      return empty;
    }
    if (assetName != "") {
      return this.getCachedInstead(assetName, cb)
      .catch((error) => {
        console.log(error);
        // if we catch an error in local cache, let's attempt to pull the GH page.
        console.log(`fetching ${url}`);
        return fetch(url)
        .then(res => {
          if (res.ok) {
            return res.text();
          }
          else {
            this.error404();
            throw new Error(`Failed to pull page: ${assetName}.  This should be a 404 error.`);
          }
        })
        .then(text => {
          cb(text);
        });
    })}
    else {
      console.log(`fetching ${url}`);
      return fetch(url)
      .then(res => {
        if (res.ok) {
          return res.text();
        }
        else {
          this.error404();
          throw new Error(`Failed to pull page: ${assetName}.  This should be a 404 error.`);
        }
      })
      .then(text => {
        cb(text);
        if (!noCache) {
          this.last.route = assetName;
          this.last.text = text;
        }
      })};
  }

  unpackMetadata(text : string) {
    var meta : any = {};
    // split content so we can parse for metadata
    var lines = text.split(/\r?\n/);
    console.log(`doShowdown(): parsing ${lines.length} lines for metadata`);
    // metadata starts with @ and must be at the very beginning of the markdown file.
    // this is not a standard format, because there isn't one.  this will probably
    // evolve as time progresses.
    for (let i=0; i<lines.length; i++) {
      if (lines[i].startsWith("@")) {
        let line = lines[i].split(":");
        let key = line[0].trim().slice(1).toLowerCase();
        let val = line[1].trim()
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
    this.last.meta = meta;
    console.log("Page metadata:");
    console.log(meta);
    return {text, meta};
  }

  getLocationAssetName() {
    // slice(1) to remove leading /
    const assetName = this.router.url.slice(1);
    return assetName;
  }


  buildGHUrl(fallbackUrl? : string) {
    let defaultURL = 'https://raw.githubusercontent.com/daed/datajack/master/docs/index.MD';
    let url;
    let page = this.getLocationAssetName();
    if (page != "") {
      url = `https://raw.githubusercontent.com/daed/datajack/master/docs/${page}.MD`;
    }
    else {
      url = defaultURL;
    }
    return url;
  }


  renderShowdown(text : any, elementId: string, parseMetadata : boolean, cb? : Function) {
    var meta : any = {};
    var data : any = {};

    if (parseMetadata) {
      data = this.unpackMetadata(text);
      text = data.text;
    }
    console.log("rule-page-getter: renderShowdown(): text");
    console.log(text);
    let sd = document.getElementById(elementId);
    let converter   = new showdown.Converter();
    converter.setFlavor('github');
    let html        = converter.makeHtml(text);
    if (sd !== null) {
      sd.innerHTML = html;
    }
    if (cb) {
      return cb(data);
    }
  }

}
