export default class MMApi {
  static getUiSchema () {
    const request = new Request("/api/getInitialData", {
      method: 'GET'
    });

    return fetch(request).then(response => {
      return response.json();
    }).catch(error => {
      return error;
    });
  }

  static getRestUiSchema () {
    const request = new Request("/api/getMainData", {
      method: 'GET'
    });

    return fetch(request).then(response => {
      return response.json();
    }).catch(error => {
      return error;
    });
  }

  static getAccountsListData () {
    const request = new Request("/api/getAccountsData", {
      method: 'GET'
    });

    return fetch(request).then(response => {
      return response.json();
    }).catch(error => {
      throw(error);
    });
  }
}
