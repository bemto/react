import React from "react";
import reactRenderer from "react-test-renderer";
import { useBemto } from "../";

function reactElement(component, props, children) {
  return reactRenderer
    .create(React.createElement(component, props, children))
    .toJSON();
}

const Foo = props => {
  const { Root, Content } = useBemto(props, {
    __Root: "span",
    __Content: "em"
  });
  return React.createElement(
    Root,
    {},
    React.createElement(Content, {}, "Hello, world!")
  );
};

test("Basic react component", () => {
  expect(reactElement(Foo, { className: "Foo" })).toMatchInlineSnapshot(`
                            <span
                              className="Foo"
                            >
                              <em
                                className="Foo__Content"
                              >
                                Hello, world!
                              </em>
                            </span>
              `);
});

test("Basic react component with some passed props and modifiers", () => {
  expect(
    reactElement(Foo, {
      className: "Foo",
      _foo: true,
      _bar: false,
      __Content: {
        title: "Content title"
      }
    })
  ).toMatchInlineSnapshot(`
                    <span
                      className="Foo Foo_foo"
                    >
                      <em
                        className="Foo__Content"
                        title="Content title"
                      >
                        Hello, world!
                      </em>
                    </span>
          `);
});

test("Dynamic props change", () => {
  const initialComponent = React.createElement(Foo, {
    className: "Foo"
  });

  const fooRenderer = reactRenderer.create(initialComponent);
  expect(fooRenderer.toJSON()).toMatchInlineSnapshot(`
            <span
              className="Foo"
            >
              <em
                className="Foo__Content"
              >
                Hello, world!
              </em>
            </span>
      `);

  const updatedComponent1 = React.createElement(Foo, {
    className: "Foo1",
    __Content: { title: "foo" }
  });

  fooRenderer.update(updatedComponent1);
  expect(fooRenderer.toJSON()).toMatchInlineSnapshot(`
        <span
          className="Foo1"
        >
          <em
            className="Foo1__Content"
            title="foo"
          >
            Hello, world!
          </em>
        </span>
    `);

  const updatedComponent2 = React.createElement(Foo, {
    className: "Foo2",
    __Content: null
  });

  fooRenderer.update(updatedComponent2);
  expect(fooRenderer.toJSON()).toMatchInlineSnapshot(`
        <span
          className="Foo2"
        />
    `);
});

const Bar = props => {
  const { Root, Content } = useBemto(props, {
    __Root: "span",
    __Content: Foo
  });
  return React.createElement(Root, {}, React.createElement(Content, {}));
};

test("Component as an element", () => {
  expect(reactElement(Bar, { className: "Bar" })).toMatchInlineSnapshot(`
    <span
      className="Bar"
    >
      <span
        className="Bar__Content"
      >
        <em
          className="Bar__Content__Content"
        >
          Hello, world!
        </em>
      </span>
    </span>
  `);
});
