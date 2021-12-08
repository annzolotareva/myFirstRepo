"use strict";

const tit = document.getElementsByTagName("h1");
const title = tit[0];

const handlerButons = document.getElementsByClassName("handler_btn");
const startButton = handlerButons[0];
const resetButton2 = handlerButons[1];

const sumButton = document.querySelector(".screen-btn");

const perсent = document.querySelectorAll(".other-items.percent");
const number = document.querySelectorAll(".other-items.number");

const inputTypeRange = document.querySelector(".rollback input[type=range]");

const rangeValue = document.querySelector(".rollback span.range-value");

const totalInput = document.getElementsByClassName("total-input");
const screenPrice = totalInput[0];
const numberOfScreens = totalInput[1];
const allServicePrices = totalInput[2];
const fullPrice = totalInput[3];
const servicePercentPrice = totalInput[4];

let screenBlock = document.querySelectorAll(".screen");

const appData = {
  title: "",
  screens: [],
  screenPrice: 0,
  adaptive: true,
  rollback: 10,
  services: {},
  allServicePrices: 0,
  fullPrice: 0,
  servicePercentPrice: 0,

  start: function () {
    appData.asking();
    appData.addPrices();
    appData.getFullPrice();
    appData.getServicePercentPrice();
    appData.getTitle();
    appData.logger();
  },

  isNumber: function (num) {
    return !isNaN(parseFloat(num)) && isFinite(num);
  },
  asking: function () {
    appData.title = prompt("Как называется Ваш проект?", "Калькулятор вёрстки");

    for (let i = 0; i < 2; i++) {
      let name = prompt("Какие типы экранов нужно разработать?", "Простые, Сложные");
      let price = 0;

      do {
        price = prompt("Сколько будет стоить данная работа?");
      } while (!appData.isNumber(price));

      appData.screens.push({ id: i, name: name, price: price });
    }

    for (let i = 0; i < 2; i++) {
      let name = prompt("Какой дополнительный тип услуги нужен?");
      let price = 0;

      do {
        price = prompt("Сколько это будет стоить?");
      } while (!appData.isNumber(price));

      appData.services[name] = +price;
    }

    appData.adaptive = confirm("Нужен ли адаптив на сайте?");
  },

  addPrices: function () {
    for (let screen of appData.screens) {
      appData.screenPrice += +screen.price;
    }

    for (let key in appData.services) {
      appData.allServicePrices += appData.services[key];
    }
  },

  getFullPrice: function () {
    appData.fullPrice = +appData.screenPrice + appData.allServicePrices;
  },

  getServicePercentPrice: function () {
    appData.servicePercentPrice = appData.fullPrice - appData.fullPrice * (appData.rollback / 100);
  },

  getTitle: function () {
    appData.title = appData.title.trim()[0].toUpperCase() + appData.title.trim().substr(1).toLowerCase();
  },

  getRollbackMessage: function (price) {
    if (price >= 30000) {
      return "Даем скидку в 10%";
    } else if (price >= 15000 && price < 30000) {
      return "Даем скидку в 5%";
    } else if (price >= 0 && price < 15000) {
      return "Скидка не предусмотрена";
    } else {
      return "Что то пошло не так";
    }
  },

  logger: function () {
    console.log(appData.fullPrice);
    console.log(appData.servicePercentPrice);
    console.log(appData.screens);
  },
};

// appData.start();
