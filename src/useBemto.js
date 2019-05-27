import React, { useState, useRef } from 'react';
import { bemto } from '@bemto/core';

const useBemto = (props, options) => {
  const bemtoRef = useRef({});
  bemtoRef.current = bemto(props, options);
  // Would create elements only from the initial options, which is expected.
  const [Elements] = useState(() =>
    Object.keys(bemtoRef.current.elements).reduce((result, name) => {
      const ElName = name.replace('__', ''); // grab a function from core?
      result[ElName] = elProps => {
        if (!bemtoRef.current.elements[name]
          || !bemtoRef.current.elements[name].component) {
          return null;
        }
        const TagName = bemtoRef.current.elements[name].component;
        return <TagName {...bemtoRef.current.getProps(name, elProps)} />;
      };
      result[ElName].displayName = ElName; // TODO: inherit block name when possible?
      return result;
    }, {}));

  return {
    ...Elements,
    getProps: bemtoRef.current.getProps,
    elements: bemtoRef.current.elements,
  };
};

export default useBemto;
