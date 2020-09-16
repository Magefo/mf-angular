import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IframeService } from '../../iframe.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  counter$: Observable<number>;

  constructor(private iframeService: IframeService) {}

  ngOnInit(): void {
    this.counter$ = this.iframeService.counter$;
  }

  shellAdd(): void {
    this.iframeService.shellAdd();
  }

  shellSubstract(): void {
    this.iframeService.shellSubstract();
  }

  add(): void {
    this.iframeService.add();
  }

  substract(): void {
    this.iframeService.substract();
  }
}
