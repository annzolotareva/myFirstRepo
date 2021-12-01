"use strict";
let title = prompt("Как называется Ваш проект?");
let screens = prompt("Какие типы экранов нужно разработать?");
let screenPrice = +prompt("Сколько будет стоить данная работа?");
let adaptive = prompt("Нужен ли адаптив на сайте?");
let service1 = prompt("Какой дополнительный тип услуги нужен?");
let servicePrice1 = +prompt("Сколько это будет стоить?");
let service2 = prompt("Какой дополнительный тип услуги нужен?");
let servicePrice2 = +prompt("Сколько это будет стоить?");
let rollback = 10;
let fullPrice = 0;

const showTypeOf = function (variable) {
  return typeof variable;
};

const allServicePrices = function getAllServicePrices(servPrice1, servPrice2) {
  return servPrice1 + servPrice2;
};

function getFullPrice(scrPrice, getAllServPrices, servPrice1, servPrice2) {
  return scrPrice + getAllServPrices(servPrice1, servPrice2);
}

const getTitle = function (ti) {
  ti = ti.trim().toLowerCase();
  return ti[0].toUpperCase() + ti.substring(1);
};

const servicePercentPrice = function getServicePercentPrices(fullPr, rollb) {
  return fullPr - fullPr * (rollb / 100);
};

const necessityAdaptive = function (adapt) {
  switch (adapt) {
    case "да":
    case "Да":
    case "Yes":
    case "yes":
      adapt = true;
      break;
    case "нет":
    case "Нет":
    case "No":
    case "no":
      adapt = false;
      break;
    default:
      adapt = false;
  }
};

const getRollbackMessage = function (price) {
  if (price >= 30000) {
    return "Даем скидку в 10%";
  } else if (price >= 15000 && price < 30000) {
    return "Даем скидку в 5%";
  } else if (price >= 0 && price < 15000) {
    return "Скидка не предусмотрена";
  } else {
    return "Что то пошло не так";
  }
};

getTitle(title);
necessityAdaptive(adaptive);

fullPrice = getFullPrice(
  screenPrice,
  allServicePrices,
  servicePrice1,
  servicePrice2
);

console.log(showTypeOf(title));
console.log(showTypeOf(screenPrice));
console.log(showTypeOf(adaptive));
console.log(screens.split(", "));
console.log(getRollbackMessage(fullPrice));
console.log(Math.ceil(servicePercentPrice(fullPrice, rollback)));
