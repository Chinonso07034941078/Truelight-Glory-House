import test from 'node:test';
import assert from 'node:assert/strict';
import { submitWccRegistration } from '../server/wccRegistration.js';
import handler from '../api/wcc-registration.js';
const payload = { action: 'register', registrationKind: 'adult', name: 'Ada', phone: '08012345678' };
const response = data => ({ ok: true, json: async () => data });

test('Old backend cannot receive a registration POST', async () => {
  const calls = [];
  await assert.rejects(submitWccRegistration(payload, async (url, options) => {
    calls.push({ url, options }); return response({ ok: true });
  }), /temporarily unavailable/);
  assert.equal(calls.length, 1);
  assert.equal(calls[0].options.method, undefined);
});

test('Original code returned without attendee data or backend credentials', async () => {
  let calls = 0;
  const result = await submitWccRegistration(payload, async (url, options) => {
    calls++;
    if (calls === 1) return response({ ok: true, duplicateProtection: true });
    assert.equal(options.method, 'POST');
    assert.deepEqual(JSON.parse(options.body), payload);
    return response({ ok: true, duplicateProtection: true, duplicate: true,
      registrationId: 'WCC26-OLD', checkInCode: '001234', attendee: { email: 'private@example.com' }, token: 'private' });
  });
  assert.deepEqual(result, { ok: true, duplicateProtection: true, duplicate: true,
    registrationId: 'WCC26-OLD', checkInCode: '001234', emailSent: null });
});

test('Incomplete confirmations and backend rejections are never treated as success', async () => {
  for (const data of [{ok:true,duplicateProtection:true}, {ok:false,error:'Registration rejected.'}]) {
    let calls=0;
    await assert.rejects(submitWccRegistration(payload, async () => {
      calls++;return response(calls===1 ? {ok:true,duplicateProtection:true} : data);
    }), /incomplete confirmation|Registration rejected/);
  }
});

test('Admin actions and malformed registration payloads are blocked before calling backend', async () => {
  for (const body of [null,[],{...payload,action:'login'},{...payload,phone:''}]) {
    await assert.rejects(submitWccRegistration(body, () => { throw new Error('Backend must not be called'); }), /attendee and contact/);
  }
});

test('API route rejects GET and disables caching', async () => {
  const headers={};let status,body;
  const res={setHeader:(k,v)=>{headers[k]=v;},status:n=>{status=n;return res;},json:v=>{body=v;}};
  await handler({method:'GET'},res);
  assert.equal(status,405);assert.equal(body.ok,false);assert.equal(headers['Cache-Control'],'no-store');
});
