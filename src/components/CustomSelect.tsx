// CustomSelect.tsx
import React, {
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
  memo,
} from "react";
import { FC } from "react";
import styles from "./CustomSelect.module.sass";

/**
 * 選択肢のオプションタイプ
 * @property label - 表示テキスト
 * @property value - 選択肢の値
 * @property href - リンク先URL（省略可）
 */
type OptionType = {
  label: string;
  value: string;
  href?: string;
};

/**
 * カスタムセレクトコンポーネントのPropsタイプ
 * @property options - 選択肢の配列
 * @property placeholder - 未選択時に表示するテキスト
 * @property initialValue - 非制御モードでの初期値
 * @property value - 制御モードでの現在の値
 * @property onChange - 選択変更時のコールバック関数
 */
type CustomSelectProps = {
  options: OptionType[];
  placeholder?: string;
  initialValue?: string;
  value?: string; // 制御モードで使用する現在の値
  onChange?: (option: OptionType) => void;
};

/**
 * カスタムセレクトコンポーネント
 * @param options - 選択肢の配列
 * @param placeholder - 未選択時に表示するテキスト
 * @param initialValue - 非制御モードでの初期値
 * @param value - 制御モードでの現在の値
 * @param onChange - 選択変更時のコールバック関数
 * @returns カスタムセレクトコンポーネント
 * @description
 * 制御モードと非制御モードの両方をサポートしている
 * - `value` が渡されている場合は制御モード（親が状態を管理）
 * - `value` が渡されていない場合は非制御モード（コンポーネント内で状態管理）
 */
const CustomSelect: FC<CustomSelectProps> = ({
  options,
  placeholder,
  initialValue,
  value,
  onChange,
}) => {
  // 状態
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<OptionType | null>(null);
  const [focusedIndex, setFocusedIndex] = useState<number>(-1);

  // refs
  const containerRef = useRef<HTMLDivElement>(null);
  const optionsRef = useRef<(HTMLAnchorElement | HTMLDivElement)[]>([]);
  const isInitialRender = useRef(true);

  // 制御モードかどうかの判定
  const isControlled = value !== undefined;

  // メモ化された現在のオプション
  const currentOption = useMemo(() => {
    if (isControlled) {
      return options.find((option) => option.value === value) || null;
    }
    return selectedOption;
  }, [isControlled, options, value, selectedOption]);

  // 初期値または親から渡された値の設定
  useEffect(() => {
    // 制御モードの場合は親からの値を使用
    if (isControlled) {
      const optionToSelect = options.find((option) => option.value === value);
      if (optionToSelect) {
        setSelectedOption(optionToSelect);
      }
      return;
    }

    // 非制御モードかつ初回レンダリング時のみ初期値を適用
    if (isInitialRender.current && initialValue !== undefined) {
      isInitialRender.current = false;
      const initialOption = options.find(
        (option) => option.value === initialValue
      );
      if (initialOption) {
        setSelectedOption(initialOption);
      }
    }
  }, [value, initialValue, options, isControlled]);

  // 選択を変更する共通関数
  const changeSelection = useCallback(
    (option: OptionType) => {
      // 非制御モードの場合のみ内部状態を更新
      if (!isControlled) {
        setSelectedOption(option);
      }

      setIsOpen(false);

      // onChange コールバック実行
      if (onChange) {
        onChange(option);
      }
    },
    [isControlled, onChange]
  );

  // 外部クリックでドロップダウンを閉じる
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  // 選択肢がクリックされたときの処理
  const handleOptionClick = useCallback(
    (option: OptionType, e?: React.MouseEvent) => {
      // href がある場合は通常のナビゲーションを許可
      if (!option.href && e) {
        e.preventDefault();
      }

      changeSelection(option);
    },
    [changeSelection]
  );

  // キーボード操作
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      switch (e.key) {
        case "Enter":
        case " ":
          if (isOpen && focusedIndex >= 0) {
            // オプションリストが開いていて、フォーカスされているオプションがある場合
            changeSelection(options[focusedIndex]);
            e.preventDefault();
          } else {
            // オプションリストが閉じている場合は開く
            setIsOpen(!isOpen);
            setFocusedIndex(-1);
            e.preventDefault();
          }
          break;
        case "Escape":
          setIsOpen(false);
          setFocusedIndex(-1);
          break;
        case "ArrowDown":
          e.preventDefault();
          if (!isOpen) {
            setIsOpen(true);
            setFocusedIndex(0);
          } else {
            setFocusedIndex((prevIndex) => {
              const newIndex =
                prevIndex < options.length - 1 ? prevIndex + 1 : 0;
              // スクロールして要素を表示
              optionsRef.current[newIndex]?.scrollIntoView({
                block: "nearest",
              });
              return newIndex;
            });
          }
          break;
        case "ArrowUp":
          e.preventDefault();
          if (!isOpen) {
            setIsOpen(true);
            setFocusedIndex(options.length - 1);
          } else {
            setFocusedIndex((prevIndex) => {
              const newIndex =
                prevIndex > 0 ? prevIndex - 1 : options.length - 1;
              // スクロールして要素を表示
              optionsRef.current[newIndex]?.scrollIntoView({
                block: "nearest",
              });
              return newIndex;
            });
          }
          break;
        case "Tab":
          if (isOpen) {
            setIsOpen(false);
          }
          break;
      }
    },
    [isOpen, focusedIndex, options, changeSelection]
  );

  // オプションリストが開いた時にフォーカスを設定
  useEffect(() => {
    if (isOpen) {
      // 選択されている項目があれば、その位置にフォーカス
      const selectedIndex = options.findIndex(
        (option) => option.value === currentOption?.value
      );
      setFocusedIndex(selectedIndex >= 0 ? selectedIndex : 0);
    }
  }, [isOpen, options, currentOption]);

  // 選択肢のレンダリング関数
  const renderOption = useCallback(
    (option: OptionType, index: number) => {
      const Tag = option.href ? "a" : "div";
      const isFocused = focusedIndex === index;

      const commonProps = {
        className: `${styles.option} ${isFocused ? styles.focused : ""}`,
        onClick: (e: React.MouseEvent) => handleOptionClick(option, e),
        tabIndex: isOpen ? 0 : -1,
        role: "option",
        "aria-selected": currentOption?.value === option.value,
        ref: (el: HTMLAnchorElement | HTMLDivElement | null) => {
          if (el instanceof HTMLAnchorElement || el instanceof HTMLDivElement) {
            optionsRef.current[index] = el;
          }
        },
      };

      return (
        <Tag
          key={option.value}
          {...commonProps}
          {...(option.href ? { href: option.href } : {})}
        >
          {option.label}
        </Tag>
      );
    },
    [focusedIndex, isOpen, currentOption, handleOptionClick]
  );

  // メモ化されたオプションリスト
  // オプションが変更された場合のみ再レンダリング
  const memoizedOptions = useMemo(() => {
    return options.map((option, index) => renderOption(option, index));
  }, [options, renderOption]);

  return (
    <div
      ref={containerRef}
      className={`${styles.custom_select_container} ${
        isOpen ? styles.open : ""
      }`}
      onKeyDown={handleKeyDown}
    >
      <div
        className={styles.selected_option}
        onClick={() => setIsOpen(!isOpen)}
        tabIndex={0}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className={!currentOption ? styles.placeholder : ""}>
          {currentOption ? currentOption.label : placeholder}
        </span>
        <span className={styles.triangle}></span>
      </div>
      <div
        className={styles.options_list}
        role="listbox"
        aria-activedescendant={
          focusedIndex >= 0
            ? `option-${options[focusedIndex]?.value}`
            : undefined
        }
      >
        {memoizedOptions}
      </div>
    </div>
  );
};

export default memo(CustomSelect);
