import * as React from "react";
import MyAccordionItem from "./MyAccordionItem";
import { v4 as uuidv4 } from "uuid";
import { AnimatePresence } from "framer-motion";

interface IMyAccordionProps {
  headings: string[];
  onlyOne?: boolean;
}

const MyAccordion: React.FunctionComponent<IMyAccordionProps> = ({
  headings,
  onlyOne,
}) => {
  const [openState, setOpenState] = React.useState<number | null>(null);

  React.useEffect(()=>{
    console.log('openState--->',openState)
  },[openState])
  return (
    <div className="my-accordion">
      <div className="text-center">My accordion</div>
      <AnimatePresence mode='wait'>
        {headings.map((heading, index) => (
          <MyAccordionItem
            heading={heading}
            key={uuidv4()}
            id={index}
            onlyOne
            openState={openState}
            setOpenState={setOpenState}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default MyAccordion;
