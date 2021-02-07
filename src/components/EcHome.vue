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

                <div>
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
                      class="fw-500"
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
                </div>

                <slide-y-up-transition>
                  <div v-if="store.domain">
                    <a
                      target="_blank"
                      :href="`https://${store.domain}/admin/`"
                      class="btn btn-sm btn-primary mr-3 mt-2"
                    >
                      <i class="ti-paint-roller"></i>
                      <span class="ml-1 d-none d-md-inline">
                        {{ i19editStorefront }}
                      </span>
                    </a>
                    <a
                      target="_blank"
                      :href="shopLink"
                      class="btn btn-sm btn-primary mt-2"
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

          <div class="col-md-5 mt-3 mt-md-0 text-right">
            <div class="mb-3">
              <ec-dates-picker
                v-if="!isLoading"
                v-model="dateRange"
              />
            </div>

            <div
              v-if="isLoadingMetrics"
              style="position: absolute; right: 1rem"
            >
              <div
                class="spinner-grow"
                style="width: 3rem; height: 3rem;"
                role="status"
              >
                <span class="sr-only">Loading...</span>
              </div>
            </div>

            <fade-transition>
              <div v-if="!isLoading && !isLoadingMetrics">
                <div
                  v-if="orderMetrics.countCreated"
                  class="d-flex align-items-center justify-content-end"
                >
                  <strong class="fs-40 text-purple">
                    {{ orderMetrics.countCreated }}
                  </strong>
                  <span class="ml-2 text-uppercase lh-1">
                    {{ i19newOrders }}
                    <template v-if="countOrdersDiff !== null">
                      <br>
                      <span
                        class="fs-15"
                        :class="countOrdersDiff > 0 ? 'text-success' : 'text-danger'"
                        v-b-tooltip.hover.bottomleft="i19comparedPreviousPeriodMsg"
                      >
                        <i
                          class="fa"
                          :class="`fa-arrow-circle-${(countOrdersDiff > 0 ? 'up' : 'down')}`"
                        ></i>
                        {{ (countOrdersDiff > 0 ? '+' : '') + countOrdersDiff }}
                        <strong v-if="countOrdersDiffPercent">
                          {{ countOrdersDiffPercent }}
                        </strong>
                      </span>
                    </template>
                  </span>
                </div>
                <span v-else>
                  {{ i19noNewOrdersMsg }}
                </span>

                <div class="pt-2">
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
                    <div class="fs-30 lh-1">
                      {{ formatMoney(orderMetrics.paidAmount) }}
                    </div>
                    <span
                      v-if="paidAmountDiff !== null"
                      class="fs-14"
                      :class="paidAmountDiff > 0 ? 'text-success' : 'text-danger'"
                      v-b-tooltip.hover.bottomleft="i19comparedPreviousPeriodMsg"
                    >
                      <i
                        class="fa"
                        :class="`fa-arrow-circle-${(paidAmountDiff > 0 ? 'up' : 'down')}`"
                      ></i>
                      {{ (paidAmountDiff > 0 ? '+' : '') + formatMoney(paidAmountDiff) }}
                      <strong v-if="paidAmountDiffPercent">
                        {{ paidAmountDiffPercent }}
                      </strong>
                    </span>
                  </template>
                </div>
              </div>
            </fade-transition>
          </div>
        </div>
      </div>
    </b-overlay>
  </div>
</template>

<script src="./js/EcHome.js"></script>
