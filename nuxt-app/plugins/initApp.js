export default function (ctx, inject) {
  setTimeout(() => {
    const { app: { store }, $auth } = ctx
    if ($auth.$state.loggedIn) {
      console.log('recuperando recursos')
      store.dispatch('resources/retrieveResources')
    }
  }, 1000);

  async function tryAuth(maxIntentos = 3, intentos = 1) {
    const helperText =
      intentos > 1 ? " (" + intentos + "/" + maxIntentos + ")" : "";
    const res = await this.$dialog.prompt({
      text: "¿Cual es tu contraseña?" + helperText,
      textField: {
        type: "password",
      },
    });
    if (!res) {
      return;
    }
    try {
      const result = await this.$axios.post("/auth/login", {
        user: this.$auth.user,
        password: res,
      });
      return result.status < 400;
    } catch (error) {
      await this.$dialog.error({
        title: "Error",
        text: "No te has autenticado correctamente",
      });
      return intentos < 3 ? this.tryAuth(maxIntentos, intentos + 1) : false;
    }
  }

  inject('tryAuth', tryAuth)
}
