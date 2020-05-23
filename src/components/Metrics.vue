<template>
    <b-container class="container">
        <b-row id="input-field">
            <b-input-group>
                <b-form-input v-model="asin" placeholder="Enter asin..." @change="resetPage"></b-form-input>
                <b-input-group-append>
                    <b-dropdown id="domain" text="Domain">
                        <b-dropdown-item
                                @click="clearDomainFilters()">
                            Clear Filters
                        </b-dropdown-item>
                        <b-dropdown-divider></b-dropdown-divider>
                        <b-form-checkbox-group
                                class="filter-checkbox"
                                id="domain-checkbox-group"
                                v-model="selectedDomainFilters"
                                :options="domainFilters"
                                stacked>
                        </b-form-checkbox-group>
                    </b-dropdown>
                    <b-button variant="success" @click="findByAsin">
                        <b-icon-search icon="search-circle-fill"></b-icon-search>
                        Search
                    </b-button>
                </b-input-group-append>
            </b-input-group>
        </b-row>
        <b-row id="data-table">
            <b-table :items="tableItems" id="main-table" :fields="fields" striped hover></b-table>
            <div class="mt-3">
                <b-pagination
                        v-model="currentPage"
                        :total-rows="rows"
                        :per-page="perPage"
                        aria-controls="main-table"
                        @input="findByAsin"
                ></b-pagination>
            </div>
        </b-row>
    </b-container>
</template>

<script>
    const axios = require('axios').default;

    import {
        BButton,
        BContainer, BDropdown, BDropdownDivider, BDropdownItem, BFormCheckboxGroup,
        BFormInput,
        BIconSearch,
        BInputGroup,
        BInputGroupAppend, BPagination,
        BRow,
        BTable
    } from "bootstrap-vue";

    export default {
        name: "Metrics",
        components: {
            'b-table': BTable,
            'b-form-input': BFormInput,
            'b-row': BRow,
            'b-container': BContainer,
            'b-button': BButton,
            'b-icon-search': BIconSearch,
            'b-input-group': BInputGroup,
            'b-input-group-append': BInputGroupAppend,
            'b-pagination': BPagination,
            'b-dropdown': BDropdown,
            'b-dropdown-item': BDropdownItem,
            'b-dropdown-divider': BDropdownDivider,
            'b-form-checkbox-group': BFormCheckboxGroup,
        },

        data() {
            return {
                asin: '',
                tableItems: [
                    {
                        keyword: "Search for asin",
                        cpr8days: "",
                        ppc: "",
                        source: "",
                        amazonRecomed: "",
                        sponsoredRank: "",
                        organicRank: "",
                        competingProducts: "",
                        headlineASINs: "",
                    }
                ],
                fields:
                    [
                        {key: 'keyword', sortable: true, label: 'Keyword'},
                        {key: 'cpr8days', sortable: true, label: 'CPR 8-day giveaways'},
                        {key: 'ppc', sortable: true, label: 'PPC'},
                        {key: 'source', sortable: true, label: 'Source (s,a,o)'},
                        {key: 'amazonRecomed', sortable: true, label: 'Amazon recomed'},
                        {key: 'sponsoredRank', sortable: true, label: 'Sponsored rank'},
                        {key: 'organicRank', sortable: true, label: 'Organic rank'},
                        {key: 'competingProducts', sortable: true, label: 'Competing products'},
                        {key: 'headlineASINs', sortable: true, label: 'Headline ASINs'},
                    ],
                domainFilters:
                    [
                        {text: 'com', value: 1},
                        {text: 'ca', value: 2,},
                        {text: 'co_uk', value: 3,},
                        {text: 'it', value: 4,},
                        {text: 'in', value: 5,},
                        {text: 'de', value: 6,},
                        {text: 'fr', value: 7,},
                        {text: 'es', value: 8,},
                        {text: 'co_jp', value: 10,},
                        {text: 'com_mx', value: 11,},
                        {text: 'com_au', value: 12,},
                        {text: 'com_br', value: 13,},
                    ],
                selectedDomainFilters: [],
                currentPage: 1,
                rows: 0,
                perPage: 50,
            }
        },

        methods: {
            findByAsin() {
                this.tableItems = [{keyword: "Нет данных", count: ""}];
                const url = 'http://localhost:8181'
                // const url = 'http://198.211.98.28:8082'
                const filterParam = this.selectedDomainFilters ? `&domain-filters=${this.selectedDomainFilters.join(',')}` : ''
                axios.get(`${url}/api/metrics/asin/${this.asin}?page=${this.currentPage - 1}&size=${this.perPage}${filterParam}`)
                    .then(response => {
                        this.rows = response.data.totalElements;

                        if (this.rows > 0) {
                            console.log(response.data.content)
                            this.tableItems = response.data.content;
                            this.tableItems.forEach(item => item.ppc = item.ppc ? item.ppc : 'N/A')
                        } else {
                            this.tableItems = [{keyword: 'No results found', count: ''}];
                        }
                    }).catch(err => {
                    console.log(err)
                })
            },

            resetPage() {
                this.currentPage = 1;
            },

            clearDomainFilters() {
                this.selectedDomainFilters = []
            },
        }
    }
</script>

<style scoped>
    h3 {
        margin: 40px 0 0;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        display: inline-block;
        margin: 0 10px;
    }

    a {
        color: #42b983;
    }

    #input-field {
        margin-bottom: 10px;
    }

    .mt-3 {
        margin: 0 auto;
    }

    .filter-checkbox {
        margin-left: 5pt;
    }

    .container {
        max-width: 90%;
    }
</style>