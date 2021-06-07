import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RulePageGetterService } from '../rule-page-getter.service';
declare let showdown : any;

@Component({
  selector: 'app-annoucements',
  templateUrl: './annoucements.component.html',
  styleUrls: ['./annoucements.component.css']
})
export class AnnoucementsComponent implements OnInit {

  constructor(private router: Router, private rulePageGetter : RulePageGetterService) { }

  elementId = "announcement";

  ngOnInit(): void {
    var params = {
      url: 'https://raw.githubusercontent.com/daed/datajack/master/docs/_announce.MD',
      assetName: "_announce",
      noCache: true,
      allowFail: true
    };
    this.rulePageGetter.getGHPage(params, (data : string) => {
      console.log(data);
      this.rulePageGetter.renderShowdown(data, this.elementId, false);
    });
  }
}
