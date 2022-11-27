import * as React from "react";
import * as uuid from "uuid";
import clsx from "clsx";

interface IMyTabsProps {
  headings: string[];
  content: React.ReactNode[];
}

const MyTabs: React.FunctionComponent<IMyTabsProps> = ({
  headings,
  content,
}) => {
  const [active, setActive] = React.useState(0);
  const myTabsRef = React.useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = React.useState<number>();

  React.useEffect(() => {
    const heights: number[] = [];
    [...myTabsRef.current!.children].forEach((item) =>
      heights.push(item.clientHeight)
    );
    setContentHeight(Math.max(...heights));
  }, []);
  return (
    <div className="my-tabs border-[black] border-[1px] border-solid">
      <div
        role="tatablist"
        className={clsx(
          `my-tabs__header mt-header grid border-b-[1px] border-solid border-black`
        )}
        style={{
          gridTemplateColumns: `repeat(${headings.length},minmax(0,1fr))`,
        }}
      >
        {headings.map((heading, index) => {
          const last = index === headings.length - 1;
          return (
            <div
              role="tab"
              id={`tab-${heading}`}
              {...(index === active
                ? { ["aria-selected"]: "true" }
                : { ["aria-selected"]: "false" })}
              key={uuid.v4()}
              className={clsx(
                "mt-header__item cursor-pointer border-solid border-black text-center",
                { "border-r-[1px]": !last },
                { "bg-slate-400": index === active }
              )}
              onClick={() => {
                setActive(index);
              }}
            >
              {heading}
            </div>
          );
        })}
      </div>
      <div
        className="my-tabs__content relative"
        style={{ height: contentHeight + "px" }}
        ref={myTabsRef}
      >
        {content.map((item, index) => (
          <div
            role="tabpanel"
            aria-labelledby={`tab-${headings[index]}`}
            key={uuid.v4()}
            className={clsx("absolute", { invisible: index !== active })}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyTabs;
