import * as esbuild from 'esbuild';

// Custom plugin to handle template literals
const templateLiteralPlugin = {
  name: 'template-literal-minifier',
  setup(build) {
    // Process JS files
    build.onLoad({ filter: /\.js$/ }, async (args) => {
      // Load the original file
      const { path } = args;
      const fs = await import('fs/promises');
      let contents = await fs.readFile(path, 'utf8');
      
      // Find template literals and minify them
      // This regex finds template literals with newlines and extra spaces
      contents = contents.replace(/`([\s\S]*?)`/g, (match, content) => {
        // Minify the content inside template literals
        const minified = content
          .replace(/\s+/g, ' ')  // Replace multiple whitespace with a single space
          .replace(/>\s+</g, '><')  // Remove whitespace between HTML tags
          .trim();  // Remove leading/trailing whitespace
        
        return `\`${minified}\``;
      });
      
      return { contents, loader: 'js' };
    });
  }
};

await esbuild.build({
  entryPoints: ['assets/js/main.js'],
  bundle: true,
  outfile: 'assets/js/bundle.js',
  format: 'esm',
  minify: true,
  minifyWhitespace: true,
  minifySyntax: true,
  minifyIdentifiers: true,
  sourcemap: true,
  treeShaking: true,
  plugins: [templateLiteralPlugin]
});

console.log('Build complete with template literal minification');
