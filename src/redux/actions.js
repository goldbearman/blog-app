export const ON_LOGIN = 'ON_LOGIN';
export const INITIAL_STATE = 'INITIAL_STATE';
export const REGISTRATION = 'REGISTRATION';
export const AUTHENTICATION = 'AUTHENTICATION';
// export const FIVE_MORE_TICKETS = 'FIVEMORETICKETS';

// export const onCheckBox = number => ({ type: ON_CHEKCBOX, number });
// export const checkCheapest = () => ({ type: CLICK_CHEAPEST });
// export const checkFastest = () => ({ type: CLICK_FASTEST });
export const onLogin = bool => ({ type: ON_LOGIN, bool });
export const onInitialState = res => ({ type: INITIAL_STATE, res });
export const onRegistration = res => ({ type: REGISTRATION, res });
export const onAuthentication = res => ({ type: AUTHENTICATION, res });
