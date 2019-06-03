import React, { useState } from 'react';
import { input } from '@bemto/components';

const getInputStyles = css => ({
  default: input.styles,
  focus: styles => input.focusStyles(styles, css),
  hover: styles => input.hoverStyles(styles, css),
  hocus: styles => input.hocusStyles(styles, css),
});

const InputComponent = ({
  value,
  defaultValue,
  onChange,
  onFocus,
  onBlur,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [val, setVal] = useState(value || defaultValue);
  const isEmpty = !val;

  const {
    RootTagName, ControllerTagName,
    __Root,
    __OuterBefore,
    __Layout,
    __View,
    __Before,
    __ControllerWrap,
    __Placeholder,
    __PlaceholderHint,
    __Controller,
    __After,
    __OuterAfter,
  } = input.apply({
    ...props,
    value,
    defaultValue,
    _focus: isFocused,
    _empty: isEmpty,
    onChange: (e) => {
      if (val !== e.target.value) {
        if (onChange) onChange(e);
        setVal(e.target.value);
      }
    },
    onFocus: (e) => {
      if (onFocus) onFocus(e);
      setIsFocused(true);
    },
    onBlur: (e) => {
      if (onBlur) onBlur(e);
      setIsFocused(false);
    },
  });

  return (
    <RootTagName {...__Root}>
      {__OuterBefore && <span {...__OuterBefore} />}
      <label {...__Layout}>
        <span {...__View} />
        {__Before && <span {...__Before} />}
        <span {...__ControllerWrap}>
          {__Placeholder && <span {...__Placeholder} />}
          {__PlaceholderHint && <span {...__PlaceholderHint} />}
          <ControllerTagName {...__Controller} />
        </span>
        {__After && <span {...__After} />}
      </label>
      {__OuterAfter && <span {...__OuterAfter} />}
    </RootTagName>
  );
};

export { getInputStyles, InputComponent };
