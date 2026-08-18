const products = [
  {
    id: 1,
    name: "Yellow Duck",
    price: 25000,
    category: "cute",
    image: "images/duck.jpg",
    rating: 4.9,
    sold: 1205,
    isBestSeller: true
  },
  {
    id: 2,
    name: "Summer",
    price: 30000,
    category: "nature",
    image: "images/summer.jpg",
    rating: 4.8,
    sold: 840,
    isBestSeller: true
  },
  {
    id: 3,
    name: "Avengers",
    price: 35000,
    category: "fashion",
    image: "images/avengers.jpg",
    rating: 5.0,
    sold: 2150,
    isBestSeller: true
  },
  {
    id: 4,
    name: "Animal Shaped",
    price: 25000,
    category: "animals",
    image: "images/animal.jpeg",
    rating: 4.7,
    sold: 520,
    isBestSeller: false
  },
  {
    id: 5,
    name: "Capybara",
    price: 28000,
    category: "animals",
    image: "images/capybara.jpg",
    rating: 4.6,
    sold: 340,
    isBestSeller: false
  },
  {
    id: 6,
    name: "Twinkle",
    price: 28000,
    category: "animals",
    image: "images/twinkle.jpg",
    rating: 4.8,
    sold: 950,
    isBestSeller: true
  },
  {
    id: 7,
    name: "Cartoon Cute",
    price: 35000,
    category: "cute",
    image: "images/cartoon.jpg",
    rating: 4.9,
    sold: 1540,
    isBestSeller: true
  },
  {
    id: 8,
    name: "Strawberry and Donut",
    price: 20000,
    category: "food",
    image: "images/donut.jpg",
    rating: 4.5,
    sold: 400,
    isBestSeller: false
  },
  {
    id: 9,
    name: "Flower",
    price: 20000,
    category: "fashion",
    image: "images/thapcam.jpg",
    rating: 4.5,
    sold: 400,
    isBestSeller: true
  }
];

const categories = [
  { id: "all", name: "Tất cả" },
  { id: "cute", name: "Cute" },
  { id: "nature", name: "Thiên nhiên" },
  { id: "love", name: "Tình yêu" },
  { id: "food", name: "Đồ ăn" },
  { id: "animals", name: "Động vật" },
  { id: "letters", name: "Chữ cái" },
  { id: "fashion", name: "Thời trang" }
];

const comboRules = [
  { count: 3, discountPercent: 5 },
  { count: 5, discountPercent: 15 },
  { count: 8, discountPercent: 20 },
  { count: 10, discountPercent: 25 },
];
