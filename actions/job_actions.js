import reverseGeocode from 'latlng-to-zip';
import qs from 'qs';
import { FETCH_JOBS, LIKE_JOB } from './types';
import { simpleGetRequest } from '../utils/makeRequest';

const JOB_ROOT_URL = 'http://api.indeed.com/ads/apisearch?';
// use qs package to convert to querystring
const JOB_QUERY_PARAMS = {
  publisher: '4201738803816157',
  format: 'json',
  v: '2',
  latlong: 1,
  radius: 10,
  q: 'javascript',
};

export const fetchJobs = region => async dispatch => {
  try {
    let zip = await reverseGeocode(region);
    const query = qs.stringify({ ...JOB_QUERY_PARAMS, l: zip });
    const url = `${JOB_ROOT_URL}${query}`;
    const data = await simpleGetRequest(url);
    dispatch({ type: FETCH_JOBS, payload: data });
    console.log('data', data);
  } catch (err) {
    throw new Error(`Fetch jobs: ${err}`);
  }
};

export const likeJob = job => ({ payload: job, type: LIKE_JOB });
