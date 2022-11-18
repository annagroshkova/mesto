const presets = [
  [
    '@babel/preset-env',
    {
      targets: {
        // edge: '17',
        // ie: '11',
        firefox: '50',
        chrome: '100',
        safari: '14.0',
      },
      useBuiltIns: 'entry',
    },
  ],
];

module.exports = { presets };
