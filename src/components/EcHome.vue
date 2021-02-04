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
                    class="pl-3 text-purple"
                    style="user-select: text"
                    v-text="storeId"
                  />
                </code>
              </span>
            </p>

            <slide-y-up-transition>
              <div v-if="store.name">
                <div class="mt-4 mb-3">
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
                      :href="shopLink"
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

          <div class="col-md-4">
            <b-overlay
              v-if="!isLoading"
              :show="isLoadingMetrics"
            >
              <div class="card shadow-0 text-right">
                <div class="card-header no-border justify-content-end">
                  <template v-if="orderMetrics.countCreated">
                    <i class="fa fa-rocket text-purple fs-25"></i>
                    <h6 class="card-title card-title-bold">
                      {{ orderMetrics.countCreated }}
                      <small>{{ i19newOrders }}</small>
                    </h6>
                  </template>
                  <template v-else>
                    <i class="fa fa-flag fs-25"></i>
                    <h6 class="card-title card-title-bold text-right">
                      <small>{{ i19noNewOrdersMsg }}</small>
                    </h6>
                  </template>
                </div>

                <div class="card-body pt-2">
                  <div
                    v-if="orderMetrics.countCreated"
                    class="gap-items fs-18 mb-3"
                  >
                    <ShareNetwork
                      v-for="network in ['whatsapp', 'telegram', 'facebook', 'twitter']"
                      :key="network"
                      :network="network"
                      :class="`text-${network}`"
                      :url="shopLink"
                      :title="`Nossa loja ${store.name} fez ${orderMetrics.countCreated} novos pedidos 🚀 !`"
                      hashtags="vendermais,ecomplus"
                    >
                      <i :class="`fa fa-${network}`"></i>
                    </ShareNetwork>
                  </div>

                  <template v-if="orderMetrics.paidAmount">
                    <em class="fw-200">
                      {{ i19paymentConfirmed }}
                    </em>
                    <div class="fs-30">
                      {{ formatMoney(orderMetrics.paidAmount) }}
                    </div>
                  </template>
                </div>
              </div>
            </b-overlay>
          </div>
        </div>
      </div>
    </b-overlay>
  </div>
</template>

<script src="./js/EcHome.js"></script>
