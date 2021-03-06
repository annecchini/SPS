class DummyApi {
  static getData(request, info) {
    let result = null;
    switch (request) {
      case "process-list":
        result = processList;
        break;
      case "user-info":
        result = userInfo(info);
        break;
      case "user-list":
        result = userListResponse();
        break;
      default:
        break;
    }
    return result;
  }

  static postData(request, info) {
    let result = null;
    switch (request) {
      case "process-create":
        result = processCreateResponse;
        break;
      case "user-create":
        result = userCreateResponse(info);
        break;
      case "auth-confirm":
        result = authConfirmResponse(info);
        break;
      case "auth-login":
        result = authLogin(info);
        break;
      case "auth-recover":
        result = authRecover(info);
        break;
      default:
        break;
    }
    return result;
  }

  static putData(request, info) {
    let result = null;
    switch (request) {
      case "process-update":
        result = processUpdateResponse;
        break;
      case "auth-restore":
        result = authRestoreResponse(info);
        break;
      default:
        break;
    }
    return result;
  }

  static delData(request, info) {
    let result = null;
    switch (request) {
      case "process-delete":
        result = processDeleteResponse;
        break;
      default:
        break;
    }
    return result;
  }
}

const processList = [
  {
    id: 1,
    number: 1,
    year: 2018,
    end: new Date(2018, 11, 3),
    description: "Observações do primeiro processo.",
    createdAt: new Date("2018-09-03T21:23:41.000Z"),
    updatedAt: new Date("2018-09-03T21:23:41.000Z"),
    lastAcess: new Date("2018-09-05T21:23:41.000Z")
  },
  {
    id: 2,
    number: 2,
    year: 2018,
    end: new Date(2018, 11, 25),
    description: "Observações do segundo processo.",
    createdAt: new Date("2018-09-03T21:23:41.000Z"),
    updatedAt: new Date("2018-09-03T21:23:41.000Z"),
    lastAcess: new Date("2018-09-04T21:23:41.000Z")
  },
  {
    id: 3,
    number: 3,
    year: 2018,
    end: new Date(2018, 11, 26),
    description: "Observações do terceiro processo.",
    createdAt: new Date("2018-09-03T21:23:41.000Z"),
    updatedAt: new Date("2018-09-03T21:23:41.000Z"),
    lastAcess: new Date("2018-09-08T21:23:41.000Z")
  }
];

const processCreateResponse = {
  ok: false,
  message: {
    code: "auth-05",
    userMessage: "Mensagem de erro do servidor!",
    devMessage: {}
  }
};

const processUpdateResponse = {
  ok: false,
  message: {
    code: "auth-05",
    userMessage: "Mensagem de erro do servidor!",
    devMessage: {}
  }
};

const processDeleteResponse = {
  ok: false,
  message: {
    code: "auth-05",
    userMessage: "Mensagem de erro do servidor!",
    devMessage: {}
  }
};

function userCreateResponse(info) {
  return {
    ok: true,
    message: {
      code: "auth-05",
      userMessage: "Mensagem de erro do servidor!",
      devMessage: {}
    }
  };
}

function userInfo(token) {
  if (token === "a0b1c2d3e4f5") {
    return {
      ok: true,
      user: {
        id: "1",
        firstName: "Fernando",
        lastName: "Lyrio Annecchini"
      }
    };
  } else {
    return {
      ok: false,
      message: {
        code: "auth-05",
        userMessage: "Mensagem de erro do servidor!",
        devMessage: {}
      }
    };
  }
}

function authConfirmResponse(info) {
  if (info.key === "abcdef") {
    return {
      ok: true
    };
  } else {
    return {
      ok: false,
      message: {
        code: "auth-05",
        userMessage: "Mensagem de erro do servidor!",
        devMessage: {}
      }
    };
  }
}

function authLogin(info) {
  if (info.login === "fernando.void@gmail.com" && info.password === "123456") {
    return {
      ok: true,
      message: {
        token: "a0b1c2d3e4f5"
      }
    };
  } else {
    return {
      ok: false,
      message: {
        code: "auth-05",
        userMessage: "Mensagem de erro do servidor!",
        devMessage: {}
      }
    };
  }
}

function authRecover(info) {
  if (
    info.email === "fernando.void@gmail.com" &&
    info.cpf === "088.402.807-07"
  ) {
    return {
      ok: true,
      message: {
        token: "a0b1c2d3e4f5"
      }
    };
  } else {
    return {
      ok: false,
      message: {
        code: "auth-05",
        userMessage: "Mensagem de erro do servidor!",
        devMessage: {}
      }
    };
  }
}

function authRestoreResponse(info) {
  if (info.recoverKey === "abcdef" && info.password.length >= 6) {
    return {
      ok: true,
      message: {
        things: "a0b1c2d3e4f5"
      }
    };
  } else {
    return {
      ok: false,
      message: {
        code: "auth-05",
        userMessage: "Mensagem de erro do servidor!",
        devMessage: {}
      }
    };
  }
}

function userListResponse() {
  return [
    {
      id: 1,
      login: "fernando.void@gmail.com",
      firstName: "Fernando",
      lastName: "Lyrio Annecchini",
      lastAcess: new Date("2018-09-05T21:23:41.000Z"),
      cpf: "088.402.807-07"
    },
    {
      id: 2,
      login: "fernando.zoip@gmail.com",
      firstName: "Ferdinandus",
      lastName: "Lyriow Annecchinix",
      lastAcess: new Date("2018-09-06T21:23:41.000Z"),
      cpf: "088.402.807-07"
    },
    {
      id: 3,
      login: "fernando.boic@gmail.com",
      firstName: "Fernandus",
      lastName: "Lyrios Annecchiniz",
      lastAcess: new Date("2018-10-07T21:23:41.000Z"),
      cpf: "088.402.807-07"
    }
  ];
}

export default DummyApi;
