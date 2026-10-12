const fs=require('fs'),vm=require('vm'),assert=require('assert/strict'),path=require('path');
const cache=new Map(); let emails=0;
class Sheet {
 constructor(name,rows){this.name=name;this.rows=rows;}
 getLastRow(){return this.rows.length;} getLastColumn(){return Math.max(0,...this.rows.map(r=>r.length));}
 getRange(r,c,n=1,m=1){const self=this;return {getValues(){return Array.from({length:n},(_,i)=>Array.from({length:m},(_,j)=>self.rows[r+i-1]?.[c+j-1]??''));},getDisplayValues(){return this.getValues().map(row=>row.map(v=>String(v)));},setValues(values){values.forEach((row,i)=>row.forEach((v,j)=>{self.rows[r+i-1]??=[];self.rows[r+i-1][c+j-1]=v;}));return this;},setValue(v){return this.setValues([[v]]);},setNumberFormat(){return this;}};}
 getDataRange(){return this.getRange(1,1,this.getLastRow(),this.getLastColumn());} setFrozenRows(){} appendRow(row){this.rows.push(row);} getName(){return this.name;}
}
const registrations=new Sheet('Registrations',[['registrationId','checkInCode','name','email','checkedIn'],['00123','00456','Ada','ada@example.com','No']]);
const logs=new Sheet('Checkins',[['timestamp','registrationId','checkInCode','name','email','phone','checkedInBy'],['old','00123','00456','Ada','','','Admin']]);
const sheets=[registrations,logs];
const spreadsheet={getSheets:()=>sheets,getSheetByName:n=>sheets.find(s=>s.name===n),insertSheet:n=>{const s=new Sheet(n,[]);sheets.push(s);return s;}};
let expected='test-password';
const ctx={console:{error(){}},PropertiesService:{getScriptProperties:()=>({getProperty:k=>k==='ADMIN_PASSWORD'?expected:null})},CacheService:{getScriptCache:()=>({put:(k,v,ttl)=>{assert.equal(ttl,21600);cache.set(k,v);},get:k=>cache.get(k)})},Utilities:{getUuid:()=> 'test-token'},SpreadsheetApp:{openById:()=>spreadsheet,flush(){}},LockService:{getScriptLock:()=>({waitLock(){},releaseLock(){}})},ContentService:{MimeType:{JSON:'json',JAVASCRIPT:'js'},createTextOutput:text=>({text,setMimeType(){return this;}})},UrlFetchApp:{fetch(){emails++;throw Error('Unexpected email');}}};
vm.createContext(ctx);vm.runInContext(fs.readFileSync(path.join(__dirname,'../apps-script/Code.gs'),'utf8'),ctx);
const get=params=>JSON.parse(ctx.doGet({parameter:params}).text);
const post=body=>JSON.parse(ctx.doPost({postData:{contents:JSON.stringify(body)}}).text);
assert.equal(post({action:'login',password:'wrong'}).authenticated,false);
expected=null;assert.match(post({action:'login',password:'x'}).error,/not configured/);expected='test-password';
const login=post({action:'login',password:expected});assert.equal(login.authenticated,true);assert.equal(login.token,'test-token');
for(const action of ['lookup','history','dashboard'])assert.equal(get({action}).status,'unauthorized');
assert.equal(get({action:'lookup',q:'Ada',token:login.token}).members[0].checkInCode,'00456');
assert.equal(get({action:'dashboard',token:login.token}).totalCheckins,0);
const body={action:'checkin',token:login.token,registrationId:'00123',checkInCode:'00456',session:'Wednesday Evening'};
assert.equal(post(body).status,'checked_in');assert.equal(post(body).status,'already_checked_in');
assert.equal(post({...body,session:'Thursday Morning'}).status,'checked_in');
assert.equal(post({...body,session:'invalid'}).status,'invalid');
assert.equal(logs.rows.length,4);assert.equal(logs.rows[1][0],'old');assert.equal(logs.rows[1][1],'00123');
assert.equal(get({action:'history',registrationId:'00456',token:login.token}).sessions.length,2);
assert.equal(get({action:'dashboard',token:login.token}).totalCheckins,2);
assert.equal(post({action:'checkin',password:expected,checkInCode:'00456'}).alreadyCheckedIn,true);
cache.clear();assert.equal(get({action:'dashboard',token:login.token}).status,'unauthorized');
assert.equal(get({action:'verify-registration',registrationId:'00123'}).found,true);
assert.match(ctx.doGet({parameter:{action:'verify-registration',registrationId:'00123',callback:'cb'}}).text,/^cb\(/);
assert.equal(emails,0);
assert.equal(get({action:'health'}).duplicateProtection,true);
const priorRows=registrations.rows.length;
const duplicate=post({action:'register',registrationKind:'adult',registrationId:'WCC26-new',checkInCode:'654321',name:'  ADA ',email:'ADA@EXAMPLE.COM',phone:'08012345678'});
assert.equal(duplicate.duplicate,true);assert.equal(duplicate.registrationId,'00123');assert.equal(duplicate.checkInCode,'00456');assert.equal(registrations.rows.length,priorRows);assert.equal(emails,0);
assert.equal(ctx.sameAttendee_({name:'John Doe',phone:'+234 801 234 5678'}, {name:'John   Doe',phone:'08012345678'}),true);
assert.equal(ctx.sameAttendee_({name:'John Doe',phone:'002348012345678'}, {name:'john doe',phone:'08012345678'}),true);
assert.equal(ctx.sameAttendee_({name:'John Doe',email:'shared@example.com'}, {name:'Jane Doe',email:'shared@example.com'}),false);
assert.equal(ctx.sameAttendee_({name:'Ada',email:'shared@example.com',registrationKind:'adult'}, {name:'Ada',guardianEmail:'shared@example.com',registrationKind:'child'}),false);
assert.equal(ctx.sameAttendee_({name:'Ada',registrationKind:'child',guardianEmail:'shared@example.com'}, {name:'Ben',guardianEmail:'shared@example.com',registrationKind:'child'}),false);
const child={action:'register',registrationKind:'child',registrationId:'WCC26-child',checkInCode:'001111',name:'Ben',phone:'08012345678',childAge:'4',guardianName:'Guardian'};
assert.equal(post(child).duplicate,false);
const repeated=post({...child,registrationId:'WCC26-child-retry',checkInCode:'001112',phone:'+2348012345678'});
assert.equal(repeated.duplicate,true);assert.equal(repeated.checkInCode,'001111');
assert.equal(post({...child,name:'Beth',registrationId:'WCC26-sibling',checkInCode:'001113'}).duplicate,false);
ctx.sendRegistrationEmail_=()=>{emails++;return {ok:true};};
const adult={action:'register',registrationKind:'adult',registrationId:'WCC26-adult',checkInCode:'005555',name:'New Adult',email:'new@example.com',phone:'08011111111'};
assert.equal(post(adult).duplicate,false);assert.equal(emails,1);
assert.equal(post({...adult,registrationId:'WCC26-retry',checkInCode:'005556'}).duplicate,true);assert.equal(emails,1);
assert.match(post({...adult,name:'Different person',email:'other@example.com'}).error,/already in use/);

console.log('PASS: authentication, token expiry, check-in compatibility, duplicates, original codes, phone normalization, siblings, one email per new registration, identifier collisions, existing record preservation. Tests use in-memory sheets and email stubs only.');
