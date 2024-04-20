import { cloneElement, forwardRef, useRef } from "react";
// PLUGINS
import { Transition, type TransitionProps, type TransitionStatus, type CustomContentProps } from "notistack";
import { useForkRef, reflow, getTransitionProps, createTransition } from "./shared";

const styles: Partial<Record<TransitionStatus, React.CSSProperties>> = {
  entering: {
    opacity: 1,
  },
  entered: {
    opacity: 1,
  },
};

interface Props extends TransitionProps {
  children: React.FunctionComponentElement<CustomContentProps & { ref?: React.Ref<HTMLDivElement> }>;
}

const Fade = forwardRef<HTMLDivElement, Props>((props, ref) => {
  const { children, in: inProp, timeout = 0, style, onEnter, onEntered, onExit, onExited, ...other } = props;

  const nodeRef = useRef<HTMLDivElement>(null);
  const handleRefIntermediary = useForkRef(children?.ref, ref);
  const handleRef = useForkRef(nodeRef, handleRefIntermediary);

  const handleEnter: TransitionProps["onEnter"] = (node, isAppearing) => {
    reflow(node);

    const transitionProps = getTransitionProps({ style, timeout, mode: "enter" });

    node.style.transition = createTransition("opacity", transitionProps);
    node.style.opacity = "1";

    if (onEnter) onEnter(node, isAppearing);
  };

  const handleExit: TransitionProps["onExit"] = (node) => {
    const transitionProps = getTransitionProps({ style, timeout, mode: "exit" });

    node.style.transition = createTransition("opacity", transitionProps);
    node.style.opacity = "0";

    if (onExit) onExit(node);
  };

  return (
    <Transition
      appear
      in={inProp}
      nodeRef={nodeRef}
      timeout={timeout}
      onEnter={handleEnter}
      onEntered={onEntered}
      onExit={handleExit}
      onExited={onExited}
      {...other}
    >
      {(status, childProps) =>
        cloneElement(children, {
          ref: handleRef,
          style: {
            opacity: 0,
            visibility: status === "exited" && !inProp ? "hidden" : undefined,
            ...styles[status],
            ...style,
            ...children.props.style,
          },
          ...childProps,
        })
      }
    </Transition>
  );
});

Fade.displayName = "Fade";

export default Fade;
