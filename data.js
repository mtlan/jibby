const products = [
  {
    id: 1,
    name: "Pastel Gummy Bear",
    price: 25000,
    category: "cute",
    image: "file:///C:/Users/Dell/.gemini/antigravity-ide/brain/524ab2bf-f9d1-47ce-b1ab-0f22420a5520/charm_bear_1786621809686.jpg",
    rating: 4.9,
    sold: 1205,
    isBestSeller: true
  },
  {
    id: 2,
    name: "Daisy Flower",
    price: 30000,
    category: "nature",
    image: "file:///C:/Users/Dell/.gemini/antigravity-ide/brain/524ab2bf-f9d1-47ce-b1ab-0f22420a5520/charm_flower_1786621821797.jpg",
    rating: 4.8,
    sold: 840,
    isBestSeller: true
  },
  {
    id: 3,
    name: "Metallic Red Heart",
    price: 35000,
    category: "love",
    image: "file:///C:/Users/Dell/.gemini/antigravity-ide/brain/524ab2bf-f9d1-47ce-b1ab-0f22420a5520/charm_heart_1786621879043.jpg",
    rating: 5.0,
    sold: 2150,
    isBestSeller: true
  },
  {
    id: 4,
    name: "Pink Ribbon",
    price: 25000,
    category: "fashion",
    image: "https://images.unsplash.com/photo-1618641986557-1de223cb2f4f?auto=format&fit=crop&w=400&q=80",
    rating: 4.7,
    sold: 520,
    isBestSeller: false
  },
  {
    id: 5,
    name: "Strawberry",
    price: 28000,
    category: "food",
    image: "https://images.unsplash.com/photo-1518131672697-613becd4fab5?auto=format&fit=crop&w=400&q=80", 
    rating: 4.6,
    sold: 340,
    isBestSeller: false
  },
  {
    id: 6,
    name: "Avocado",
    price: 28000,
    category: "food",
    image: "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=400&q=80", 
    rating: 4.8,
    sold: 950,
    isBestSeller: true
  },
  {
    id: 7,
    name: "Cool Doge",
    price: 35000,
    category: "animals",
    image: "https://images.unsplash.com/photo-1543852786-1cf6624b9987?auto=format&fit=crop&w=400&q=80",
    rating: 4.9,
    sold: 1540,
    isBestSeller: true
  },
  {
    id: 8,
    name: "Letter A",
    price: 20000,
    category: "letters",
    image: "https://images.unsplash.com/photo-1614850715649-1d0106293cb1?auto=format&fit=crop&w=400&q=80",
    rating: 4.5,
    sold: 400,
    isBestSeller: false
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
