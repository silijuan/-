export function configRouter(router) {



    // global before
    // 3 options:
    // 1. return a boolean
    // 2. return a Promise that resolves to a boolean
    // 3. call transition.next() or transition.abort()
    router.beforeEach((transition) => {
        if (transition.to.path === '/forbidden') {
            router.app.authenticating = true
            setTimeout(() => {
                router.app.authenticating = false
                alert('this route is forbidden by a global before hook')
                transition.abort()
            }, 3000)
        } else {
            transition.next()
        }
    })

    // normal routes
    router.map({
        '/iol/:something': {
            name: 'iol',
            component: require('../insurance/InsuranceOrderList.vue')
        },
        '/iod/:something': {
            name: 'iod',
            component: require('../insurance/InsuranceOrderDetail.vue')
        },
        '/ioi/:something': {
            name: 'ioi',
            component: require('../insurance/InsuranceOrderImport.vue')
        },
        '/error': {
            name: 'error',
            component: require('../insurance/InsuranceError.vue')
        }
    })

    // redirect
    router.redirect({})
}