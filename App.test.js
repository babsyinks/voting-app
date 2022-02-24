
const setUserInfoTest = require('./client/src/actions/userInfoAction') 

describe('actions',()=>{
  it('checks userinfo for correct values',()=>{
    expect(setUserInfoTest(333,"Andrei")).toEqual({
      type:'USER_INFO',
      payload:{egcaNum:333,name:"Andrei"}
    })
  })
})
