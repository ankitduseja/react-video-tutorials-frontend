import expect from 'expect';
import { shallow } from 'enzyme';
import React from 'react';

import Footer from '../index';
import A from 'components/A';

describe('<Footer />', () => {
  it('should render the copyright notice', () => {
    const renderedComponent = shallow(
      <Footer />
    );
    expect(renderedComponent.contains(
      <section>
        <p>&copy; 2016 Crossover Videos Tutorials.</p>
      </section>
    )).toEqual(true);
  });

  it('should render the credits', () => {
    const renderedComponent = shallow(<Footer />);
    expect(renderedComponent.contains(
      <section>
        <p>Made with love by <A href="https://ankitduseja.com/">Ankit Duseja</A>.</p>
      </section>
    )).toEqual(true);
  });
});
