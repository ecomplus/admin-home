<template>
  <div class="ec-home">
    <div class="card p-30 pt-40">
      <div class="mb-3">
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
          <a
            class="text-secondary"
            href="#"
            @click.prevent="isEditingDomain = !isEditingDomain"
            :title="i19setStoreDomain"
          >
            <i class="ti-pencil"></i>
          </a>
        </template>
      </p>

      <p>
        <span class="badge badge-xl badge-light px-4">
          <code
            class="fs-17"
            style="user-select: none"
          >
            <span class="text-light opacity-60">Store ID</span>
            <span
              class="ml-2 text-secondary"
              style="user-select: text"
            >
              {{ store.store_id }}
            </span>
          </code>
        </span>
      </p>

      <div v-if="store.domain">
        <a
          target="_blank"
          :href="`https://${store.domain}/admin/`"
          class="btn btn-sm btn-outline-primary mr-3"
        >
          <i class="ti-paint-roller"></i>
          <span class="ml-1 d-none d-md-inline">
            {{ i19editStorefront }}
          </span>
        </a>
        <a
          target="_blank"
          :href="store.homepage || `https://${store.domain}/`"
          class="btn btn-sm btn-outline-primary"
        >
          <i class="ti-shopping-cart"></i>
          <span class="ml-1 d-none d-md-inline">
            {{ i19goToStore }}
          </span>
        </a>
      </div>

      <div
        v-if="!store.domain || isEditingDomain"
        class="mt-3 form-type-combine"
      >
        <div class="form-group mb-0">
          <label>{{ i19domain }}</label>
          <input
            ref="input-domain"
            type="text"
            class="form-control"
            :placeholder="i19setStoreDomain"
            pattern="^([\w-]+\.){1,4}[\w]{2,}$"
            v-model="localDomain"
            @keyup.enter="setDomain"
            @focus="isEditingDomain = true"
            @blur="isEditingDomain = false"
          >

          <small class="form-text">
            {{ domainInputHelpText }}
            <a
              target="_black"
              :href="`https://community.e-com.plus/search?q=${encodeURIComponent(i19domain)}`"
            >
              <i class="fas fa-question-circle"></i>
            </a>
          </small>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./js/EcHome.js"></script>
