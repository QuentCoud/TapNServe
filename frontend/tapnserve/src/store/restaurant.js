
const state = () => ({
    restaurantPool: [
        {
            id: "test1",
            name: "restaurant test1",
            image: "",
            cartes: {
                "Restaurant": [
                    {
                        id: "plat1",
                        name: "plat1",
                        image: "",
                        prix: 12.78,
                        description: ""
                    },
                    {
                        id: "plat2",
                        name: "plat2",
                        image: "",
                        prix: 20.99,
                        description: ""
                    }
                ],
                "Bar": [
                    {
                        id: "plat1",
                        name: "plat1",
                        image: "",
                        prix: 12.78,
                        description: ""
                    }
                ]
            }
        }
    ]
});

const mutations = {
};

const actions = {
    getRestaurant(id) {

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