<template>
    <b-container>
        <b-row id="input-field">
            <b-input-group>
                <b-form-input v-model="keyword" placeholder="Enter a keyword..." @change="resetPage"></b-form-input>
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

                    <b-button variant="success" @click="findSynonymsByKeyword">
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
                        @input="findSynonymsByKeyword"
                ></b-pagination>
            </div>
        </b-row>
    </b-container>
</template>

<script>
    const axios = require('axios').default;

    import {
        BTable, BFormInput, BContainer, BRow,
        BButton, BInputGroup, BInputGroupAppend,
        BIconSearch, BPagination, BDropdown, BDropdownItem,
        BDropdownDivider, BFormCheckboxGroup
    } from 'bootstrap-vue'

    export default {
        name: 'Keywords',
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
                keyword: '',
                tableItems: [{keyword: "No data", count: ""}],
                fields: [
                    {
                        key: 'keyword',
                        sortable: true,
                        label: 'Key phrase'
                    },
                    {
                        key: 'count',
                        sortable: true,
                        label: 'Search volume'
                    }
                ],
                domainFilters: [
                    {
                        text: 'com',
                        value: 1
                    },
                    {
                        text: 'ca',
                        value: 2,
                    },
                    {
                        text: 'co_uk',
                        value: 3,
                    },
                    {
                        text: 'it',
                        value: 4,
                    },
                    {
                        text: 'in',
                        value: 5,
                    },
                    {
                        text: 'de',
                        value: 6,
                    },
                    {
                        text: 'fr',
                        value: 7,
                    },
                    {
                        text: 'es',
                        value: 8,
                    },
                    {
                        text: 'co_jp',
                        value: 10,
                    },
                    {
                        text: 'com_mx',
                        value: 11,
                    },
                    {
                        text: 'com_au',
                        value: 12,
                    },
                    {
                        text: 'com_br',
                        value: 13,
                    },
                ],
                selectedDomainFilters: [],
                currentPage: 1,
                rows: 0,
                perPage: 50,
            }
        },

        methods: {
            findSynonymsByKeyword() {
                this.tableItems = [{keyword: "No data", count: ""}];
                // const url = 'https://amz-keyword-api.herokuapp.com'
                const url = 'http://198.211.98.28:8082'
                const domainFiltersParam = this.selectedDomainFilters.length ? `&domain-filters=${this.selectedDomainFilters.join(',')}` : ''
                axios.get(`${url}/api/synonyms/${this.keyword}?page=${this.currentPage - 1}&size=${this.perPage}${domainFiltersParam}`)
                    .then(response => {
                        this.rows = response.data.totalElements;

                        if (this.rows > 0) {
                            this.tableItems = response.data.content;
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
</style>
