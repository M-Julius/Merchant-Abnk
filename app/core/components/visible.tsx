type VisibleProps = {
  visible: boolean;
  children: JSX.Element;
  onInvisible?: () => JSX.Element;
};

const Visible = ({
  visible,
  children,
  onInvisible = undefined,
}: VisibleProps) => {
  if (visible) {
    return children;
  }
  if (onInvisible) {
    return onInvisible();
  }
  return null;
};

export default Visible;
