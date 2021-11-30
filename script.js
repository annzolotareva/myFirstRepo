"use strict";
let title = "projectFirst",
  screens = "Простые, Сложные, Интерактивные",
  screenPrice = 10,
  rollback = 55,
  fullPrice = 300000,
  adaptive = true;
console.log(typeof title);
console.log(typeof fullPrice);
console.log(typeof adaptive);
console.log(screens.length);
console.log(
  "Стоимость вёрстки экранов " + screenPrice + " рублей/долларов/гривен/юани"
);
screens = screens.toLowerCase();
console.log(screens.split(", "));
console.log(fullPrice * (rollback / 100) + " %");
// 3 задание
title = prompt("Как называется Ваш проект?");
screens = prompt("Какие типы экранов нужно разработать?");
screenPrice = +prompt("Сколько будет стоить данная работа?");
adaptive = prompt("Нужен ли адаптив на сайте?");
switch (adaptive) {
  case "да":
  case "Да":
  case "Yes":
  case "yes":
    adaptive = true;
    break;
  case "нет":
  case "Нет":
  case "No":
  case "no":
    adaptive = false;
    break;
  default:
    adaptive = false;
}
let service1 = prompt("Какой дополнительный тип услуги нужен?");
let servicePrice1 = +prompt("Сколько это будет стоить?");
let service2 = prompt("Какой дополнительный тип услуги нужен?");
let servicePrice2 = +prompt("Сколько это будет стоить?");
fullPrice = screenPrice + servicePrice1 + servicePrice2;
let servicePercentPrice = fullPrice - rollback;
console.log(Math.ceil(servicePercentPrice));
if (fullPrice >= 30000) {
  console.log("Даем скидку в 10%");
} else if (fullPrice >= 15000 && fullPrice < 30000) {
  console.log("Даем скидку в 5%");
} else if (fullPrice >= 0 && fullPrice < 15000) {
  console.log("Скидка не предусмотрена");
} else if (fullPrice < 0) {
  console.log("Что то пошло не так");
}
