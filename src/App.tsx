// App.tsx
import React, { useState } from "react";
import CustomSelect from "./components/CustomSelect.tsx";
import "./App.css";

// リンクあり
const linkOptions = [
  { label: "0歳", value: "0", href: "/age/00/" },
  { label: "1歳", value: "1", href: "/age/01/" },
  { label: "2歳", value: "2", href: "/age/02/" },
  { label: "3歳", value: "3", href: "/age/03/" },
  { label: "4歳", value: "4", href: "/age/04/" },
  { label: "5歳", value: "5", href: "/age/05/" },
  { label: "6歳", value: "6", href: "/age/06/" },
  { label: "7歳", value: "7", href: "/age/07/" },
  { label: "8歳", value: "8", href: "/age/08/" },
  { label: "9歳", value: "9", href: "/age/09/" },
  { label: "10歳", value: "10", href: "/age/10/" },
  { label: "11歳", value: "11", href: "/age/11/" },
  { label: "12歳", value: "12", href: "/age/12/" },
  { label: "13歳", value: "13", href: "/age/13/" },
  { label: "14歳", value: "14", href: "/age/14/" },
  { label: "15歳", value: "15", href: "/age/15/" },
  { label: "16歳", value: "16", href: "/age/16/" },
  { label: "17歳", value: "17", href: "/age/17/" },
  { label: "18歳", value: "18", href: "/age/18/" },
  { label: "19歳", value: "19", href: "/age/19/" },
  { label: "20歳", value: "20", href: "/age/20/" },
  { label: "21歳", value: "21", href: "/age/21/" },
  { label: "22歳", value: "22", href: "/age/22/" },
  { label: "23歳", value: "23", href: "/age/23/" },
  { label: "24歳", value: "24", href: "/age/24/" },
  { label: "25歳", value: "25", href: "/age/25/" },
  { label: "26歳", value: "26", href: "/age/26/" },
  { label: "27歳", value: "27", href: "/age/27/" },
  { label: "28歳", value: "28", href: "/age/28/" },
  { label: "29歳", value: "29", href: "/age/29/" },
  { label: "30歳", value: "30", href: "/age/30/" },
  { label: "31歳", value: "31", href: "/age/31/" },
  { label: "32歳", value: "32", href: "/age/32/" },
  { label: "33歳", value: "33", href: "/age/33/" },
  { label: "34歳", value: "34", href: "/age/34/" },
  { label: "35歳", value: "35", href: "/age/35/" },
  { label: "36歳", value: "36", href: "/age/36/" },
  { label: "37歳", value: "37", href: "/age/37/" },
  { label: "38歳", value: "38", href: "/age/38/" },
  { label: "39歳", value: "39", href: "/age/39/" },
  { label: "40歳", value: "40", href: "/age/40/" },
  { label: "41歳", value: "41", href: "/age/41/" },
  { label: "42歳", value: "42", href: "/age/42/" },
  { label: "43歳", value: "43", href: "/age/43/" },
  { label: "44歳", value: "44", href: "/age/44/" },
  { label: "45歳", value: "45", href: "/age/45/" },
  { label: "46歳", value: "46", href: "/age/46/" },
  { label: "47歳", value: "47", href: "/age/47/" },
  { label: "48歳", value: "48", href: "/age/48/" },
  { label: "49歳", value: "49", href: "/age/49/" },
  { label: "50歳", value: "50", href: "/age/50/" },
  { label: "51歳", value: "51", href: "/age/51/" },
  { label: "52歳", value: "52", href: "/age/52/" },
  { label: "53歳", value: "53", href: "/age/53/" },
  { label: "54歳", value: "54", href: "/age/54/" },
  { label: "55歳", value: "55", href: "/age/55/" },
  { label: "56歳", value: "56", href: "/age/56/" },
  { label: "57歳", value: "57", href: "/age/57/" },
  { label: "58歳", value: "58", href: "/age/58/" },
  { label: "59歳", value: "59", href: "/age/59/" },
  { label: "60歳", value: "60", href: "/age/60/" },
  { label: "61歳", value: "61", href: "/age/61/" },
  { label: "62歳", value: "62", href: "/age/62/" },
  { label: "63歳", value: "63", href: "/age/63/" },
  { label: "64歳", value: "64", href: "/age/64/" },
  { label: "65歳", value: "65", href: "/age/65/" },
  { label: "66歳", value: "66", href: "/age/66/" },
  { label: "67歳", value: "67", href: "/age/67/" },
  { label: "68歳", value: "68", href: "/age/68/" },
  { label: "69歳", value: "69", href: "/age/69/" },
  { label: "70歳", value: "70", href: "/age/70/" },
  { label: "71歳", value: "71", href: "/age/71/" },
  { label: "72歳", value: "72", href: "/age/72/" },
  { label: "73歳", value: "73", href: "/age/73/" },
  { label: "74歳", value: "74", href: "/age/74/" },
  { label: "75歳", value: "75", href: "/age/75/" },
  { label: "76歳", value: "76", href: "/age/76/" },
  { label: "77歳", value: "77", href: "/age/77/" },
  { label: "78歳", value: "78", href: "/age/78/" },
  { label: "79歳", value: "79", href: "/age/79/" },
  { label: "80歳", value: "80", href: "/age/80/" },
  { label: "81歳", value: "81", href: "/age/81/" },
  { label: "82歳", value: "82", href: "/age/82/" },
  { label: "83歳", value: "83", href: "/age/83/" },
  { label: "84歳", value: "84", href: "/age/84/" },
  { label: "85歳", value: "85", href: "/age/85/" },
];

// リンクなし
const unlinkOptions = [
  { label: "選択肢1", value: "option1" },
  { label: "選択肢2", value: "option2" },
  { label: "選択肢3", value: "option3" },
];

const App: React.FC = () => {
  // localStorageから初期値を取得
  const [ageValue, setAgeValue] = useState<string>(() => {
    return localStorage.getItem("age") || "35";
  });

  const [optionValue, setOptionValue] = useState<string>(() => {
    return sessionStorage.getItem("option") || "";
  });

  // 値変更時の処理（localStorageに保存）
  const handleAgeChange = (option: { label: string; value: string }) => {
    setAgeValue(option.value);
    localStorage.setItem("age", option.value);
    console.info(`#1: ${option.label}`);
  };

  // 値変更時の処理（sessionStorageに保存）
  const handleOptionChange = (option: { label: string; value: string }) => {
    setOptionValue(option.value);
    sessionStorage.setItem("option", option.value);
    console.info(`#2: ${option.label}`);
  };

  return (
    <div className="app">
      <h1>React Custom Select App</h1>

      <div className="contents">
        <section>
          <h2>
            #1 with link <br />
            (controlled mode)
            <br />
            <small>localStorageで値を管理</small>
          </h2>
          <CustomSelect
            options={linkOptions}
            value={ageValue}
            onChange={handleAgeChange}
          />
        </section>

        <section>
          <h2>
            #2 without link
            <br /> (controlled mode)
            <br />
            <small>sessionStorageで値を管理</small>
          </h2>
          <CustomSelect
            options={unlinkOptions}
            placeholder="placeholder"
            value={optionValue}
            onChange={handleOptionChange}
          />
        </section>

        {/* 非制御モードの例（コンポーネント内で状態管理） */}
        <section>
          <h2>
            #3 without link <br />
            (non-controlled mode)
            <br />
            <small>コンポーネント内で状態管理</small>
          </h2>
          <CustomSelect
            options={unlinkOptions}
            placeholder="placeholder"
            onChange={(option) => {
              console.info(`#3: ${option.label}`);
            }}
          />
        </section>
      </div>
    </div>
  );
};

export default App;
