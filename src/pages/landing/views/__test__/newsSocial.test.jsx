import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { act, fireEvent, render, screen } from '@testing-library/react';
import NewsView from '../newsView';
import { NEWS_COPY, TWEET_LOAD_TIMEOUT_MS } from '../news/constants';

jest.mock('scriptjs', () => (_url, _id, ready) => ready());
jest.mock('../NewsViewVideo', () => () => null);
jest.mock('../news/ReleaseCard', () => ({ ReleaseCard: () => null }));
jest.mock('../news/PublicationCard', () => ({ PublicationCard: () => null }));

const news = {
  pageTitle: 'News',
  sections: [
    { type: 'social', title: 'Social', posts: ['1493638757001711620'] },
  ],
};

describe('news social embeds', () => {
  let createTweet;

  beforeEach(() => {
    jest.useFakeTimers();
    createTweet = jest.fn();
    window.twttr = { widgets: { createTweet } };
  });

  afterEach(() => {
    jest.useRealTimers();
    delete window.twttr;
  });

  it('keeps the widget in layout while it loads, then displays the post', async () => {
    createTweet.mockImplementation((_id, target) => {
      // Widgets need a laid-out container to measure and render their iframe.
      if (target.closest('[hidden]')) return new Promise(() => {});
      const post = document.createElement('div');
      post.textContent = 'Embedded post';
      target.appendChild(post);
      return Promise.resolve(post);
    });
    await act(async () => {
      render(<NewsView news={news} />);
    });
    expect(screen.getByText('Embedded post')).toBeVisible();
    expect(screen.queryByText(NEWS_COPY.loadingSocialMediaPosts)).toBeNull();
  });

  it('shows retry when the widget resolves without a post, then recovers', async () => {
    createTweet.mockResolvedValueOnce(undefined);
    await act(async () => {
      render(<NewsView news={news} />);
    });
    expect(screen.getByText(NEWS_COPY.socialMediaPostLoadFailed)).toBeVisible();
    createTweet.mockImplementation((_id, target) => {
      const post = document.createElement('div');
      post.textContent = 'Recovered post';
      target.appendChild(post);
      return Promise.resolve(post);
    });
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: NEWS_COPY.tryAgain }));
    });
    expect(screen.getByText('Recovered post')).toBeVisible();
    expect(screen.queryByText(NEWS_COPY.socialMediaPostLoadFailed)).toBeNull();
  });

  it('shows retry if the widget never finishes loading', async () => {
    createTweet.mockImplementation(() => new Promise(() => {}));
    await act(async () => {
      render(<NewsView news={news} />);
    });
    act(() => {
      jest.advanceTimersByTime(TWEET_LOAD_TIMEOUT_MS);
    });
    expect(
      screen.getByRole('button', { name: NEWS_COPY.tryAgain })
    ).toBeVisible();
  });
});
