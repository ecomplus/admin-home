<template>
  <article class="ec-onboarding">
    <div class="card">
      <h4 class="card-title fw-400">
        {{ i19firstSteps }}
      </h4>

      <ol class="timeline timeline-activity timeline-sm timeline-content-right w-100 py-20 pr-20">
        <li
          v-for="({ isDone, icon, text, ctas }, i) in steps"
          :key="`step-${i}`"
          class="timeline-block"
        >
          <div class="timeline-point">
            <span :class="`avatar${(isDone ? ' bg-success' : '')}`">
              <i :class="`fa fa-${icon}`"></i>
            </span>
          </div>

          <div class="timeline-content">
            <p class="lead">
              {{ text }}
            </p>
            <template v-if="ctas">
              <div class="gap-items">
                <a
                  v-for="([label, link, isSecondary]) in ctas"
                  :key="link"
                  :href="link"
                  class="btn btn-sm"
                  :class="isSecondary ? 'd-none d-lg-inline-block btn-outline-light' :
                    `btn-${(isDone ? 'light' : 'success')}`"
                >
                  <i
                    v-if="ctas.length === 1"
                    :class="`mr-1 fa fa-${(isDone ? 'check text-success' : 'chevron-circle-right')}`"
                  ></i>
                  {{ label }}
                </a>
              </div>
              <hr>
            </template>
          </div>
        </li>
      </ol>

      <div>
        <div
          class="mx-auto"
          style="max-width: 800px"
        >
          <div class="embed-responsive embed-responsive-16by9">
            <iframe
              class="embed-responsive-item"
              :src="`https://www.youtube.com/embed/${youtubeVideo}?rel=0&list=${youtubePlaylist}&index=1`"
              allowfullscreen
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  </article>
</template>

<script src="./js/EcOnboarding.js"></script>
