<template>
    <b-container>
        <b-row id="input-field">
            <b-input-group>
                <b-form-input v-model="asin" placeholder="Enter asin..." @change="resetPage"></b-form-input>
                <b-input-group-append>
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
                        align="center"
                        @input="findByAsin"
                ></b-pagination>
            </div>
        </b-row>
    </b-container>
</template>

<script>
    const axios = require('axios').default;

    import {BTable, BFormInput, BContainer, BRow, BButton, BInputGroup, BInputGroupAppend, BIconSearch, BPagination} from 'bootstrap-vue'

    export default {
        name: 'Table',
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
        },
        data() {
            return {
                asin: '',
                tableItems: [],
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
                currentPage: 1,
                rows: 0,
                perPage: 50,
            }
        },

        methods: {
            findByAsin() {
                this.tableItems = [];
                // const url = 'https://amz-keyword-api.herokuapp.com'
                const url = 'http://198.211.98.28:8080'
                axios.get(`${url}/api/asin/${this.asin}?page=${this.currentPage-1}&size=${this.perPage}`)
                    .then(response => {
                        this.rows = response.data.totalElements;
                        this.tableItems = response.data.content;
                    }).catch(err => {
                    console.log(err)
                })
            },
            resetPage() {
                this.currentPage = 1;
            }
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
</style>
