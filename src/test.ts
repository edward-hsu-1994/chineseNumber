import { toChineseNumber } from './chineseNumber';
for (let i = 0; i <= 10; i++) {
  console.log(toChineseNumber(i));
}
for (let i = 0; i <= 10000; i += Math.floor(Math.random() * 1000)) {
  console.log(toChineseNumber(i));
}
