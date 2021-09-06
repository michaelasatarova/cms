<template>
  <div class="grid grid-cols-24">
    <div class="webkit-newsletter-container">
      <div class="webkit-newsletter-grid">
        <div class="webkit-newsletter-cell">
          <div class="webkit-newsletter">
            <div class="webkit-newsletter-text">{{ text }}</div>
            <div class="webkit-newsletter-form-container">
              <form class="webkit-newsletter-form" @submit.prevent="submit()">
                <input
                  class="webkit-newsletter-input"
                  placeholder="Ihre Mail"
                  v-model="email"
                />
                <div
                  v-if="!success & !waiting"
                  class="webkit-newsletter-button"
                  v-on:click="submit()"
                >
                  <i
                    class="webkit-newsletter-send-icon fas fa-arrow-circle-right font-light"
                  ></i>
                </div>
                <div v-if="success & !waiting" class="webkit-newsletter-button">
                  <i class="webkit-newsletter-button-success far fa-check"></i>
                </div>
                <div v-if="waiting" class="webkit-newsletter-button">
                  <i class="fas fa-spinner-third webkit-loadingSpinner"></i>
                </div>
              </form>
              <div v-if="errorMessage" class="webkit-newsletter-error">
                {{ errorMessage }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Vue, { VNode } from 'vue';

export default Vue.extend({
  name: 'BannerNewsletter',
  props: {
    text: String,
  },
  data() {
    return {
      email: '',
      success: false,
      waiting: false,
      errorMessage: '',
    };
  },
  methods: {
    submit: function () {
      this.waiting = true;
      this.errorMessage = '';

      if (!this.validateEmail(this.email)) {
        this.errorMessage = 'Ungültige Email Adresse.';
        this.waiting = false;
        return;
      }

      axios
        .post(window.SITEURL + 'actions/craft-webkit/api/register-newsletter', {
          email: this.email,
        })
        .then((response) => {
          if (response.status == 200) {
            this.success = true;
          }
        })
        .catch((error) => {
          if (error.response.status == 400) {
            this.errorMessage = 'Die Email Adresse ist bereits registriert.';
          } else {
            this.errorMessage = 'Newsletter Anmeldung fehlgeschlagen.';
          }
        })
        .then(() => {
          this.waiting = false;
        });
    },
    validateEmail: function (email) {
      var regularExpression = /\S+@\S+\.\S+/;
      return regularExpression.test(email);
    },
  },
});
</script>