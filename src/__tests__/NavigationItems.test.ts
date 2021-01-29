import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { configure, shallow, ShallowWrapper } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import NavigationItem
    from "../BurgerBuilder/components/Navigation/NavigationItems/NavigationItem/NavigationItem";
import NavigationItems
    from "../BurgerBuilder/components/Navigation/NavigationItems/NavigationItems";
import BurgerApp from "../BurgerBuilder/containers/BurgerApp";

configure({ adapter: new Adapter() });

describe('<NavigationItems />', () => {
    // let component: ShallowWrapper<React.DOMAttributes<Element>,
    // React.Component["state"], React.Component>; beforeEach(() => { const elem =
    // React.createElement(typeof NavigationItems); component = shallow(elem); });
    // test('it should mount', () => { expect(component.length).toBe(1); });  it('should
    // render 2 items', function() {
    // expect(component.find(NavigationItem)).toHaveLength(2); });
});