import { Dispatch } from "react";
import { useForm } from "react-hook-form";

export type PostButtonTypes = "link" | "text" | "repliesToInbox" | "media";

export type PostButtonsProperties = {
    id: PostButtonTypes;
    ariaLabel: string;
    onClick: () => void;
};

type SubmissionPostTypes = "link" | "text";

export type WhatsHappeningReducerState = {
    postType: SubmissionPostTypes;
    repliesToInbox: boolean;
    inputHasBeenFocused: boolean;
};
export type WhatsHappeningReducerActions =
    | {
          type: "setSubmissionType";
          payload: SubmissionPostTypes;
      }
    | {
          type: "toggleRepliesToInbox";
      }
    | {
          type: "inputHasBeenFocused";
      };

export type WhatsHappeningContextType = {
    state: WhatsHappeningReducerState;
    dispatch: Dispatch<WhatsHappeningReducerActions>;
};