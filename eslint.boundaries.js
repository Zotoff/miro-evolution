// eslint.boundaries.js
import boundaries from 'eslint-plugin-boundaries'

export const eslintBoundariesConfig = {
  files: ['**/*.{ts,tsx}'],
  plugins: { boundaries },
  settings: {
    'boundaries/elements': [
      { type: 'app',      pattern: 'src/app/**' },
      { type: 'features', pattern: 'src/features/*' },
      { type: 'shared',   pattern: 'src/shared/**' },
    ],
  },
  rules: {
    'boundaries/element-types': [2, {
      default: 'allow',
      rules: [
        { from: 'shared',  disallow: ['app', 'features'], message: '…' },
        { from: 'features', disallow: ['app'],            message: '…' },
      ],
    }],
    'boundaries/entry-point': [2, {
      default: 'disallow',
      message: '…',
      rules: [
        { target: ['shared', 'app'], allow: '**' },
        { target: ['features'],      allow: ['index.ts', 'index.tsx', '*.page.tsx'] },
      ],
    }],
  },
}
