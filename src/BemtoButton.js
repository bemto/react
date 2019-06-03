import React from 'react';
import { button } from '@bemto/components';

const getButtonStyles = () => ({
  default: button.styles,
});

const ButtonComponent = (props) => {
  const {
    RootTagName,
    __Root, __Content, __BLHelper, __Before, __After, __Text, __Focus,
  } = button.apply(props);
  return (
    <RootTagName {...__Root}>
      <span {...__Content}>
        {__BLHelper && <span {...__BLHelper} />}
        {__Before && <span {...__Before} />}
        {__After && <span {...__After} />}
        <span {...__Text} />
      </span>
      <span {...__Focus} />
    </RootTagName>
  );
};

export { getButtonStyles, ButtonComponent };
