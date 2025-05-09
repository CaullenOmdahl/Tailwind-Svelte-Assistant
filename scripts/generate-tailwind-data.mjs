import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { promises as fs } from 'node:fs';

// ESM-compatible __dirname
const __filename = fileURLToPath(import.meta.url);
const currentScriptDir = path.dirname(__filename);

/**
 * Recursively collect all .mdx files from a directory.
 * @param {string} dir
 * @returns {Promise<string[]>}
 */
/**
 * Recursively collect all .mdx files from a directory.
 * Returns an array of file paths.
 */
async function getAllMdxFiles(dir) {
  let files = [];
  try {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        files = files.concat(await getAllMdxFiles(fullPath));
      } else if (entry.isFile() && entry.name.endsWith('.mdx')) {
        files.push(fullPath);
      }
    }
  } catch (err) {
    // Directory may not exist or be readable
    console.error('Error reading directory:', dir, err.message);
    // Fail fast if the root docs directory is missing
    if (dir === path.resolve(currentScriptDir, '../../docs/tailwindcss.com/src/docs/')) {
      process.exit(1);
    }
  }
  return files;
}

/**
 * Extract Tailwind class names and patterns from MDX content.
 * @param {string} content
 * @returns {{
 *   exactClasses: Set<string>,
 *   arbitraryValueStems: Set<string>,
 *   responsivePrefixes: Set<string>,
 *   statePrefixes: Set<string>,
 *   colorNames: Set<string>,
 *   colorShades: Set<string>
 * }}
 */
/**
 * Extract Tailwind class names and patterns from MDX content.
 * Uses regex to find class-like strings, then parses for known patterns.
 * Returns sets of exact classes, arbitrary value stems, prefixes, and colors.
 */
function extractTailwindData(content) {
  // Responsive prefixes (common)
  const responsivePrefixes = [
    'sm:', 'md:', 'lg:', 'xl:', '2xl:'
  ];
  // State prefixes (common)
  const statePrefixes = [
    'hover:', 'focus:', 'active:', 'disabled:', 'visited:', 'dark:', 'group-hover:', 'group-focus:', 'focus-visible:', 'focus-within:', 'checked:', 'first:', 'last:', 'odd:', 'even:', 'aria-', 'peer-', 'open:', 'required:', 'read-only:', 'read-write:', 'placeholder:', 'before:', 'after:'
  ];
  // Color names (from Tailwind default palette, not exhaustive)
  const colorNames = [
    'slate','gray','zinc','neutral','stone','red','orange','amber','yellow','lime','green','emerald','teal','cyan','sky','blue','indigo','violet','purple','fuchsia','pink','rose','black','white','transparent','current'
  ];
  // Color shades (standard Tailwind)
  const colorShades = [
    '50','100','200','300','400','500','600','700','800','900','950'
  ];

  // Arbitrary value stems (common)
  const arbitraryStems = [
    'w-','h-','min-w-','min-h-','max-w-','max-h-','text-','bg-','m-','mx-','my-','mt-','mb-','ml-','mr-','p-','px-','py-','pt-','pb-','pl-','pr-','border-','rounded-','gap-','space-x-','space-y-','z-','inset-','top-','bottom-','left-','right-','shadow-','ring-','outline-','opacity-','flex-','grid-','col-','row-','order-','duration-','delay-','ease-','transition-','scale-','rotate-','translate-','skew-','origin-','cursor-','select-','align-','justify-','content-','items-','self-','place-','overflow-','truncate-','whitespace-','break-','divide-','list-','object-','pointer-','resize-','scroll-','snap-','stroke-','fill-','filter-','backdrop-','blur-','brightness-','contrast-','drop-shadow-','grayscale-','hue-rotate-','invert-','saturate-','sepia-'
  ];

  // 1. Extract all class-like strings (e.g., text-red-500, font-bold, md:text-lg, hover:bg-blue-500)
  //    - Match words with dashes, possibly with colons for prefixes
  //    - Avoid matching markdown links, code blocks, etc. (best effort)
  const classRegex = /(?:class(Name)?=|`|")([^`"\n]*?(?:[a-z][\w-:\/[\]#.%]+)[^`"\n]*?)(?:`|")/gi;

  /** @type {Set<string>} */
  const exactClasses = new Set();
  /** @type {Set<string>} */
  const foundArbitraryStems = new Set();
  /** @type {Set<string>} */
  const foundResponsivePrefixes = new Set();
  /** @type {Set<string>} */
  const foundStatePrefixes = new Set();
  /** @type {Set<string>} */
  const foundColorNames = new Set();
  /** @type {Set<string>} */
  const foundColorShades = new Set();

  // Inline comment: Find all class-like strings and parse for patterns
  let match;
  while ((match = classRegex.exec(content))) {
    const classCandidates = match[2].split(/\s+/);
    for (let candidate of classCandidates) {
      candidate = candidate.trim();
      if (!candidate) continue;

      // Responsive prefix
      for (const prefix of responsivePrefixes) {
        if (candidate.startsWith(prefix)) foundResponsivePrefixes.add(prefix);
      }
      // State prefix
      for (const prefix of statePrefixes) {
        if (candidate.startsWith(prefix)) foundStatePrefixes.add(prefix);
      }
      // Arbitrary value stem (e.g., w-[100px], bg-[#123456])
      const arbitraryMatch = candidate.match(/^([a-z0-9-]+)-\[[^\]]+\]/i);
      if (arbitraryMatch) {
        foundArbitraryStems.add(arbitraryMatch[1] + '-');
      }
      // Color name and shade (e.g., text-red-500)
      const colorMatch = candidate.match(/(?:^|:)([a-z]+)-([a-z]+)-(\d{2,3})$/i);
      if (colorMatch && colorNames.includes(colorMatch[2]) && colorShades.includes(colorMatch[3])) {
        foundColorNames.add(colorMatch[2]);
        foundColorShades.add(colorMatch[3]);
      }
      // Also try to match e.g. bg-red-500, border-blue-200, etc.
      const colorMatch2 = candidate.match(/(?:^|:)([a-z-]+)-([a-z]+)-(\d{2,3})$/i);
      if (colorMatch2 && colorNames.includes(colorMatch2[2]) && colorShades.includes(colorMatch2[3])) {
        foundColorNames.add(colorMatch2[2]);
        foundColorShades.add(colorMatch2[3]);
      }
      // Add to exact classes if it looks like a Tailwind class (contains dash, not just a prefix)
      if (candidate.includes('-') && !candidate.endsWith(':')) {
        exactClasses.add(candidate);
      }
    }
  }

  // Inline comment: Scan for arbitrary value stems in the content (e.g., w-[, text-[, bg-[)
  for (const stem of arbitraryStems) {
    const regex = new RegExp(`${stem.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')}\\[`, 'g');
    if (regex.test(content)) {
      foundArbitraryStems.add(stem);
    }
  }

  // Add all known responsive/state prefixes if found anywhere in content
  for (const prefix of responsivePrefixes) {
    if (content.includes(prefix)) foundResponsivePrefixes.add(prefix);
  }
  for (const prefix of statePrefixes) {
    if (content.includes(prefix)) foundStatePrefixes.add(prefix);
  }

  // Add all known color names/shades if found anywhere in content
  for (const color of colorNames) {
    if (content.includes(color + '-')) foundColorNames.add(color);
  }
  for (const shade of colorShades) {
    if (content.includes('-' + shade)) foundColorShades.add(shade);
  }

  return {
    exactClasses,
    arbitraryValueStems: foundArbitraryStems,
    responsivePrefixes: foundResponsivePrefixes,
    statePrefixes: foundStatePrefixes,
    colorNames: foundColorNames,
    colorShades: foundColorShades
  };
}

async function main() {
  // Path to docs relative to this script
  // Updated to resolve from project root (process.cwd())
  const docsDir = path.resolve(process.cwd(), './docs/tailwindcss.com/src/docs/');
  const distDir = path.resolve(process.cwd(), './dist');
  const outputFile = path.join(distDir, 'valid_tailwind_classes.json');

  let allFiles;
  try {
    allFiles = await getAllMdxFiles(docsDir);
    if (!allFiles.length) throw new Error('No .mdx files found in docs directory.');
  } catch (err) {
    console.error('Error reading documentation directory:', err.message);
    process.exit(1);
  }

  // Aggregate sets
  const exactClasses = new Set();
  const arbitraryValueStems = new Set();
  const responsivePrefixes = new Set();
  const statePrefixes = new Set();
  const colorNames = new Set();
  const colorShades = new Set();

  for (const file of allFiles) {
    let content;
    try {
      content = await fs.readFile(file, 'utf8');
    } catch (err) {
      console.warn('Could not read file:', file, err.message);
      continue;
    }
    const data = extractTailwindData(content);
    data.exactClasses.forEach(c => exactClasses.add(c));
    data.arbitraryValueStems.forEach(c => arbitraryValueStems.add(c));
    data.responsivePrefixes.forEach(c => responsivePrefixes.add(c));
    data.statePrefixes.forEach(c => statePrefixes.add(c));
    data.colorNames.forEach(c => colorNames.add(c));
    data.colorShades.forEach(c => colorShades.add(c));
  }

  // Compose output
  const output = {
    exactClasses: Array.from(exactClasses).sort(),
    arbitraryValueStems: Array.from(arbitraryValueStems).sort(),
    responsivePrefixes: Array.from(responsivePrefixes).sort(),
    statePrefixes: Array.from(statePrefixes).sort(),
    colorNames: Array.from(colorNames).sort(),
    colorShades: Array.from(colorShades).sort()
  };

  // Ensure dist directory exists
  try {
    await fs.mkdir(distDir, { recursive: true });
  } catch (err) {
    console.error('Could not create dist directory:', err.message);
    process.exit(1);
  }

  // Write JSON
  try {
    await fs.writeFile(outputFile, JSON.stringify(output, null, 2), 'utf8');
    console.log('Tailwind class data generated at:', outputFile);
  } catch (err) {
    console.error('Could not write output file:', err.message);
    process.exit(1);
  }
}

main().catch(err => {
  console.error('Unexpected error:', err);
  process.exit(1);
});