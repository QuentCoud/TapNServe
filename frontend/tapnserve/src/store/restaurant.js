import axios from "../axios";

const state = () => ({
    restaurantPool: [
        {
            id: "test1",
            name: "restaurant test1",
            image: "",
            carte: {
                "Restaurant": [
                    {
                        id: "plat1",
                        name: "plat1",
                        image: "test.jpg",
                        prix: 20.99,
                        description: "jea fe vzvzvzh vds vds vdsvdsv vdsvsdv v dvd vds  d vsddsvdsv vdsv vdvsvds vdsvsv v vdsv dsvdsvs"
                    },
                    {
                        id: "plat2",
                        name: "plat2",
                        image: "test.jpg",
                        prix: 20.99,
                        description: "jea fe vzvzvzh vds vds vdsvdsv vdsvsdv v dvd vds  d vsddsvdsv vdsv vdvsvds vdsvsv v vdsv dsvdsvs"
                    },
                    {
                        id: "plat3",
                        name: "plat3",
                        image: "test.jpg",
                        prix: 20.99,
                        description: "jea fe vzvzvzh vds vds vdsvdsv vdsvsdv v dvd vds  d vsddsvdsv vdsv vdvsvds vdsvsv v vdsv dsvdsvs"
                    },
                    {
                        id: "plat4",
                        name: "plat4",
                        image: "test.jpg",
                        prix: 20.99,
                        description: "jea fe vzvzvzh vds vds vdsvdsv vdsvsdv v dvd vds  d vsddsvdsv vdsv vdvsvds vdsvsv v vdsv dsvdsvs"
                    },
                    {
                        id: "plat5",
                        name: "plat5",
                        image: "test.jpg",
                        prix: 20.99,
                        description: "jea fe vzvzvzh vds vds vdsvdsv vdsvsdv v dvd vds  d vsddsvdsv vdsv vdvsvds vdsvsv v vdsv dsvdsvs"
                    }
                ],
                "Bar": [
                    {
                        id: "BAR1",
                        name: "bar1",
                        image: "test.jpg",
                        prix: 12.78,
                        description: "ijvodvh dvhdsvodshvoihds vdsivhs vodshvsdviosvshvodshvsdihv ds vvhodsivodsvhdisv svduvdsh"
                    }
                ]
            }
        },
        {
            id: "test2",
            name: "restaurant test2",
            image: "",
            carte: {
                "Restaurant": [
                    {
                        id: "platres1",
                        name: "platres1",
                        image: "test.jpg",
                        prix: 20.99,
                        description: "jea fe vzvzvzh vds vds vdsvdsv vdsvsdv v dvd vds  d vsddsvdsv vdsv vdvsvds vdsvsv v vdsv dsvdsvs"
                    },
                    {
                        id: "plaezat2",
                        name: "plaeazt2",
                        image: "test.jpg",
                        prix: 20.99,
                        description: "jea fe vzvzvzh vds vds vdsvdsv vdsvsdv v dvd vds  d vsddsvdsv vdsv vdvsvds vdsvsv v vdsv dsvdsvs"
                    },
                    {
                        id: "plateaz3",
                        name: "plaeazt3",
                        image: "test.jpg",
                        prix: 20.99,
                        description: "jea fe vzvzvzh vds vds vdsvdsv vdsvsdv v dvd vds  d vsddsvdsv vdsv vdvsvds vdsvsv v vdsv dsvdsvs"
                    },
                    {
                        id: "plateaz4",
                        name: "plaaezt4",
                        image: "test.jpg",
                        prix: 20.99,
                        description: "jea fe vzvzvzh vds vds vdsvdsv vdsvsdv v dvd vds  d vsddsvdsv vdsv vdvsvds vdsvsv v vdsv dsvdsvs"
                    },
                    {
                        id: "pleazat5",
                        name: "pleazat5",
                        image: "test.jpg",
                        prix: 20.99,
                        description: "jea fe vzvzvzh vds vds vdsvdsv vdsvsdv v dvd vds  d vsddsvdsv vdsv vdvsvds vdsvsv v vdsv dsvdsvs"
                    }
                ],
                "Sandwich": [
                    {
                        id: "BezaAR1",
                        name: "baeazr1",
                        image: "test.jpg",
                        prix: 12.78,
                        description: "ijvodvh dvhdsvodshvoihds vdsivhs vodshvsdviosvshvodshvsdihv ds vvhodsivodsvhdisv svduvdsh"
                    }
                ]
            }
        }
    ]
});

const mutations = {
};

const actions = {
    getRestaurant(context, payload) {
        return context.state.restaurantPool.find((val) => val.id === payload.id)
    },
    sendCommand(context, payload) {
        let val = JSON.parse(localStorage.getItem('panier')) ?? []
        let rdm = Math.round(Math.random() * 10000)

        val.push({...payload, id: rdm})

        localStorage.setItem('panier', JSON.stringify(val))

        return rdm
    }
};

const getters = {
};


for (let restau of state().restaurantPool) {
    const val = localStorage.getItem('carte'+restau.id)

    if (!val) {
        localStorage.setItem('carte'+restau.id, JSON.stringify(restau))
    }
}



export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
};