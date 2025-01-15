import { expect } from 'chai';


describe('babel', () => {
  it('supports static class properties', () => {
    class Foo {
      static myStatic = 123;
    };
    expect(Foo.myStatic).to.equal(123);
  });


  it('supports class "property initializer"', () => {
    // See:
    //    ES Class Fields & Static Properties
    //    https://github.com/jeffmo/es-class-fields-and-static-properties
    class Foo {
      number = 123;
      func = () => "my-foo";
    };
    const foo1 = new Foo();
    expect(Foo.number).to.equal(undefined);
    expect(Foo.func).to.equal(undefined);
    expect(foo1.number).to.equal(123);
    expect(foo1.func()).to.equal("my-foo");

    foo1.number = 555;
    const foo2 = new Foo();
    expect(foo1.number).to.equal(555);
    expect(foo2.number).to.equal(123);
  });
});
