import Vue from 'vue'
const components = {
    'q-dlg': () =>
        import ('#/dlg'),
    'q-filter': () =>
        import ('#/filter'),
    'q-info': () =>
        import ('#/Information'),
    'q-command': () =>
        import ('#/Command'),
    'q-menus': () =>
        import ('#/menu'),
    'q-tlbr': () =>
        import ('#/Toolbar'),
    'r-date': () =>
        import ('#/R-CONTROLS/r-date'),
    'r-date2': () =>
        import ('#/R-CONTROLS/r-date2'),
    'r-input': () =>
        import ('#/R-CONTROLS/r-input'),
    'r-gender': () =>
        import ('#/R-CONTROLS/r-gender'),
    'r-civilStatus': () =>
        import ('#/R-CONTROLS/r-civilStatus'),
    'r-dateTime': () =>
        import ('#/R-CONTROLS/r-dateTime'),
}
Object.entries(components).forEach(([name, component]) => Vue.component(name, component))