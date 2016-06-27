/**
 * Test the getGithubData saga
 */

import expect from 'expect';
import { take, call, put, select, race } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux'
import request from 'utils/request';
