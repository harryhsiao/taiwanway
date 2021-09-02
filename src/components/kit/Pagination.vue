<template>
    <div class="">
        <nav aria-label="Page navigation example">
            <ul class="pagination">
                <li class="page-item" :class="{ disabled: !pgnum.has_pre }">
                    <a
                        class="page-link"
                        href="#"
                        aria-label="Previous"
                        @click.prevent="getpgnums('pre')"
                    >
                        <span aria-hidden="true">&laquo;</span>
                    </a>
                </li>
                <li
                    class="page-item"
                    v-for="page in pgnum.total_pages"
                    :key="page"
                    :class="{ active: pgnum.current_page === page }"
                >
                    <a class="page-link" href="#" @click.prevent="getpgnums('cur', page)">
                        {{ page }}
                    </a>
                </li>
                <li class="page-item" :class="{ disabled: !pgnum.has_next }">
                    <a
                        class="page-link"
                        href="#"
                        aria-label="Next"
                        @click.prevent="getpgnums('next')"
                    >
                        <span aria-hidden="true">&raquo;</span>
                    </a>
                </li>
            </ul>
        </nav>
    </div>
</template>

<script>
export default {
    name: 'pages',
    props: ['pgnum'],
    methods: {
        getpgnums(page, curpage) {
            const vm = this;
            if (page === 'pre') {
                vm.$emit('getpgnum', vm.pgnum.current_page - 1);
            } else if (page === 'next') {
                vm.$emit('getpgnum', vm.pgnum.current_page + 1);
            } else {
                vm.$emit('getpgnum', curpage);
            }
        },
    },
};
</script>
