import { act, cleanup, renderHook } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { useSlider } from '../src/hooks/useSlider';

afterEach(cleanup);

describe('useSlider', () => {
  it('steps through positions and stops at either end', () => {
    const { result } = renderHook(() => useSlider(3));
    expect(result.current).toMatchObject({ slide: 0, atStart: true, atEnd: false });
    act(() => result.current.step(-1));
    expect(result.current.slide).toBe(0);
    act(() => {
      result.current.step(1);
      result.current.step(1);
      result.current.step(1);
    });
    expect(result.current).toMatchObject({ slide: 2, atStart: false, atEnd: true });
    act(() => result.current.step(-1));
    expect(result.current.slide).toBe(1);
  });

  it('jumps to an indicator and clamps out-of-range indices', () => {
    const { result } = renderHook(() => useSlider(4));
    act(() => result.current.goTo(2));
    expect(result.current.slide).toBe(2);
    act(() => result.current.goTo(10));
    expect(result.current.slide).toBe(3);
    act(() => result.current.goTo(-1));
    expect(result.current.slide).toBe(0);
  });

  it('clamps after resizing and steps from the visible position', () => {
    const { result, rerender } = renderHook(({ count }) => useSlider(count), { initialProps: { count: 4 } });
    act(() => result.current.goTo(3));
    rerender({ count: 2 });
    expect(result.current).toMatchObject({ slide: 1, atEnd: true });
    act(() => result.current.step(-1));
    expect(result.current.slide).toBe(0);
    rerender({ count: 0 });
    expect(result.current).toMatchObject({ slide: 0, atStart: true, atEnd: true });
  });

  it('keeps independent slider instances separate', () => {
    const { result } = renderHook(() => [useSlider(3), useSlider(3)] as const);
    act(() => result.current[0].step(1));
    expect(result.current.map(({ slide }) => slide)).toEqual([1, 0]);
  });
});
