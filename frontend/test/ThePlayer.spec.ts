import { describe, it, expect } from 'vitest';

import { mount } from '@vue/test-utils';
import ThePlayer from '../src/components/ThePlayer.vue';

describe('ThePlayer', () => {
  it('renders properly', () => {
    const wrapper = mount(ThePlayer, { props: { name: 'Me' } });
    expect(wrapper.text()).toContain('Me');
  });
});
