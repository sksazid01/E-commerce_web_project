import { expect } from "chai";
import React from 'react';



class Foo extends React.Component {
  static propTypes = {
    color: React.PropTypes.oneOf(['red', 'blue', 'green']),
  };
  static defaultProps = {
    color: 'green',
  };
  render() {
    return (
      <div>Foo</div>
    );
  }
}



describe("react", () => {
  it('handles static properties', () => {
    expect(Foo.defaultProps.color).to.equal('green');
  });

  it('constructs an element using JSX', () => {
    const foo = <Foo/>;
    expect(React.isValidElement(foo)).to.equal(true);
  });
});
