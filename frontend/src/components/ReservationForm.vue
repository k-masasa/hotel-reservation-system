<template>
  <div>
    <h1>{{ isEditMode ? 'Edit Reservation' : 'Create Reservation' }}</h1>
    <form @submit.prevent="handleSubmit">
      <div>
        <label for="name">Name:</label>
        <input type="text" id="name" v-model="form.name" />
        <span v-if="errors.name">{{ errors.name }}</span>
      </div>
      <div>
        <label for="date">Date:</label>
        <input type="date" id="date" v-model="form.date" />
        <span v-if="errors.date">{{ errors.date }}</span>
      </div>
      <button type="submit">{{ isEditMode ? 'Update' : 'Create' }}</button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRouter, useRoute } from 'vue-router';
import * as yup from 'yup';

export default defineComponent({
  name: 'ReservationForm',
  setup() {
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    const isEditMode = ref(false);
    const form = ref({
      name: '',
      date: '',
    });
    const errors = ref({
      name: '',
      date: '',
    });

    const schema = yup.object().shape({
      name: yup.string().required('Name is required'),
      date: yup.date().required('Date is required'),
    });

    onMounted(async () => {
      if (route.params.id) {
        isEditMode.value = true;
        const reservation = await store.dispatch('fetchReservation', route.params.id);
        form.value = {
          name: reservation.name,
          date: reservation.date,
        };
      }
    });

    const handleSubmit = async () => {
      try {
        await schema.validate(form.value, { abortEarly: false });
        if (isEditMode.value) {
          await store.dispatch('updateReservation', { id: route.params.id, ...form.value });
        } else {
          await store.dispatch('createReservation', form.value);
        }
        router.push({ name: 'ReservationList' });
      } catch (err) {
        if (err instanceof yup.ValidationError) {
          err.inner.forEach((error) => {
            errors.value[error.path] = error.message;
          });
        }
      }
    };

    return {
      isEditMode,
      form,
      errors,
      handleSubmit,
    };
  },
});
</script>

<style scoped>
h1 {
  font-size: 2em;
  margin-bottom: 0.5em;
}

form {
  display: flex;
  flex-direction: column;
}

div {
  margin-bottom: 1em;
}

label {
  margin-bottom: 0.5em;
}

input {
  padding: 0.5em;
  font-size: 1em;
}

button {
  padding: 0.5em 1em;
  font-size: 1em;
  cursor: pointer;
}

span {
  color: red;
  font-size: 0.875em;
}
</style>
