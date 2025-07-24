import { visit } from 'unist-util-visit';
import type { Element, Text, Root } from 'hast';

interface FontAwesomeOptions {
  /**
   * Custom class prefix for Font Awesome icons
   * @default 'fa'
   */
  classPrefix?: string;

  /**
   * Additional CSS classes to add to all icons
   * @default []
   */
  additionalClasses?: string[];
}

/**
 * Rehype plugin to transform Font Awesome shortcodes into HTML elements.
 *
 * Transforms shortcodes like `:fa-solid:coffee:` into `<i class="fa-fas fa-coffee" aria-hidden="true"></i>`
 *
 * @param options - Plugin configuration options
 * @returns Rehype transformer function
 *
 * @example
 * ```typescript
 * import { rehype } from 'rehype';
 * import rehypeFontAwesome from 'rehype-fontawesome';
 *
 * const processor = rehype()
 *   .use(rehypeFontAwesome)
 *   .use(rehypeStringify);
 * ```
 */
export default function rehypeFontAwesome(options: FontAwesomeOptions = {}) {
  const { classPrefix = 'fa', additionalClasses = [] } = options;

  // Regex to match Font Awesome shortcodes: :fa-style:iconname:
  const FA_REGEX = /:fa-(solid|regular|brands):([a-zA-Z0-9-]+):/g;

  const processTextNode = (text: string): (Text | Element)[] => {
    const nodes: (Text | Element)[] = [];
    let lastIndex = 0;

    // Use matchAll for modern iteration over all matches
    for (const match of text.matchAll(FA_REGEX)) {
      const [fullMatch, style, iconName] = match;
      const startIndex = match.index ?? 0;

      // Add text before the icon if any exists
      if (startIndex > lastIndex) {
        nodes.push({
          type: 'text',
          value: text.slice(lastIndex, startIndex)
        });
      }

      // Create CSS classes array
      const cssClasses = [
        `${classPrefix}-${style}`,
        `${classPrefix}-${iconName}`,
        ...additionalClasses
      ];

      // Create the Font Awesome icon element
      nodes.push({
        type: 'element',
        tagName: 'i',
        properties: {
          className: cssClasses,
          'aria-hidden': 'true'
        },
        children: []
      });

      lastIndex = startIndex + fullMatch.length;
    }

    // Add remaining text if any exists
    if (lastIndex < text.length) {
      nodes.push({
        type: 'text',
        value: text.slice(lastIndex)
      });
    }

    return nodes.length > 0 ? nodes : [{ type: 'text', value: text }];
  };

  // Return the transformer function
  return (tree: Root) => {
    visit(tree, 'text', (node: Text, index: number | undefined, parent) => {
      if (!parent || index === undefined || !('children' in parent)) return;

      const processed = processTextNode(node.value);

      // Replace only if we found Font Awesome icons
      if (processed.length > 1 || processed[0]?.type === 'element') {
        parent.children.splice(index, 1, ...processed);
      }
    });
  };
}

export type { FontAwesomeOptions };
