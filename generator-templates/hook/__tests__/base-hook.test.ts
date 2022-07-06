import {{spacedCurlyBraces name}} from '../{{name}}';
import { renderHook } from '@testing-library/react-hooks';

describe('verify {{name}}', () => {
  test('returns a result', () => {
    const { result } = renderHook(() => {{name}}());
    expect(result.current).toBeTruthy();
  });
});
