import React from "react";
import ReactHtmlParser from "react-html-parser";
// import MathJax from "react-mathjax-preview";
import { MathJax, MathJaxContext } from "better-react-mathjax";

const config = {
  /* in theory, the MathML input processor should be activated if we add
  an "mml" block to the config OR if "input/mml" (NOT "input/mathml" as stated 
  in the docs) is in the load array. However, this is not necessary as MathML is 
  ALWAYS enabled in MathJax */
  loader: { load: ["input/mml", "output/chtml"] },
  mml: {},
};

export const renderText = (text) => {
  const texttype = ReactHtmlParser(text);
  // const mathtype = <MathJax math={String.raw`${text}`} />;
  const mathtype = (
    <MathJaxContext version={3} config={config}>
      <MathJax inline dynamic>
        <span
          dangerouslySetInnerHTML={{
            __html: text?.replace(/\n[\s]*/g, ""),
          }}
        />
      </MathJax>
    </MathJaxContext>
  );

  let textType = "";

  const loop = (string) =>
    string.forEach((item) => {
      if (item?.type !== "math") {
        if (item?.props?.children?.length > 0) {
          return loop(item?.props?.children);
        }
      } else {
        textType = "math";
      }
    });

  loop(texttype);

  if (textType !== "math") {
    return texttype;
  } else {
    return mathtype;
  }
};
