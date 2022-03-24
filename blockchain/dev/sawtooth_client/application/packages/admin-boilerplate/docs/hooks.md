<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

**Contents**

- [useRematch](#useRematch)
  - [useDispatch](#useDispatch)
  - [useSelect](#useSelect)
  - [useSelector](#useSelector)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# useRematch

`import { useDispatch, useSelect, useSelector } from 'hooks';`

## useDispatch

Use useDispatch hook for get function from `reducers` or `effects` of multiple models in rematch `models` store.

example:

```
const { increment, decrement, navigateExample, getLocation } =
  useDispatch(({ count, app }) => ({
      increment: count.increment,
      decrement: count.decrement,
      navigateExample: app.navigateExample,
      getLocation: app.getLocation,
  }));
```

## useSelect

Use useSelect hook for get function from `selectors` of multiple models in rematch `models` store.

example:

```
const count = useSelector((state) => state.count);
const { selectCount } = useSelect(({ count }) => ({
  selectCount: count.selectCount,
}));
```

## useSelector

Use useSelector hook for get `state` in rematch `models` store.

example:
`const count = useSelector((state) => state.count);`
