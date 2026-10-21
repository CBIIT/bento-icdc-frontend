/**
 * @jest-environment-options {"customExportConditions":["node","node-addons"]}
 */
import React from 'react';
import { act, fireEvent, render, screen, wait } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Link, MemoryRouter, Route } from 'react-router-dom';
import axios from 'axios';
import { Toaster, toast } from 'sonner';
import About from '../aboutController';

jest.mock('axios', () => ({ get: jest.fn() }));
jest.mock('../../../utils/env', () => ({
  __esModule: true,
  default: { REACT_APP_ABOUT_CONTENT_URL: '/about.yml' },
}));
jest.mock('../../../components/Stats/AllStatsController', () => () => null);

const content =
  '- page: /about\n  title: About ICDC\n- page: /support\n  title: Contact support';

// Flush React updates while waiting with this checkout's older testing library.
const findText = async text => {
  await wait(async () => {
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 10));
    });
    expect(screen.getByText(text)).toBeTruthy();
  });
  return screen.getByText(text);
};

describe('About pages', () => {
  let client;

  const renderPage = () =>
    render(
      <QueryClientProvider client={client}>
        <MemoryRouter initialEntries={['/about']}>
          <Toaster />
          <nav>
            <Link to="/about">About</Link>
            <Link to="/support">Support</Link>
          </nav>
          <Route path="/about" component={About} />
          <Route path="/support" component={About} />
        </MemoryRouter>
      </QueryClientProvider>
    );

  beforeEach(() => {
    axios.get.mockReset();
    client = new QueryClient({
      defaultOptions: { queries: { retryDelay: 0, gcTime: Infinity } },
    });
  });

  afterEach(() => {
    toast.dismiss();
    client.clear();
  });

  it('shows the selected page when navigating between About and Support', async () => {
    axios.get.mockResolvedValue({ data: content });
    renderPage();
    await findText('About ICDC');

    fireEvent.click(screen.getByRole('link', { name: 'Support' }));
    await findText('Contact support');
    expect(screen.queryByText('About ICDC')).toBeNull();

    fireEvent.click(screen.getByRole('link', { name: 'About' }));
    await findText('About ICDC');
    expect(screen.queryByText('Contact support')).toBeNull();
  });

  it.each([
    [
      'the server is unavailable',
      () => axios.get.mockRejectedValue(new Error('Unavailable')),
    ],
    [
      'the content cannot be parsed',
      () => axios.get.mockResolvedValue({ data: '[invalid' }),
    ],
  ])('lets the user retry when %s', async (_description, failRequest) => {
    failRequest();
    renderPage();
    await findText('Unable to load page content.');
    expect(screen.queryByText('About ICDC')).toBeNull();

    axios.get.mockResolvedValue({ data: content });
    fireEvent.click(screen.getByRole('button', { name: 'Retry' }));
    await findText('About ICDC');
    await wait(() =>
      expect(screen.queryByText('Unable to load page content.')).toBeNull()
    );
  });
});
