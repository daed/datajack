import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RulePageGetterService } from '../rule-page-getter.service';
import { environment } from '../../environments/environment';

// TODO: This might be the magic I need to get the pgpjs worker shit working in Encryptic?
declare let showdown : any;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  // any because 'name' might not exist as a property
  environment : any = environment;
  elementId = "navbar";
  constructor(private router: Router, private rulePageGetter : RulePageGetterService) { }

  ngOnInit(): void {
    var params = {
      url: 'https://raw.githubusercontent.com/daed/datajack/master/docs/_navbar.MD',
      assetName: "_navbar",
      noCache: true
    };
    this.rulePageGetter.getGHPage(params, (data : string) => {
      this.rulePageGetter.renderShowdown(data, this.elementId, false);
    });
  }

  getEnvName(): string {
    if (this.environment.hasOwnProperty('name')) {
      return this.environment.name;
    }
    else {
      return "";
    }
  }

  routeTest() {
    return this.router.url;
  }
}
