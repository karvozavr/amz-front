<template>
    <b-container>
        <b-row id="input-field">
            <b-input-group>
                <b-form-input v-model="asin" placeholder="Enter keyword..." @change="resetPage"></b-form-input>
                <b-input-group-append>
                    <b-button variant="success" @click="findByAsin">
                        <b-icon-search icon="search-circle-fill"></b-icon-search>
                        Search
                    </b-button>
                </b-input-group-append>
            </b-input-group>
        </b-row>
        <b-row id="data-table">
            <span>{{data}}</span>
        </b-row>
    </b-container>
</template>

<script>
    const axios = require('axios').default;

    import {BFormInput, BContainer, BRow, BButton, BInputGroup, BInputGroupAppend, BIconSearch} from 'bootstrap-vue'

    export default {
        name: 'Table',
        components: {
            'b-form-input': BFormInput,
            'b-row': BRow,
            'b-container': BContainer,
            'b-button': BButton,
            'b-icon-search': BIconSearch,
            'b-input-group': BInputGroup,
            'b-input-group-append': BInputGroupAppend,
        },
        data() {
            return {
                asin: '',
                data: ''
            }
        },

        methods: {
            findByAsin() {
                // const url = 'https://amz-keyword-api.herokuapp.com'
                const url = 'http://198.211.98.28:8082'
                axios.get(`${url}/api/keyword/${this.asin}`)
                    .then(response => {
                        this.data = response.data;
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
