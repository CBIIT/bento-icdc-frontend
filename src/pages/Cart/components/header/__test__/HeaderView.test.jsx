import React from 'react';
import { act, fireEvent, render, screen, wait } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import axios from 'axios';
import { Toaster, toast } from 'sonner';
import HeaderView from '../HeaderView';

jest.mock('axios', () => ({ get: jest.fn() }));
jest.mock('html2pdf.js', () => jest.fn());
jest.mock('marked', () => ({ marked: jest.fn() }));
jest.mock('../../overview-widget', () => ({ OverviewWidget: () => null }));
jest.mock('../../../../../utils/env', () => ({
  __esModule: true,
  default: { REACT_APP_FILE_CENTRIC_CART_README: '/cart-readme.md' },
}));

const content = 'Select files in your cart to download a manifest.';

const findText = async text => {
  await wait(async () => {
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 10));
    });
    expect(screen.getByText(text)).toBeTruthy();
  });
};

describe('Cart README', () => {
  let client;

  const renderHeader = () =>
    render(
      <QueryClientProvider client={client}>
        <Toaster />
        <HeaderView filesId={[]} />
      </QueryClientProvider>
    );

  beforeEach(() => {
    axios.get.mockReset();
    client = new QueryClient({
      defaultOptions: { queries: { retry: false, gcTime: Infinity } },
    });
  });

  afterEach(() => {
    toast.dismiss();
    client.clear();
  });

  it('lets the user open, close, and reopen the README', async () => {
    axios.get.mockResolvedValue({ data: content });
    renderHeader();
    fireEvent.click(screen.getByRole('button', { name: 'README' }));
    await findText(content);
    expect(
      screen.getByText('Understanding the “My Files” Cart Page')
    ).toBeTruthy();

    fireEvent.keyDown(screen.getByRole('dialog'), {
      key: 'Escape',
      keyCode: 27,
    });
    await wait(() => expect(screen.queryByRole('dialog')).toBeNull());
    fireEvent.click(screen.getByRole('button', { name: 'README' }));
    await findText(content);
  });

  it('lets the user retry a failed README request without leaving the cart', async () => {
    axios.get.mockRejectedValue(new Error('Unavailable'));
    renderHeader();
    await findText('Unable to load README content.');
    expect(screen.getByText('My Files')).toBeTruthy();

    axios.get.mockResolvedValue({ data: content });
    fireEvent.click(screen.getByRole('button', { name: 'Retry' }));
    fireEvent.click(screen.getByRole('button', { name: 'README' }));
    await findText(content);
    await wait(() =>
      expect(screen.queryByText('Unable to load README content.')).toBeNull()
    );
  });
});
