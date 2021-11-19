import { getInput, setFailed, setOutput } from '@actions/core';
import { readJsonWithComments } from '@src/util/json-client';

export const run = (): void => {
  try {
    const rushJsonPath = getInput('rushJsonPath');
    const rushProjects: RushProject[] = readJsonWithComments(rushJsonPath).projects;
    setOutput('rushProjects', rushProjects);
  } catch (error: any) {
    setFailed(error.message);
  }
};
