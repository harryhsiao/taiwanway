<template>
    <div>
        <loading :active.sync="isLoading"></loading>
        <div class="d-flex justify-content-between align-items-center mb-3">
            <h2>優惠券管理</h2>
            <button class="btn btn-primary my-4" @click="openCouponmodal(true)">
                新增優惠券
            </button>
        </div>
        <table class="table rwd-table">
            <thead>
                <tr>
                    <th class="text-md-center" scope="col">流水號</th>
                    <th class="text-md-center" scope="col">名稱</th>
                    <th class="text-md-center" scope="col">折扣數</th>
                    <th class="text-md-center" scope="col">折扣碼</th>
                    <th class="text-md-center" scope="col">到期日</th>
                    <th class="text-md-center" scope="col">票券狀態</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in filterdate" :key="item.id">
                    <td class="text-md-center" data-th="流水號">{{ item.num }}</td>
                    <td class="text-md-center" data-th="名稱">{{ item.title }}</td>
                    <td class="text-md-center" data-th="折扣數">{{ item.percent }} %</td>
                    <td class="text-md-center" data-th="折扣碼">{{ item.code }}</td>
                    <td class="text-md-center" data-th="到期日">
                        {{ item.due_date | dateFilter }}
                    </td>
                    <td class="text-md-center" data-th="票券狀態">
                        <span v-if="item.is_enabled === 1" class="text-success">
                            啟用
                        </span>
                        <span v-else class="text-black-50">尚未啟用</span>
                    </td>
                    <td class="text-md-center">
                        <span
                            ><button
                                class="btn btn-outline-coffemilk btn-sm mb-2"
                                @click="openCouponmodal(false, item)"
                            >
                                編輯
                            </button>
                            <button
                                class="btn btn-outline-danger btn-sm"
                                @click="openremovemodel(item)"
                            >
                                刪除
                            </button>
                        </span>
                    </td>
                </tr>
            </tbody>
        </table>
        <div
            class="modal fade"
            id="couponModal"
            tabindex="-1"
            role="dialog"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
        >
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">新增優惠券</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="form-group">
                            <label for="title">標題</label>
                            <input
                                type="text"
                                class="form-control"
                                id="title"
                                v-model="tempcoupon.title"
                                placeholder="請輸入標題"
                            />
                        </div>
                        <div class="form-group">
                            <label for="coupon_code">優惠碼</label>
                            <input
                                type="text"
                                class="form-control"
                                id="coupon_code"
                                v-model="tempcoupon.code"
                                placeholder="請輸入優惠碼"
                            />
                        </div>
                        <div class="form-group">
                            <label for="due_date">到期日</label>
                            <input
                                type="date"
                                class="form-control"
                                id="due_date"
                                v-model="due_date"
                            />
                        </div>
                        <div class="form-group">
                            <label for="price">折扣百分比</label>
                            <input
                                type="number"
                                class="form-control"
                                id="price"
                                v-model="tempcoupon.percent"
                                placeholder="請輸入折扣百分比"
                            />
                        </div>
                        <div class="form-group">
                            <div class="form-check">
                                <input
                                    class="form-check-input"
                                    type="checkbox"
                                    :true-value="1"
                                    :false-value="0"
                                    v-model="tempcoupon.is_enabled"
                                    id="is_enabled"
                                />
                                <label class="form-check-label" for="is_enabled">
                                    是否啟用
                                </label>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">
                            取消
                        </button>
                        <button type="button" class="btn btn-primary" @click="updateCoupon">
                            新增
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div
            class="modal fade"
            id="delProductModal"
            tabindex="-1"
            role="dialog"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
        >
            <div class="modal-dialog" role="document">
                <div class="modal-content border-0">
                    <div class="modal-header bg-danger text-white">
                        <h5 class="modal-title" id="exampleModalLabel">
                            <span>刪除優惠券</span>
                        </h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        你確定要刪除
                        <strong class="text-danger">{{ tempcoupon.title }}</strong>
                        (刪除後將無法恢復)。
                    </div>
                    <div class="modal-footer">
                        <button
                            type="button"
                            class="btn btn-outline-secondary"
                            data-dismiss="modal"
                        >
                            取消
                        </button>
                        <button type="button" class="btn btn-danger" @click="removedata">
                            確認刪除
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <Pagination class="d-flex justify-content-center" :pgnum="pagination" @getpgnum="getcoupons" />
    </div>
</template>

<script>
import $ from 'jquery';
import Pagination from '@/components/kit/Pagination';

export default {
    data() {
        return {
            coupons: [],
            pagination: {},
            tempcoupon: {
                title: '',
                is_enabled: 0,
                percent: 100,
                due_date: 0,
                code: '',
            },
            isNew: false,
            isadd: false,
            dateAndTime: '',
            isLoading: false,
            due_date: new Date(),
        };
    },
    created() {
        this.getcoupons();
        this.dateAndTime = Math.floor(new Date().getTime() / 1000);
    },
    computed: {
        // 過濾到期日
        filterdate() {
            const vm = this;
            return vm.coupons.filter((el) => {
                if (el.due_date > vm.dateAndTime) {
                    el.is_enabled = 1;
                } else {
                    el.is_enabled = 0;
                }
                return el;
            });
        },
    },
    components: {
        Pagination,
    },
    watch: {
        due_date() {
            const vm = this;
            const timestamp = Math.floor(new Date(vm.due_date) / 1000);
            vm.tempcoupon.due_date = timestamp;
        },
    },
    filters: {
        dateFilter: function(time) {
            const date = new Date(time * 1000);
            return date.toLocaleDateString();
        },
    },
    methods: {
        getcoupons(page = 1) {
            const vm = this;
            const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupons?page=${page}`;
            vm.isLoading = true;
            vm.$http.get(api).then((response) => {
                vm.coupons = response.data.coupons;
                vm.pagination = response.data.pagination;
                vm.isLoading = false;
            });
        },
        openCouponmodal(isNew, item) {
            const vm = this;
            $('#couponModal').modal('show');
            vm.isNew = isNew;
            if (vm.isNew) {
                vm.tempcoupon = {};
            } else {
                vm.tempcoupon = { ...item };
                const dateAndTime = new Date(vm.tempCoupon.due_date * 1000)
                    .toISOString()
                    .split('T');
                vm.due_date = dateAndTime[0];
            }
        },
        updateCoupon() {
            const vm = this;
            if (vm.isNew) {
                const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupon`;
                vm.$http.post(api, { data: vm.tempcoupon }).then(() => {
                    $('#couponModal').modal('hide');
                    this.getcoupons();
                });
            } else {
                const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupon/${vm.tempcoupon.id}`;
                vm.due_date = new Date(vm.tempcoupon.due_date * 1000);
                vm.$http.put(api, { data: vm.tempcoupon }).then(() => {
                    $('#couponModal').modal('hide');
                    this.getcoupons();
                });
            }
        },
        openremovemodel(item) {
            this.tempcoupon = { ...item };
            $('#delProductModal').modal('show');
        },
        removedata() {
            const vm = this;
            const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupon/${vm.tempcoupon.id}`;
            vm.$http.delete(api, { data: vm.tempcoupon.id }).then((response) => {
                if (response.data.success) {
                    $('#delProductModal').modal('hide');
                    vm.getcoupons();
                } else {
                    $('#delProductModal').modal('hide');
                    vm.getcoupons();
                }
            });
        },
    },
};
</script>
