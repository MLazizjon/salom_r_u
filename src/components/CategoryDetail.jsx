import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import './CategoryDetail.css';

// Logo va fallback rasmlari public papkasidan olinadi
const LOGO_IMG = "/logo.png";
const PLACEHOLDER_IMG = "/image.png";

// --- MAHSULOTLAR MA'LUMOTLAR LUG'ATI ---
const products = {
  // 1. NON MAHSULOTLARI
  bread: [
    { id: "bread2", name: { uz: "Non Assarti", ru: "Хлебное Ассорти", en: "Bread Assortment" }, price: "58000", image: "/products/bread/bread2.jpg" },
    { id: "bread1", name: { uz: "Kulcha non", ru: "Лепешка", en: "Flat Bread" }, price: "6500", image: "/products/bread/bread1.jpg" },
    { id: "bread4", name: { uz: "Buxanka", ru: "Буханка", en: "Loaf" }, price: "5000", image: "/products/bread/image2.png" },
    { id: "bread3", name: { uz: "Patir non", ru: "Патыр нон", en: "Patir Bread" }, price: "8500", image: "/products/bread/image1.png" },
    { id: "bread6", name: { uz: "Qora non ", ru: "Черный хлеб", en: "Black Bread" }, price: "10000", image: "/products/bread/image3.png" },
    { id: "bread7", name: { uz: "Chap-Chak", ru: "Чапчак", en: "ChapChak bread" }, price: "7000", image: "/products/image.png" },
  ],

  // 2. SALATLAR
  salads: [
    { id: "salad1", name: { uz: "Gnezdo", ru: "Гнездо", en: "Nest salad" }, price: "47500", image: "/products/salads/salad1.jpg" },
    { id: "salad2", name: { uz: "Dilband", ru: "Дилбанд", en: "Dilband salad" }, price: "51500", image: "/products/salads/salad2.jpg" },
    { id: "salad3", name: { uz: "Tsezar salati", ru: "Цезарь", en: "Caesar salad" }, price: "52500", image: "/products/salads/image10.png" },
    { id: "salad4", name: { uz: "Go'shtli salat", ru: "Мясной", en: "Meat salad" }, price: "47500", image: "/products/salads/salad4.jpg" },
    { id: "salad5", name: { uz: "Izyuminka", ru: "Изюминка", en: "Izyuminka" }, price: "50500", image: "/products/salads/salad5.jpg" },
    { id: "salad6", name: { uz: "Shirin", ru: "Ширин", en: "Shirin" }, price: "49500", image: "/products/salads/image21.png" },
    { id: "salad7", name: { uz: "Meksika", ru: "Мексика", en: "Mexico" }, price: "61500", image: "/products/salads/image24.png" },
    { id: "salad8", name: { uz: "Saykal", ru: "Сайкал", en: "Saykal salad" }, price: "49500", image: "/products/salads/image25.png" },
    { id: "salad9", name: { uz: "Yaponskiy salat", ru: "Японский", en: "Japanese salad" }, price: "49500", image: "/products/salads/image26.png" },
    { id: "salad10", name: { uz: "Seul", ru: "Сеул", en: "Seoul salad" }, price: "47500", image: "/products/salads/image27.png" },
    { id: "salad11", name: { uz: "Roust bif", ru: "Роуст биф", en: "Roast beef" }, price: "76500", image: "/products/salads/image28.png" },
    { id: "salad12", name: { uz: "Erkaklar kaprizi", ru: "Мужской каприз", en: "Male caprice" }, price: "50500", image: "/products/salads/image30.png" },
    { id: "salad13", name: { uz: "Olivye", ru: "Оливье", en: "Olivier salad" }, price: "47000", image: "/products/salads/image29.png" },
  ],

  // 3. SABZAVOTLI SALATLAR
  "vegetable-salads": [
    { id: "veg_salad1", name: { uz: "Vinegret", ru: "Винигрет", en: "Vinaigrette" }, price: "37000", image: "/products/vegetable-salads/vegetableSalad1.jpg" },
    { id: "veg_salad2", name: { uz: "Veshenki qo'ziqorinlari", ru: "Грибы вешенки", en: "Oyster mushrooms" }, price: "32000", image: "/products/vegetable-salads/vegetableSalad2.jpg" },
    { id: "veg_salad3", name: { uz: "Vitaminli salat", ru: "Витаминный", en: "Vitamin salad" }, price: "35000", image: "/products/vegetable-salads/vegetableSalad3.jpg" },
    { id: "veg_salad4", name: { uz: "Kesilgan bodring", ru: "Огурцы Нарезка", en: "Sliced cucumbers" }, price: "13000", image: "/products/vegetable-salads/vegetableSalad4.jpg" },
    { id: "veg_salad5", name: { uz: "Kapulete", ru: "Капулете", en: "Capulete" }, price: "40000", image: "/products/vegetable-salads/vegetableSalad5.jpg" },
    { id: "veg_salad6", name: { uz: "Qovurilgan sabzavotlar", ru: "Овощи жареные", en: "Fried vegetables" }, price: "75000", image: "/products/vegetable-salads/vegetableSalad6.jpg" },
    { id: "veg_salad7", name: { uz: "Xoravac", ru: "Хоравац", en: "Khorovats" }, price: "50500", image: "/products/vegetable-salads/vegetableSalad7.jpg" },
    { id: "veg_salad8", name: { uz: "O'zbekcha salat", ru: "Узбекский", en: "Uzbek salad" }, price: "20500", image: "/products/vegetable-salads/vegetableSalad8.jpg" },
    { id: "veg_salad9", name: { uz: "Achichuk", ru: "Ачик-чучук", en: "Achichuk" }, price: "20000", image: "/products/vegetable-salads/vegetableSalad9.jpg" },
    { id: "veg_salad10", name: { uz: "Sabzavotli guldasta", ru: "Овощной букет", en: "Vegetable bouquet" }, price: "64000", image: "/products/vegetable-salads/vegetableSalad10.jpg" },
    { id: "veg_salad11", name: { uz: "Miks", ru: "Микс", en: "Mix salad" }, price: "43000", image: "/products/vegetable-salads/vegetableSalad11.jpg" },
    { id: "veg_salad12", name: { uz: "Smak", ru: "Смак", en: "Smak" }, price: "38000", image: "/products/vegetable-salads/vegetableSalad12.jpg" },
    { id: "veg_salad13", name: { uz: "Issiq baqlajon salati", ru: "Теплый Баклажан", en: "Warm eggplant salad" }, price: "69500", image: "/products/vegetable-salads/vegetableSalad13.jpg" },
    { id: "veg_salad14", name: { uz: "Ekzotika", ru: "Екзотика", en: "Exotika" }, price: "59500", image: "/products/vegetable-salads/vegetableSalad14.jpg" },
    { id: "veg_salad15", name: { uz: "Qarsillama baqlajon", ru: "Хрустящие Баклажаны", en: "Crispy eggplant" }, price: "58500", image: "/products/vegetable-salads/vegetableSalad15.jpg" },
    { id: "veg_salad16", name: { uz: "Grekcha salat", ru: "Греческий", en: "Greek salad" }, price: "52500", image: "/products/vegetable-salads/vegetableSalad16.jpg" },
  ],

  // 4. DENGIZ MAHSULOTLARI SALATLARI
  "seafood-salads": [
    { id: "seafood_1", name: { uz: "Mimoza", ru: "Мимоза", en: "Mimosa" }, price: "40000", image: "/products/seafood-salads/seafoodSalad1.jpg" },
    { id: "seafood_2", name: { uz: "Selyodka pod shuboy", ru: "Селёдка под шубой", en: "Herring under a fur coat" }, price: "40000", image: "/products/seafood-salads/seafoodSalad2.jpg" },
    { id: "seafood_3", name: { uz: "Tunezli salat", ru: "Салат с тунцом", en: "Tuna salad" }, price: "69500", image: "/products/seafood-salads/seafoodSalad3.jpg" },
    { id: "seafood_4", name: { uz: "Krevets va avokado rukola bilan", ru: "Креветки с руколой и авакадо", en: "Shrimp with arugula and avocado" }, price: "68000", image: "/products/seafood-salads/seafoodSalad4.jpg" },
    { id: "seafood_5", name: { uz: "Losos va avokadoli salat", ru: "Салат из лосося и авакадо", en: "Salmon and avocado salad" }, price: "72000", image: "/products/seafood-salads/seafoodSalad5.jpg" },
  ],

  // 5. SOʻUQ ZAKUSKALAR
  "cold-appetizers": [
    { id: "cold_1", name: { uz: "Qizil ikra (50gr)", ru: "Икра красная (50гр)", en: "Red caviar (50g)" }, price: "197000", image: "/products/cold-snacks/coldSnack1.jpg" },
    { id: "cold_2", name: { uz: "Yaxna 250gr", ru: "Яхна 250 гр", en: "Yakhna 250g" }, price: "120500", image: "/products/cold-snacks/coldSnack2.jpg" },
    { id: "cold_3", name: { uz: "Pishloq", ru: "Сыр", en: "Cheese" }, price: "29000", image: "/products/cold-snacks/coldSnack3.jpg" },
    { id: "cold_4", name: { uz: "Chakka", ru: "Чакка", en: "Chakka" }, price: "14000", image: "/products/cold-snacks/coldSnack4.jpg" },
    { id: "cold_5", name: { uz: "Go'shtli assorti 520gr", ru: "Мясное Ассорти 520гр", en: "Meat Assorted 520g" }, price: "175000", image: "/products/cold-snacks/coldSnack5.jpg" },
    { id: "cold_6", name: { uz: "Limon kesilgan", ru: "Лимон нарезка", en: "Sliced Lemon" }, price: "18400", image: "/products/cold-snacks/coldSnack6.jpg" },
    { id: "cold_7", name: { uz: "Limon ikkiga bo'lingan", ru: "Лимон-Пополам", en: "Lemon Halves" }, price: "18400", image: "/products/cold-snacks/coldSnack7.jpg" },
    { id: "cold_8", name: { uz: "Ko'katlar assortisi", ru: "Зелень ассорти", en: "Assorted Greens" }, price: "18000", image: "/products/cold-snacks/coldSnack8.jpg" },
    { id: "cold_9", name: { uz: "Mulatka", ru: "Мулатка", en: "Mulatka" }, price: "35000", image: "/products/cold-snacks/coldSnack9.jpg" },
    { id: "cold_10", name: { uz: "Brinza", ru: "Бринза", en: "Bryndza" }, price: "25000", image: "/products/cold-snacks/coldSnack10.jpg" },
    { id: "cold_11", name: { uz: "Ruscha selyodka", ru: "Сельд по Русский", en: "Russian-style herring" }, price: "55000", image: "/products/cold-snacks/coldSnack11.jpg" },
    { id: "cold_12", name: { uz: "Baliq assortisi", ru: "Рыбное ассорти", en: "Fish platter" }, price: "216500", image: "/products/cold-snacks/coldSnack12.jpg" },
    { id: "cold_13", name: { uz: "Otquloq va limon", ru: "Щавель лимон", en: "Sorrel lemon" }, price: "20000", image: "/products/cold-snacks/coldSnack13.jpg" },
    { id: "cold_14", name: { uz: "Tuzlamalar assortisi", ru: "Соленья Ассорти", en: "Assorted Pickles" }, price: "65500", image: "/products/cold-snacks/coldSnack14.jpg" },
    { id: "cold_15", name: { uz: "Pishloq/Brinza assortisi", ru: "Сыр/Брынза ассорти", en: "Cheese/Bryndza Assorted" }, price: "190000", image: "/products/cold-snacks/coldSnack15.jpg" },
  ],

  // 6. GOʻSHTLI ZAKUSKALAR
  "meat-appetizers": [
    { id: "meatSnack1", name: { uz: "Archa rulet 100 gr", ru: "Арча Ассорти", en: "Archa assarted" }, price: "40500", image: "/products/meat-snacks/meatSnack1.jpg" },
    { id: "meatSnack2", name: { uz: "Qazi 100Gr", ru: "Казы 100Гр", en: "Kazy 100Gr" }, price: "40500", image: "/products/meat-snacks/meatSnack2.jpg" },
  ],

  // 7. ISSIQ SHOʻRBALAR
  "hot-soups": [
    { id: "hotSoup1", name: { uz: "Bulyon", ru: "Бульон по восточному", en: "Eastern broth" }, price: "29000", image: "/products/hot-soups/hotSoup1.jpg" },
    { id: "hotSoup2", name: { uz: "Qoziqorin Krem", ru: "Грибной Крем-Суп", en: "Cream of Mushroom Soup" }, price: "34000", image: "/products/hot-soups/hotSoup2.jpg" },
    { id: "hotSoup3", name: { uz: "Chechevichniy SHurva", ru: "Чечевичный суп", en: "Lentil soup" }, price: "32000", image: "/products/hot-soups/hotSoup3.jpg" },
    { id: "hotSoup4", name: { uz: "Tushenka", ru: "Тушёнка", en: "Stew" }, price: "40000", image: "/products/hot-soups/hotSoup4.jpg" },
    { id: "hotSoup5", name: { uz: "Shi", ru: "Щи зеленые", en: "Sorrel Soup" }, price: "32000", image: "/products/hot-soups/hotSoup5.jpg" },
    { id: "hotSoup6", name: { uz: "Pishloq Shorva", ru: "Сырный суп", en: "Cheese Soup" }, price: "37000", image: "/products/hot-soups/hotSoup6.jpg" },
    { id: "hotSoup7", name: { uz: "Mastava", ru: "Мастава", en: "Mastava-Soup" }, price: "32000", image: "/products/hot-soups/hotSoup7.jpg" },
    { id: "hotSoup8", name: { uz: "Borsh", ru: "Борщ", en: "Borsh-soup" }, price: "32000", image: "/products/hot-soups/hotSoup8.jpg" },
    { id: "hotSoup9", name: { uz: "Tovuq Shorva", ru: "Куриный суп", en: "Chicken-soup" }, price: "26500", image: "/products/hot-soups/hotSoup9.jpg" },
    { id: "hotSoup10", name: { uz: "Kuzacha Shorva", ru: "Кузача-Суп", en: "Kuzacha-soup" }, price: "42500", image: "/products/hot-soups/hotSoup10.jpg" },
  ],

  // 8. IKKINCHI TAOMLAR
  "main-dishes": [
    { id: "mainCourse1", name: { uz: "Grilda koreyka", ru: "Корейка на гриле", en: "Grilled rack of lamb" }, price: "100000", image: "/products/main-courses/mainCourse1.jpg" },
    { id: "mainCourse2", name: { uz: "Assado", ru: "Assado", en: "Assado" }, price: "319000", image: "/products/main-courses/mainCourse2.jpg" },
    { id: "mainCourse3", name: { uz: "Lag'mon", ru: "Лагман", en: "Lagman" }, price: "64000", image: "/products/main-courses/mainCourse3.jpg" },
    { id: "mainCourse4", name: { uz: "Jiz-biz (lahm)", ru: "Жиз-быз (вырезки)", en: "Jiz-biz (tenderloin)" }, price: "394000", image: "/products/main-courses/mainCourse4.jpg" },
    { id: "mainCourse5", name: { uz: "Shirin TABAKA kg", ru: "Ширин ТАБАКА кг", en: "Shirin TABAKA kg" }, price: "122000", image: "/products/main-courses/mainCourse5.jpg" },
    { id: "mainCourse6", name: { uz: "Fransuzcha go'sht", ru: "Мясо по Французски", en: "French style meat" }, price: "103000", image: "/products/main-courses/mainCourse6.jpg" },
    { id: "mainCourse7", name: { uz: "Go'sht Shirin", ru: 'Мясо. "Ширин"', en: "Meat Shirin" }, price: "319000", image: "/products/main-courses/mainCourse7.jpg" },
    { id: "mainCourse8", name: { uz: "Dolma 1 dona", ru: "Долма 1 шт", en: "Dolma 1 pc" }, price: "9000", image: "/products/main-courses/mainCourse8.jpg" },
    { id: "mainCourse9", name: { uz: "Jiz-biz (qo'y go'shti)", ru: "Жиз-быз (из баранины)", en: "Jiz-biz (lamb)" }, price: "324800", image: "/products/main-courses/mainCourse9.jpg" },
    { id: "mainCourse10", name: { uz: "Shirin Jiz-biz (Assorti)", ru: "Shirin Жиз-быз (Ассорти)", en: "Shirin Jiz-biz (Assorted)" }, price: "690000", image: "/products/main-courses/mainCourse10.jpg" },
    { id: "mainCourse11", name: { uz: "Xil-xil go'sht shou", ru: "Хил Хил Мясное Шоу", en: "Tender Meat Show" }, price: "320000", image: "/products/main-courses/mainCourse11.jpg" },
    { id: "mainCourse12", name: { uz: "Flotcha makaron", ru: "Макароны по флотски", en: "Navy style pasta" }, price: "65500", image: "/products/main-courses/mainCourse12.jpg" },
    { id: "mainCourse13", name: { uz: "Dimlangan qovurg'a", ru: "Ребро Тушенное", en: "Braised rib" }, price: "330000", image: "/products/main-courses/mainCourse13.jpg" },
    { id: "mainCourse14", name: { uz: "Soch kabob", ru: "Соч Кабоб", en: "Soch kebab" }, price: "98000", image: "/products/main-courses/mainCourse14.jpg" },
    { id: "mainCourse15", name: { uz: "Alfredo", ru: "Альфредо", en: "Alfredo" }, price: "76000", image: "/products/main-courses/mainCourse15.jpg" },
    { id: "mainCourse16", name: { uz: "Dolma porsiya", ru: "Долма порция", en: "Dolma portion" }, price: "54000", image: "/products/main-courses/mainCourse16.jpg" },
    { id: "mainCourse17", name: { uz: "Lula-kebab", ru: "Люля-кебаб", en: "Lula kebab" }, price: "87000", image: "/products/main-courses/mainCourse17.jpg" },
    { id: "mainCourse18", name: { uz: "Tovuqli set Shirin", ru: "Куриный сет Ширин", en: "Chicken set Shirin" }, price: "342000", image: "/products/main-courses/mainCourse18.jpg" },
    { id: "mainCourse19", name: { uz: "Jiz-biz KOREYKA", ru: "Жиз Быз КОРЕЙКА", en: "Jiz-biz Rack of lamb" }, price: "345000", image: "/products/main-courses/mainCourse19.jpg" },
  ],

  // 9. ISSIQ ZAKUSKALAR (HOT APPETIZERS)
  "hot-appetizers": [
    { id: "hotSnack1", name: { uz: "Barak Qovurilgan 1ta", ru: "Барак жаренный шт", en: "Fried Barak 1piece" }, price: "14000", image: "/products/hot-snacks/hotSnack1.jpg" },
    { id: "hotSnack2", name: { uz: "Bichak 1ta", ru: "Бичак, шт", en: "Bichak 1piece" }, price: "8000", image: "/products/hot-snacks/hotSnack2.jpg" },
    { id: "hotSnack3", name: { uz: "Somsa (buyurtma) 1ta", ru: "Самса(заказ) шт", en: "Samsa (order) 1piece" }, price: "9500", image: "/products/hot-snacks/hotSnack3.jpg" },
    { id: "hotSnack4", name: { uz: "Til Kavkazcha", ru: "Язык по кавказски", en: "Caucasian style tongue" }, price: "68500", image: "/products/hot-snacks/hotSnack4.jpg" },
    { id: "hotSnack5", name: { uz: "Lavash ichimlik bilan / masalliqli", ru: "Лаваш с Начинкой", en: "Stuffed Lavash" }, price: "52000", image: "/products/hot-snacks/hotSnack5.jpg" },
    { id: "hotSnack6", name: { uz: "Blinchik 1ta", ru: "Блинчик, шт", en: "Pancake 1piece" }, price: "16000", image: "/products/hot-snacks/hotSnack6.jpg" },
    { id: "hotSnack7", name: { uz: "Qovurilgan baliq (G'ijduvoncha)", ru: "Жареная рыба (по гиждувански)", en: "Fried fish (Gijduvan style)" }, price: "102000", image: "/products/hot-snacks/hotSnack7.jpg" },
  ],

  // 10. SOʻUQ SHOʻRBALAR
  "cold-soups": [
    { id: "coldSoup1", name: { uz: "Okroshka", ru: "Окрошка", en: "Okroshka" }, price: "28000", image: "/products/cold-soups/coldSoup1.jpg" },
    { id: "coldSoup2", name: { uz: "Kuksi", ru: "Кукси", en: "Kuksi" }, price: "35000", image: "/products/cold-soups/coldSoup2.jpg" },
    { id: "coldSoup3", name: { uz: "Gazpacho", ru: "Гаспачо", en: "Gazpacho" }, price: "32000", image: "/products/cold-soups/coldSoup3.jpg" },
  ],

  // 11. GARNIRLAR
  "side-dishes": [
    { id: "garnish1", name: { uz: "Chips", ru: "Чипсы", en: "Chips" }, price: "22000", image: "/products/garnishes/garnish1.jpg" },
    { id: "garnish2", name: { uz: "Qishloqcha kartoshka", ru: "Картофель по-деревенски", en: "Wedge fries" }, price: "23500", image: "/products/garnishes/garnish2.jpg" },
    { id: "garnish3", name: { uz: "Fri", ru: "Фри", en: "French fries" }, price: "25000", image: "/products/garnishes/garnish3.jpg" },
  ],
  garnishes: [
    { id: "garnish1", name: { uz: "Kartoshka fri", ru: "Картофель фри", en: "French fries" }, price: "22000", image: "/products/garnishes/garnish1.jpg" },
    { id: "garnish2", name: { uz: "Kartoshka pyure", ru: "Картофельное пюре", en: "Mashed potatoes" }, price: "18000", image: "/products/garnishes/garnish2.jpg" },
    { id: "garnish3", name: { uz: "Guruch", ru: "Рис", en: "Rice" }, price: "15000", image: "/products/garnishes/garnish3.jpg" },
  ],

  // 12. TOVUQ TAOMLARI
  chicken: [
    { id: "chicken1", name: { uz: "Tabaka", ru: "Табака", en: "Tabaka chicken" }, price: "65000", image: "/products/chicken/chicken1.jpg" },
    { id: "chicken2", name: { uz: "Qovurilgan tovuq", ru: "Жареная курица", en: "Fried chicken" }, price: "60000", image: "/products/chicken/chicken2.jpg" },
    { id: "chicken3", name: { uz: "Tovuq qanotchalari", ru: "Куриные крылышки", en: "Chicken wings" }, price: "45000", image: "/products/chicken/chicken3.jpg" },
    { id: "chicken4", name: { uz: "Tovuq naggets", ru: "Куриные наггетсы", en: "Chicken nuggets" }, price: "35000", image: "/products/chicken/chicken4.jpg" },
  ],

  // 13. ISSIQ ZAKUSKALAR (HOT SNACKS)
  "hot-snacks": [
    { id: "hotSnack1", name: { uz: "Juliyen", ru: "Жюльен", en: "Julienne" }, price: "38000", image: "/products/hot-snacks/hotSnack1.jpg" },
    { id: "hotSnack2", name: { uz: "Pishloqli tayoqchalar", ru: "Сырные палочки", en: "Cheese sticks" }, price: "32000", image: "/products/hot-snacks/hotSnack2.jpg" },
    { id: "hotSnack3", name: { uz: "Qovurilgan pishloq", ru: "Жареный сыр", en: "Fried cheese" }, price: "35000", image: "/products/hot-snacks/hotSnack3.jpg" },
    { id: "hotSnack4", name: { uz: "Qo'ziqorin juliyen", ru: "Грибной жюльен", en: "Mushroom julienne" }, price: "36000", image: "/products/hot-snacks/hotSnack4.jpg" },
    { id: "hotSnack5", name: { uz: "Sarmsiqli suxariki", ru: "Чесночные сухарики", en: "Garlic croutons" }, price: "18000", image: "/products/hot-snacks/hotSnack5.jpg" },
    { id: "hotSnack6", name: { uz: "Qovurilgan krevetka", ru: "Жареные креветки", en: "Fried shrimp" }, price: "75000", image: "/products/hot-snacks/hotSnack6.jpg" },
    { id: "hotSnack7", name: { uz: "Kalamar halqalari", ru: "Кольца кальмара", en: "Squid rings" }, price: "48000", image: "/products/hot-snacks/hotSnack7.jpg" },
  ],

  // 14. SHASHLIKLAR
  shashlik: [
    { id: "shashlik1", name: { uz: "Qiyma shashlik", ru: "Люля-кебаб", en: "Minced meat kebab" }, price: "18000", image: "/products/shashlik/shashlik1.jpg" },
    { id: "shashlik2", name: { uz: "Tovuq shashlik", ru: "Шашлык из курицы", en: "Chicken kebab" }, price: "17000", image: "/products/shashlik/shashlik2.jpg" },
    { id: "shashlik3", name: { uz: "Qo'y go'shti shashlik", ru: "Шашлык из баранины", en: "Lamb kebab" }, price: "22000", image: "/products/shashlik/shashlik3.jpg" },
    { id: "shashlik4", name: { uz: "Jigar shashlik", ru: "Шашлык из печени", en: "Liver kebab" }, price: "16000", image: "/products/shashlik/shashlik4.jpg" },
    { id: "shashlik6", name: { uz: "Sabzavotli shashlik", ru: "Шашлык из овощей", en: "Vegetable kebab" }, price: "14000", image: "/products/shashlik/shashlik6.jpg" },
    { id: "shashlik7", name: { uz: "Qovurg'a shashlik", ru: "Шашлык из ребрышек", en: "Rib kebab" }, price: "24000", image: "/products/shashlik/shashlik7.jpg" },
    { id: "shashlik8", name: { uz: "Qazi shashlik", ru: "Шашлык из казы", en: "Kazy kebab" }, price: "26000", image: "/products/shashlik/shashlik8.jpg" },
    { id: "shashlik9", name: { uz: "Rulet shashlik", ru: "Шашлык рулет", en: "Roll kebab" }, price: "23000", image: "/products/shashlik/shashlik9.png" },
  ],

  // 15. ICHIMLIKLAR
  drinks: [
    { id: "drink1", name: { uz: "Coca-Cola 1.5L", ru: "Кока-Кола 1.5л", en: "Coca-Cola 1.5L" }, price: "18000", image: "/products/drinks/drink1.jpg" },
    { id: "drink2", name: { uz: "Fanta 1.5L", ru: "Фанта 1.5л", en: "Fanta 1.5L" }, price: "18000", image: "/products/drinks/drink2.jpg" },
    { id: "drink3", name: { uz: "Sprite 1.5L", ru: "Спрайт 1.5л", en: "Sprite 1.5L" }, price: "18000", image: "/products/drinks/drink3.jpg" },
    { id: "drink4", name: { uz: "Meva sharbati 1L", ru: "Сок 1л", en: "Fruit juice 1L" }, price: "22000", image: "/products/drinks/drink4.jpg" },
    { id: "drink5", name: { uz: "Mineral suv 0.5L", ru: "Минеральная вода 0.5л", en: "Mineral water 0.5L" }, price: "5000", image: "/products/drinks/drink5.jpg" },
    { id: "drink6", name: { uz: "Gazsiz suv 0.5L", ru: "Вода без газа 0.5л", en: "Still water 0.5L" }, price: "4000", image: "/products/drinks/drink6.jpg" },
    { id: "drink7", name: { uz: "Kompoti", ru: "Компот", en: "Compote" }, price: "15000", image: "/products/drinks/drink7.jpg" },
    { id: "drink8", name: { uz: "Limonad", ru: "Лимонад", en: "Lemonade" }, price: "20000", image: "/products/drinks/drink8.jpg" },
    { id: "drink9", name: { uz: "Muzli choy", ru: "Холодный чай", en: "Ice tea" }, price: "16000", image: "/products/drinks/drink9.jpg" },
    { id: "drink10", name: { uz: "Qora choy", ru: "Черный чай", en: "Black tea" }, price: "5000", image: "/products/drinks/drink10.jpg" },
    { id: "drink11", name: { uz: "Ko'k choy", ru: "Зеленый чай", en: "Green tea" }, price: "5000", image: "/products/drinks/drink11.jpg" },
    { id: "drink12", name: { uz: "Limonli choy", ru: "Чай с лимоном", en: "Tea with lemon" }, price: "8000", image: "/products/drinks/drink12.jpg" },
    { id: "drink13", name: { uz: "Kofe Amerika", ru: "Кофе Американо", en: "Americano Coffee" }, price: "15000", image: "/products/drinks/drink13.jpg" },
    { id: "drink14", name: { uz: "Kapuchino", ru: "Капучино", en: "Cappuccino" }, price: "18000", image: "/products/drinks/drink14.jpg" },
    { id: "drink15", name: { uz: "Latte", ru: "Латте", en: "Latte" }, price: "20000", image: "/products/drinks/drink15.jpg" },
  ],

  // 16. PIVO
  beer: [
    { id: "beer1", name: { uz: "Pivo Quvasz 0.5L", ru: "Пиво Квас 0.5л", en: "Beer Kvas 0.5L" }, price: "25000", image: "/products/beer/beer1.jpg" },
    { id: "beer2", name: { uz: "Pivo Tuborg 0.5L", ru: "Пиво Tuborg 0.5л", en: "Tuborg Beer 0.5L" }, price: "28000", image: "/products/beer/beer2.jpg" },
  ],

  // 17. AROQ VA SPIRTLI ICHIMLIKLAR
  vodka: [
    { id: "vodka1", name: { uz: "Aroq 0.5L", ru: "Водка 0.5л", en: "Vodka 0.5L" }, price: "80000", image: "/products/vodka/vodka1.jpg" },
    { id: "vodka2", name: { uz: "Aroq Premium 0.5L", ru: "Водка Премиум 0.5л", en: "Premium Vodka 0.5L" }, price: "120000", image: "/products/vodka/vodka2.jpg" },
    { id: "vodka3", name: { uz: "Aroq Gold 0.7L", ru: "Водка Голд 0.7л", en: "Gold Vodka 0.7L" }, price: "160000", image: "/products/vodka/vodka3.jpg" },
    { id: "vodka4", name: { uz: "Aroq Silver 0.5L", ru: "Водка Сильвер 0.5л", en: "Silver Vodka 0.5L" }, price: "95000", image: "/products/vodka/vodka4.jpg" },
    { id: "vodka5", name: { uz: "Aroq Classic 0.5L", ru: "Водка Классик 0.5л", en: "Classic Vodka 0.5L" }, price: "85000", image: "/products/vodka/vodka5.jpg" },
    { id: "vodka7", name: { uz: "Aroq Export 0.75L", ru: "Водка Экспорт 0.75л", en: "Export Vodka 0.75L" }, price: "180000", image: "/products/vodka/vodka7.jpg" },
    { id: "vodka15", name: { uz: "Aroq Elite 1L", ru: "Водка Элит 1л", en: "Elite Vodka 1L" }, price: "250000", image: "/products/vodka/vodka15.jpg" },
  ],

  // 18. VINO
  wine: [
    { id: "wine1", name: { uz: "Qizil vino", ru: "Красное вино", en: "Red wine" }, price: "110000", image: "/products/wine/wine1.jpg" },
    { id: "wine2", name: { uz: "Oq vino", ru: "Белое вино", en: "White wine" }, price: "110000", image: "/products/wine/wine2.jpg" },
    { id: "wine3", name: { uz: "Shampan vinosi", ru: "Шампанское", en: "Champagne" }, price: "130000", image: "/products/wine/wine3.jpg" },
    { id: "wine4", name: { uz: "Quruq vino", ru: "Сухое вино", en: "Dry wine" }, price: "125000", image: "/products/wine/wine4.jpg" },
  ],

  // 19. KONYAK
  cognac: [
    { id: "cognac1", name: { uz: "Konyak 3 yillik", ru: "Коньяк 3 года", en: "Cognac 3 years" }, price: "140000", image: "/products/cognac/cognac1.jpg" },
    { id: "cognac2", name: { uz: "Konyak 5 yillik", ru: "Коньяк 5 лет", en: "Cognac 5 years" }, price: "180000", image: "/products/cognac/cognac2.jpg" },
    { id: "cognac3", name: { uz: "Konyak Premium", ru: "Коньяк Премиум", en: "Premium Cognac" }, price: "240000", image: "/products/cognac/cognac3.jpg" },
    { id: "cognac4", name: { uz: "Konyak VSOP", ru: "Коньяк VSOP", en: "Cognac VSOP" }, price: "320000", image: "/products/cognac/cognac4.jpg" },
    { id: "cognac5", name: { uz: "Konyak XO", ru: "Коньяк XO", en: "Cognac XO" }, price: "450000", image: "/products/cognac/cognac5.jpg" },
  ],

  // 20. MOHITO / KOKTEYLLAR
  mojito: [
    { id: "mojito1", name: { uz: "Klassik Mohito", ru: "Мохито Классический", en: "Classic Mojito" }, price: "32000", image: "/products/mojito/mojito1.jpg" },
    { id: "mojito2", name: { uz: "Qulupnayli Mohito", ru: "Мохито Клубничный", en: "Strawberry Mojito" }, price: "35000", image: "/products/mojito/mojito2.jpg" },
    { id: "mojito4", name: { uz: "Malinali Mohito", ru: "Мохито Малиновый", en: "Raspberry Mojito" }, price: "35000", image: "/products/mojito/mojito4.jpg" },
    { id: "mojito5", name: { uz: "Alkogolsiz Mohito", ru: "Мохито Безалкогольный", en: "Non-alcoholic Mojito" }, price: "30000", image: "/products/mojito/mojito5.jpg" },
    { id: "mojito7", name: { uz: "Tropik Mohito", ru: "Мохито Тропический", en: "Tropical Mojito" }, price: "38000", image: "/products/mojito/mojito7.jpg" },
  ],

  // 21. SHIRINLIKLAR
  desserts: [
    { id: "dessert1", name: { uz: "Tiramisu", ru: "Тирамису", en: "Tiramisu" }, price: "35000", image: "/products/desserts/dessert1.jpg" },
    { id: "dessert2", name: { uz: "Chizkeyk", ru: "Чизкейк", en: "Cheesecake" }, price: "38000", image: "/products/desserts/dessert2.jpg" },
    { id: "dessert3", name: { uz: "Shokoladli tort", ru: "Шоколадный торт", en: "Chocolate cake" }, price: "32000", image: "/products/desserts/dessert3.jpg" },
    { id: "dessert4", name: { uz: "Muzqaymoq assorti", ru: "Мороженое ассорти", en: "Ice cream platter" }, price: "25000", image: "/products/desserts/dessert4.jpg" },
    { id: "dessert5", name: { uz: "Meva assortisi", ru: "Фруктовое ассорти", en: "Fruit platter" }, price: "85000", image: "/products/desserts/dessert5.jpg" },
  ],
};

const UI_TEXT = {
  backBtn: { uz: 'Ortga', ru: 'Назад', en: 'Back' },
  itemsCount: { uz: 'ta pozitsiya', ru: 'позиций', en: 'items' },
  currency: { uz: 'soʻm', ru: 'сум', en: 'UZS' },
  closeBtn: { uz: 'Yopish', ru: 'Закрыть', en: 'Close' },
};

export default function CategoryDetail({
  category,
  currentLang = 'ru',
  onBack,
  onChangeLang,
}) {
  const [productsList, setProductsList] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isLeaving, setIsLeaving] = useState(false);

  // Modal ochiqligida scroll bloklash
  useEffect(() => {
    document.body.style.overflow = selectedProduct ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [selectedProduct]);

  // Kategoriya o'zgarganda tegishli ro'yxatni yuklash
  useEffect(() => {
    if (!category) {
      setProductsList([]);
      return;
    }

    const categoryKey = category.slug || category.id;
    const foundProducts = products[categoryKey] || [];
    setProductsList(foundProducts);
  }, [category]);

  const handleBackClick = () => {
    if (isLeaving) return;
    setIsLeaving(true);
    setTimeout(() => {
      onBack && onBack();
      setTimeout(() => {
        setIsLeaving(false);
      }, 50);
    }, 450);
  };

  const getCategoryName = (cat) => {
    if (!cat) return '';
    return cat[`name_${currentLang}`] || cat.name?.[currentLang] || cat.name_ru || cat.name?.ru || '';
  };

  const getProductName = (item) => {
    if (!item || !item.name) return '';
    return typeof item.name === 'object' ? item.name[currentLang] || item.name.ru || '' : item.name;
  };

  const getProductDescription = (item) => {
    if (!item) return '';
    const desc = item.description || item.desc;
    if (!desc) {
      return currentLang === 'uz' ? 'Tavsif mavjud emas.' : currentLang === 'ru' ? 'Описание отсутствует.' : 'No description available.';
    }
    return typeof desc === 'object' ? desc[currentLang] || desc.ru || '' : desc;
  };

  const modalContent = selectedProduct && (
    <div className="product-modal-overlay" onClick={() => setSelectedProduct(null)}>
      <div className="product-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={() => setSelectedProduct(null)}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <div className="modal-img-wrapper">
          <img
            src={selectedProduct.image || PLACEHOLDER_IMG}
            alt={getProductName(selectedProduct)}
            className="modal-img"
            onError={(e) => { e.target.src = PLACEHOLDER_IMG; }}
          />
        </div>

        <div className="modal-info-wrapper">
          <h2 className="modal-product-name">{getProductName(selectedProduct)}</h2>
          <p className="modal-product-desc">{getProductDescription(selectedProduct)}</p>

          <div className="modal-footer-row">
            <div className="modal-product-price">
              {selectedProduct.price} <span>{UI_TEXT.currency[currentLang]}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="category-detail-wrapper fade-in">
      <header className="category-header">
        <button
          type="button"
          className={`menu-btn ${isLeaving ? 'leaving' : ''}`}
          onClick={handleBackClick}
        >
          <span className="menu-btn-circle">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18L9 12L15 6" />
            </svg>
          </span>
          <span className="menu-btn-text">{UI_TEXT.backBtn[currentLang]}</span>
        </button>

        <div className="category-header-logo">
          <img src={LOGO_IMG} alt="Shirin Tabaka" onError={(e) => { e.target.style.display = 'none'; }} />
        </div>

        <div className="lang-select-container">
          <button
            type="button"
            className="category-lang-btn"
            onClick={() => {
              sessionStorage.setItem('categoryScrollPosition', window.scrollY);
              sessionStorage.setItem('returnPage', 'category');
              if (onChangeLang) onChangeLang();
            }}
          >
            <span className="lang-code">{currentLang.toUpperCase()}</span>
            <svg className="chevron-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>
        </div>
      </header>

      <main className="category-main-content">
        <div className="category-banner-card">
          <div className="banner-info">
            <div className="banner-title-row">
              <img
                src={category?.image_url || category?.image || PLACEHOLDER_IMG}
                alt={getCategoryName(category)}
                className="banner-mini-thumb"
                onError={(e) => { e.target.src = PLACEHOLDER_IMG; }}
              />
              <div>
                <h1 className="banner-title">{getCategoryName(category)}</h1>
                <span className="banner-count">
                  {productsList.length} {UI_TEXT.itemsCount[currentLang]}
                </span>
              </div>
            </div>
            <p className="banner-desc">
              {currentLang === 'uz' && 'Tanlangan masalliqlardan tayyorlangan sarxill taomlar.'}
              {currentLang === 'ru' && 'Свежие блюда, приготовленные из отборных ингредиентов.'}
              {currentLang === 'en' && 'Fresh dishes made from selected high-quality ingredients.'}
            </p>
          </div>

          <div className="banner-bg-image">
            <img 
              src={category?.image_url || category?.image || PLACEHOLDER_IMG} 
              alt="" 
              onError={(e) => { e.target.src = PLACEHOLDER_IMG; }}
            />
          </div>
        </div>

        {productsList.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#666', fontSize: '18px', marginTop: '40px' }}>
            Bu kategoriyada hozircha mahsulotlar yo'q.
          </p>
        ) : (
          <div className="products-grid">
            {productsList.map((item) => (
              <div
                key={item.id}
                className="product-card"
                onClick={() => setSelectedProduct(item)}
              >
                <div className="product-img-wrapper">
                  <img
                    src={item.image || PLACEHOLDER_IMG}
                    alt={getProductName(item)}
                    className="product-img"
                    onError={(e) => { e.target.src = PLACEHOLDER_IMG; }}
                  />
                </div>
                <div className="product-details">
                  <h3 className="product-name">{getProductName(item)}</h3>
                  <div className="product-price">
                    {item.price}
                    <span> {UI_TEXT.currency[currentLang]}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {selectedProduct && createPortal(modalContent, document.body)}
    </div>
  );
}