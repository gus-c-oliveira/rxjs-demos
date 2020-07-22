import { Observable } from 'rxjs';

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
  ],
};
