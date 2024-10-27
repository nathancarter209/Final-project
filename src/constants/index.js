import { avatar1, avatar2, avatar3, blog1, blog2, blog3, burger1, burger2, burger3, burger4, burger5, burger6, burger7, drink1, drink2, drink3, drink4, picon1, picon2, picon4, picon5, pizza1, pizza2, pizza3, promo1, promo2, promo3, promo4, promo5, sandwich1, sandwich2 } from "../assets";

export const navLinks = [
    {
        id: "home",
        title: "Home",
        link : './'
    },
    {
        id: "features",
        title: "Shop",
        link : './shop'
    },
    {
        id: "product",
        title: "Account",
        link : './signup'
    },
    {
        id: "clients",
        title: "Blogs",
        link : './blogs'
    },
];

export const catagory =[
    {
        id: 1,
        title: "Soft Drinks",
        icon: picon2,
        description: "Its is all about Drinks",
        img: promo2
    },
    {
        id: 2,
        title: "Sandwich",
        icon: picon5,
        description: "Its is all about Meat",
        img: promo3
    },
    {
        id: 3,
        title: "Burger",
        icon: picon4,
        description: "Its is all about Burgers",
        img: promo4
    },
    {
        id: 4,
        title: "Pizza",
        icon: picon1,
        description: "Its is all about Pizza",
        img: promo5,
    },
    {
        id: 4,
        title: "Pizza",
        icon: picon5,
        description: "Its is all about Pizza",
        img: promo1
    }
]
export const food =[
    {
        id:0,
        Name: "Burger",
        pic : burger1,
        catagory : "Burger",
        Price : 60,
        discount : 10,
        O_price: 80,
        clicked: false
    },
    {
        id:1,
        Name: "Pizza",
        pic : pizza1,
        catagory : "Pizza",
        Price : 60,
        discount : 10,
        O_price: 80,
        clicked: false
    },
    {
        id:2,
        Name: "Burger",
        pic : burger2,
        catagory : "Burger",
        Price : 50,
        discount : 20,
        O_price: 80,
        clicked: false
    },
    {
        id:3,
        Name: "Coca Cola",
        pic : drink2,
        catagory : "Drink",
        Price : 25,
        discount : 10,
        O_price: 80,
        clicked: false
    },
    {
        id:4,
        Name: "Burger",
        pic : burger5,
        catagory : "Burger",
        Price : 50,
        discount : 10,
        O_price: 80,
        clicked: false
    },
    {
        id:5,
        Name: "Sandwich",
        pic : sandwich2,
        catagory : "Sandwich",
        Price : 60,
        discount : 10,
        O_price: 80,
        clicked: false
    },
    {
        id:6,
        Name: "Burger",
        pic : burger6,
        catagory : "Burger",
        Price : 30,
        discount : 10,
        O_price: 80,
        clicked: false
    },
    {
        id:7,
        Name: "Fanta",
        pic : drink1,
        catagory : "Drink",
        Price : 60,
        discount : 10,
        O_price: 80,
        clicked: false
    },
    {
        id:8,
        Name: "Burger",
        pic : burger7,
        catagory : "Burger",
        Price : 60,
        discount : 10,
        O_price: 80,
        clicked: false
    },
    {
        id:9,
        Name: "Pepsi",
        pic : drink4,
        catagory : "Drink",
        Price : 60,
        discount : 10,
        O_price: 80,
        clicked: false
    },
    {
        id:10,
        Name: "Sprite",
        pic : drink3,
        catagory : "Drink",
        Price : 60,
        discount : 10,
        O_price: 80,
        clicked: false
    },
    {
        id:11,
        Name: "Burger",
        pic : burger4,
        catagory : "Burger",
        Price : 60,
        discount : 10,
        O_price: 80,
        clicked: false
    },
    {
        id:12,
        Name: "Pizza",
        pic : pizza2,
        catagory : "Pizza",
        Price : 60,
        discount : 10,
        O_price: 80,
        clicked: false
    },
    {
        id:13,
        Name: "Pizza",
        pic : pizza3,
        catagory : "Pizza",
        Price : 60,
        discount : 10,
        O_price: 80,
        clicked: false
    },
    {
        id:14,
        Name: "Burger",
        pic : burger3,
        catagory : "Burger",
        Price : 20,
        discount :5,
        O_price: 80,
        clicked: false
    },
    {
        id:15,
        Name: "sandwich",
        pic : sandwich1,
        catagory : "Sandwich",
        Price : 60,
        discount : 10,
        O_price: 80,
        clicked: false
    },
    
    
]

export const people = [
    {
        id: 1,
        name: 'Neha Patel',
        job: 'web developer',
        image:
            'src/assets/rishi_.n_cucual_waer_in_between_age_20_to_25_girl_as_indian_7a8a3614-bc9a-442b-877e-cfdad9e234f5.png',
        text:
            "Delicious chunks of chicken marinated in a butter masala sauce that is thick and creamy. This recipe is a genuine treat for the taste senses, with the ideal balance of butter and spices. Any fan of chicken should try it because of the succulent flesh and flavourful sauce.",
    },
    {
        id: 2,
        name: 'Disha Mehta',
        job: 'web designer',
        image:
            'src/assets/rishi_.n_casual_waer_in_between_age_20_to_25_girl_as_indian_082ebcd4-ecc0-45db-822d-27b331c3b6d1.png',
        text:
            'A traditional Indian meal that is filling and cosy is mattar paneer. A thick, creamy sauce made from tomatoes and flavoured with toasty spices and green peas cooks tender paneer cubes. Both vegans and vegetarians should try this recipe since it has the ideal balance of flavours and textures.',
    },
    {
        id: 3,
        name: 'Ishaan Malhotra',
        job: 'intern',
        image:
            'src/assets/rishi_.n_casual_waer_aesthetic_in_between_age_20_to_25_boy_53e15b34-53fd-4ca3-8102-24999432032d.png',
        text:
            'This fish curry is a gourmet joy, with a symphony of flavours in every bite. Flaky, tender fish chunks are encased in a flavourful sauce that is full of herbs and spices. This meal is a must-try for seafood lovers since it has the ideal balance of acidic, spicy, and creamy flavours.',
    },
    {
        id: 4,
        name: 'Aryan Kapoor',
        image:
            'src/assets/jodddd1020_indian_man_wearing_casual_outfit_as_an_customer_of_097e82a3-de7b-4dcc-83d1-56747acc002f.png',
        text:
            'A street food favourite, papdi chaat is a wonderful blast of flavours. A combination of sweet, spicy, and sour chutneys are poured over crispy papdis to create the ideal harmony of flavours.',
    },
    {
        id: 5,
        name: 'Sonia Verma',
        image:
            'src/assets/jodddd1020_indian_women_wearing_casual_outfit_as_an_customer_f7f0322f-7e79-4ee5-ae0a-d95a6991f8d5.png',
        text:
            'Aromatic rice, tender meat, and a blend of fragrant spices come together in a perfect harmony. Biryani is a flavorful feast, a culinary masterpiece that satisfies both the palate and the soul. Every bite is a journey through a world of spices.',
    },
    {
        id: 6,
        name: 'Subash Bose',
        image:
            'src/assets/jodddd1020_indian_man_wearing_casual_outfit_as_an_customer_of_6e4688de-18f6-49f3-8552-cad0662f6350.png',
        text:
            'Palak Paneer Kufta, a vegetarian treat, is a delicious blend of Indian and Western flavours. A creamy spinach sauce envelops soft, flavourful paneer koftas, creating a hearty and filling dish.',
    },
    {
        id: 7,
        name: 'Kabir Duhan',
        image:
            'src/assets/jodddd1020_indian_man_wearing_casual_outfit_as_an_customer_of_097e82a3-de7b-4dcc-83d1-56747acc002f.png',
        text:
            'Peri-Peri Prawns are a spicy and flavourful meal that offers a lovely combination of seafood and spice. Perfectly grilled, the prawns are marinated in a spicy, tangy Peri-Peri sauce. Those who appreciate strong flavours and a little kick should definitely try this meal.',
    },
];

export const blogcard = [
    {
        id:1,
        author : "Prity Mudoi",
        date: "12-Sep-2024",
        title: "A Deep Dive into the Abyss of Appetite",
        desc: "Every bite we take is a complex journey, a symphony of flavors, textures, and nutrients. But beneath the surface of this sensory experience lies a world of hidden truths, often masked by alluring marketing and misleading labels.",
        pic :  blog1,
        time: "5 min read"
    },
    {
        id:2,
        author : "Rijusmita Dey",
        date: "30-Sep-2024",
        title: "Unmasking the Hidden Truths Behind Every Bite",
        desc: "Every bite we take is a complex journey, a symphony of flavors, textures, and nutrients. But beneath the surface of this sensory experience lies a world of hidden truths, often masked by alluring marketing and misleading labels.",
        pic :  blog2,
        time: "15 min read"
    },
    {
        id:3,
        author : "Manish Kumar",
        date: "27-Oct-2024",
        title: "The Arcane Secrets of the Seasoned Chef",
        desc: "Have you ever wondered how a seasoned chef can transform simple ingredients into extraordinary dishes? It's not just about following a recipe; it's about understanding the nuances of flavor, texture, and presentation.",
        pic :  blog3,
        time: "5 min read"
    },
]