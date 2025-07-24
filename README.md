# rehype-fontawesome

A [rehype](https://github.com/rehypejs/rehype) plugin to transform Font Awesome shortcodes into HTML elements.

## Installation

```bash
npm install rehype-fontawesome
# or
yarn add rehype-fontawesome
# or
pnpm add rehype-fontawesome
```

## Usage

This plugin transforms Font Awesome shortcodes like `:fa-solid:coffee:` into HTML `<i>` elements with the appropriate CSS classes.

### Basic Usage

```typescript
import { unified } from 'unified';
import rehypeParse from 'rehype-parse';
import rehypeStringify from 'rehype-stringify';
import rehypeFontAwesome from 'rehype-fontawesome';

import "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.0.0/css/all.min.css";

const processor = unified()
  .use(rehypeParse)
  .use(rehypeFontAwesome)
  .use(rehypeStringify);

const result = await processor.process('<p>I love :fa-solid:coffee: and coding!</p>');
console.log(String(result));
// Output: <p>I love <i class="fa-solid fa-coffee" aria-hidden="true"></i> and coding!</p>
```

### With Markdown

```typescript
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeFontAwesome from 'rehype-fontawesome';
import rehypeStringify from 'rehype-stringify';

import "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.0.0/css/all.min.css";

const processor = unified()
  .use(remarkParse)
  .use(remarkRehype)
  .use(rehypeFontAwesome)
  .use(rehypeStringify);

const result = await processor.process('# Hello :fa-solid:world:');
```

## Shortcode Format

The plugin recognizes shortcodes in the format `:fa-{style}:{icon-name}:`

### Supported Styles

- `solid` → `fa-solid` (Font Awesome Solid)
- `regular` → `fa-regular` (Font Awesome Regular) 
- `brands` → `fa-brands` (Font Awesome Brands)

### Examples

- `:fa-solid:coffee:` → `<i class="fa-solid fa-coffee" aria-hidden="true"></i>`
- `:fa-regular:heart:` → `<i class="fa-regular fa-heart" aria-hidden="true"></i>`
- `:fa-brands:github:` → `<i class="fa-brands fa-github" aria-hidden="true"></i>`

## Options

### `classPrefix`

- Type: `string`
- Default: `'fa'`

Custom class prefix for Font Awesome icons.

```typescript
.use(rehypeFontAwesome, { classPrefix: 'icon' })

// :fa-solid:coffee: → <i class="icon-solid icon-coffee" aria-hidden="true"></i>
```

### `additionalClasses`

- Type: `string[]`
- Default: `[]`

Additional CSS classes to add to all icons.

```typescript
.use(rehypeFontAwesome, { additionalClasses: ['custom', 'large'] })

// :fa-solid:coffee: → <i class="fa-solid fa-coffee custom large" aria-hidden="true"></i>
```

## TypeScript

This package includes TypeScript declarations and supports both CommonJS and ES modules.

```typescript
import rehypeFontAwesome, { FontAwesomeOptions } from 'rehype-fontawesome';

const options: FontAwesomeOptions = {
  classPrefix: 'icon',
  additionalClasses: ['custom']
};
```

## Requirements

- Node.js 16 or higher
- `unist-util-visit` (peer dependency)

## License

MIT © [Your Name]

## Contributing

Issues and pull requests are welcome! Please check the existing issues before creating a new one.

## Related

- [rehype](https://github.com/rehypejs/rehype) - HTML processor powered by plugins
- [Font Awesome](https://fontawesome.com/) - The web's most popular icon set
- [unist-util-visit](https://github.com/syntax-tree/unist-util-visit) - Utility to visit nodes
