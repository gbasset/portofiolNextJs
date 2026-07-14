declare module 'react-select' {
  import { ComponentType, ReactNode, CSSProperties } from 'react';

  export interface OptionTypeBase {
    value: string;
    label: string;
  }

  export type StylesConfigFunction<T = CSSProperties> = (
    base: T,
    state: Record<string, unknown>,
  ) => T;

  export interface StylesConfig {
    control?: StylesConfigFunction;
    valueContainer?: StylesConfigFunction;
    menu?: StylesConfigFunction;
    menuList?: StylesConfigFunction;
    option?: StylesConfigFunction;
    multiValue?: StylesConfigFunction;
    multiValueLabel?: StylesConfigFunction;
    multiValueRemove?: StylesConfigFunction;
    placeholder?: StylesConfigFunction;
    input?: StylesConfigFunction;
    indicatorSeparator?: StylesConfigFunction;
    dropdownIndicator?: StylesConfigFunction;
    clearIndicator?: StylesConfigFunction;
    noOptionsMessage?: StylesConfigFunction;
    [key: string]: StylesConfigFunction | undefined;
  }

  export interface SelectComponentsConfig {
    [key: string]: ComponentType<Record<string, unknown>>;
  }

  export interface SelectProps<OptionType = OptionTypeBase> {
    options?: OptionType[];
    value?: OptionType | OptionType[] | null;
    onChange?: (value: OptionType[] | null) => void;
    isMulti?: boolean;
    isClearable?: boolean;
    closeMenuOnSelect?: boolean;
    styles?: StylesConfig;
    classNamePrefix?: string;
    components?: SelectComponentsConfig;
    placeholder?: ReactNode;
    noOptionsMessage?: (obj: { inputValue: string }) => ReactNode;
    [key: string]: unknown;
  }

  const Select: ComponentType<SelectProps>;
  export default Select;
}

declare module 'react-select/animated' {
  import { SelectComponentsConfig } from 'react-select';
  function makeAnimated(): SelectComponentsConfig;
  export default makeAnimated;
}

declare module 'react-awesome-slider' {
  import { ComponentType, HTMLAttributes } from 'react';

  interface AwesomeSliderProps extends HTMLAttributes<HTMLDivElement> {
    play?: boolean;
    cancelOnInteraction?: boolean;
    interval?: number;
    children?: React.ReactNode;
    [key: string]: unknown;
  }

  const AwesomeSlider: ComponentType<AwesomeSliderProps>;
  export default AwesomeSlider;
}

declare module 'react-awesome-slider/dist/autoplay' {
  import { ComponentType } from 'react';

  interface WithAutoplayOptions {
    play?: boolean;
    cancelOnInteraction?: boolean;
    interval?: number;
  }

  function withAutoplay<T>(Component: ComponentType<T>): ComponentType<T & WithAutoplayOptions>;
  export default withAutoplay;
}

declare module 'react-awesome-slider/dist/styles.css' {
  const content: Record<string, string>;
  export default content;
}
