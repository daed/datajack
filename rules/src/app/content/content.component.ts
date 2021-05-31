import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RulePageGetterService } from '../rule-page-getter.service';
declare let showdown : any;

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {

  elementId = "content";

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
      this.rulePageGetter.renderShowdown(data, this.elementId, params.metadata);
    });
  }

  routeTest() {
    return this.router.url;
  }

  fetchData(): string {
    const data = "";
    return data;
  }

}
