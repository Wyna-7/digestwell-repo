import * as matchers from '@testing-library/jest-dom/matchers';
import { expect } from 'vitest';
import fetch from 'node-fetch';

globalThis.fetch = fetch;

expect.extend(matchers);
