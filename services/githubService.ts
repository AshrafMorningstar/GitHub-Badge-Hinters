import { UserStats } from '../types';

const BASE_URL = 'https://api.github.com';

/**
 * Fetches public user stats to estimate badge progress.
 * Note: This uses the public GitHub API which is rate limited.
 * It does not require an API key but may fail if rate limits are hit.
 */
export async function fetchUserStats(username: string): Promise<UserStats> {
  try {
    // 1. Fetch Basic User Info
    const userRes = await fetch(`${BASE_URL}/users/${username}`);
    if (!userRes.ok) {
      if (userRes.status === 404) throw new Error('User not found');
      if (userRes.status === 403) throw new Error('API Rate limit exceeded. Please try again later.');
      throw new Error('Failed to fetch user profile');
    }
    const userData = await userRes.json();

    // 2. Fetch Merged PR Count (Pull Shark)
    // We search for PRs authored by the user that are merged.
    const prRes = await fetch(`${BASE_URL}/search/issues?q=author:${username}+type:pr+is:merged`);
    let mergedPrsCount = 0;
    if (prRes.ok) {
      const prData = await prRes.json();
      mergedPrsCount = prData.total_count;
    }

    // 3. Fetch Stars on User's Repositories (Starstruck)
    // This requires fetching repos. For simplicity/performance in this demo, we fetch the first 100.
    // A full implementation would paginate through all repos.
    const reposRes = await fetch(`${BASE_URL}/users/${username}/repos?per_page=100&type=owner`);
    let starsCount = 0;
    if (reposRes.ok) {
      const reposData = await reposRes.json();
      if (Array.isArray(reposData)) {
        starsCount = reposData.reduce((acc: number, repo: any) => acc + (repo.stargazers_count || 0), 0);
      }
    }

    // 4. Discussion Answers (Galaxy Brain) - Hard to fetch via REST efficiently without Auth
    // We default to 0 or leave it for manual checking.
    const discussionAnswersCount = 0; 

    return {
      username: userData.login,
      name: userData.name || userData.login,
      avatarUrl: userData.avatar_url,
      metrics: {
        merged_prs: mergedPrsCount,
        stars: starsCount,
        discussion_answers: discussionAnswersCount, // Placeholder
        coauthored_commits: 0 // Placeholder
      }
    };
  } catch (error) {
    console.error('Error fetching GitHub stats:', error);
    throw error;
  }
}
