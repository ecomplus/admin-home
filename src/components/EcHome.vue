<template>
  <div class="ec-home">
    <b-overlay :show="isLoading">
      <div class="card p-30">
        <div class="row">
          <div class="col">
            <p>
              <span class="badge badge-xl badge-light px-4">
                <code
                  class="fs-17"
                  style="user-select: none"
                >
                  <span class="text-light opacity-60">Store ID</span>
                  <span
                    class="pl-3 text-secondary"
                    style="user-select: text"
                    v-text="storeId"
                  />
                </code>
              </span>
            </p>

            <slide-y-up-transition>
              <div v-if="store.name">
                <div class="my-3">
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

                <slide-y-up-transition>
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
                </slide-y-up-transition>

                <slide-y-up-transition>
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
                          <i class="fa fa-question-circle"></i>
                        </a>
                      </small>
                    </div>
                  </div>
                </slide-y-up-transition>
              </div>
            </slide-y-up-transition>
          </div>

          <div class="col-md-3">
          </div>
        </div>
      </div>
    </b-overlay>
  </div>
</template>

<script src="./js/EcHome.js"></script>
