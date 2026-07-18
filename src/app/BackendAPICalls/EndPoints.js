import {
  uppdateBackendStatus,
  updateLogoutStatus,
} from "../Redux/Slices/Slice";
import API from "../Libs/Axios/Axios";

export const checkBackendHealth = () => async (dispatch) => {
  try {
    API.get(
      `${process.env.NEXT_PUBLIC_COMMON_ENDPOINTS_URL}/get-Health-Check-Status`,
    )
      .then((response) => {
        dispatch(
          uppdateBackendStatus({
            status: response.data.status,
            statusMessage: response.data.statusMessage,
          }),
        );
      })
      .catch((error) => {
        dispatch(
          uppdateBackendStatus({
            status: false,
            statusMessage: "Backend Initialization has Failed",
          }),
        );
      });
  } catch (error) {
    dispatch(
      uppdateBackendStatus({
        status: false,
        statusMessage: "Backend Initialization has Failed",
      }),
    );
  }
};

export const checkTokenValidity = (token, router) => async (dispatch) => {
  try {
    API.post("users/check-token-validity", { token: token })
      .then((response) => {
        if (response.data) {
          // Token is Valid, Do Nothing
        } else {
          dispatch(updateLogoutStatus());
          router.push("/authentication/login");
        }
      })
      .catch((error) => {
        dispatch(updateLogoutStatus());
        router.push("/authentication/login");
      });
  } catch (error) {
    dispatch(updateLogoutStatus());
    router.push("/authentication/login");
  }
};

export const getMonthlyIncomingOutgoingStats = async (
  token,
  emailAddress,
  uuid,
) => {
  try {
    const response = await API.get(
      `expenses/get-FlowtypeWiseExpenseAmountMapper?emailAddress=${emailAddress}&UUID=${uuid}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      },
    );
    return response.data || [];
  } catch (error) {
    return [];
  }
};

export const getMonthlyIncomingOutgoingStatsForYear = async (
  token,
  emailAddress,
  uuid,
) => {
  try {
    const response = await API.get(
      `expenses/get-getEachMonthIncomingAndOutgoing?emailAddress=${emailAddress}&UUID=${uuid}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      },
    );
    return response.data || [];
  } catch (error) {
    return [];
  }
};

export const getYearlySpendingsOnDiffCategories = async (
  token,
  emailAddress,
  uuid,
) => {
  try {
    const response = await API.get(
      `expenses/get-getYearlySpendingsOnDiffCategories?emailAddress=${emailAddress}&UUID=${uuid}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      },
    );
    return response.data || [];
  } catch (error) {
    return [];
  }
};
