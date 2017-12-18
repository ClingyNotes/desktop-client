import { BrowserWindow } from 'electron';
import sinon from 'sinon';

import AppWindow from '../../src/js/backend/appWindow';
import testOptions from '../utils/windowOptions';


describe('AppWindow', () => {
    describe('Window creation', () => {
        it('should throw an exception when options are invalid', () => {
            const opts = testOptions;
            jest.doMock(BrowserWindow,() => {
                return {
                    on: jest.fn(),
                    loadURL: jest.fn(),
                };
            });

            // expect(electro) 
        });
    });
});