import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

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
      if (data.event === 'substract') {
        this.counterSubject$.next(this.counterSubject$.value - 1);
      }
    });
  }

  add(): void {
    this.counterSubject$.next(this.counterSubject$.value + 1);
  }

  substract(): void {
    this.counterSubject$.next(this.counterSubject$.value - 1);
  }

  shellAdd(): void {
    window.parent.postMessage(
      { app: 'MF_ANGULAR', event: 'add' },
      'http://localhost:3000'
    );
  }

  shellSubstract(): void {
    window.parent.postMessage(
      { app: 'MF_ANGULAR', event: 'substract' },
      'http://localhost:3000'
    );
  }

  shellListener(): Observable<any> {
    return new Observable((observer) => {
      window.addEventListener('message', ({ origin, data }) => {
        if (origin !== 'http://localhost:3000') {
          return;
        }
        return observer.next(data);
      });
    });
  }
}
