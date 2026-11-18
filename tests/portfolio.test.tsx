import { act, cleanup, fireEvent, render, screen, within } from '@testing-library/react';
import { afterEach, expect, it, vi } from 'vitest';

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

async function openPortfolio(url: string, width = 1280) {
  vi.resetModules();
  vi.stubGlobal('matchMedia', (media: string) => ({
    media,
    matches: width >= Number(media.match(/\d+/)?.[0]),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  }));
  window.history.replaceState(null, '', url);
  const { default: App } = await import('../src/App');
  return render(<App />);
}

function navigate(hash: string) {
  act(() => {
    window.history.pushState(null, '', hash);
    window.dispatchEvent(new HashChangeEvent('hashchange'));
  });
}

it('selects Russian by default and updates the active navigation item', async () => {
  await openPortfolio('/');
  expect(screen.getByRole('heading', { name: 'Никита Ворожищев' })).toBeDefined();
  expect(document.documentElement.lang).toBe('ru');
  expect(screen.getByRole('link', { name: 'Главная' }).getAttribute('aria-current')).toBe('page');
  navigate('#about');
  expect(screen.getByRole('heading', { name: 'Обо мне' })).toBeDefined();
  expect(screen.getByRole('link', { name: 'Обо мне' }).getAttribute('aria-current')).toBe('page');
  navigate('#unknown');
  expect(screen.getByRole('heading', { name: 'Никита Ворожищев' })).toBeDefined();
});

it('supports the legacy English address and enables layout debug when requested', async () => {
  await openPortfolio('/?name=en&debug=1#about');
  expect(document.title).toBe('Nikita Vorozhishchev — Website Development');
  expect(document.documentElement.lang).toBe('en');
  expect(document.documentElement.hasAttribute('data-layout-debug')).toBe(true);
  expect(screen.getByRole('heading', { name: 'About me' })).toBeDefined();
});

it.each([[320, 1], [768, 2], [1280, 3]])('shows the proper number of cards at %i px', async (width, count) => {
  await openPortfolio('/?lang=en#projects', width);
  const region = within(screen.getByRole('region', { name: 'Project slides' }));
  const visibleTitles = () => region.getAllByRole('heading', { level: 2 }).filter((heading) => !heading.closest('[inert]')).map((heading) => heading.textContent);
  expect(visibleTitles()).toHaveLength(count);
  expect(visibleTitles()[0]).toBe('Russian Travel');
  const previous = region.getByRole<HTMLButtonElement>('button', { name: 'Previous slide' });
  const next = region.getByRole<HTMLButtonElement>('button', { name: 'Next slide' });
  expect(previous.disabled).toBe(true);
  fireEvent.click(next);
  expect(visibleTitles()[0]).toBe('Friends Foundation');
  expect(previous.disabled).toBe(false);
  fireEvent.click(region.getByRole('button', { name: `Slide ${6 - count}` }));
  expect(visibleTitles().at(-1)).toBe('Mesto API');
  if (count > 1) expect(visibleTitles().at(-2)).toBe('Mesto');
  expect(next.disabled).toBe(true);
});

it('opens the selected screenshot and closes its popup without changing the slide', async () => {
  const { container } = await openPortfolio('/?lang=en#projects/friends-fund-project');
  const dialog = container.querySelector('dialog');
  if (!dialog) throw new Error('Gallery dialog is missing.');
  dialog.showModal = vi.fn(() => { dialog.open = true; });
  dialog.close = vi.fn(() => { dialog.open = false; });

  expect(screen.getByRole('link', { name: 'My projects' }).getAttribute('aria-current')).toBe('page');
  fireEvent.click(screen.getByRole('button', { name: 'Next slide' }));
  const preview = screen.getByRole('button', { name: 'Enlarge image — What We Do' });
  expect(preview.hasAttribute('inert')).toBe(false);
  expect(screen.getByRole('button', { name: 'Enlarge image — Foundation homepage' }).hasAttribute('inert')).toBe(true);
  fireEvent.click(preview);
  const popup = within(screen.getByRole('dialog', { name: 'What We Do' }));
  const detailImage = popup.getByRole('img');
  expect(popup.getAllByRole('img', { hidden: true })).toHaveLength(3);
  fireEvent.click(detailImage);
  expect(dialog.open).toBe(true);
  const popupNext = popup.getByRole<HTMLButtonElement>('button', { name: 'Next slide' });
  const popupPrevious = popup.getByRole<HTMLButtonElement>('button', { name: 'Previous slide' });
  expect(popupNext.disabled).toBe(false);
  fireEvent.click(popupNext);
  expect(popup.getByRole('img', { name: 'Resources' })).toBeDefined();
  expect(popupNext.disabled).toBe(true);
  fireEvent.click(popupPrevious);
  fireEvent.click(popupPrevious);
  expect(dialog.open).toBe(true);
  const original = screen.getByRole('button', { name: 'Enlarge image — Foundation homepage' });
  expect(popup.getByRole('img', { name: 'Foundation homepage' }).getAttribute('src')).toBe(original.querySelector('img')?.getAttribute('src'));
  expect(popupPrevious.disabled).toBe(true);
  fireEvent.click(popup.getByRole('button', { name: 'Close' }));
  expect(original.hasAttribute('inert')).toBe(false);
  expect(preview.hasAttribute('inert')).toBe(true);
  fireEvent.click(original);
  fireEvent.click(popupNext);
  expect(popup.getByRole('img', { name: 'What We Do' })).toBe(detailImage);
  fireEvent.click(popup.getByRole('button', { name: 'Close' }));
  expect(dialog.open).toBe(false);
  expect(screen.getByRole('button', { name: 'Enlarge image — What We Do' })).toBe(preview);
  fireEvent.click(preview);
  fireEvent.click(dialog);
  expect(dialog.open).toBe(false);
});

it('handles unknown project URLs and returns to the list', async () => {
  await openPortfolio('/#projects/missing');
  expect(screen.getByRole('heading', { name: 'Проект не найден' })).toBeDefined();
  const back = screen.getByRole('link', { name: 'Назад к проектам' });
  expect(back.getAttribute('href')).toBe('#projects');
  navigate('#projects');
  expect(screen.getByRole('heading', { name: 'Мои проекты' })).toBeDefined();
});


it.each([
  ['/#about', '«Путешествии по России»', 'серверной частью', 'Технологии'],
  ['/?lang=en#about', 'Russian Travel', 'backend', 'Technologies'],
])('links the biography to the relevant case studies at %s', async (url, travel, backend, heading) => {
  await openPortfolio(url);
  expect(screen.getByRole('link', { name: travel }).getAttribute('href')).toBe('#projects/russian-travel');
  const href = screen.getByRole('link', { name: backend }).getAttribute('href');
  expect(href).toBe('#projects/mesto-project-plus');
  navigate(href ?? '');
  expect(screen.getByRole('heading', { name: heading })).toBeDefined();
});

it.each([
  ['russian-travel', '', 'Код на GitHub'],
  ['friends-fund-project', '?lang=en', 'Code on GitHub'],
  ['react-burger', '', 'Код на GitHub'],
  ['mesto-project', '?lang=en', 'Code on GitHub'],
  ['mesto-project-plus', '', 'Код на GitHub'],
])('links %s to its GitHub repository', async (id, query, label) => {
  await openPortfolio(`/${query}#projects/${id}`);
  expect(screen.getByRole('link', { name: label }).getAttribute('href')).toBe(`https://github.com/Elezzar/${id}`);
});

it.each([
  ['mesto-project', '', 'Открыть сайт'],
  ['russian-travel', '?lang=en', 'Open live site'],
])('links %s to its live website', async (id, query, label) => {
  await openPortfolio(`/${query}#projects/${id}`);
  expect(screen.getByRole('link', { name: label }).getAttribute('href')).toBe(`https://elezzar.github.io/${id}/`);
});

it.each(['friends-fund-project', 'react-burger', 'mesto-project-plus'])('omits the live link for %s', async (id) => {
  await openPortfolio(`/#projects/${id}`);
  expect(screen.queryByRole('link', { name: 'Открыть сайт' })).toBeNull();
});
