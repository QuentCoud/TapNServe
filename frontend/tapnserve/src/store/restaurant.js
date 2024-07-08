
const state = () => ({
    restaurantPool: [
        {
            id: "test1",
            name: "restaurant test1",
            image: "",
            carte: {
                "Restaurant": [
                    {
                        id: "plat2",
                        name: "plat2",
                        image: "test.jpg",
                        prix: 20.99,
                        description: "jea fe vzvzvzh vds vds vdsvdsv vdsvsdv v dvd vds  d vsddsvdsv vdsv vdvsvds vdsvsv v vdsv dsvdsvs"
                    },
                    {
                        id: "plat3",
                        name: "plat2",
                        image: "test.jpg",
                        prix: 20.99,
                        description: "jea fe vzvzvzh vds vds vdsvdsv vdsvsdv v dvd vds  d vsddsvdsv vdsv vdvsvds vdsvsv v vdsv dsvdsvs"
                    }
                ],
                "Bar": [
                    {
                        id: "plat1",
                        name: "plat1",
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
    }
};

const getters = {
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
};