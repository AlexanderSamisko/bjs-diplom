`use strict`
const logoutButton = new LogoutButton();

logoutButton.action = () => ApiConnector.logout(responseOut => {
    if(responseOut.success){
        location.reload()
    }
});

ApiConnector.current(responseCurrent => {
    if(responseCurrent.success){
        ProfileWidget.showProfile(responseCurrent.data)
    }
});

const ratesBoard = new RatesBoard();
ratesCheckInterval = setInterval(
    ApiConnector.getStocks(responseStocks => {
        if (responseStocks.success) {
            ratesBoard.clearTable();
            ratesBoard.fillTable(responseStocks.data);
        }
    }
    ), 60000);

const moneyManager = new MoneyManager();

moneyManager.addMoneyCallback = dataAdd => ApiConnector.addMoney(dataAdd, responseAddMoney => {
    if (responseAddMoney.success){
        ProfileWidget.showProfile(responseAddMoney.data); 
        moneyManager.setMessage(responseAddMoney.success, `Баланс пополнен!`);
    } else {
        moneyManager.setMessage(responseAddMoney.success, JSON.stringify(responseAddMoney.error));
    }
});

moneyManager.conversionMoneyCallback = dataConversion => ApiConnector.convertMoney(dataConversion, responseConversion => {
    if (responseConversion.success){
        ProfileWidget.showProfile(responseConversion.data);
        moneyManager.setMessage(responseConversion.success, `Обмен валют совершен!`);
    } else {
        moneyManager.setMessage(responseConversion.success, JSON.stringify(responseConversion.error));
    }
});

moneyManager.sendMoneyCallback = dataTransfer => ApiConnector.transferMoney(dataTransfer, responseTransfer => {
    if (responseTransfer.success) {
        ProfileWidget.showProfile(responseTransfer.data);
        moneyManager.setMessage(responseTransfer.success, `Перевод совершен!`);
    } else {
        moneyManager.setMessage(responseTransfer.success, JSON.stringify(responseTransfer.error));
    }
});

const favoritesWidget = new FavoritesWidget();

ApiConnector.getFavorites(responseFavorites => {
    if (responseFavorites.success) {
                favoritesWidget.clearTable();
                favoritesWidget.fillTable(responseFavorites.data);
                moneyManager.updateUsersList(responseFavorites.data);
            }
})


favoritesWidget.addUserCallback = dataAddUser => ApiConnector.addUserToFavorites(dataAddUser, responseAddUser => {
    if (responseAddUser.success) {
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(responseAddUser.data);
        moneyManager.updateUsersList(responseAddUser.data);
        favoritesWidget.setMessage(responseAddUser.success, `Пользователь добавлен в избранное!`);
    } else {
        favoritesWidget.setMessage(responseAddUser.success,  JSON.stringify(responseAddUser.error));
    }
});

favoritesWidget.removeUserCallback = dataRemoveUser => ApiConnector.removeUserFromFavorites(dataRemoveUser, responseRemoveUser => {
    if (responseRemoveUser.success) {
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(responseRemoveUser.data);
        moneyManager.updateUsersList(responseRemoveUser.data);
        favoritesWidget.setMessage(responseRemoveUser.success, `Пользователь удален из избранного!`);
    } else {
        favoritesWidget.setMessage(responseRemoveUser.success,  JSON.stringify(responseRemoveUser.error)); 
    }
});