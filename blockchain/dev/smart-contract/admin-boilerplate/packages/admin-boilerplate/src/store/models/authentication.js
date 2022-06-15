import axios from 'axios';
import { push } from 'connected-react-router';
import { URL_SERVER_HOST, PRIVATE_KEY, PUBLIC_KEY, METAHEALTHID } from 'utils/constants';
import { isEmpty } from 'utils/app';

const isAuthenticated = localStorage.getItem(METAHEALTHID) ? true : false;

const authentication = {
  state: {
    isAuthenticated,
    metaHealthID: '', // 8 characters
    message: '',
  },
  reducers: {
    setIsAuthenticated(state, payload) {
      return {
        ...state,
        isAuthenticated: payload,
      };
    },
    setMetaHealthID(state, payload) {
      return { ...state, metaHealthID: payload };
    },
    setMessage(state, payload) {
      return {
        ...state,
        message: payload,
      };
    },
  },
  effects: (dispatch) => ({
    async login(payload) {
      try {
        if (!isEmpty(payload)) {
          const { metaHealthID, priv, pub } = payload;
          const localPriv = `${PRIVATE_KEY}${metaHealthID}`;
          const localPub = `${PUBLIC_KEY}${metaHealthID}`;
          localStorage.setItem(localPriv, priv);
          localStorage.setItem(localPub, pub);
          localStorage.setItem(METAHEALTHID, metaHealthID);
          if (localStorage.getItem(localPriv) && localStorage.getItem(localPub)) {
            this.setMetaHealthID(metaHealthID);
            this.setIsAuthenticated(true);
          } else {
            localStorage.removeItem(localPriv);
            localStorage.removeItem(localPub);
            localStorage.removeItem(METAHEALTHID);
            this.setMetaHealthID(null);
            this.setIsAuthenticated(false);
          }
        } else {
          this.setIsAuthenticated(false);
        }
      } catch (error) {
        this.setMessage(error);
        console.log(error);
      }
    },
    async signUp(payload) {
      try {
        console.log(payload);
      } catch (error) {
        // Handle error
      }
    },
    async checkLogin() {
      try {
        if (localStorage.getItem('jwt')) {
          const headers = {
            headers: {
              'Content-Type': 'application/json;charset=UTF-8',
              Authorization: `Bearer ${JSON.parse(localStorage.getItem('jwt'))}`,
            },
          };
          const response = await axios.get(`${URL_SERVER_HOST}/users/me`, headers);
          if (response.data.confirmed) {
            this.setIsAuthenticated(true);
          } else {
            this.setIsAuthenticated(false);
          }
        } else {
          this.setIsAuthenticated(false);
        }
      } catch (error) {
        console.log(error);
      }
    },
    async logout(_, rootState) {
      console.log('Logout');
      this.setIsAuthenticated(false);
      localStorage.removeItem(`${PRIVATE_KEY}${rootState.authentication.metaHealthID}`);
      localStorage.removeItem(`${PUBLIC_KEY}${rootState.authentication.metaHealthID}`);
      dispatch(push('/login'));
    },
  }),
};

export default authentication;
