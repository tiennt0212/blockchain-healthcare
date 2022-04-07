import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LoginPage from 'containers/LoginPage';
import { ROUTES } from 'utils/routeConstants';
import HomePage from 'containers/HomePage';
import NotFoundPage from 'containers/NotFoundPage';
import { ProtectedRoute } from 'components/Routing';
import { FullLayout } from 'components/Layout';
import MediaPage from 'containers/Media/List';
import CreateMedia from 'containers/Media/Form';

function Routes() {
  return (
    <BrowserRouter>
      <FullLayout>
        <Switch>
          <ProtectedRoute path={ROUTES.MEDIA_LIST} exact component={MediaPage} />
          <ProtectedRoute path={ROUTES.CREATE_MEDIA} exact component={CreateMedia} />
          <ProtectedRoute path={ROUTES.EDIT_MEDIA} exact component={CreateMedia} />
          <ProtectedRoute path={ROUTES.HOMEPAGE} exact component={HomePage} />
          <Route path={ROUTES.LOGIN} exact component={LoginPage} />
          <Route path="*" component={NotFoundPage} />
        </Switch>
      </FullLayout>
    </BrowserRouter>
  );
}

export default Routes;
