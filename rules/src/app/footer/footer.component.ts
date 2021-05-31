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
      url: `https://raw.githubusercontent.com/daed/datajack/master/docs/${curRoute}.MD`,
      assetName: curRoute,
      noCache: false,
      metadata: true
    };
    this.rulePageGetter.getGHPage(params, (data : string) => {
      this.renderCreditText(data, params.metadata);
    });
  }

  renderCreditText(text : any, parseMetadata : boolean, cb? : Function) {
    var meta : any = {};
    var data : any = {};

    if (parseMetadata) {
      data = this.rulePageGetter.unpackMetadata(text);
      text = data.text;
    }
    let sd = document.getElementById("author-name");
    if (sd) sd.innerText = data.meta.author;
    sd = document.getElementById("author-note");
    if (sd) sd.innerText = data.meta.note;
  }
}
