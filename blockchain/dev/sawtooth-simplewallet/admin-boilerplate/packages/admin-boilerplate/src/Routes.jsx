import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LoginPage from 'containers/LoginPage';
import { ROUTES } from 'utils/routeConstants';
import HomePage from 'containers/HomePage';
import NotFoundPage from 'containers/NotFoundPage';
import { ProtectedRoute } from 'components/Routing';
import { FullLayout } from 'components/Layout';

function Routes() {
  return (
    <BrowserRouter>
      <FullLayout>
        <Switch>
          <ProtectedRoute path={ROUTES.HOMEPAGE} exact component={HomePage} />
          <Route path={ROUTES.LOGIN} exact component={LoginPage} />
          <Route path="*" component={NotFoundPage} />
        </Switch>
      </FullLayout>
    </BrowserRouter>
  );
}

export default Routes;
