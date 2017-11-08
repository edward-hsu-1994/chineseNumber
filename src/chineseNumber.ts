export function toChineseNumber(value: number): string {
  let chineseNumber = '零壹貳參肆伍陸柒捌玖'.split('');
  let chineseUnitLevel0 = ['', '拾', '佰', '仟'];
  let chineseUnitLevel1 = ['', '萬', '億', '兆', '京'];
  let chineseUnit = [chineseUnitLevel0, chineseUnitLevel1];

  function splitByMod(value: number, mod: number = 10): Array<number> {
    const result = new Array<number>();
    do {
      result.push(value % mod);
      value = Math.floor(value / mod);
    } while (value > 0);
    return result.reverse();
  }

  const outputValues = new Array<string>();
  let inputValues: Array<number>;

  let levelIndex = 0;
  if (value / 10 < 1) {
    return chineseNumber[value];
  } else if (value / Math.pow(10, chineseUnitLevel0.length) < 1) {
    inputValues = splitByMod(value);
  } else {
    inputValues = splitByMod(value, Math.pow(10, chineseUnitLevel0.length));
    levelIndex = 1;
  }

  let previous = 0;
  for (let i = 0; inputValues.length; i++) {
    const unitValue = inputValues.pop();

    if (unitValue === 0) {
      if (previous !== 0) {
        outputValues.push(toChineseNumber(unitValue));
      }
      previous = unitValue;
    } else {
      if (chineseUnit[levelIndex].length <= i) {
        let iCopy = i;
        let units = new Array<string>();
        while (iCopy > 0) {
          let unitTarget = Math.min(iCopy, chineseUnit[levelIndex].length - 1);
          units.push(chineseUnit[levelIndex][unitTarget]);
          iCopy -= unitTarget;
        }
        outputValues.push(toChineseNumber(unitValue) + units.join(''));
      } else {
        outputValues.push(
          toChineseNumber(unitValue) + chineseUnit[levelIndex][i]
        );
      }

      if (
        levelIndex === 1 &&
        inputValues.length > 0 &&
        unitValue / Math.pow(10, chineseUnitLevel0.length - 1) < 1
      ) {
        outputValues.push(chineseNumber[0]);
        previous = 0;
      } else {
        previous = unitValue;
      }
    }
  }

  return outputValues.reverse().join('');
}
