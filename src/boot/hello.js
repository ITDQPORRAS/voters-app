import hello from 'hellojs'

export default ({ Vue }) => {
    hello.init({
        facebook: '815131839305591',
        google: '990735916129-571uifuljrj6rm35jiltsqpk03kdfc1e.apps.googleusercontent.com'
    })
    Vue.prototype.$hello = hello
}