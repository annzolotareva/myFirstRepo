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
console.log(screens.split());
console.log(fullPrice * (rollback / 100));
