"use strict";

const title = document.getElementsByTagName("h1")[0];
const buttonPlus = document.querySelector(".screen-btn");
const otherItemsPercent = document.querySelectorAll(".other-items.percent");
const otherItemsNumber = document.querySelectorAll(".other-items.number");

const inputRange = document.querySelector(".rollback input");
let inputRangeValue = document.querySelector(".rollback .range-value");

const startBtn = document.getElementsByClassName("handler_btn")[0];
const resetBtn = document.getElementsByClassName("handler_btn")[1];

const total = document.getElementsByClassName("total-input")[0];
const totalCount = document.getElementsByClassName("total-input")[1];
const totalCountOther = document.getElementsByClassName("total-input")[2];
const fullTotalCount = document.getElementsByClassName("total-input")[3];
const totalCountRollback = document.getElementsByClassName("total-input")[4];

let screens = document.querySelectorAll(".screen");

const appData = {
  title: "",
  screens: [],
  countOfScreens: 0,
  screenPrice: 0,
  adaptive: true,
  rollback: 0,
  servicePricesPersent: 0,
  servicePricesNumber: 0,
  fullPrice: 0,
  servicePercentPrice: 0,
  servicesPersent: {},
  servicesNumber: {},

  init: function () {
    appData.addTitle();
    startBtn.addEventListener("click", (event) => {
      event.preventDefault();
      appData.checkValues();
    });
    buttonPlus.addEventListener("click", appData.addScreenBlock);
    inputRange.addEventListener("input", appData.changeValueRollback);
  },

  addTitle: function () {
    document.title = title.textContent;
  },
  start: function () {
    appData.addScreens();
    appData.addServices();
    appData.addPrices();
    appData.showResult();
    // appData.getServicePercentPrice();
    // appData.logger();
  },
  changeValueRollback: function (event) {
    inputRangeValue.textContent = event.target.value + "%";
    appData.rollback = event.target.value;
  },
  showResult: function () {
    total.value = appData.screenPrice;
    totalCountOther.value = appData.servicePricesPersent + appData.servicePricesNumber;
    fullTotalCount.value = appData.fullPrice;
    totalCountRollback.value = appData.servicePercentPrice;
    totalCount.value = appData.countOfScreens;
  },

  addScreens: function () {
    screens.forEach(function (screen, index) {
      const select = screen.querySelector("select");
      const input = screen.querySelector("input");
      const selectName = select.options[select.selectedIndex].textContent;
      appData.screens.push({
        id: index,
        name: selectName,
        price: +select.value * +input.value,
        count: +input.value,
      });
    });
  },
  addServices: function () {
    otherItemsPercent.forEach(function (item) {
      const check = item.querySelector("input[type=checkbox]");
      const label = item.querySelector("label");
      const input = item.querySelector("input[type=text]");

      if (check.checked) {
        appData.servicesPersent[label.textContent] = +input.value;
      }
    });

    otherItemsNumber.forEach(function (item) {
      const check = item.querySelector("input[type=checkbox]");
      const label = item.querySelector("label");
      const input = item.querySelector("input[type=text]");

      if (check.checked) {
        appData.servicesNumber[label.textContent] = +input.value;
      }
    });
  },
  isError: false,
  checkValues: function () {
    appData.isError = false;
    screens = document.querySelectorAll(".screen");
    screens.forEach((screen) => {
      const select = screen.querySelector("select");
      const input = screen.querySelector("input[type=text]");
      if (input.value.trim() === "" || select.value === "") {
        appData.isError = true;
      }
    });
    if (!appData.isError) {
      appData.start();
    }
  },

  addScreenBlock: function () {
    const cloneScreen = screens[0].cloneNode(true);
    screens[screens.length - 1].after(cloneScreen);
  },

  addPrices: function () {
    for (let screen of appData.screens) {
      appData.screenPrice += +screen.price;
      appData.countOfScreens += +screen.count;
    }

    for (let key in appData.servicesNumber) {
      appData.servicePricesNumber += appData.servicesNumber[key];
    }

    for (let key in appData.servicesPersent) {
      appData.servicePricesPersent += appData.screenPrice * (appData.servicesPersent[key] / 100);
    }

    appData.fullPrice = +appData.screenPrice + appData.servicePricesNumber + appData.servicePricesPersent;
    appData.servicePercentPrice = appData.fullPrice - appData.fullPrice * (appData.rollback / 100);
  },

  logger: function () {
    console.log(appData.fullPrice);
    console.log(appData.servicePercentPrice);
    console.log(appData.screens);
  },
};

appData.init();
