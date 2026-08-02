import {
  uppdateBackendStatus,
  updateLogoutStatus,
} from "../Redux/Slices/Slice";
import API from "../Libs/Axios/Axios";

export const checkBackendHealth = () => async (dispatch) => {
  try {
    const response = await API.get(
      `${process.env.NEXT_PUBLIC_COMMON_ENDPOINTS_URL}/get-Health-Check-Status`,
    );
    dispatch(
      uppdateBackendStatus({
        status: response.data.status,
        statusMessage: response.data.statusMessage,
      }),
    );
  } catch (error) {
    dispatch(
      uppdateBackendStatus({
        status: false,
        statusMessage: "Backend Initialization has Failed",
      }),
    );
  }
};

/**
 * Verifies the session.
 *
 * Only an explicit rejection from the server (401/403, or a falsy validity
 * response) ends the session. A timeout, a DNS blip, a 5xx, or a cold-starting
 * backend must NOT evict a signed-in user — this runs on a 60s interval, so
 * treating every failure as "logged out" throws people out mid-entry.
 *
 * Resolves to true when the session is known-good, false when it was rejected,
 * and null when validity could not be determined.
 */
export const checkTokenValidity = (token, router) => async (dispatch) => {
  const endSession = () => {
    dispatch(updateLogoutStatus());
    router?.push("/authentication/login");
  };

  if (!token) {
    endSession();
    return false;
  }

  try {
    const response = await API.post("users/check-token-validity", { token });

    if (response.data) return true;

    endSession();
    return false;
  } catch (error) {
    const status = error?.response?.status;

    if (status === 401 || status === 403) {
      endSession();
      return false;
    }

    // Transient: keep the user where they are and try again next tick.
    return null;
  }
};

/**
 * The stats endpoints below throw on failure rather than returning [].
 *
 * Returning an empty array made a failed request indistinguishable from a
 * genuinely empty account, so the dashboard rendered a confident "PKR 0"
 * whenever the backend was unreachable. Callers must handle the rejection and
 * show an error state.
 */
const authorizedGet = async (url, token) => {
  const response = await API.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  return response.data ?? [];
};

export const getMonthlyIncomingOutgoingStats = (token, emailAddress, uuid) =>
  authorizedGet(
    `expenses/get-FlowtypeWiseExpenseAmountMapper?emailAddress=${encodeURIComponent(
      emailAddress,
    )}&UUID=${encodeURIComponent(uuid)}`,
    token,
  );

export const getMonthlyIncomingOutgoingStatsForYear = (
  token,
  emailAddress,
  uuid,
) =>
  authorizedGet(
    `expenses/get-getEachMonthIncomingAndOutgoing?emailAddress=${encodeURIComponent(
      emailAddress,
    )}&UUID=${encodeURIComponent(uuid)}`,
    token,
  );

export const getYearlySpendingsOnDiffCategories = (
  token,
  emailAddress,
  uuid,
) =>
  authorizedGet(
    `expenses/get-getYearlySpendingsOnDiffCategories?emailAddress=${encodeURIComponent(
      emailAddress,
    )}&UUID=${encodeURIComponent(uuid)}`,
    token,
  );
