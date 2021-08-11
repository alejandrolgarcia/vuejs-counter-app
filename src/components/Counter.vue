<template>
    <h2>{{ custonTitle }}</h2>
    <p> {{ counter }} <sup>2</sup> = {{ squareCounter }} </p>

    <button @click="increase" class="primary"> + 1 </button>
    <button @click="decrease" class="primary"> - 1 </button>
</template>

<script>
export default {
    props: {
        title: String,
        start: {
            type: Number,
            default: 10,
            // required: true
            validator( value ) {
                return value >= 0
            }
        }
    },
    // name: 'Counter'

    data() {
        return {
            counter: this.start
        }
    },
    methods: {
        getSquareValue() {
            return this.counter * this.counter
        },

        increase() {
            this.counter++
        },

        decrease() {
            this.counter--
        }
    },
    computed: {
        squareCounter() {
            return this.counter * this.counter
        },
        custonTitle() {
            return ( !this.title ) ? 'Counter' : this.title
        }
    },
}
</script>

<style>
    button {
        -moz-appearance: none;
        -moz-transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;
        -ms-appearance: none;
        -ms-transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;
        -webkit-appearance: none;
        -webkit-transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;
        appearance: none;
        background-color: transparent;
        border-radius: 0.375em;
        border: 0;
        box-shadow: inset 0 0 0 2px #f56a6a;
        color: #f56a6a !important;
        cursor: pointer;
        display: inline-block;
        font-size: 0.8em;
        font-weight: 700;
        height: 3.5em;
        letter-spacing: 0.075em;
        line-height: 3.5em;
        margin: 0 5px;
        padding: 0 2.25em;
        text-align: center;
        text-decoration: none;
        text-transform: uppercase;
        transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;
        white-space: nowrap;

    }

    button.primary {
        background-color: #f56a6a;
        box-shadow: none;
        color: #ffffff !important;
    }

    button:hover {
        background-color: rgba(245, 106, 106, 0.05);
    }

    button.primary:hover {
        background-color: #f67878; 
    }
</style>