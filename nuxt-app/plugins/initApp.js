export default function (ctx) {
  setTimeout(() => {
    const { app: { store }, $auth } = ctx
    if ($auth.$state.loggedIn) {
      console.log('recuperando recursos')
      store.dispatch('resources/retrieveResources')
    }
  }, 1000);
}
