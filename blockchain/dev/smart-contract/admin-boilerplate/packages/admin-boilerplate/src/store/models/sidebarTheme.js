const sidebarTheme = {
  state: {
    theme: localStorage.getItem('site-theme') === 'mix' ? 'dark' : '',
  },
  reducers: {
    switchSidebarTheme(state, payload) {
      if (payload === 'mix') return { theme: 'dark' };
      else return { theme: 'light' };
    },
  },
};

export default sidebarTheme;
