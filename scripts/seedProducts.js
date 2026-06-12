import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBX2mwt745vMgJzF7bpO9_e9AV6zQfhI5w",
  authDomain: "controle-estoque-v2.firebaseapp.com",
  projectId: "controle-estoque-v2",
  storageBucket: "controle-estoque-v2.firebasestorage.app",
  messagingSenderId: "882112759422",
  appId: "1:882112759422:web:939d80c7f5e39c6a21ba2f",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function randomImageByCategory(category, i) {
  const map = {
    Informática: "computer",
    Eletrônicos: "electronics",
    Escritório: "office",
    Móveis: "furniture",
    Games: "gaming",
  };

  return `https://picsum.photos/400/400?random=${i}`;
}

const categories = [
  "Informática",
  "Eletrônicos",
  "Escritório",
  "Móveis",
  "Games",
];

function randomCategory() {
  return categories[Math.floor(Math.random() * categories.length)];
}

function randomPrice() {
  return Math.floor(Math.random() * 5000) + 50;
}

function randomQty() {
  return Math.floor(Math.random() * 120);
}

function randomName(category) {
  const names = {
    Informática: ["Notebook", "Mouse", "Teclado", "Monitor", "SSD"],
    Eletrônicos: ["Smartphone", "Fone", "TV", "Caixa de som"],
    Escritório: ["Cadeira", "Mesa", "Luminária", "Papel"],
    Móveis: ["Sofá", "Guarda-roupa", "Estante", "Cama"],
    Games: ["Console", "Controle", "Headset", "Jogo"],
  };

  const list = names[category];
  return list[Math.floor(Math.random() * list.length)];
}

async function seed() {
  const productsRef = collection(db, "products");

  for (let i = 1; i <= 100; i++) {
    const category = randomCategory();
    const name = randomName(category);

    await addDoc(productsRef, {
      name: `${name} ${i}`,
      code: `COD-${i}`,
      category,
      customCategory: "",
      description: `Produto ${name} de alta qualidade`,
      price: randomPrice(),
      quantity: randomQty(),
      image: randomImageByCategory(category, i),
      createdAt: new Date().toLocaleDateString("pt-BR"),
    });

    console.log(`Produto ${i} criado`);
  }

  console.log("✅ Finalizado: 100 produtos criados");
}

seed();
