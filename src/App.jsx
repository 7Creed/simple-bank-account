import { useReducer } from "react";
import "./index.css";

const initialState = {
  balance: 0,
  loan: 0,
  isActive: false,
};

const reducer = function (state, action) {
  const { type, payload } = action;
  if (!state.isActive && type !== "openAccount") return state;

  switch (type) {
    case "openAccount":
      return {
        ...state,
        balance: 500,
        isActive: true,
      };

    case "deposit":
      return {
        ...state,
        balance: state.balance + payload,
      };

    case "withdraw": {
      return {
        ...state,
        balance: state.balance ? state.balance - payload : 0,
        isActive: state.balance === 0 ? false : state.isActive,
      };
    }

    case "requestLoan":
      if (state.loan > 0) return state;

      return {
        ...state,
        balance: state.balance + payload,
        loan: payload,
      };

    case "payLoan":
      return {
        ...state,
        balance: state.balance - state.loan,
        loan: 0,
      };

    case "closeAccount":
      // if (state.balance < 0 || state.loan > 0) return state;
      if (state.balance !== 0 || state.loan > 0) return state;

      return {
        ...initialState,
      };

    default:
      throw new Error("Action unknown");
  }
};

export default function App() {
  const [{ balance, loan, isActive }, dispatch] = useReducer(
    reducer,
    initialState
  );

  return (
    <div className="App">
      <h1>useReducer Bank Account</h1>
      <p>Balance: {balance}</p>
      <p>Loan: {loan}</p>

      <p>
        <button
          onClick={() => dispatch({ type: "openAccount" })}
          disabled={isActive}
        >
          Open account
        </button>
      </p>
      <p>
        <button
          onClick={() => dispatch({ type: "deposit", payload: 150 })}
          disabled={!isActive}
        >
          Deposit 150
        </button>
      </p>
      <p>
        <button
          onClick={() => dispatch({ type: "withdraw", payload: 50 })}
          disabled={!isActive || balance === 0}
        >
          Withdraw 50
        </button>
      </p>
      <p>
        <button
          onClick={() => dispatch({ type: "requestLoan", payload: 5000 })}
          disabled={!isActive || loan}
        >
          Request a loan of 5000
        </button>
      </p>
      <p>
        <button
          onClick={() => dispatch({ type: "payLoan" })}
          disabled={!isActive}
        >
          Pay loan
        </button>
      </p>
      <p>
        <button
          onClick={() => dispatch({ type: "closeAccount" })}
          disabled={!isActive}
        >
          Close account
        </button>
      </p>
    </div>
  );
}
