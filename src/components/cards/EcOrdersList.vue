<template>
  <div class="ec-orders-list">
    <table
      id="ec-orders-list-table"
      class="table table-separated table-responsive-sm"
    >
      <tbody>
        <tr
          v-for="order in pageOrders"
          :key="order._id"
        >
          <th scope="row">
            <span class="small text-monospace">
              {{ formatDate(order.created_at) }}
            </span>

            <i
              v-if="order.financial_status"
              class="ml-1 fa fa-usd"
              :class="`text-${getStatusColor(order.financial_status.current)}`"
              v-b-tooltip.hover="i19FinancialStatus(order.financial_status.current)"
            ></i>
            <i
              v-if="order.fulfillment_status"
              class="ml-2 fa fa-truck"
              :class="`text-${getStatusColor(order.fulfillment_status.current)}`"
              v-b-tooltip.hover="i19FulfillmentStatus(order.fulfillment_status.current)"
            ></i>
          </th>

          <td>
            <a
              v-if="order.buyers && order.buyers.length"
              :href="`/#/resources/customers/${order.buyers[0]._id}`"
            >
              {{ getNickname(order.buyers[0]).substring(0, 14) }}
            </a>
          </td>
          <td>{{ formatMoney(order.amount.total) }}</td>

          <td class="text-right table-actions">
            <a
              class="btn btn-xs btn-block"
              :class="`btn-${getStatusColor(order.status)}`"
              :href="`/#/resources/orders/${order._id}`"
            >
              {{ order.number }}
            </a>
          </td>
        </tr>
      </tbody>
    </table>

    <b-pagination
      v-model="currentPage"
      :total-rows="orders.length"
      :per-page="pageSize"
      aria-controls="ec-orders-list-table"
      class="justify-content-center"
    ></b-pagination>
  </div>
</template>

<script src="./js/EcOrdersList.js"></script>
