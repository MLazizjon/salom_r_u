import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import './CategoryDetail.css';

// Logo va Bayroqlar importi
import logoImg from '../assets/images/logo.png';
import uzFlag from '../assets/images/flags/uz.png';
import ruFlag from '../assets/images/flags/ru.png';
import enFlag from '../assets/images/flags/en.png';

// --- RASMLAR IMPORTI ---
import breadImg1 from "../assets/products/bread/bread1.jpg";
import breadImg2 from "../assets/products/bread/bread2.jpg";
import breadImg3 from "../assets/products/bread/bread3.jpg";
import breadImg4 from "../assets/products/bread/bread4.jpg";
import breadImg6 from "../assets/products/bread/bread6.jpg";

import saladImg1 from "../assets/products/salads/salad1.jpg";
import saladImg2 from "../assets/products/salads/salad2.jpg";
import saladImg4 from "../assets/products/salads/salad4.jpg";
import saladImg5 from "../assets/products/salads/salad5.jpg";
import saladImg20 from "../assets/products/salads/image10.png";
import saladImg21 from "../assets/products/salads/image21.png";
import saladImg24 from "../assets/products/salads/image24.png";
import saladImg25 from "../assets/products/salads/image25.png";
import saladImg26 from "../assets/products/salads/image26.png";
import saladImg27 from "../assets/products/salads/image27.png";
import saladImg28 from "../assets/products/salads/image28.png";
import saladImg29 from "../assets/products/salads/image29.png";
import saladImg30 from "../assets/products/salads/image30.png";

import vegetableSaladImg1 from "../assets/products/vegetable-salads/vegetableSalad1.jpg";
import vegetableSaladImg2 from "../assets/products/vegetable-salads/vegetableSalad2.jpg";
import vegetableSaladImg3 from "../assets/products/vegetable-salads/vegetableSalad3.jpg";
import vegetableSaladImg4 from "../assets/products/vegetable-salads/vegetableSalad4.jpg";
import vegetableSaladImg5 from "../assets/products/vegetable-salads/vegetableSalad5.jpg";
import vegetableSaladImg6 from "../assets/products/vegetable-salads/vegetableSalad6.jpg";
import vegetableSaladImg7 from "../assets/products/vegetable-salads/vegetableSalad7.jpg";
import vegetableSaladImg8 from "../assets/products/vegetable-salads/vegetableSalad8.jpg";
import vegetableSaladImg9 from "../assets/products/vegetable-salads/vegetableSalad9.jpg";
import vegetableSaladImg10 from "../assets/products/vegetable-salads/vegetableSalad10.jpg";
import vegetableSaladImg11 from "../assets/products/vegetable-salads/vegetableSalad11.jpg";
import vegetableSaladImg12 from "../assets/products/vegetable-salads/vegetableSalad12.jpg";
import vegetableSaladImg13 from "../assets/products/vegetable-salads/vegetableSalad13.jpg";
import vegetableSaladImg14 from "../assets/products/vegetable-salads/vegetableSalad14.jpg";
import vegetableSaladImg15 from "../assets/products/vegetable-salads/vegetableSalad15.jpg";
import vegetableSaladImg16 from "../assets/products/vegetable-salads/vegetableSalad16.jpg";

import seafoodSaladImg1 from "../assets/products/seafood-salads/seafoodSalad1.jpg";
import seafoodSaladImg2 from "../assets/products/seafood-salads/seafoodSalad2.jpg";
import seafoodSaladImg3 from "../assets/products/seafood-salads/seafoodSalad3.jpg";
import seafoodSaladImg4 from "../assets/products/seafood-salads/seafoodSalad4.jpg";
import seafoodSaladImg5 from "../assets/products/seafood-salads/seafoodSalad5.jpg";

import coldSnackImg1 from "../assets/products/cold-snacks/coldSnack1.jpg";
import coldSnackImg2 from "../assets/products/cold-snacks/coldSnack2.jpg";
import coldSnackImg3 from "../assets/products/cold-snacks/coldSnack3.jpg";
import coldSnackImg4 from "../assets/products/cold-snacks/coldSnack4.jpg";
import coldSnackImg5 from "../assets/products/cold-snacks/coldSnack5.jpg";
import coldSnackImg6 from "../assets/products/cold-snacks/coldSnack6.jpg";
import coldSnackImg7 from "../assets/products/cold-snacks/coldSnack7.jpg";
import coldSnackImg8 from "../assets/products/cold-snacks/coldSnack8.jpg";
import coldSnackImg9 from "../assets/products/cold-snacks/coldSnack9.jpg";
import coldSnackImg10 from "../assets/products/cold-snacks/coldSnack10.jpg";
import coldSnackImg11 from "../assets/products/cold-snacks/coldSnack11.jpg";
import coldSnackImg12 from "../assets/products/cold-snacks/coldSnack12.jpg";
import coldSnackImg13 from "../assets/products/cold-snacks/coldSnack13.jpg";
import coldSnackImg14 from "../assets/products/cold-snacks/coldSnack14.jpg";
import coldSnackImg15 from "../assets/products/cold-snacks/coldSnack15.jpg";

import meatSnackImg1 from "../assets/products/meat-snacks/meatSnack1.jpg";
import meatSnackImg2 from "../assets/products/meat-snacks/meatSnack2.jpg";

import hotSoupImg1 from "../assets/products/hot-soups/hotSoup1.jpg";
import hotSoupImg2 from "../assets/products/hot-soups/hotSoup2.jpg";
import hotSoupImg3 from "../assets/products/hot-soups/hotSoup3.jpg";
import hotSoupImg4 from "../assets/products/hot-soups/hotSoup4.jpg";
import hotSoupImg5 from "../assets/products/hot-soups/hotSoup5.jpg";
import hotSoupImg6 from "../assets/products/hot-soups/hotSoup6.jpg";
import hotSoupImg7 from "../assets/products/hot-soups/hotSoup7.jpg";
import hotSoupImg8 from "../assets/products/hot-soups/hotSoup8.jpg";
import hotSoupImg9 from "../assets/products/hot-soups/hotSoup9.jpg";
import hotSoupImg10 from "../assets/products/hot-soups/hotSoup10.jpg";

import mainCourseImg1 from "../assets/products/main-courses/mainCourse1.jpg";
import mainCourseImg2 from "../assets/products/main-courses/mainCourse2.jpg";
import mainCourseImg3 from "../assets/products/main-courses/mainCourse3.jpg";
import mainCourseImg4 from "../assets/products/main-courses/mainCourse4.jpg";
import mainCourseImg5 from "../assets/products/main-courses/mainCourse5.jpg";
import mainCourseImg6 from "../assets/products/main-courses/mainCourse6.jpg";
import mainCourseImg7 from "../assets/products/main-courses/mainCourse7.jpg";
import mainCourseImg8 from "../assets/products/main-courses/mainCourse8.jpg";
import mainCourseImg9 from "../assets/products/main-courses/mainCourse9.jpg";
import mainCourseImg10 from "../assets/products/main-courses/mainCourse10.jpg";
import mainCourseImg11 from "../assets/products/main-courses/mainCourse11.jpg";
import mainCourseImg12 from "../assets/products/main-courses/mainCourse12.jpg";
import mainCourseImg13 from "../assets/products/main-courses/mainCourse13.jpg";
import mainCourseImg14 from "../assets/products/main-courses/mainCourse14.jpg";
import mainCourseImg15 from "../assets/products/main-courses/mainCourse15.jpg";
import mainCourseImg16 from "../assets/products/main-courses/mainCourse16.jpg";
import mainCourseImg17 from "../assets/products/main-courses/mainCourse17.jpg";
import mainCourseImg18 from "../assets/products/main-courses/mainCourse18.jpg";
import mainCourseImg19 from "../assets/products/main-courses/mainCourse19.jpg";

import coldSoupImg1 from "../assets/products/cold-soups/coldSoup1.jpg";
import coldSoupImg2 from "../assets/products/cold-soups/coldSoup2.jpg";
import coldSoupImg3 from "../assets/products/cold-soups/coldSoup3.jpg";

import garnishImg1 from "../assets/products/garnishes/garnish1.jpg";
import garnishImg2 from "../assets/products/garnishes/garnish2.jpg";
import garnishImg3 from "../assets/products/garnishes/garnish3.jpg";

import chickenImg1 from "../assets/products/chicken/chicken1.jpg";
import chickenImg2 from "../assets/products/chicken/chicken2.jpg";
import chickenImg3 from "../assets/products/chicken/chicken3.jpg";
import chickenImg4 from "../assets/products/chicken/chicken4.jpg";

import hotSnack1 from "../assets/products/hot-snacks/hotSnack1.jpg";
import hotSnack2 from "../assets/products/hot-snacks/hotSnack2.jpg";
import hotSnack3 from "../assets/products/hot-snacks/hotSnack3.jpg";
import hotSnack4 from "../assets/products/hot-snacks/hotSnack4.jpg";
import hotSnack5 from "../assets/products/hot-snacks/hotSnack5.jpg";
import hotSnack6 from "../assets/products/hot-snacks/hotSnack6.jpg";
import hotSnack7 from "../assets/products/hot-snacks/hotSnack7.jpg";

import shashlikImg1 from "../assets/products/shashlik/shashlik1.jpg";
import shashlikImg2 from "../assets/products/shashlik/shashlik2.jpg";
import shashlikImg3 from "../assets/products/shashlik/shashlik3.jpg";
import shashlikImg4 from "../assets/products/shashlik/shashlik4.jpg";
import shashlikImg6 from "../assets/products/shashlik/shashlik6.jpg";
import shashlikImg7 from "../assets/products/shashlik/shashlik7.jpg";
import shashlikImg8 from "../assets/products/shashlik/shashlik8.jpg";
import shashlikImg9 from "../assets/products/shashlik/shashlik9.png";

import drinkImg1 from "../assets/products/drinks/drink1.jpg";
import drinkImg2 from "../assets/products/drinks/drink2.jpg";
import drinkImg3 from "../assets/products/drinks/drink3.jpg";
import drinkImg4 from "../assets/products/drinks/drink4.jpg";
import drinkImg5 from "../assets/products/drinks/drink5.jpg";
import drinkImg6 from "../assets/products/drinks/drink6.jpg";
import drinkImg7 from "../assets/products/drinks/drink7.jpg";
import drinkImg8 from "../assets/products/drinks/drink8.jpg";
import drinkImg9 from "../assets/products/drinks/drink9.jpg";
import drinkImg10 from "../assets/products/drinks/drink10.jpg";
import drinkImg11 from "../assets/products/drinks/drink11.jpg";
import drinkImg12 from "../assets/products/drinks/drink12.jpg";
import drinkImg13 from "../assets/products/drinks/drink13.jpg";
import drinkImg14 from "../assets/products/drinks/drink14.jpg";
import drinkImg15 from "../assets/products/drinks/drink15.jpg";

import beerImg1 from "../assets/products/beer/beer1.jpg";
import beerImg2 from "../assets/products/beer/beer2.jpg";
import vodkaImg1 from "../assets/products/vodka/vodka1.jpg";
import vodkaImg2 from "../assets/products/vodka/vodka2.jpg";
import vodkaImg3 from "../assets/products/vodka/vodka3.jpg";
import vodkaImg4 from "../assets/products/vodka/vodka4.jpg";
import vodkaImg5 from "../assets/products/vodka/vodka5.jpg";
import vodkaImg7 from "../assets/products/vodka/vodka7.jpg";
import vodkaImg15 from "../assets/products/vodka/vodka15.jpg";

import wineImg1 from "../assets/products/wine/wine1.jpg";
import wineImg2 from "../assets/products/wine/wine2.jpg";
import wineImg3 from "../assets/products/wine/wine3.jpg";
import wineImg4 from "../assets/products/wine/wine4.jpg";

import cognacImg1 from "../assets/products/cognac/cognac1.jpg";
import cognacImg2 from "../assets/products/cognac/cognac2.jpg";
import cognacImg3 from "../assets/products/cognac/cognac3.jpg";
import cognacImg4 from "../assets/products/cognac/cognac4.jpg";
import cognacImg5 from "../assets/products/cognac/cognac5.jpg";

import mojitoImg1 from "../assets/products/mojito/mojito1.jpg";
import mojitoImg2 from "../assets/products/mojito/mojito2.jpg";
import mojitoImg4 from "../assets/products/mojito/mojito4.jpg";
import mojitoImg5 from "../assets/products/mojito/mojito5.jpg";
import mojitoImg7 from "../assets/products/mojito/mojito7.jpg";

import dessertImg1 from "../assets/products/desserts/dessert1.jpg";
import dessertImg2 from "../assets/products/desserts/dessert2.jpg";
import dessertImg3 from "../assets/products/desserts/dessert3.jpg";
import dessertImg4 from "../assets/products/desserts/dessert4.jpg";
import dessertImg5 from "../assets/products/desserts/dessert5.jpg";

import Img from "../assets/products/image.png";

// --- MAHSULOTLAR MA'LUMOTLAR ARRAYI ---
const products = {
  // 1. NON MAHSULOTLARI
  bread: [
    {
      id: "bread2",
      name: { uz: "Non Assarti", ru: "Хлебное Ассорти", en: "Bread Assortment" },
      price: "58000",
      image: breadImg2,
    },
    {
      id: "bread1",
      name: { uz: "Kulcha non", ru: "Лепешка", en: "Flat Bread" },
      price: "6500",
      image: breadImg1,
    },
    {
      id: "bread4",
      name: { uz: "Buxanka", ru: "Буханка", en: "Loaf" },
      price: "5000",
      image: breadImg4,
    },
    {
      id: "bread3",
      name: { uz: "Patir non", ru: "Патыр нон", en: "Patir Bread" },
      price: "8500",
      image: breadImg3,
    },
    {
      id: "bread6",
      name: { uz: "Qora non ", ru: "Черный хлеб", en: "Black Bread" },
      price: "10000",
      image: breadImg6,
    },
    {
      id: "bread7",
      name: { uz: "Chap-Chak", ru: "Чапчак", en: "ChapChak bread" },
      price: "7000",
      image: Img,
    },
  ],

  // 2. SALATLAR
  salads: [
    {
      id: "salad1",
      name: { uz: "Gnezdo", ru: "Гнездо", en: "Nest salad" },
      price: "47500",
      image: saladImg1,
    },
    {
      id: "salad2",
      name: { uz: "Dilband", ru: "Дилбанд", en: "Dilband salad" },
      price: "51500",
      image: saladImg2,
    },
    {
      id: "salad3",
      name: { uz: "Tsezar salati", ru: "Цезарь", en: "Caesar salad" },
      price: "52500",
      image: saladImg20,
    },
    {
      id: "salad4",
      name: { uz: "Go'shtli salat", ru: "Мясной", en: "Meat salad" },
      price: "47500",
      image: saladImg4,
    },
    {
      id: "salad5",
      name: { uz: "Izyuminka", ru: "Изюминка", en: "Izyuminka" },
      price: "50500",
      image: saladImg5,
    },
    {
      id: "salad6",
      name: { uz: "Shirin", ru: "Ширин", en: "Shirin" },
      price: "49500",
      image: saladImg21,
    },
    {
      id: "salad7",
      name: { uz: "Meksika", ru: "Мексика", en: "Mexico" },
      price: "61500",
      image: saladImg24,
    },
    {
      id: "salad8",
      name: { uz: "Saykal", ru: "Сайкал", en: "Saykal salad" },
      price: "49500",
      image: saladImg25,
    },
    {
      id: "salad9",
      name: { uz: "Yaponskiy salat", ru: "Японский", en: "Japanese salad" },
      price: "49500",
      image: saladImg26,
    },
    {
      id: "salad10",
      name: { uz: "Seul", ru: "Сеул", en: "Seoul salad" },
      price: "47500",
      image: saladImg27,
    },
    {
      id: "salad11",
      name: { uz: "Roust bif", ru: "Роуст биф", en: "Roast beef" },
      price: "76500",
      image: saladImg28,
    },
    {
      id: "salad12",
      name: { uz: "Erkaklar kaprizi", ru: "Мужской каприз", en: "Male caprice" },
      price: "50500",
      image: saladImg30,
    },
    {
      id: "salad13",
      name: { uz: "Olivye", ru: "Оливье", en: "Olivier salad" },
      price: "47000",
      image: saladImg29,
    },
  ],

  // 3. SABZAVOTLI SALATLAR
  "vegetable-salads": [
    {
      id: "veg_salad1",
      name: { uz: "Vinegret", ru: "Винигрет", en: "Vinaigrette" },
      price: "37000",
      image: vegetableSaladImg1,
    },
    {
      id: "veg_salad2",
      name: { uz: "Veshenki qo'ziqorinlari", ru: "Грибы вешенки", en: "Oyster mushrooms" },
      price: "32000",
      image: vegetableSaladImg2,
    },
    {
      id: "veg_salad3",
      name: { uz: "Vitaminli salat", ru: "Витаминный", en: "Vitamin salad" },
      price: "35000",
      image: vegetableSaladImg3,
    },
    {
      id: "veg_salad4",
      name: { uz: "Kesilgan bodring", ru: "Огурцы Нарезка", en: "Sliced cucumbers" },
      price: "13000",
      image: vegetableSaladImg4,
    },
    {
      id: "veg_salad5",
      name: { uz: "Kapulete", ru: "Капулете", en: "Capulete" },
      price: "40000",
      image: vegetableSaladImg5,
    },
    {
      id: "veg_salad6",
      name: { uz: "Qovurilgan sabzavotlar", ru: "Овощи жареные", en: "Fried vegetables" },
      price: "75000",
      image: vegetableSaladImg6,
    },
    {
      id: "veg_salad7",
      name: { uz: "Xoravac", ru: "Хоравац", en: "Khorovats" },
      price: "50500",
      image: vegetableSaladImg7,
    },
    {
      id: "veg_salad8",
      name: { uz: "O'zbekcha salat", ru: "Узбекский", en: "Uzbek salad" },
      price: "20500",
      image: vegetableSaladImg8,
    },
    {
      id: "veg_salad9",
      name: { uz: "Achichuk", ru: "Ачик-чучук", en: "Achichuk" },
      price: "20000",
      image: vegetableSaladImg9,
    },
    {
      id: "veg_salad10",
      name: { uz: "Sabzavotli guldasta", ru: "Овощной букет", en: "Vegetable bouquet" },
      price: "64000",
      image: vegetableSaladImg10,
    },
    {
      id: "veg_salad11",
      name: { uz: "Miks", ru: "Микс", en: "Mix salad" },
      price: "43000",
      image: vegetableSaladImg11,
    },
    {
      id: "veg_salad12",
      name: { uz: "Smak", ru: "Смак", en: "Smak" },
      price: "38000",
      image: vegetableSaladImg12,
    },
    {
      id: "veg_salad13",
      name: { uz: "Issiq baqlajon salati", ru: "Теплый Баклажан", en: "Warm eggplant salad" },
      price: "69500",
      image: vegetableSaladImg13,
    },
    {
      id: "veg_salad14",
      name: { uz: "Ekzotika", ru: "Екзотика", en: "Exotika" },
      price: "59500",
      image: vegetableSaladImg14,
    },
    {
      id: "veg_salad15",
      name: { uz: "Qarsillama baqlajon", ru: "Хрустящие Баклажаны", en: "Crispy eggplant" },
      price: "58500",
      image: vegetableSaladImg15,
    },
    {
      id: "veg_salad16",
      name: { uz: "Grekcha salat", ru: "Греческий", en: "Greek salad" },
      price: "52500",
      image: vegetableSaladImg16,
    },
  ],
"side-dishes": [
  {
    id: "garnish1",
    name: { uz: "Chips", ru: "Чипсы", en: "Chips" },
    price: "22000",
    image: garnishImg1,
  },
  {
    id: "garnish2",
    name: { uz: "Qishloqcha kartoshka", ru: "Картофель по-деревенски", en: "Wedge fries" },
    price: "23500",
    image: garnishImg2,
  },
  {
    id: "garnish3",
    name: { uz: "Fri", ru: "Фри", en: "French fries" },
    price: "25000",
    image: garnishImg3,
  },
],
  // 4. DENGIZ MAHSULOTLARI SALATLARI
  "seafood-salads": [
    {
      id: "seafood_1",
      name: { uz: "Mimoza", ru: "Мимоза", en: "Mimosa" },
      price: "40000",
      image: seafoodSaladImg1,
    },
    {
      id: "seafood_2",
      name: { uz: "Selyodka pod shuboy", ru: "Селёдка под шубой", en: "Herring under a fur coat" },
      price: "40000",
      image: seafoodSaladImg2,
    },
    {
      id: "seafood_3",
      name: { uz: "Tunezli salat", ru: "Салат с тунцом", en: "Tuna salad" },
      price: "69500",
      image: seafoodSaladImg3,
    },
    {
      id: "seafood_4",
      name: { uz: "Krevets va avokado rukola bilan", ru: "Креветки с руколой и авакадо", en: "Shrimp with arugula and avocado" },
      price: "68000",
      image: seafoodSaladImg4,
    },
    {
      id: "seafood_5",
      name: { uz: "Losos va avokadoli salat", ru: "Салат из лосося и авакадо", en: "Salmon and avocado salad" },
      price: "72000",
      image: seafoodSaladImg5,
    },
  ],

  // 5. SOʻUQ ZAKUSKALAR
  "cold-appetizers": [
    {
      id: "cold_1",
      name: { uz: "Qizil ikra (50gr)", ru: "Икра красная (50гр)", en: "Red caviar (50g)" },
      price: "197000",
      image: coldSnackImg1,
    },
    {
      id: "cold_2",
      name: { uz: "Yaxna 250gr", ru: "Яхна 250 гр", en: "Yakhna 250g" },
      price: "120500",
      image: coldSnackImg2,
    },
    {
      id: "cold_3",
      name: { uz: "Pishloq", ru: "Сыр", en: "Cheese" },
      price: "29000",
      image: coldSnackImg3,
    },
    {
      id: "cold_4",
      name: { uz: "Chakka", ru: "Чакка", en: "Chakka" },
      price: "14000",
      image: coldSnackImg4,
    },
    {
      id: "cold_5",
      name: { uz: "Go'shtli assorti 520gr", ru: "Мясное Ассорти 520гр", en: "Meat Assorted 520g" },
      price: "175000",
      image: coldSnackImg5,
    },
    {
      id: "cold_6",
      name: { uz: "Limon kesilgan", ru: "Лимон нарезка", en: "Sliced Lemon" },
      price: "18400",
      image: coldSnackImg6,
    },
    {
      id: "cold_7",
      name: { uz: "Limon ikkiga bo'lingan", ru: "Лимон-Пополам", en: "Lemon Halves" },
      price: "18400",
      image: coldSnackImg7,
    },
    {
      id: "cold_8",
      name: { uz: "Ko'katlar assortisi", ru: "Зелень ассорти", en: "Assorted Greens" },
      price: "18000",
      image: coldSnackImg8,
    },
    {
      id: "cold_9",
      name: { uz: "Mulatka", ru: "Мулатка", en: "Mulatka" },
      price: "35000",
      image: coldSnackImg9,
    },
    {
      id: "cold_10",
      name: { uz: "Brinza", ru: "Бринза", en: "Bryndza" },
      price: "25000",
      image: coldSnackImg10,
    },
    {
      id: "cold_11",
      name: { uz: "Ruscha selyodka", ru: "Сельд по Русский", en: "Russian-style herring" },
      price: "55000",
      image: coldSnackImg11,
    },
    {
      id: "cold_12",
      name: { uz: "Baliq assortisi", ru: "Рыбное ассорти", en: "Fish platter" },
      price: "216500",
      image: coldSnackImg12,
    },
    {
      id: "cold_13",
      name: { uz: "Otquloq va limon", ru: "Щавель лимон", en: "Sorrel lemon" },
      price: "20000",
      image: coldSnackImg13,
    },
    {
      id: "cold_14",
      name: { uz: "Tuzlamalar assortisi", ru: "Соленья Ассорти", en: "Assorted Pickles" },
      price: "65500",
      image: coldSnackImg14,
    },
    {
      id: "cold_15",
      name: { uz: "Pishloq/Brinza assortisi", ru: "Сыр/Брынза ассорти", en: "Cheese/Bryndza Assorted" },
      price: "190000",
      image: coldSnackImg15,
    },
  ],

  // 6. GOʻSHTLI ZAKUSKALAR
  "meat-appetizers": [
    {
      id: "meatSnack1",
      name: { uz: "Archa rulet 100 gr", ru: "Арча Ассорти", en: "Archa assarted" },
      price: "40500",
      image: meatSnackImg1,
    },
    {
      id: "meatSnack2",
      name: { uz: "Qazi 100Gr", ru: "Казы 100Гр", en: "Kazy 100Gr" },
      price: "40500",
      image: meatSnackImg2,
    },
  ],

  // 7. ISSIQ SHOʻRBALAR
  "hot-soups": [
    {
      id: "hotSoup1",
      name: { uz: "Bulyon", ru: "Бульон по восточному", en: "Eastern broth" },
      price: "29000",
      image: hotSoupImg1,
    },
    {
      id: "hotSoup2",
      name: { uz: "Qoziqorin Krem", ru: "Грибной Крем-Суп", en: "Cream of Mushroom Soup" },
      price: "34000",
      image: hotSoupImg2,
    },
    {
      id: "hotSoup3",
      name: { uz: "Chechevichniy SHurva", ru: "Чечевичный суп", en: "Lentil soup" },
      price: "32000",
      image: hotSoupImg3,
    },
    {
      id: "hotSoup4",
      name: { uz: "Tushenka", ru: "Тушёнка", en: "Stew" },
      price: "40000",
      image: hotSoupImg4,
    },
    {
      id: "hotSoup5",
      name: { uz: "Shi", ru: "Щи зеленые", en: "Sorrel Soup" },
      price: "32000",
      image: hotSoupImg5,
    },
    {
      id: "hotSoup6",
      name: { uz: "Pishloq Shorva", ru: "Сырный суп", en: "Cheese Soup" },
      price: "37000",
      image: hotSoupImg6,
    },
    {
      id: "hotSoup7",
      name: { uz: "Mastava", ru: "Мастава", en: "Mastava-Soup" },
      price: "32000",
      image: hotSoupImg7,
    },
    {
      id: "hotSoup8",
      name: { uz: "Borsh", ru: "Борщ", en: "Borsh-soup" },
      price: "32000",
      image: hotSoupImg8,
    },
    {
      id: "hotSoup9",
      name: { uz: "Tovuq Shorva", ru: "Куриный суп", en: "Chicken-soup" },
      price: "26500",
      image: hotSoupImg9,
    },
    {
      id: "hotSoup10",
      name: { uz: "Kuzacha Shorva", ru: "Кузача-Суп", en: "Kuzacha-soup" },
      price: "42500",
      image: hotSoupImg10,
    },
  ],

  // 8. IKKINCHI TAOMLAR
  "main-dishes": [
    {
      id: "mainCourse1",
      name: { uz: "Grilda koreyka", ru: "Корейка на гриле", en: "Grilled rack of lamb" },
      price: "100000",
      image: mainCourseImg1,
    },
    {
      id: "mainCourse2",
      name: { uz: "Assado", ru: "Assado", en: "Assado" },
      price: "319000",
      image: mainCourseImg2,
    },
    {
      id: "mainCourse3",
      name: { uz: "Lag'mon", ru: "Лагман", en: "Lagman" },
      price: "64000",
      image: mainCourseImg3,
    },
    {
      id: "mainCourse4",
      name: { uz: "Jiz-biz (lahm)", ru: "Жиз-быз (вырезки)", en: "Jiz-biz (tenderloin)" },
      price: "394000",
      image: mainCourseImg4,
    },
    {
      id: "mainCourse5",
      name: { uz: "Shirin TABAKA kg", ru: "Ширин ТАБАКА кг", en: "Shirin TABAKA kg" },
      price: "122000",
      image: mainCourseImg5,
    },
    {
      id: "mainCourse6",
      name: { uz: "Fransuzcha go'sht", ru: "Мясо по Французски", en: "French style meat" },
      price: "103000",
      image: mainCourseImg6,
    },
    {
      id: "mainCourse7",
      name: { uz: "Go'sht Shirin", ru: 'Мясо. "Ширин"', en: "Meat Shirin" },
      price: "319000",
      image: mainCourseImg7,
    },
    {
      id: "mainCourse8",
      name: { uz: "Dolma 1 dona", ru: "Долма 1 шт", en: "Dolma 1 pc" },
      price: "9000",
      image: mainCourseImg8,
    },
    {
      id: "mainCourse9",
      name: { uz: "Jiz-biz (qo'y go'shti)", ru: "Жиз-быз (из баранины)", en: "Jiz-biz (lamb)" },
      price: "324800",
      image: mainCourseImg9,
    },
    {
      id: "mainCourse10",
      name: { uz: "Shirin Jiz-biz (Assorti)", ru: "Shirin Жиз-быз (Ассорти)", en: "Shirin Jiz-biz (Assorted)" },
      price: "690000",
      image: mainCourseImg10,
    },
    {
      id: "mainCourse11",
      name: { uz: "Xil-xil go'sht shou", ru: "Хил Хил Мясное Шоу", en: "Tender Meat Show" },
      price: "320000",
      image: mainCourseImg11,
    },
    {
      id: "mainCourse12",
      name: { uz: "Flotcha makaron", ru: "Макароны по флотски", en: "Navy style pasta" },
      price: "65500",
      image: mainCourseImg12,
    },
    {
      id: "mainCourse13",
      name: { uz: "Dimlangan qovurg'a", ru: "Ребро Тушенное", en: "Braised rib" },
      price: "330000",
      image: mainCourseImg13,
    },
    {
      id: "mainCourse14",
      name: { uz: "Soch kabob", ru: "Соч Кабоб", en: "Soch kebab" },
      price: "98000",
      image: mainCourseImg14,
    },
    {
      id: "mainCourse15",
      name: { uz: "Alfredo", ru: "Альфредо", en: "Alfredo" },
      price: "76000",
      image: mainCourseImg15,
    },
    {
      id: "mainCourse16",
      name: { uz: "Dolma porsiya", ru: "Долма порция", en: "Dolma portion" },
      price: "54000",
      image: mainCourseImg16,
    },
    {
      id: "mainCourse17",
      name: { uz: "Lula-kebab", ru: "Люля-кебаб", en: "Lula kebab" },
      price: "87000",
      image: mainCourseImg17,
    },
    {
      id: "mainCourse18",
      name: { uz: "Tovuqli set Shirin", ru: "Куриный сет Ширин", en: "Chicken set Shirin" },
      price: "342000",
      image: mainCourseImg18,
    },
    {
      id: "mainCourse19",
      name: { uz: "Jiz-biz KOREYKA", ru: "Жиз Быз КОРЕЙКА", en: "Jiz-biz Rack of lamb" },
      price: "345000",
      image: mainCourseImg19,
    },
  ],

  // 9. SOʻUQ SHOʻRBALAR
  "cold-soups": [
    {
      id: "coldSoup1",
      name: { uz: "Okroshka", ru: "Окрошка", en: "Okroshka" },
      price: "28000",
      image: coldSoupImg1,
    },
    {
      id: "coldSoup2",
      name: { uz: "Kuksi", ru: "Кукси", en: "Kuksi" },
      price: "35000",
      image: coldSoupImg2,
    },
    {
      id: "coldSoup3",
      name: { uz: "Gazpacho", ru: "Гаспачо", en: "Gazpacho" },
      price: "32000",
      image: coldSoupImg3,
    },
  ],

  // 10. GARNIRLAR
  garnishes: [
    {
      id: "garnish1",
      name: { uz: "Kartoshka fri", ru: "Картофель фри", en: "French fries" },
      price: "22000",
      image: garnishImg1,
    },
    {
      id: "garnish2",
      name: { uz: "Kartoshka pyure", ru: "Картофельное пюре", en: "Mashed potatoes" },
      price: "18000",
      image: garnishImg2,
    },
    {
      id: "garnish3",
      name: { uz: "Guruch", ru: "Рис", en: "Rice" },
      price: "15000",
      image: garnishImg3,
    },
  ],

  // 11. TOVUQ TAOMLARI
  chicken: [
    {
      id: "chicken1",
      name: { uz: "Tabaka", ru: "Табака", en: "Tabaka chicken" },
      price: "65000",
      image: chickenImg1,
    },
    {
      id: "chicken2",
      name: { uz: "Qovurilgan tovuq", ru: "Жареная курица", en: "Fried chicken" },
      price: "60000",
      image: chickenImg2,
    },
    {
      id: "chicken3",
      name: { uz: "Tovuq qanotchalari", ru: "Куриные крылышки", en: "Chicken wings" },
      price: "45000",
      image: chickenImg3,
    },
    {
      id: "chicken4",
      name: { uz: "Tovuq naggets", ru: "Куриные наггетсы", en: "Chicken nuggets" },
      price: "35000",
      image: chickenImg4,
    },
  ],

  // 12. ISSIQ ZAKUSKALAR
  "hot-snacks": [
    {
      id: "hotSnack1",
      name: { uz: "Juliyen", ru: "Жюльен", en: "Julienne" },
      price: "38000",
      image: hotSnack1,
    },
    {
      id: "hotSnack2",
      name: { uz: "Pishloqli tayoqchalar", ru: "Сырные палочки", en: "Cheese sticks" },
      price: "32000",
      image: hotSnack2,
    },
    {
      id: "hotSnack3",
      name: { uz: "Qovurilgan pishloq", ru: "Жареный сыр", en: "Fried cheese" },
      price: "35000",
      image: hotSnack3,
    },
    {
      id: "hotSnack4",
      name: { uz: "Qo'ziqorin juliyen", ru: "Грибной жюльен", en: "Mushroom julienne" },
      price: "36000",
      image: hotSnack4,
    },
    {
      id: "hotSnack5",
      name: { uz: "Sarmsiqli suxariki", ru: "Чесночные сухарики", en: "Garlic croutons" },
      price: "18000",
      image: hotSnack5,
    },
    {
      id: "hotSnack6",
      name: { uz: "Qovurilgan krevetka", ru: "Жареные креветки", en: "Fried shrimp" },
      price: "75000",
      image: hotSnack6,
    },
    {
      id: "hotSnack7",
      name: { uz: "Kalamar halqalari", ru: "Кольца кальмара", en: "Squid rings" },
      price: "48000",
      image: hotSnack7,
    },
  ],

  // 13. SHASHLIKLAR
  shashlik: [
    {
      id: "shashlik1",
      name: { uz: "Qiyma shashlik", ru: "Люля-кебаб", en: "Minced meat kebab" },
      price: "18000",
      image: shashlikImg1,
    },
    {
      id: "shashlik2",
      name: { uz: "Tovuq shashlik", ru: "Шашлык из курицы", en: "Chicken kebab" },
      price: "17000",
      image: shashlikImg2,
    },
    {
      id: "shashlik3",
      name: { uz: "Qo'y go'shti shashlik", ru: "Шашлык из баранины", en: "Lamb kebab" },
      price: "22000",
      image: shashlikImg3,
    },
    {
      id: "shashlik4",
      name: { uz: "Jigar shashlik", ru: "Шашлык из печени", en: "Liver kebab" },
      price: "16000",
      image: shashlikImg4,
    },
    {
      id: "shashlik6",
      name: { uz: "Sabzavotli shashlik", ru: "Шашлык из овощей", en: "Vegetable kebab" },
      price: "14000",
      image: shashlikImg6,
    },
    {
      id: "shashlik7",
      name: { uz: "Qovurg'a shashlik", ru: "Шашлык из ребрышек", en: "Rib kebab" },
      price: "24000",
      image: shashlikImg7,
    },
    {
      id: "shashlik8",
      name: { uz: "Qazi shashlik", ru: "Шашлык из казы", en: "Kazy kebab" },
      price: "26000",
      image: shashlikImg8,
    },
    {
      id: "shashlik9",
      name: { uz: "Rulet shashlik", ru: "Шашлык рулет", en: "Roll kebab" },
      price: "23000",
      image: shashlikImg9,
    },
  ],

  // 14. ICHIMLIKLAR
  drinks: [
    {
      id: "drink1",
      name: { uz: "Coca-Cola 1.5L", ru: "Кока-Кола 1.5л", en: "Coca-Cola 1.5L" },
      price: "18000",
      image: drinkImg1,
    },
    {
      id: "drink2",
      name: { uz: "Fanta 1.5L", ru: "Фанта 1.5л", en: "Fanta 1.5L" },
      price: "18000",
      image: drinkImg2,
    },
    {
      id: "drink3",
      name: { uz: "Sprite 1.5L", ru: "Спрайт 1.5л", en: "Sprite 1.5L" },
      price: "18000",
      image: drinkImg3,
    },
    {
      id: "drink4",
      name: { uz: "Meva sharbati 1L", ru: "Сок 1л", en: "Fruit juice 1L" },
      price: "22000",
      image: drinkImg4,
    },
    {
      id: "drink5",
      name: { uz: "Mineral suv 0.5L", ru: "Минеральная вода 0.5л", en: "Mineral water 0.5L" },
      price: "5000",
      image: drinkImg5,
    },
    {
      id: "drink6",
      name: { uz: "Gazsiz suv 0.5L", ru: "Вода без газа 0.5л", en: "Still water 0.5L" },
      price: "4000",
      image: drinkImg6,
    },
    {
      id: "drink7",
      name: { uz: "Kompoti", ru: "Компот", en: "Compote" },
      price: "15000",
      image: drinkImg7,
    },
    {
      id: "drink8",
      name: { uz: "Limonad", ru: "Лимонад", en: "Lemonade" },
      price: "20000",
      image: drinkImg8,
    },
    {
      id: "drink9",
      name: { uz: "Muzli choy", ru: "Холодный чай", en: "Ice tea" },
      price: "16000",
      image: drinkImg9,
    },
    {
      id: "drink10",
      name: { uz: "Qora choy", ru: "Черный чай", en: "Black tea" },
      price: "5000",
      image: drinkImg10,
    },
    {
      id: "drink11",
      name: { uz: "Ko'k choy", ru: "Зеленый чай", en: "Green tea" },
      price: "5000",
      image: drinkImg11,
    },
    {
      id: "drink12",
      name: { uz: "Limonli choy", ru: "Чай с лимоном", en: "Tea with lemon" },
      price: "8000",
      image: drinkImg12,
    },
    {
      id: "drink13",
      name: { uz: "Kofe Amerika", ru: "Кофе Американо", en: "Americano Coffee" },
      price: "15000",
      image: drinkImg13,
    },
    {
      id: "drink14",
      name: { uz: "Kapuchino", ru: "Капучино", en: "Cappuccino" },
      price: "18000",
      image: drinkImg14,
    },
    {
      id: "drink15",
      name: { uz: "Latte", ru: "Латте", en: "Latte" },
      price: "20000",
      image: drinkImg15,
    },
  ],

  // 15. PIVO
  beer: [
    {
      id: "beer1",
      name: { uz: "Pivo Quvasz 0.5L", ru: "Пиво Квас 0.5л", en: "Beer Kvas 0.5L" },
      price: "25000",
      image: beerImg1,
    },
    {
      id: "beer2",
      name: { uz: "Pivo Tuborg 0.5L", ru: "Пиво Tuborg 0.5л", en: "Tuborg Beer 0.5L" },
      price: "28000",
      image: beerImg2,
    },
  ],

  // 16. AROQ VA SPIRTLI ICHIMLIKLAR
  vodka: [
    {
      id: "vodka1",
      name: { uz: "Aroq 0.5L", ru: "Водка 0.5л", en: "Vodka 0.5L" },
      price: "80000",
      image: vodkaImg1,
    },
    {
      id: "vodka2",
      name: { uz: "Aroq Premium 0.5L", ru: "Водка Премиум 0.5л", en: "Premium Vodka 0.5L" },
      price: "120000",
      image: vodkaImg2,
    },
    {
      id: "vodka3",
      name: { uz: "Aroq Gold 0.7L", ru: "Водка Голд 0.7л", en: "Gold Vodka 0.7L" },
      price: "160000",
      image: vodkaImg3,
    },
    {
      id: "vodka4",
      name: { uz: "Aroq Silver 0.5L", ru: "Водка Сильвер 0.5л", en: "Silver Vodka 0.5L" },
      price: "95000",
      image: vodkaImg4,
    },
    {
      id: "vodka5",
      name: { uz: "Aroq Classic 0.5L", ru: "Водка Классик 0.5л", en: "Classic Vodka 0.5L" },
      price: "85000",
      image: vodkaImg5,
    },
    {
      id: "vodka7",
      name: { uz: "Aroq Export 0.75L", ru: "Водка Экспорт 0.75л", en: "Export Vodka 0.75L" },
      price: "180000",
      image: vodkaImg7,
    },
    {
      id: "vodka15",
      name: { uz: "Aroq Elite 1L", ru: "Водка Элит 1л", en: "Elite Vodka 1L" },
      price: "250000",
      image: vodkaImg15,
    },
  ],

  // 17. VINO, KONYAK, KOKTEYLLAR
  wine: [
    {
      id: "wine1",
      name: { uz: "Qizil vino", ru: "Красное вино", en: "Red wine" },
      price: "110000",
      image: wineImg1,
    },
    {
      id: "wine2",
      name: { uz: "Oq vino", ru: "Белое вино", en: "White wine" },
      price: "110000",
      image: wineImg2,
    },
    {
      id: "wine3",
      name: { uz: "Shampan vinosi", ru: "Шампанское", en: "Champagne" },
      price: "130000",
      image: wineImg3,
    },
    {
      id: "wine4",
      name: { uz: "Quruq vino", ru: "Сухое вино", en: "Dry wine" },
      price: "125000",
      image: wineImg4,
    },
  ],
  cognac: [
    {
      id: "cognac1",
      name: { uz: "Konyak 3 yillik", ru: "Коньяк 3 года", en: "Cognac 3 years" },
      price: "140000",
      image: cognacImg1,
    },
    {
      id: "cognac2",
      name: { uz: "Konyak 5 yillik", ru: "Коньяк 5 лет", en: "Cognac 5 years" },
      price: "180000",
      image: cognacImg2,
    },
    {
      id: "cognac3",
      name: { uz: "Konyak Premium", ru: "Коньяк Премиум", en: "Premium Cognac" },
      price: "240000",
      image: cognacImg3,
    },
    {
      id: "cognac4",
      name: { uz: "Konyak VSOP", ru: "Коньяк VSOP", en: "Cognac VSOP" },
      price: "320000",
      image: cognacImg4,
    },
    {
      id: "cognac5",
      name: { uz: "Konyak XO", ru: "Коньяк XO", en: "Cognac XO" },
      price: "450000",
      image: cognacImg5,
    },
  ],
  mojito: [
    {
      id: "mojito1",
      name: { uz: "Klassik Mohito", ru: "Мохито Классический", en: "Classic Mojito" },
      price: "32000",
      image: mojitoImg1,
    },
    {
      id: "mojito2",
      name: { uz: "Qulupnayli Mohito", ru: "Мохито Клубничный", en: "Strawberry Mojito" },
      price: "35000",
      image: mojitoImg2,
    },
    {
      id: "mojito4",
      name: { uz: "Malinali Mohito", ru: "Мохито Малиновый", en: "Raspberry Mojito" },
      price: "35000",
      image: mojitoImg4,
    },
    {
      id: "mojito5",
      name: { uz: "Alkogolsiz Mohito", ru: "Мохито Безалкогольный", en: "Non-alcoholic Mojito" },
      price: "30000",
      image: mojitoImg5,
    },
    {
      id: "mojito7",
      name: { uz: "Tropik Mohito", ru: "Мохито Тропический", en: "Tropical Mojito" },
      price: "38000",
      image: mojitoImg7,
    },
  ],

  // 18. SHIRINLIKLAR
  desserts: [
    {
      id: "dessert1",
      name: { uz: "Tiramisu", ru: "Тирамису", en: "Tiramisu" },
      price: "35000",
      image: dessertImg1,
    },
    {
      id: "dessert2",
      name: { uz: "Chizkeyk", ru: "Чизкейк", en: "Cheesecake" },
      price: "38000",
      image: dessertImg2,
    },
    {
      id: "dessert3",
      name: { uz: "Shokoladli tort", ru: "Шоколадный торт", en: "Chocolate cake" },
      price: "32000",
      image: dessertImg3,
    },
    {
      id: "dessert4",
      name: { uz: "Muzqaymoq assorti", ru: "Мороженое ассорти", en: "Ice cream platter" },
      price: "25000",
      image: dessertImg4,
    },
    {
      id: "dessert5",
      name: { uz: "Meva assortisi", ru: "Фруктовое ассорти", en: "Fruit platter" },
      price: "85000",
      image: dessertImg5,
    },
  ],
};

const FLAGS = { uz: uzFlag, ru: ruFlag, en: enFlag };

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

  // Modal ochiqligida orqa fon scrollini bloklash
  useEffect(() => {
    document.body.style.overflow = selectedProduct ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [selectedProduct]);

  // Kategoriya o'zgarganda mahsulotlarni tanlab olish
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

  // Modal oynasi
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
            src={selectedProduct.image}
            alt={getProductName(selectedProduct)}
            className="modal-img"
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
          <img src={logoImg} alt="Shirin Tabaka" />
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
            <img src={FLAGS[currentLang]} alt={currentLang} className="lang-flag-mini" />
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
                src={category?.image_url || category?.image}
                alt={getCategoryName(category)}
                className="banner-mini-thumb"
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
            <img src={category?.image_url || category?.image} alt="" />
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
                    src={item.image}
                    alt={getProductName(item)}
                    className="product-img"
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