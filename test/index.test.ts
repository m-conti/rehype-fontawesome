import { describe, it, expect } from 'vitest';
import { unified } from 'unified';
import rehypeParse from 'rehype-parse';
import rehypeStringify from 'rehype-stringify';
import rehypeFontAwesome from '../src/index.js';

describe('rehype-fontawesome', () => {
  const createProcessor = (options = {}) =>
    unified()
      .use(rehypeParse, { fragment: true })
      .use(rehypeFontAwesome, options)
      .use(rehypeStringify);

  it('transforms solid Font Awesome shortcodes', async () => {
    const processor = createProcessor();
    const result = await processor.process('<p>Check this out :fa-solid:coffee:</p>');
    
    expect(String(result)).toBe(
      '<p>Check this out <i class="fa-solid fa-coffee" aria-hidden="true"></i></p>'
    );
  });

  it('transforms regular Font Awesome shortcodes', async () => {
    const processor = createProcessor();
    const result = await processor.process('<p>Like this :fa-regular:heart:</p>');
    
    expect(String(result)).toBe(
      '<p>Like this <i class="fa-regular fa-heart" aria-hidden="true"></i></p>'
    );
  });

  it('transforms brands Font Awesome shortcodes', async () => {
    const processor = createProcessor();
    const result = await processor.process('<p>Follow us :fa-brands:github:</p>');
    
    expect(String(result)).toBe(
      '<p>Follow us <i class="fa-brands fa-github" aria-hidden="true"></i></p>'
    );
  });

  it('transforms multiple icons in the same text', async () => {
    const processor = createProcessor();
    const result = await processor.process(
      '<p>I love :fa-solid:coffee: and :fa-regular:heart: coding!</p>'
    );
    
    expect(String(result)).toBe(
      '<p>I love <i class="fa-solid fa-coffee" aria-hidden="true"></i> and <i class="fa-regular fa-heart" aria-hidden="true"></i> coding!</p>'
    );
  });

  it('supports custom class prefix', async () => {
    const processor = createProcessor({ classPrefix: 'icon' });
    const result = await processor.process('<p>Coffee :fa-solid:coffee:</p>');
    
    expect(String(result)).toBe(
      '<p>Coffee <i class="icon-solid icon-coffee" aria-hidden="true"></i></p>'
    );
  });

  it('supports additional CSS classes', async () => {
    const processor = createProcessor({ additionalClasses: ['custom', 'large'] });
    const result = await processor.process('<p>Coffee :fa-solid:coffee:</p>');
    
    expect(String(result)).toBe(
      '<p>Coffee <i class="fa-solid fa-coffee custom large" aria-hidden="true"></i></p>'
    );
  });

  it('ignores text without Font Awesome shortcodes', async () => {
    const processor = createProcessor();
    const result = await processor.process('<p>Just regular text here</p>');
    
    expect(String(result)).toBe('<p>Just regular text here</p>');
  });

  it('handles unknown icon styles gracefully', async () => {
    const processor = createProcessor();
    const result = await processor.process('<p>Unknown :fa-unknown:icon:</p>');
    
    expect(String(result)).toBe(
      '<p>Unknown :fa-unknown:icon:</p>'
    );
  });
});
