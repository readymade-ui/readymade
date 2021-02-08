import { withKnobs, withWebComponentsKnobs } from '@open-wc/demoing-storybook';

export default {
  title: 'Slider'
};

export const Vertical = () => `
<rd-slider type="vert"></rd-slider>
`;

export const Horizontal = () => `
<rd-slider type="hor"></rd-slider>
`;

export const Joystick = () => `
<rd-slider type="joystick"></rd-slider>
`;
