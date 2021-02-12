<template>
  <div class="ec-products-list">
    <table
      id="ec-products-list-table"
      class="table table-striped table-responsive-sm"
      style="margin-bottom: 0.75rem"
    >
      <thead>
        <tr>
          <th>{{ i19name }}</th>
          <th>{{ i19stock }}</th>
          <th>{{ i19price }}</th>
          <th class="text-right">{{ i19sales }}</th>
        </tr>
      </thead>

      <tbody>
        <tr
          v-for="item in pageItems"
          :key="item._id"
        >
          <th scope="row">
            <a
              :href="`/#/resources/products/${item._id}`"
              class="lh-1"
            >
              <small :title="item.name">
                {{ item.name.substring(0, 20) }}
              </small>
              <span class="d-block text-monospace">
                {{ item.sku }}
              </span>
            </a>
          </th>

          <td
            class="align-middle"
            :class="!checkInStock(item) ? 'text-danger' : null"
          >
            {{ item.quantity }}
          </td>
          <td class="align-middle">
            {{ formatMoney(getPrice(item)) }}
          </td>
          <td class="align-middle text-right fw-500">
            {{ item.sales }}
          </td>
        </tr>
      </tbody>
    </table>

    <b-pagination
      v-model="currentPage"
      :total-rows="items.length"
      :per-page="pageSize"
      aria-controls="ec-products-list-table"
      class="justify-content-center"
    ></b-pagination>
  </div>
</template>

<script src="./js/EcProductsList.js"></script>
