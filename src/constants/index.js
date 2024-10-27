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
        title: "Starter",
        //icon: picon2,
        description: "Our delectable appetizers",
        img: promo2
    },
    {
        id: 2,
        title: "Main Course",
        //icon: picon5,
        description: "Our Exquisite Main Courses",
        img: promo3
    },
    {
        id: 3,
        title: "Sides",
        //icon: picon4,
        description: "Our Exquisite Main Courses",
        img: promo4
    },
    {
        id: 4,
        title: "Desserts",
        //icon: picon1,
        description: "Indulge Your Sweet Tooth",
        img: promo5,
    },
    {
        id: 4,
        title: "Drinks",
        //icon: picon2,
        description: "Quench Your Thirst",
        img: promo1
    }
]
export const food =[
    //main course starts here?
    {
        id:0,
        Name: "Biriyani",
        pic : burger1,
        catagory : "mc",
        Price : 360,
        discount : 10,
        O_price: 400,
        clicked: false
    },
    {
        id:1,
        Name: "Paneer Butter Masala",
        pic : pizza1,
        catagory : "mc",
        Price : 260,
        discount : 10,
        O_price: 300,
        clicked: false
    },
    {
        id:2,
        Name: "Chicken 65",
        pic : burger2,
        catagory : "mc",
        Price : 300,
        discount : 20,
        O_price: 80,
        clicked: false
    },
    {
        id:3,
        Name: "Chik-Pea Tikka Masala",
        pic : drink2,
        catagory : "mc",
        Price : 198,
        discount : 10,
        O_price: 200,
        clicked: false
    },
    {
        id:4,
        Name: "Saag Paneer",
        pic : burger5,
        catagory : "mc",
        Price : 315,
        discount : 10,
        O_price: 350,
        clicked: false
    },
    {
        id:5,
        Name: "Fish Curry",
        pic : sandwich2,
        catagory : "mc",
        Price : 405,
        discount : 10,
        O_price: 450,
        clicked: false
    },
    //Main Course Item End Here
    //Starters Starts Here
    {
        id:6,
        Name: "Masala Papad",
        pic : burger7,
        catagory : "st",
        Price : 144,
        discount : 10,
        O_price: 160,
        clicked: false
    },
    {
        id:7,
        Name: "Aloo Chaat",
        pic : drink1,
        catagory : "st",
        Price : 117,
        discount : 10,
        O_price: 130,
        clicked: false
    },
    
    {
        id:8,
        Name: "Punjabi Samosa",
        pic : drink4,
        catagory : "st",
        Price : 60,
        discount : 10,
        O_price: 80,
        clicked: false
    },
    {
        id:9,
        Name: "Papdi Chaat",
        pic : drink3,
        catagory : "st",
        Price : 71,
        discount : 10,
        O_price: 79,
        clicked: false
    },
    //starters ends here

    {
        id:10,
        Name: "Jeera Rice",
        pic : burger4,
        catagory : "si",
        Price : 162,
        discount : 10,
        O_price: 180,
        clicked: false
    },
    {
        id:11,
        Name: "Naan",
        pic : pizza2,
        catagory : "si",
        Price : 27,
        discount : 10,
        O_price: 30,
        clicked: false
    },
    {
        id:12,
        Name: "Roti",
        pic : pizza3,
        catagory : "si",
        Price : 18,
        discount : 10,
        O_price: 20,
        clicked: false
    },
    {
        id:13,
        Name: "Burger",
        pic : burger3,
        catagory : "si",
        Price : 20,
        discount :5,
        O_price: 80,
        clicked: false
    },
    {
        id:14,
        Name: "sandwich",
        pic : sandwich1,
        catagory : "si",
        Price : 60,
        discount : 10,
        O_price: 80,
        clicked: false
    },
    
    
]

export const people = [
    {
        id: 1,
        name: 'Susan Smith',
        job: 'web developer',
        image:
            'https://res.cloudinary.com/diqqf3eq2/image/upload/v1586883334/person-1_rfzshl.jpg',
        text:
            "I'm baby meggings twee health goth +1. Bicycle rights tumeric chartreuse before they sold out chambray pop-up. Shaman humblebrag pickled coloring book salvia hoodie, cold-pressed four dollar toast everyday carry",
    },
    {
        id: 2,
        name: 'Anna Johnson',
        job: 'web designer',
        image:
            'https://res.cloudinary.com/diqqf3eq2/image/upload/v1586883409/person-2_np9x5l.jpg',
        text:
            'Helvetica artisan kinfolk thundercats lumbersexual blue bottle. Disrupt glossier gastropub deep v vice franzen hell of brooklyn twee enamel pin fashion axe.photo booth jean shorts artisan narwhal.',
    },
    {
        id: 3,
        name: 'Peter jones',
        job: 'intern',
        image:
            'https://res.cloudinary.com/diqqf3eq2/image/upload/v1586883417/person-3_ipa0mj.jpg',
        text:
            'Sriracha literally flexitarian . Bicycle rights tumeric chartreuse before they sold out chambray pop-up. Shaman humblebrag pickled coloring book salvia hoodie,lette post-ironic jianbing swag.humblebrag pickled coloring book salvia hoodie',
    },
    {
        id: 4,
        name: 'Bill Aderson',
        image:
            'https://res.cloudinary.com/diqqf3eq2/image/upload/v1586883423/person-4_t9nxjt.jpg',
        text:
            'Edison bulb put a bird on it humblebrag, marfa pok pok heirloom fashion axe cray stumptown venmo actually seitan. VHS farm-to-table schlitz, edison bulb pop-up 3 wolf moon tote bag street art shabby chic. ',
    },
    {
        id: 5,
        name: 'Annia Jhonie',
        image:avatar3,
        text:
            '. Bicycle rights tumeric chartreuse before they sold out chambray pop-up. Shaman humblebrag pickled coloring book salvia hoodie, schlitz, edison bulb pop-up 3 wolf moon tote bag street art shabby chic. ',
    },
    {
        id: 6,
        name: 'Jamie Clark',
        image:avatar2,
        text:
            'Edison bulb put a bird on it humblebrag, marfa pok pok heirloom fashion axe cray stumptown venmo actually seitan. VHS farm-to-table schlitz, edison bulb pop-up 3 wolf moon tote bag street art shabby chic. ',
    },
    {
        id: 7,
        name: 'Tim David',
        image:avatar1,
        text:
            'Edison bulb put a bird on it humblebrag, marfa pok pok heirloom fashion axe cray stumptown venmo actually seitan. VHS farm-to-table schlitz, edison bulb pop-up 3 wolf moon tote bag street art shabby chic. ',
    },
];

export const blogcard = [
    {
        id:1,
        author : "Abdullah Assi",
        date: "1-Sep-2023",
        title: "What Do You Think About Cheese Pizza Recipes?",
        desc: "Financial experts support or help you to to find out which way you can raise your funds",
        pic :  blog1,
        time: "5 min read"
    },
    {
        id:2,
        author : "Abdullah Assi",
        date: "1-Sep-2023",
        title: "What Do You Think About Cheese Pizza Recipes?",
        desc: "Financial experts support or help you to to find out which way you can raise your funds",
        pic :  blog2,
        time: "15 min read"
    },
    {
        id:3,
        author : "Abdullah Assi",
        date: "1-Sep-2023",
        title: "What Do You Think About Cheese Pizza Recipes?",
        desc: "Financial experts support or help you to to find out which way you can raise your funds",
        pic :  blog3,
        time: "5 min read"
    },
]