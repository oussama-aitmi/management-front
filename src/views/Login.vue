<template>
        <div class="row justify-content-center">
            <div class="col-lg-5 col-md-7">
                <div class="card bg-secondary shadow border-0">
                    <div class="card-body px-lg-5 py-lg-5">
                        <div class="text-center text-muted mb-4">
                            <small>Connectez-vous avec vos identifiants</small>
                        </div>
                        <form role="form" class="login" method="POST" @submit.prevent="login">
                            <base-input class="input-group-alternative mb-3"
                                        placeholder="Email"
                                        addon-left-icon="ni ni-email-83"
                                        required
                                        v-model="email">
                            </base-input>

                            <base-input class="input-group-alternative"
                                        placeholder="Mot de passe"
                                        type="password"
                                        addon-left-icon="ni ni-lock-circle-open"
                                        required
                                        v-model="password">
                            </base-input>

                            <base-checkbox class="custom-control-alternative">
                                <span class="text-muted">Se souvenir de moi</span>
                            </base-checkbox>

                            <div class="text-center">
                                <div class="pt-3" v-if="errorMessage">
                                    <badge type="danger">{{ errorMessage }}</badge>
                                </div>
                                <base-button type="primary" class="my-4" native-type="submit">Se connecter</base-button>
                            </div>
                        </form>
                    </div>
                </div>
                <div class="row mt-3">
                    <div class="col-6">
                        <a href="#" class="text-light"><small>Mot de passe oublié?</small></a>
                    </div>
                    <div class="col-6 text-right">
                        <router-link to="/register" class="text-light"><small>créer un nouveau compte</small></router-link>
                    </div>
                </div>
            </div>
        </div>
</template>
<script>
  export default {
    name: 'login',
    data() {
        return {
            email : "",
            password : "",
            errorMessage: ""
        }
    },
    methods: {
        login: function () {
            const { email, password } = this;
            this.$store.dispatch('login', { email, password })
                .then(() => {
                    this.$router.push({ name: 'dashboard' })
                })
                .catch( error => {
                    if (error.response && (error.response.status === 400 || error.response.status === 401)){
                        this.errorMessage = error.response.data.message;
                    }
                })
        }
    }
  }
</script>
<style>
</style>
