import { describe, it, expect } from 'vitest';
import { fetchLatestRelease } from '../fetchReleaseData';
import { mockReleaseData } from '../../../mocks/fetchLatestRelease.mock';

// Ensure PRODUCTION flag is not set so the mock is used
delete process.env.PRODUCTION;

describe('fetchLatestRelease', () => {
  it('returns mocked release data', async () => {
    const data = await fetchLatestRelease();
    expect(data.version).toBe(mockReleaseData.version);
    expect(data.platforms.windows).toEqual(mockReleaseData.platforms.windows);
    expect(data.platforms.linuxAppImage).toEqual(
      mockReleaseData.platforms.linuxAppImage,
    );
  });
});
