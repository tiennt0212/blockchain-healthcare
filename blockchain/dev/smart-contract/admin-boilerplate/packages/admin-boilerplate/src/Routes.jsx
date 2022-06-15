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
          <ProtectedRoute path={ROUTES.ADD_RELATIONSHIP} exact component={HomePage} />
          <ProtectedRoute path={ROUTES.ACCESS_CONTROL_MANAGER} exact component={HomePage} />
          <ProtectedRoute path={ROUTES.ACCESS_CONTROL} exact component={HomePage} />
          <ProtectedRoute path={ROUTES.CREATEEHR} exact component={HomePage} />
          <ProtectedRoute path={ROUTES.REQUESTING} exact component={HomePage} />
          <ProtectedRoute path={ROUTES.PERSONALDATA} exact component={HomePage} />
          <ProtectedRoute path={ROUTES.METAHEALTH} exact component={HomePage} />
          <ProtectedRoute path={ROUTES.PROFILE} exact component={HomePage} />
          <ProtectedRoute path={ROUTES.MEDIA_LIST} exact component={MediaPage} />
          <ProtectedRoute path={ROUTES.CREATE_MEDIA} exact component={CreateMedia} />
          <ProtectedRoute path={ROUTES.EDIT_MEDIA} exact component={CreateMedia} />
          <Route path={ROUTES.DEV} exact component={HomePage} />
          <Route path={ROUTES.NFT_MARKETPLACE} exact component={HomePage} />
          <Route path={ROUTES.LOGIN} exact component={LoginPage} />
          {/*REPLACE HOMEPAGE by NFT-marketplace route*/}
          <Route path={ROUTES.HOMEPAGE} exact component={HomePage} />
          <Route path="*" component={NotFoundPage} />
        </Switch>
      </FullLayout>
    </BrowserRouter>
  );
}

export default Routes;
