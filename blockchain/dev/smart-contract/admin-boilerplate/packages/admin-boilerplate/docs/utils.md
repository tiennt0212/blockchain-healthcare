## How to use utils function for the project

### Code splitting

> Code-splitting your app can help you “lazy-load” just the things that are currently needed by the user, which can dramatically improve the performance of your app. While you haven’t reduced the overall amount of code in your app, you’ve avoided loading code that the user may never need, and reduced the amount of code needed during the initial load. [Read more.](https://reactjs.org/docs/code-splitting.html#code-splitting)

- How to use `loadable()` function.

Example:

In Login folder, create `index.js` file with:

```
import loadable from 'utils/loadable';

export default loadable(() => import('./Login'));

```

In `Routes.jsx`:

```
// Login page loaded from `loadable()` function.
import Login from 'containers/Login';

const ROUTES = [
  {
    path: '/login',
    component: Login,
  },
];
```

- Use `loadable` with fallback

```
import loadable from 'utils/loadable';
import Loader from 'components/Loader';

export default loadable(() => import('./Login'), <Loader />);
```
