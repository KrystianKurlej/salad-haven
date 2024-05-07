<template>
  <div class="wrapper">
    <breadcrumbs></breadcrumbs>

    <header class="contact-header">
      <h1>Masz pytania? <span>Skontaktujmy&nbsp;się.</span></h1>
      <p>Lorem ipsum dolor sit amet consectetur. Proin nec felis dolor ultrices et morbi est tempor amet.</p>
    </header>

    <main class="contact-main">
      <form @submit.prevent="submitForm" class="contact-form">
        <div class="form-group">
          <label for="name">Imię</label>
          <input type="text" v-model="formData.name" id="name" placeholder="Imię" required>
        </div>
    
        <div class="form-group">
          <label for="email">Adres email</label>
          <input type="email" v-model="formData.email" id="email" placeholder="Adres email" required>
        </div>
    
        <div class="form-group">
          <label for="phone">Telefon</label>
          <input type="tel" v-model="formData.phone" id="phone" placeholder="Telefon" required>
        </div>
    
        <div class="form-group col-span">
          <label for="message">Wiadomość</label>
          <textarea v-model="formData.message" id="message" placeholder="Wiadomość" rows="3" required></textarea>
        </div>
    
        <div class="form-footer col-span">
          <div class="form-group policy">
            <input type="checkbox" name="policy" required>
            <p>
              Lorem ipsum dolor sit amet consectetur. Placerat arcu orci adipiscing malesuada. Suspendisse aliquet pretium mauris morbi nunc vehicula pretium w polityce prywatności. 
            </p>
          </div>
          <button-component size="large" variant="primary" type="submit">
            Wyślij
            <SendIco slot="icon" width="24" height="24"/>
          </button-component>
        </div>
      </form>

      <div class="contact-info">
        <h3>+48 800 908 732</h3>
        <p>Lorem ipsum dolor sit amet consectetur. Placerat arcu orci adipiscing malesuada.</p>
        <h3>salad@haven.com</h3>
        <p>Lorem ipsum dolor sit amet consectetur. Placerat arcu orci adipiscing malesuada.</p>
      </div>
    </main>
  </div>
</template>

<script setup>
import SendIco from '@components/icons/SendIco.vue';
</script>

<script>
export default {
  data() {
    return {
      formData: {
        name: '',
        email: '',
        phone: '',
        message: ''
      }
    };
  },
  methods: {
    async submitForm() {
      try {
        const response = await fetch('https://formspree.io/f/xnqeovgl', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.formData)
        });
        if (response.ok) {
          alert('Formularz został wysłany!');
          // Wyczyść formularz po wysłaniu
          this.formData = {
            name: '',
            email: '',
            phone: '',
            message: ''
          };
        } else {
          throw new Error('Wystąpił błąd podczas wysyłania formularza.');
        }
      } catch (error) {
        console.error(error);
        alert('Wystąpił błąd podczas wysyłania formularza. Spróbuj ponownie.');
      }
    }
  }
};
</script>
