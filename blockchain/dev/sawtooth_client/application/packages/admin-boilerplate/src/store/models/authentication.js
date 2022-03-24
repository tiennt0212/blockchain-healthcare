import axios from 'axios';
import { push } from 'connected-react-router';
import { URL_SERVER_HOST } from 'utils/constants';

const isAuthenticated = localStorage.getItem('jwt') ? true : false;

const authentication = {
  state: {
    isAuthenticated,
    message: '',
  },
  reducers: {
    setIsAuthenticated(state, payload) {
      return {
        ...state,
        isAuthenticated: payload,
      };
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
      const SUPER_ADMIN = {
        identifier: payload.username,
        password: payload.password,
      };
      try {
        const response = await axios.post(`${URL_SERVER_HOST}/auth/local`, SUPER_ADMIN);
        if (response.data) {
          localStorage.setItem('jwt', JSON.stringify(response.data.jwt));
          this.setIsAuthenticated(true);
        } else {
          this.setIsAuthenticated(false);
        }
      } catch (error) {
        this.setMessage(error);
        console.log(error);
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
    async logout() {
      this.setIsAuthenticated(false);
      localStorage.removeItem('jwt');
      dispatch(push('/login'));
    },
  }),
};

export default authentication;
