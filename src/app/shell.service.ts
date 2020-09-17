import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShellService {
  counter$: Observable<number>;
  private counterSubject$: BehaviorSubject<number>;

  private addEvent = new CustomEvent<any>('mf-angular-event', {
    detail: { event: 'add' },
  });

  private subtractEvent = new CustomEvent<any>('mf-angular-event', {
    detail: { event: 'subtract' },
  });

  constructor() {
    this.counterSubject$ = new BehaviorSubject(1);
    this.counter$ = this.counterSubject$.asObservable();

    this.shellListener().subscribe((data) => {
      if (data.event === 'add') {
        this.counterSubject$.next(this.counterSubject$.value + 1);
      }
      if (data.event === 'subtract') {
        this.counterSubject$.next(this.counterSubject$.value - 1);
      }
    });
  }

  add(): void {
    this.counterSubject$.next(this.counterSubject$.value + 1);
  }

  subtract(): void {
    this.counterSubject$.next(this.counterSubject$.value - 1);
  }

  shellAdd(): void {
    window.dispatchEvent(this.addEvent);
  }

  shellSubtract(): void {
    window.dispatchEvent(this.subtractEvent);
  }

  shellListener(): Observable<any> {
    return new Observable((observer) => {
      window.addEventListener('mf-shell-event', (event: any) =>
        observer.next(event.detail)
      );
    });
  }
}
