import React from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";
import ReactTooltip from "react-tooltip";

const InfoTipComp = ({ text }: { text: string }) => {
  if (!text) return null;

  return (
    <span className="float-right pt-2 pr-2">
      <AiOutlineInfoCircle className="text-neutral-grey-2" data-tip={text} />{" "}
      <ReactTooltip
        className="w-1/2 lg:w-1/4"
        textColor="var(--colors-natural-dark)"
        backgroundColor="var(--colors-natural-grey-4)"
      />
    </span>
  );
};

const InfoTip = React.forwardRef(InfoTipComp);
export default InfoTip;
