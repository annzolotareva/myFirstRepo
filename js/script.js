"use strict";

const title = document.getElementsByTagName("h1")[0];
const buttonPlus = document.querySelector(".screen-btn");
const otherItemsPercent = document.querySelectorAll(".other-items.percent");
const otherItemsNumber = document.querySelectorAll(".other-items.number");

const inputRange = document.querySelector(".rollback input");
let inputRangeValue = document.querySelector(".rollback .range-value");

const startBtn = document.getElementsByClassName("handler_btn")[0];
const resetBtn = document.getElementsByClassName("handler_btn")[1];

const totalInputs = document.querySelectorAll(".total-input");
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
  isError: false,

  init: function () {
    this.addTitle();

    startBtn.addEventListener("click", (event) => {
      event.preventDefault();
      this.checkValues();
      if (!this.isError) {
        this.disable();
      }
    });

    resetBtn.addEventListener("click", (event) => {
      event.preventDefault();
      this.reset();
      this.undisable();
    });
    buttonPlus.addEventListener("click", this.addScreenBlock);
    inputRange.addEventListener("input", this.changeValueRollback);
  },

  disable: function () {
    screens.forEach((screen) => {
      const select = screen.querySelector("select");
      const input = screen.querySelector("input");
      select.disabled = true;
      input.disabled = true;
    });
    buttonPlus.disabled = true;
    startBtn.style.display = "none";
    resetBtn.style.display = "block";
  },

  undisable: function () {
    screens.forEach((screen) => {
      const select = screen.querySelector("select");
      const input = screen.querySelector("input");
      select.disabled = false;
      input.disabled = false;
    });
    buttonPlus.disabled = false;
    startBtn.style.display = "block";
    resetBtn.style.display = "none";
  },

  addTitle: function () {
    document.title = title.textContent;
  },

  start: function () {
    this.addScreens();
    this.addServices();
    this.addPrices();
    this.showResult();
    // this.getServicePercentPrice();
    // this.logger();
  },

  reset: function () {
    let tempScreens = [];
    screens.forEach((screen, index) => {
      if (index == 0) {
        screen.querySelector("select").value = "";
        screen.querySelector("input").value = "";
        tempScreens.push(screen);
      } else {
        screen.remove();
      }
    });
    screens = tempScreens;

    totalInputs.forEach((input) => {
      input.value = 0;
    });

    this.screens = [];
    this.screenPrice = 0;
    this.servicePricesPersent = 0;
    this.servicePricesNumber = 0;
    this.fullPrice = 0;
    this.servicePercentPrice = 0;
    this.countOfScreens = 0;
    this.servicesPersent = {};
    this.servicesNumber = {};
  },

  changeValueRollback: function (event) {
    inputRangeValue.textContent = event.target.value + "%";
    this.rollback = event.target.value;
  },
  showResult: function () {
    total.value = this.screenPrice;
    totalCountOther.value = this.servicePricesPersent + this.servicePricesNumber;
    fullTotalCount.value = this.fullPrice;
    totalCountRollback.value = this.servicePercentPrice;
    totalCount.value = this.countOfScreens;
  },

  addScreens: function () {
    screens.forEach((screen, index) => {
      const select = screen.querySelector("select");
      const input = screen.querySelector("input");
      const selectName = select.options[select.selectedIndex].textContent;
      this.screens.push({
        id: index,
        name: selectName,
        price: +select.value * +input.value,
        count: +input.value,
      });
    });
  },
  addServices: function () {
    otherItemsPercent.forEach((item) => {
      const check = item.querySelector("input[type=checkbox]");
      const label = item.querySelector("label");
      const input = item.querySelector("input[type=text]");

      if (check.checked) {
        this.servicesPersent[label.textContent] = +input.value;
      }
    });

    otherItemsNumber.forEach((item) => {
      const check = item.querySelector("input[type=checkbox]");
      const label = item.querySelector("label");
      const input = item.querySelector("input[type=text]");

      if (check.checked) {
        this.servicesNumber[label.textContent] = +input.value;
      }
    });
  },

  checkValues: function () {
    this.isError = false;
    screens = document.querySelectorAll(".screen");
    screens.forEach((screen, i) => {
      const select = screen.querySelector("select");
      const input = screen.querySelector("input");
      if (input.value.trim() === "" || select.value === "") {
        this.isError = true;
      }
    });
    if (!this.isError) {
      this.start();
    } else {
      alert("Заполните поля!");
    }
  },

  addScreenBlock: function () {
    screens = document.querySelectorAll(".screen");
    const cloneScreen = screens[0].cloneNode(true);
    cloneScreen.querySelector("input").value = "";
    screens[screens.length - 1].after(cloneScreen);
  },

  addPrices: function () {
    for (let screen of this.screens) {
      this.screenPrice += +screen.price;
      this.countOfScreens += +screen.count;
    }

    for (let key in this.servicesNumber) {
      this.servicePricesNumber += this.servicesNumber[key];
    }

    for (let key in this.servicesPersent) {
      this.servicePricesPersent += this.screenPrice * (this.servicesPersent[key] / 100);
    }

    this.fullPrice = +this.screenPrice + this.servicePricesNumber + this.servicePricesPersent;
    this.servicePercentPrice = this.fullPrice - this.fullPrice * (this.rollback / 100);
  },

  logger: function () {
    console.log(this.fullPrice);
    console.log(this.servicePercentPrice);
    console.log(this.screens);
  },
};

appData.init();
