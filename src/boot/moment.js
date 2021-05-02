// import something here
import moment from 'moment';
import Vue from 'vue'
// "async" is optional;
// more info on params: https://quasar.dev/quasar-cli/cli-documentation/boot-files#Anatomy-of-a-boot-file
export default async (/* { app, router, Vue ... } */) => {
  moment.locale('en');
  Vue.prototype.$moment = moment
}
