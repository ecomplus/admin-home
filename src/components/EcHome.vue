<template>
  <div class="ec-home">
    <div class="card p-30 pt-40 text-center">
      <div class="text-center mb-3">
        <img
          v-if="store.logo"
          :src="store.logo.url"
          alt="Logo"
          class="img-fluid"
          style="max-height: 60px"
        >
      </div>
      <h1>{{ store.name }}</h1>

      <p>
        <a
          :href="`mailto:${store.financial_email}`"
          target="_blank"
        >
          {{ store.financial_email }}
        </a>
        <template v-if="store.domain">
          ·
          <a
            :href="`https://${store.domain}`"
            target="_blank"
          >
            {{ store.domain }}
          </a>
        </template>
      </p>

      <p>
        <span class="badge badge-xl badge-light px-4">
          <code class="fs-17">
            <span class="text-light opacity-60">Store ID</span>
            <span class="ml-3 text-secondary">{{ store.store_id }}</span>
          </code>
        </span>
      </p>

      <div class="gap-items fs-16">
        <a class="text-facebook" href="#"><i class="fa fa-facebook"></i></a>
        <a class="text-dribbble" href="#"><i class="fa fa-dribbble"></i></a>
        <a class="text-google" href="#"><i class="fa fa-google"></i></a>
        <a class="text-twitter" href="#"><i class="fa fa-twitter"></i></a>
      </div>
    </div>
  </div>
</template>

<script src="./js/EcHome.js"></script>
