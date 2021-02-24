<template>
  <div class="ec-home-cards mt-30">
    <div class="row">
      <div
        v-for="({ id, title, load }) in availableCards"
        :key="id"
        class="col-md-6"
      >
        <article class="card">
          <div class="card-header">
            <h5 class="card-title">
              {{ title }}
            </h5>

            <ul class="card-controls">
              <li>
                <a
                  v-if="cards.find(card => card.card_id === id)"
                  href="#"
                  class="text-purple"
                  @click.prevent="switchCard(id)"
                  v-b-tooltip.hover="i19disfavor"
                >
                  <i class="ti-pin-alt"></i>
                </a>
                <a
                  v-else
                  href="#"
                  @click.prevent="switchCard(id)"
                  v-b-tooltip.hover="i19favor"
                >
                  <i class="ti-star"></i>
                </a>
              </li>
              <li v-if="!loadedCards.includes(id)">
                <a
                  href="#"
                  @click.prevent="load(id)"
                  v-b-tooltip.hover="i19load"
                >
                  <i class="ti-download"></i>
                </a>
              </li>
            </ul>
          </div>

          <div class="card-body">
            <slide-y-up-transition>
              <div v-show="!loadingCards.includes(id)">
                <div
                  :ref="id"
                  v-once
                >
                  <div class="text-center">
                    <button
                      class="btn btn-light"
                      @click="load(id)"
                    >
                      <i class="fa fa-spinner mr-1"></i>
                      {{ i19load }}
                    </button>
                  </div>
                </div>
              </div>
            </slide-y-up-transition>

            <slide-y-up-transition>
              <div
                v-if="loadingCards.includes(id)"
                class="d-flex justify-content-center"
              >
                <div
                  class="spinner-grow"
                  style="width: 4rem; height: 4rem;"
                  role="status"
                >
                  <span class="sr-only">Loading...</span>
                </div>
              </div>
            </slide-y-up-transition>
          </div>
        </article>
      </div>
    </div>
  </div>
</template>

<script src="./js/EcHomeCards.js"></script>
