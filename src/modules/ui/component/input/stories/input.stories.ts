
export { RdInput } from './../input';

export default {
	title: 'RdInput',
};

const input = document.createElement('input', { is: 'rd-input' });
input.classList.add('rdInput');

export const Primary = () => input;
