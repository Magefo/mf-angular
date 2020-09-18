import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

const shellOrigin = 'http://localhost:4000';

@Injectable({
  providedIn: 'root',
})
export class IframeService {
  counter$: Observable<number>;
  private counterSubject$: BehaviorSubject<number>;

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
    if (window.parent) {
      window.parent.postMessage(
        { app: 'MF_ANGULAR', event: 'add' },
        shellOrigin
      );
    }
  }

  shellSubtract(): void {
    if (window.parent) {
      window.parent.postMessage(
        { app: 'MF_ANGULAR', event: 'subtract' },
        shellOrigin
      );
    }
  }

  shellListener(): Observable<any> {
    return new Observable((observer) => {
      window.addEventListener('message', ({ origin, data }) => {
        if (origin !== shellOrigin) {
          return;
        }
        return observer.next(data);
      });
    });
  }
}
