<template>
    <div class="row justify-content-center">
        <div class="col-lg-5 col-md-7">
            <div class="card bg-secondary shadow border-0">
                <div class="card-body px-lg-5 py-lg-5">
                    <div class="text-center text-muted mb-4">
                        <small>Inscrivez-vous avec vos informations d'identification</small>
                    </div>
                    <form role="form" @submit.prevent="register">

                        <base-input class="input-group-alternative mb-3"
                                    placeholder="Prénom"
                                    addon-left-icon="ni ni-hat-3"
                                    v-model="name">
                        </base-input>

                        <base-input class="input-group-alternative mb-3"
                                    placeholder="Email"
                                    addon-left-icon="ni ni-email-83"
                                    v-model="email">
                        </base-input>

                        <base-input class="input-group-alternative"
                                    placeholder="Mot de passe"
                                    type="password"
                                    addon-left-icon="ni ni-lock-circle-open"
                                    v-model="password">
                        </base-input>

                        <base-input class="input-group-alternative"
                                    placeholder="confirmer le mot de passe"
                                    type="password"
                                    addon-left-icon="ni ni-lock-circle-open"
                                    v-model="confirm_password">
                        </base-input>

                        <div class="text-muted font-italic">
                            <small>Fiabilité du mot de passe: <span class="text-success font-weight-700">forte</span></small>
                        </div>

                        <div class="row my-4">
                            <div class="col-12">
                                <base-checkbox class="custom-control-alternative">
                                    <span class="text-muted">Je suis d'accord avec le <a href="#!">Politique de confidentialité</a></span>
                                </base-checkbox>
                            </div>
                        </div>
                        <div class="text-center">
                            <div class="pt-3" v-if="errorMessage">
                                <badge type="danger" tag="div">{{ errorMessage }}</badge>
                            </div>
                            <base-button type="primary" class="my-4" native-type="submit">Créer mon compte </base-button>
                        </div>
                    </form>
                </div>
            </div>
            <div class="row mt-3">
                <div class="col-6">
                    <a href="#" class="text-light">
                        <small>Mot de passe oublié?</small>
                    </a>
                </div>
                <div class="col-6 text-right">
                    <router-link to="/login" class="text-light">
                        <small>Connectez-vous à votre compte </small>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data(){
            return {
                name : "",
                email : "",
                password : "",
                confirm_password : "",
                errorMessage:null
            }
        },
        methods: {
            register: function () {
                let data = {
                    firstName: this.name,
                    email: this.email,
                    password: this.password,
                    confirm_password: this.confirm_password
                }
                this.$store.dispatch('register', data)
                    .then(() => this.$router.push('/'))
                    .catch(error => {
                        if (error.response && error.response.status === 400){
                            this.errorMessage = error.response.data.message.join(' - ');
                        }
                    })
            }
        }
    }
</script>
