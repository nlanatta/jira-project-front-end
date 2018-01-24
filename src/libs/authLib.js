export async function authUser() {
  const currentUser = getCurrentUser();

  if (currentUser === null) {
    return false;
  }

  await getUserToken(currentUser);

  return true;
}

export function signOutUser() {
  const currentUser = getCurrentUser();

  if (currentUser !== null) {
    //currentUser.signOut();
  }
}

function getUserToken(currentUser) {
  return new Promise((resolve, reject) => {
    /*currentUser.getSession(function(err, session) {
      if (err) {
        reject(err);
        return;
      }
      resolve("TOKEN");
    });*/
    resolve("TOKEN");
  });
}

function getCurrentUser() {
  //const userPool = new CognitoUserPool({
    //UserPoolId: config.cognito.USER_POOL_ID,
    //ClientId: config.cognito.APP_CLIENT_ID
  //});
  //CALL REST API for SESSION ID
  return "NEW USER";//userPool.getCurrentUser();
}
