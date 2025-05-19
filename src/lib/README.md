# Testing with Vitest

This project uses [Vitest](https://vitest.dev/) for unit testing. Vitest is a Vite-native testing framework that
provides a fast and modern testing experience.

## Running Tests

You can run the tests using the following npm scripts:

```bash
# Run tests once
npm test

# Run tests in watch mode (automatically reruns tests when files change)
npm run test:watch

# Run tests with coverage reporting
npm run test:coverage
```

## Test Files

Test files should be placed alongside the files they are testing, with a `.test.js` or `.spec.js` extension. For
example:

- `src/lib/AstProcessor.js` → `src/lib/AstProcessor.test.js`
- `src/lib/patternParser.js` → `src/lib/patternParser.test.js`

## Writing Tests

Here's an example of a basic test file:

```javascript
import { describe, it, expect } from 'vitest';
import { myFunction } from './myModule';

describe('myModule', () => {
	it('myFunction should return the expected result', () => {
		const result = myFunction(1, 2);
		expect(result).toBe(3);
	});
});
```

### Test Structure

- `describe`: Groups related tests together
- `it` or `test`: Defines a test case
- `expect`: Makes assertions about the code being tested

### Mocking

Vitest provides built-in mocking capabilities:

```javascript
import { describe, it, expect, vi } from 'vitest';
import { myFunction } from './myModule';
import { dependency } from './dependency';

// Mock a module
vi.mock('./dependency', () => ({
	dependency: vi.fn().mockReturnValue('mocked value')
}));

// Spy on a function
vi.spyOn(Math, 'random').mockReturnValue(0.5);

// Create a mock function
const mockFn = vi.fn().mockReturnValue('result');

// Restore all mocks after tests
afterEach(() => {
	vi.restoreAllMocks();
});
```

## Configuration

Vitest is configured in the `vite.config.js` file:

```javascript
export default defineConfig({
	// ... other Vite config
	test: {
		include: ['src/**/*.{test,spec}.{js,ts,svelte}'],
		environment: 'jsdom',
		globals: true
	}
});
```

- `include`: Patterns to match test files
- `environment`: Test environment (jsdom provides a browser-like environment)
- `globals`: When true, allows using test functions like `describe`, `it`, `expect` without importing them

For more information, see the [Vitest documentation](https://vitest.dev/).
