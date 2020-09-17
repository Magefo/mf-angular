import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IframeService } from '../../iframe.service';
import { ShellService } from '../../shell.service';
import { singleSpaPropsSubject } from 'src/single-spa/single-spa-props';

@Component({
  selector: 'mf-angular-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  counter$: Observable<number>;
  customProp1: string;

  shell;

  constructor(
    private iframeService: IframeService,
    private shellService: ShellService,
    private ref: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.shell = this.iframeService;
    this.counter$ = this.iframeService.counter$;
    singleSpaPropsSubject.subscribe((props) => {
      this.shell = this.shellService;
      this.counter$ = this.shellService.counter$;

      this.customProp1 = props.customProp1;
      this.ref.detectChanges();
    });
  }

  shellAdd(): void {
    this.shell.shellAdd();
  }

  shellSubtract(): void {
    this.shell.shellSubtract();
  }

  add(): void {
    this.shell.add();
  }

  subtract(): void {
    this.shell.subtract();
  }
}
