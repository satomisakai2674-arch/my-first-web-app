// ここからコードを書いてください
// js/converter.js

export function setupConverter() {
  // 必要なHTML要素を取得する
  const converterForm = document.querySelector(".converter-form"); // フォーム全体
  const inputValue = document.querySelector(".converter-input"); // 入力値のフィールド
  const fromUnit = document.querySelector(".converter-from"); // 変換元の単位選択
  const toUnit = document.querySelector(".converter-to"); // 変換先の単位選択
  const result = document.querySelector(".converter-result"); // 結果表示部分

  // 長さの単位とその基準値（メートルを1とする）を定義する
  const lengthUnit = [
    { name: "meter", base: 1 },
    { name: "kilometer", base: 1000 },
    { name: "centimeter", base: 0.01 },
    { name: "millimeter", base: 0.001 },
    { name: "inch", base: 0.0254 },
    { name: "foot", base: 0.3048 },
    { name: "yard", base: 0.9144 },
    { name: "mile", base: 1609.344 },
  ];

  // セレクトボックスのオプションを初期化する（既存のオプションをクリア）
  fromUnit.innerHTML = "";
  toUnit.innerHTML = "";

  // 定義した単位を元に、セレクトボックスにオプションを追加する
  for (const unit of lengthUnit) {
    fromUnit.innerHTML += `<option value="${unit.base}">${unit.name}</option>`;
    toUnit.innerHTML += `<option value="${unit.base}">${unit.name}</option>`;
  }

  // 初期選択値を設定する（例: Fromをmeter、Toをkilometerに）
  if (fromUnit.options.length > 0) {
    fromUnit.selectedIndex = 0; // 最初の単位 (meter) を選択
  }
  if (toUnit.options.length > 0) {
    toUnit.selectedIndex = 1; // 2番目の単位 (kilometer) を選択
  }

  // 変換を実行する関数
  function convert() {
    const value = parseFloat(inputValue.value); // 入力値を数値に変換

    // 無効な数値が入力された場合のエラーハンドリング
    if (isNaN(value)) {
      result.textContent = "Please enter a valid number";
      return;
    }

    const fromBase = fromUnit.value; // 変換元の単位の基準値を取得
    const toBase = toUnit.value; // 変換先の単位の基準値を取得

    // 変換計算
    const converted = (value * fromBase) / toBase;

    // 結果を小数点以下3桁に丸めて表示
    // 例: 1000 meter = 1.000 kilometer
    result.textContent = `${value} ${lengthUnit[fromUnit.selectedIndex].name} = ${converted.toFixed(3)} ${lengthUnit[toUnit.selectedIndex].name}`;
  }

  // フォームの入力や選択が変更されたときに変換処理を実行する
  converterForm.addEventListener("input", convert);

  // ページ読み込み時に初期値で一度変換を実行する
  convert();
}
