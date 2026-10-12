// GitHub のエラー本文には "Bad credentials" や "API rate limit exceeded" など原因が入るため、ステータスと合わせて残す
export const logGitHubResponseError = async (
  tag: string,
  res: Response,
): Promise<void> => {
  console.error(`[${tag}] GitHub API error:`, res.status, await res.text());
};

export const logGitHubRequestFailure = (tag: string, err: unknown): void => {
  console.error(`[${tag}] GitHub API request failed:`, err);
};
