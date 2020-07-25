import {
  fromEvent,
  Observable,
  from,
  timer,
  interval,
  of,
  Subscription,
} from 'rxjs';
import { map, tap, filter, first, last } from 'rxjs/operators';

export interface Demo {
  title: string;
  description: string;
  code: string[];
  run: () => { results: any[]; subscription: Subscription | Subscription[] };
}

export const Demos: Demo[] = [
  {
    title: 'Observables - Create Manually',
    description:
      'An Observable represents a source of data that emits values over time. When creating one manually, you can subscribe to it and use the .next() function to emit values.',
    code: [
      'const observable = new Observable(observer => {',
      "\xa0\xa0\xa0\xa0observer.next('Hello Observable!');",
      '});',
      'observable.subscribe(value => log(value));',
    ],
    run: () => {
      const observable = new Observable((observer) => {
        observer.next('Hello Observable!');
      });
      const results = [];
      const subscription = observable.subscribe((value) => results.push(value));
      return { results, subscription };
    },
  },
  {
    title: 'Observables - Create from DOM Event',
    description:
      'Observables can be created automatically from DOM events. In this demo, an Observable is created from mouse clicks. The click coordinates are displayed in the output.',
    code: [
      "const observable = fromEvent(document, 'click');",
      'observable.subscribe((event) => {',
      '\xa0\xa0\xa0\xa0log(`{ x: ${(event as MouseEvent).x}, y: ${(event as MouseEvent).y} }`);',
      '});',
    ],
    run: () => {
      const observable = fromEvent(document, 'click');
      const results = [];
      const subscription = observable.subscribe((event) => {
        results.push(
          `{ x: ${(event as MouseEvent).x}, y: ${(event as MouseEvent).y} }`
        );
      });
      return { results, subscription };
    },
  },
  {
    title: 'Observables - Create from Promise',
    description: 'A Promise can be converted to an Observable using from()',
    code: [
      'const promise = new Promise(resolve => {',
      '\xa0\xa0\xa0\xa0setTimeout(() => {',
      "\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0resolve('Promise resolved after 3 seconds!');",
      '\xa0\xa0\xa0\xa0}, 3000);',
      '});',
      'const observable = from(promise);',
      'observable.subscribe(value => log(value));',
    ],
    run: () => {
      const promise = new Promise((resolve) => {
        setTimeout(() => {
          resolve('Promise resolved after 3 seconds!');
        }, 3000);
      });
      const observable = from(promise);
      const results = [];
      const subscription = observable.subscribe((value) => results.push(value));
      return { results, subscription };
    },
  },
  {
    title: 'Observables - Creating Timers',
    description:
      'Using timer() creates an Observable that completes when the timer runs out.',
    code: [
      'const observable = timer(5000);',
      "observable.subscribe(_ => log('Timer completed after 5 seconds!'));",
    ],
    run: () => {
      const observable = timer(5000);
      const results = [];
      const subscription = observable.subscribe((_) =>
        results.push('Timer completed after 5 seconds!')
      );
      return { results, subscription };
    },
  },
  {
    title: 'Observables - Creating Values Every Interval',
    description:
      'interval(x) can be used to create an Observable that emits every x milliseconds.',
    code: [
      'const observable = interval(1000);',
      'observable.subscribe(value => log(`Value emitted: ${value}`));',
    ],
    run: () => {
      const observable = interval(1000);
      const results = [];
      const subscription = observable.subscribe((value) =>
        results.push(`Value emitted: ${value}`)
      );
      return { results, subscription };
    },
  },
  {
    title: 'Observables - Creating From Static Values',
    description:
      "An Observable can be created from static values using of(). Values don't necessarily need to have the same type. The Observable completes after emitting its values.",
    code: [
      "const observable = of(true, [0, 1, 2], { fruit: 'watermelon', colors: ['red', 'green'], toString: () => 'Hi, I'm an Object emitted by an Observable!' });",
      'observable.subscribe(value => log(value));',
    ],
    run: () => {
      const observable = of(true, [0, 1, 2], {
        fruit: 'watermelon',
        colors: ['red', 'green'],
        toString: () => "Hi, I'm an Object emitted by an Observable!",
      });
      const results = [];
      const subscription = observable.subscribe((value) => results.push(value));
      return { results, subscription };
    },
  },
  {
    title: 'Observables - Unsubscribing',
    description:
      "An Observable emits a complete notification when it's done emitting values. Some Observables complete automatically, others don't. Continuous streams, like interval, might cause memory leaks if they are allowed to run forever. To complete the emission, store the subscription in a variable and call .unsubscribe().",
    code: [
      'const observable = interval(1000);',
      'const subscription = observable.subscribe(value => log(value + 1));',
      'setTimeout(() => {',
      '\xa0\xa0\xa0\xa0subscription.unsubscribe();',
      "\xa0\xa0\xa0\xa0log('Unsubscribed!');",
      '}, 4000);',
    ],
    run: () => {
      const observable = interval(1000);
      const results = [];
      const subscription = observable.subscribe((value) =>
        results.push(value + 1)
      );
      setTimeout(() => {
        subscription.unsubscribe();
        results.push('Unsubscribed!');
      }, 4000);
      return { subscription, results };
    },
  },
  {
    title: 'Observables - Cold Observables',
    description:
      'Cold Observables start generating values once subscription starts and always provide the full sequence of values. In this demo, since subscriptions start at different times, the subscribers receive different values.',
    code: [
      'const observable = new Observable(observer => {',
      '\xa0\xa0\xa0\xa0observer.next(Math.random());',
      '\xa0\xa0\xa0\xa0observer.next(Math.random());',
      '});',
      'observable.subscribe(value => log(`First Subscriber Value: ${value}`));',
      'observable.subscribe(value => log(`Second Subscriber Value: ${value}`));',
    ],
    run: () => {
      const observable = new Observable((observer) => {
        observer.next(Math.random());
        observer.next(Math.random());
      });
      const results = [];
      const subscription = [];
      subscription.push(
        observable.subscribe((value) =>
          results.push(`First Subscriber Value: ${value}`)
        )
      );
      subscription.push(
        observable.subscribe((value) =>
          results.push(`Second Subscriber Value: ${value}`)
        )
      );
      return { results, subscription };
    },
  },
  {
    title: 'Observables - Hot Observables',
    description:
      'Hot Observables get their values from external sources. When subscribing, the subscriber gets the most recent value and all future values.',
    code: [
      'let x = 1;',
      'const observable = new Observable((observer) => {',
      '\xa0\xa0\xa0\xa0observer.next(x);',
      '\xa0\xa0\xa0\xa0setTimeout(() => {',
      '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0x = x + 1;',
      '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0observer.next(x);',
      '\xa0\xa0\xa0\xa0}, 2000);',
      '\xa0\xa0\xa0\xa0setTimeout(() => {',
      '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0x = x + 1;',
      '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0observer.next(x);',
      '\xa0\xa0\xa0\xa0}, 3000);',
      '});',
      'observable.subscribe(value => log(`First Subscriber received: ${value}`));',
      'setTimeout(() => {',
      '\xa0\xa0\xa0\xa0observable.subscribe(value => log(`Second Subscriber received: ${value}`));',
      '}, 2500);',
    ],
    run: () => {
      let x = 1;
      const observable = new Observable((observer) => {
        observer.next(x);
        setTimeout(() => {
          x = x + 1;
          observer.next(x);
        }, 2000);
        setTimeout(() => {
          x = x + 1;
          observer.next(x);
        }, 3000);
      });
      const subscription = [];
      const results = [];
      subscription.push(
        observable.subscribe((value) =>
          results.push(`First Subscriber received: ${value}`)
        )
      );
      setTimeout(() => {
        subscription.push(
          observable.subscribe((value) =>
            results.push(`Second Subscriber received: ${value}`)
          )
        );
      }, 2500);
      return { subscription, results };
    },
  },
  {
    title: 'Operators - Map',
    description:
      'Operators are functions that allows us to create or modify data using Observables. Pipeable Operators can be piped to Observables, taking an Observable as input and creating a new one as output. One of the most used operators of this kind is Map, which allows the modification of emitted values. In this demo, Map is used to format the data before logging it.',
    code: [
      'const observable = new Observable(observer => {',
      '\xa0\xa0\xa0\xa0observer.next(Math.random());',
      '\xa0\xa0\xa0\xa0observer.next(Math.random());',
      '\xa0\xa0\xa0\xa0observer.next(Math.random());',
      '});',
      'observable.pipe(',
      '\xa0\xa0\xa0\xa0map(data => (data as number).toFixed(2))',
      ').subscribe(value => log(value));',
    ],
    run: () => {
      const observable = new Observable((observer) => {
        observer.next(Math.random());
        observer.next(Math.random());
        observer.next(Math.random());
      });
      const results = [];
      const subscription = observable
        .pipe(map((data) => (data as number).toFixed(2)))
        .subscribe((value) => results.push(value));
      return { subscription, results };
    },
  },
  {
    title: 'Operators - Tap',
    description:
      'The Tap operator allows the execution of pieces of code at specific points of the Observable, without causing side effects on the emitted values. Useful for debugging.',
    code: [
      'const observable = new Observable(observer => {',
      '\xa0\xa0\xa0\xa0observer.next(Math.random());',
      '});',
      'observable.pipe(',
      '\xa0\xa0\xa0\xa0tap(value => log(`This is the value before mapping: ${value}`)),',
      '\xa0\xa0\xa0\xa0map(value => (value as number) * 100),',
      '\xa0\xa0\xa0\xa0tap(value => log(`This is the value after mapping: ${value}`)),',
      ').subscribe();',
    ],
    run: () => {
      const observable = new Observable((observer) => {
        observer.next(Math.random());
      });
      const results = [];
      const subscription = observable
        .pipe(
          tap((value) =>
            results.push(`This is the value before mapping: ${value}`)
          ),
          map((value) => (value as number) * 100),
          tap((value) =>
            results.push(`This is the value after mapping: ${value}`)
          )
        )
        .subscribe();
      return { results, subscription };
    },
  },
  {
    title: 'Operators - Filter',
    description:
      'The Filter operator receives a function and uses it to filter the data, emitting only the values that satisfy the specified condition.',
    code: [
      'const observable = new Observable(observer => {',
      '\xa0\xa0\xa0\xa0observer.next(1);',
      '\xa0\xa0\xa0\xa0observer.next(2);',
      '\xa0\xa0\xa0\xa0observer.next(3);',
      '\xa0\xa0\xa0\xa0observer.next(4);',
      '\xa0\xa0\xa0\xa0observer.next(5);',
      '});',
      'observable.pipe(',
      '\xa0\xa0\xa0\xa0filter(value => (value as number) % 2 !== 0)',
      ').subscribe(value => log(value));',
    ],
    run: () => {
      const observable = new Observable((observer) => {
        observer.next(1);
        observer.next(2);
        observer.next(3);
        observer.next(4);
        observer.next(5);
      });
      const results = [];
      const subscription = observable
        .pipe(filter((value) => (value as number) % 2 !== 0))
        .subscribe((value) => results.push(value));
      return { results, subscription };
    },
  },
  {
    title: 'Operators - First',
    description:
      'Used to select only the first value emitted. If used with a predicate, emits the first value to pass predicate.',
    code: [
      'const observable = new Observable(observer => {',
      '\xa0\xa0\xa0\xa0observer.next(1);',
      '\xa0\xa0\xa0\xa0observer.next(2);',
      '\xa0\xa0\xa0\xa0observer.next(3);',
      '\xa0\xa0\xa0\xa0observer.next(4);',
      '\xa0\xa0\xa0\xa0observer.next(5);',
      '});',
      'observable.pipe(',
      '\xa0\xa0\xa0\xa0first()',
      ').subscribe(value => log(`First Number: ${value}`));',
      'observable.pipe(',
      '\xa0\xa0\xa0\xa0first(value => (value as number) % 2 === 0)',
      ').subscribe(value => log(`First Even Number: ${value}`));',
    ],
    run: () => {
      const observable = new Observable((observer) => {
        observer.next(1);
        observer.next(2);
        observer.next(3);
        observer.next(4);
        observer.next(5);
      });
      const results = [];
      const subscription = [];
      subscription.push(
        observable
          .pipe(first())
          .subscribe((value) => results.push(`First number: ${value}`))
      );
      subscription.push(
        observable
          .pipe(first((value) => (value as number) % 2 === 0))
          .subscribe((value) => results.push(`First Even Number: ${value}`))
      );
      return { results, subscription };
    },
  },
  {
    title: 'Operators - Last',
    description:
      'Counterpart to first. Used to select only the last value emitted, or the last value to pass predicate.',
    code: [
      'const observable = new Observable(observer => {',
      '\xa0\xa0\xa0\xa0observer.next(1);',
      '\xa0\xa0\xa0\xa0observer.next(2);',
      '\xa0\xa0\xa0\xa0observer.next(3);',
      '\xa0\xa0\xa0\xa0observer.next(4);',
      '\xa0\xa0\xa0\xa0observer.next(5);',
      '\xa0\xa0\xa0\xa0observer.complete();',
      '});',
      'observable.pipe(',
      '\xa0\xa0\xa0\xa0last()',
      ').subscribe(value => log(`Last Number: ${value}`));',
      'observable.pipe(',
      '\xa0\xa0\xa0\xa0last(value => (value as number) % 2 === 0)',
      ').subscribe(value => log(`Last Even Number: ${value}`));',
    ],
    run: () => {
      const observable = new Observable((observer) => {
        observer.next(1);
        observer.next(2);
        observer.next(3);
        observer.next(4);
        observer.next(5);
        observer.complete();
      });
      const results = [];
      const subscription = [];
      subscription.push(
        observable
          .pipe(last())
          .subscribe((value) => results.push(`Last number: ${value}`))
      );
      subscription.push(
        observable
          .pipe(last((value) => (value as number) % 2 === 0))
          .subscribe((value) => results.push(`Last Even Number: ${value}`))
      );
      return { results, subscription };
    },
  },
];
