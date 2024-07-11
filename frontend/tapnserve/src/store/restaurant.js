import axios from "../axios";

const state = () => ({
    restaurantPool: [
        {
            id: "test1",
            name: "restaurant test1",
            image: "/restau1.jpg",
            carte: {
                "Restaurant": [
                    {
                        "id": "plat1",
                        "name": "Spaghetti Carbonara",
                        "image": "1.jpg",
                        "prix": 12.50,
                        "description": "Délicieux spaghetti avec une sauce carbonara crémeuse faite d'œufs, de fromage, de pancetta et de poivre."
                    },
                    {
                        "id": "plat2",
                        "name": "Saumon Grillé",
                        "image": "2.jpeg",
                        "prix": 18.75,
                        "description": "Saumon fraîchement grillé servi avec des légumes rôtis et une sauce au beurre citronné."
                    },
                    {
                        "id": "plat3",
                        "name": "Salade César",
                        "image": "3.jpeg",
                        "prix": 9.99,
                        "description": "Laitue romaine croquante avec une vinaigrette César, des croûtons et du fromage Parmesan."
                    },
                    {
                        "id": "plat4",
                        "name": "Pizza Margherita",
                        "image": "4.jpg",
                        "prix": 14.50,
                        "description": "Pizza classique garnie de tomates fraîches, de mozzarella et de basilic."
                    },
                ],
                "Bar": [
                    {
                        "id": "BAR1",
                        "name": "Mojito",
                        "image": "5.jpg",
                        "prix": 7.50,
                        "description": "Cocktail rafraîchissant à base de rhum, de jus de citron vert, de menthe, de sucre et d'eau gazeuse."
                    },
                    {
                        "id": "BAR2",
                        "name": "Old Fashioned",
                        "image": "6.jpeg",
                        "prix": 8.00,
                        "description": "Cocktail classique à base de bourbon, de bitters, de sucre et d'un zeste d'orange."
                    },
                    {
                        "id": "BAR3",
                        "name": "Pina Colada",
                        "image": "7.jpg",
                        "prix": 7.00,
                        "description": "Cocktail tropical à base de rhum, de crème de coco et de jus d'ananas."
                    }
                ],
                "Desserts": [
                    {
                        "id": "dessert1",
                        "name": "Fondant au Chocolat",
                        "image": "8.jpg",
                        "prix": 6.50,
                        "description": "Gâteau au chocolat chaud avec un cœur coulant, servi avec une glace à la vanille."
                    },
                    {
                        "id": "dessert2",
                        "name": "Tiramisu",
                        "image": "9.jpg",
                        "prix": 5.50,
                        "description": "Dessert italien classique avec des couches de biscuits imbibés de café et de mascarpone."
                    }
                ],
                "Entrées": [
                    {
                        "id": "entree1",
                        "name": "Bruschetta",
                        "image": "11.jpg",
                        "prix": 4.99,
                        "description": "Pain grillé garni de tomates fraîches, de basilic, d'ail et d'huile d'olive."
                    },
                    {
                        "id": "entree2",
                        "name": "Champignons Farcis",
                        "image": "10.jpeg",
                        "prix": 6.00,
                        "description": "Champignons farcis avec un mélange de fromage, d'ail et d'herbes."
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