<template>
  <div class="register">
    <h2>Register</h2>
    <form @submit.prevent="handleSubmit">
      <div>
        <label for="name">Name:</label>
        <input type="text" id="name" v-model="name" required />
      </div>
      <div>
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="email" required />
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <button type="submit">Register</button>
    </form>
    <p v-if="error">{{ error }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import { register } from '@/api';

export default defineComponent({
  name: 'Register',
  setup() {
    const name = ref('');
    const email = ref('');
    const password = ref('');
    const error = ref('');
    const router = useRouter();

    const handleSubmit = async () => {
      try {
        await register({ name: name.value, email: email.value, password: password.value });
        router.push('/login');
      } catch (err) {
        error.value = 'Registration failed';
      }
    };

    return {
      name,
      email,
      password,
      error,
      handleSubmit,
    };
  },
});
</script>

<style scoped>
.register {
  max-width: 400px;
  margin: 0 auto;
  padding: 1em;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.register h2 {
  text-align: center;
}

.register form {
  display: flex;
  flex-direction: column;
}

.register div {
  margin-bottom: 1em;
}

.register label {
  margin-bottom: 0.5em;
  color: #333333;
}

.register input {
  padding: 0.5em;
  font-size: 1em;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.register button {
  padding: 0.7em;
  font-size: 1em;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.register button:hover {
  background-color: #0056b3;
}

.register p {
  color: red;
  text-align: center;
}
</style>
