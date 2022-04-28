module.exports = {
  displayName: 'atomic-jotai',
  preset: '../../jest.preset.ts',
  transform: {
    '^.+\\.[tj]sx?$': 'babel-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../coverage/libs/atomic-jotai',
};
