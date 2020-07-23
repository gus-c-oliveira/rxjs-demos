import { fromEvent, Observable, from, timer, interval, of } from 'rxjs';

export const AppConstants = {
  AppTitle: 'RxJS Demos',
  Demos: [
    {
      title: 'Create Manually',
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
        const subscription = observable.subscribe((value) =>
          results.push(value)
        );
        return { results, subscription };
      },
    },
    {
      title: 'Create from DOM Event',
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
      title: 'Create from Promise',
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
        const subscription = observable.subscribe((value) =>
          results.push(value)
        );
        return { results, subscription };
      },
    },
    {
      title: 'Creating Timers using Observables',
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
      title: 'Creating Values Every Interval',
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
      title: 'Creating From Static Values',
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
        const subscription = observable.subscribe((value) =>
          results.push(value)
        );
        return { results, subscription };
      },
    },
    {
      title: 'Unsubscribing',
      description:
        "An Observable emits a complete notification when it's done emitting values. Some Observables complete automatically, others don't. Continuous streams, like interval, might cause memory leaks if they are allowed to run forever. To complete the emission, store the subscription in a variable and call .unsubscribe().",
      code: [
        'const observable = interval(1000);',
        'const subscription = observable.subscribe(value => log(value + 1));',
        'setTimeout(() => {',
        '\xa0subscription.unsubscribe();',
        "\xa0log('Unsubscribed!');",
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
  ],
};
