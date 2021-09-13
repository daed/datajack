import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RulePageGetterService } from '../rule-page-getter.service';
declare let showdown : any;

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent implements OnInit {

  constructor(private router: Router, private rulePageGetter : RulePageGetterService) { }

  ngOnInit(): void {

  }

  exitNavbar(e: any): void {
    console.log(e.target.parentElement.id);
    if(e.target.parentElement.id == 'yourID') {
      var d = document.getElementById('sidebar-wrapper');
      d?.classList.toggle("toggle-sidebar");
    }
  }

  toggleNavbar(): void {
    var d = document.getElementById('sidebar-wrapper');
    d?.classList.toggle("toggle-sidebar");
    d = document.getElementById('toggle-sidebar-label');
    console.log(d);
    if (d?.innerText.includes("Show")) {
      console.log("setting show to hide");
      d.innerText = d?.innerText.replace("Show", "Hide");
    }
    else if (d?.innerText.includes("Hide")) {
      d.innerText = d?.innerText.replace("Hide", "Show");
    }
  }

}
