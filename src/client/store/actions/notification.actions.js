import actionTypes from "../../constants/action.types"

export function appendNotificatonAction(notifications=[]) {
    return {
        type: actionTypes.APPEND_NOTIFICATIONS,
        payload: { notifications }
    }
}