<template>
  <div class="ec-home">
    <fade-transition :duration="{ enter: 600 }">
      <div
        v-if="!isLoading"
        class="card p-30"
      >
        <div class="row">
          <div class="col">
            <div class="d-flex flex-column justify-content-between h-100">
              <div class="row align-items-center">
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
                    <div class="d-flex align-items-center mt-4 mb-3 mb-xl-0">
                      <img
                        v-if="store.logo"
                        :src="store.logo.url"
                        alt="Logo"
                        class="img-fluid"
                        style="max-height: 60px"
                      >
                      <i
                        v-else
                        class="fa fa-picture-o fs-50 ml-4 opacity-50"
                      ></i>
                      <a
                        class="text-secondary ml-3"
                        href="#"
                        @click.prevent="uploadLogo"
                        :title="i19uploadLogo"
                      >
                        <i class="ti-pencil"></i>
                      </a>
                    </div>
                  </slide-y-up-transition>
                </div>

                <div class="col-lg-7">
                  <slide-y-up-transition>
                    <div v-if="store.name">
                      <h1>{{ store.name }}</h1>

                      <div>
                        <a
                          :href="`mailto:${store.financial_email}`"
                          target="_blank"
                        >
                          {{ store.financial_email }}
                        </a>

                        <span
                          v-if="store.domain"
                          class="d-inline-block"
                        >
                          ·
                          <a
                            :href="`https://${store.domain}`"
                            target="_blank"
                            class="fw-500"
                          >
                            {{ store.domain }}
                          </a>
                          <a
                            class="text-secondary ml-1"
                            href="#"
                            @click.prevent="isEditingDomain = !isEditingDomain"
                            :title="i19setStoreDomain"
                          >
                            <i class="ti-pencil"></i>
                          </a>
                        </span>
                      </div>

                      <slide-y-up-transition>
                        <div v-if="store.domain">
                          <a
                            target="_blank"
                            :href="`https://${store.domain}/admin/`"
                            class="btn btn-primary mr-3 mt-2"
                          >
                            <i class="ti-paint-roller"></i>
                            <span class="ml-1 d-none d-md-inline">
                              {{ i19editStorefront }}
                            </span>
                          </a>
                          <a
                            target="_blank"
                            :href="shopLink"
                            class="btn btn-primary mt-2"
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
              </div>

              <div class="d-none d-lg-block mt-4">
                <a
                  href="/#/settings"
                  class="btn btn-sm btn-outline-secondary mr-3 mt-2"
                >
                  <i class="fa fa-cogs mr-1"></i>
                  {{ i19settings }}
                </a>
                <a
                  href="/#/resources/products/new"
                  class="d-none d-xl-inline-block btn btn-sm btn-outline-secondary mr-3 mt-2"
                >
                  <i class="fa fa-tag mr-1"></i>
                  {{ i19registerProduct }}
                </a>
                <a
                  href="/#/apps"
                  class="btn btn-sm btn-outline-secondary mt-2"
                >
                  <i class="fa fa-puzzle-piece mr-1"></i>
                  {{ i19apps }}
                </a>
              </div>
            </div>
          </div>

          <div class="col-sm col-md-auto col-xl-5 mt-5 mt-sm-0 text-right">
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
                  v-if="ordersMetrics.countCreated"
                  class="d-flex align-items-center justify-content-end"
                >
                  <strong class="fs-40 text-purple">
                    {{ ordersMetrics.countCreated }}
                  </strong>
                  <span class="ml-2 text-uppercase lh-1">
                    <a href="/#/resources/orders">
                      {{ i19newOrders }}
                    </a>
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

                <div
                  v-if="ordersMetrics.countCreated"
                  class="gap-items fs-18 pt-2"
                >
                  <ShareNetwork
                    v-for="network in ['whatsapp', 'telegram', 'facebook', 'twitter']"
                    :key="network"
                    :network="network"
                    :class="`text-${network}`"
                    :url="shopLink"
                    :title="`Nossa loja ${store.name} fez ${ordersMetrics.countCreated} novos pedidos 🚀 !`"
                    hashtags="vendermais,ecomplus"
                  >
                    <i :class="`fa fa-${network}`"></i>
                  </ShareNetwork>
                </div>

                <div class="row justify-content-end">
                  <div
                    v-for="({ label, value, diffValue, diffPercent }) in amountMetrics"
                    class="col-lg-auto mt-3"
                  >
                    <template v-if="value">
                      <em class="fw-200">
                        {{ label }}
                      </em>
                      <div class="fs-30 lh-1">
                        {{ formatMoney(value) }}
                      </div>
                      <span
                        v-if="diffValue !== null"
                        class="fs-14"
                        :class="diffValue > 0 ? 'text-success' : 'text-danger'"
                        v-b-tooltip.hover.bottomleft="i19comparedPreviousPeriodMsg"
                      >
                        <i
                          class="fa"
                          :class="`fa-arrow-circle-${(diffValue > 0 ? 'up' : 'down')}`"
                        ></i>
                        {{ (diffValue > 0 ? '+' : '') + formatMoney(diffValue) }}
                        <strong v-if="diffPercent">
                          {{ diffPercent }}
                        </strong>
                      </span>
                    </template>
                  </div>
                </div>
              </div>
            </fade-transition>
          </div>
        </div>
      </div>
    </fade-transition>

    <div
      v-if="isLoading"
      class="text-center"
    >
      <p class="fs-40">
        <span class="text-light opacity-30">Store ID</span>
        <strong class="text-purple opacity-70">
          {{ storeId }}
        </strong>
      </p>
      <div class="mt-4 d-flex justify-content-center">
        <div
          class="spinner-border"
          style="width: 7rem; height: 7rem;"
          role="status"
        >
          <span class="sr-only">Loading...</span>
        </div>
      </div>
      <img
        alt="E-Com Plus"
        class="img-fluid mt-5"
        width="200"
        src="https://ecom.nyc3.digitaloceanspaces.com/brand/plus/248x54.png"
      >
    </div>

    <template v-if="!isMobile && ordersMetrics.countCreated">
      <slide-y-up-transition>
        <ec-orders-graphs
          v-if="hasLoadedAllMetrics"
          :date-range="fixedDateRange"
          @load="hasLoadedOrdersGraphs = hasLoadedOnce = true"
        />
      </slide-y-up-transition>

      <template v-if="!isLoading && !hasLoadedOrdersGraphs">
        <div v-once>
          <b-skeleton
            v-for="i in 5"
            :key="`skeleton-${i}`"
            animation="wave"
            :width="`${(Math.floor(Math.random() * (95 - 35)) + 35)}%`"
            height="35px"
          ></b-skeleton>
        </div>
      </template>
    </template>

    <slide-y-up-transition>
      <ec-home-cards
        v-if="hasLoadedOnce"
        :start-date="dateRangeIso.start"
        :end-date="dateRangeIso.end"
      />
    </slide-y-up-transition>
  </div>
</template>

<script src="./js/EcHome.js"></script>
