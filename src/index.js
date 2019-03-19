// eslint-disable-next-line func-names
module.exports = function check(str, bracketsConfig) {
  let curObj = {
    needClose: null,
  };
  let pointer = 0;
  let isCorrect = true;

  const getNextLevelObj = (parent, bracetsType) => {
    return {
      parent,
      needClose: bracetsType,
    };
  };

  const getPrevLevelObj = (obj) => obj.parent;

  while (pointer < str.length) {
    const char = str[pointer];
    const bracetsIndex = bracketsConfig.findIndex(subArr => subArr.includes(char));

    if (bracketsConfig[bracetsIndex][0] === bracketsConfig[bracetsIndex][1]) {
      if (curObj.needClose === bracetsIndex) {
        curObj = getPrevLevelObj(curObj);
      } else {
        curObj = getNextLevelObj(curObj, bracetsIndex);
      }
    } else if (bracketsConfig[bracetsIndex].indexOf(char) === 0) {
      curObj = getNextLevelObj(curObj, bracetsIndex);
    } else if (
      bracketsConfig[bracetsIndex].indexOf(char) === 1 // если символ - закрывающая скобка и её ожидали, то возвращаемся к родителю, иначе ошибка
      && curObj.needClose === bracetsIndex
    ) {
      curObj = getPrevLevelObj(curObj);
    } else {
      isCorrect = false;
      break;
    }

    pointer += 1;
  }

  if (curObj.needClose !== null) { // если не вернулись к родителю, то что-то не закрыто
    isCorrect = false;
  }
  return isCorrect;
};
