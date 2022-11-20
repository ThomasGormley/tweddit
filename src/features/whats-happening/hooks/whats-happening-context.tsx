import { createContext, PropsWithChildren, useContext } from "react";
import { WhatsHappeningContextType } from "../types";
import { useReducer } from "react";
import {
    WhatsHappeningReducerActions,
    WhatsHappeningReducerState,
} from "../types";

const WhatsHappeningContext = createContext<WhatsHappeningContextType | null>(
    null,
);

const initialState: WhatsHappeningReducerState = {
    postType: "text",
    repliesToInbox: false,
};
function reducer(
    state: WhatsHappeningReducerState,
    action: WhatsHappeningReducerActions,
): WhatsHappeningReducerState {
    switch (action.type) {
        case "setSubmissionType":
            return { ...state, postType: action.payload };
        case "toggleRepliesToInbox":
            return { ...state, repliesToInbox: !state.repliesToInbox };
        default:
            throw new Error();
    }
}

function useWhatsHappeningReducer() {
    return useReducer(reducer, initialState);
}

function WhatsHappeningProvider({ children }: PropsWithChildren) {
    const [state, dispatch] = useWhatsHappeningReducer();

    const value = { state, dispatch };

    return (
        <WhatsHappeningContext.Provider value={value}>
            {children}
        </WhatsHappeningContext.Provider>
    );
}

function useWhatsHappeningState() {
    const context = useContext(WhatsHappeningContext);

    if (!context) {
        throw new Error(
            "useWhatsHappeningState must be used within a WhatsHappeningProvider",
        );
    }

    return context;
}

export { WhatsHappeningProvider, useWhatsHappeningState };
