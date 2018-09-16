import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueFire from "vuefire";
import firebase from 'firebase/app'
import 'firebase/firestore'
import Argon from "./plugins/argon-kit";

Vue.config.productionTip = false;
Vue.use(VueFire);

// Initialize Firebase
var config = {
  databaseURL: "https://d-9700a.firebaseio.com",
  projectId: "d-9700a"
};
firebase.initializeApp(config);
export const db = firebase.firestore();


Vue.use(Argon);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
