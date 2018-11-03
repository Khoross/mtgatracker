// @flow
export const UPDATE_SETTINGS : 'UPDATE_SETTINGS' = 'UPDATE_SETTINGS';
export const HYDRATE_SETTINGS : 'HYDRATE_SETTINGS' = 'HYDRATE_SETTINGS';

export const updateSettings = (settingKey, settingValue) => ({type: UPDATE_SETTINGS, key: settingKey, value: settingValue})
export const updateSettingsBatch = (settingObj) => ({type: HYDRATE_SETTINGS, payload: settingObj})