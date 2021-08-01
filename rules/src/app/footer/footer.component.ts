import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RulePageGetterService } from '../rule-page-getter.service';
declare let showdown : any;

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(private router: Router, private rulePageGetter : RulePageGetterService) { }

  ngOnInit(): void {
    var curRoute : string = this.router.url.slice(1);
    if (curRoute == "") {
      curRoute = "index";
    }
    var params = {
      url: this.rulePageGetter.buildGHUrl("", "_navbar"),
      assetName: curRoute,
      noCache: false,
      metadata: true
    };
    this.rulePageGetter.getGHPage(params, (data : string) => {
      this.renderCreditText(data, params.metadata);
    });
  }

  updateElementById(text : string, id : string) {
    if (text) {
      let sd = document.getElementById(id);
      if (sd) sd.innerText = text;
      return true;
    }
    else {
      let sd = document.getElementById(id);
      if (sd && sd.parentElement) sd.parentElement.innerText = "";
      return false;
    }
  }

  renderCreditText(text : any, parseMetadata : boolean, cb? : Function) {
    var meta : any = {};
    var data : any = {};

    if (parseMetadata) {
      data = this.rulePageGetter.unpackMetadata(text);
      text = data.text;
    }
    this.updateElementById(data.meta.author, "author-name");
    this.updateElementById(data.meta.note, "author-note");
  }
}
