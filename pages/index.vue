<template>
  <section class="home">
    <div class="py-24 md:py-36 mx-auto flex flex-wrap flex-col md:flex-row items-center">
      <div class="flex flex-col w-full xl:w-3/5 justify-center lg:items-start overflow-y-hidden">

        <div class="mb-12 xl:mb-0">
          <h4 v-if="isSignedUp">Thank you - we'll be in touch shortly.</h4>

          <form
            v-else
            @submit.prevent="handleSubmit"
            name="signups"
            netlify
            class="flex items-center border-b border-b-2 border-blue-400 py-2"
          >
            <input
              ref="emailInput"
              v-model="email"
              class="appearance-none mb-36 bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
              type="text"
              name="email"
              placeholder="your@email.com"
              aria-label="Email address"
            />

            <button
              class="flex-shrink-0 bg-blue-500 hover:bg-blue-700 border-blue-500 hover:border-blue-700 text-sm border-4 text-white py-1 px-2 rounded"
              type="submit"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
      <div class="flex flex-col w-full xl:w-2/5">
        <img
          alt="Hero"
          class="rounded shadow-xl"
          src="https://source.unsplash.com/random/720x400"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue";

const email = ref('')
const isSignedUp = ref(false)

const encode = (data): string => {
  return Object.keys(data)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
    .join('&');
}

const validEmail = (email): boolean => {
  // eslint-disable-next-line
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

const handleSubmit = async (): Promise<void> => {
  if (!validEmail(this.form.email)) {
    // this.$refs.emailInput.focus();
    return;
  }

  try {
    await fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({ 'form-name': 'signups', email: email.value }),
    })

    isSignedUp.value = true;
  } catch (error) {
    console.error(error);
  }
}
</script>
