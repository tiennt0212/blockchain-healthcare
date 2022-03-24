<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Contents**

- [What lazy loading models in rematch store?](#what-lazy-loading-models-in-rematch-store)
- [How to lazy loading model?](#how-to-lazy-loading-model)
- [How to use `connected-react-router` in rematch.](#how-to-use-connected-react-router-in-rematch)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## What lazy loading models in rematch store?

Lazy loading is the technique of rendering only-needed first, then quietly unrolling the non-critical items later.

We don't need load all models of store, When page loaded we just need load needed model first to decrease js bundle size for page load.

## How to lazy loading model?

1. import `store` from 'store'.
2. Import model which need lazy loading to first of page.
3. Dynamic importing model to store.

Example: `homepage.jsx`

```js
import { addStoreModel } from 'utils/addStoreModel';
import count from 'store/models/count';

addStoreModel(count);

```

## How to use `connected-react-router` in rematch.

1. Import API from `connected-react-router`.
2. Dispatch this API to rematch store.

Example:

```
import { push } from 'connected-react-router';

const app = {
  state: 0, // initial state
  reducers: {},
  effects: (dispatch) => ({
    async navigateExample() {
      // dispatch push action go to login page
      dispatch(push('/login'));
    },
    async getLocation(payload, rootState) {
      // Get location from rematch.
      return rootState.router.location;
    },
  }),
};
```
