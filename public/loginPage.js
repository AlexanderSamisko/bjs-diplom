`use strict`
const userForm = new UserForm();
userForm.loginFormCallback = dataLog => ApiConnector.login(dataLog, responseLog => {
    if(!responseLog.success){
        userForm.setLoginErrorMessage(responseLog.error);
    } else {
        location.reload();
    }
});
userForm.registerFormCallback = dataReg => ApiConnector.register(dataReg, responseReg => {
    if(!responseReg.success){
        userForm.setLoginErrorMessage(responseReg.error);
    } else {
        location.reload();
    }
});