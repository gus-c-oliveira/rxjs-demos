import { fromEvent, Observable } from 'rxjs';

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
  ],
};
