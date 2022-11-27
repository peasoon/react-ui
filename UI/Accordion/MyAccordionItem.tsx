import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface IMyAccordionItemProps {
  heading: string;
  id: number;
  onlyOne?: boolean;
  openState: number | null;
  setOpenState: React.Dispatch<React.SetStateAction<number | null>>;
}

const MyAccordionItem: React.FunctionComponent<IMyAccordionItemProps> = ({
  heading,
  id,
  onlyOne,
  openState,
  setOpenState,
}) => {
  const buttonVariants = {
    open: { rotate: 45 },
    closed: { rotate: 0 },
  };
  const contentVariants = {
    open: { height: "auto", opacity: 1 },
    closed: { height: 0, opacity: 0 },
  };

  React.useEffect(() => {
    console.log(`item ${id} rendered`);
  }, []);
  return (
    <div className="my-accordion__item">
      <div className="ma-item__heading border-[1px] border-solid border-[black] flex justify-between items-center">
        <p>{heading}</p>
        <motion.button
          aria-expanded={id === openState ? true : false}
          aria-controls={`${id + 1}-panel`}
          id={`${id + 1}-header`}
          className="border-[1px] border-solid border-[black] rounded-full w-[20px] h-[20px] flex items-center justify-center relative"
          onClick={() => {
            if (openState === id) {
              setOpenState(null);
            } else setOpenState(id);
          }}
        >
          <div className="absolute w-[15px] h-[15px] top-[50%] left-[50%] block leading-[15px] text-[15px] translate-x-[-50%] translate-y-[-54%]">
            +
          </div>
        </motion.button>
      </div>
      {openState === id ? (
        <motion.div
          aria-labelledby={`${id + 1}-header`}
          id={`${id + 1}-panel`}
          variants={contentVariants}
          initial={"closed"}
          animate={"open"}
          exit={"closed"}
          className="ma-item__content border-[1px] border-solid border-[black] border-t-0 overflow-hidden w-[100%]"
        >
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur
            sequi fugiat quo? Fugit facere quos provident ad nemo animi sequi!
          </p>
        </motion.div>
      ) : null}
    </div>
  );
};

export default MyAccordionItem;
