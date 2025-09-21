import '@testing-library/jest-dom';

// Mock HTMLAudioElement
Object.defineProperty(window, 'HTMLAudioElement', {
  writable: true,
  value: jest.fn().mockImplementation(() => ({
    play: jest.fn(() => Promise.resolve()),
    pause: jest.fn(),
    load: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    currentTime: 0,
    duration: 0,
    volume: 1,
    src: '',
  })),
});

// Mock Web Audio API
Object.defineProperty(window, 'AudioContext', {
  writable: true,
  value: jest.fn().mockImplementation(() => ({
    createMediaElementSource: jest.fn(),
    createGain: jest.fn(),
    destination: {},
  })),
});

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

// Mock navigator.clipboard
Object.defineProperty(navigator, 'clipboard', {
  value: {
    writeText: jest.fn(() => Promise.resolve()),
    readText: jest.fn(() => Promise.resolve('')),
  },
  writable: true,
});

// Mock navigator.share
Object.defineProperty(navigator, 'share', {
  value: jest.fn(() => Promise.resolve()),
  writable: true,
});

// Mock service worker
Object.defineProperty(navigator, 'serviceWorker', {
  value: {
    register: jest.fn(() => Promise.resolve({})),
    ready: Promise.resolve({}),
  },
  writable: true,
});

// Suppress console errors in tests
const originalError = console.error;
beforeAll(() => {
  console.error = (...args: any[]) => {
    if (
      typeof args[0] === 'string' &&
      args[0].includes('Warning: ReactDOM.render is deprecated')
    ) {
      return;
    }
    originalError.call(console, ...args);
  };
});

afterAll(() => {
  console.error = originalError;
});