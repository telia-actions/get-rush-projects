import * as actionsCore from '@actions/core';
import * as util from '@src/util/json-client';
import projects from '../__mocks__/projects';
import { run } from '../github-action';

jest.mock('@actions/core');
jest.mock('@src/util/json-client');

describe('github action', () => {
  beforeEach(() => {
    jest.spyOn(util, 'readJsonWithComments').mockReturnValue({
      projects,
    });
  });
  it('should set outputs for every deploy category', () => {
    const setOutputSpy = jest.spyOn(actionsCore, 'setOutput');
    run();
    expect(setOutputSpy).toHaveBeenCalledTimes(1);
    expect(setOutputSpy).toHaveBeenCalledWith('rushProjects', projects);
  });
  describe('given that error occurs', () => {
    const errorMessage = 'mocked error';
    beforeEach(() => {
      jest.spyOn(actionsCore, 'getInput').mockImplementation(() => {
        throw new Error(errorMessage);
      });
    });
    it('should fail workflow and print out error', () => {
      const setFailedSpy = jest.spyOn(actionsCore, 'setFailed');
      run();
      expect(setFailedSpy).toHaveBeenCalledTimes(1);
      expect(setFailedSpy).toHaveBeenCalledWith(errorMessage);
    });
  });
});
